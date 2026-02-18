import React from 'react'

function PricingWorkspace() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Espacio de Trabajo de Precios</h1>
        <p className="text-xl text-gray-600 mb-8">Obtén cotizaciones instantáneas para tus proyectos de madera</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Costos de Materiales</h3>
            <p className="text-gray-600">Calcula basado en tipo de madera y dimensiones</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Tiempo de Producción</h3>
            <p className="text-gray-600">Estima la duración de la fabricación</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Generación de Cotizaciones</h3>
            <p className="text-gray-600">Obtén desgloses de costos detallados</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingWorkspace
