import { HermesAsset } from "@/types";
import { useState } from "react";

export const AssetCard = ({
  asset,
  onClick,
}: {
  asset: HermesAsset;
  onClick: (asset: HermesAsset) => void;
}) => {
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
