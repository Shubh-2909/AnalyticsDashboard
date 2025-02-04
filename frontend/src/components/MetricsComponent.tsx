import type React from "react"
import type { Metrics } from "../types"

interface MetricsComponentProps {
  metrics: Metrics | null
}

const MetricsComponent: React.FC<MetricsComponentProps> = ({ metrics }) => {
  if (!metrics) {
    return <div>Loading metrics...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <MetricCard title="Total Users" value={metrics.totalUsers} />
      <MetricCard title="Total Clusters" value={metrics.totalClusters} />
      <MetricCard title="Total Projects" value={metrics.totalProjects} />
      <MetricCard title="Total Leads" value={metrics.totalLeads} />
      <MetricCard title="Avg Users/Cluster" value={metrics.averageUsersPerCluster.toFixed(2)} />
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: number | string
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  )
}

export default MetricsComponent

