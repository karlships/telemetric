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
}: {
  selectedProject: Project;
}) {
  if (!selectedProject) return null;
  const [name, setName] = useState(selectedProject.name);
  const supabase = createClient();

  const handleSave = async () => {
    console.log("Saving project name:", name);
    await supabase
      .from("projects")
      .update({ name })
      .eq("id", selectedProject.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent style={{ maxWidth: "300px" }}>
        <DialogHeader>
          <DialogTitle>Project Settings</DialogTitle>
          <DialogDescription>
            Make changes to your project here. Click save when you're done. To
            delete your project contact support via clicking on your profile
            picture.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              defaultValue={selectedProject?.name}
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Label
              htmlFor="info"
              className="text-right col-span-4 text-sm text-muted-foreground"
            >
              Changes will apply the next time you load the page
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>

          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
