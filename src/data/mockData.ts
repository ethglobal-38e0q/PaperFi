// Mock data for the trading platform

export const currentUser = {
  username: "Varun",
  email: "varun@perppractice.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Varun",
  dailyPnL: 245.50,
  totalPnL: 1550.25,
  winRate: 68.4,
  streak: 3,
  rank: 12,
  totalTrades: 147,
  avgHoldTime: "2h 34m",
  sharpeRatio: 1.85,
  successPoints: 8450,
  fundingOffers: 2,
};

export const pnlHistory = [
  { date: "2025-10-10", pnl: 120, trades: 5 },
  { date: "2025-10-11", pnl: -50, trades: 3 },
  { date: "2025-10-12", pnl: 240, trades: 8 },
  { date: "2025-10-13", pnl: 310, trades: 6 },
  { date: "2025-10-14", pnl: -100, trades: 4 },
  { date: "2025-10-15", pnl: 180, trades: 7 },
  { date: "2025-10-16", pnl: 245.50, trades: 9 },
];

export const marketData = {
  BTCUSDT: { 
    price: 68750.30, 
    change: 1.24, 
    volume: "2.45B",
    high24h: 69200,
    low24h: 67800,
  },
  ETHUSDT: { 
    price: 3510.75, 
    change: -0.52,
    volume: "1.82B",
    high24h: 3580,
    low24h: 3490,
  },
  SOLUSDT: { 
    price: 185.42, 
    change: 3.18,
    volume: "845M",
    high24h: 188,
    low24h: 179,
  },
  BNBUSDT: { 
    price: 612.88, 
    change: 0.87,
    volume: "520M",
    high24h: 620,
    low24h: 605,
  },
};

export const leaderboard = [
  { 
    id: 1,
    name: "CryptoMonk", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoMonk",
    pnl: 3420.50, 
    pnlPercent: 85.2,
    streak: 8,
    winRate: 78.5,
    totalVolume: "12.5M",
    successPoints: 15400,
  },
  { 
    id: 2,
    name: "MoonTrader", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MoonTrader",
    pnl: 2890.25, 
    pnlPercent: 72.3,
    streak: 5,
    winRate: 74.2,
    totalVolume: "9.8M",
    successPoints: 12850,
  },
  { 
    id: 3,
    name: "Varun", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Varun",
    pnl: 1550.25, 
    pnlPercent: 68.4,
    streak: 3,
    winRate: 68.4,
    totalVolume: "5.2M",
    successPoints: 8450,
  },
  { 
    id: 4,
    name: "DiamondHands", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DiamondHands",
    pnl: 1420.80, 
    pnlPercent: 65.8,
    streak: 4,
    winRate: 70.1,
    totalVolume: "6.1M",
    successPoints: 9200,
  },
  { 
    id: 5,
    name: "BullRun", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BullRun",
    pnl: 1380.40, 
    pnlPercent: 64.2,
    streak: 2,
    winRate: 66.8,
    totalVolume: "4.8M",
    successPoints: 7850,
  },
];

export const recentTrades = [
  {
    id: "T001",
    pair: "BTCUSDT",
    type: "LONG",
    entryPrice: 68200,
    exitPrice: 68750,
    size: 0.5,
    leverage: 10,
    pnl: 275.50,
    pnlPercent: 8.05,
    timestamp: "2025-10-16T14:23:00Z",
    status: "closed",
  },
  {
    id: "T002",
    pair: "ETHUSDT",
    type: "SHORT",
    entryPrice: 3545,
    exitPrice: 3510,
    size: 2,
    leverage: 5,
    pnl: 175.00,
    pnlPercent: 4.93,
    timestamp: "2025-10-16T13:45:00Z",
    status: "closed",
  },
  {
    id: "T003",
    pair: "SOLUSDT",
    type: "LONG",
    entryPrice: 183.50,
    exitPrice: 185.42,
    size: 10,
    leverage: 15,
    pnl: 288.00,
    pnlPercent: 23.55,
    timestamp: "2025-10-16T12:10:00Z",
    status: "closed",
  },
  {
    id: "T004",
    pair: "BTCUSDT",
    type: "LONG",
    entryPrice: 68500,
    exitPrice: null,
    size: 0.3,
    leverage: 10,
    pnl: 75.09,
    pnlPercent: 3.65,
    timestamp: "2025-10-16T15:00:00Z",
    status: "open",
    liquidationPrice: 61650,
  },
];

export const openPositions = recentTrades.filter(t => t.status === "open");

export const heatmapData = [
  // Last 12 weeks of trading activity
  ...Array.from({ length: 84 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (83 - i));
    const trades = Math.floor(Math.random() * 12);
    return {
      date: date.toISOString().split('T')[0],
      count: trades,
      pnl: trades > 0 ? (Math.random() * 200 - 50) : 0,
    };
  }),
];

export const platformStats = {
  totalVolume: "2.8B",
  activeTraders: 12847,
  fundsAllocated: "125M",
  avgWinRate: 64.2,
};

export const candlestickData = Array.from({ length: 100 }, (_, i) => {
  const basePrice = 68000;
  const variation = Math.random() * 1000 - 500;
  const open = basePrice + variation;
  const close = open + (Math.random() * 400 - 200);
  const high = Math.max(open, close) + Math.random() * 200;
  const low = Math.min(open, close) - Math.random() * 200;
  
  return {
    time: Date.now() - (100 - i) * 60000,
    open,
    high,
    low,
    close,
    volume: Math.random() * 1000000,
  };
});

export const fundingOffers = [
  {
    id: "F001",
    clientName: "Alpha Capital",
    clientAvatar: "https://api.dicebear.com/7.x/shapes/svg?seed=AlphaCapital",
    amount: 50000,
    conditions: "Min 70% win rate, Max 15% drawdown",
    profitSplit: "80/20",
    status: "pending",
  },
  {
    id: "F002",
    clientName: "Quantum Traders",
    clientAvatar: "https://api.dicebear.com/7.x/shapes/svg?seed=QuantumTraders",
    amount: 100000,
    conditions: "Min 65% win rate, Max 20% drawdown",
    profitSplit: "70/30",
    status: "pending",
  },
];
