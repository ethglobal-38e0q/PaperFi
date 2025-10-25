"use client"

import { Link, useLocation } from "react-router-dom"
import { Search, TrendingUp, Wallet } from "lucide-react"
import { ConnectKitButton } from "connectkit"
import { useAuth } from "@/contexts/AuthProvider"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useState, useEffect } from "react"

const Navbar = () => {
  const location = useLocation()
  const { user } = useAuth()
  const isLanding = location.pathname === "/"

  const [pyusdBalance, setPyusdBalance] = useState<number>(0)
  const [paperBalance, setPaperBalance] = useState<number>(0)

  useEffect(() => {
    // TODO: Replace with actual API call to fetch user's PYUSD balance
    // For now, using mock data - connect to your backend/auth context
    const mockPyusdBalance = user?.user_metadata?.pyusd_balance || 0
    setPyusdBalance(mockPyusdBalance)

    const mockPaperBalance = user?.user_metadata?.paper_balance || 0
    setPaperBalance(mockPaperBalance)
  }, [user])

  if (isLanding) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105">
            <img src="/neon-icon.png" alt="" />
          </div>
          <span className="text-2xl font-bold text-white">PaperFi</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          {location.pathname.startsWith("/app") && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search pairs or traders..."
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden md:flex items-center gap-2">
              {/* PYUSD Balance */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg  border border-primary/20 hover:bg-primary/15 transition-colors">
                
                <img src="/pyusd.png" alt="" className=" w-8 h-8"/>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">PYUSD Balance</span>
                  <span className="text-sm font-bold text-primary">${pyusdBalance.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-secondary/20 hover:bg-secondary/15 transition-colors">
                <Wallet className="w-4 h-4 text-secondary" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">Paper Balance</span>
                  <span className="text-sm font-bold text-secondary">${paperBalance.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <ConnectKitButton />

          {/* User Avatar */}
          {user && (
            <>
              <Link
                to="/app/settings"
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="text-md font-bold">
                    {user.user_metadata?.custom_claims?.address?.substr(2, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:inline font-medium">{user.user_metadata?.username}</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
