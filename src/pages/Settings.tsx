import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Wallet,
  Copy,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthProvider";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Web3ConnectButton } from "@/components/Web3ConnectButton";
import { useAccount } from "wagmi";
import { uploadAvatar } from "@/lib/utils";

const Settings = () => {
  const { user: profile, supabase } = useAuth();
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    username: profile.user_metadata?.username || "",
    name: profile.user_metadata.display_name || "",
    avatar: profile.user_metadata?.avatar_url || null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          username: formData.username,
          display_name: formData.name,
          avatar_url: formData.avatar,
        },
      });
      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
      console.error("Failed to update profile:", error);
    }
    setIsLoading(false);
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Wallet address copied!");
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && profile?.id) {
      setIsUploading(true);
      try {
        const avatarUrl = await uploadAvatar(file, profile.id);
        console.log(avatarUrl);
        setFormData(prev => ({ ...prev, avatar: avatarUrl }));
        toast.success("Avatar uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload avatar:", error);
        toast.error("Failed to upload avatar");
      } finally {
        setIsUploading(false);
      }
    }
  };
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-6 rounded-xl"
      >
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="mb-2">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback className="text-3xl font-bold">
                    {profile.user_metadata?.custom_claims?.address
                      ?.substr(2, 2)
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAvatarClick}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Change Avatar"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Click to upload a new profile picture
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={e =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="mt-2"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-2"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="wallet-address">Wallet Address</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="wallet-address"
                    value={profile.user_metadata?.custom_claims?.address}
                    className="font-mono"
                    readOnly
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={copyAddress}
                    disabled={!address}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Last Updated</Label>
                <p className="mt-2 text-sm text-muted-foreground">
                  {profile?.updated_at
                    ? new Date(profile.updated_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <Button
                type="submit"
                className="glow-primary"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-semibold">Trade Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when your trades execute or close
                  </p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-semibold">Position Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Alerts when approaching liquidation or targets
                  </p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-semibold">Funding Opportunities</p>
                  <p className="text-sm text-muted-foreground">
                    Notify me when new funding offers are available
                  </p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-semibold">Leaderboard Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified about rank changes
                  </p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-semibold">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>

            <Button className="glow-primary">Save Preferences</Button>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="mt-2"
                  />
                </div>
                <Button className="glow-primary">Update Password</Button>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">
                Two-Factor Authentication
              </h3>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-semibold">2FA Status</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">Wallet Connection</h3>
              {address ? (
                <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div>
                    <p className="font-semibold">Connected Wallet</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {formatAddress(address)}
                    </p>
                  </div>
                  <Web3ConnectButton variant="outline" />
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-muted/30 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold">No Wallet Connected</p>
                    <p className="text-sm text-muted-foreground">
                      Connect a wallet to access all features
                    </p>
                  </div>
                  <Web3ConnectButton variant="outline" />
                </div>
              )}
            </div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Theme</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg border-2 border-primary/50 cursor-pointer">
                  <div className="w-full h-32 bg-gradient-to-br from-background to-muted rounded-lg mb-3"></div>
                  <p className="font-semibold text-center">Dark (Current)</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border border-border cursor-pointer opacity-50">
                  <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg mb-3"></div>
                  <p className="font-semibold text-center">
                    Light (Coming Soon)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Accent Color</h3>
              <div className="grid grid-cols-5 gap-4">
                {[
                  { name: "Blue", color: "hsl(243 75% 59%)" },
                  { name: "Purple", color: "hsl(270 70% 60%)" },
                  { name: "Teal", color: "hsl(174 72% 56%)" },
                  { name: "Green", color: "hsl(142 76% 46%)" },
                  { name: "Red", color: "hsl(0 72% 61%)" },
                ].map(color => (
                  <button
                    key={color.name}
                    className="aspect-square rounded-lg border-2 border-transparent hover:border-foreground transition-all"
                    style={{ backgroundColor: color.color }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Display</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-semibold">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Show more data in less space
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-semibold">Animations</p>
                    <p className="text-sm text-muted-foreground">
                      Enable smooth transitions and effects
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>
            </div>

            <Button className="glow-primary">Save Preferences</Button>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Settings;
