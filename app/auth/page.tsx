"use client";

import Button from "@/components/ui/button/button";
import "@/components/ui/input/input.css"; // Import your CSS file
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Message = ({
  message,
  type,
}: {
  message: string;
  type: "error" | "success";
}) => {
  return (
    <p
      style={{
        color: "var(--secondary )",
        textAlign: "center",
        fontSize: "12px",
      }}
    >
      {message}
    </p>
  );
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/");
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "var(--dominant)",
      }}
    >
      <div style={{ maxWidth: "300px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <p
              style={{
                color: "var(--secondary)",
                fontSize: "14px",
                textAlign: "start",
              }}
            >
              Welcome! Continue to Telemetric by signing in with Google.
            </p>
          </div>

          <Button
            onClick={() => {
              supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                  redirectTo: `${window.location.origin}/auth/callback`,
                },
              });
            }}
          >
            Continue with Google
          </Button>

          {message && <Message message={message.message} type={message.type} />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
