import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/input";

export default async function HomePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth");
  }

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
            maxWidth: "300px",
            gap: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 className="text-[var(--text)] text-xl font-semibold ">
            Join the Waitlist
          </h2>
          <p>
            Telemetric is currently in private access. Join the waitlist and you
            will be personally onboarded. Telemetric is free to use while in
            private access.
          </p>
          <form className="flex flex-col gap-3">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />

            <Button type="submit">Join Waitlist</Button>
          </form>
        </section>
      </main>
    </div>
  );
}
