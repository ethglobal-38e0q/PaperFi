import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MiniChartProps {
  data: number[];
  color?: string;
}

const MiniChart = ({ data, color = "hsl(var(--primary))" }: MiniChartProps) => {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MiniChart;
