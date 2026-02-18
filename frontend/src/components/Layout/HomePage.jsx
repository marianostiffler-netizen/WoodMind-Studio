import React from 'react'
import { Link } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext.jsx'
import { 
  ArrowRightIcon,
  PencilIcon,
  CubeIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  CogIcon
} from '@heroicons/react/24/outline'

function HomePage() {
  const { resetProject } = useProject()

  const handleStartDesigning = () => {
    resetProject()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wood-light to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Design Wood.
            <span className="block text-wood-600">Visualize. Price.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your ideas into professional wood designs with our advanced platform. 
            Upload images, convert to SVG, visualize in 3D, and get instant pricing.
          </p>
          <Link
            to="/editor"
            onClick={handleStartDesigning}
            className="inline-flex items-center gap-3 px-8 py-4 bg-wood-600 text-white text-lg font-semibold rounded-lg hover:bg-wood-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Designing
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </header>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-wood-100 rounded-lg flex items-center justify-center mb-6">
              <PencilIcon className="w-8 h-8 text-wood-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Smart Editor</h3>
            <p className="text-gray-600 mb-4">
              Upload images and convert them to clean SVG files with our intelligent tracing algorithm.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Drag & drop interface</li>
              <li>• Real-time preview</li>
              <li>• Multiple export formats</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-wood-100 rounded-lg flex items-center justify-center mb-6">
              <CubeIcon className="w-8 h-8 text-wood-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">3D Visualization</h3>
            <p className="text-gray-600 mb-4">
              See your designs come to life with realistic wood textures and materials.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Real-time 3D rendering</li>
              <li>• Multiple wood types</li>
              <li>• Interactive controls</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-wood-100 rounded-lg flex items-center justify-center mb-6">
              <CurrencyDollarIcon className="w-8 h-8 text-wood-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Instant Pricing</h3>
            <p className="text-gray-600 mb-4">
              Get accurate cost calculations based on materials, complexity, and production time.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Material cost calculation</li>
              <li>• Machine time estimation</li>
              <li>• Quote generation</li>
            </ul>
          </div>
        </div>

        {/* Technology Section */}
        <section className="bg-white rounded-2xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-8">Powered by Advanced Technology</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-wood-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-6 h-6 text-wood-600" />
              </div>
              <h4 className="font-semibold mb-2">AI-Powered Conversion</h4>
              <p className="text-gray-600">
                Smart image tracing with automatic optimization for CNC and laser cutting
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-wood-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CogIcon className="w-6 h-6 text-wood-600" />
              </div>
              <h4 className="font-semibold mb-2">Technical Validation</h4>
              <p className="text-gray-600">
                Automated checks for manufacturability and design constraints
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-wood-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Production Ready</h4>
              <p className="text-gray-600">
                Export optimized files ready for manufacturing equipment
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals using WoodMind Studio for their wood design projects.
          </p>
          <Link
            to="/editor"
            onClick={handleStartDesigning}
            className="inline-flex items-center gap-3 px-8 py-4 bg-wood-600 text-white text-lg font-semibold rounded-lg hover:bg-wood-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Your First Design
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </div>
  )
}

export default HomePage
