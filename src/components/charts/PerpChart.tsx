import React, { useEffect, useRef } from "react";
import { subscribeOnStream, unsubscribeFromStream } from "./pythStreaming";
import { customPriceFormatter } from "@/lib/utils";

export default function PerpChartLight({ ticker }) {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!ticker) return;
    const datafeed = new window.Datafeeds.UDFCompatibleDatafeed(
      "https://benchmarks.pyth.network/v1/shims/tradingview"
    );
    datafeed.subscribeBars = subscribeOnStream;
    datafeed.unsubscribeBars = unsubscribeFromStream;
    console.log(datafeed);
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

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          })
        );

        button.innerHTML = "Check API";
      });
    });

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
