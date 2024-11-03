!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.Telemetric = t())
    : (e.Telemetric = t());
})(this, () =>
  (() => {
    "use strict";
    var e = {
        d: (t, o) => {
          for (var r in o)
            e.o(o, r) &&
              !e.o(t, r) &&
              Object.defineProperty(t, r, { enumerable: !0, get: o[r] });
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
      },
      t = {};
    e.d(t, { default: () => o });
    class o {
      static project_id = null;
      static user_id = null;
      static version = null;
      static track_on_localhost = !1;
      static initial = !1;
      static async init(e, t, o = !1) {
        if (
          ((this.project_id = e),
          (this.version = t),
          (this.track_on_localhost = o),
          await this._initializeUserID(),
          "localhost" !== window.location.hostname || this.track_on_localhost)
        )
          try {
            (
              await fetch(
                "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/init",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    project_id: this.project_id,
                    user_id: this.user_id,
                    version: this.version,
                    url_running_on: window.location.href,
                    referrer: document.referrer,
                  }),
                }
              )
            ).ok || console.error("Failed to initialize Telemetric");
          } catch (e) {}
        else
          console.log(
            "Telemetric initialized successfully, but will not send any data on Localhost."
          );
      }
      static async event(e) {
        if (this.safetyCheck(`Event '${e}'`))
          if (
            "localhost" !== window.location.hostname ||
            this.track_on_localhost
          )
            try {
              const t = await fetch(
                "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/event",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    project_id: this.project_id,
                    name: e,
                    referrer: document.referrer,
                    version: this.version,
                  }),
                }
              );
              t.ok || console.error("Failed to send event:", t.status);
            } catch (e) {
              console.error("Telemetric Event Error:", e);
            }
          else console.log("Telemetric: Not tracking on localhost.");
      }
      static async revenue(e) {
        if (this.safetyCheck("Revenue"))
          if (
            "localhost" !== window.location.hostname ||
            this.track_on_localhost
          )
            try {
              const t = await fetch(
                "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/revenue",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    project_id: this.project_id,
                    version: this.version,
                    referrer: document.referrer,
                    total: e,
                  }),
                }
              );
              t.ok || console.error("Failed to send revenue:", t.status);
            } catch (e) {
              console.error("Telemetric Revenue Error:", e);
            }
          else console.log("Telemetric: Not tracking on localhost.");
      }
      static safetyCheck(e) {
        let t = !0;
        return (
          this.project_id ||
            (console.error(`${e} reporting failed. Missing project ID.`),
            (t = !1)),
          this.user_id ||
            (console.error(
              `${e} reporting failed. Missing user ID. Make sure to call init() before tracking events or revenue. Also make sure to await init()`
            ),
            (t = !1)),
          t
        );
      }
      static async _initializeUserID() {
        (this.user_id = localStorage.getItem("telemetric_user_id")),
          this.user_id ||
            ((this.initial = !0),
            (this.user_id = this._generateUserID()),
            localStorage.setItem("telemetric_user_id", this.user_id));
      }
      static _generateUserID() {
        const e = () => Math.floor(16 * Math.random()).toString(16);
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
          const o = parseInt(e(), 16);
          return "x" === t ? e() : ((3 & o) | 8).toString(16);
        });
      }
      static async saveUserID(e) {
        localStorage.setItem("telemetric_user_id", e), (this.user_id = e);
      }
      static async getUserID() {
        return (
          (this.user_id = localStorage.getItem("telemetric_user_id")),
          this.user_id
        );
      }
    }
    return t.default;
  })()
);
