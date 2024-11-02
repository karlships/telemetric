import { CodeBlock } from "@/components/ui/code-block";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsCard, SettingsItem } from "@/components/ui/settings-card";
import { Project } from "@/types";
import { useState } from "react";

interface SetupProps {
  selectedProject: Project;
}

const frameworks = [{ label: "Flutter", value: "flutter" }];

export const Setup: React.FC<SetupProps> = ({ selectedProject }) => {
  const [selectedFramework, setSelectedFramework] = useState<string>("flutter");

  const getCodeSnippet = (framework: string) => {
    switch (framework) {
      case "flutter":
        return `import 'package:telemetric/telemetric.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  // Always await the init call
 await Telemetric.init('${selectedProject.id}');
}

// Track events
Telemetric.event('event_name');

// Track revenue
Telemetric.revenue(1.99);`;
      case "react":
        return `import { Telemetric } from '@telemetric/react'

function App() {
  return (
    <Telemetric projectId="${selectedProject.id}">
      <YourApp />
    </Telemetric>
  )
}`;
      // Add other frameworks...
    }
  };

  const getInstallSnippet = (framework: string) => {
    switch (framework) {
      case "flutter":
        return `flutter pub add telemetric`;
      case "react":
        return `npm install @telemetric/react`;
      default:
        return "";
    }
  };

  return (
    <div className="flex justify-center items-center">
      <SettingsCard
        header={{
          title: "Project Setup",
          subtitle: "Get started with " + selectedProject.name,
        }}
      >
        <SettingsItem>
          <p>Select your framework</p>
          <Select
            value={selectedFramework}
            onValueChange={setSelectedFramework}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {frameworks.map((framework) => (
                  <SelectItem key={framework.value} value={framework.value}>
                    {framework.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </SettingsItem>

        <SettingsItem>
          <div className="flex flex-col gap-2">
            <p>1. Install the package</p>
            <CodeBlock
              language={selectedFramework === "flutter" ? "yaml" : "bash"}
            >
              {getInstallSnippet(selectedFramework)}
            </CodeBlock>
          </div>
        </SettingsItem>

        <SettingsItem>
          <div className="flex flex-col gap-2">
            <p>2. Add to your app</p>
            <CodeBlock language="typescript">
              {String(getCodeSnippet(selectedFramework))}
            </CodeBlock>
          </div>
        </SettingsItem>
      </SettingsCard>
    </div>
  );
};
