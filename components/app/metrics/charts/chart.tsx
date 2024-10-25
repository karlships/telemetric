import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DataType } from "@/types/index";

interface Activity {
  timestamp: string; // Assuming the timestamp is in timestampz format
}

interface AggregatedData {
  name: string; // Date label (e.g., "2023-10-01")
  users: number; // Count of users for that day
}

interface ChartProps {
  activities: Activity[];
  selectedTimeRange: string;
  dataType: DataType;
  startDate?: Date;
  endDate?: Date;
}

const Chart: React.FC<ChartProps> = ({
  activities,
  selectedTimeRange,
  dataType,
  startDate,
  endDate,
}) => {
  // Create default dates if not provided
  const effectiveStartDate = startDate || new Date(0);
  const effectiveEndDate = endDate || new Date();

  // Filter activities using the effective dates
  const filteredActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.timestamp);
    return (
      activityDate >= effectiveStartDate && activityDate <= effectiveEndDate
    );
  });

  // Transform activities into the format required by the chart
  const data = filteredActivities.map((activity) => ({
    name: new Date(activity.timestamp).toISOString().split("T")[0],
    users: 1,
  }));

  // Aggregate users by date
  const aggregatedData: AggregatedData[] = data.reduce(
    (acc: AggregatedData[], curr) => {
      const existingEntry = acc.find((item) => item.name === curr.name);
      if (existingEntry) {
        existingEntry.users += curr.users; // Increment user count
      } else {
        acc.push({ name: curr.name, users: curr.users }); // Push new entry
      }
      return acc;
    },
    []
  );

  // Create a complete date range for the selected time range
  const completeData: AggregatedData[] = [];
  const totalDays =
    Math.ceil(
      (effectiveEndDate.getTime() - effectiveStartDate.getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1; // Include end date
  for (let i = 0; i < totalDays; i++) {
    const date = new Date(effectiveStartDate);
    date.setDate(effectiveStartDate.getDate() + i);
    const dateString = date.toISOString().split("T")[0];
    const usersCount =
      aggregatedData.find((item) => item.name === dateString)?.users || 0;
    completeData.push({ name: dateString, users: usersCount });
  }

  // Sort the complete data by date
  completeData.sort(
    (a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()
  );

  const formatXAxisLabel = (label: string) => {
    const [datePart, hourPart] = label.split(" "); // Split into date and hour
    const date = new Date(`${datePart}T00:00:00`); // Create a date object
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    }; // Define formatting options
    return date.toLocaleDateString("en-US", options); // Format the date
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={completeData}
        margin={{ top: 20, right: 20, bottom: 0, left: -30 }}
      >
        <CartesianGrid
          strokeDasharray="0"
          stroke="var(--subtitle)"
          strokeOpacity={0.1}
          vertical={false}
          horizontal={true}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--unselected)", fontSize: 12 }}
          domain={["dataMin", "dataMax"]} // Adjust domain for hours
          type="category" // Ensure this is set to "category" for hour display
          tickFormatter={formatXAxisLabel} // Use the custom formatter
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--unselected)", fontSize: 12 }}
        />
        <Tooltip
          content={({ payload, label }) => {
            if (payload && payload.length > 0) {
              const date = new Date(label.split(" ")[0]); // Get the date part
              const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              });
              const daysAgo = Math.floor(
                (new Date().getTime() - date.getTime()) / (1000 * 3600 * 24)
              );
              const daysAgoText =
                daysAgo === 0
                  ? "Today"
                  : daysAgo === 1
                  ? "Yesterday"
                  : `${daysAgo} days ago`;
              return (
                <div
                  style={{
                    backgroundColor: "var(--dominant)",
                    padding: "10px",
                    border: "1px solid var(--subtitle)",
                  }}
                >
                  <p style={{ color: "var(--subtitle)" }}>
                    {formattedDate} ({daysAgoText})
                  </p>
                  <p style={{ color: "var(--secondary)" }}>
                    {dataType === DataType.USERS
                      ? `Users: ${payload[0].value}`
                      : dataType === DataType.REVENUE
                      ? `Revenue: $${payload[0].value}`
                      : `Events: ${payload[0].value}`}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#0057FF"
          strokeWidth={2}
          dot={false}
        />
        <Area
          type="linear"
          dataKey="users"
          strokeWidth={2}
          stroke="#0057FF"
          fill="url(#colorGradient)"
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0057FF" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#0057FF" stopOpacity={0.5} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
