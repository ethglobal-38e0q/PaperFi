import { useState, useEffect } from "react";
import { marketData } from "@/data/mockData";
import { motion } from "framer-motion";

const MarketTicker = () => {
  const [prices, setPrices] = useState(marketData);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((pair) => {
          const change = (Math.random() - 0.5) * 0.2;
          updated[pair as keyof typeof marketData] = {
            ...updated[pair as keyof typeof marketData],
            price: updated[pair as keyof typeof marketData].price * (1 + change / 100),
            change: updated[pair as keyof typeof marketData].change + change,
          };
        });
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass px-4 py-2 rounded-xl overflow-hidden">
      <div className="flex gap-8 overflow-x-auto scrollbar-hide">
        {Object.entries(prices).map(([pair, data]) => (
          <motion.div
            key={pair}
            className="flex items-center gap-3 flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div>
              <p className="text-xs text-muted-foreground">{pair.replace("USDT", "/USDT")}</p>
              <p className="font-mono font-bold text-sm">${data.price.toFixed(2)}</p>
            </div>
            <div className={`text-xs font-semibold ${data.change > 0 ? "text-success" : "text-loss"}`}>
              {data.change > 0 ? "+" : ""}{data.change.toFixed(2)}%
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;
