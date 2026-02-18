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
    
    return Math.min(scaleX, scaleY, 2) // Max 2x zoom
  }, [boardDimensions])

  // Draw wood background
  const drawWoodBackground = useCallback((ctx) => {
    const scale = calculateScale()
    
    // Clear canvas
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    
    // Draw wood board
    const boardWidth = boardDimensions.width * scale
    const boardHeight = boardDimensions.height * scale
    const boardX = (canvasSize.width - boardWidth) / 2
    const boardY = (canvasSize.height - boardHeight) / 2
    
    // Wood texture simulation
    const gradient = ctx.createLinearGradient(boardX, boardY, boardX + boardWidth, boardY)
    
    switch(woodType) {
      case 'pine':
        gradient.addColorStop(0, '#DEB887')
        gradient.addColorStop(0.5, '#D4A574')
        gradient.addColorStop(1, '#C8A96E')
        break
      case 'oak':
        gradient.addColorStop(0, '#C8A96E')
        gradient.addColorStop(0.5, '#8B4513')
        gradient.addColorStop(1, '#703610')
        break
      case 'cedar':
        gradient.addColorStop(0, '#E6D4B1')
        gradient.addColorStop(0.5, '#D2B48C')
        gradient.addColorStop(1, '#BC9A6A')
        break
      default:
        gradient.addColorStop(0, '#8B4513')
        gradient.addColorStop(1, '#5C3A1E')
    }
    
    ctx.fillStyle = gradient
    ctx.fillRect(boardX, boardY, boardWidth, boardHeight)
    
    // Draw wood grain lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.lineWidth = 0.5
    for (let i = 0; i < boardHeight; i += 8) {
      ctx.beginPath()
      ctx.moveTo(boardX, boardY + i)
      ctx.lineTo(boardX + boardWidth, boardY + i)
      ctx.stroke()
    }
    
    // Draw border
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 2
    ctx.strokeRect(boardX, boardY, boardWidth, boardHeight)
    
    // Draw safe area (engraving margin)
    const margin = 10 * scale // 10mm margin
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.strokeRect(
      boardX + margin, 
      boardY + margin, 
      boardWidth - (margin * 2), 
      boardHeight - (margin * 2)
    )
    ctx.setLineDash([])
    
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
