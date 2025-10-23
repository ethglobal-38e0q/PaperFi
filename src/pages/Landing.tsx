"use client";

import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  TrendingUp,
  BarChart3,
  Flame,
  Trophy,
  Zap,
  ArrowRight,
  CheckCircle2,
  Target,
  Award,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedGrid } from "../components/AnimatedGrid";
import { FloatingParticles } from "../components/FloatingParticles";
import { useRef } from "react";

const platformStats = {
  totalVolume: "2.8B",
  activeTraders: 12847,
  fundsAllocated: "125M",
};

const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });

  const ctaY = useTransform(ctaProgress, [0, 1], [100, -100]);
  const ctaScale = useTransform(ctaProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const features = [
    {
      icon: BarChart3,
      title: "Real Market Feeds, No Risk",
      description:
        "Practice with live market data without risking real capital. Get instant feedback on every trade.",
    },
    {
      icon: Flame,
      title: "Track Performance",
      description:
        "Monitor your streaks, P&L, and win rates in real-time with advanced heatmaps and analytics.",
    },
    {
      icon: Trophy,
      title: "Get Funded by Real Clients",
      description:
        "Top performers get funding opportunities from capital providers. Turn practice into profit.",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-hidden"
    >
      <AnimatedGrid />
      <FloatingParticles />

      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105">
                <img src="neon-icon.jpg" alt="" />
                {/* <img src="icon.png" alt="" /> */}
              </div>
              <span className="text-2xl font-bold text-white">
                PerpPractice
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white">
                  Login
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/40">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <motion.section
          ref={heroRef}
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="pt-40 pb-32 px-6 relative"
        >
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-8"
              ></motion.div>

              <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[1.1] tracking-tight">
                <span className="block text-white">Trade Smart.</span>
                <span className="block bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                  Practice Hard.
                </span>
                <span className="block text-white">Get Funded.</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Master perpetuals trading in a risk-free environment with real
                market data.{" "}
                <span className="text-purple-400 font-semibold">
                  Prove your skills
                </span>{" "}
                and get funded by real clients.
              </p>

              <div className="flex gap-5 justify-center flex-wrap mb-20">
                <Link to="/login">
                  <Button
                    size="lg"
                    className="gap-3 group bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60"
                  >
                    <span className="flex items-center gap-3">
                      Start Practicing
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <Link to="/app/leaderboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Trophy className="w-5 h-5" />
                    View Leaderboard
                  </Button>
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              >
                {[
                  {
                    label: "Simulated Volume",
                    value: `$${platformStats.totalVolume}`,
                  },
                  {
                    label: "Active Traders",
                    value: platformStats.activeTraders.toLocaleString(),
                  },
                  {
                    label: "Funds Allocated",
                    value: `$${platformStats.fundsAllocated}`,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                    <div className="relative backdrop-blur-xl bg-gray-900/60 border border-white/10 p-8 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="text-5xl font-black text-white mb-3">
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-base font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <section className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

          <div className="container mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-24"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
                Why{" "}
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  PerpPractice
                </span>
                ?
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Everything you need to master trading and unlock real funding
                opportunities
              </p>
            </motion.div>

            <div className="space-y-24">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${isEven ? "" : "md:grid-cols-2"}`}
                  >
                    {/* Content Block */}
                    <div className={isEven ? "md:order-1" : "md:order-2"}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-600/30 to-purple-800/30 rounded-2xl flex items-center justify-center border border-purple-500/50">
                            <Icon className="w-8 h-8 text-purple-400" />
                          </div>
                          <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-purple-400" />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                          {feature.title}
                        </h3>
                        <p className="text-lg text-gray-400 leading-relaxed mb-8">
                          {feature.description}
                        </p>
                        <div className="flex items-center gap-3 text-purple-400 font-semibold group cursor-pointer">
                          <span>Learn more</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Visual Block */}
                    <div className={isEven ? "md:order-2" : "md:order-1"}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                        className="relative h-80 md:h-96 rounded-3xl overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-purple-500/10 to-purple-800/20" />
                        <div className="absolute inset-0 backdrop-blur-xl bg-gray-900/40 border border-purple-500/30" />

                        {/* Animated content inside visual block */}
                        <div className="relative w-full h-full flex items-center justify-center ">
                          <motion.div
                            transition={{
                              duration: 4,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                            className="text-center"
                          >
                            {/* <Icon className="w-24 h-24 text-purple-400/60 mx-auto mb-6" />
                            <p className="text-gray-300 text-sm font-medium">
                              {index === 0 && "Live market data • Zero risk"}
                              {index === 1 && "Real-time analytics • Advanced metrics"}
                              {index === 2 && "Top performers • Capital ready"}
                            </p> */}
                            {index === 0 && (
                              <img src="pic1.jpg" alt="" className=" w-full" />
                            )}
                            {index === 1 && (
                              <img src="pic2.jpg" alt="" className=" w-full " />
                            )}
                            {index === 2 && (
                              <img src="pic3.jpg" alt="" className=" w-full" />
                            )}
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="relative py-40 px-6 overflow-hidden">
          {/* Animated Background Elements */}
          <motion.div
            style={{ y: ctaY, scale: ctaScale }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/30 via-purple-600/10 to-transparent" />
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </motion.div>

          <div className="container mx-auto relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              {/* Floating Icon Grid */}
              <div className="relative mb-12 h-24">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-1/2 top-0 -translate-x-1/2"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.5)] rotate-12">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute left-1/4 top-8"
                >
                  <Target className="w-12 h-12 text-purple-500/60" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute right-1/4 top-8"
                >
                  <Award className="w-12 h-12 text-violet-500/60" />
                </motion.div>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-6xl md:text-7xl font-black mb-6 text-foreground"
              >
                Ready to{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                    Start Trading
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-purple-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </span>
                ?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Join{" "}
                <span className="text-purple-400 font-bold">
                  {platformStats.activeTraders.toLocaleString()}+
                </span>{" "}
                traders improving their skills every day. Start your journey
                from practice to funded trader.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex gap-6 justify-center flex-wrap"
              >
                <Link to="/login">
                  <Button
                    size="lg"
                    className="gap-3 text-xl px-12 py-7 group bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] hover:scale-105 transition-all"
                  >
                    <span>Get Started Free</span>
                    <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-16 flex gap-12 justify-center flex-wrap text-center"
              >
                <div>
                  <div className="text-3xl font-black text-violet-400 mb-1">
                    ${platformStats.totalVolume}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Volume
                  </div>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <div className="text-3xl font-black text-purple-400 mb-1">
                    ${platformStats.fundsAllocated}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Funds Allocated
                  </div>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <div className="text-3xl font-black text-violet-400 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Market Access
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-16 px-6 backdrop-blur-xl bg-gray-900/40">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
              {[
                {
                  title: "Product",
                  links: ["Features", "Pricing", "FAQ"],
                },
                {
                  title: "Company",
                  links: ["About", "Blog", "Careers"],
                },
                {
                  title: "Resources",
                  links: ["Docs", "Support", "Privacy"],
                },
                {
                  title: "Connect",
                  links: ["Twitter", "Discord", "Contact"],
                },
              ].map((section, index) => (
                <div key={index}>
                  <h4 className="font-bold mb-5 text-white text-lg">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to="#"
                          className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-base"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-10 text-center">
              <p className="text-gray-500 text-base">
                © 2025 PerpPractice. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
