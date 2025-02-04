import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchClusterById } from "../api/api"
import type { Cluster } from "../types"

const ClusterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [cluster, setCluster] = useState<Cluster | null>(null)

  useEffect(() => {
    const loadCluster = async () => {
      if (id) {
        const data = await fetchClusterById(id)
        setCluster(data)
      }
    }

    loadCluster()
  }, [id])

  if (!cluster) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{cluster.name}</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Cluster Details</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Latitude: {cluster.location.latitude}, Longitude: {cluster.location.longitude}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Users</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cluster.users}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Projects</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cluster.projects}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Leads</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cluster.leads}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default ClusterDetail

