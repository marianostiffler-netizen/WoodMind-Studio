import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext.jsx'
import { 
  Bars3Icon, 
  XMarkIcon, 
  HomeIcon, 
  PencilIcon, 
  CubeIcon, 
  CurrencyDollarIcon,
  BeakerIcon 
} from '@heroicons/react/24/outline'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { projectName, svgContent, boardDimensions } = useProject()

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Editor', href: '/editor', icon: PencilIcon },
    { name: '3D Viewer', href: '/viewer', icon: CubeIcon },
    { name: 'Pricing', href: '/pricing', icon: CurrencyDollarIcon },
  ]

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <BeakerIcon className="h-8 w-8 text-wood-600" />
                <span className="text-xl font-bold text-gray-900">
                  WoodMind Studio
                </span>
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-wood-500 text-wood-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Project info and mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* Project status */}
            {projectName && (
              <div className="hidden sm:block">
                <div className="text-sm text-gray-600">
                  Project: <span className="font-medium">{projectName}</span>
                </div>
                {svgContent && (
                  <div className="text-xs text-gray-500">
                    {boardDimensions.width}×{boardDimensions.height}cm
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wood-500"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive
                      ? 'bg-wood-50 border-wood-500 text-wood-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </div>
                </Link>
              )
            })}
          </div>
          
          {/* Mobile project info */}
          {projectName && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-4">
                <div className="text-base font-medium text-gray-800">
                  {projectName}
                </div>
                {svgContent && (
                  <div className="text-sm text-gray-500">
                    {boardDimensions.width}×{boardDimensions.height}cm
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
