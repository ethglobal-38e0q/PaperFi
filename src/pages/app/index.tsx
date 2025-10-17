import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      {/*<Footer />*/}
    </div>
  );
};

export default AppLayout;
