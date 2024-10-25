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

  return (
    <Button variant="ghost" onClick={() => setSelectedContent("settings")}>
      <Settings className="h-4 w-4" />
    </Button>
  );
}