import React from 'react'
import { Sliders, Sun, Contrast } from 'lucide-react'

function ImageControls({ 
  contrast, 
  threshold, 
  detailLevel, 
  onContrastChange, 
  onThresholdChange, 
  onDetailLevelChange 
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Sliders className="w-5 h-5 mr-2 text-wood-600" />
        <h3 className="text-lg font-semibold">Controles de Imagen</h3>
      </div>
      
      <div className="space-y-6">
        {/* Contrast Control */}
        <div>
          <div className="flex items-center mb-2">
            <Contrast className="w-4 h-4 mr-2 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Contraste: {contrast}%
            </label>
          </div>
          <input
            type="range"
            min="50"
            max="200"
            value={contrast}
            onChange={(e) => onContrastChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-wood-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>50%</span>
            <span>200%</span>
          </div>
        </div>

        {/* Threshold Control */}
        <div>
          <div className="flex items-center mb-2">
            <Sun className="w-4 h-4 mr-2 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Umbral: {threshold}
            </label>
          </div>
          <input
            type="range"
            min="0"
            max="255"
            value={threshold}
            onChange={(e) => onThresholdChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-wood-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>255</span>
          </div>
        </div>

        {/* Detail Level Control */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Nivel de Detalle
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onDetailLevelChange('low')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                detailLevel === 'low'
                  ? 'bg-wood-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bajo
            </button>
            <button
              onClick={() => onDetailLevelChange('medium')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                detailLevel === 'medium'
                  ? 'bg-wood-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Medio
            </button>
            <button
              onClick={() => onDetailLevelChange('high')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                detailLevel === 'high'
                  ? 'bg-wood-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Alto
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageControls
