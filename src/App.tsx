import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Trade from "./pages/Trade";
import Analytics from "./pages/Analytics";
import Leaderboard from "./pages/Leaderboard";
import Portfolio from "./pages/Portfolio";
import Settings from "./pages/Settings";
import Clients from "./pages/Clients";
import Challenges from "./pages/Challenges";
import NotFound from "./pages/NotFound";
import AppLayout from "./pages/app";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="h-screen w-full">
          <Navbar />
          <div className="pt-16 h-full">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/app" element={<AppLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="trade" element={<Trade />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="settings" element={<Settings />} />
                <Route path="clients" element={<Clients />} />
                <Route path="challenges" element={<Challenges />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
