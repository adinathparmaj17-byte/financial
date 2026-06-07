import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { Stock } from "../data/stocks";

interface SummaryCardsProps {
  stocks: Stock[];
  portfolio: Record<string, number>;
}

export default function SummaryCards({ stocks, portfolio }: SummaryCardsProps) {
  const gainers = stocks.filter((s) => s.change > 0).length;
  const losers = stocks.filter((s) => s.change < 0).length;

  const portfolioValue = stocks.reduce((sum, s) => {
    const qty = portfolio[s.symbol] ?? 0;
    return sum + qty * s.price;
  }, 0);

  const bestGainer = [...stocks].sort((a, b) => b.changePct - a.changePct)[0];

  const cards = [
    {
      label: "Gainers",
      value: gainers,
      sub: `${losers} losers today`,
      icon: <TrendingUp size={16} />,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Top Gainer",
      value: bestGainer.symbol,
      sub: `+${bestGainer.changePct.toFixed(2)}%`,
      icon: <Activity size={16} />,
      color: "text-indigo-400",
      bg: "bg-indigo-400/10",
    },
    {
      label: "Portfolio Value",
      value: portfolioValue > 0 ? `$${portfolioValue.toFixed(2)}` : "$0.00",
      sub: "Across all holdings",
      icon: <DollarSign size={16} />,
      color: "text-violet-400",
      bg: "bg-violet-400/10",
    },
    {
      label: "Stocks Tracked",
      value: stocks.length,
      sub: "NYSE & NASDAQ",
      icon: <TrendingDown size={16} />,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-[#1a1d27] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3"
        >
          <div className={`${c.bg} ${c.color} p-2 rounded-lg mt-0.5 shrink-0`}>{c.icon}</div>
          <div>
            <div className="text-slate-400 text-xs mb-1">{c.label}</div>
            <div className="text-white font-bold text-lg leading-tight">{c.value}</div>
            <div className="text-slate-500 text-xs mt-0.5">{c.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
