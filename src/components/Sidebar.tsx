import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  Trophy, 
  Briefcase, 
  Settings,
  Users,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/app/dashboard" },
  { icon: TrendingUp, label: "Trade", path: "/app/trade" },
  { icon: BarChart3, label: "Analytics", path: "/app/analytics" },
  { icon: Trophy, label: "Leaderboard", path: "/app/leaderboard" },
  { icon: Briefcase, label: "Portfolio", path: "/app/portfolio" },
  { icon: Users, label: "Client Portal", path: "/app/clients" },
  { icon: Target, label: "Challenges", path: "/app/challenges" },
  { icon: Settings, label: "Settings", path: "/app/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  if (isLanding) return null;

  return (
    <aside className=" w-64 glass border-r border-border/50 hidden lg:flex flex-col">
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20 glow-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t border-border/50">
        <div className="glass p-4 rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">Daily P&L</p>
          <p className="text-2xl font-bold text-success">+$245.50</p>
          <p className="text-xs text-success mt-1">+8.2% today</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
