import React, { createContext, useContext, ReactNode, useState } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  sidebarState: "open" | "closed";
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [sidebarState, setSidebarState] = useState<"open" | "closed">("closed");

  const open = () => setSidebarState("open");
  const close = () => setSidebarState("closed");
  const toggle = () =>
    setSidebarState(sidebarState === "open" ? "closed" : "open");

  return (
    <SidebarContext.Provider
      value={{
        sidebarState,
        open,
        close,
        toggle,
        isCollapsed: sidebarState === "closed",
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};
