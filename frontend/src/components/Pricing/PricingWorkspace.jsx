import React from 'react'

function PricingWorkspace() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Pricing Workspace</h1>
        <p className="text-xl text-gray-600 mb-8">Get instant pricing for your wood projects</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Material Costs</h3>
            <p className="text-gray-600">Calculate based on wood type and dimensions</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Production Time</h3>
            <p className="text-gray-600">Estimate manufacturing duration</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Quote Generation</h3>
            <p className="text-gray-600">Get detailed cost breakdowns</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingWorkspace
