"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { AppConfig } from "../types";

type AppConfigContextType = {
  config: AppConfig;
  updateConfig: (newConfig: Partial<AppConfig>) => void;
  resetConfig: () => void;
  isLoaded: boolean;
};

const AppConfigContext = createContext<AppConfigContextType | undefined>(undefined);

export const AppConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/app-config.json');
        if (response.ok) {
          const jsonConfig = await response.json();
          setConfig(jsonConfig);
          console.log('Loaded config from JSON file:', jsonConfig);
        } else {
          console.error('Could not load from JSON file, response not ok:', response.status);
        }
      } catch (error) {
        console.error('Error loading app config:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadConfig();
  }, []);

  const updateConfig = (newConfig: Partial<AppConfig>) => {
    if (config) {
      const updatedConfig = { ...config, ...newConfig };
      setConfig(updatedConfig);
      localStorage.setItem("app-config", JSON.stringify(updatedConfig));
    }
  };

  const resetConfig = () => {
    localStorage.removeItem("app-config");
    window.location.reload();
  };

  if (!isLoaded || !config) {
    return <div>Loading...</div>;
  }

  return (
    <AppConfigContext.Provider 
      value={{ 
        config, 
        updateConfig, 
        resetConfig, 
        isLoaded 
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);
  if (context === undefined) {
    throw new Error("useAppConfig must be used within an AppConfigProvider");
  }
  return context;
};