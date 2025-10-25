import Sidebar from "@/components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";

const AppLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <SidebarProvider>
      <div className="flex h-full">
        <Sidebar />
        <main className="overflow-auto flex-grow">{user && <Outlet />}</main>
        {/*<Footer />*/}
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
