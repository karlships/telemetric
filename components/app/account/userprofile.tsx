"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useRef, useState } from "react";

export function UserProfile({
  setSelectedContent,
}: {
  setSelectedContent: (content: string) => void;
}) {
  const [initials, setInitials] = useState<string>("");
  const supabase = createClient();
  const [user, setUser] = useState<any | null>(null);
  const [pfpImageUrl, setPfpImageUrl] = useState<string | null>(null);
  const homePageRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);
  const xRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const githubIssueRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (
        homePageRef.current &&
        homePageRef.current.contains(event.target as Node)
      ) {
        window.open("/homepage", "_blank");
      }
      if (
        githubRef.current &&
        githubRef.current.contains(event.target as Node)
      ) {
        window.open("https://github.com/untitledapps/telemetric", "_blank");
      }
      if (emailRef.current && emailRef.current.contains(event.target as Node)) {
        window.open("mailto:team@untitledapps.net", "_blank");
      }
      if (xRef.current && xRef.current.contains(event.target as Node)) {
        window.open(
          "https://x.com/messages/compose?recipient_id=1680911613988073473",
          "_blank"
        );
      }
      if (
        githubIssueRef.current &&
        githubIssueRef.current.contains(event.target as Node)
      ) {
        window.open(
          "https://github.com/untitledapps/telemetric/issues",
          "_blank"
        );
      }
      if (docsRef.current && docsRef.current.contains(event.target as Node)) {
        window.open("https://telemetric.app/docs", "_blank");
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.avatar_url) {
        setPfpImageUrl(user.user_metadata.avatar_url);
      }
    };

    fetchUserData();
  }, [supabase.auth]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={() => setSelectedContent("profile")}
          >
            <AvatarImage src={pfpImageUrl || ""} alt="User Avatar" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>Help, Account & more</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
