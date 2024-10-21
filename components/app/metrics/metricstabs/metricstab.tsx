import React, { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { DataType } from "@/types/index";
import Chart from "../charts/chart";
import "./metricstab.css";
interface Tab {
  label: string;
  activities: any[];
  count: string;
  dataType: DataType;
}

interface TabsProps {
  tabs: Tab[];
  activeTabIndex?: number;
  onSelectedTabChanged?: (index: number) => void;
  selectedTimeRange: string;
  loading: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabIndex = 0,
  onSelectedTabChanged,
  selectedTimeRange,
  loading,
}) => {
  const [activeIndex, setActiveIndex] = useState(activeTabIndex);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab ${activeIndex === index ? "active" : ""}`}
            onClick={() => {
              handleTabClick(index);
              if (onSelectedTabChanged) {
                onSelectedTabChanged(index);
              }
            }}
          >
            {tab.label}
            {loading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-20 " />
              </div>
            ) : (
              <p
                style={{
                  fontSize: "35px",
                  fontWeight: "600",
                }}
              >
                {tab.count}
              </p>
            )}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <Chart
          activities={tabs[activeIndex].activities}
          selectedTimeRange={selectedTimeRange}
          dataType={tabs[activeIndex].dataType}
        />
      </div>
    </div>
  );
};

export default Tabs;
