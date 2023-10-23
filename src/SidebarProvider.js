import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }) {
  const [openItems, setOpenItems] = useState([]);

  const handleToggle = (itemId) => {
    if (openItems.includes(itemId)) {
      setOpenItems(openItems.filter((id) => id !== itemId));
    } else {
      setOpenItems([...openItems, itemId]);
    }
  };

  return (
    <SidebarContext.Provider value={{ openItems, handleToggle }}>
      {children}
    </SidebarContext.Provider>
  );
}
