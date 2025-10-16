import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Target, Users, Award, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { platformStats } from "@/data/mockData";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "Real Market Feeds, No Risk",
      description: "Practice with live market data without risking real capital",
    },
    {
      icon: Target,
      title: "Track Performance",
      description: "Monitor your streaks, P&L, and win rates in real-time",
    },
    {
      icon: Users,
      title: "Get Funded by Real Clients",
      description: "Top performers get funding opportunities from capital providers",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center glow-primary">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">PerpPractice</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="glow-primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Trade Smart. <br />
              <span className="gradient-text">Practice Hard.</span> <br />
              Get Funded.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master perpetuals trading in a risk-free environment with real market data. 
              Prove your skills and get funded by real clients.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/app/dashboard">
                <Button size="lg" className="gap-2 glow-primary text-lg px-8">
                  Start Practicing <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/app/leaderboard">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto"
          >
            <div className="glass-hover p-6 rounded-xl">
              <div className="text-4xl font-bold gradient-text mb-2">{platformStats.totalVolume}</div>
              <div className="text-muted-foreground">Simulated Volume</div>
            </div>
            <div className="glass-hover p-6 rounded-xl">
              <div className="text-4xl font-bold gradient-text mb-2">{platformStats.activeTraders.toLocaleString()}</div>
              <div className="text-muted-foreground">Active Traders</div>
            </div>
            <div className="glass-hover p-6 rounded-xl">
              <div className="text-4xl font-bold gradient-text mb-2">${platformStats.fundsAllocated}</div>
              <div className="text-muted-foreground">Funds Allocated</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why PerpPractice?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The ultimate platform for aspiring traders to prove their skills
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-hover p-8 rounded-xl text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 glow-primary">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-hover p-12 rounded-2xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Trading?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of traders improving their skills every day
              </p>
              <Link to="/app/dashboard">
                <Button size="lg" className="gap-2 glow-primary text-lg px-8">
                  Get Started Free <Zap className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#" className="hover:text-foreground transition-colors">Docs</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Support</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#" className="hover:text-foreground transition-colors">Twitter</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Discord</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
            <p>© 2025 PerpPractice. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
