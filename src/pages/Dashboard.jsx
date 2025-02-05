import React, { useState, useEffect } from 'react';
import { fetchData } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MapComponent from '../components/MapComponent';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then(data => {
        setClusters(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <MapComponent clusters={clusters} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;