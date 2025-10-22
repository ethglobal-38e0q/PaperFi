import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Trophy,
  Briefcase,
  Settings,
  Users,
  Target,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/contexts/SidebarProvider";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/app/dashboard" },
  { icon: Search, label: "Launchpad", path: "/app/launchpad" },
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
  const sidebar = useSidebar();

  if (isLanding) return null;

  return (
    <aside
      className={cn(
        "glass border-r border-border/50 hidden lg:flex flex-col transition-all duration-300 ease-out",
        sidebar.isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-1 px-2">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            const LinkContent = (
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg transition-all duration-200 group w-full",
                  "px-3 py-3",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20 glow-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform group-hover:scale-110 flex-shrink-0",
                    isActive && "text-primary"
                  )}
                />
                <span
                  className={cn(
                    "font-medium transition-all duration-300 ease-in-out whitespace-nowrap",
                    sidebar.isCollapsed
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );

            return (
              <div key={item.path}>
                {sidebar.isCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>{LinkContent}</TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                ) : (
                  LinkContent
                )}
              </div>
            );
          })}
        </nav>
        {/* Toggle Button */}
        <div className="flex p-2 w-full">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={sidebar.toggle}
              className="bg-muted/80 hover:bg-white/10"
            >
              <ChevronRight
                className={cn(
                  "transition-all duration-300 ease-out",
                  !sidebar.isCollapsed ? "rotate-180" : ""
                )}
              />
            </Button>
          </div>
          <div className="flex-1 w-auto"></div>
        </div>
      </div>

      {/* Quick Stats */}
      <div
        className={cn(
          "border-t border-border/50 transition-all duration-300",
          sidebar.isCollapsed ? "p-2" : "p-4"
        )}
      >
        <div
          className={cn(
            "glass rounded-lg transition-all duration-300 overflow-hidden",
            sidebar.isCollapsed ? "p-2" : "p-4"
          )}
        >
          {sidebar.isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center cursor-default">
                  <p className="text-sm font-bold text-success">+$0</p>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <div className="text-center">
                  <p className="font-medium">Daily P&L</p>
                  <p className="text-success">+$0 (+0%)</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="opacity-100 transition-opacity duration-300">
              <p className="text-xs text-muted-foreground mb-2">Daily P&L</p>
              <p className="text-2xl font-bold text-success">+$0</p>
              <p className="text-xs text-success mt-1">+0% today</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
