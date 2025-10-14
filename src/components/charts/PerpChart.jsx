import React, { useRef, useEffect, useState } from "react";
import {
  CandlestickSeries,
  createChart,
  createSeriesMarkers,
} from "lightweight-charts";
import { subscribeOnStream } from "./pythStreaming";

const RESOLUTIONS = [
  { label: "1s", value: "1S" },
  { label: "15s", value: "15S" },
  { label: "1m", value: "1" },
  { label: "5m", value: "5" },
  { label: "1h", value: "60" },
];

export default function PerpChartLight() {
  const chartRef = useRef();
  const [chart, setChart] = useState(null);
  const [candlestickSeries, setCandlestickSeries] = useState(null);
  const [selectedResolution, setSelectedResolution] = useState(RESOLUTIONS[2]); // Default 1m
  const [ticker, setTicker] = useState("Crypto.BTC/USD");
  
  useEffect(() => {
    if (!chartRef.current) return;

    const createdChart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: { backgroundColor: "#FFFFFF", textColor: "#000000" },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
    });

    const series = createdChart.addSeries(CandlestickSeries, {
      upColor: "#34D399", // Green for up candles
      downColor: "#EF4444", // Red for down candles
      borderVisible: false,
      wickVisible: true,
      barSpacing: 10,
      priceLineVisible: false,
    });
    series.setData([
      { time: Math.floor(Date.now()/1000), open: 122000, high: 124000, low: 121000, close: 123000}
    ]); // Initial dummy data

    setChart(createdChart);
    setCandlestickSeries(series);

    return () => {
      createdChart.remove();
      setChart(null);
      setCandlestickSeries(null);
    };
  }, []);

  // Resize the chart on container resize
  useEffect(() => {
    function handleResize() {
      if (!chartRef.current || !chart) return;
      chart.applyOptions({
        width: chartRef.current.clientWidth,
        height: chartRef.current.clientHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [chart]);
  
  function handlePriceUpdate(price) {
    if (!candlestickSeries) return;
    const lastBar = candlestickSeries.data().slice(-1)[0];
    if (!lastBar) return;

    const newBar = {
      time: lastBar.time+1,
      open: lastBar.close,
      high: Math.max(lastBar.high, price.close),
      low: Math.min(lastBar.low, price.close),
      // high: price.close,
      // low: price.close,
      close: price.close,
    };
    candlestickSeries.update(price);
  }
  
  function handleTickerSubscribe() {
    if (!candlestickSeries) return;
    
    subscribeOnStream(
      {ticker},
      selectedResolution.value,
      handlePriceUpdate,
      `sub_${ticker}_${selectedResolution.value}`,
      () => {},
      { time: Math.floor(Date.now()/1000), open: 122000, high: 124000, low: 121000, close: 123000}
    )
  }
    

  return (
    <div>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter Ticker (e.g., Crypto.BTC/USD)"
        style={{
          marginBottom: 8,
          padding: "6px 12px",
          border: "1px solid #D1D5DB",
          borderRadius: 4,
          width: 200,
        }}
      >
      </input>
      <button onClick={handleTickerSubscribe}>Submit</button>
      <div style={{ display: "flex", marginBottom: 8, gap: 8 }}>
        {RESOLUTIONS.map((res) => (
          <button
            key={res.label}
            onClick={() => setSelectedResolution(res)}
            style={{
              padding: "6px 12px",
              cursor: "pointer",
              backgroundColor:
                selectedResolution.label === res.label ? "#34D399" : "#E5E7EB",
              color: selectedResolution.label === res.label ? "#fff" : "#000",
              border: "none",
              borderRadius: 4,
              fontWeight:
                selectedResolution.label === res.label ? "bold" : "normal",
            }}
          >
            {res.label}
          </button>
        ))}
      </div>
      <div
        ref={chartRef}
        id="chartContainer"
        style={{
          width: "600px",
          height: "300px",
          border: "1px solid #D1D5DB",
          borderRadius: 4,
          // display: "none"
        }}
      ></div>
    </div>
  );
}
