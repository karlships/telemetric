import { Project } from "@/types";

import { Skeleton } from "@/components/ui/skeleton";
import { UserProfile } from "../profile_avatar";
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

  if (!selectedProject)
    return (
      <header className="navbar">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </header>
    );

  return (
    <header className="navbar">
      <ProjectSelect
        projects={projects}
        selectedProject={selectedProject!}
        onProjectChange={onProjectChange}
        loading={loading}

        setSelectedContent={setSelectedContent}
      />
      <div className="timerange-selector">
        <TimeRangeSelector
          onSelect={handleTimeRangeSelect}
          activities={selectedProject.activities}
        />
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
