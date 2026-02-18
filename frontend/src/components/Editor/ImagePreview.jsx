import React from 'react'
import { Eye, Download } from 'lucide-react'

function ImagePreview({ originalImage, processedImage, svgContent, onDownloadSVG }) {
  return (
    <div className="space-y-6">
      {/* Original Image Preview */}
      {originalImage && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-wood-600" />
              <h3 className="text-lg font-semibold">Vista Previa Original</h3>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden bg-gray-50">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-64 object-contain"
              style={{
                filter: `contrast(${processedImage?.contrast || 100}%)`
              }}
            />
          </div>
        </div>
      )}

      {/* SVG Preview */}
      {svgContent && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-wood-600" />
              <h3 className="text-lg font-semibold">Vista Previa SVG</h3>
            </div>
            <button
              onClick={onDownloadSVG}
              className="flex items-center gap-2 px-4 py-2 bg-wood-600 text-white rounded-lg hover:bg-wood-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Descargar SVG
            </button>
          </div>
          <div className="border rounded-lg overflow-hidden bg-gray-50">
            <div
              dangerouslySetInnerHTML={{ __html: svgContent }}
              className="w-full h-64 flex items-center justify-center"
              style={{
                maxHeight: '256px'
              }}
            />
          </div>
        </div>
      )}

      {/* Processing Status */}
      {!svgContent && originalImage && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin mr-3"></div>
            <p className="text-yellow-800">
              Procesando imagen... Ajusta los controles para optimizar la conversión.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImagePreview
