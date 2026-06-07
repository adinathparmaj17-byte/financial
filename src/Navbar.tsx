import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";

interface MiniChartProps {
  data: number[];
  isUp: boolean;
}

export default function MiniChart({ data, isUp }: MiniChartProps) {
  const chartData = data.map((v, i) => ({ i, v }));
  const color = isUp ? "#34d399" : "#f87171";

  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 4 }}>
        <defs>
          <linearGradient id={`grad-${isUp ? "up" : "dn"}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#grad-${isUp ? "up" : "dn"})`}
          dot={false}
          isAnimationActive={false}
        />
        <Tooltip
          content={({ active, payload }) =>
            active && payload?.length ? (
              <div className="bg-[#1a1d27] border border-white/10 rounded px-2 py-1 text-xs text-white">
                ${Number(payload[0].value).toFixed(2)}
              </div>
            ) : null
          }
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
