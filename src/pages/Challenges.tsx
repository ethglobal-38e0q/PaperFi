import { Target, Trophy, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Challenges = () => {
  const activeChallenges = [
    {
      id: 1,
      title: "Consistency Master",
      description: "Maintain a winning streak of 5 trades",
      progress: 3,
      target: 5,
      reward: "500 Points",
      timeLeft: "2 days",
      difficulty: "Medium",
    },
    {
      id: 2,
      title: "Volume King",
      description: "Complete 50 trades this month",
      progress: 32,
      target: 50,
      reward: "1000 Points",
      timeLeft: "12 days",
      difficulty: "Hard",
    },
    {
      id: 3,
      title: "Profit Seeker",
      description: "Achieve $500 P&L in a single week",
      progress: 245.50,
      target: 500,
      reward: "750 Points",
      timeLeft: "4 days",
      difficulty: "Medium",
    },
  ];

  const upcomingChallenges = [
    {
      id: 4,
      title: "Diamond Hands",
      description: "Hold a position for 24+ hours profitably",
      reward: "300 Points",
      difficulty: "Easy",
    },
    {
      id: 5,
      title: "Risk Manager",
      description: "Complete 20 trades with max 2% loss each",
      reward: "800 Points",
      difficulty: "Hard",
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
          <Target className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Challenges</h1>
        </div>
        <p className="text-muted-foreground">
          Complete challenges to earn points and climb the leaderboard
        </p>
      </motion.div>

      {/* Active Challenges */}
      <div>
        <h2 className="text-xl font-bold mb-4">Active Challenges</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeChallenges.map((challenge, index) => {
            const progressPercent = (challenge.progress / challenge.target) * 100;
            
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-hover p-6 rounded-xl border border-primary/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {challenge.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    challenge.difficulty === "Easy" ? "bg-success/20 text-success" :
                    challenge.difficulty === "Medium" ? "bg-primary/20 text-primary" :
                    "bg-loss/20 text-loss"
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">
                      {challenge.progress} / {challenge.target}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-accent">
                      <Trophy className="w-4 h-4" />
                      <span className="font-semibold">{challenge.reward}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{challenge.timeLeft}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Challenges */}
      <div>
        <h2 className="text-xl font-bold mb-4">Upcoming Challenges</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-hover p-6 rounded-xl opacity-75"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold mb-1">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  challenge.difficulty === "Easy" ? "bg-success/20 text-success" :
                  challenge.difficulty === "Medium" ? "bg-primary/20 text-primary" :
                  "bg-loss/20 text-loss"
                }`}>
                  {challenge.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-accent">
                  <Trophy className="w-4 h-4" />
                  <span className="font-semibold text-sm">{challenge.reward}</span>
                </div>
                <Button size="sm" variant="outline" disabled>
                  Coming Soon
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaderboard Promo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass p-8 rounded-xl text-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
      >
        <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Compete for Glory</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Complete challenges to earn success points and climb the global leaderboard. 
          Top performers get exclusive funding opportunities!
        </p>
        <Button className="glow-primary">
          View Leaderboard
        </Button>
      </motion.div>
    </div>
  );
};

export default Challenges;
