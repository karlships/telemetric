// types/index.ts
export interface Project {
  id: string;
  name: string;
  type: string;
  activities: Activity[];
  revenue: Revenue[];
  events: Event[];
  url: string;
  favIconURL: string;
  bundle_id: string;
  url_running_on: string;
}

export interface Location {
  country_code: string;
  city: string;
  region: string;
  country: string;
}

export interface Activity {
  id: string;
  user_id: string;
  referrer: string;
  timestamp: string;
  project_id: string;
  browser: string;
  os: string;
  location: Location;
  version: string;
}

export interface User {
  browser: string;
  os: string;
  location: Location;

  version: string;
}

export interface Revenue {
  id: string;

  timestamp: string;
  project_id: string;
  total: string;
  browser: string;
  os: string;
  referrer: string;
  location: Location;
  version: string;
}
export interface Event {
  id: string;

  timestamp: string;
  project_id: string;
  name: string;
  browser: string;
  os: string;
  referrer: string;
  location: Location;
  version: string;
}
export enum SelectedNavItem {
  PROJECTS = "PROJECTS",
  METRICS = "METRICS",
  ACCOUNT = "ACCOUNT",
}

export enum DataType {
  USERS = "users",
  REVENUE = "revenue",
  EVENTS = "events",
  SESSIONS = "sessions",
}
