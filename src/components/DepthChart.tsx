import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DepthChart = ({ pair }: { pair: string }) => {
  const [depthData, setDepthData] = useState<any[]>([]);

  useEffect(() => {
    // Generate mock depth chart data
    const basePrice = 68750;
    const data = [];

    // Bids (left side)
    for (let i = 20; i > 0; i--) {
      data.push({
        price: basePrice - i * 50,
        bidDepth: Math.pow(21 - i, 1.5) * 100,
        askDepth: 0,
      });
    }

    // Asks (right side)
    for (let i = 1; i <= 20; i++) {
      data.push({
        price: basePrice + i * 50,
        bidDepth: 0,
        askDepth: Math.pow(i, 1.5) * 100,
      });
    }

    setDepthData(data);
  }, [pair]);

  return (
    <div className="glass p-4 rounded-xl h-full">
      <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
        DEPTH CHART
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={depthData}>
          <defs>
            <linearGradient id="bidGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--success))"
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--success))"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="askGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--loss))"
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--loss))"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="price"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 10 }}
            tickFormatter={val => `${(val / 1000).toFixed(1)}K`}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 10 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Area
            type="stepAfter"
            dataKey="bidDepth"
            stroke="hsl(var(--success))"
            fill="url(#bidGradient)"
            strokeWidth={2}
          />
          <Area
            type="stepBefore"
            dataKey="askDepth"
            stroke="hsl(var(--loss))"
            fill="url(#askGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepthChart;
