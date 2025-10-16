import { useState, useEffect } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line
} from "recharts";

interface TradingViewWidgetProps {
  pair: string;
  interval: string;
}

const TradingViewWidget = ({ pair, interval }: TradingViewWidgetProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartType, setChartType] = useState<"candles" | "line">("line");

  useEffect(() => {
    const basePrice = 68750;
    const generateData = () => {
      const data = [];
      for (let i = 0; i < 100; i++) {
        const trend = Math.sin(i / 10) * 500;
        const volatility = (Math.random() - 0.5) * 300;
        const price = basePrice + trend + volatility;
        const open = price + (Math.random() - 0.5) * 100;
        const close = price + (Math.random() - 0.5) * 100;
        const high = Math.max(open, close) + Math.random() * 50;
        const low = Math.min(open, close) - Math.random() * 50;
        
        data.push({
          time: Date.now() - (100 - i) * 60000 * (interval === "1m" ? 1 : interval === "5m" ? 5 : 15),
          price,
          open,
          close,
          high,
          low,
          volume: Math.random() * 1000000 + 100000,
        });
      }
      return data;
    };

    setChartData(generateData());

    const updateInterval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const lastPrice = prev[prev.length - 1].price;
        const newPrice = lastPrice + (Math.random() - 0.5) * 100;
        const open = newPrice + (Math.random() - 0.5) * 50;
        const close = newPrice + (Math.random() - 0.5) * 50;
        
        newData.push({
          time: Date.now(),
          price: newPrice,
          open,
          close,
          high: Math.max(open, close) + Math.random() * 30,
          low: Math.min(open, close) - Math.random() * 30,
          volume: Math.random() * 1000000 + 100000,
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(updateInterval);
  }, [pair, interval]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              chartType === "line" ? "bg-primary text-primary-foreground" : "bg-muted/30 hover:bg-muted/50"
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType("candles")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              chartType === "candles" ? "bg-primary text-primary-foreground" : "bg-muted/30 hover:bg-muted/50"
            }`}
          >
            Candles
          </button>
        </div>
        <div className="flex gap-2">
          {["1m", "5m", "15m", "1h", "4h", "1d"].map((int) => (
            <button
              key={int}
              className="px-2 py-1 rounded text-xs bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              {int}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        {chartType === "line" ? (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 10 }}
              tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 10 }}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fill="url(#priceGradient)" 
            />
          </AreaChart>
        ) : (
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 10 }}
              tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 10 }}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar 
              dataKey="volume" 
              fill="hsl(var(--muted))" 
              opacity={0.3}
              yAxisId="volume"
            />
            <Line 
              type="stepAfter" 
              dataKey="close" 
              stroke="hsl(var(--primary))" 
              strokeWidth={1}
              dot={false}
            />
          </ComposedChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default TradingViewWidget;
