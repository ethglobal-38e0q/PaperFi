import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to generate sign-in message
export const generateSignInMessage = (address: string, nonce?: string) => {
  const domain = window.location.host;
  const uri = window.location.origin;
  const statement = "Sign in to PaperFi with your Ethereum account.";
  const version = "1";
  const chainId = 1; // Ethereum mainnet
  const nonceValue = nonce || Math.random().toString(36).substring(7);
  const issuedAt = new Date().toISOString();

  // EIP-4361 Sign-In with Ethereum message format
  return `${domain} wants you to sign in with your Ethereum account:
${address}

${statement}

URI: ${uri}
Version: ${version}
Chain ID: ${chainId}
Nonce: ${nonceValue}
Issued At: ${issuedAt}`;
};
