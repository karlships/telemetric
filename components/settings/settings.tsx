import { Project } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Book, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import "./settings.css";

interface SettingsProps {
  selectedProject: Project | null;
  updateProjectName: (projectId: string | null, name: string) => Promise<void>;
}

export const Settings: React.FC<SettingsProps> = ({ selectedProject }) => {
  const [projectName, setProjectName] = useState<string | null>(
    selectedProject?.name || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();
  const homePageRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);
  const xRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const githubIssueRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (
        homePageRef.current &&
        homePageRef.current.contains(event.target as Node)
      ) {
        window.open("/homepage", "_blank");
      }
      if (
        githubRef.current &&
        githubRef.current.contains(event.target as Node)
      ) {
        window.open("https://github.com/untitledapps/telemetric", "_blank");
      }
      if (emailRef.current && emailRef.current.contains(event.target as Node)) {
        window.open("mailto:support@untitledapps.at", "_blank");
      }
      if (xRef.current && xRef.current.contains(event.target as Node)) {
        window.open(
          "https://x.com/messages/compose?recipient_id=1680911613988073473",
          "_blank"
        );
      }
      if (
        githubIssueRef.current &&
        githubIssueRef.current.contains(event.target as Node)
      ) {
        window.open(
          "https://github.com/untitledapps/telemetric/issues",
          "_blank"
        );
      }
      if (docsRef.current && docsRef.current.contains(event.target as Node)) {
        window.open("https://telemetric.app/docs", "_blank");
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  const handleSaveProjectName = async () => {
    setLoading(true);
    await updateProjectName(selectedProject?.id || null, projectName || "");
    setLoading(false);
  };

  const updateProjectName = async (projectId: string | null, name: string) => {
    const supabase = createClient();
    await supabase.from("projects").update({ name }).eq("id", projectId);
    toast.success("Project name updated");
    toast.info("Reload the page to see the changes");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="profile-container-wrapper">
        <div className="profile-container">
          <div
            style={{
              border: "1px solid var(--outline)",
              borderRadius: "10px",
              overflow: "hidden",
              display: "flex",

              alignItems: "start",
              width: "100%",
              justifyContent: "start",
              backgroundColor: "var(--on-dominant)",
              flexDirection: "column",
              gap: "0px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "space-between",
                width: "100%",
                minWidth: "100%",
                maxWidth: "100%",
                maxHeight: "40px",
                justifyContent: "space-between",
              }}
            >
              <h4
                style={{
                  color: "var(--secondary)",
                  padding: "10px",
                }}
              >
                {selectedProject?.name} Settings
              </h4>
              <p
                style={{
                  color: "var(--subtitle)",
                  padding: "10px",
                  fontSize: "12px",
                }}
              >
                {selectedProject?.name}
              </p>
            </div>
            <div
              style={{
                height: "1px",
                width: "100%",
                borderBottom: "1px solid var(--outline)",
              }}
            ></div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0px",
              }}
            >
              <div className="profile-container-wrapper-item">
                <p style={{ minWidth: "100px" }}>Change Project Name</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "end",
                    width: "80%",
                  }}
                >
                  <Input
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                    }}
                    value={projectName || ""}
                    onChange={(e) => {
                      setProjectName(e.target.value);
                    }}
                  />
                  <Button
                    disabled={loading || projectName === selectedProject?.name}
                    onClick={() => {
                      handleSaveProjectName();
                    }}
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
              <div className="profile-container-wrapper-item">
                <p>Docs</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open("https://telemetric.app/docs", "_blank");
                  }}
                >
                  <Book />
                  View docs
                </Button>
              </div>
              <div className="profile-container-wrapper-item">
                <p>
                  Missing an SDK for your framework? Create an Issue on Github
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(
                      "https://github.com/untitledapps/telemetric/issues",
                      "_blank"
                    );
                  }}
                >
                  <GitHubLogoIcon />
                  Github Issue
                </Button>
              </div>

              <div className="profile-container-wrapper-item">
                <p>Delete Project</p>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteProject(selectedProject?.id || null);
                  }}
                >
                  <Trash2Icon />
                  Delete Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const handleDeleteProject = async (projectId: string | null) => {
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
    const { error: projectError } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (projectError) {
      console.error("Error deleting project:", projectError);
      toast.error(projectError.message || "Failed to delete project");
      return;
    }

    toast.success("Project and all related data deleted successfully");
    window.location.href = "/";
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error("An unexpected error occurred while deleting the project");
  }
};
