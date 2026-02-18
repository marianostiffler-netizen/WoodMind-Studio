import React from 'react'
import toast from 'react-hot-toast'

// Custom toast configuration for WoodMind Studio
export const showToast = {
  success: (message, options = {}) => {
    return toast.success(message, {
      duration: 3000,
      style: {
        background: '#10b981',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10b981',
      },
      ...options
    })
  },

  error: (message, options = {}) => {
    return toast.error(message, {
      duration: 5000,
      style: {
        background: '#ef4444',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#ef4444',
      },
      ...options
    })
  },

  info: (message, options = {}) => {
    return toast(message, {
      duration: 4000,
      style: {
        background: '#8B4513',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#8B4513',
      },
      ...options
    })
  },

  warning: (message, options = {}) => {
    return toast(message, {
      duration: 4000,
      style: {
        background: '#f59e0b',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#f59e0b',
      },
      ...options
    })
  },

  loading: (message, options = {}) => {
    return toast.loading(message, {
      style: {
        background: '#8B4513',
        color: '#fff',
      },
      ...options
    })
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId)
  },

  remove: () => {
    toast.remove()
  }
}

export default showToast
