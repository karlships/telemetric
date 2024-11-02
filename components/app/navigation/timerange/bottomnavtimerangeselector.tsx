import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { addDays, format as dateFormat } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";

interface TimeRangeSelectorProps {
  onSelect: (range: string, startDate?: Date, endDate?: Date) => void;
  activities?: Array<{ timestamp: string }>;
}

const BottomNavTimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  onSelect,
  activities = [],
}) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [selectedRange, setSelectedRange] = React.useState<string>("last7days");

  const handlePresetChange = (value: string) => {
    const now = new Date();
    let startDate: Date;
    let endDate = new Date(now);

    switch (value) {
      case "today":
        startDate = new Date(now);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now);
        break;
      case "last48hours": {
        startDate = new Date(now);
        startDate.setTime(now.getTime() - 48 * 60 * 60 * 1000);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now);
        break;
      }
      case "last72hours":
        startDate = new Date(now);
        startDate.setTime(now.getTime() - 72 * 60 * 60 * 1000);
        break;
      case "last7days":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now);
        break;
      case "last30days":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 30);
        startDate.setHours(0, 0, 0, 0);
        break;
      case "last90days":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 90);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "lastYear":
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "allTime":
        if (activities.length > 0) {
          startDate = new Date(
            Math.min(
              ...activities.map((activity) =>
                new Date(activity.timestamp).getTime()
              )
            )
          );
        } else {
          startDate = new Date(0);
        }
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      default:
        return;
    }

    setSelectedRange(value);
    setDateRange({ from: startDate, to: endDate });
    onSelect(value, startDate, endDate);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const date = new Date(value);

    setDateRange((prev) => ({
      from: name === "start" ? date : prev?.from,
      to: name === "end" ? date : prev?.to,
    }));

    if (dateRange?.from && dateRange?.to) {
      setSelectedRange("custom");
      onSelect("custom", dateRange.from, dateRange.to);
    }
  };

  const formatDateRange = () => {
    if (!dateRange?.from) return "Pick a date range";

    if (selectedRange !== "custom") {
      return selectedRange
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()
        .replace(/^./, (str) => str.toUpperCase());
    }

    return `${dateFormat(dateRange.from, "MMM d, yyyy")} - ${
      dateRange.to ? dateFormat(dateRange.to, "MMM d, yyyy") : "..."
    }`;
  };

  return (
    <div className={cn("grid gap-2")}>
      <Drawer>
        <DrawerTrigger asChild>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Button
              variant="outline"
              style={{ width: "100%", maxWidth: "100%", }}
            >
              Select Time Range {formatDateRange()}
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full  p-4 space-y-4">
            <select
              onChange={(e) => handlePresetChange(e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="today">Today</option>
              <option value="last48hours">Last 48 Hours</option>
              <option value="last72hours">Last 72 Hours</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="lastYear">Last Year</option>
              <option value="allTime">All Time</option>
            </select>

            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="start"
                  value={dateRange?.from?.toISOString().split("T")[0]}
                  onChange={handleDateChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="end"
                  value={dateRange?.to?.toISOString().split("T")[0]}
                  onChange={handleDateChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <DrawerClose asChild>
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button
                    onClick={() => setDateRange(dateRange)}
                    className="flex-1"
                  >
                    Apply
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default BottomNavTimeRangeSelector;
