import React, { createContext, useContext, useState, ReactNode } from 'react';

type SettingsContextType = {
  displayName: string;
  setDisplayName: (name: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [displayName, setDisplayName] = useState('Coffee Enthusiast');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <SettingsContext.Provider value={{ displayName, setDisplayName, darkMode, toggleDarkMode }}>
      {children} 
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
