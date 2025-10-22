// Mock data for the trading platform

export const currentUser = {
  username: "Varun",
  email: "admin@PaperFi.trade",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Varun",
  dailyPnL: 0,
  totalPnL: 0,
  winRate: 0,
  streak: 0,
  rank: 0,
  totalTrades: 0,
  avgHoldTime: "0h 00m",
  sharpeRatio: 0,
  successPoints: 0,
  fundingOffers: 0,
};

export const pnlHistory = [
  { date: "2025-10-10", pnl: 0, trades: 1 },
  { date: "2025-10-11", pnl: 0, trades: 1 },
  { date: "2025-10-12", pnl: 0, trades: 1 },
  { date: "2025-10-13", pnl: 0, trades: 1 },
  { date: "2025-10-14", pnl: 0, trades: 1 },
  { date: "2025-10-15", pnl: 0, trades: 1 },
  { date: "2025-10-16", pnl: 0, trades: 1 },
];
export const marketData = {
  BTCUSDT: {
    price: 0,
    change: 0,
    volume: "0",
    high24h: 0,
    low24h: 0,
  },
  ETHUSDT: {
    price: 0,
    change: 0,
    volume: "0",
    high24h: 0,
    low24h: 0,
  },
  SOLUSDT: {
    price: 0,
    change: 0,
    volume: "0",
    high24h: 0,
    low24h: 0,
  },
  BNBUSDT: {
    price: 0,
    change: 0,
    volume: "0",
    high24h: 0,
    low24h: 0,
  },
};

export const leaderboard = [
  {
    id: 0,
    name: "CryptoMonk",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoMonk",
    pnl: 0,
    pnlPercent: 0,
    streak: 0,
    winRate: 0,
    totalVolume: "0",
    successPoints: 0,
  },
  {
    id: 0,
    name: "MoonTrader",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MoonTrader",
    pnl: 0,
    pnlPercent: 0,
    streak: 0,
    winRate: 0,
    totalVolume: "0",
    successPoints: 0,
  },
  {
    id: 0,
    name: "Varun",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Varun",
    pnl: 0,
    pnlPercent: 0,
    streak: 0,
    winRate: 0,
    totalVolume: "0",
    successPoints: 0,
  },
  {
    id: 0,
    name: "DiamondHands",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DiamondHands",
    pnl: 0,
    pnlPercent: 0,
    streak: 0,
    winRate: 0,
    totalVolume: "0",
    successPoints: 0,
  },
  {
    id: 0,
    name: "BullRun",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BullRun",
    pnl: 0,
    pnlPercent: 0,
    streak: 0,
    winRate: 0,
    totalVolume: "0",
    successPoints: 0,
  },
];

export const recentTrades = [
  {
    id: "T001",
    pair: "BTCUSDT",
    type: "LONG",
    entryPrice: 0,
    exitPrice: 0,
    size: 0,
    leverage: 0,
    pnl: 0,
    pnlPercent: 0,
    timestamp: "2025-10-16T14:23:00Z",
    status: "closed",
  },
  {
    id: "T002",
    pair: "ETHUSDT",
    type: "SHORT",
    entryPrice: 0,
    exitPrice: 0,
    size: 0,
    leverage: 0,
    pnl: 0,
    pnlPercent: 0,
    timestamp: "2025-10-16T13:45:00Z",
    status: "closed",
  },
  {
    id: "T003",
    pair: "SOLUSDT",
    type: "LONG",
    entryPrice: 0,
    exitPrice: 0,
    size: 0,
    leverage: 0,
    pnl: 0,
    pnlPercent: 0,
    timestamp: "2025-10-16T12:10:00Z",
    status: "closed",
  },
  {
    id: "T004",
    pair: "BTCUSDT",
    type: "LONG",
    entryPrice: 0,
    exitPrice: null,
    size: 0,
    leverage: 0,
    pnl: 0,
    pnlPercent: 0,
    timestamp: "2025-10-16T15:00:00Z",
    status: "open",
    liquidationPrice: 0,
  },
];

export const openPositions = recentTrades.filter(t => t.status === "open");

export const heatmapData = (() => {
  const currentDate = new Date(); // Today's date
  const currentYear = 2025;
  const startOfYear = new Date(currentYear, 0, 1); // January 1, 2025
  const endOfYear = new Date(currentYear, 11, 31); // December 31, 2025
  const totalDaysInYear = 365; // 2025 is not a leap year

  const data = [];

  // Generate data for each day of the year
  for (let day = 0; day < totalDaysInYear; day++) {
    const date = new Date(startOfYear);
    date.setDate(startOfYear.getDate() + day);
    const dateString = date.toISOString().split("T")[0];

    // Check if this date is in the past (up to current date)
    const isPastOrToday = date <= currentDate;

    // All numerical values set to 0
    data.push({
      date: dateString,
      count: 0,
      pnl: 0,
    });
  }

  return data;
})();

export const platformStats = {
  totalVolume: "0",
  activeTraders: 0,
  fundsAllocated: "0",
  avgWinRate: 0,
};

export const candlestickData = Array.from({ length: 100 }, (_, i) => {
  return {
    time: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    volume: 0,
  };
});

export const fundingOffers = [
  {
    id: "F001",
    clientName: "Alpha Capital",
    clientAvatar: "https://api.dicebear.com/7.x/shapes/svg?seed=AlphaCapital",
    amount: 0,
    conditions: "Min 70% win rate, Max 15% drawdown",
    profitSplit: "80/20",
    status: "pending",
  },
  {
    id: "F002",
    clientName: "Quantum Traders",
    clientAvatar: "https://api.dicebear.com/7.x/shapes/svg?seed=QuantumTraders",
    amount: 0,
    conditions: "Min 65% win rate, Max 20% drawdown",
    profitSplit: "70/30",
    status: "pending",
  },
];
