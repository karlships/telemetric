//C:\Users\likam\Documents\AppDevelopment\Webapps\Telemetric-Private\integrations\javascript\dist
class Telemetric {
  static project_id: string | null = null;
  static user_id: string | null = null;
  static version: string | null = null;
  static track_on_localhost: boolean = false;
  static initial: boolean = false;

  static async init(
    project_id_param: string,
    version: string,
    track_on_localhost_param: boolean = false,
  ): Promise<void> {
    this.project_id = project_id_param;
    this.version = version;
    this.track_on_localhost = track_on_localhost_param;
    await this._initializeUserID();
    const url = "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/init";

    // Check if we should track on localhost
    if (window.location.hostname === "localhost" && !this.track_on_localhost) {
      console.log(
        "Telemetric initialized successfully, but will not send any data on Localhost.",
      );
      return;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: this.project_id,
          user_id: this.user_id,
          version: this.version,
          url_running_on: window.location.href,
          referrer: document.referrer,
        }),
      });

      if (!response.ok) {
        console.error("Failed to initialize Telemetric");
      }
    } catch (e) {}
  }

  static async event(name: string): Promise<void> {
    if (!this.safetyCheck(`Event '${name}'`)) return;
    if (window.location.hostname === "localhost" && !this.track_on_localhost) {
      console.log("Telemetric: Not tracking on localhost.");
      return;
    }
    const url = "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/event";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: this.project_id,

          name: name,

          referrer: document.referrer,
          version: this.version,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send event:", response.status);
      }
    } catch (e) {
      console.error("Telemetric Event Error:", e);
    }
  }

  static async revenue(amount: number): Promise<void> {
    if (!this.safetyCheck("Revenue")) return;
    if (window.location.hostname === "localhost" && !this.track_on_localhost) {
      console.log("Telemetric: Not tracking on localhost.");
      return;
    }
    const url = "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/revenue";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: this.project_id,
          version: this.version,
          referrer: document.referrer,
          total: amount,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send revenue:", response.status);
      }
    } catch (e) {
      console.error("Telemetric Revenue Error:", e);
    }
  }

  static safetyCheck(source: string): boolean {
    let isSafe = true;

    if (!this.project_id) {
      console.error(`${source} reporting failed. Missing project ID.`);
      isSafe = false;
    }

    if (!this.user_id) {
      console.error(
        `${source} reporting failed. Missing user ID. Make sure to call init() before tracking events or revenue. Also make sure to await init()`,
      );
      isSafe = false;
    }

    return isSafe;
  }

  static async _initializeUserID(): Promise<void> {
    this.user_id = localStorage.getItem("telemetric_user_id");

    if (!this.user_id) {
      this.initial = true;
      this.user_id = this._generateUserID();
      localStorage.setItem("telemetric_user_id", this.user_id);
    }
  }

  static _generateUserID(): string {
    const random = () => Math.floor(Math.random() * 16).toString(16);
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = parseInt(random(), 16); // Convert hex string back to number
      return c === "x" ? random() : ((r & 0x3) | 0x8).toString(16);
    });
  }

  static async saveUserID(userID: string): Promise<void> {
    localStorage.setItem("telemetric_user_id", userID);
    this.user_id = userID;
  }

  static async getUserID(): Promise<string | null> {
    this.user_id = localStorage.getItem("telemetric_user_id");
    return this.user_id;
  }
}

export default Telemetric;
