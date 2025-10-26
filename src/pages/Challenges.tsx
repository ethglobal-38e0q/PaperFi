"use client";

import {
  Target,
  Trophy,
  Zap,
  Clock,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

const Confetti = ({ isActive }: { isActive: boolean }) => {
  const confetti = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
  }));

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {confetti.map(item => (
            <motion.div
              key={item.id}
              initial={{ y: -10, opacity: 1, rotate: 0 }}
              animate={{ y: window.innerHeight + 10, opacity: 0, rotate: 360 }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                ease: "easeIn",
              }}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
              style={{ left: `${item.left}%` }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

const CongratulationsModal = ({
  isOpen,
  reward,
  onClose,
}: {
  isOpen: boolean;
  reward: string;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-xl border border-primary/30 rounded-2xl p-8 text-center max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: 2 }}
              className="mb-4"
            >
              {/* <Sparkles className="w-16 h-16 text-primary mx-auto" /> */}
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-muted-foreground mb-2">
              You've completed the challenge
            </p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="bg-gradient-to-r from-primary to-secondary rounded-xl p-4 mb-6"
            >
              <p className="text-2xl font-bold text-white">+{reward}</p>
            </motion.div>
            <p className="text-sm text-muted-foreground mb-6">
              Your PayPal USD has been credited to your account
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Awesome!
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Challenges = () => {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [claimedChallenges, setClaimedChallenges] = useState<number[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [celebratingReward, setCelebratingReward] = useState("");
  const [celebratingId, setCelebratingId] = useState<number | null>(null);
  const { address } = useAccount();
  console.log(address);

  const activeChallenges = [
    {
      id: 1,
      title: "Consistency Master",
      description: "Maintain a winning streak of 5 trades",
      progress: 5,
      target: 5,
      reward: 0.5,
      timeLeft: "2 days",
      difficulty: "Medium",
    },
    {
      id: 2,
      title: "Volume King",
      description: "Complete 50 trades this month",
      progress: 32,
      target: 50,
      reward: 10,
      timeLeft: "12 days",
      difficulty: "Hard",
    },
    {
      id: 3,
      title: "Profit Seeker",
      description: "Achieve $500 P&L in a single week",
      progress: 245.5,
      target: 500,
      reward: 7.5,
      timeLeft: "4 days",
      difficulty: "Medium",
    },
  ];

  const upcomingChallenges = [
    {
      id: 4,
      title: "Diamond Hands",
      description: "Hold a position for 24+ hours profitably",
      reward: 3,
      difficulty: "Easy",
    },
    {
      id: 5,
      title: "Risk Manager",
      description: "Complete 20 trades with max 2% loss each",
      reward: 8,
      difficulty: "Hard",
    },
  ];

  // const handleClaimReward = (challengeId: number, reward: string) => {
  //   setCelebratingId(challengeId)
  //   setCelebratingReward(reward)
  //   setShowCongrats(true)
  //   setClaimedChallenges([...claimedChallenges, challengeId])
  // }

  const handleClaimReward = async (challengeId: number, reward: numberr) => {
    // Build the URL with query params
    const url = `/api/pyusd?wallet=${address}&challengeId=${challengeId}&reward=${reward}`;
    try {
      const res = await axios.get(url);
      setCelebratingId(challengeId);
      setCelebratingReward(reward);
      setShowCongrats(true);
      setClaimedChallenges(prev => [...prev, challengeId]);
    } catch (err) {
      console.error("Claim reward error:", err);
      throw new Error(err.message || "Failed to claim reward");
    }
  };

  const handleCloseCongrats = () => {
    setShowCongrats(false);
    setCelebratingId(null);
  };

  return (
    <div className="p-6 space-y-6">
      <Confetti isActive={showCongrats} />
      <CongratulationsModal
        isOpen={showCongrats}
        reward={celebratingReward}
        onClose={handleCloseCongrats}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Target className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold">Challenges</h1>
        </div>
        <p className="text-muted-foreground">
          Complete challenges to earn PayPal USD (PYUSD) and climb the
          leaderboard
        </p>
      </motion.div>

      {/* Active Challenges */}
      <div>
        <h2 className="text-xl font-bold mb-4">Active Challenges</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeChallenges.map((challenge, index) => {
            const progressPercent =
              (challenge.progress / challenge.target) * 100;
            const isCompleted = challenge.progress >= challenge.target;
            const isClaimed = claimedChallenges.includes(challenge.id);

            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`glass-hover p-6 rounded-xl border transition-all ${
                  isClaimed
                    ? "border-success/50 bg-success/5"
                    : isCompleted
                      ? "border-primary/50 bg-primary/5"
                      : "border-primary/20"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">{challenge.title}</h3>
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <CheckCircle className="w-5 h-5 text-success" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {challenge.description}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      challenge.difficulty === "Easy"
                        ? "bg-success/20 text-success"
                        : challenge.difficulty === "Medium"
                          ? "bg-primary/20 text-primary"
                          : "bg-loss/20 text-loss"
                    }`}
                  >
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
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progressPercent, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-3 rounded-full ${
                        isCompleted
                          ? "bg-gradient-to-r from-success to-success"
                          : "bg-gradient-to-r from-primary to-secondary"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <motion.div
                      className="flex items-center gap-1 text-accent"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Trophy className="w-4 h-4" />
                      <span className="font-semibold">
                        {challenge.reward} PYUSD
                      </span>
                    </motion.div>
                    {!isCompleted && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{challenge.timeLeft}</span>
                      </div>
                    )}
                  </div>
                  {isClaimed ? (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled
                      className="text-success bg-transparent"
                    >
                      ✓ Claimed
                    </Button>
                  ) : isCompleted ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        className="bg-success hover:bg-success/90 text-white"
                        onClick={() =>
                          handleClaimReward(challenge.id, challenge.reward)
                        }
                      >
                        Claim {challenge.reward} PYUSD
                      </Button>
                    </motion.div>
                  ) : (
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  )}
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
              whileHover={{ y: -2 }}
              className="glass-hover p-6 rounded-xl opacity-75"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold mb-1">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    challenge.difficulty === "Easy"
                      ? "bg-success/20 text-success"
                      : challenge.difficulty === "Medium"
                        ? "bg-primary/20 text-primary"
                        : "bg-loss/20 text-loss"
                  }`}
                >
                  {challenge.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-accent">
                  <Trophy className="w-4 h-4" />
                  <span className="font-semibold text-sm">
                    {challenge.reward}
                  </span>
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
        whileHover={{ scale: 1.02 }}
        className="glass p-8 rounded-xl text-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Compete for Glory</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Complete challenges to earn PayPal USD (PYUSD) and climb the global
          leaderboard. Top performers get exclusive funding opportunities and
          real cryptocurrency rewards!
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="glow-primary">View Leaderboard</Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Challenges;
