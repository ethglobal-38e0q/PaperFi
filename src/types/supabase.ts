export interface Profile {
  id: string;
  wallet_address?: string;
  username?: string;
  email?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface RawTrade {
  id: string;
  user_id: string;
  asset_symbol: string;
  asset_id: string;
  trade_type: "LONG" | "SHORT";
  order_type: "OPEN" | "CLOSE";
  margin?: number;
  leverage?: number;
  open_price?: number;
  close_price?: number;
  timestamp: string;
}
