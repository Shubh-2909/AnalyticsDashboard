import type React from "react"
import type { Filters } from "../types"

interface FilterComponentProps {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

const FilterComponent: React.FC<FilterComponentProps> = ({ filters, setFilters }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: Number.parseInt(value) || 0,
    }))
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>
      <div className="flex flex-wrap -mx-2">
        <div className="px-2 w-full sm:w-1/2 md:w-1/4 mb-4">
          <label htmlFor="minUsers" className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Users
          </label>
          <input
            type="number"
            id="minUsers"
            name="minUsers"
            value={filters.minUsers}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="px-2 w-full sm:w-1/2 md:w-1/4 mb-4">
          <label htmlFor="minProjects" className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Projects
          </label>
          <input
            type="number"
            id="minProjects"
            name="minProjects"
            value={filters.minProjects}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>
  )
}

export default FilterComponent

