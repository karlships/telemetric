import { Dashboard } from "@/components/app/main";
import { createClient } from "@/utils/supabase/server";
import { redirect, useSearchParams } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/homepage");
  }

  return <Dashboard />;
}
