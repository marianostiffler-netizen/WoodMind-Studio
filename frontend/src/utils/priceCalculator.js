// Price calculation engine for WoodMind Studio
export class PriceCalculator {
  constructor() {
    this.woodTypes = {
      pine: { basePrice: 15, complexity: 1.0, timeMultiplier: 1.0 },
      oak: { basePrice: 25, complexity: 1.2, timeMultiplier: 1.1 },
      cedar: { basePrice: 35, complexity: 1.1, timeMultiplier: 1.0 },
      walnut: { basePrice: 45, complexity: 1.3, timeMultiplier: 1.2 },
      mahogany: { basePrice: 55, complexity: 1.4, timeMultiplier: 1.3 }
    }

    this.baseProductionCost = 50 // Base cost per job
    this.laserTimePerCm2 = 0.5 // minutes per cm²
    this.preparationTime = 10 // fixed preparation time in minutes
  }

  calculatePrice(dimensions, woodType, svgComplexity = 1) {
    const { width, height, depth } = dimensions
    const area = width * height
    
    // Get wood properties
    const wood = this.woodTypes[woodType] || this.woodTypes.oak
    
    // Material cost
    const materialCost = area * wood.basePrice
    
    // Depth adjustment
    const depthMultiplier = Math.max(1, depth / 2) // 2cm is baseline
    
    // Complexity calculation based on SVG
    const complexityMultiplier = svgComplexity * wood.complexity
    
    // Production cost
    const productionCost = this.baseProductionCost * complexityMultiplier
    
    // Total material cost
    const totalMaterialCost = materialCost * depthMultiplier
    
    // Total price
    const totalPrice = totalMaterialCost + productionCost
    
    // Time calculation
    const laserTime = area * this.laserTimePerCm2 * wood.timeMultiplier
    const totalTime = this.preparationTime + laserTime
    
    return {
      area: area.toFixed(1),
      materialCost: totalMaterialCost.toFixed(2),
      productionCost: productionCost.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      complexity: complexityMultiplier.toFixed(2),
      engravingTime: `${Math.round(laserTime)} min`,
      preparationTime: `${this.preparationTime} min`,
      totalTime: `${Math.round(totalTime)} min`,
      breakdown: {
        material: totalMaterialCost.toFixed(2),
        production: productionCost.toFixed(2),
        depthAdjustment: depthMultiplier.toFixed(2)
      }
    }
  }

  calculateSVGComplexity(svgContent) {
    if (!svgContent) return 1.0

    // Count path elements and their complexity
    const pathCount = (svgContent.match(/<path/g) || []).length
    const circleCount = (svgContent.match(/<circle/g) || []).length
    const rectCount = (svgContent.match(/<rect/g) || []).length
    
    const totalElements = pathCount + circleCount + rectCount
    
    // Calculate complexity based on element count
    let complexity = 1.0
    
    if (totalElements > 100) complexity = 1.5
    else if (totalElements > 50) complexity = 1.3
    else if (totalElements > 20) complexity = 1.2
    else if (totalElements > 10) complexity = 1.1
    
    // Additional complexity for curves
    const curveCount = (svgContent.match(/C|Q|S/g) || []).length
    const curveRatio = curveCount / Math.max(totalElements, 1)
    
    if (curveRatio > 0.3) complexity *= 1.2
    else if (curveRatio > 0.1) complexity *= 1.1
    
    return Math.min(complexity, 2.0) // Cap at 2x complexity
  }

  // Calculate safe engraving margins
  calculateSafeArea(dimensions) {
    const margin = 1.0 // 1cm margin on all sides
    return {
      width: Math.max(dimensions.width - (margin * 2), 5),
      height: Math.max(dimensions.height - (margin * 2), 5),
      margin: margin
    }
  }

  // Scale SVG to fit safe area
  scaleSVGToSafeArea(svgBounds, safeArea) {
    const scaleX = safeArea.width / svgBounds.width
    const scaleY = safeArea.height / svgBounds.height
    const scale = Math.min(scaleX, scaleY, 1.0) // Don't upscale
    
    return {
      scale: scale,
      scaledWidth: svgBounds.width * scale,
      scaledHeight: svgBounds.height * scale
    }
  }
}

export const priceCalculator = new PriceCalculator()
