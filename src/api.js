import axios from 'axios';

// Configure the backend API URL; update if needed.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
});

// Fetch all clusters from FastAPI
export const fetchData = async () => {
  try {
    const response = await api.get('/api/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching clusters:', error);
    throw error;
  }
};

// Fetch calculated metrics from FastAPI
export const fetchMetrics = async () => {
  try {
    const response = await api.get('/api/metrics');
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
};

// Add a new cluster using FastAPI endpoint
export const addCluster = async (cluster) => {
  try {
    const response = await api.post('/api/cluster', cluster);
    return response.data;
  } catch (error) {
    console.error('Error adding cluster:', error);
    throw error;
  }
};