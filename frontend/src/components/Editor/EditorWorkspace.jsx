import React from 'react'

function EditorWorkspace() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Espacio de Trabajo del Editor</h1>
        <p className="text-xl text-gray-600 mb-8">Diseña tus proyectos de madera con nuestras herramientas avanzadas</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Subir Imagen</h3>
            <p className="text-gray-600">Convierte tus imágenes al formato SVG</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Editar Diseño</h3>
            <p className="text-gray-600">Ajusta finamente tus patrones de madera</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Vista Previa</h3>
            <p className="text-gray-600">Ve tu diseño en tiempo real</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorWorkspace
