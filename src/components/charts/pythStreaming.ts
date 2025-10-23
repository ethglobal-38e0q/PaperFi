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
  fetch(streamingUrl + "?ticker=" + ticker)
    .then(response => {
      const reader = response.body.getReader();

      function streamData() {
        reader
          .read()
          .then(({ value, done }) => {
            if (done) {
              console.error("[stream] Streaming ended.");
              return;
            }

            // Assuming the streaming data is separated by line breaks
            const dataStrings = new TextDecoder().decode(value).split("\n");
            dataStrings.forEach(dataString => {
              const trimmedDataString = dataString.trim();
              if (trimmedDataString) {
                try {
                  var jsonData = JSON.parse(trimmedDataString);
                  handleStreamingData(jsonData);
                } catch (e) {
                  console.error("Error parsing JSON:", e.message);
                }
              }
            });

            streamData(); // Continue processing the stream
          })
          .catch(error => {
            console.error("[stream] Error reading from stream:", error);
            attemptReconnect(retries, delay);
          });
      }

      streamData();
    })
    .catch(error => {
      console.error(
        "[stream] Error fetching from the streaming endpoint:",
        error
      );
    });
  function attemptReconnect(retriesLeft, delay) {
    if (retriesLeft > 0) {
      console.log(`[stream] Attempting to reconnect in ${delay}ms...`);
      setTimeout(() => {
        startStreaming(retriesLeft - 1, delay);
      }, delay);
    } else {
      console.error("[stream] Maximum reconnection attempts reached.");
    }
  }
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
