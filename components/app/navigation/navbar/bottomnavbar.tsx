import BottomNavTimeRangeSelector from "../timerange/bottomnavtimerangeselector";
import "./bottomnavbar.css";
interface HeaderProps {
  loading: boolean;

  handleTimeRangeSelect: (
    range: string,
    startDate?: Date,
    endDate?: Date
  ) => void;
}

export function BottomNavbar({ handleTimeRangeSelect }: HeaderProps) {
  return (
    <header className="bottomnavbar">
      <BottomNavTimeRangeSelector onSelect={handleTimeRangeSelect} />
    </header>
  );
}
