import React from 'react'
import { 
  MousePointer, 
  Move, 
  PenTool, 
  Square, 
  Circle, 
  Eraser,
  Upload,
  RotateCw,
  Download,
  Trash2,
  Hammer,
  Scissors,
  Drill,
  Saw,
  Wrench,
  Zap,
  Palette,
  FileImage
} from 'lucide-react'

function ToolSidebar({ 
  onImageUpload, 
  selectedTool, 
  onToolSelect,
  onClearCanvas,
  onRotate,
  onDownload 
}) {
  const [activeCategory, setActiveCategory] = useState('tools')

  const tools = [
    { id: 'select', icon: MousePointer, label: 'Seleccionar' },
    { id: 'move', icon: Move, label: 'Mover' },
    { id: 'pen', icon: PenTool, label: 'Dibujar' },
    { id: 'rectangle', icon: Square, label: 'Rectángulo' },
    { id: 'circle', icon: Circle, label: 'Círculo' },
    { id: 'eraser', icon: Eraser, label: 'Borrar' },
    { id: 'hammer', icon: Hammer, label: 'Martillo' },
    { id: 'saw', icon: Saw, label: 'Sierra' },
    { id: 'drill', icon: Drill, label: 'Taladro' },
    { id: 'wrench', icon: Wrench, label: 'Llave' },
    { id: 'scissors', icon: Scissors, label: 'Tijeras' },
    { id: 'zap', icon: Zap, label: 'Grabado Láser' },
    { id: 'palette', icon: Palette, label: 'Acabados' }
  ]

  return (
    <div className="w-20 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-3 border-b border-gray-700">
        <div className="w-10 h-10 bg-wood-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xs">WM</span>
        </div>
      </div>

      {/* Tool Categories */}
      <div className="flex-1 py-2">
        {/* File Operations */}
        <div className="mb-4">
          <div className="px-2 py-1">
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors group"
              title="Subir Imagen"
            >
              <Upload className="w-5 h-5 text-gray-300 group-hover:text-white" />
            </label>
          </div>
        </div>

        {/* Drawing Tools */}
        <div className="space-y-1">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => onToolSelect(tool.id)}
              className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center transition-colors ${
                selectedTool === tool.id
                  ? 'bg-wood-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
              title={tool.label}
            >
              <tool.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-2 space-y-2 border-t border-gray-700">
        <button
          onClick={onRotate}
          className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
          title="Rotar"
        >
          <RotateCw className="w-5 h-5 text-gray-300" />
        </button>
        
        <button
          onClick={onDownload}
          className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
          title="Descargar"
        >
          <Download className="w-5 h-5 text-gray-300" />
        </button>

        <button
          onClick={onClearCanvas}
          className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors"
          title="Limpiar"
        >
          <Eraser className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}

export default ToolSidebar
