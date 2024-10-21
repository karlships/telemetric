import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-spin rounded-full border-t-2 border-b-2 border-gray-900",
          {
            "h-4 w-4 border-2": size === "sm",
            "h-8 w-8 border-[3px]": size === "md",
            "h-12 w-12 border-4": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };
