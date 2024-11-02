import { logout } from "@/app/auth/actions";
import { useUser } from "@/components/providers/UserProvider";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { LogOutIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { SettingsCard, SettingsItem } from "../ui/settings-card";
import "./profile.css";

export const Profile: React.FC = () => {
  const { user } = useUser();

  return (
    <SettingsCard
      header={{
        title: user?.email || "Profile",
        subtitle: user?.user_metadata?.name,
      }}
    >
      <SettingsItem>
        <p>Github Repo - Contribute</p>
        <Button
          variant="outline"
          onClick={() =>
            window.open("https://github.com/untitledapps/telemetric", "_blank")
          }
        >
          <GitHubLogoIcon />
          Github Repo
        </Button>
      </SettingsItem>
      <SettingsItem>
        <p>Follow the Creator on X</p>
        <Button
          variant="outline"
          onClick={() => window.open("https://x.com/CarlosDev33", "_blank")}
        >
          <TwitterLogoIcon />
          Follow Creator
        </Button>
      </SettingsItem>
      <SettingsItem>
        <p>Sign out</p>
        <Button variant="outline" onClick={() => logout()}>
          <LogOutIcon />
          Sign out
        </Button>
      </SettingsItem>
      <SettingsItem>
        <p>Delete Account</p>
        <Button
          variant="destructive"
          onClick={() =>
            window.open(
              "mailto:support@untitledapps.at?subject=Account%20Deletion%20Request&body=Hello%2C%0A%0AI%20would%20like%20to%20request%20the%20deletion%20of%20my%20Telemetric%20account.%0A%0AReason%20for%20deletion%3A%0A%0A%0AThank%20you",
              "_blank"
            )
          }
        >
          <Trash2Icon />
          Delete Account
        </Button>
      </SettingsItem>
    </SettingsCard>
  );
};
