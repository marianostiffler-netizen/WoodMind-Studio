import { Routes, Route } from 'react-router-dom'
import { ProjectProvider } from './context/ProjectContext.jsx'
import Layout from './components/Layout/Layout.jsx'
import HomePage from './components/Layout/HomePage.jsx'
import EditorWorkspace from './components/Editor/EditorWorkspace.jsx'
import Viewer3DWorkspace from './components/Viewer3D/Viewer3DWorkspace.jsx'
import PricingWorkspace from './components/Pricing/PricingWorkspace.jsx'
import ErrorBoundary from './components/UI/ErrorBoundary.jsx'

function App() {
  return (
    <ErrorBoundary>
      <ProjectProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/editor" element={
              <Layout>
                <EditorWorkspace />
              </Layout>
            } />
            <Route path="/viewer" element={
              <Layout>
                <Viewer3DWorkspace />
              </Layout>
            } />
            <Route path="/pricing" element={
              <Layout>
                <PricingWorkspace />
              </Layout>
            } />
          </Routes>
        </div>
      </ProjectProvider>
    </ErrorBoundary>
  )
}

export default App
