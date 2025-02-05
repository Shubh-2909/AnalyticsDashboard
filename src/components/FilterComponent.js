import React from 'react';

const FilterComponent = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="font-bold mb-2">Filters</h3>
      <div className="space-y-2">
        <div>
          <label className="mr-2">Min Users:</label>
          <input
            type="number"
            name="minUsers"
            value={filters.minUsers}
            onChange={handleFilterChange}
            className="border p-1"
          />
        </div>
        <div>
          <label className="mr-2">Min Projects:</label>
          <input
            type="number"
            name="minProjects"
            value={filters.minProjects}
            onChange={handleFilterChange}
            className="border p-1"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;