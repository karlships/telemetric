import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format as dateFormat } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";

interface TimeRangeSelectorProps {
  onSelect: (range: string, startDate?: Date, endDate?: Date) => void;
  activities?: Array<{ timestamp: string }>;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
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

  const handleRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      setSelectedRange("custom");
      onSelect("custom", range.from, range.to);
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{formatDateRange()}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-auto flex-col space-y-2 p-2"
          align="start"
        >
          <Select onValueChange={handlePresetChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a preset" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last48hours">Last 48 Hours</SelectItem>
              <SelectItem value="last72hours">Last 72 Hours</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last90days">Last 90 Days</SelectItem>
              <SelectItem value="lastYear">Last Year</SelectItem>
              <SelectItem value="allTime">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleRangeSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeRangeSelector;
