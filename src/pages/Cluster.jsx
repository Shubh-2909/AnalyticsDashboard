import React, { useState, useEffect } from 'react';
import { fetchData } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TableComponent from '../components/TableComponent';
import LoadingSpinner from '../components/LoadingSpinner';

const Clusters = () => {
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
        <h1 className="text-3xl font-bold mb-4">Clusters</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <TableComponent clusters={clusters} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Clusters;