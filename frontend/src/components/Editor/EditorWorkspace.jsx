import React, { useState, useEffect, useCallback } from 'react'
import ImageUploader from './ImageUploader.jsx'
import ImageControls from './ImageControls.jsx'
import ImagePreview from './ImagePreview.jsx'
import { imageConverter } from '../../utils/imageConverter.js'
import { useProject } from '../../context/ProjectContext.jsx'

function EditorWorkspace() {
  const { setSvgContent, setOriginalImage } = useProject()
  
  // State management
  const [originalImage, setOriginalImageState] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [svgContent, setSvgContentState] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Image processing controls
  const [controls, setControls] = useState({
    contrast: 100,
    threshold: 128,
    detailLevel: 'medium'
  })

  // Handle image upload
  const handleImageUpload = useCallback((imageData, file) => {
    setOriginalImageState(imageData)
    setImageFile(file)
    setOriginalImage(imageData)
    setSvgContentState(null)
    setSvgContent(null)
  }, [setOriginalImage, setSvgContent])

  // Handle image clear
  const handleClearImage = useCallback(() => {
    setOriginalImageState(null)
    setImageFile(null)
    setSvgContentState(null)
    setOriginalImage(null)
    setSvgContent(null)
  }, [setOriginalImage, setSvgContent])

  // Process image to SVG
  const processImage = useCallback(async () => {
    if (!originalImage) return

    setIsProcessing(true)
    try {
      const svg = await imageConverter.convertImageToSVG(originalImage, controls)
      setSvgContentState(svg)
      setSvgContent(svg)
    } catch (error) {
      console.error('Error converting image to SVG:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [originalImage, controls, setSvgContent])

  // Auto-process when controls change
  useEffect(() => {
    if (originalImage && !isProcessing) {
      const timer = setTimeout(() => {
        processImage()
      }, 500) // Debounce processing
      return () => clearTimeout(timer)
    }
  }, [controls, originalImage, processImage, isProcessing])

  // Handle SVG download
  const handleDownloadSVG = useCallback(() => {
    if (svgContent) {
      imageConverter.downloadSVG(svgContent, `woodmind-design-${Date.now()}.svg`)
    }
  }, [svgContent])

  // Control handlers
  const handleContrastChange = useCallback((value) => {
    setControls(prev => ({ ...prev, contrast: value }))
  }, [])

  const handleThresholdChange = useCallback((value) => {
    setControls(prev => ({ ...prev, threshold: value }))
  }, [])

  const handleDetailLevelChange = useCallback((value) => {
    setControls(prev => ({ ...prev, detailLevel: value }))
  }, [])

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Espacio de Trabajo del Editor</h1>
          <p className="text-gray-600">Sube una imagen y conviértela en un diseño SVG optimizado para grabado láser</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Upload and Controls */}
          <div className="space-y-6">
            <ImageUploader
              onImageUpload={handleImageUpload}
              currentImage={originalImage}
              onClearImage={handleClearImage}
            />
            
            {originalImage && (
              <ImageControls
                contrast={controls.contrast}
                threshold={controls.threshold}
                detailLevel={controls.detailLevel}
                onContrastChange={handleContrastChange}
                onThresholdChange={handleThresholdChange}
                onDetailLevelChange={handleDetailLevelChange}
              />
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-2">
            <ImagePreview
              originalImage={originalImage}
              processedImage={controls}
              svgContent={svgContent}
              onDownloadSVG={handleDownloadSVG}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorWorkspace
