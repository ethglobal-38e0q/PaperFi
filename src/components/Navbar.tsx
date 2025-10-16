import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Bell, Wallet, Settings, TrendingUp } from "lucide-react";
import { currentUser } from "@/data/mockData";
import { ConnectKitButton } from "connectkit";

const Navbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  if (isLanding) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/app/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center glow-primary">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">PerpPractice</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search pairs or traders..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          </Button>
          
          <ConnectKitButton />

          <Link to="/app/settings">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>

          {/* User Avatar */}
          <Link to="/app/profile" className="flex items-center gap-2 p-1 rounded-lg hover:bg-muted/50 transition-colors">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.username}
              className="w-8 h-8 rounded-full ring-2 ring-primary/30"
            />
            <span className="hidden lg:inline font-medium">{currentUser.username}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
