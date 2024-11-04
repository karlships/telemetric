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
import {
  frameworks,
  getCodeSnippet,
  getFinishSteps,
  getInstallSnippet,
  getTrackingSnippet,
  getVerificationSteps,
} from "./setup-instructions";

interface SetupProps {
  selectedProject: Project;
}

export const Setup: React.FC<SetupProps> = ({ selectedProject }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedFramework, setSelectedFramework] = useState("flutter");

  return (
    <div className="flex flex-col gap-2  mx-auto">
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
        <div className="max-w-[600px]">
          <SettingsItem>
            <div className="flex flex-col gap-2">
              <p>
                To add Telemetric to your app, website or webapp, follow the
                instructions below. If your framework is not listed, please tell
                me and I will add it within 24 hours. Click on the button at the
                bottom right if you need help.
              </p>
              <p>1. Select your framework</p>
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
                            frameworks.find(
                              (f) => f.value === selectedFramework
                            )?.logo
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
            </div>
          </SettingsItem>

          {Boolean(
            getInstallSnippet(selectedProject.id, selectedFramework)
          ) && (
            <SettingsItem>
              <div className="flex flex-col gap-2 w-full">
                <p className="whitespace-pre-line">
                  {
                    getInstallSnippet(selectedProject.id, selectedFramework)
                      ?.description
                  }
                </p>
                <CodeBlock
                  language={
                    getInstallSnippet(selectedProject.id, selectedFramework)
                      ?.language || "bash"
                  }
                >
                  {getInstallSnippet(selectedProject.id, selectedFramework)
                    ?.code || ""}
                </CodeBlock>
              </div>
            </SettingsItem>
          )}

          {Boolean(getCodeSnippet(selectedProject.id, selectedFramework)) && (
            <SettingsItem>
              <div className="flex flex-col gap-2 w-full">
                <p>
                  {
                    getCodeSnippet(selectedProject.id, selectedFramework)
                      ?.description
                  }
                </p>
                <CodeBlock
                  language={
                    getCodeSnippet(selectedProject.id, selectedFramework)
                      ?.language || "javascript"
                  }
                >
                  {getCodeSnippet(selectedProject.id, selectedFramework)
                    ?.code || ""}
                </CodeBlock>
              </div>
            </SettingsItem>
          )}

          {Boolean(getVerificationSteps(selectedFramework)) && (
            <SettingsItem>
              <div className="flex flex-col gap-2 w-full">
                <p>{String(getVerificationSteps(selectedFramework))}</p>
              </div>
            </SettingsItem>
          )}

          {Boolean(
            getTrackingSnippet(selectedProject.id, selectedFramework)
          ) && (
            <SettingsItem>
              <div className="flex flex-col gap-2 w-full">
                <p>
                  {
                    getTrackingSnippet(selectedProject.id, selectedFramework)
                      ?.description
                  }
                </p>
                <CodeBlock
                  language={
                    getTrackingSnippet(selectedProject.id, selectedFramework)
                      ?.language || "javascript"
                  }
                >
                  {getTrackingSnippet(selectedProject.id, selectedFramework)
                    ?.code || ""}
                </CodeBlock>
              </div>
            </SettingsItem>
          )}

          {Boolean(getFinishSteps(selectedFramework)) && (
            <SettingsItem>
              <div className="flex flex-col gap-2">
                <p className="font-medium">🎉 You're all set!</p>
                <p>{getFinishSteps(selectedFramework)}</p>
              </div>
            </SettingsItem>
          )}
        </div>
      </SettingsCard>
      <div className="h-[100px]"></div>
    </div>
  );
};
