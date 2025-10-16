import { currentUser, pnlHistory, recentTrades } from "@/data/mockData";
import StatsCard from "@/components/StatsCard";
import { TrendingUp, Target, Clock, BarChart3, Award, Zap } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const Analytics = () => {
  const winLossData = [
    {
      name: "Wins",
      value: Math.floor(currentUser.totalTrades * (currentUser.winRate / 100)),
      fill: "hsl(var(--success))",
    },
    {
      name: "Losses",
      value: Math.floor(
        currentUser.totalTrades * (1 - currentUser.winRate / 100)
      ),
      fill: "hsl(var(--loss))",
    },
  ];

  const tradesByPair = recentTrades.reduce(
    (acc, trade) => {
      acc[trade.pair] = (acc[trade.pair] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const pairData = Object.entries(tradesByPair).map(([pair, count]) => ({
    pair,
    count,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <h1 className="text-3xl font-bold mb-2">Performance Analytics</h1>
        <p className="text-muted-foreground">
          Deep dive into your trading performance and statistics
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total P&L"
          value={`$${currentUser.totalPnL.toFixed(2)}`}
          change={12.5}
          icon={TrendingUp}
          trend="up"
        />
        <StatsCard
          title="Win Rate"
          value={`${currentUser.winRate}%`}
          icon={Target}
          trend="up"
          subtitle={`${currentUser.totalTrades} total trades`}
        />
        <StatsCard
          title="Sharpe Ratio"
          value={currentUser.sharpeRatio}
          icon={BarChart3}
          trend="up"
          subtitle="Risk-adjusted return"
        />
        <StatsCard
          title="Avg Hold Time"
          value={currentUser.avgHoldTime}
          icon={Clock}
          trend="neutral"
          subtitle="Per position"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* P&L Over Time */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">P&L Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pnlHistory}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={date =>
                  new Date(date).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Win/Loss Ratio */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Win/Loss Ratio</h3>
          <div className="flex items-center justify-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={winLossData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {winLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="text-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Wins</span>
              </div>
              <p className="text-2xl font-bold text-success mt-1">
                {winLossData[0].value}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-loss" />
                <span className="text-sm text-muted-foreground">Losses</span>
              </div>
              <p className="text-2xl font-bold text-loss mt-1">
                {winLossData[1].value}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trades by Pair */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Trades by Pair</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pairData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis dataKey="pair" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="count"
                fill="hsl(var(--primary))"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Achievement Badges</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg text-center border border-primary/20">
              <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold">3-Day Streak</p>
              <p className="text-xs text-muted-foreground mt-1">Current</p>
            </div>
            <div className="bg-success/10 p-4 rounded-lg text-center border border-success/20">
              <Award className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="font-semibold">Top 15</p>
              <p className="text-xs text-muted-foreground mt-1">Leaderboard</p>
            </div>
            <div className="bg-secondary/10 p-4 rounded-lg text-center border border-secondary/20">
              <Target className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="font-semibold">68% Win Rate</p>
              <p className="text-xs text-muted-foreground mt-1">Consistency</p>
            </div>
            <div className="bg-accent/10 p-4 rounded-lg text-center border border-accent/20">
              <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="font-semibold">$1.5K P&L</p>
              <p className="text-xs text-muted-foreground mt-1">Total Profit</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Success Points</p>
                <p className="text-2xl font-bold gradient-text">
                  {currentUser.successPoints.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
        <div className="space-y-3">
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <p className="text-sm">
              <span className="font-semibold text-success">
                ✓ Strong Performance:
              </span>{" "}
              Your win rate of {currentUser.winRate}% is above the platform
              average of 64.2%
            </p>
          </div>
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm">
              <span className="font-semibold text-primary">→ Opportunity:</span>{" "}
              Consider increasing position sizes on BTCUSDT trades where you
              have an 85% win rate
            </p>
          </div>
          <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <p className="text-sm">
              <span className="font-semibold text-accent">★ Milestone:</span>{" "}
              You're just 2 spots away from breaking into the top 10 on the
              leaderboard!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
