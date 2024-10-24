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
interface MetricsProps {
  selectedProject: Project;
  projects: Project[];
  selectedTimeRange: string;
  loading: boolean;
}

const Metrics: React.FC<MetricsProps> = ({
  selectedProject,
  projects,
  selectedTimeRange,
  loading,
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

      const uniqueUserIds = new Set();
      const uniqueActivities = selectedProject.activities.filter((activity) => {
        setSessionsData(selectedProject.activities);
        if (!uniqueUserIds.has(activity.user_id)) {
          uniqueUserIds.add(activity.user_id);
          return true;
        }
        return false;
      });
      setUniqueActivitiesArray(uniqueActivities);

      setRevenueData(selectedProject.revenue);
      setEventsData(selectedProject.events);
      // This code calculates the total revenue for the selected project
      // It does this by:
      // 1. Using the reduce method on the selectedProject.revenue array
      // 2. For each revenue item, it parses the 'total' string to a float
      // 3. Adds this parsed float to the running total
      // 4. Starts with an initial value of 0
      // 5. Finally, sets the calculated total to the revenueTotal state
      const totalInDollars = selectedProject.revenue.reduce(
        (total, revenue) => total + parseFloat(revenue.total) / 100,
        0
      );
      setRevenueTotal(totalInDollars);

      updateCurrentUserData(currentSelectTabIndex, selectedProject);
    }
  }, [selectedProject, currentSelectTabIndex]);

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
