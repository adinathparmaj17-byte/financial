import { useId } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface DetailChartProps {
  data: number[];
  isUp: boolean;
  symbol: string;
}

export default function DetailChart({ data, isUp, symbol }: DetailChartProps) {
  const gradientId = useId(); // Unique ID for SVG gradients
  
  if (!data || data.length === 0) return <div className="h-[200px] flex items-center justify-center text-slate-500">No data</div>;

  const chartData = data.map((v, i) => ({ time: i, price: v }));
  const color = isUp ? "#34d399" : "#f87171";
  
  // Calculate bounds
  const min = Math.min(...data);
  const max = Math.max(...data);
  const padding = (max - min) * 0.1 || 1; // Fallback if max === min

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        
        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
        
        <XAxis dataKey="time" hide />
        
        <YAxis
          domain={[min - padding, max + padding]}
          orientation="right" // Usually looks better in trading UI
          tickFormatter={(v) => `$${v.toLocaleString()}`}
          tick={{ fill: "#64748b", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          mirror // Draws ticks inside the chart to save horizontal space
        />
        
        <Tooltip
          cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
          content={({ active, payload }) =>
            active && payload?.length ? (
              <div className="bg-[#1a1d27] border border-white/10 rounded-lg px-3 py-2 text-xs text-white shadow-xl">
                <div className="text-slate-400 mb-0.5">{symbol.toUpperCase()}</div>
                <div className="font-semibold text-base">
                  ${Number(payload[0].value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
            ) : null
          }
        />
        
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`} // Using the unique ID here
          isAnimationActive={true}
          dot={false}
          activeDot={{ r: 4, fill: color, stroke: "#1a1d27", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
