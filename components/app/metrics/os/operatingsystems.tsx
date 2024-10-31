import "@/components/app/metrics/shared/card.css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OSUsage {
  os: string;
  percentage: number;
  count: number; // Add count to the OSUsage interface
}

const OperatingSystemCard = ({ activities }: { activities: string[] }) => {
  const [osUsage, setOsUsage] = useState<OSUsage[]>([]);
  useEffect(() => {
    const osCounts: { [key: string]: number } = {};

    activities.forEach((activity) => {
      let os = activity; // Access the OS from activities
      if (os) {
        // Convert Mac OS to macOS
        if (os.toLowerCase().includes("mac os")) {
          os = "macOS";
        }
        osCounts[os] = (osCounts[os] || 0) + 1;
      }
    });

    const totalActivities = activities.length; // Use activities.length directly
    const calculatedOsUsage = Object.entries(osCounts).map(([os, count]) => ({
      os,
      percentage: Number(((count / totalActivities) * 100).toFixed(1)),
      count, // Include the count
    }));

    // Sort by percentage in descending order
    const sortedOsUsage = calculatedOsUsage.sort(
      (a, b) => b.percentage - a.percentage
    );

    setOsUsage(sortedOsUsage);
  }, [activities]);

  return (
    <div className="metrics-card">
      <div className="metrics-card-header">
        <h4 style={{ color: "var(--secondary)", padding: "10px" }}>
          Operating Systems
        </h4>
        <p
          style={{
            color: "var(--subtitle)",
            padding: "10px",
            fontSize: "12px",
          }}
        >
          Users & Percentage
        </p>
      </div>
      <div className="metrics-card-content">
        {osUsage.length === 0 ? (
          <div
            style={{
              color: "var(--subtitle)",
              padding: "10px",
              fontSize: "12px",
              textAlign: "center",
              width: "100%",
            }}
          >
            No data. Yet.
          </div>
        ) : (
          osUsage.map((os) => (
            <div
              key={os.os}
              style={{
                display: "flex",
                alignItems: "center",
                maxWidth: "100%",
                minWidth: "100%",
                background: `linear-gradient(to right, var(--dominant) ${os.percentage}%, transparent ${os.percentage}%)`,
                gap: "10px",
                marginBottom:
                  osUsage.indexOf(os) === osUsage.length - 1 ? "0" : "4px",
                padding: "10px",
                borderRadius: "0px",
              }}
            >
              <Image
                src={`/images/os/${os.os.toLowerCase()}.png`}
                alt={`${os.os} logo`}
                width={20}
                height={20}
              />
              <p style={{ color: "var(--secondary)" }}>
                {os.os === "" ? "Unknown" : os.os}
              </p>
              <p style={{ color: "var(--secondary)", marginLeft: "auto" }}>
                {os.count} ({os.percentage}%)
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OperatingSystemCard;
