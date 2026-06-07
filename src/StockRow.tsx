import { X, TrendingUp, TrendingDown, ShoppingCart, Trash2 } from "lucide-react";
import { Stock } from "../data/stocks";
import DetailChart from "./DetailChart";

interface StockModalProps {
  stock: Stock;
  onClose: () => void;
  inWatchlist: boolean;
  onToggleWatchlist: () => void;
  holdings: number;
  onBuy: (qty: number) => void;
  onSell: (qty: number) => void;
}

export default function StockModal({
  stock,
  onClose,
  inWatchlist,
  onToggleWatchlist,
  holdings,
  onBuy,
  onSell,
}: StockModalProps) {
  const isUp = stock.change >= 0;

  const handleBuy = () => {
    const qty = parseInt(prompt(`How many shares of ${stock.symbol} to BUY?`) ?? "0");
    if (!isNaN(qty) && qty > 0) onBuy(qty);
  };

  const handleSell = () => {
    if (holdings === 0) return alert("You have no shares to sell.");
    const qty = parseInt(prompt(`How many shares of ${stock.symbol} to SELL? (You own ${holdings})`) ?? "0");
    if (!isNaN(qty) && qty > 0 && qty <= holdings) onSell(qty);
    else if (qty > holdings) alert("Not enough shares.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1d27] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold ${
                isUp ? "bg-emerald-400/15 text-emerald-400" : "bg-red-400/15 text-red-400"
              }`}
            >
              {stock.symbol.slice(0, 2)}
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">{stock.symbol}</h2>
              <p className="text-slate-400 text-xs">{stock.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Price Block */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-end gap-3 mb-1">
            <span className="text-white text-3xl font-bold">${stock.price.toFixed(2)}</span>
            <span
              className={`flex items-center gap-1 text-sm font-medium mb-1 ${
                isUp ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {isUp ? "+" : ""}
              {stock.change.toFixed(2)} ({isUp ? "+" : ""}
              {stock.changePct.toFixed(2)}%)
            </span>
          </div>

          {/* Chart */}
          <div className="mt-3">
            <DetailChart data={stock.history} isUp={isUp} symbol={stock.symbol} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-px bg-white/[0.04] border-t border-b border-white/[0.06] mx-0">
          {[
            { label: "Volume", value: stock.volume },
            { label: "Market Cap", value: stock.marketCap },
            { label: "Sector", value: stock.sector },
          ].map((s) => (
            <div key={s.label} className="bg-[#1a1d27] px-4 py-3 text-center">
              <div className="text-slate-500 text-xs mb-1">{s.label}</div>
              <div className="text-white text-sm font-semibold">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Holdings */}
        {holdings > 0 && (
          <div className="mx-5 mt-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <div className="text-indigo-300 text-xs">Your Holdings</div>
              <div className="text-white font-semibold">{holdings} shares</div>
            </div>
            <div className="text-right">
              <div className="text-indigo-300 text-xs">Est. Value</div>
              <div className="text-white font-semibold">${(holdings * stock.price).toFixed(2)}</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="p-5 flex gap-3">
          <button
            onClick={handleBuy}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            <ShoppingCart size={15} />
            Buy
          </button>
          <button
            onClick={handleSell}
            disabled={holdings === 0}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500/80 hover:bg-red-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            <Trash2 size={15} />
            Sell
          </button>
          <button
            onClick={onToggleWatchlist}
            className={`px-4 py-2.5 rounded-xl border font-semibold text-sm transition-colors ${
              inWatchlist
                ? "bg-yellow-400/10 border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/20"
                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
            }`}
          >
            {inWatchlist ? "★ Watching" : "☆ Watch"}
          </button>
        </div>
      </div>
    </div>
  );
}
