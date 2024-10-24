/// <reference types="react" />

declare module "@offuntitledapps/telemetric" {
    export interface TelemetricContextType {
        event: (name: string) => Promise<void>;
        revenue: (amount: number) => Promise<void>;
        getUserId: () => Promise<string | null>;
        saveUserId: (userId: string) => Promise<void>;
    }

    export interface TelemetricProviderProps {
        children: React.ReactNode;
        projectId: string;
        version: string;
        trackOnLocalhost?: boolean;
    }

    export const TelemetricProvider: React.FC<TelemetricProviderProps>;
    export function useTelemetric(): TelemetricContextType;
}
