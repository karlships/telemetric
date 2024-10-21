import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/types";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";

interface ProjectSelectProps {
  projects: Project[];
  loading: boolean;
  selectedProject: Project;
  onProjectChange: (value: string) => void;
}

const ProjectSelect: React.FC<ProjectSelectProps> = ({
  projects,
  loading,
  selectedProject,
  onProjectChange,
}) => {
  const [appIcons, setAppIcons] = useState<Record<string, string>>({});

  const fetchAppIcon = async (bundleId: string) => {
    if (bundleId.startsWith("https://")) {
      return (
        "https://www.google.com/s2/favicons?domain=" + bundleId + "&sz=256"
      );
    }

    const response = await fetch(
      `https://itunes.apple.com/lookup?bundleId=${bundleId}`
    );
    const data = await response.json();
    if (data.resultCount > 0) {
      const appData = data.results[0];
      return appData.artworkUrl100; // Use the 100x100 icon URL
    }
    return "null"; // Return null if no icon is found
  };

  React.useEffect(() => {
    if (projects.length > 0) {
      projects.forEach(async (project) => {
        const icon = await fetchAppIcon(project.url);
        setAppIcons((prev) => ({ ...prev, [project.id]: icon }));
      });
    }
  }, [projects]);

  // Add a check for selectedProject

  return (
    <Select
      onValueChange={onProjectChange}
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
                src={"/images/logo.png"}
                width={15}
                height={15}
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                }}
                alt={"Loading..."} // Added alt attribute for accessibility
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
                  src={appIcons[project.id] || ""}
                  width={15}
                  height={15}
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                  }}
                  alt={project.name} // Added alt attribute for accessibility
                />{" "}
                {project.name}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ProjectSelect;
