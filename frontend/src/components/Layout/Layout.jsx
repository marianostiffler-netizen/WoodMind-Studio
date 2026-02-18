import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
    </div>
  )
}

export default Layout
