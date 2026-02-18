import React, { useRef, useEffect, useState, useCallback } from 'react'

function Canvas({ 
  svgContent, 
  selectedTool, 
  boardDimensions,
  woodType,
  onCanvasUpdate 
}) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })

  // Calculate scale to fit board in canvas
  const calculateScale = useCallback(() => {
    if (!canvasRef.current) return 1
    
    const canvas = canvasRef.current
    const maxWidth = canvas.clientWidth - 40 // Padding
    const maxHeight = canvas.clientHeight - 40
    
    const scaleX = maxWidth / boardDimensions.width
    const scaleY = maxHeight / boardDimensions.height
    
    return Math.min(scaleX, scaleY, 4) // Max 4x zoom for 4K quality
  }, [boardDimensions])

  // Draw wood background with enhanced 4K quality
  const drawWoodBackground = useCallback((ctx) => {
    const scale = calculateScale()
    
    // Clear canvas with dark background
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    
    // Draw wood board with enhanced quality
    const boardWidth = boardDimensions.width * scale
    const boardHeight = boardDimensions.height * scale
    const boardX = (canvasSize.width - boardWidth) / 2
    const boardY = (canvasSize.height - boardHeight) / 2
    
    // Enhanced wood texture simulation with multiple gradients
    const mainGradient = ctx.createLinearGradient(boardX, boardY, boardX + boardWidth, boardY)
    const depthGradient = ctx.createLinearGradient(boardX, boardY, boardX, boardY + boardHeight)
    
    switch(woodType) {
      case 'pine':
        mainGradient.addColorStop(0, '#F5DEB3')
        mainGradient.addColorStop(0.3, '#DEB887')
        mainGradient.addColorStop(0.6, '#D4A574')
        mainGradient.addColorStop(1, '#C8A96E')
        depthGradient.addColorStop(0, 'rgba(245, 222, 179, 0.3)')
        depthGradient.addColorStop(1, 'rgba(200, 169, 110, 0.3)')
        break
      case 'oak':
        mainGradient.addColorStop(0, '#D2691E')
        mainGradient.addColorStop(0.3, '#A0522D')
        mainGradient.addColorStop(0.6, '#8B4513')
        mainGradient.addColorStop(1, '#703610')
        depthGradient.addColorStop(0, 'rgba(210, 105, 30, 0.3)')
        depthGradient.addColorStop(1, 'rgba(112, 54, 16, 0.3)')
        break
      case 'cedar':
        mainGradient.addColorStop(0, '#F4E4C1')
        mainGradient.addColorStop(0.3, '#E6D4B1')
        mainGradient.addColorStop(0.6, '#D2B48C')
        mainGradient.addColorStop(1, '#BC9A6A')
        depthGradient.addColorStop(0, 'rgba(244, 228, 177, 0.3)')
        depthGradient.addColorStop(1, 'rgba(188, 154, 106, 0.3)')
        break
      case 'walnut':
        mainGradient.addColorStop(0, '#8B6F47')
        mainGradient.addColorStop(0.3, '#6B4423')
        mainGradient.addColorStop(0.6, '#5C3A1E')
        mainGradient.addColorStop(1, '#3E2723')
        depthGradient.addColorStop(0, 'rgba(139, 111, 71, 0.3)')
        depthGradient.addColorStop(1, 'rgba(62, 39, 35, 0.3)')
        break
      case 'mahogany':
        mainGradient.addColorStop(0, '#D2691E')
        mainGradient.addColorStop(0.3, '#C04000')
        mainGradient.addColorStop(0.6, '#8B2500')
        mainGradient.addColorStop(1, '#654321')
        depthGradient.addColorStop(0, 'rgba(210, 105, 30, 0.3)')
        depthGradient.addColorStop(1, 'rgba(101, 67, 33, 0.3)')
        break
      default:
        mainGradient.addColorStop(0, '#8B4513')
        mainGradient.addColorStop(1, '#5C3A1E')
        depthGradient.addColorStop(0, 'rgba(139, 69, 19, 0.3)')
        depthGradient.addColorStop(1, 'rgba(92, 58, 30, 0.3)')
    }
    
    // Apply main gradient
    ctx.fillStyle = mainGradient
    ctx.fillRect(boardX, boardY, boardWidth, boardHeight)
    
    // Apply depth gradient for 3D effect
    ctx.fillStyle = depthGradient
    ctx.fillRect(boardX, boardY, boardWidth, boardHeight)
    
    // Enhanced wood grain with realistic patterns
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'
    ctx.lineWidth = 0.8
    
    // Main grain lines
    for (let i = 0; i < boardHeight; i += 12) {
      ctx.beginPath()
      ctx.moveTo(boardX, boardY + i)
      // Add slight wave to grain
      const wave = Math.sin(i * 0.1) * 2
      ctx.lineTo(boardX + boardWidth, boardY + i + wave)
      ctx.stroke()
    }
    
    // Fine grain details
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)'
    ctx.lineWidth = 0.3
    for (let i = 0; i < boardHeight; i += 4) {
      ctx.beginPath()
      ctx.moveTo(boardX, boardY + i)
      ctx.lineTo(boardX + boardWidth, boardY + i)
      ctx.stroke()
    }
    
    // Enhanced border with shadow effect
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    ctx.shadowBlur = 4
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.strokeStyle = '#2a2a2a'
    ctx.lineWidth = 3
    ctx.strokeRect(boardX, boardY, boardWidth, boardHeight)
    
    // Reset shadow
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    
    // Enhanced safe area (engraving margin) with better visibility
    const margin = 15 * scale // 15mm margin for professional look
    ctx.strokeStyle = '#FFD700' // Gold color for professional appearance
    ctx.lineWidth = 2
    ctx.setLineDash([8, 4])
    ctx.strokeRect(
      boardX + margin, 
      boardY + margin, 
      boardWidth - (margin * 2), 
      boardHeight - (margin * 2)
    )
    ctx.setLineDash([])
    
    // Add corner markers for professional look
    ctx.fillStyle = '#FFD700'
    const markerSize = 8
    ctx.fillRect(boardX + margin - markerSize/2, boardY + margin - markerSize/2, markerSize, markerSize)
    ctx.fillRect(boardX + boardWidth - margin - markerSize/2, boardY + margin - markerSize/2, markerSize, markerSize)
    ctx.fillRect(boardX + margin - markerSize/2, boardY + boardHeight - margin - markerSize/2, markerSize, markerSize)
    ctx.fillRect(boardX + boardWidth - margin - markerSize/2, boardY + boardHeight - margin - markerSize/2, markerSize, markerSize)
    
    return { boardX, boardY, boardWidth, boardHeight, scale }
  }, [boardDimensions, woodType, canvasSize, calculateScale])

  // Draw SVG content
  const drawSVG = useCallback((ctx, position) => {
    if (!svgContent) return
    
    const { boardX, boardY, scale } = position
    
    // Create temporary div to render SVG
    const div = document.createElement('div')
    div.innerHTML = svgContent
    const svgElement = div.querySelector('svg')
    
    if (svgElement) {
      const img = new Image()
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(svgBlob)
      
      img.onload = () => {
        // Scale SVG to fit safe area
        const safeMargin = 10 * scale
        const maxWidth = (boardDimensions.width * scale) - (safeMargin * 2)
        const maxHeight = (boardDimensions.height * scale) - (safeMargin * 2)
        
        const svgScale = Math.min(
          maxWidth / img.width,
          maxHeight / img.height,
          1
        )
        
        const scaledWidth = img.width * svgScale
        const scaledHeight = img.height * svgScale
        
        // Center SVG in safe area
        const svgX = boardX + safeMargin + (maxWidth - scaledWidth) / 2
        const svgY = boardY + safeMargin + (maxHeight - scaledHeight) / 2
        
        ctx.drawImage(img, svgX, svgY, scaledWidth, scaledHeight)
        URL.revokeObjectURL(url)
      }
      
      img.src = url
    }
  }, [svgContent, boardDimensions])

  // Main render function
  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const position = drawWoodBackground(ctx)
    drawSVG(ctx, position)
  }, [drawWoodBackground, drawSVG])

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement
        setCanvasSize({
          width: container.clientWidth,
          height: container.clientHeight
        })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Re-render when dependencies change
  useEffect(() => {
    render()
  }, [render])

  // Mouse event handlers
  const handleMouseDown = useCallback((e) => {
    if (selectedTool === 'pen') {
      setIsDrawing(true)
      // TODO: Implement drawing logic
    }
  }, [selectedTool])

  const handleMouseMove = useCallback((e) => {
    if (isDrawing && selectedTool === 'pen') {
      // TODO: Implement drawing logic
    }
  }, [isDrawing, selectedTool])

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false)
  }, [])

  return (
    <div className="flex-1 bg-gray-900 relative">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="absolute inset-0 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {/* Canvas overlay info */}
      <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-90 text-white px-3 py-2 rounded-lg text-sm">
        <div>Canvas: {canvasSize.width} × {canvasSize.height}</div>
        <div>Tablero: {boardDimensions.width} × {boardDimensions.height} cm</div>
        <div>Escala: {calculateScale().toFixed(2)}x</div>
      </div>
    </div>
  )
}

export default Canvas
