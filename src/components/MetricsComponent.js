import React from 'react';

const MetricsComponent = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-bold">Total Users</h3>
        <p>{metrics.totalUsers || 0}</p>
      </div>
      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-bold">Total Clusters</h3>
        <p>{metrics.totalClusters || 0}</p>
      </div>
      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-bold">Total Projects</h3>
        <p>{metrics.totalProjects || 0}</p>
      </div>
      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-bold">Total Leads</h3>
        <p>{metrics.totalLeads || 0}</p>
      </div>
      <div className="bg-white p-4 shadow rounded col-span-2">
        <h3 className="font-bold">Average Users per Cluster</h3>
        <p>{metrics.averageUsersPerCluster || 0}</p>
      </div>
    </div>
  );
};

export default MetricsComponent;