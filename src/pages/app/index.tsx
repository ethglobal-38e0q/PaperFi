import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarProvider";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
        {/*<Footer />*/}
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
