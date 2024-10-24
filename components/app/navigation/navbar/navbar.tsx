import { Project } from "@/types";

import { UserProfile } from "../../account/userprofile";
import ProjectSelect from "../projectselect";
import TimeRangeSelector from "../timerange/timerangeselector";
import "./navbar.css";
import { ProjectSettings } from "./projectsettings";
interface HeaderProps {
  projects: Project[];
  loading: boolean;
  onProjectChange: (value: string) => void;
  handleTimeRangeSelect: (
    range: string,
    startDate?: Date,
    endDate?: Date
  ) => void;
  selectedProject: Project;
  setSelectedContent: (content: string) => void;
}

export function Navbar({
  selectedProject,

  projects,
  onProjectChange,
  setSelectedContent,
  loading,
  handleTimeRangeSelect,
}: HeaderProps) {
  // Check if the selected project has a metadata type of 'app'
  const showEnvironmentSelect = selectedProject?.type === "app";

  return (
    <header className="navbar">
      <ProjectSelect
        projects={projects}
        selectedProject={selectedProject!}
        onProjectChange={onProjectChange}
        loading={loading}
      />
      <div className="timerange-selector">
        <TimeRangeSelector onSelect={handleTimeRangeSelect} />
      </div>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <ProjectSettings
          selectedProject={selectedProject}
          setSelectedContent={setSelectedContent}
        />
        <UserProfile setSelectedContent={setSelectedContent} />
      </div>
    </header>
  );
}
