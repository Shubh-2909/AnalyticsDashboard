import type React from "react"
import { useState } from "react"
import { addCluster } from "../api/api"
import type { Cluster } from "../types"

const AdminPage: React.FC = () => {
  const [name, setName] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [users, setUsers] = useState("")
  const [projects, setProjects] = useState("")
  const [leads, setLeads] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    const newCluster: Omit<Cluster, "_id"> = {
      name,
      location: {
        latitude: Number.parseFloat(latitude),
        longitude: Number.parseFloat(longitude),
      },
      users: Number.parseInt(users),
      projects: Number.parseInt(projects),
      leads: Number.parseInt(leads),
    }

    try {
      await addCluster(newCluster)
      setMessage("Cluster added successfully!")
      // Clear form
      setName("")
      setLatitude("")
      setLongitude("")
      setUsers("")
      setProjects("")
      setLeads("")
    } catch (error) {
      setMessage("Error adding cluster. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin: Add New Cluster</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Cluster Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <label htmlFor="latitude" className="block text-gray-700 text-sm font-bold mb-2">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label htmlFor="longitude" className="block text-gray-700 text-sm font-bold mb-2">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="users" className="block text-gray-700 text-sm font-bold mb-2">
            Users
          </label>
          <input
            type="number"
            id="users"
            value={users}
            onChange={(e) => setUsers(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="projects" className="block text-gray-700 text-sm font-bold mb-2">
            Projects
          </label>
          <input
            type="number"
            id="projects"
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="leads" className="block text-gray-700 text-sm font-bold mb-2">
            Leads
          </label>
          <input
            type="number"
            id="leads"
            value={leads}
            onChange={(e) => setLeads(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Cluster
          </button>
        </div>
      </form>
      {message && <div className="mt-4 text-center text-green-600 font-bold">{message}</div>}
    </div>
  )
}

export default AdminPage

