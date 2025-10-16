import { openPositions, recentTrades, currentUser } from "@/data/mockData";
import StatsCard from "@/components/StatsCard";
import { Wallet, TrendingUp, Activity, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const Portfolio = () => {
  const totalValue = 10000 + currentUser.totalPnL;
  const allocatedCapital = openPositions.reduce(
    (sum, pos) => sum + pos.size * pos.entryPrice,
    0
  );
  const freeCapital = totalValue - allocatedCapital;

  const allocationData = [
    { name: "Free Capital", value: freeCapital, fill: "hsl(var(--muted))" },
    {
      name: "Open Positions",
      value: allocatedCapital,
      fill: "hsl(var(--primary))",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-2">
          <Wallet className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Portfolio</h1>
        </div>
        <p className="text-muted-foreground">
          Track your positions and capital allocation
        </p>
      </motion.div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Value"
          value={`$${totalValue.toLocaleString()}`}
          change={currentUser.totalPnL > 0 ? 15.5 : -5.2}
          icon={DollarSign}
          trend={currentUser.totalPnL > 0 ? "up" : "down"}
        />
        <StatsCard
          title="Total P&L"
          value={`$${currentUser.totalPnL.toFixed(2)}`}
          change={12.5}
          icon={TrendingUp}
          trend="up"
        />
        <StatsCard
          title="Open Positions"
          value={openPositions.length}
          icon={Activity}
          trend="neutral"
          subtitle={`$${allocatedCapital.toFixed(2)} allocated`}
        />
        <StatsCard
          title="Free Capital"
          value={`$${freeCapital.toFixed(2)}`}
          icon={Wallet}
          trend="neutral"
          subtitle={`${((freeCapital / totalValue) * 100).toFixed(1)}% available`}
        />
      </div>

      {/* Capital Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Capital Allocation</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4">
            {allocationData.map(item => (
              <div key={item.name} className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name}
                  </span>
                </div>
                <p className="text-xl font-bold mt-1">
                  ${item.value.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Position Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Position Breakdown</h3>
          <div className="space-y-3">
            {openPositions.map(position => {
              const positionValue = position.size * position.entryPrice;
              const percentage = (positionValue / totalValue) * 100;

              return (
                <div key={position.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          position.type === "LONG"
                            ? "bg-success/20 text-success"
                            : "bg-loss/20 text-loss"
                        }`}
                      >
                        {position.type}
                      </span>
                      <span className="font-bold">{position.pair}</span>
                    </div>
                    <span className="text-sm font-semibold">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {position.size} @ ${position.entryPrice}
                    </span>
                    <span
                      className={
                        position.pnl > 0
                          ? "text-success font-semibold"
                          : "text-loss font-semibold"
                      }
                    >
                      {position.pnl > 0 ? "+" : ""}${position.pnl.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Performance History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Recent Performance</h3>
        <div className="space-y-2">
          {recentTrades.slice(0, 10).map(trade => (
            <div
              key={trade.id}
              className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    trade.type === "LONG"
                      ? "bg-success/20 text-success"
                      : "bg-loss/20 text-loss"
                  }`}
                >
                  {trade.type}
                </span>
                <div>
                  <p className="font-semibold">{trade.pair}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(trade.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Entry/Exit</p>
                  <p className="text-sm font-semibold">
                    ${trade.entryPrice} → ${trade.exitPrice || "Open"}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${trade.pnl > 0 ? "text-success" : "text-loss"}`}
                  >
                    {trade.pnl > 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {trade.pnlPercent > 0 ? "+" : ""}
                    {trade.pnlPercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;
