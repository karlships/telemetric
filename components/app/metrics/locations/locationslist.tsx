// Mapping of country names to country code

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { useEffect, useState } from "react";

const LocationsList = ({
  locations,
  countryCodes,
}: {
  locations: string[];
  countryCodes?: { [key: string]: string };
}) => {
  const [sortedLocations, setSortedLocations] = useState<string[]>([]);
  const [locationCounts, setLocationCounts] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    // Count occurrences of each location
    const counts: { [key: string]: number } = {};
    locations.forEach((location) => {
      counts[location] = (counts[location] || 0) + 1;
    });

    // Sort locations by count in descending order
    const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

    setSortedLocations(sorted);
    setLocationCounts(counts);
  }, [locations]);

  return (
    <div
      style={{
        overflow: "auto",
        width: "100%",
        overflowY: "scroll",
        maxHeight: "100%",
        height: "100%",
      }}
    >
      {sortedLocations.length > 0 ? (
        sortedLocations.map((location) => {
          const uniqueKey = location; // Use location as the unique key
          const countryCode = countryCodes ? countryCodes[location] : undefined;

          return (
            <a
              href={`https://www.google.com/maps/place/${encodeURIComponent(
                location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              key={uniqueKey}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",

                background: `linear-gradient(to right, var(--dominant) ${(
                  (locationCounts[location] / locations.length) *
                  100
                ).toFixed(1)}%, transparent ${(
                  (locationCounts[location] / locations.length) *
                  100
                ).toFixed(1)}%)`, // Adjust gradient based on percentage
                gap: "10px",
                marginBottom: "4px",
                padding: "10px",
                borderRadius: "0px",
              }}
            >
              {countryCode && (
                <Image
                  src={`/images/countries/${countryCode}.svg`}
                  alt={`${countryCode} flag`}
                  width={25}
                  style={{
                    borderRadius: "4px",
                  }}
                  height={20}
                />
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p style={{ color: "var(--secondary)" }}>{location}</p>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>View on Google Maps</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <p
                style={{
                  color: "var(--secondary)",
                  marginLeft: "auto",
                }}
              >
                {locationCounts[location]} (
                {((locationCounts[location] / locations.length) * 100).toFixed(
                  1
                )}
                %) {/* Display count and percentage */}
              </p>
            </a>
          );
        })
      ) : (
        <div
          style={{
            color: "var(--subtitle)",
            padding: "10px",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          No data. Yet.
        </div> // Fallback message
      )}
    </div>
  );
};

export default LocationsList;
