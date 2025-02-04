import type React from "react"
import { useState, useEffect } from "react"
import MapComponent from "../components/MapComponent"
import MetricsComponent from "../components/MetricsComponent"
import TableComponent from "../components/TableComponent"
import FilterComponent from "../components/FilterComponent"
import { fetchData, fetchMetrics } from "../api/api"
import type { Cluster, Metrics } from "../types"

const Dashboard: React.FC = () => {
  const [clusters, setClusters] = useState<Cluster[]>([])
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [filters, setFilters] = useState({ minUsers: 0, minProjects: 0 })

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData()
      setClusters(data)
    }

    const loadMetrics = async () => {
      const metricsData = await fetchMetrics()
      setMetrics(metricsData)
    }

    loadData()
    loadMetrics()
  }, [])

  const filteredClusters = clusters.filter(
    (cluster) => cluster.users >= filters.minUsers && cluster.projects >= filters.minProjects,
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics Dashboard</h1>
      <div className="mb-8">
        <MetricsComponent metrics={metrics} />
      </div>
      <div className="mb-8">
        <FilterComponent filters={filters} setFilters={setFilters} />
      </div>
      <div className="mb-8">
        <MapComponent clusters={filteredClusters} />
      </div>
      <div>
        <TableComponent clusters={filteredClusters} />
      </div>
    </div>
  )
}

export default Dashboard

