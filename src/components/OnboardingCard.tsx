import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { toast } from "@/hooks/use-toast";

export function OnboardCard() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { supabase, user } = useAuth();

  useEffect(() => {
    if (!user) return;
    if (!user.user_metadata?.username) setOpen(true);
  }, [user]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setUploading(true);
      setProgress(0);
      // todo: upload avatar to r2 here and then uncomment next 2 lines.

      // setProgress(100)
      // setUploading(false)
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.updateUser({
      data: {
        username: username,
        avatar_url: avatar || `https://avatars.jakerunzer.com/${user.id}`,
      },
    });
    if (error) {
      toast({ title: "Error!", description: error.message });
    } else {
      toast({ title: "Success!", description: "Profile updated successfully" });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Update Avatar & Username</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  disabled={uploading}
                />
                {uploading && (
                  <div className="mt-2">
                    <Progress value={progress} className="bg-muted" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {progress}%
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={uploading}>
                  Save
                </Button>
              </DialogFooter>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
