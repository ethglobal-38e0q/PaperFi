import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marketData, openPositions } from "@/data/mockData";
import {
  TrendingUp,
  TrendingDown,
  X,
  Settings2,
  Maximize2,
} from "lucide-react";
import { motion } from "framer-motion";
import OrderBook from "@/components/OrderBook";
import DepthChart from "@/components/DepthChart";
import RecentTradesPanel from "@/components/RecentTradesPanel";
import TradingViewWidget from "@/components/TradingViewWidget";
import MarketTicker from "@/components/MarketTicker";
import { useSidebar } from "@/contexts/SidebarProvider";
import PerpChartLight from "@/components/charts/PerpChart";

const Trade = () => {
  const [selectedPair, setSelectedPair] = useState("BTCUSDT");
  const [orderType, setOrderType] = useState<"LONG" | "SHORT">("LONG");
  const [size, setSize] = useState("");
  const [leverage, setLeverage] = useState("10");
  const [interval, setInterval] = useState("5m");
  const sidebar = useSidebar();

  const currentMarket = marketData[selectedPair as keyof typeof marketData];

  useEffect(() => {
    sidebar.close();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {/* Market Ticker */}
      <MarketTicker />

      {/* Main Trading Grid - Complex Multi-Panel Layout */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column - Order Book + Depth Chart */}
        <div className="col-span-12 lg:col-span-2 space-y-4">
          <div className="h-[500px]">
            <OrderBook pair={selectedPair} />
          </div>
          <div className="h-[280px]">
            <DepthChart pair={selectedPair} />
          </div>
        </div>

        {/* Center Column - Chart + Market Info */}
        <div className="col-span-12 lg:col-span-7 space-y-4">
          {/* Market Selector Bar */}
          <div className="glass p-3 rounded-xl">
            <div className="flex gap-3 overflow-x-auto">
              {Object.entries(marketData).map(([pair, data]) => (
                <button
                  key={pair}
                  onClick={() => setSelectedPair(pair)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all ${
                    selectedPair === pair
                      ? "bg-primary/20 border-2 border-primary/50"
                      : "bg-muted/30 border-2 border-transparent hover:border-muted/50"
                  }`}
                >
                  <p className="font-bold text-sm">
                    {pair.replace("USDT", "/USDT")}
                  </p>
                  <p className="text-xl font-bold">
                    ${data.price.toLocaleString()}
                  </p>
                  <p
                    className={`text-xs font-semibold ${data.change > 0 ? "text-success" : "text-loss"}`}
                  >
                    {data.change > 0 ? "+" : ""}
                    {data.change}%
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Price Info Panel */}
          <div className="glass p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">
                  {selectedPair.replace("USDT", "/USDT")}
                </h2>
                <div className="flex items-baseline gap-4 mt-1">
                  <p className="text-4xl font-bold font-mono">
                    ${currentMarket.price.toLocaleString()}
                  </p>
                  <p
                    className={`text-xl font-semibold ${currentMarket.change > 0 ? "text-success" : "text-loss"}`}
                  >
                    {currentMarket.change > 0 ? "+" : ""}
                    {currentMarket.change}%
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-right">
                <div>
                  <p className="text-xs text-muted-foreground">24h High</p>
                  <p className="text-lg font-bold">
                    ${currentMarket.high24h.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">24h Low</p>
                  <p className="text-lg font-bold">
                    ${currentMarket.low24h.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">24h Volume</p>
                  <p className="text-lg font-bold">{currentMarket.volume}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="glass p-4 rounded-xl h-[500px]">
            <PerpChartLight />
          </div>

          {/* Additional Market Stats Grid */}
          <div className="grid grid-cols-4 gap-3">
            <div className="glass p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">
                Open Interest
              </p>
              <p className="text-lg font-bold">$2.4B</p>
              <p className="text-xs text-success">+5.2%</p>
            </div>
            <div className="glass p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Funding Rate</p>
              <p className="text-lg font-bold">0.0125%</p>
              <p className="text-xs text-muted-foreground">Next: 4h 23m</p>
            </div>
            <div className="glass p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Index Price</p>
              <p className="text-lg font-bold">
                ${currentMarket.price.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                Mark: ${(currentMarket.price * 1.0001).toFixed(2)}
              </p>
            </div>
            <div className="glass p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">
                Long/Short Ratio
              </p>
              <p className="text-lg font-bold">52.3% / 47.7%</p>
              <p className="text-xs text-success">Bullish</p>
            </div>
          </div>
        </div>

        {/* Right Column - Order Panel + Recent Trades */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          {/* Order Entry Panel */}
          <div className="glass p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">New Order</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings2 className="w-4 h-4" />
              </Button>
            </div>

            <Tabs
              value={orderType}
              onValueChange={v => setOrderType(v as "LONG" | "SHORT")}
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger
                  value="LONG"
                  className="data-[state=active]:bg-success/20 data-[state=active]:text-success font-bold"
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  LONG
                </TabsTrigger>
                <TabsTrigger
                  value="SHORT"
                  className="data-[state=active]:bg-loss/20 data-[state=active]:text-loss font-bold"
                >
                  <TrendingDown className="w-4 h-4 mr-1" />
                  SHORT
                </TabsTrigger>
              </TabsList>

              <TabsContent value="LONG" className="space-y-3 mt-0">
                <div>
                  <Label className="text-xs">Order Type</Label>
                  <div className="flex gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      Market
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      Limit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      Stop
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Size (BTC)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={size}
                    onChange={e => setSize(e.target.value)}
                    className="mt-1 h-9"
                  />
                  <div className="flex gap-2 mt-2">
                    {["25%", "50%", "75%", "100%"].map(percent => (
                      <Button
                        key={percent}
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-xs h-7"
                      >
                        {percent}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Leverage</Label>
                  <div className="flex gap-2 mt-1">
                    {["5x", "10x", "20x", "50x", "100x"].map(lev => (
                      <Button
                        key={lev}
                        variant={
                          leverage === lev.replace("x", "")
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setLeverage(lev.replace("x", ""))}
                        className="flex-1 text-xs h-8"
                      >
                        {lev}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Take Profit</Label>
                    <Input
                      type="number"
                      placeholder="Optional"
                      className="mt-1 h-9"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Stop Loss</Label>
                    <Input
                      type="number"
                      placeholder="Optional"
                      className="mt-1 h-9"
                    />
                  </div>
                </div>

                <div className="bg-muted/30 p-3 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entry Price</span>
                    <span className="font-semibold font-mono">
                      ${currentMarket.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Est. Liq. Price
                    </span>
                    <span className="font-semibold font-mono text-loss">
                      ${(currentMarket.price * 0.9).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Position</span>
                    <span className="font-semibold">$10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Fee</span>
                    <span className="font-semibold">0.075%</span>
                  </div>
                </div>

                <Button className="w-full bg-success hover:bg-success/80 font-bold h-10">
                  Open Long Position
                </Button>
              </TabsContent>

              <TabsContent value="SHORT" className="space-y-3 mt-0">
                <div>
                  <Label className="text-xs">Order Type</Label>
                  <div className="flex gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      Market
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      Limit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      Stop
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Size (BTC)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={size}
                    onChange={e => setSize(e.target.value)}
                    className="mt-1 h-9"
                  />
                  <div className="flex gap-2 mt-2">
                    {["25%", "50%", "75%", "100%"].map(percent => (
                      <Button
                        key={percent}
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-xs h-7"
                      >
                        {percent}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Leverage</Label>
                  <div className="flex gap-2 mt-1">
                    {["5x", "10x", "20x", "50x", "100x"].map(lev => (
                      <Button
                        key={lev}
                        variant={
                          leverage === lev.replace("x", "")
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setLeverage(lev.replace("x", ""))}
                        className="flex-1 text-xs h-8"
                      >
                        {lev}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Take Profit</Label>
                    <Input
                      type="number"
                      placeholder="Optional"
                      className="mt-1 h-9"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Stop Loss</Label>
                    <Input
                      type="number"
                      placeholder="Optional"
                      className="mt-1 h-9"
                    />
                  </div>
                </div>

                <div className="bg-muted/30 p-3 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entry Price</span>
                    <span className="font-semibold font-mono">
                      ${currentMarket.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Est. Liq. Price
                    </span>
                    <span className="font-semibold font-mono text-loss">
                      ${(currentMarket.price * 1.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Position</span>
                    <span className="font-semibold">$10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Fee</span>
                    <span className="font-semibold">0.075%</span>
                  </div>
                </div>

                <Button className="w-full bg-loss hover:bg-loss/80 font-bold h-10">
                  Open Short Position
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Account Info */}
          <div className="glass p-4 rounded-xl">
            <h3 className="text-xs font-semibold text-muted-foreground mb-3">
              ACCOUNT BALANCE
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available</span>
                <span className="font-bold">$10,245.50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">In Orders</span>
                <span className="font-semibold">$1,850.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Unrealized PnL</span>
                <span className="font-semibold text-success">+$245.50</span>
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="h-[380px]">
            <RecentTradesPanel pair={selectedPair} />
          </div>
        </div>
      </div>

      {/* Open Positions & Orders Table */}
      <div className="glass p-6 rounded-xl">
        <Tabs defaultValue="positions">
          <TabsList>
            <TabsTrigger value="positions">
              Open Positions ({openPositions.length})
            </TabsTrigger>
            <TabsTrigger value="orders">Open Orders (0)</TabsTrigger>
            <TabsTrigger value="history">Trade History</TabsTrigger>
            <TabsTrigger value="fills">Order Fills</TabsTrigger>
          </TabsList>

          <TabsContent value="positions" className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b border-border">
                    <th className="text-left py-2">Symbol</th>
                    <th className="text-left py-2">Side</th>
                    <th className="text-right py-2">Size</th>
                    <th className="text-right py-2">Entry Price</th>
                    <th className="text-right py-2">Mark Price</th>
                    <th className="text-right py-2">Liq. Price</th>
                    <th className="text-right py-2">Margin</th>
                    <th className="text-right py-2">PnL</th>
                    <th className="text-right py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {openPositions.map(position => (
                    <tr
                      key={position.id}
                      className="border-b border-border/50 hover:bg-muted/20"
                    >
                      <td className="py-3 font-semibold">{position.pair}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            position.type === "LONG"
                              ? "bg-success/20 text-success"
                              : "bg-loss/20 text-loss"
                          }`}
                        >
                          {position.type}
                        </span>
                      </td>
                      <td className="py-3 text-right font-mono">
                        {position.size}
                      </td>
                      <td className="py-3 text-right font-mono">
                        ${position.entryPrice}
                      </td>
                      <td className="py-3 text-right font-mono">
                        ${(position.entryPrice * 1.002).toFixed(2)}
                      </td>
                      <td className="py-3 text-right font-mono text-loss">
                        ${(position.entryPrice * 0.92).toFixed(2)}
                      </td>
                      <td className="py-3 text-right">10x</td>
                      <td
                        className={`py-3 text-right font-bold ${position.pnl > 0 ? "text-success" : "text-loss"}`}
                      >
                        {position.pnl > 0 ? "+" : ""}${position.pnl.toFixed(2)}
                      </td>
                      <td className="py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-8">
                          <X className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-4">
            <div className="text-center py-12 text-muted-foreground">
              No open orders
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="text-center py-12 text-muted-foreground">
              View trade history in Analytics
            </div>
          </TabsContent>

          <TabsContent value="fills" className="mt-4">
            <div className="text-center py-12 text-muted-foreground">
              No recent fills
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Trade;
