import { Project } from "@/types";

import ProjectSelect from "../projectselect";
import TimeRangeSelector from "../timerange/timerangeselector";
import "./navbar.css";
import { UserProfile } from "../../account/userprofile";

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
}

export function Navbar({
  selectedProject,

  projects,
  onProjectChange,
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
      <div style={{ marginLeft: "auto" }}>
        <UserProfile />
      </div>
    </header>
  );
}
