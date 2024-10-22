"use client";
import { useEffect, useState, useRef } from "react";

import { Project } from "@/types/index";

import Metrics from "./metrics/metrics/metrics";

import { createClient } from "@/utils/supabase/client";
import { BottomNavbar } from "./navigation/navbar/bottomnavbar";
import { Navbar } from "./navigation/navbar/navbar";
import { useSearchParams } from "next/navigation";

export function Dashboard() {
  const supabase = createClient();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<string>("last7days");

  const handleTimeRangeSelect = async (
    range: string,
    startDate?: Date,
    endDate?: Date
  ) => {
    setTimeRange(range);
  };

  const hasFetchedProjects = useRef(false);

  useEffect(() => {
    setSelectedProject(projects[0]);
    const fetchProjects = async () => {
      if (hasFetchedProjects.current) return;
      hasFetchedProjects.current = true;
      setLoading(true);
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      // Check if projects exist in local storage
      const storedProjects = localStorage.getItem("projects");

      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);
        console.log(parsedProjects);
        for (const project of parsedProjects) {
          if (!projects.some((p) => p.id === project.id)) {
            fetchProjectData(project.id);
          }
        }
        setLoading(false);
      } else {
        const { data, error } = await supabase
          .from("customers")
          .select("projects")
          .eq("id", userData?.user?.id)
          .single();
        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }

        // Store projects in local storage
        localStorage.setItem("projects", JSON.stringify(data?.projects));
        for (const project of data?.projects) {
          if (!projects.some((p) => p.id === project)) {
            fetchProjectData(project);
          }
        }
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projects]);

  const fetchProjectData = async (project: Project) => {
    if (project) {
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", project);
      const { data: activitiesData, error: activitiesError } = await supabase
        .from("activities")
        .select("*")
        .eq("project_id", project);

      const { data: revenueData, error: revenueError } = await supabase
        .from("revenue")
        .select("*")
        .eq("project_id", project);
      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .eq("project_id", project);
      if (activitiesError) setError(activitiesError.message);
      if (revenueError) setError(revenueError.message);
      if (eventsError) setError(eventsError.message);
      if (projectData && projectData.length > 0) {
        const newProject = {
          ...projectData[0],
          activities: activitiesData || [],
          revenue: revenueData || [],
          events: eventsData || [],
        };

        setProjects((prevProjects) => [...prevProjects, newProject]);
      }
    }
  };

  const searchParams = useSearchParams();

  const showHomePage = searchParams.get("showHomePage");

  const handleProjectChange = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId) || null;
    setSelectedProject(project);
  };

  if (error) return <div>Error: {error}</div>;

  // Dependency array to trigger effect when projects change

  return showHomePage ? (
    <div>Home Page</div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
        backgroundColor: "var(--dominant)",
        padding: "0px",
        alignItems: "start",
        justifyContent: "start",
      }}
    >
      <Navbar
        selectedProject={selectedProject!}
        projects={projects}
        loading={loading}
        onProjectChange={handleProjectChange}
        handleTimeRangeSelect={handleTimeRangeSelect}
      />

      <main
        style={{
          backgroundColor: "var(--dominant)",
          width: "100%",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <Metrics
          selectedProject={selectedProject!}
          projects={projects}
          selectedTimeRange={timeRange}
          loading={loading}
        />
      </main>
      <BottomNavbar
        loading={loading}
        handleTimeRangeSelect={handleTimeRangeSelect}
      />
    </div>
  );
}
