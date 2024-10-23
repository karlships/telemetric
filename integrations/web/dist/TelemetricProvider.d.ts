import React, { ReactNode } from "react";
interface TelemetricContextType {
    event: (name: string) => Promise<void>;
    revenue: (amount: number) => Promise<void>;
    getUserId: () => Promise<string | null>;
    saveUserId: (userId: string) => Promise<void>;
}
interface TelemetricProviderProps {
    children: ReactNode;
    projectId: string;
    version: string;
    trackOnLocalhost?: boolean;
}
export declare const TelemetricProvider: React.FC<TelemetricProviderProps>;
export declare function useTelemetric(): TelemetricContextType;
export {};
