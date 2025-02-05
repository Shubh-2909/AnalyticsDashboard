import React, { useState, useEffect } from 'react';
import { fetchMetrics } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MetricsComponent from '../components/MetricsComponent';
import LoadingSpinner from '../components/LoadingSpinner';

const Metrics = () => {
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics()
      .then(data => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching metrics:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Metrics</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <MetricsComponent metrics={metrics} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Metrics;