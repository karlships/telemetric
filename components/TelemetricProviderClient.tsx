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
      projectId="c1badaba-2f6e-4a92-a0f8-eb173bdc03f2"
      version="1.0.2"
      trackOnLocalhost={true}
    >
      {children}
    </TelemetricProvider>
  );
}
