import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project } from "@/types/index";
import { createClient } from "@/utils/supabase/client";
import { Settings } from "lucide-react";
import { useState } from "react";
export function ProjectSettings({
  selectedProject,
  setSelectedContent,
}: {
  selectedProject: Project;
  setSelectedContent: (content: string) => void;
}) {
  const supabase = createClient();
  if (!selectedProject) return null;
  const [name, setName] = useState(selectedProject.name);

  const handleSave = async () => {
    console.log("Saving project name:", name);
    await supabase
      .from("projects")
      .update({ name })
      .eq("id", selectedProject.id);
  };

  return (
    <Button variant="ghost" onClick={() => setSelectedContent("settings")}>
      <Settings className="h-4 w-4" />
    </Button>
  );
}
