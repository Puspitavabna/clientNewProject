"use client";
import { createContext, ReactNode, useContext, useState } from "react";

// Define the context type
type AppContextType = {
  userId: string | null;
  userName: string | null;
  profileImage: string | null;
  currency: string | null;
  setUserId: (id: string | null) => void;
  setUserName: (name: string | null) => void;
  setProfileImage: (image: string | null) => void;
  setCurrency: (currency: string | null) => void;
};

// Create the context
const APPContext = createContext<AppContextType | undefined>(undefined);

// AppProvider  component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);

  return (
    <APPContext.Provider
      value={{
        userId,
        userName,
        profileImage,
        currency,
        setUserId,
        setUserName,
        setProfileImage,
        setCurrency,
      }}
    >
      {children}
    </APPContext.Provider>
  );
};

// Custom hook to use the context
export const useAPPContext = () => {
  const context = useContext(APPContext);
  if (!context) {
    throw new Error("useAPPContext must be used within a DashboardProvider");
  }
  return context;
};
