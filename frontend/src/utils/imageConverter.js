// Image to SVG conversion utility
export class ImageToSVGConverter {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
  }

  async convertImageToSVG(imageData, options = {}) {
    const {
      threshold = 128,
      contrast = 100,
      detailLevel = 'medium'
    } = options

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        try {
          // Set canvas size
          this.canvas.width = img.width
          this.canvas.height = img.height

          // Apply contrast and draw image
          this.ctx.filter = `contrast(${contrast}%)`
          this.ctx.drawImage(img, 0, 0)

          // Get image data
          const imageData = this.ctx.getImageData(0, 0, img.width, img.height)
          
          // Convert to SVG path
          const svgContent = this.imageDataToSVG(imageData, threshold, detailLevel)
          
          resolve(svgContent)
        } catch (error) {
          reject(error)
        }
      }
      img.onerror = reject
      img.src = imageData
    })
  }

  imageDataToSVG(imageData, threshold, detailLevel) {
    const { width, height, data } = imageData
    const paths = []
    
    // Simple edge detection and path generation
    const visited = new Array(width * height).fill(false)
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4
        const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3
        
        if (brightness < threshold && !visited[y * width + x]) {
          const path = this.tracePath(data, width, height, x, y, threshold, visited, detailLevel)
          if (path.length > 0) {
            paths.push(path)
          }
        }
      }
    }

    // Generate SVG
    const svgWidth = width
    const svgHeight = height
    
    let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`
    svg += '<path d="'
    
    paths.forEach(path => {
      svg += path.join(' ')
    })
    
    svg += '" fill="black" stroke="none" />'
    svg += '</svg>'

    return svg
  }

  tracePath(data, width, height, startX, startY, threshold, visited, detailLevel) {
    const path = []
    const stack = [[startX, startY]]
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1], // cardinal directions
      [-1, -1], [-1, 1], [1, -1], [1, 1] // diagonal directions
    ]

    // Skip diagonal directions for low detail
    const maxDirections = detailLevel === 'low' ? 4 : 8
    const stepSize = detailLevel === 'high' ? 1 : 2

    while (stack.length > 0) {
      const [x, y] = stack.pop()
      const idx = y * width + x

      if (x < 0 || x >= width || y < 0 || y >= height || visited[idx]) {
        continue
      }

      const pixelIdx = (y * width + x) * 4
      const brightness = (data[pixelIdx] + data[pixelIdx + 1] + data[pixelIdx + 2]) / 3

      if (brightness >= threshold) {
        continue
      }

      visited[idx] = true
      path.push(`L${x},${y}`)

      // Check neighbors
      for (let i = 0; i < maxDirections; i++) {
        const [dx, dy] = directions[i]
        const nx = x + dx * stepSize
        const ny = y + dy * stepSize
        const nIdx = ny * width + nx

        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited[nIdx]) {
          stack.push([nx, ny])
        }
      }
    }

    // Convert to proper path format
    if (path.length > 0) {
      path[0] = path[0].replace('L', 'M') // First point should be MoveTo
    }

    return path
  }

  downloadSVG(svgContent, filename = 'woodmind-design.svg') {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

export const imageConverter = new ImageToSVGConverter()
