import React, { useRef, useEffect, useState, useCallback } from 'react'

function CanvasSimple({ 
  svgContent, 
  selectedTool, 
  boardDimensions,
  woodType = 'oak',
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

  // Simple wood background
  const drawWoodBackground = useCallback((ctx) => {
    const scale = calculateScale()
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    
    // Draw wood board
    const boardWidth = boardDimensions.width * scale
    const boardHeight = boardDimensions.height * scale
    const boardX = (canvasSize.width - boardWidth) / 2
    const boardY = (canvasSize.height - boardHeight) / 2
    
    // Simple wood gradient
    const gradient = ctx.createLinearGradient(boardX, boardY, boardX + boardWidth, boardY)
    gradient.addColorStop(0, '#8B4513')
    gradient.addColorStop(1, '#5C3A1E')
    
    ctx.fillStyle = gradient
    ctx.fillRect(boardX, boardY, boardWidth, boardHeight)
    
    // Border
    ctx.strokeStyle = '#2a2a2a'
    ctx.lineWidth = 2
    ctx.strokeRect(boardX, boardY, boardWidth, boardHeight)
    
    return { boardX, boardY, boardWidth, boardHeight, scale }
  }, [boardDimensions, canvasSize, calculateScale])

  // Draw SVG content
  const drawSVG = useCallback((ctx, position) => {
    if (!svgContent) return
    
    const { boardX, boardY, scale } = position
    
    // Create image from SVG
    const img = new Image()
    img.onload = () => {
      const svgX = boardX + 10 // Offset from edge
      const svgY = boardY + 10
      const maxWidth = (position.boardWidth - 20)
      const maxHeight = (position.boardHeight - 20)
      
      // Calculate scaled dimensions
      const imgRatio = img.width / img.height
      let scaledWidth = maxWidth
      let scaledHeight = maxWidth / imgRatio
      
      if (scaledHeight > maxHeight) {
        scaledHeight = maxHeight
        scaledWidth = maxHeight * imgRatio
      }
      
      ctx.drawImage(img, svgX, svgY, scaledWidth, scaledHeight)
    }
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgContent)
  }, [svgContent])

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

export default CanvasSimple
