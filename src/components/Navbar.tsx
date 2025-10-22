import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Bell, Wallet, Settings, TrendingUp } from "lucide-react";
import { ConnectKitButton } from "connectkit";
import { useAuth } from "@/contexts/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isLanding = location.pathname === "/";

  if (isLanding) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105">
            <img src="neon-icon.png" alt="" />
            {/* <img src="icon.png" alt="" /> */}
          </div>
          <span className="text-2xl font-bold text-white">PaperFi</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          {location.pathname.startsWith("/app") && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search pairs or traders..."
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/*<Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          </Button>*/}

          <ConnectKitButton />

          {/* User Avatar */}
          {user && (
            <>
              <Link to="/app/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <Link
                to="/app/profile"
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-md font-bold">
                    {user.user_metadata?.custom_claims?.address
                      ?.substr(2, 2)
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:inline font-medium">
                  {user.user_metadata?.username}
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
