import type React from "react"
import { Link } from "react-router-dom"


const Header: React.FC = () => {


  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-700">
            <Link to="/">Analytics Dashboard</Link>
          </div>
          <div className="flex items-center">
             (
              <>
                <Link to="/" className="text-gray-800 hover:text-gray-600 mx-4">
                  Dashboard
                </Link>
                <Link to="/admin" className="text-gray-800 hover:text-gray-600 mx-4">
                  Admin
                </Link>
               
              </>
            )
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

