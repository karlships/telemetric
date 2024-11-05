"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

export function HelpButton() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="rounded-full h-10 w-10 flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            <QuestionMarkCircledIcon className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top">
          <DropdownMenuItem
            onClick={() =>
              window.open(
                "https://github.com/karlships/telemetric/wiki",
                "_blank"
              )
            }
          >
            Documentation
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => window.open("https://x.com/karlships", "_blank")}
          >
            DM on X
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              window.open("https://github.com/karlships/telemetric", "_blank")
            }
          >
            Github Issues
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
