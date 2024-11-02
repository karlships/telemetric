import { cn } from "@/lib/utils";
import "@/styles/global/settingscard.css";

interface SettingsCardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

interface SettingsCardProps {
  header?: SettingsCardHeaderProps;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const SettingsCardHeader: React.FC<SettingsCardHeaderProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <>
      <div className={cn("settings-card-header", className)}>
        <h4 className="settings-card-title">{title}</h4>
        {subtitle && <p className="settings-card-subtitle">{subtitle}</p>}
      </div>
      <div className="settings-card-divider" />
    </>
  );
};

export const SettingsCard: React.FC<SettingsCardProps> = ({
  header,
  action,
  children,
}) => {
  return (
    <div className="settings-card-wrapper">
      <div className="settings-card-container">
        <div className="settings-card">
          {header && <SettingsCardHeader {...header} />}
          <div className="settings-card-content">{children}</div>
          {action && (
            <>
              <div className="settings-card-action">{action}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const SettingsItem: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="settings-card-item">{children}</div>;
};
