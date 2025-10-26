import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}
const generateOrders = (isAsk: boolean, currPrice: number) => {
  const orders: OrderBookEntry[] = [];
  let total = 0;
  for (let i = 0; i < 5; i++) {
    const multiplier = isAsk
      ? Math.random() * 0.1 + 1.0 // 1.0 to 1.1
      : Math.random() * 0.1 + 0.9; // 0.9 to 1.0
    const price = Number(currPrice) * multiplier;
    const size = Math.random() * 2 + 0.1;
    total += size;
    orders.push({ price, size, total });
  }
  return orders;
};

const OrderBook = ({
  pair,
  currentPrice,
}: {
  pair: string;
  currentPrice: number;
}) => {
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);

  useEffect(() => {
    if (!currentPrice) return;

    setAsks(generateOrders(true, currentPrice));
    setBids(generateOrders(false, currentPrice));
  }, [pair, currentPrice]);

  const maxTotal = Math.max(
    ...asks.map(a => a.total),
    ...bids.map(b => b.total)
  );

  return (
    <div className="glass p-4 rounded-xl h-full">
      <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
        ORDER BOOK
      </h3>

      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2 px-2">
        <div>Price (USDT)</div>
        <div className="text-right">Size</div>
        <div className="text-right">Total</div>
      </div>

      {/* Asks (Sells) */}
      <div className="space-y-0.5 mb-3">
        {asks
          .slice(0, 8)
          .reverse()
          .map((ask, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative grid grid-cols-3 gap-2 text-xs py-1 px-2 rounded hover:bg-loss/5 cursor-pointer transition-colors"
            >
              <motion.div
                className="absolute inset-0 bg-loss/30"
                animate={{ width: `${(ask.total / maxTotal) * 100}%` }}
              />
              <div className="relative text-loss font-mono">
                {ask.price.toFixed(2)}
              </div>
              <div className="relative text-right font-mono">
                {ask.size.toFixed(3)}
              </div>
              <div className="relative text-right font-mono text-muted-foreground">
                {ask.total.toFixed(3)}
              </div>
            </motion.div>
          ))}
      </div>

      {/* Spread */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-2 mb-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Spread</span>
          <span className="font-mono font-semibold text-primary">
            {(asks[0]?.price - bids[0]?.price).toFixed(2)} (
            {(
              ((asks[0]?.price - bids[0]?.price) / bids[0]?.price) *
              100
            ).toFixed(3)}
            %)
          </span>
        </div>
      </div>

      {/* Bids (Buys) */}
      <div className="space-y-0.5">
        {bids.slice(0, 8).map((bid, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative grid grid-cols-3 gap-2 text-xs py-1 px-2 rounded hover:bg-success/5 cursor-pointer transition-colors"
          >
            <motion.div
              className="absolute inset-0 bg-success/30"
              animate={{ width: `${(bid.total / maxTotal) * 100}%` }}
            />
            <div className="relative text-success font-mono">
              {bid.price.toFixed(2)}
            </div>
            <div className="relative text-right font-mono">
              {bid.size.toFixed(3)}
            </div>
            <div className="relative text-right font-mono text-muted-foreground">
              {bid.total.toFixed(3)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
