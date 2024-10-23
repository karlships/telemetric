export default class Telemetric {
    static project_id: string | null;
    static user_id: string | null;
    static version: string | null;
    static track_on_localhost: boolean;
    static initial: boolean;
    static init(project_id_param: string, version: string, track_on_localhost_param?: boolean): Promise<void>;
    static event(name: string): Promise<void>;
    static revenue(amount: number): Promise<void>;
    static safetyCheck(source: string): boolean;
    static _initializeUserID(): Promise<void>;
    static _generateUserID(): string;
    static saveUserID(userID: string): Promise<void>;
    static getUserID(): Promise<string | null>;
}
