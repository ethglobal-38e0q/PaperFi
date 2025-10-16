import { leaderboard } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, TrendingUp, Target, Award } from "lucide-react";
import { motion } from "framer-motion";

const Clients = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Client Portal</h1>
        </div>
        <p className="text-muted-foreground">
          Browse and fund top-performing traders
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-hover p-6 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Traders</p>
              <p className="text-2xl font-bold">247</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-hover p-6 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Win Rate</p>
              <p className="text-2xl font-bold">68.5%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-hover p-6 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Funds Deployed</p>
              <p className="text-2xl font-bold">$125M</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search */}
      <div className="glass p-4 rounded-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search traders by name or performance..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Trader Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaderboard.map((trader, index) => (
          <motion.div
            key={trader.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-hover p-6 rounded-xl"
          >
            {/* Trader Header */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={trader.avatar}
                alt={trader.name}
                className="w-16 h-16 rounded-full ring-2 ring-primary/30"
              />
              <div>
                <h3 className="font-bold text-lg">{trader.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Rank #{index + 1}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Total P&L</p>
                <p className="text-lg font-bold text-success">
                  ${trader.pnl.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Win Rate</p>
                <p className="text-lg font-bold">{trader.winRate}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Streak</p>
                <p className="text-lg font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  {trader.streak}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Volume</p>
                <p className="text-lg font-bold">{trader.totalVolume}</p>
              </div>
            </div>

            {/* Performance Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Performance</span>
                <span className="font-semibold text-primary">
                  {trader.pnlPercent}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(trader.pnlPercent, 100)}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" size="sm">
                View Profile
              </Button>
              <Button className="flex-1 glow-primary" size="sm">
                Fund Trader
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass p-8 rounded-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="font-semibold mb-2">Browse Traders</h3>
            <p className="text-sm text-muted-foreground">
              Review performance metrics, win rates, and trading history
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="font-semibold mb-2">Allocate Capital</h3>
            <p className="text-sm text-muted-foreground">
              Choose funding amount and profit-sharing terms
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="font-semibold mb-2">Track Returns</h3>
            <p className="text-sm text-muted-foreground">
              Monitor performance and receive profit distributions
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Clients;
