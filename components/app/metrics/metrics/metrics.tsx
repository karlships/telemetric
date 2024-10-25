import { Activity, Event, Project, Revenue, User } from "@/types/index";

import React, { useEffect, useState } from "react";
import EventsCard from "../events/events";

import { DataType } from "@/types/index";
import LocationsCard from "../locations/locationscard";
import Tabs from "../metricstabs/metricstab";
import OperatingSystemCard from "../os/operatingsystems";
import BrowserCard from "../browsers/browsers";
import VersionsCard from "../version/versions";
import "./metrics.css";
import Chart from "../charts/chart";

interface MetricsProps {
  selectedProject: Project;
  projects: Project[];
  selectedTimeRange: string;
  loading: boolean;
  startDate?: Date;
  endDate?: Date;
}

const Metrics: React.FC<MetricsProps> = ({
  selectedProject,
  projects,
  selectedTimeRange,
  loading,
  startDate,
  endDate,
}) => {
  const [uniqueActivitiesArray, setUniqueActivitiesArray] = useState<
    Activity[]
  >([]);
  const [currentUserData, setCurrentUserData] = useState<User[]>([]);
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);
  const [revenueTotal, setRevenueTotal] = useState<number>(0);
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [sessionsData, setSessionsData] = useState<Activity[]>([]);
  const [currentSelectTabIndex, setCurrentSelectTabIndex] = useState<number>(0);

  useEffect(() => {
    if (selectedProject) {
      const uniqueUserSet = new Set();
      console.log("selectedProject", selectedProject);

      // Filter activities
      const filteredActivities = selectedProject.activities.filter(
        (activity) => {
          return isWithinSelectedTimeRange(
            activity.timestamp,
            selectedTimeRange,
            startDate,
            endDate
          );
        }
      );

      // Get unique activities
      const uniqueActivities = filteredActivities.filter((activity) => {
        if (!uniqueUserSet.has(activity.user_id)) {
          uniqueUserSet.add(activity.user_id);
          return true;
        }
        return false;
      });
      setUniqueActivitiesArray(uniqueActivities);
      setSessionsData(filteredActivities);

      // Filter revenue
      const filteredRevenue = selectedProject.revenue.filter((revenue) => {
        return isWithinSelectedTimeRange(
          revenue.timestamp,
          selectedTimeRange,
          startDate,
          endDate
        );
      });
      setRevenueData(filteredRevenue);

      // Calculate total revenue
      const totalInDollars = filteredRevenue.reduce(
        (total, revenue) => total + parseFloat(revenue.total) / 100,
        0
      );
      const roundedTotalInDollars = Math.ceil(totalInDollars);
      setRevenueTotal(roundedTotalInDollars);

      // Filter events
      const filteredEvents = selectedProject.events.filter((event) => {
        return isWithinSelectedTimeRange(
          event.timestamp,
          selectedTimeRange,
          startDate,
          endDate
        );
      });
      setEventsData(filteredEvents);

      // Update current user data
      updateCurrentUserData(currentSelectTabIndex, {
        ...selectedProject,
        activities: filteredActivities,
        revenue: filteredRevenue,
        events: filteredEvents,
      });
    }
  }, [
    selectedProject,
    currentSelectTabIndex,
    selectedTimeRange,
    startDate,
    endDate,
  ]);

  const isWithinSelectedTimeRange = (
    timestamp: string,
    range: string,
    rangeStartDate?: Date,
    rangeEndDate?: Date
  ): boolean => {
    const date = new Date(timestamp);

    // Always use the provided date range for filtering
    if (rangeStartDate && rangeEndDate) {
      // Set the hours to ensure full day coverage
      const startDate = new Date(rangeStartDate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(rangeEndDate);
      endDate.setHours(23, 59, 59, 999);

      return date >= startDate && date <= endDate;
    }

    // Fallback to true if no date range provided
    return true;
  };

  const updateCurrentUserData = (tabIndex: number, project: Project) => {
    if (tabIndex === 0) {
      setCurrentUserData(
        uniqueActivitiesArray.map((activity) => ({
          browser: activity.browser,
          os: activity.os,
          location: activity.location,
          version: activity.version,
          referrer: activity.referrer,
        }))
      );
    } else if (tabIndex === 1) {
      setCurrentUserData(
        project.revenue.map((revenue) => ({
          browser: revenue.browser,
          os: revenue.os,
          location: revenue.location,
          version: revenue.version,
          referrer: revenue.referrer,
        }))
      );
    } else if (tabIndex === 2) {
      setCurrentUserData(
        project.events.map((event) => ({
          browser: event.browser,
          os: event.os,
          location: event.location,
          version: event.version,
          referrer: event.referrer,
        }))
      );
    } else if (tabIndex === 3) {
      setCurrentUserData(
        sessionsData.map((session) => ({
          browser: session.browser,
          os: session.os,
          location: session.location,
          version: session.version,
          referrer: session.referrer,
        }))
      );
    }
  };

  const handleTabChange = (index: number) => {
    setCurrentSelectTabIndex(index);
  };

  const tabs = [
    {
      label: "Unique Visitors",
      activities: uniqueActivitiesArray,
      count: uniqueActivitiesArray.length.toString(),
      dataType: DataType.USERS,
    },
    {
      label: "Revenue",
      activities: revenueData,
      count: revenueTotal + "€",
      dataType: DataType.REVENUE,
    },
    {
      label: "Events",
      activities: eventsData,
      count: eventsData.length.toString(),
      dataType: DataType.EVENTS,
    },
    {
      label: "Sessions",
      activities: sessionsData,
      count: sessionsData.length.toString(),
      dataType: DataType.SESSIONS,
    },
  ];

  const osData = tabs[currentSelectTabIndex].activities.map(
    (activity) => activity.os
  );
  const browserData = tabs[currentSelectTabIndex].activities.map(
    (activity) => activity.browser
  );
  const locationData = tabs[currentSelectTabIndex].activities.map(
    (activity) => activity.location
  );
  const versionData = tabs[currentSelectTabIndex].activities.map(
    (activity) => activity.version
  );
  const referrerData = tabs[currentSelectTabIndex].activities.map(
    (activity) => activity.referrer
  );

  return (
    <div className="flex justify-center items-center">
      <div className="metrics-container-wrapper">
        <div className="metrics-container">
          <Tabs
            loading={loading}
            tabs={tabs}
            onSelectedTabChanged={handleTabChange}
            selectedTimeRange={selectedTimeRange}
            startDate={startDate}
            endDate={endDate}
  
          />

          {currentSelectTabIndex === 2 && (
            <div className="metrics-container-item">
              <EventsCard
                events={eventsData.map((event) => event.name)}
                users={uniqueActivitiesArray.map((activity) => activity.id)}
              />
            </div>
          )}

          <div className="metrics-container-item">
            <OperatingSystemCard activities={osData} />
          </div>
          <div className="metrics-container-item">
            <BrowserCard activities={browserData} />
          </div>
          <div style={{ width: "fill", maxWidth: "100%" }}>
            <LocationsCard locationsPassed={locationData} />
          </div>

          <div className="metrics-container-item-2">
            <VersionsCard versions={versionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
