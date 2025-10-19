import { heatmapData } from "@/data/mockData";
import { Tooltip } from "@/components/ui/tooltip";

const Heatmap = () => {
  type DayData = { date: string; count: number; pnl: number };
  const weeks: DayData[][] = [];
  let currentWeek: DayData[] = [];

  heatmapData.forEach((day, index) => {
    currentWeek.push(day);
    if ((index + 1) % 7 === 0 || index === heatmapData.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const getIntensityColor = (count: number) => {
    if (count === 0) return "bg-muted/30";
    if (count <= 3) return "bg-success/20";
    if (count <= 6) return "bg-success/40";
    if (count <= 9) return "bg-success/60";
    return "bg-success/80";
  };

  return (
    <div className="glass p-6 rounded-xl overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Trading Activity</h3>
      <div
        className="flex justify-around w-[800px]"
        onClick={e => {
          console.log(e.target.getAttribute("data-day"));
        }}
      >
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                data-day={day.date}
                className={`w-3 h-3 rounded-sm ${getIntensityColor(day.count)} transition-all hover:ring-2 hover:ring-primary/50 cursor-pointer`}
                title={`${day.date}: ${day.count} trades, P&L: ${day.pnl > 0 ? "+" : ""}${day.pnl.toFixed(2)}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-muted/30" />
          <div className="w-3 h-3 rounded-sm bg-success/20" />
          <div className="w-3 h-3 rounded-sm bg-success/40" />
          <div className="w-3 h-3 rounded-sm bg-success/60" />
          <div className="w-3 h-3 rounded-sm bg-success/80" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default Heatmap;
