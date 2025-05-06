import React, { createContext, useContext, useState, ReactNode } from 'react';

export type BrewEntry = {
    id: string;
    cafe: string;
    drink: string;
    notes?: string;
    rating: number;
    tags: string[];
    image?: string;
    date: string;
  };
  

type BrewContextType = {
  brews: BrewEntry[];
  addBrew: (entry: BrewEntry) => void;
  clearBrews: () => void;
};

const BrewContext = createContext<BrewContextType | undefined>(undefined);

export const BrewProvider = ({ children }: { children: ReactNode }) => {
  const [brews, setBrews] = useState<BrewEntry[]>([]);
  

  const addBrew = (entry: BrewEntry) => {
    setBrews((prev) => [entry, ...prev]);
  };

  const clearBrews = () => setBrews([]);


  return (
    <BrewContext.Provider value={{ brews, addBrew, clearBrews }}>
      {children} 
    </BrewContext.Provider>
  );
};

export const useBrew = () => {
  const context = useContext(BrewContext);
  if (!context) {
    throw new Error('useBrew must be used within a BrewProvider');
  }
  return context;
};


