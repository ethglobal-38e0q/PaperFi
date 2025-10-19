import React from "react";
import { ConnectKitButton } from "connectkit";
import { useAuth } from "@/contexts/AuthProvider";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Wallet, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Web3ConnectButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

export const Web3ConnectButton: React.FC<Web3ConnectButtonProps> = ({
  className = "",
  variant = "default",
}) => {
  const { isAuthenticated, signInWithWallet, signOut, profile } = useAuth();
  const { address, isConnected } = useAccount();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address }) => {
        // Not connected to wallet
        if (!isConnected) {
          return (
            <Button
              onClick={show}
              variant={variant}
              className={`glow-primary ${className}`}
              disabled={isConnecting}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          );
        }

        // Connected but not authenticated
        if (isConnected && !isAuthenticated) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <Button
                onClick={signInWithWallet}
                variant={variant}
                className={`glow-primary ${className}`}
              >
                <User className="w-4 h-4 mr-2" />
                Sign In with Wallet
              </Button>
            </motion.div>
          );
        }

        // Connected and authenticated
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={variant} className={`glow-primary ${className}`}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="hidden sm:inline">
                    {profile?.username || formatAddress(address!)}
                  </span>
                  <span className="sm:hidden">{formatAddress(address!)}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                <div className="font-medium text-foreground">
                  {profile?.username || "Anonymous User"}
                </div>
                <div className="text-xs">{formatAddress(address!)}</div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={show}>
                <Wallet className="w-4 h-4 mr-2" />
                Wallet Settings
              </DropdownMenuItem>

              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={signOut}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default Web3ConnectButton;
