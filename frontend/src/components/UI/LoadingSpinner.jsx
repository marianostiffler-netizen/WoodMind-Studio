import React from 'react'

export function LoadingSpinner({ size = 'md', message = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`${sizeClasses[size]} loading-spinner`} />
      {message && (
        <p className="mt-4 text-sm text-gray-600 animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner
