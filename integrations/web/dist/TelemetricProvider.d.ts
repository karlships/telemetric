import * as React from "react";
interface TelemetricContextType {
    event: (name: string) => Promise<void>;
    revenue: (amount: number) => Promise<void>;
    getUserId: () => Promise<string | null>;
    saveUserId: (userId: string) => Promise<void>;
}
interface TelemetricProviderProps {
    children: React.ReactNode;
    projectId: string;
    version: string;
    trackOnLocalhost?: boolean;
}
export declare const TelemetricProvider: ({ children, projectId, version, trackOnLocalhost, }: TelemetricProviderProps) => React.JSX.Element;
export declare function useTelemetric(): TelemetricContextType;
export {};
