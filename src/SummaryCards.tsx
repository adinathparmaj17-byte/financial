import { Stock } from "../data/stocks";
import MiniChart from "./MiniChart";

interface StockRowProps {
  stock: Stock;
  index: number;
  onClick: () => void;
  holdings: number;
  inWatchlist: boolean;
}

export default function StockRow({ stock, index, onClick, holdings, inWatchlist }: StockRowProps) {
  const isUp = stock.change >= 0;

  return (
    <tr
      onClick={onClick}
      className="border-b border-white/[0.04] hover:bg-white/[0.03] cursor-pointer transition-colors group"
    >
      {/* # */}
      <td className="py-3.5 pl-5 pr-2 text-slate-600 text-sm w-8">{index + 1}</td>

      {/* Symbol */}
      <td className="py-3.5 pr-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
              isUp ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"
            }`}
          >
            {stock.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="text-white text-sm font-semibold flex items-center gap-1.5">
              {stock.symbol}
              {inWatchlist && <span className="text-yellow-400 text-xs">★</span>}
            </div>
            <div className="text-slate-500 text-xs truncate max-w-[140px]">{stock.name}</div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="py-3.5 pr-4 text-right">
        <span className="text-[#f9fafb] text-sm font-semibold">${stock.price.toFixed(2)}</span>
      </td>

      {/* Change */}
      <td className="py-3.5 pr-4 text-right">
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-md ${
            isUp ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"
          }`}
        >
          {isUp ? "▲" : "▼"} {isUp ? "+" : ""}{stock.change.toFixed(2)}
        </span>
      </td>

      {/* % Change */}
      <td className="py-3.5 pr-4 text-right">
        <span className={`text-sm font-semibold ${isUp ? "text-emerald-400" : "text-red-400"}`}>
          {isUp ? "+" : ""}{stock.changePct.toFixed(2)}%
        </span>
      </td>

      {/* Mini Chart */}
      <td className="py-3.5 pr-4 w-28 hidden md:table-cell">
        <MiniChart data={stock.history} isUp={isUp} />
      </td>

      {/* Volume */}
      <td className="py-3.5 pr-4 text-right text-slate-400 text-sm hidden lg:table-cell">
        {stock.volume}
      </td>

      {/* Holdings badge */}
      <td className="py-3.5 pr-5 text-right">
        {holdings > 0 ? (
          <span className="text-xs bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full">
            {holdings} shares
          </span>
        ) : (
          <span className="text-slate-700 text-xs group-hover:text-slate-500 transition-colors">—</span>
        )}
      </td>
    </tr>
  );
}
