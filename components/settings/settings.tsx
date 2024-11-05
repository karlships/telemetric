import { Project } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SettingsCard, SettingsItem } from "../ui/settings-card";
import "./settings.css";

interface SettingsProps {
  selectedProject: Project | null;
  updateProjectName: (projectId: string | null, name: string) => Promise<void>;
}

export const Settings: React.FC<SettingsProps> = ({
  selectedProject,
  updateProjectName,
}) => {
  const [projectName, setProjectName] = useState(selectedProject?.name || "");

  return (
    <div>
      <SettingsCard
        header={{
          title: "Rename Project",
          subtitle: "Current Name: " + selectedProject?.name,
        }}
        action={
          <Button
            disabled={projectName === selectedProject?.name}
            variant="default"
            onClick={() =>
              updateProjectName(selectedProject?.id || null, projectName)
            }
          >
            Update Project Name
          </Button>
        }
      >
        <SettingsItem>
          <p>Project Name</p>
          <Input
            style={{ maxWidth: "300px" }}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </SettingsItem>
      </SettingsCard>
      <SettingsCard
        header={{
          title: "Delete Project",
        }}
        action={
          <Button
            variant="destructive"
            onClick={() =>
              handleDeleteProject(
                selectedProject?.id || null,
                selectedProject?.name || ""
              )
            }
          >
            Delete Project
          </Button>
        }
      >
        <SettingsItem>
          <p>Delete your project and all data it collected.</p>
        </SettingsItem>
        {/* Other items */}
      </SettingsCard>
    </div>
  );
};

const handleDeleteProject = async (
  projectId: string | null,
  projectName: string
) => {
  if (!projectId) {
    toast.error("No project selected");
    return;
  }

  const supabase = createClient();

  try {
    // Delete all related activities
    const { error: activitiesError } = await supabase
      .from("activities")
      .delete()
      .eq("project_id", projectId);

    if (activitiesError) {
      console.error("Error deleting activities:", activitiesError);
      toast.error("Failed to delete project activities");
      return;
    }

    // Delete all related revenue entries
    const { error: revenueError } = await supabase
      .from("revenue")
      .delete()
      .eq("project_id", projectId);

    if (revenueError) {
      console.error("Error deleting revenue:", revenueError);
      toast.error("Failed to delete project revenue data");
      return;
    }

    // Delete all related events
    const { error: eventsError } = await supabase
      .from("events")
      .delete()
      .eq("project_id", projectId);

    if (eventsError) {
      console.error("Error deleting events:", eventsError);
      toast.error("Failed to delete project events");
      return;
    }

    // Finally delete the project
    const { error: projectError, data: projectData } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    // Get the user's current projects array
    const { data: userData, error: userDataError } = await supabase
      .from("customers")
      .select("projects")
      .eq("id", user?.id)
      .single();

    if (userDataError) {
      console.error("Error getting user projects:", userDataError);
      toast.error("Failed to get user's projects");
      return;
    }

    const currentProjects = userData?.projects || [];
    // Remove the project ID from the array
    const updatedProjects = currentProjects.filter(
      (id: string) => id !== projectId
    );

    // Delete the project from the user's projects array
    const { error: userProjectError } = await supabase
      .from("customers")
      .update({ projects: updatedProjects })
      .eq("id", user?.id);

    if (userProjectError) {
      console.error("Error deleting user project:", userProjectError);
      toast.error("Failed to remove project from user's projects");
      return;
    }

    if (projectError) {
      console.error("Error deleting project:", projectError);
      toast.error(projectError.message || "Failed to delete project");
      return;
    }

    toast.success("Project and all related data deleted successfully");
    window.location.href =
      "/?projectDeleted=true&projectDeleteName=" + projectName;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error("An unexpected error occurred while deleting the project");
  }
};
