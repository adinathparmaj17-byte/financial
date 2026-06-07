export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  volume: string;
  marketCap: string;
  sector: string;
  history: number[];
}

function generateHistory(base: number, points = 20): number[] {
  const arr: number[] = [base];
  for (let i = 1; i < points; i++) {
    const prev = arr[i - 1];
    const delta = (Math.random() - 0.48) * prev * 0.015;
    arr.push(parseFloat((prev + delta).toFixed(2)));
  }
  return arr;
}

export const INITIAL_STOCKS: Stock[] = [
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 485.30,
    change: -2.18,
    changePct: -0.45,
    volume: "18.2M",
    marketCap: "$3.61T",
    sector: "Technology",
    history: generateHistory(487.48),
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 192.75,
    change: +5.67,
    changePct: +3.03,
    volume: "22.5M",
    marketCap: "$2.39T",
    sector: "Technology",
    history: generateHistory(187.08),
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 213.49,
    change: +1.22,
    changePct: +0.57,
    volume: "55.1M",
    marketCap: "$3.27T",
    sector: "Technology",
    history: generateHistory(212.27),
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 198.12,
    change: -3.45,
    changePct: -1.71,
    volume: "31.4M",
    marketCap: "$2.10T",
    sector: "Consumer",
    history: generateHistory(201.57),
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 131.38,
    change: +7.94,
    changePct: +6.43,
    volume: "312.7M",
    marketCap: "$3.21T",
    sector: "Technology",
    history: generateHistory(123.44),
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 594.20,
    change: -1.80,
    changePct: -0.30,
    volume: "11.8M",
    marketCap: "$1.51T",
    sector: "Technology",
    history: generateHistory(596.00),
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.42,
    change: +12.34,
    changePct: +5.23,
    volume: "98.3M",
    marketCap: "$794.5B",
    sector: "Automotive",
    history: generateHistory(236.08),
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 243.18,
    change: -0.92,
    changePct: -0.38,
    volume: "8.6M",
    marketCap: "$697.2B",
    sector: "Finance",
    history: generateHistory(244.10),
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    price: 312.55,
    change: +2.11,
    changePct: +0.68,
    volume: "5.9M",
    marketCap: "$636.1B",
    sector: "Finance",
    history: generateHistory(310.44),
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    price: 158.34,
    change: -0.44,
    changePct: -0.28,
    volume: "6.2M",
    marketCap: "$380.8B",
    sector: "Healthcare",
    history: generateHistory(158.78),
  },
];
