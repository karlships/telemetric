import React, { useEffect } from "react";
import Telemetric from "../../src/core/telemetric";

interface TelemetricProviderProps {
  children: React.ReactNode;
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
    Telemetric.init(projectId, version, trackOnLocalhost).catch((error) => {
      console.error("Failed to initialize Telemetric:", error);
    });
  }, [projectId, version, trackOnLocalhost]);

  return <>{children}</>;
}

export const track = Telemetric.event.bind(Telemetric);
export const trackRevenue = Telemetric.revenue.bind(Telemetric);
export const getUserId = Telemetric.getUserID.bind(Telemetric);
export const setUserId = Telemetric.saveUserID.bind(Telemetric);
