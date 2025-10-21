import { generateSignInMessage, supabase } from "@/lib/supabase";
import { SupabaseClient, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect } from "react";
import { Hex } from "viem";
import { useAccount, useSignMessage } from "wagmi";

export type AuthContextType = {
  user: User | null;
  supabase: SupabaseClient;
  walletAddress: Hex;
};
const session = await supabase.auth.getSession();
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(
    session?.data?.session?.user
  );
  const { address, status } = useAccount();
  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    if (user && status === "disconnected") {
      supabase.auth.signOut();
    } else if (!user && status === "connected") {
      (async () => {
        const message = generateSignInMessage(address);

        // Request signature from wallet
        const signature = await signMessageAsync({
          message,
          account: address,
        });

        const { data, error } = await supabase.auth.signInWithWeb3({
          chain: "ethereum",
          message: message,
          signature: signature,
        });

        if (error) throw error;
      })();
    }
  }, [status, user, address]);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event === "INITIAL_SESSION") {
        setUser(session?.user);
      } else if (event === "SIGNED_IN") {
        setUser(session?.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        setUser(session?.user);
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const value: AuthContextType = { user, supabase, walletAddress: address };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
