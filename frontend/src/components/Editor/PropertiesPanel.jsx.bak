import React from 'react'
import { 
  Settings, 
  Ruler, 
  Package, 
  Layers,
  Sparkles,
  Palette,
  Brush
} from 'lucide-react'

function PropertiesPanel({ 
  boardDimensions, 
  woodType, 
  onDimensionChange, 
  onWoodTypeChange
}) {
  const woodTypes = [
    { id: 'pine', name: 'Pino', price: 15, color: '#DEB887' },
    { id: 'oak', name: 'Roble', price: 25, color: '#8B4513' },
    { id: 'cedar', name: 'Cedro', price: 35, color: '#D2B48C' },
    { id: 'walnut', name: 'Nogal', price: 45, color: '#5C3A1E' },
    { id: 'mahogany', name: 'Caoba', price: 55, color: '#C04000' }
  ]

  const currentWoodType = woodTypes.find(w => w.id === woodType) || woodTypes[1]

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center">
          <Settings className="w-5 h-5 mr-2 text-wood-500" />
          <h3 className="text-white font-semibold">Propiedades</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Wood Type Selection */}
        <div>
          <div className="flex items-center mb-3">
            <Package className="w-4 h-4 mr-2 text-gray-400" />
            <label className="text-sm font-medium text-gray-300">Tipo de Madera</label>
          </div>
          <div className="space-y-2">
            {woodTypes.map(wood => (
              <button
                key={wood.id}
                onClick={() => onWoodTypeChange(wood.id)}
                className={`w-full px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                  woodType === wood.id
                    ? 'bg-wood-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: wood.color }}
                  />
                  <span className="text-sm">{wood.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Professional Decoration Options */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Sparkles className="w-4 h-4 mr-2 text-wood-500" />
            <label className="text-sm font-medium text-gray-300">Opciones de Decoración Profesional</label>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-xs">
                <Palette className="w-3 h-3 inline mr-1" />
                Patrones Clásicos
              </button>
              <button className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-xs">
                <Brush className="w-3 h-3 inline mr-1" />
                Acabados Artísticos
              </button>
              <button className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-xs">
                <Sparkles className="w-3 h-3 inline mr-1" />
                Grabados Personalizados
              </button>
              <button className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-xs">
                <Layers className="w-3 h-3 inline mr-1" />
                Texturas Especiales
              </button>
            </div>
            
            <div className="mt-3 p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">Estilos profesionales disponibles:</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-wood-600 text-white rounded text-xs">Rústico</span>
                <span className="px-2 py-1 bg-wood-600 text-white rounded text-xs">Moderno</span>
                <span className="px-2 py-1 bg-wood-600 text-white rounded text-xs">Clásico</span>
                <span className="px-2 py-1 bg-wood-600 text-white rounded text-xs">Minimalista</span>
                <span className="px-2 py-1 bg-wood-600 text-white rounded text-xs">Ornamental</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <div className="flex items-center mb-3">
            <Ruler className="w-4 h-4 mr-2 text-gray-400" />
            <label className="text-sm font-medium text-gray-300">Dimensiones (cm)</label>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Ancho</label>
              <input
                type="number"
                min="10"
                max="200"
                value={boardDimensions.width}
                onChange={(e) => onDimensionChange('width', parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-wood-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-400 block mb-1">Alto</label>
              <input
                type="number"
                min="10"
                max="200"
                value={boardDimensions.height}
                onChange={(e) => onDimensionChange('height', parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-wood-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-400 block mb-1">Grosor</label>
              <input
                type="number"
                min="0.5"
                max="10"
                step="0.5"
                value={boardDimensions.depth}
                onChange={(e) => onDimensionChange('depth', parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-wood-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-400 block mb-1">Orientación</label>
              <select
                value={boardDimensions.orientation || 'horizontal'}
                onChange={(e) => onDimensionChange('orientation', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-wood-500 focus:outline-none"
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PropertiesPanel
