import { useState } from "react";
import { leaderboard } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, TrendingUp, Target, Search, Medal } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState("7d");
  const [searchQuery, setSearchQuery] = useState("");

  const getMedalColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-600";
    return "text-muted-foreground";
  };

  const getMedalIcon = (rank: number) => {
    if (rank <= 3) return <Medal className={`w-6 h-6 ${getMedalColor(rank)}`} />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  const filteredLeaderboard = leaderboard.filter(trader =>
    trader.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Global Leaderboard</h1>
        </div>
        <p className="text-muted-foreground">
          Top performers ranked by trading success
        </p>
      </motion.div>

      {/* Filters */}
      <div className="glass p-4 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Timeframe */}
          <div className="flex gap-2">
            {["7d", "30d", "all-time"].map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(tf)}
              >
                {tf === "7d" ? "7 Days" : tf === "30d" ? "30 Days" : "All Time"}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search traders..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {filteredLeaderboard.map((trader, index) => (
          <motion.div
            key={trader.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`glass-hover p-6 rounded-xl ${
              index < 3 ? "border-2 border-primary/30 glow-primary" : ""
            }`}
          >
            <div className="flex items-center gap-6">
              {/* Rank */}
              <div className="flex-shrink-0 w-16 text-center">
                {getMedalIcon(index + 1)}
              </div>

              {/* Avatar & Name */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={trader.avatar}
                  alt={trader.name}
                  className="w-14 h-14 rounded-full ring-2 ring-primary/30"
                />
                <div>
                  <h3 className="text-xl font-bold">{trader.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {trader.totalVolume} volume
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="hidden md:grid grid-cols-4 gap-8 flex-1">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">P&L</p>
                  <p className="text-xl font-bold text-success">
                    ${trader.pnl.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
                  <p className="text-xl font-bold">{trader.winRate}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Streak</p>
                  <p className="text-xl font-bold flex items-center justify-center gap-1">
                    <TrendingUp className="w-4 h-4 text-success" />
                    {trader.streak}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Points</p>
                  <p className="text-xl font-bold text-primary">
                    {trader.successPoints.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Action */}
              <Link to={`/profile/${trader.id}`}>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </Link>
            </div>

            {/* Mobile Stats */}
            <div className="grid grid-cols-4 gap-4 mt-4 md:hidden">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">P&L</p>
                <p className="text-sm font-bold text-success">
                  ${trader.pnl.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
                <p className="text-sm font-bold">{trader.winRate}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Streak</p>
                <p className="text-sm font-bold">{trader.streak}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Points</p>
                <p className="text-sm font-bold text-primary">
                  {trader.successPoints.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Your Position */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass p-6 rounded-xl border-2 border-accent/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your Rank</p>
              <p className="text-2xl font-bold">#12</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Next Rank</p>
            <p className="font-semibold">+125 points needed</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
