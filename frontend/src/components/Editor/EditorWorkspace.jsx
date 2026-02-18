import React from 'react'

function EditorWorkspace() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Editor Workspace</h1>
        <p className="text-xl text-gray-600 mb-8">Design your wood projects with our advanced tools</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Upload Image</h3>
            <p className="text-gray-600">Convert your images to SVG format</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Edit Design</h3>
            <p className="text-gray-600">Fine-tune your wood patterns</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Preview</h3>
            <p className="text-gray-600">See your design in real-time</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorWorkspace
