"use client";

import { Project, SelectedNavItem } from "@/types/index";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  User,
  CreditCard,
  Settings,
  Keyboard,
  Users,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  Github,
  LifeBuoy,
  LogOut,
  Link,
  HelpCircle,
  Book,
} from "lucide-react";
import { logout } from "@/app/auth/actions";

export function UserProfile() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
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
      setUser(user);
    };

    fetchUserData();
  }, [supabase.auth]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar style={{ width: "30px", height: "30px", cursor: "pointer" }}>
          <AvatarImage src={pfpImageUrl || ""} alt="User Avatar" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel
          style={{ fontSize: "14px", fontWeight: "bold", paddingBottom: "0px" }}
        >
          {user?.user_metadata?.name}
        </DropdownMenuLabel>
        <DropdownMenuLabel
          style={{
            fontSize: "12px",
            color: "var(--subtitle)",
            paddingTop: "0px",
          }}
        >
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <HelpCircle size={16} />
              <div style={{ marginLeft: "10px" }}></div>
              <span>Support</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem ref={githubIssueRef}>
                  <Github />
                  <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem ref={emailRef}>
                  <Mail />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem ref={xRef}>
                  <MessageSquare />
                  <span>DM me on X</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem ref={docsRef}>
          <Book />
          <span>Docs</span>
        </DropdownMenuItem>

        <DropdownMenuItem ref={githubRef}>
          <Github />
          <span>GitHub Repo</span>
        </DropdownMenuItem>
        <DropdownMenuItem ref={homePageRef}>
          <Link />
          <span>Homepage</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User style={{ color: "red" }} />
          <span style={{ color: "red" }}>Delete Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
