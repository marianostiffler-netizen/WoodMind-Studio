import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  shouldShowDebugDetails() {
    try {
      if (typeof window === 'undefined') return false
      const params = new URLSearchParams(window.location.search)
      return params.get('debug') === '1'
    } catch {
      return false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Always log errors to console (needed to diagnose production/Vercel issues)
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Something went wrong
              </h2>
              
              <p className="text-gray-600 mb-6">
                We're sorry, but something unexpected happened. The error has been logged and we'll look into it.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full px-4 py-2 bg-wood-600 text-white rounded-lg hover:bg-wood-700 transition-colors"
                >
                  Try Again
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Go Home
                </button>
              </div>
              
              {(import.meta.env.DEV || this.shouldShowDebugDetails()) && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    Error Details (Development)
                  </summary>
                  <div className="mt-2 p-4 bg-gray-100 rounded text-xs font-mono text-red-600 overflow-auto max-h-40">
                    <div className="font-bold mb-2">Error:</div>
                    <div className="mb-4">{this.state.error.toString()}</div>
                    
                    <div className="font-bold mb-2">Stack Trace:</div>
                    <div>{this.state.errorInfo.componentStack}</div>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
