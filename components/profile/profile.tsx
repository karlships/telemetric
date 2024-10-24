import { useState, useEffect, useRef } from "react";
import { UserProfile } from "../app/account/userprofile";
import { logout } from "@/app/auth/actions";
import { createClient } from "@/utils/supabase/client";
import { Button } from "../ui/button";

export const Profile: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const supabase = createClient();
  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
                gap: "10px",
              }}
            >
              <div className="profile-container-wrapper-item">
                <p>Support</p>
                <Button>Contact Support</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
