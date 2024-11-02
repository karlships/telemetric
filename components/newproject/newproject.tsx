import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SettingsCard, SettingsItem } from "../ui/settings-card";
import "./newproject.css";

export const NewProject: React.FC<{
  createProject: (projectName: string) => void;
}> = ({ createProject }) => {
  const [projectName, setProjectName] = useState("");

  return (
    <SettingsCard
      header={{
        title: "New Project",
      }}
      action={
        <Button onClick={() => createProject(projectName)}>Create Project</Button>
      }
    >
      <SettingsItem>
        <p>Your Project Name</p>
        <Input
          style={{ maxWidth: "300px" }}
          placeholder="My Cool Project"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </SettingsItem>
      {/* Other items */}
    </SettingsCard>
  );
};
