import React from 'react'

function Viewer3DWorkspace() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">3D Viewer Workspace</h1>
        <p className="text-xl text-gray-600 mb-8">Visualize your wood designs in realistic 3D</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Real-time Rendering</h3>
            <p className="text-gray-600">See your designs with realistic wood textures</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Interactive Controls</h3>
            <p className="text-gray-600">Rotate, zoom, and explore your 3D models</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewer3DWorkspace
