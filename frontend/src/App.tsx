import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ClusterDetail from "./pages/ClusterDetail"
import AdminPage from "./pages/AdminPage"
import Header from "./components/Header"

import ErrorBoundary from "./components/ErrorBoundary"

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
        
                  <Dashboard />

              }
            />
            <Route
              path="/cluster/:id"
              element={
             
                  <ClusterDetail />
               
              }
            />
            <Route
              path="/admin"
              element={
              
                  <AdminPage />
            
              }
            />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App

