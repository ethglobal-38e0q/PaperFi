import React, { useState, useEffect, useMemo } from "react";
import { Grid } from "react-window";
import MiniChartView from "../components/charts/MiniChart";
import { useCallback } from "react";
import axios from "axios";
import { useRef } from "react";

const AssetCard = ({ asset, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCardClick = () => {
    onClick(asset);
  };

  return (
    <div
      className="p-1"
      onClick={handleCardClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className=" bg-gray-900 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-purple-500/20 overflow-hidden relative">
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg border border-gray-600 max-w-xs whitespace-normal">
            {asset.description}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
          </div>
        )}

        {/* Chart Section */}
        <div className="h-20 bg-gray-800 relative overflow-hidden">
          <MiniChartView
            ticker={`PYTH:${asset.attributes?.generic_symbol || asset.attributes.symbol.substr(7).replace("/", "")}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                {asset.attributes.base.slice(0, 2)}
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  {asset.attributes.base}
                </h3>
                <p className="text-gray-400 text-xs">
                  {asset.attributes.display_symbol}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-green-400 text-xs font-medium">+5.24%</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="bg-gray-800 px-2 py-1 rounded text-xs">
              {asset.attributes.asset_type.toUpperCase()}
            </span>
            <span>{asset.attributes.schedule}</span>
          </div>

          {/* Trade Button */}
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-1.5 px-3 rounded text-sm transition-all duration-200 group-hover:shadow-md">
            Trade
          </button>
        </div>
      </div>
    </div>
  );
};

// Grid cell component for react-window
const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const { assets, handleAssetClick, columnsPerRow } = data;
  const index = rowIndex * columnsPerRow + columnIndex;

  if (index >= assets.length) {
    return <div style={style} />;
  }

  const asset = assets[index];

  return (
    <div style={style}>
      <AssetCard asset={asset} onClick={handleAssetClick} />
    </div>
  );
};

export default function LaunchpadPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [containerWidth, setContainerWidth] = useState(0);
  const assetsContainerRef = useRef(null);

  useEffect(() => {
    const loadAssets = async () => {
      setLoading(true);
      const assets = await axios.get(
        "https://hermes.pyth.network/v2/price_feeds",
      );
      setAssets(assets.data);
      setLoading(false);
    };

    loadAssets();
  }, []);

  useEffect(() => {
    // Debounce utility function
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    const handleResize = () => {
      if (!assetsContainerRef.current) return;
      setContainerWidth(assetsContainerRef.current.offsetWidth);
    };

    // Debounced resize handler with 150ms delay
    const debouncedHandleResize = debounce(handleResize, 400);

    handleResize();
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  const filteredAssets = assets.filter(
    (asset) =>
      (asset.attributes.base.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.attributes.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      asset.attributes.asset_type === "Crypto",
  );

  const handleAssetClick = useCallback((asset) => {
    window.open(`/trade/${asset.attributes.symbol.toLowerCase()}`, "_blank");
  }, []);

  // Calculate grid dimensions
  const CARD_WIDTH = 320; // Width including margin
  const CARD_HEIGHT = 222; // Height including margin
  const columnsPerRow = Math.floor(containerWidth / CARD_WIDTH) || 1;
  const rowCount = Math.ceil(filteredAssets.length / columnsPerRow);

  const gridData = useMemo(
    () => ({
      assets: filteredAssets,
      handleAssetClick,
      columnsPerRow,
    }),
    [filteredAssets, handleAssetClick, columnsPerRow],
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Paper Launchpad
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8">
              Trade the next generation of digital assets with confidence
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            "Total Volume",
            "Active Traders",
            "Assets Listed",
            "Total Trades",
          ].map((stat, index) => (
            <div
              key={stat}
              className="bg-gray-900 rounded-lg p-4 border border-gray-700"
            >
              <div className="text-gray-400 text-sm">{stat}</div>
              <div className="text-white text-2xl font-bold">
                {["$124.5M", "15.2K", `${assets.length}`, "892K"][index]}
              </div>
            </div>
          ))}
        </div>

        {/* Assets Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg border border-gray-700 animate-pulse"
              >
                <div className="h-20 bg-gray-800 rounded-t-lg" />
                <div className="p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-gray-700 rounded-full" />
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-700 rounded w-12" />
                      <div className="h-2 bg-gray-700 rounded w-16" />
                    </div>
                  </div>
                  <div className="h-6 bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Featured Assets ({filteredAssets.length})
              </h2>
              <div className="flex space-x-2">
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Top Gainers
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Most Active
                </button>
              </div>
            </div>

            {filteredAssets.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  No assets found
                </div>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            ) : (
              <div
                className="w-full border border-gray-800 rounded-lg overflow-x-auto"
                ref={assetsContainerRef}
                style={{ height: "600px" }}
              >
                <Grid
                  cellComponent={Cell}
                  cellProps={{ data: gridData }}
                  columnCount={columnsPerRow}
                  columnWidth={CARD_WIDTH}
                  height={600}
                  rowCount={rowCount}
                  rowHeight={CARD_HEIGHT}
                  // itemData={gridData}
                  overscanCount={3}
                  className="scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800 overflow-x-none"
                ></Grid>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to start trading?
          </h3>
          <p className="text-gray-300 mb-8">
            Join thousands of traders already using Paper Launchpad
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}
