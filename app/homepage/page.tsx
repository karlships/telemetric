import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "var(--dominant)",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      ></header>
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <section
          style={{
            backgroundColor: "var(--accent)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ color: "var(--text)" }}>Quick Overview</h2>
          {/* Add quick stats or summary here */}
        </section>
        <section
          style={{
            backgroundColor: "var(--accent)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ color: "var(--text)" }}>Recent Activity</h2>
          {/* Add recent activity list here */}
        </section>
      </main>
    </div>
  );
}
