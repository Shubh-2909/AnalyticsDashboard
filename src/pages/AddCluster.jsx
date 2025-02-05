import React, { useState } from 'react';
import { addCluster } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddCluster = () => {
  const [newCluster, setNewCluster] = useState({
    name: '',
    location: { latitude: '', longitude: '' },
    users: '',
    projects: '',
    leads: ''
  });
  const [message, setMessage] = useState('');

  const handleAddCluster = async (e) => {
    e.preventDefault();
    try {
      const added = await addCluster(newCluster);
      setMessage(`Cluster ${added.name} added successfully!`);
      setNewCluster({
        name: '',
        location: { latitude: '', longitude: '' },
        users: '',
        projects: '',
        leads: ''
      });
    } catch (error) {
      console.error('Failed to add cluster', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Add New Cluster</h1>
        {message && <p className="text-green-500">{message}</p>}
        <form onSubmit={handleAddCluster} className="space-y-4">
          <input
            type="text"
            placeholder="Cluster Name"
            value={newCluster.name}
            onChange={(e) => setNewCluster({ ...newCluster, name: e.target.value })}
            className="border p-2 w-full"
            required
          />
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Latitude"
              value={newCluster.location.latitude}
              onChange={(e) =>
                setNewCluster({
                  ...newCluster,
                  location: { ...newCluster.location, latitude: e.target.value }
                })
              }
              className="border p-2 w-1/2"
              required
            />
            <input
              type="number"
              placeholder="Longitude"
              value={newCluster.location.longitude}
              onChange={(e) =>
                setNewCluster({
                  ...newCluster,
                  location: { ...newCluster.location, longitude: e.target.value }
                })
              }
              className="border p-2 w-1/2"
              required
            />
          </div>
          <input
            type="number"
            placeholder="Users"
            value={newCluster.users}
            onChange={(e) => setNewCluster({ ...newCluster, users: e.target.value })}
            className="border p-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Projects"
            value={newCluster.projects}
            onChange={(e) => setNewCluster({ ...newCluster, projects: e.target.value })}
            className="border p-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Leads"
            value={newCluster.leads}
            onChange={(e) => setNewCluster({ ...newCluster, leads: e.target.value })}
            className="border p-2 w-full"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Cluster
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddCluster;