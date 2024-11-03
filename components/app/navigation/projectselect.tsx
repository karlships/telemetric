import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/types";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";

interface ProjectSelectProps {
  projects: Project[];
  loading: boolean;
  selectedProject: Project;

  setSelectedContent: (value: string) => void;
  onProjectChange: (value: string) => void;
}

const ProjectSelect: React.FC<ProjectSelectProps> = ({
  projects,
  setSelectedContent,
  loading,
  selectedProject,
  onProjectChange,
}) => {
  const [appIcons, setAppIcons] = useState<Record<string, string>>({});

  const fetchAppIcon = async (selectedProject: Project) => {
    // Check first activity for bundle ID or URL
    if (selectedProject.bundle_id) {
      const response = await fetch(
        `https://itunes.apple.com/lookup?bundleId=${selectedProject.bundle_id}`
      );
      const data = await response.json();
      if (data.resultCount > 0) {
        const appData = data.results[0];
        return appData.artworkUrl100; // Use the 100x100 icon URL
      }
    } else if (selectedProject.url_running_on) {
      return (
        "https://www.google.com/s2/favicons?domain=" +
        selectedProject.url_running_on +
        "&sz=256"
      );
    }

    return "/icon.png";
  };

  React.useEffect(() => {
    if (projects.length > 0) {
      projects.forEach(async (project) => {
        const icon = await fetchAppIcon(project);
        setAppIcons((prev) => ({ ...prev, [project.id]: icon }));
      });
    }
  }, [projects]);

  // Add a check for selectedProject

  return (
    <Select
      onValueChange={(value) => {
        if (value !== "create-new-project") {
          onProjectChange(value);
        } else {
          setSelectedContent("newProject");
        }
      }}
      value={
        !loading && selectedProject && selectedProject.id !== undefined
          ? selectedProject.id
          : ""
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Image
                src={"/icon.png"}
                width={15}
                height={15}
                style={{
                  width: "15px",
                  height: "15px",
                }}
                alt={"Loading..."}
              />{" "}
              Loading...
            </div>
          }
        ></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Projects</SelectLabel>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Image
                  src={appIcons[project.id] || "/icon.png"}
                  width={15}
                  height={15}
                  style={{
                    width: "15px",
                    height: "15px",
                  }}
                  alt={project.name}
                />{" "}
                {project.name}
              </div>
            </SelectItem>
          ))}
          <SelectSeparator />
          <SelectItem value="create-new-project">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <PlusCircle className="w-4 h-4" />
              Create New Project
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ProjectSelect;
