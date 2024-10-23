import { ReactNode } from "react";

export interface TelemetricProviderProps {
    children: ReactNode;
    projectId: string;
    version: string;
    trackOnLocalhost?: boolean;
}

export interface TelemetricContextType {
    event: (name: string) => Promise<void>;
    revenue: (amount: number) => Promise<void>;
    getUserId: () => Promise<string | null>;
    saveUserId: (userId: string) => Promise<void>;
}

export const TelemetricProvider: React.FC<TelemetricProviderProps>;
export function useTelemetric(): TelemetricContextType;

declare class Telemetric {
    static init(
        projectId: string,
        version: string,
        trackOnLocalhost?: boolean,
    ): void;
    static event(name: string): Promise<void>;
    static revenue(amount: number): Promise<void>;
    static getUserID(): Promise<string | null>;
    static saveUserID(userId: string): Promise<void>;
}

export default Telemetric;
