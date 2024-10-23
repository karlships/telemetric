import { createContext, ReactNode, useContext, useEffect } from "react";
import Telemetric from "../javascript/telemetric";

interface TelemetricContextType {
  event: (name: string) => Promise<void>;
  revenue: (amount: number) => Promise<void>;
  getUserId: () => Promise<string | null>;
  saveUserId: (userId: string) => Promise<void>;
}

const TelemetricContext = createContext<TelemetricContextType | undefined>(
  undefined
);

interface TelemetricProviderProps {
  children: ReactNode;
  projectId: string;
  version: string;
  trackOnLocalhost?: boolean;
}

export function TelemetricProvider({
  children,
  projectId,
  version,
  trackOnLocalhost = false,
}: TelemetricProviderProps) {
  useEffect(() => {
    Telemetric.init(projectId, version, trackOnLocalhost);
  }, [projectId, version, trackOnLocalhost]);

  const value: TelemetricContextType = {
    event: Telemetric.event.bind(Telemetric),
    revenue: Telemetric.revenue.bind(Telemetric),
    getUserId: Telemetric.getUserID.bind(Telemetric),
    saveUserId: Telemetric.saveUserID.bind(Telemetric),
  };

  return (
    <TelemetricContext.Provider value={value}>
      {children}
    </TelemetricContext.Provider>
  );
}

export function useTelemetric(): TelemetricContextType {
  const context = useContext(TelemetricContext);
  if (context === undefined) {
    throw new Error("useTelemetric must be used within a TelemetricProvider");
  }
  return context;
}
