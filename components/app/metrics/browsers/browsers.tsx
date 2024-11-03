import Image from "next/image";
import React from "react";
import "../shared/card.css";

interface BrowserUsage {
  browser: string;
  percentage: number;
  count: number; // Add count to the BrowserUsage interface
}

const BrowsersCard = ({ activities }: { activities: string[] }) => {
  const [browserUsage, setBrowserUsage] = React.useState<BrowserUsage[]>([]);

  React.useEffect(() => {
    const browserCounts: { [key: string]: number } = {};

    activities.forEach((activity) => {
      let browser = activity; // Access the browser from activities

      if (browser) {
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;
      }
    });

    const totalActivities = activities.length; // Use activities.length directly
    const calculatedBrowserUsage = Object.entries(browserCounts).map(
      ([browser, count]) => ({
        browser,
        percentage: Number(((count / totalActivities) * 100).toFixed(1)),
        count, // Include the count
      })
    );

    // Sort by percentage in descending order
    const sortedBrowserUsage = calculatedBrowserUsage.sort(
      (a, b) => b.percentage - a.percentage
    );

    setBrowserUsage(sortedBrowserUsage);
  }, [activities]);

  return (
    <div className="metrics-card">
      <div className="metrics-card-header">
        <h4 style={{ color: "var(--secondary)", padding: "10px" }}>Browsers</h4>
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
        {browserUsage.length === 0 ? (
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
          browserUsage.map((browser) => (
            <div
              key={browser.browser}
              style={{
                display: "flex",
                alignItems: "center",
                maxWidth: "100%",
                minWidth: "100%",
                background: `linear-gradient(to right, var(--dominant) ${browser.percentage}%, transparent ${browser.percentage}%)`,
                gap: "10px",
                marginBottom:
                  browserUsage.indexOf(browser) === browserUsage.length - 1
                    ? "0"
                    : "4px",
                padding: "10px",
                borderRadius: "0px",
              }}
            >
              <Image
                src={`/images/browsers/${browser.browser
                  .toLowerCase()
                  .replace(" ", "")}.png`}
                alt={`${browser.browser} logo`}
                width={20}
                height={20}
              />

              <p
                style={{
                  color: "var(--secondary)",
                }}
              >
                {browser.browser.charAt(0).toUpperCase() +
                  browser.browser.slice(1)}
              </p>
              <p
                style={{
                  color: "var(--secondary)",
                  marginLeft: "auto",
                }}
              >
                {browser.count} ({browser.percentage}%){" "}
                {/* Display count and percentage */}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowsersCard;
