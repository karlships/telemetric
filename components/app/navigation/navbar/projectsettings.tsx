import { Button } from "@/components/ui/button";
import { Project } from "@/types/index";
import { createClient } from "@/utils/supabase/client";
export function ProjectSettings({
  selectedProject,
  setSelectedContent,
}: {
  selectedProject: Project;
  setSelectedContent: (content: string) => void;
}) {
  const supabase = createClient();

  return (
    <Button variant="outline" onClick={() => setSelectedContent("settings")}>
      Project Settings
    </Button>
  );
}
