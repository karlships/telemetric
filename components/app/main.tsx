"use client";
import { useEffect, useRef, useState } from "react";

import { Project } from "@/types/index";

import Metrics from "./metrics/metrics/metrics";

import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { NewProject } from "../newproject/newproject";
import { Profile } from "../profile/profile";
import { Settings } from "../settings/settings";
import { BottomNavbar } from "./navigation/navbar/bottomnavbar";
import { Navbar } from "./navigation/navbar/navbar";

export function Dashboard() {
  const supabase = createClient();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedContent, setSelectedContent] = useState<string>("metrics");

  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<string>("last7days");
  const [startDate, setStartDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  });
  const [endDate, setEndDate] = useState<Date>(() => new Date());

  const handleTimeRangeSelect = async (
    range: string,
    start?: Date,
    end?: Date
  ) => {
    setTimeRange(range);
    setStartDate(start || new Date());
    setEndDate(end || new Date());
  };

  const hasFetchedProjects = useRef(false);

  useEffect(() => {
    setSelectedProject(projects[0]);
    if (selectedProject) {
      setSelectedContent("metrics");
      setLoading(false);
    }

    const fetchProjects = async () => {
      if (hasFetchedProjects.current) return;
      hasFetchedProjects.current = true;
      setLoading(true);
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      // Check if projects exist in local storage

      const { data, error } = await supabase
        .from("customers")
        .select("projects")
        .eq("id", userData?.user?.id)
        .single();
      if (error) {
        setError(error.message);
        return;
      }

      if (data?.projects.length === 0) {
        setSelectedContent("newProject");
        return;
      }

      // Store projects in local storage
      for (const project of data?.projects) {
        if (!projects.some((p) => p.id === project)) {
          fetchProjectData(project);
        }
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

      if (activitiesData && activitiesData.length === 0 && projectData) {
        const newProject = {
          ...projectData![0],
          activities: [],
          revenue: [],
          events: [],
          bundle_id: "",
          url_running_on: "",
        };

        setProjects((prevProjects) => [...prevProjects, newProject]);
        return;
      }

      const firstActivity = activitiesData && activitiesData[0];
      const bundle_id = firstActivity?.bundle_id;
      const url_running_on = firstActivity?.url_running_on;

      const { data: revenueData, error: revenueError } = await supabase
        .from("revenue")
        .select("*")
        .eq("project_id", project);

      // Convert revenue amounts from cents to dollars/euros
      if (revenueData) {
        revenueData.forEach((revenue) => {
          revenue.total = revenue.total / 100;
        });
      }

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
          bundle_id: bundle_id || "",
          url_running_on: url_running_on?.includes("localhost")
            ? ""
            : url_running_on || "",
        };

        setProjects((prevProjects) => [...prevProjects, newProject]);
      }
    }
  };

  const updateProjectName = async (projectId: string | null, name: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, name } : project
      )
    );
    if (!projectId) {
      toast.error("No project selected");
      return;
    }

    const supabase = createClient();
    toast.promise(
      async () => {
        const { data, error } = await supabase
          .from("projects")
          .update({ name })
          .eq("id", projectId)
          .single();

        if (error) throw error;
        return data;
      },
      {
        loading: "Updating project name...",
        success: () => "Project name updated successfully",
        error: (err) => `Failed to update project name: ${err.message}`,
      }
    );
  };

  const createProject = async (projectName: string) => {
    if (!projectName) {
      toast.error("Project name is required");
      return;
    }

    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user?.id) {
      toast.error("You must be logged in to create a project");
      return;
    }

    toast.promise(
      async () => {
        // Create the project
        const { data: projectData, error: projectError } = await supabase
          .from("projects")
          .insert([
            {
              name: projectName,
            },
          ])
          .select()
          .single();

        if (projectError) throw projectError;

        // Add the new project to state
        const newProject = {
          ...projectData,
          activities: [],
          revenue: [],
          events: [],
          bundle_id: "",
          url_running_on: "",
        };

        setProjects((prev) => [...prev, newProject]);
        // First fetch current user's projects
        const { data: existingUser, error: fetchError } = await supabase
          .from("customers")
          .select("projects")
          .eq("id", userData.user.id)
          .single();

        if (fetchError) throw fetchError;
        // Append new project to existing projects array
        const updatedProjects = [
          ...(existingUser?.projects || []),
          newProject.id,
        ];
        // Update user with combined projects array
        const { data: customerData, error: userError } = await supabase
          .from("customers")
          .update({ projects: updatedProjects })
          .eq("id", userData.user.id)
          .select()
          .single();

        if (userError) throw userError;
        setSelectedProject(newProject);
        setSelectedContent("metrics");
        return projectData;
      },
      {
        loading: "Creating project...",
        success: "Project created successfully",
        error: (err) => `Failed to create project: ${err.message}`,
      }
    );
  };

  const searchParams = useSearchParams();

  const showHomePage = searchParams.get("showHomePage");

  const projectDeleted = searchParams.get("projectDeleted") === "true";
  const projectDeleteName = searchParams.get("projectDeleteName");

  useEffect(() => {
    if (projectDeleted && projectDeleteName) {
      toast.success(`Project "${projectDeleteName}" deleted successfully`);
    }
  }, [projectDeleted, projectDeleteName]);

  const handleProjectChange = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId) || null;
    setSelectedProject(project);
    setSelectedContent("metrics");
  };

  if (error) return <div>Error: {error}</div>;

  const renderContent = () => {
    if (selectedContent === "metrics") {
      return (
        <div>
          <Metrics
            selectedProject={selectedProject!}
            projects={projects}
            selectedTimeRange={timeRange}
            loading={loading}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      );
    } else if (selectedContent === "settings") {
      return (
        <Settings
          selectedProject={selectedProject!}
          updateProjectName={updateProjectName}
        />
      );
    } else if (selectedContent === "profile") {
      return <Profile />;
    } else if (selectedContent === "newProject") {
      return <NewProject createProject={createProject} />;
    }
  };

  // Dependency array to trigger effect when projects change
  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Fetching your projects...
      </div>
    );

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
        setSelectedContent={setSelectedContent}
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
        {renderContent()}
      </main>
      <BottomNavbar
        loading={loading}
        handleTimeRangeSelect={handleTimeRangeSelect}
      />
    </div>
  );
}
