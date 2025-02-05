import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-4 shadow">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-lg font-bold">Analytics Dashboard</div>
        <ul className="flex space-x-4">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/clusters">Clusters</Link></li>
          <li><Link to="/metrics">Metrics</Link></li>
          <li><Link to="/add-cluster">Add Cluster</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/oauth">Sign In with Google</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;