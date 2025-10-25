import React, { useEffect, useRef } from "react";
import { subscribeOnStream, unsubscribeFromStream } from "./pythStreaming";
import { customPriceFormatter } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthProvider";

export default function PerpChartLight({ ticker }) {
  const chartContainerRef = useRef();
  const { supabase, user } = useAuth();

  function getMarks(
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution
  ) {
    supabase
      .from("user_trade_records")
      .select("*")
      .gte("timestamp", new Date(startDate * 1000).toISOString())
      .lte("timestamp", new Date(endDate * 1000).toISOString())
      .eq("order_type", "OPEN")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error || !data) {
          console.error("Error fetching trades:", error);
        } else {
          console.log(data);
          const finalData = data.map(trade => ({
            id: trade.id,
            time: Math.floor(new Date(trade.timestamp).getTime() / 1000),
            color: trade.order_type === "OPEN" ? "green" : "red",
            text: [""],
            label: trade.trade_type === "LONG" ? "L" : "S",
            labelFontColor: "white",
            minSize: 25,
          }));
          onDataCallback(finalData);
        }
      });
  }

  useEffect(() => {
    if (!ticker) return;
    const datafeed = new window.Datafeeds.UDFCompatibleDatafeed(
      "/api/datafeed"
    );
    datafeed.subscribeBars = subscribeOnStream;
    datafeed.unsubscribeBars = unsubscribeFromStream;
    datafeed.getMarks = getMarks;
    const widgetOptions = {
      datafeed,
      library_path: new URL("/api/charts/", window.location.origin).toString(),
      debug: false,
      fullscreen: false,
      autosize: true,
      allow_symbol_change: false,
      symbol: ticker,
      interval: "2",
      container: "TVChartContainer",
      timeframe: "1H",
      locale: "en",
      theme: "dark",
      disabled_features: [],
      enabled_features: [],
      custom_formatters: {
        priceFormatterFactory: customPriceFormatter,
      },
    };

    const tvWidget = new window.TradingView.widget(widgetOptions);
    window.tradingChart = tvWidget;
    // tvWidget.onChartReady(() => {
    //   tvWidget.headerReady().then(() => {
    //     const button = tvWidget.createButton();
    //     button.setAttribute("title", "Click to show a notification popup");
    //     button.classList.add("apply-common-tooltip");
    //     button.addEventListener("click", () =>
    //       tvWidget.showNoticeDialog({
    //         title: "Notification",
    //         body: "TradingView Charting Library API works correctly",
    //         callback: () => {
    //           console.log("Noticed!");
    //         },
    //       })
    //     );

    //     button.innerHTML = "Check API";
    //   });
    // });

    return () => {
      tvWidget.remove();
    };
  }, [ticker]);

  return (
    <div
      ref={chartContainerRef}
      id={"TVChartContainer"}
      className="w-full h-full"
    />
  );
}
