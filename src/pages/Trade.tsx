import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { openPositions } from "@/data/mockData";
import {
  TrendingUp,
  TrendingDown,
  X,
  Settings2,
  Maximize2,
} from "lucide-react";
import OrderBook from "@/components/OrderBook";
import RecentTradesPanel from "@/components/RecentTradesPanel";
import MarketTicker from "@/components/MarketTicker";
import { useSidebar } from "@/contexts/SidebarProvider";
import PerpChartLight from "@/components/charts/PerpChart";
import { useNavigate, useSearchParams } from "react-router-dom";
import TickerTapeWidget from "@/components/charts/TickerTape";
import { toast } from "@/hooks/use-toast";
import { customPriceFormatter } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/contexts/AuthProvider";

const Trade = () => {
  const [orderType, setOrderType] = useState<"LONG" | "SHORT">("LONG");
  const [margin, setMargin] = useState("");
  const [leverage, setLeverage] = useState([0]);
  const [interval, setInterval] = useState("5m");
  const [currentPrice, setCurrentPrice] = useState(0);
  const sidebar = useSidebar();
  const { supabase, user } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const selectedPair = params.get("pair") || "";
  const symbol = selectedPair.toLocaleUpperCase().replace("CRYPTO.", "");
  const base = selectedPair
    .toLocaleUpperCase()
    .replace("CRYPTO.", "")
    .split("/")[0];
  const quote = selectedPair
    .toLocaleUpperCase()
    .replace("CRYPTO.", "")
    .split("/")[1];
  const selectedId = params.get("id") || "";
  // {,"parsed":[{"id":"e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43","price":{"price":"11168649121012","conf":"3107879000","expo":-8,"publish_time":1761380527},"ema_price":{"price":"11149926300000","conf":"2985501700","expo":-8,"publish_time":1761380527},"metadata":{"slot":250886514,"proof_available_time":1761380528,"prev_publish_time":1761380526}}]}

  useEffect(() => {
    // Connect to SSE EventSource for price updates
    const eventSource = new EventSource(
      `https://hermes.pyth.network/v2/updates/price/stream?ids%5B%5D=${selectedId}&parsed=true`
    );
    eventSource.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        if (data.parsed && data.parsed[0].price) {
          const price = BigInt(data.parsed[0].price.price);
          const expo = data.parsed[0].price.expo;
          const formattedPrice = customPriceFormatter(null).format(
            Number(price) * Math.pow(10, expo)
          );

          setCurrentPrice(formattedPrice);
        }
      } catch (e) {
        // Ignore parse errors
      }
    };
    eventSource.onerror = () => {
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [selectedId]);

  useEffect(() => {
    sidebar.close();
    if (!selectedPair) {
      toast({ title: "Please select a pair first" });
      navigate("/app/launchpad");
    }
  }, [selectedPair]);

  async function onClickTradeButton(e) {
    e.preventDefault();
    console.log("Trade button clicked");

    const { error } = await supabase.from("user_trade_records").insert([
      {
        trade_type: orderType,
        order_type: "OPEN",
        asset_id: selectedId,
        asset_symbol: symbol,
        user_id: user.id,
        margin: Number(margin),
        leverage: Number(leverage[0]),
        open_price: currentPrice,
      },
    ]);
    if (error) {
      toast({
        title: "Failed to place order",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Order placed!",
        description: `Your ${orderType} order for ${margin} ${base} has been submitted.`,
      });
      window.tradingChart?.activeChart()?.refreshMarks();
    }
  }

  return (
    <div className="p-2 h-full flex flex-col">
      {/* Market Ticker */}
      <TickerTapeWidget />

      {/* Main Trading Grid - Complex Multi-Panel Layout */}
      <div
        className="h-[calc(100vh-160px)] grid gap-3 mt-4"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "1fr 1fr 1fr",
        }}
      >
        {/* Left Column - Order Book + Depth Chart */}
        <div className="row-span-2 lg:col-span-2 space-y-4">
          <OrderBook pair={selectedPair} currentPrice={currentPrice} />
        </div>

        {/* Center Column - Chart + Market Info */}
        <div className="col-[3/10] row-[1/3] space-y-1 flex flex-col">
          <div className=" rounded-lg flex [&_div]:py-1 [&_div]:px-3">
            <div className="flex-1 glass rounded-l-lg text-yellow-500">
              {selectedPair.replace("Crypto.", "")}
            </div>
            <div className="flex-1 glass text-yellow-500">${currentPrice}</div>
            <div className="flex-1 glass"></div>
            <div className="flex-1 glass rounded-r-lg"></div>
          </div>

          {/* Main Chart */}
          <div className="glass p-1 rounded-xl flex-grow">
            <PerpChartLight ticker={selectedPair} />
          </div>
        </div>

        {/* Right Column - Order Panel + Recent Trades */}
        <div className="col-[10/13] row-[1/4] space-y-4 overflow-auto">
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
            </Tabs>
            <form onSubmit={onClickTradeButton}>
              <div>
                <Label className="text-xs">Margin ({base})</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={margin}
                  onChange={e => setMargin(e.target.value)}
                  className="mt-1 h-9"
                  required
                />
                <div className="flex gap-2 mt-2">
                  {/*{["25%", "50%", "75%", "100%"].map(percent => (
                  <Button
                    key={percent}
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs h-7"
                  >
                    {percent}
                  </Button>
                ))}*/}
                </div>
              </div>

              <div>
                <div className="flex w-full max-w-md flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Leverage</Label>
                    <span className="text-muted-foreground text-sm">
                      {leverage[0]}
                    </span>
                  </div>
                  <Slider
                    max={125}
                    min={0}
                    onValueChange={setLeverage}
                    step={25}
                    value={leverage}
                    className="text-green-500"
                    form=""
                  />
                  <div className="flex items-center justify-between text-muted-foreground text-xs tabular-nums">
                    <span className="w-6 text-left">0</span>
                    <span className="w-6 text-center">25</span>
                    <span className="w-6 text-center">50</span>
                    <span className="w-6 text-center">75</span>
                    <span className="w-6 text-right">100</span>
                    <span className="w-6 text-right">125</span>
                  </div>
                </div>
              </div>

              {/*<div className="grid grid-cols-2 gap-2">
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
            </div>*/}

              <div className="bg-muted/30 p-3 rounded-lg text-xs space-y-1 mt-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entry Price</span>
                  <span className="font-semibold font-mono">
                    ${currentPrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Est. Liq. Price</span>
                  <span className="font-semibold font-mono text-loss">
                    ${(1.1).toFixed(2)}
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

              {orderType === "LONG" ? (
                <Button className="w-full bg-success hover:bg-success/80 font-bold h-10">
                  Open Long Position
                </Button>
              ) : (
                <Button className="w-full bg-loss hover:bg-loss/80 font-bold h-10">
                  Open Short Position
                </Button>
              )}
            </form>
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
          <div className="">
            <RecentTradesPanel pair={selectedPair} />
          </div>
        </div>

        {/* Open Positions & Orders Table */}
        <div className="glass p-2 rounded-xl col-[1/10] row-[3] overflow-auto">
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
                          {position.pnl > 0 ? "+" : ""}$
                          {position.pnl.toFixed(2)}
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
    </div>
  );
};

export default Trade;
