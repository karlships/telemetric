import { createClient } from "@/utils/supabase/server";

import Footer from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/input";
import { handleWaitlistSubmission } from "./actions";

export default async function HomePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col min-h-screen p-5 bg-[var(--dominant)]">
      <header className="flex justify-between items-center mb-5">
        {/* Add header content */}
      </header>

      <main
        className="flex-1 flex flex-col gap-5"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <section
          className="bg-[var(--accent)] p-5 rounded-lg"
          style={{
            maxWidth: "600px",
            gap: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2 className=" text-center">
            Privacy focused Analytics for your websites, apps and more
          </h2>
          <p style={{ color: "var(--subtitle)", textAlign: "center" }}>
            Telemetric is currently in private access. Join the waitlist and you
            will be personally onboarded. Telemetric is free to use while in
            private access.
          </p>

          <form
            style={{
              maxWidth: "350px",
              alignItems: "center",
              gap: "10px",
              display: "flex",
              flexDirection: "row",
            }}
            action={handleWaitlistSubmission}
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              style={{ width: "100%" }}
              required
            />

            <Button style={{ width: "120px" }} type="submit">
              I want access
            </Button>
          </form>
        </section>
        <img
          src="https://framerusercontent.com/images/Jkuy3aB4Ufb8v4xqufBCEZCqN2w.png?scale-down-to=2048"
          alt="Analytics"
          style={{
            width: "100%",
            height: "auto",
            clipPath: "inset(0 60px 20px 60px)",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
