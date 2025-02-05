import React from 'react';

const TableComponent = ({ clusters }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Users</th>
            <th className="border p-2">Projects</th>
            <th className="border p-2">Leads</th>
            <th className="border p-2">Latitude</th>
            <th className="border p-2">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {clusters.map((cluster, index) => (
            <tr key={index}>
              <td className="border p-2">{cluster.name}</td>
              <td className="border p-2">{cluster.users}</td>
              <td className="border p-2">{cluster.projects}</td>
              <td className="border p-2">{cluster.leads}</td>
              <td className="border p-2">{cluster.location.latitude}</td>
              <td className="border p-2">{cluster.location.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;