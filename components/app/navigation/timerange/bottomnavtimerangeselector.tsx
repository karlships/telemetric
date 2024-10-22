import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";

interface TimeRangeSelectorProps {
  onSelect: (range: string, startDate?: Date, endDate?: Date) => void;
}

const BottomNavTimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  onSelect,
}) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [singleDate, setSingleDate] = React.useState<Date>();
  const [selectedRange, setSelectedRange] = React.useState<string>("last7days");

  const handlePresetChange = (value: string) => {
    const now = new Date();
    let startDate: Date;

    switch (value) {
      case "today":
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case "yesterday":
        startDate = new Date(now.setDate(now.getDate() - 1));
        startDate.setHours(0, 0, 0, 0);
        break;
      case "last72hours":
        startDate = new Date(now.setHours(now.getHours() - 72));
        break;
      case "last7days":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "last30days":
        startDate = new Date(now.setDate(now.getDate() - 30));
        break;
      case "last90days":
        startDate = new Date(now.setDate(now.getDate() - 90));
        break;
      case "lastYear":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case "allTime":
        startDate = new Date(0); // Start from epoch
        break;
      default:
        return;
    }

    setSelectedRange(value);
    onSelect(value, startDate, new Date()); // Call onSelect with the selected range
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      onSelect("custom", range.from, range.to); // Call onSelect with the custom range
    }
  };

  return (
    <div className={cn("grid gap-2")}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Select Time Range</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div
            className="mx-auto w-full max-w-sm"
            style={{
              padding: "10px",
            }}
          >
            <Select onValueChange={handlePresetChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a preset" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
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
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default BottomNavTimeRangeSelector;
