import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect directly to editor for immediate tool access
    navigate('/editor')
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-wood-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Cargando editor de herramientas...</p>
      </div>
    </div>
  )
}

export default HomePage
