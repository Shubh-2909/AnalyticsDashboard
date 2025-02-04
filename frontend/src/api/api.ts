import axios from "axios"
import type { Cluster, Metrics } from "../types"

const API_BASE_URL = "http://localhost:8000/api" // Replace with your actual API URL

export const fetchData = async (): Promise<Cluster[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data`)
    return response.data
  } catch (error) {
    console.error("Error fetching data:", error)
    return []
  }
}

export const fetchMetrics = async (): Promise<Metrics> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/metrics`)
    return response.data
  } catch (error) {
    console.error("Error fetching metrics:", error)
    return {
      totalUsers: 0,
      totalClusters: 0,
      totalProjects: 0,
      totalLeads: 0,
      averageUsersPerCluster: 0,
    }
  }
}

export const addCluster = async (cluster: Omit<Cluster, "_id">): Promise<Cluster> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cluster`, cluster)
    return response.data
  } catch (error) {
    console.error("Error adding cluster:", error)
    throw error
  }
}

export const fetchClusterById = async (id: string): Promise<Cluster> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cluster/${id}`)
    return response.data
  } catch (error) {
    console.error("Error fetching cluster:", error)
    throw error
  }
}

