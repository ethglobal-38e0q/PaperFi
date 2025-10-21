import {
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Users,
  Zap,
  Activity,
  Clock,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import StatsCard from "@/components/StatsCard";
import Heatmap from "@/components/Heatmap";
import MiniChart from "@/components/MiniChart";
import {
  currentUser,
  recentTrades,
  fundingOffers,
  pnlHistory,
  marketData,
} from "@/data/mockData";
import { useAuth } from "@/contexts/AuthProvider";
import { useAccount } from "wagmi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { address } = useAccount();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const hourlyPnL = [
    { hour: "00:00", pnl: 120 },
    { hour: "04:00", pnl: -50 },
    { hour: "08:00", pnl: 240 },
    { hour: "12:00", pnl: 310 },
    { hour: "16:00", pnl: -100 },
    { hour: "20:00", pnl: 450 },
  ];

  const tradeDistribution = [
    { name: "Wins", value: 68, fill: "hsl(var(--success))" },
    { name: "Losses", value: 32, fill: "hsl(var(--loss))" },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Welcome Header with Real-Time Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back,{" "}
              <span className="gradient-text">
                {user.user_metadata?.username ||
                  (address ? formatAddress(address) : "Trader")}
              </span>
            </h1>
            <p className="text-muted-foreground">
              {isAuthenticated && address && (
                <>Connected with {formatAddress(address)} • </>
              )}
              Real-time performance tracking • Rank #{currentUser.rank} globally
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Session P&L</p>
              <p className="text-2xl font-bold text-success">+$245.50</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Active Time</p>
              <p className="text-2xl font-bold">2h 34m</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid - 6 Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
      >
        <motion.div variants={item}>
          <StatsCard
            title="Daily P&L"
            value={`$${currentUser.dailyPnL.toFixed(2)}`}
            change={8.2}
            icon={currentUser.dailyPnL > 0 ? TrendingUp : TrendingDown}
            trend={currentUser.dailyPnL > 0 ? "up" : "down"}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Win Rate"
            value={`${currentUser.winRate}%`}
            icon={Target}
            trend="up"
            subtitle="147 trades"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Streak"
            value={currentUser.streak}
            icon={Zap}
            trend="up"
            subtitle="winning"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Rank"
            value={`#${currentUser.rank}`}
            icon={Award}
            trend="up"
            subtitle="of 1,247"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Avg Hold"
            value="2.4h"
            icon={Clock}
            trend="neutral"
            subtitle="per trade"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Vol Today"
            value="$42.5K"
            icon={Activity}
            trend="up"
            subtitle="traded"
          />
        </motion.div>
      </motion.div>

      {/* Performance Heatmap */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Heatmap />
      </motion.div>
      {/* Main Content Grid - Complex Layout */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column - Charts */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {/* Dual Chart Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold mb-4">P&L Trend (7d)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={pnlHistory}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 10 }}
                    tickFormatter={date =>
                      new Date(date).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pnl"
                    stroke="hsl(var(--success))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--success))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-success">
                    ${currentUser.totalPnL.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total P&L</p>
                </div>
                <Link to="/app/analytics">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold mb-4">Today's Activity</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={hourlyPnL}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="hour"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="pnl"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Trades</p>
                  <p className="text-xl font-bold">12</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Wins</p>
                  <p className="text-xl font-bold text-success">9</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Losses</p>
                  <p className="text-xl font-bold text-loss">3</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Market Overview Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Market Overview</h3>
              <Link to="/app/trade">
                <Button variant="outline" size="sm">
                  Open Trade Terminal
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(marketData).map(([pair, data]) => (
                <div
                  key={pair}
                  className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <p className="text-sm font-semibold mb-1">
                    {pair.replace("USDT", "/USDT")}
                  </p>
                  <p className="text-xl font-bold font-mono">
                    ${data.price.toLocaleString()}
                  </p>
                  <p
                    className={`text-sm font-semibold mt-1 ${data.change > 0 ? "text-success" : "text-loss"}`}
                  >
                    {data.change > 0 ? "+" : ""}
                    {data.change}%
                  </p>
                  <div className="mt-2 h-12">
                    <MiniChart
                      data={[...Array(20)].map(
                        () => Math.random() * 100 + data.price
                      )}
                      color={
                        data.change > 0
                          ? "hsl(var(--success))"
                          : "hsl(var(--loss))"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Trades Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Trades</h3>
              <Link to="/app/trade">
                <Button variant="outline" size="sm">
                  New Trade
                </Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b border-border">
                    <th className="text-left py-2">Time</th>
                    <th className="text-left py-2">Symbol</th>
                    <th className="text-left py-2">Side</th>
                    <th className="text-right py-2">Size</th>
                    <th className="text-right py-2">Entry</th>
                    <th className="text-right py-2">Exit</th>
                    <th className="text-right py-2">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.slice(0, 8).map(trade => (
                    <tr
                      key={trade.id}
                      className="border-b border-border/50 hover:bg-muted/20"
                    >
                      <td className="py-2 text-muted-foreground">
                        {new Date(trade.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-2 font-semibold">{trade.pair}</td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            trade.type === "LONG"
                              ? "bg-success/20 text-success"
                              : "bg-loss/20 text-loss"
                          }`}
                        >
                          {trade.type}
                        </span>
                      </td>
                      <td className="py-2 text-right font-mono">
                        {trade.size}
                      </td>
                      <td className="py-2 text-right font-mono">
                        ${trade.entryPrice}
                      </td>
                      <td className="py-2 text-right font-mono">
                        ${trade.exitPrice || "Open"}
                      </td>
                      <td
                        className={`py-2 text-right font-bold ${trade.pnl > 0 ? "text-success" : "text-loss"}`}
                      >
                        {trade.pnl > 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Sidebar Info */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Win/Loss Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-xl"
          >
            <h3 className="text-lg font-semibold mb-4">Win/Loss Ratio</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={tradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {tradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-8 mt-4">
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-sm text-muted-foreground">Wins</span>
                </div>
                <p className="text-2xl font-bold text-success mt-1">68%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-3 h-3 rounded-full bg-loss" />
                  <span className="text-sm text-muted-foreground">Losses</span>
                </div>
                <p className="text-2xl font-bold text-loss mt-1">32%</p>
              </div>
            </div>
          </motion.div>

          {/* Performance Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 rounded-xl"
          >
            <h3 className="text-lg font-semibold mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-primary/10 p-3 rounded-lg text-center border border-primary/20">
                <Zap className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="font-semibold text-sm">3-Day Streak</p>
              </div>
              <div className="bg-success/10 p-3 rounded-lg text-center border border-success/20">
                <Award className="w-6 h-6 text-success mx-auto mb-1" />
                <p className="font-semibold text-sm">Top 15</p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-lg text-center border border-secondary/20">
                <Target className="w-6 h-6 text-secondary mx-auto mb-1" />
                <p className="font-semibold text-sm">68% Win</p>
              </div>
              <div className="bg-accent/10 p-3 rounded-lg text-center border border-accent/20">
                <TrendingUp className="w-6 h-6 text-accent mx-auto mb-1" />
                <p className="font-semibold text-sm">$1.5K P&L</p>
              </div>
            </div>
          </motion.div>

          {/* Funding Offers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Funding Offers</h3>
              <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold">
                {fundingOffers.length} New
              </span>
            </div>
            <div className="space-y-3">
              {fundingOffers.map(offer => (
                <div
                  key={offer.id}
                  className="p-4 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={offer.clientAvatar}
                      alt={offer.clientName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {offer.clientName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {offer.profitSplit}
                      </p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-primary mb-1">
                    ${offer.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {offer.conditions}
                  </p>
                  <Button className="w-full" size="sm">
                    View Offer
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-6 rounded-xl"
          >
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/app/trade">
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="w-4 h-4 mr-2" />
                  Open Trade Terminal
                </Button>
              </Link>
              <Link to="/app/analytics">
                <Button className="w-full justify-start" variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
              <Link to="/app/challenges">
                <Button className="w-full justify-start" variant="outline">
                  <Award className="w-4 h-4 mr-2" />
                  Join Challenge
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Risk Alert */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass p-6 rounded-xl border-l-4 border-accent"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">
                  Risk Management Tip
                </h4>
                <p className="text-xs text-muted-foreground">
                  Your current leverage is high. Consider reducing position
                  sizes to maintain healthy risk levels.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
