import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trade {
  price: number;
  size: number;
  time: string;
  side: "buy" | "sell";
}

const RecentTradesPanel = ({ pair }: { pair: string }) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Generate initial trades
    const basePrice = 68750;
    const initialTrades: Trade[] = [];
    for (let i = 0; i < 15; i++) {
      initialTrades.push({
        price: basePrice + (Math.random() - 0.5) * 100,
        size: Math.random() * 0.5 + 0.01,
        time: new Date(Date.now() - i * 3000).toLocaleTimeString(),
        side: Math.random() > 0.5 ? "buy" : "sell",
      });
    }
    setTrades(initialTrades);

    // Simulate real-time trades
    const interval = setInterval(() => {
      const newTrade: Trade = {
        price: basePrice + (Math.random() - 0.5) * 100,
        size: Math.random() * 0.5 + 0.01,
        time: new Date().toLocaleTimeString(),
        side: Math.random() > 0.5 ? "buy" : "sell",
      };
      setTrades(prev => [newTrade, ...prev.slice(0, 14)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [pair]);

  return (
    <div className="glass p-4 rounded-xl h-full">
      <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
        RECENT TRADES
      </h3>

      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2 px-2">
        <div>Price (USDT)</div>
        <div className="text-right">Size</div>
        <div className="text-right">Time</div>
      </div>

      <div className="space-y-0.5">
        <AnimatePresence>
          {trades.map((trade, i) => (
            <motion.div
              key={`${trade.time}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={`grid grid-cols-3 gap-2 text-xs py-1.5 px-2 rounded ${
                trade.side === "buy" ? "hover:bg-success/5" : "hover:bg-loss/5"
              } transition-colors`}
            >
              <div
                className={`font-mono font-semibold ${
                  trade.side === "buy" ? "text-success" : "text-loss"
                }`}
              >
                {trade.price.toFixed(2)}
              </div>
              <div className="text-right font-mono">
                {trade.size.toFixed(4)}
              </div>
              <div className="text-right text-muted-foreground">
                {trade.time}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecentTradesPanel;
