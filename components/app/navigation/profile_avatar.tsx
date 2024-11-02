"use client";

import { useUser } from "@/components/providers/UserProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export function UserProfile({
  setSelectedContent,
}: {
  setSelectedContent: (content: string) => void;
}) {
  const { user } = useUser();
  const [initials, setInitials] = useState<string>("");
  const pfpImageUrl = user?.user_metadata?.avatar_url;

  useEffect(() => {
    if (user?.email) {
      const emailInitials = user.email
        .split("@")[0]
        .split(".")
        .map((name: string) => name[0])
        .join("")
        .toUpperCase();
      setInitials(emailInitials);
    }
  }, [user]);

  return (
    <div
      role="button"
      tabIndex={0}
      className="cursor-pointer"
      onClick={() => setSelectedContent("profile")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setSelectedContent("profile");
        }
      }}
    >
      <Avatar style={{ width: "30px", height: "30px" }}>
        <AvatarImage src={pfpImageUrl || ""} alt="User Avatar" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
