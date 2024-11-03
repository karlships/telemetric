declare const Telemetric: {
  init(projectId: string, version: string, trackOnLocalhost?: boolean): Promise<void>;
  event(name: string): Promise<void>;
  revenue(total: number): Promise<void>;
}