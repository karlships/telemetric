import Image from "next/image";
import React from "react";
import "../shared/card.css";

interface ReferrerUsage {
  referrer: string;
  percentage: number;
  count: number; // Add count to the ReferrerUsage interface
}

const ReferrersCard = ({ referrers }: { referrers: string[] }) => {
  const [referrerUsage, setReferrerUsage] = React.useState<ReferrerUsage[]>([]);

  React.useEffect(() => {
    const referrerCounts: { [key: string]: number } = {};

    // Count occurrences of each referrer
    referrers.forEach((referrer) => {
      referrerCounts[referrer] = (referrerCounts[referrer] || 0) + 1;
    });

    const totalReferrers = referrers.length; // Total number of referrers

    // Prepare the referrer usage data
    const calculatedReferrerUsage = Object.entries(referrerCounts).map(
      ([referrer, count]) => ({
        referrer: referrer === "" ? "Unknown" : referrer,
        percentage: Number(((count / totalReferrers) * 100).toFixed(1)),
        count, // Include the count
      })
    );

    // Sort by percentage in descending order
    const sortedReferrerUsage = calculatedReferrerUsage.sort(
      (a, b) => b.percentage - a.percentage
    );

    setReferrerUsage(sortedReferrerUsage);
  }, [referrers]);

  return (
    <div className="metrics-card">
      <div className="metrics-card-header">
        <h4 style={{ color: "var(--secondary)", padding: "10px" }}>
          Referrers
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
        {referrerUsage.length === 0 ? (
          <div
            style={{
              color: "var(--subtitle)",
              padding: "10px",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            No data. Yet.
          </div>
        ) : (
          referrerUsage.map((referrer) => (
            <a
              key={referrer.referrer} // Add the key prop here
              href={
                referrer.referrer !== "Unknown"
                  ? `${referrer.referrer}`
                  : undefined
              }
              target={referrer.referrer !== "Unknown" ? "_blank" : undefined}
              rel={
                referrer.referrer !== "Unknown"
                  ? "noopener noreferrer"
                  : undefined
              }
              style={{
                textDecoration: "none",
                width: "100%",
                cursor:
                  referrer.referrer !== "Unknown" ? "pointer" : "not-allowed",
              }}
            >
              <div
                key={referrer.referrer}
                style={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: "100%",
                  minWidth: "100%",
                  background: `linear-gradient(to right, var(--dominant) ${referrer.percentage}%, transparent ${referrer.percentage}%)`,
                  gap: "10px",
                  marginBottom:
                    referrerUsage.indexOf(referrer) === referrerUsage.length - 1
                      ? "0"
                      : "4px",
                  padding: "10px",
                  borderRadius: "0px",
                }}
              >
                <Image
                  src={`https://www.google.com/s2/favicons?domain=${referrer.referrer}&sz=256`}
                  alt={`${referrer.referrer} favicon`}
                  width={20}
                  height={20}
                />
                <p
                  style={{
                    color: "var(--secondary)",
                  }}
                >
                  {referrer.referrer}
                </p>

                <p
                  style={{
                    color: "var(--secondary)",
                    marginLeft: "auto",
                  }}
                >
                  {referrer.count} ({referrer.percentage}%){" "}
                  {/* Display count and percentage */}
                </p>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default ReferrersCard;
