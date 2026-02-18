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
            Diseña Madera.
            <span className="block text-wood-600">Visualiza. Cotiza.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transforma tus ideas en diseños profesionales de madera con nuestra plataforma avanzada. 
            Sube imágenes, convierte a SVG, visualiza en 3D y obtén cotizaciones instantáneas.
          </p>
          <Link
            to="/editor"
            onClick={handleStartDesigning}
            className="inline-flex items-center gap-3 px-8 py-4 bg-wood-600 text-white text-lg font-semibold rounded-lg hover:bg-wood-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Comenzar a Diseñar
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </header>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-wood-100 rounded-lg flex items-center justify-center mb-6">
              <PencilIcon className="w-8 h-8 text-wood-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Editor Inteligente</h3>
            <p className="text-gray-600 mb-4">
              Sube imágenes y conviértelas en archivos SVG limpios con nuestro algoritmo de trazado inteligente.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Interfaz de arrastrar y soltar</li>
              <li>• Vista previa en tiempo real</li>
              <li>• Múltiples formatos de exportación</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-wood-100 rounded-lg flex items-center justify-center mb-6">
              <CubeIcon className="w-8 h-8 text-wood-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Visualización 3D</h3>
            <p className="text-gray-600 mb-4">
              Ve tus diseños cobrar vida con texturas y materiales de madera realistas.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Renderizado 3D en tiempo real</li>
              <li>• Múltiples tipos de madera</li>
              <li>• Controles interactivos</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-wood-100 rounded-lg flex items-center justify-center mb-6">
              <CurrencyDollarIcon className="w-8 h-8 text-wood-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Cotización Instantánea</h3>
            <p className="text-gray-600 mb-4">
              Obtén cálculos de costos precisos basados en materiales, complejidad y tiempo de producción.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Cálculo de costos de materiales</li>
              <li>• Estimación de tiempo de máquina</li>
              <li>• Generación de cotizaciones</li>
            </ul>
          </div>
        </div>

        {/* Technology Section */}
        <section className="bg-white rounded-2xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-8">Potenciado por Tecnología Avanzada</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-wood-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-6 h-6 text-wood-600" />
              </div>
              <h4 className="font-semibold mb-2">Conversión con IA</h4>
              <p className="text-gray-600">
                Trazado inteligente de imágenes con optimización automática para CNC y corte láser
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-wood-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CogIcon className="w-6 h-6 text-wood-600" />
              </div>
              <h4 className="font-semibold mb-2">Validación Técnica</h4>
              <p className="text-gray-600">
                Verificaciones automáticas de fabricabilidad y restricciones de diseño
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-wood-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Listo para Producción</h4>
              <p className="text-gray-600">
                Exporta archivos optimizados listos para equipos de fabricación
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-6">¿Listo para Comenzar tu Proyecto?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a miles de profesionales que usan WoodMind Studio para sus proyectos de diseño de madera.
          </p>
          <Link
            to="/editor"
            onClick={handleStartDesigning}
            className="inline-flex items-center gap-3 px-8 py-4 bg-wood-600 text-white text-lg font-semibold rounded-lg hover:bg-wood-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Comenzar tu Primer Diseño
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </div>
  )
}

export default HomePage
