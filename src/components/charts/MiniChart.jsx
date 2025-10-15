// template from https://www.tradingview.com/widget-docs/widgets/charts/mini-chart/
import { useEffect, useRef, memo } from "react";

// "symbol": "BITSTAMP:ETHUSD",

function MiniChartView({ ticker }) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbol": "${ticker}",
          "chartOnly": true,
          "dateRange": "1D",
          "noTimeScale": true,
          "colorTheme": "dark",
          "isTransparent": true,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%"
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewWidget);
