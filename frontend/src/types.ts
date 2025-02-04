export interface Location {
    latitude: number;
    longitude: number;
  }
  
  export interface Cluster {
    _id: string;
    name: string;
    location: Location;
    users: number;
    projects: number;
    leads: number;
  }
  
  export interface Metrics {
    totalUsers: number;
    totalClusters: number;
    totalProjects: number;
    totalLeads: number;
    averageUsersPerCluster: number;
  }
  
  export interface Filters {
    minUsers: number;
    minProjects: number;
  }
  