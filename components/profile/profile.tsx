import { logout } from "@/app/auth/actions";
import { createClient } from "@/utils/supabase/client";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Book, HelpCircle, LogOutIcon, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import "./profile.css";

export const Profile: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const supabase = createClient();
  const homePageRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);
  const xRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const githubIssueRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string | null>(null);

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
        window.open("mailto:support@untitledapps.at", "_blank");
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
      setUserId(user?.id || null);
      console.log(userId);
      if (user?.email) {
        setUserEmail(user.email);
      }
      if (user?.user_metadata?.name) {
        setUserName(user.user_metadata.name);
      }
    };

    fetchUserData();
  }, [supabase.auth]);
  return (
    <div className="flex justify-center items-center">
      <div className="profile-container-wrapper">
        <div className="profile-container">
          <div
            style={{
              border: "1px solid var(--outline)",
              borderRadius: "10px",
              overflow: "hidden",
              display: "flex",

              alignItems: "start",
              width: "100%",
              justifyContent: "start",
              backgroundColor: "var(--on-dominant)",
              flexDirection: "column",
              gap: "0px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "space-between",
                width: "100%",
                minWidth: "100%",
                maxWidth: "100%",
                maxHeight: "40px",
                justifyContent: "space-between",
              }}
            >
              <h4
                style={{
                  color: "var(--secondary)",
                  padding: "10px",
                }}
              >
                {userEmail}
              </h4>
              <p
                style={{
                  color: "var(--subtitle)",
                  padding: "10px",
                  fontSize: "12px",
                }}
              >
                {userName}
              </p>
            </div>
            <div
              style={{
                height: "1px",
                width: "100%",
                borderBottom: "1px solid var(--outline)",
              }}
            ></div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0px",
              }}
            >
              <div className="profile-container-wrapper-item">
                <p>I need help!</p>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button>
                      <HelpCircle />
                      Get support
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem ref={xRef}>DM on X</DropdownMenuItem>
                    <DropdownMenuItem ref={githubRef}>Github</DropdownMenuItem>
                    <DropdownMenuItem ref={emailRef}>Email</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="profile-container-wrapper-item">
                <p>Docs</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open("https://telemetric.app/docs", "_blank");
                  }}
                >
                  <Book />
                  View docs
                </Button>
              </div>
              <div className="profile-container-wrapper-item">
                <p>Github Repo - Contribute</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(
                      "https://github.com/untitledapps/telemetric",
                      "_blank"
                    );
                  }}
                >
                  <GitHubLogoIcon />
                  Github Repo
                </Button>
              </div>
              <div className="profile-container-wrapper-item">
                <p>Follow the Creator on X</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open("https://x.com/CarlosDev33", "_blank");
                  }}
                >
                  <TwitterLogoIcon />
                  Follow Creator
                </Button>
              </div>
              <div className="profile-container-wrapper-item">
                <p>Sign out</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                  }}
                >
                  <LogOutIcon />
                  Sign out
                </Button>
              </div>
              <div className="profile-container-wrapper-item">
                <p>Delete Account</p>
                <Button
                  variant="destructive"
                  onClick={() => {
                    window.open(
                      "mailto:support@untitledapps.at?subject=Account%20Deletion%20Request&body=Hello%2C%0A%0AI%20would%20like%20to%20request%20the%20deletion%20of%20my%20Telemetric%20account.%0A%0AReason%20for%20deletion%3A%0A%0A%0AThank%20you",
                      "_blank"
                    );
                  }}
                >
                  <Trash2Icon />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
