import { Project, SelectedNavItem } from "@/types";
import Image from "next/image";
import TimeRangeSelector from "../timerange/timerangeselector";
import ProjectSelect from "../projectselect";
import "./navbar.css";
import { DatePickerWithPresetsAndRange } from "./test";

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


      <TimeRangeSelector onSelect={handleTimeRangeSelect} />

    </header>
  );
}
