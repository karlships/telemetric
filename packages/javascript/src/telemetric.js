export default class Telemetric {
  static project_id = null;
  static user_id = null;
  static version = null;
  static track_on_localhost = false;
  static initial = false;

  static async init(projectId, version, trackOnLocalhost = false) {
    this.project_id = projectId;
    this.version = version;
    this.track_on_localhost = trackOnLocalhost;

    await this._initializeUserID();

    if (window.location.hostname === "localhost" && !this.track_on_localhost) {
      console.log(
        "Telemetric initialized successfully, but will not send any data on Localhost."
      );
      return;
    }

    try {
      const response = await fetch(
        "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/init",
        {
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
        }
      );

      if (!response.ok) {
        console.error("Failed to initialize Telemetric");
      }
    } catch (error) {
      // Handle error silently
    }
  }

  static async event(name) {
    if (!this.safetyCheck(`Event '${name}'`)) return;
    if (window.location.hostname === "localhost" && !this.track_on_localhost) {
      console.log("Telemetric: Not tracking on localhost.");
      return;
    }

    try {
      const response = await fetch(
        "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/event",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project_id: this.project_id,
            name,
            referrer: document.referrer,
            version: this.version,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to send event:", response.status);
      }
    } catch (error) {
      console.error("Telemetric Event Error:", error);
    }
  }

  static async revenue(total) {
    if (!this.safetyCheck("Revenue")) return;
    if (window.location.hostname === "localhost" && !this.track_on_localhost) {
      console.log("Telemetric: Not tracking on localhost.");
      return;
    }

    try {
      const response = await fetch(
        "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/revenue",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project_id: this.project_id,
            version: this.version,
            referrer: document.referrer,
            total,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to send revenue:", response.status);
      }
    } catch (error) {
      console.error("Telemetric Revenue Error:", error);
    }
  }

  static safetyCheck(action) {
    let valid = true;
    if (!this.project_id) {
      console.error(`${action} reporting failed. Missing project ID.`);
      valid = false;
    }
    if (!this.user_id) {
      console.error(
        `${action} reporting failed. Missing user ID. Make sure to call init() before tracking events or revenue. Also make sure to await init()`
      );
      valid = false;
    }
    return valid;
  }

  static async _initializeUserID() {
    this.user_id = localStorage.getItem("telemetric_user_id");
    if (!this.user_id) {
      this.initial = true;
      this.user_id = this._generateUserID();
      localStorage.setItem("telemetric_user_id", this.user_id);
    }
  }

  static _generateUserID() {
    const hex = () => Math.floor(Math.random() * 16).toString(16);
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = parseInt(hex(), 16);
      return c === "x" ? hex() : ((r & 0x3) | 0x8).toString(16);
    });
  }

  static async saveUserID(userId) {
    localStorage.setItem("telemetric_user_id", userId);
    this.user_id = userId;
  }

  static async getUserID() {
    this.user_id = localStorage.getItem("telemetric_user_id");
    return this.user_id;
  }
}
