import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  className?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = "neutral",
  subtitle,
  className 
}: StatsCardProps) => {
  const getTrendColor = () => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-loss";
    return "text-muted-foreground";
  };

  return (
    <div className={cn("glass-hover p-6 rounded-xl", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold mb-1">{value}</p>
          {change !== undefined && (
            <p className={cn("text-sm font-medium", getTrendColor())}>
              {change > 0 ? "+" : ""}{change}%
            </p>
          )}
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            trend === "up" && "bg-success/10 text-success",
            trend === "down" && "bg-loss/10 text-loss",
            trend === "neutral" && "bg-primary/10 text-primary"
          )}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
