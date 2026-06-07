import { BarChart2, Bell, User } from "lucide-react";

interface NavbarProps {
  tab: string;
  setTab: (t: string) => void;
  notifications: number;
}

export default function Navbar({ tab, setTab, notifications }: NavbarProps) {
  const tabs = ["Market", "Watchlist", "Portfolio"];

  return (
    <header className="bg-[#12151f] border-b border-white/[0.06] sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
            <BarChart2 size={14} className="text-white" />
          </div>
          <span className="text-white font-bold text-sm tracking-tight">StockFlow</span>
        </div>

        {/* Tabs */}
        <nav className="flex items-center gap-1 bg-white/[0.04] rounded-xl p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                tab === t
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2">
          <button className="relative text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
            <Bell size={17} />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
          <button className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center">
            <User size={14} className="text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
