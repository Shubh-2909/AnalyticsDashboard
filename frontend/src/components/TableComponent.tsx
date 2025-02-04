import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import type { Cluster } from "../types"

interface TableComponentProps {
  clusters: Cluster[]
}

const TableComponent: React.FC<TableComponentProps> = ({ clusters }) => {
  const [sortColumn, setSortColumn] = useState<keyof Cluster>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: keyof Cluster) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedClusters = [...clusters].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <button onClick={() => handleSort("name")} className="font-bold">
                Name {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
              </button>
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <button onClick={() => handleSort("users")} className="font-bold">
                Users {sortColumn === "users" && (sortDirection === "asc" ? "▲" : "▼")}
              </button>
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <button onClick={() => handleSort("projects")} className="font-bold">
                Projects {sortColumn === "projects" && (sortDirection === "asc" ? "▲" : "▼")}
              </button>
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <button onClick={() => handleSort("leads")} className="font-bold">
                Leads {sortColumn === "leads" && (sortDirection === "asc" ? "▲" : "▼")}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedClusters.map((cluster) => (
            <tr key={cluster._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/cluster/${cluster._id}`} className="text-blue-600 hover:text-blue-900">
                  {cluster.name}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{cluster.users}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cluster.projects}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cluster.leads}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableComponent

