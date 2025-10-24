import { useEffect, useRef, memo } from "react";

function TickerTapeWidget() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbols": [
            {
              "proName": "PYTH:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "PYTH:ETHUSD",
              "title": "Ethereum"
            },
            {
              "proName": "PYTH:SOLUSD",
              "title": "Solana"
            },
            {
              "proName": "PYTH:BNBUSD",
              "title": "Binance"
            }
          ],
          "colorTheme": "dark",
          "locale": "en",
          "largeChartUrl": "",
          "isTransparent": true,
          "showSymbolLogo": true,
          "displayMode": "compact"
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TickerTapeWidget);
