import React, { useState, useEffect, useCallback, useRef } from 'react'
import ToolSidebar from './ToolSidebar.jsx'
import Canvas from './Canvas.jsx'
import PropertiesPanel from './PropertiesPanel.jsx'
import { useProject } from '../../context/ProjectContext.jsx'
import { priceCalculator } from '../../utils/priceCalculator.js'
import { imageConverter } from '../../utils/imageConverter.js'

function EditorWorkspace() {
  const { 
    boardDimensions, 
    setBoardDimensions, 
    selectedWoodType, 
    setWoodType,
    svgContent,
    setSvgContent,
    originalImage,
    setOriginalImage
  } = useProject()

  // Editor state
  const [selectedTool, setSelectedTool] = useState('select')
  const [priceCalculation, setPriceCalculation] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  // File input ref
  const fileInputRef = useRef(null)

  // Calculate price whenever dimensions or wood type change
  useEffect(() => {
    const svgComplexity = svgContent ? 
      priceCalculator.calculateSVGComplexity(svgContent) : 1.0
    
    const calculation = priceCalculator.calculatePrice(
      boardDimensions, 
      selectedWoodType, 
      svgComplexity
    )
    
    setPriceCalculation(calculation)
  }, [boardDimensions, selectedWoodType, svgContent])

  // Handle image upload
  const handleImageUpload = useCallback(async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsProcessing(true)
    try {
      // Convert image to data URL
      const imageData = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      // Convert to SVG
      const svg = await imageConverter.convertImageToSVG(imageData, {
        threshold: 128,
        contrast: 100,
        detailLevel: 'medium'
      })

      setOriginalImage(imageData)
      setSvgContent(svg)
    } catch (error) {
      console.error('Error processing image:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [setOriginalImage, setSvgContent])

  // Handle tool selection
  const handleToolSelect = useCallback((toolId) => {
    setSelectedTool(toolId)
  }, [])

  // Handle dimension changes
  const handleDimensionChange = useCallback((dimension, value) => {
    setBoardDimensions({
      ...boardDimensions,
      [dimension]: value
    })
  }, [boardDimensions, setBoardDimensions])

  // Handle wood type change
  const handleWoodTypeChange = useCallback((woodType) => {
    setWoodType(woodType)
  }, [setWoodType])

  // Handle canvas operations
  const handleClearCanvas = useCallback(() => {
    setSvgContent(null)
    setOriginalImage(null)
    setSelectedTool('select')
  }, [setSvgContent, setOriginalImage])

  const handleRotate = useCallback(() => {
    // TODO: Implement rotation logic
    console.log('Rotate canvas')
  }, [])

  const handleDownload = useCallback(() => {
    if (svgContent) {
      imageConverter.downloadSVG(svgContent, `woodmind-design-${Date.now()}.svg`)
    }
  }, [svgContent])

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Left Sidebar - Tools */}
      <ToolSidebar
        onImageUpload={handleImageUpload}
        selectedTool={selectedTool}
        onToolSelect={handleToolSelect}
        onClearCanvas={handleClearCanvas}
        onRotate={handleRotate}
        onDownload={handleDownload}
      />

      {/* Center - Canvas */}
      <Canvas
        svgContent={svgContent}
        selectedTool={selectedTool}
        boardDimensions={boardDimensions}
        woodType={selectedWoodType}
        onCanvasUpdate={() => {}} // TODO: Implement canvas update callback
      />

      {/* Right Sidebar - Properties */}
      <PropertiesPanel
        boardDimensions={boardDimensions}
        woodType={selectedWoodType}
        onDimensionChange={handleDimensionChange}
        onWoodTypeChange={handleWoodTypeChange}
        priceCalculation={priceCalculation}
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Processing overlay */}
      {isProcessing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="w-8 h-8 border-2 border-wood-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Procesando imagen...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditorWorkspace
