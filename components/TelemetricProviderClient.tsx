"use client";

import { TelemetricProvider } from "@offuntitledapps/telemetric";
import { ReactNode } from "react";

export function TelemetricProviderClient({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TelemetricProvider
      projectId="364b0efc-6a84-43a6-ae52-39b2cde18139"
      version="1.0.0"
      trackOnLocalhost={false}
    >
      {children}
    </TelemetricProvider>
  );
}
