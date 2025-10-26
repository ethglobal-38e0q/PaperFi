const streamingUrl = "https://api.paperfi.trade/stream";
const channelToSubscription = new Map();

function handleStreamingData(data) {
  const { id, p, t } = data;

  const tradePrice = p;
  const tradeTime = t * 1000; // Multiplying by 1000 to get milliseconds
  const channelString = id;
  const subscriptionItem = channelToSubscription.get(channelString);

  if (!subscriptionItem) {
    return;
  }

  const lastDailyBar = subscriptionItem.lastDailyBar;
  let bar;
  if (!lastDailyBar) {
    bar = {
      open: tradePrice,
      high: tradePrice,
      low: tradePrice,
      close: tradePrice,
      time: tradeTime,
    };
  } else {
    const nextBarTime = getNextBarTime(
      lastDailyBar.time,
      subscriptionItem.resolution
    );

    if (tradeTime >= nextBarTime) {
      bar = {
        time: nextBarTime,
        open: tradePrice,
        high: tradePrice,
        low: tradePrice,
        close: tradePrice,
      };
    } else {
      // Otherwise, update the last bar
      bar = {
        ...lastDailyBar,
        high: Math.max(lastDailyBar.high, tradePrice),
        low: Math.min(lastDailyBar.low, tradePrice),
        close: tradePrice,
      };
    }
  }

  subscriptionItem.lastDailyBar = bar;

  // Send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach(handler => handler.callback(bar));
  channelToSubscription.set(channelString, subscriptionItem);
}

function startStreaming(ticker, retries = 3, delay = 3000) {
  let eventSource: EventSource | null = null;
  let reconnectAttempts = retries;

  function connect() {
    eventSource = new EventSource(streamingUrl + "?ticker=" + ticker);

    eventSource.onmessage = event => {
      const trimmedDataString = event.data.trim();
      if (trimmedDataString) {
        try {
          const jsonData = JSON.parse(trimmedDataString);
          handleStreamingData(jsonData);
        } catch (e) {
          console.error("Error parsing JSON:", e.message);
        }
      }
    };

    eventSource.onerror = error => {
      console.error("[stream] SSE connection error:", error);
      eventSource?.close();
      attemptReconnect();
    };
  }

  function attemptReconnect() {
    if (reconnectAttempts > 0) {
      console.log(`[stream] Attempting to reconnect in ${delay}ms...`);
      setTimeout(() => {
        reconnectAttempts--;
        connect();
      }, delay);
    } else {
      console.error("[stream] Maximum reconnection attempts reached.");
    }
  }

  connect();
}

function getNextBarTime(barTime, resolution) {
  const date = new Date(barTime);
  const interval = parseInt(resolution);

  if (resolution === "1D") {
    date.setUTCDate(date.getUTCDate() + 1);
    date.setUTCHours(0, 0, 0, 0);
  } else if (!isNaN(interval)) {
    // Handles '1' and '60' (minutes)
    // Add the interval to the current bar's time
    date.setUTCMinutes(date.getUTCMinutes() + interval);
  }
  return date.getTime();
}

export function subscribeOnStream(
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscriberUID,
  onResetCacheNeededCallback,
  lastDailyBar
) {
  const channelString = symbolInfo.ticker;
  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  };
  let subscriptionItem = channelToSubscription.get(channelString);
  subscriptionItem = {
    subscriberUID,
    resolution,
    lastDailyBar,
    handlers: [handler],
  };
  channelToSubscription.set(channelString, subscriptionItem);
  console.log(
    "[subscribeBars]: Subscribe to streaming. Channel:",
    channelString
  );

  // Start streaming when the first subscription is made
  startStreaming(channelString);
}

export function unsubscribeFromStream(subscriberUID) {
  // Find a subscription with id === subscriberUID
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex(
      handler => handler.id === subscriberUID
    );

    if (handlerIndex !== -1) {
      // Unsubscribe from the channel if it is the last handler
      console.log(
        "[unsubscribeBars]: Unsubscribe from streaming. Channel:",
        channelString
      );
      channelToSubscription.delete(channelString);
      break;
    }
  }
}

export const onReady = callback => {
  console.log("[onReady]: Method call");
  setTimeout(() =>
    callback({
      supported_resolutions: [
        "1",
        "2",
        "5",
        "15",
        "30",
        "60",
        "120",
        "240",
        "360",
        "720",
        "D",
        "1D",
        "W",
        "1W",
        "M",
        "1M",
      ],
      supports_group_request: false,
      supports_marks: true,
      supports_search: true,
      supports_timescale_marks: false,
    })
  );
};
