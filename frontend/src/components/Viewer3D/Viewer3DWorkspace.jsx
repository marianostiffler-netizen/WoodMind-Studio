import React from 'react'

function Viewer3DWorkspace() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Espacio de Trabajo 3D</h1>
        <p className="text-xl text-gray-600 mb-8">Visualiza tus diseños de madera en 3D realista</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Renderizado en Tiempo Real</h3>
            <p className="text-gray-600">Ve tus diseños con texturas de madera realistas</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Controles Interactivos</h3>
            <p className="text-gray-600">Rota, haz zoom y explora tus modelos 3D</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewer3DWorkspace
