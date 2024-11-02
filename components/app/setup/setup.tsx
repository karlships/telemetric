import { Button } from "@/components/ui/button";

import { CodeBlock } from "@/components/ui/code-block";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SettingsCard, SettingsItem } from "@/components/ui/settings-card";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";

interface SetupProps {
  selectedProject: Project;
}

const frameworks = [
  {
    label: "Flutter",
    value: "flutter",
    logo: "images/frameworks/flutter.png",
  },
  {
    label: "Framer",
    value: "framer",
    logo: "images/frameworks/framer.png",
  },
  {
    label: "Webflow",
    value: "webflow",
    logo: "images/frameworks/webflow.png",
  },
  {
    label: "HTML/JavaScript",
    value: "vanilla",
    logo: "images/frameworks/javascript.png",
  },
];

export const Setup: React.FC<SetupProps> = ({ selectedProject }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedFramework, setSelectedFramework] = useState("flutter");

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
      case "framer":
        return `<script src="https://hkromzwdaxhcragbcnmw.supabase.co/storage/v1/object/public/cdn/telemetric.bundle.js"></script>
<script>
// Initialize when page loads
window.addEventListener('load', async function() {
    // Initialize with your project ID
    await Telemetric.init('${selectedProject.id}', '1.0.0', false);
});
</script>
`;
      case "webflow":
        return `<script src="https://hkromzwdaxhcragbcnmw.supabase.co/storage/v1/object/public/cdn/telemetric.bundle.js"></script>
<script>
// Initialize with your project ID
Telemetric.init('${selectedProject.id}', '1.0.0', false);
</script>
`;
      case "vanilla":
        return `<script src="https://hkromzwdaxhcragbcnmw.supabase.co/storage/v1/object/public/cdn/telemetric.bundle.js"></script>
<script>
// Initialize with your project ID
Telemetric.init('${selectedProject.id}', '1.0.0', false);
</script>`;
      default:
        return "";
    }
  };

  const getVerificationSteps = (framework: string) => {
    switch (framework) {
      case "flutter":
        return `3. By default, Telemetric won't send any data in debug mode.
        To test Telemetric is working, call Telemetric.init() with trackInDebug: true.
        Then hot restart your app, reload this page.
        If it's working this screen will gone and instead you'll see the analytics dashboard.`;
      case "framer":
      case "webflow":
      case "vanilla":
        return "2. Verify the integration by opening your browser's Developer Console (F12) and checking for a message confirming the connection to Telemetric.";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <SettingsCard
        header={{
          title: "Project Setup",
          subtitle: "Get started with " + selectedProject.name,
        }}
        action={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Problems? Get help</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top">
                <DropdownMenuItem
                  onClick={() =>
                    window.open("https://telemetric.app/docs", "_blank")
                  }
                >
                  DM me on X
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => window.open("mailto:support@untitledapps.at")}
                >
                  Send an email
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    window.open(
                      "https://github.com/untitledapps/telemetric/issues",
                      "_blank"
                    )
                  }
                >
                  GitHub Issue
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              onClick={() => window.open("/missing-sdk", "_blank")}
            >
              Your SDK is missing?
            </Button>
          </>
        }
      >
        <SettingsItem>
          <p>Select your framework</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {selectedFramework ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        frameworks.find((f) => f.value === selectedFramework)
                          ?.logo
                      }
                      alt=""
                      className="w-4 h-4"
                    />
                    {
                      frameworks.find((f) => f.value === selectedFramework)
                        ?.label
                    }
                  </div>
                ) : (
                  "Select framework..."
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setSelectedFramework(currentValue);
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedFramework === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <img
                            src={framework.logo}
                            alt=""
                            className="w-4 h-4"
                          />
                          {framework.label}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </SettingsItem>

        {getInstallSnippet(selectedFramework) && (
          <SettingsItem>
            <div
              className="flex flex-col gap-2"
              style={{ maxWidth: "600px", width: "100%" }}
            >
              <p
                style={{
                  whiteSpace: "pre-line",
                  maxWidth: "600px",
                }}
              >
                {selectedFramework === "framer"
                  ? 'Open your framer project settings, select "General" and then scroll down to find the Custom Code section. \nCopy and paste the following code to the Start of Head Tag property. Then press "Save", and then "Publish".'
                  : selectedFramework === "webflow"
                  ? "Open your Webflow project settings, and then on the left sidebar select Custom Code. \nCopy and paste the following code to the Start of Head Tag property. Then press Save, and then Publish."
                  : selectedFramework === "vanilla"
                  ? "Copy and paste the following code to the Start of Head Tag property of your website."
                  : "1. Install the package"}
              </p>
              <CodeBlock
                language={
                  selectedFramework === "flutter"
                    ? "bash"
                    : selectedFramework === "framer" ||
                      selectedFramework === "webflow"
                    ? "html"
                    : "bash"
                }
              >
                {getInstallSnippet(selectedFramework)}
              </CodeBlock>
            </div>
          </SettingsItem>
        )}

        {getCodeSnippet(selectedFramework) && (
          <SettingsItem>
            <div
              className="flex flex-col gap-2"
              style={{ maxWidth: "600px", width: "100%" }}
            >
              <p>2. Add to your app</p>
              <CodeBlock language="typescript">
                {String(getCodeSnippet(selectedFramework))}
              </CodeBlock>
            </div>
          </SettingsItem>
        )}

        {getVerificationSteps(selectedFramework) && (
          <SettingsItem>
            <div className="flex flex-col gap-2">
              <p>{getVerificationSteps(selectedFramework)}</p>
            </div>
          </SettingsItem>
        )}
      </SettingsCard>
      <div style={{ height: "100px" }}></div>
    </div>
  );
};
