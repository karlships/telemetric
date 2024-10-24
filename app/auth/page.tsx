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
  const [email, setEmail] = useState(""); // {{ edit_1 }}
  const [password, setPassword] = useState(""); // {{ edit_2 }}
  const [isLoading, setIsLoading] = useState(false); // {{ edit_3 }}
  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null); // {{ edit_4 }}
  const [isCodeSent, setIsCodeSent] = useState(false); // New state for OTP flow
  const [otp, setOtp] = useState(""); // New state for OTP input
  const supabase = createClient();
  const router = useRouter();

  // Use useEffect to check auth status when component mounts
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

  const sendOtpToEmail = async () => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    });

    setIsCodeSent(true);
    setIsLoading(false);
  };

  const handleVerifyCode = async (value: string) => {
    setMessage({
      message: "Verifying code...",
      type: "success",
    });
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: value,
      type: "email",
    });

    if (error) {
      setMessage({
        message:
          "This ain't the code we're looking for. Try again." +
          " " +
          error.message,
        type: "error",
      });
      setOtp(""); // Clear the OTP input
      // Set focus back to the first input after 10ms
      setTimeout(() => {
        setOtp(""); // Clear the OTP input
      }, 10);
    } else {
      setMessage({
        message: "Signing in...",
        type: "success",
      });
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      if (userId) {
        const { data: existingUser, error: fetchError } = await supabase
          .from("customers")
          .select()
          .eq("id", userId)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") {
          console.error("Error fetching user data:", fetchError);
          setMessage({
            message: "Something went wrong. Please try again.",
            type: "error",
          });
        } else if (!existingUser) {
          const { error: insertError } = await supabase
            .from("users")
            .insert({ id: userId });

          if (insertError) {
            console.error("Error inserting user data:", insertError);
            setMessage({
              message: "Something went wrong. Please try again.",
              type: "error",
            });
          } else {
            setMessage({
              message: "Signing in...",
              type: "success",
            });
            router.push("/");
          }
        } else {
          setMessage({
            message: "Signing in...",
            type: "success",
          });
          router.push("/");
        }
      } else {
        setMessage({
          message: "User ID not found. Please try again.",
          type: "error",
        });
      }
    }
    setIsLoading(false);
  };

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
              {isCodeSent
                ? "Code has been sent! Give it a few minutes to arrive and then enter the code you received down below. It might land in your spam folder."
                : "Welcome! Enter your email and we'll send you a code to login."}
            </p>
          </div>
          <Button
            onClick={() => {
              supabase.auth.signInWithOAuth({
                provider: "twitter",
                options: {
                  redirectTo: `${window.location.origin}/auth/callback`,
                },
              });
            }}
          >
            Continue with X
          </Button>
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
