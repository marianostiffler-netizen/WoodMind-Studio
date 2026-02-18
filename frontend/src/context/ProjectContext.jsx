import React, { createContext, useContext, useReducer } from 'react'

// Initial state
const initialState = {
  projectName: '',
  svgContent: null,
  boardDimensions: { width: 40, height: 30, depth: 2 },
  selectedWoodType: 'oak',
  originalImage: null,
  currentStep: 'home', // home, editor, viewer, pricing
}

// Action types
const actionTypes = {
  SET_PROJECT_NAME: 'SET_PROJECT_NAME',
  SET_SVG_CONTENT: 'SET_SVG_CONTENT',
  SET_BOARD_DIMENSIONS: 'SET_BOARD_DIMENSIONS',
  SET_WOOD_TYPE: 'SET_WOOD_TYPE',
  SET_ORIGINAL_IMAGE: 'SET_ORIGINAL_IMAGE',
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  RESET_PROJECT: 'RESET_PROJECT',
}

// Reducer
function projectReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_PROJECT_NAME:
      return { ...state, projectName: action.payload }
    
    case actionTypes.SET_SVG_CONTENT:
      return { ...state, svgContent: action.payload }
    
    case actionTypes.SET_BOARD_DIMENSIONS:
      return { 
        ...state, 
        boardDimensions: { ...state.boardDimensions, ...action.payload } 
      }
    
    case actionTypes.SET_WOOD_TYPE:
      return { ...state, selectedWoodType: action.payload }
    
    case actionTypes.SET_ORIGINAL_IMAGE:
      return { ...state, originalImage: action.payload }
    
    case actionTypes.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload }
    
    case actionTypes.RESET_PROJECT:
      return initialState
    
    default:
      return state
  }
}

// Create context
const ProjectContext = createContext()

// Provider component
export function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(projectReducer, initialState)

  // Actions
  const actions = {
    setProjectName: (name) => {
      dispatch({ type: actionTypes.SET_PROJECT_NAME, payload: name })
    },
    
    setSvgContent: (content) => {
      dispatch({ type: actionTypes.SET_SVG_CONTENT, payload: content })
    },
    
    setBoardDimensions: (dimensions) => {
      dispatch({ type: actionTypes.SET_BOARD_DIMENSIONS, payload: dimensions })
    },
    
    setWoodType: (woodType) => {
      dispatch({ type: actionTypes.SET_WOOD_TYPE, payload: woodType })
    },
    
    setOriginalImage: (image) => {
      dispatch({ type: actionTypes.SET_ORIGINAL_IMAGE, payload: image })
    },
    
    setCurrentStep: (step) => {
      dispatch({ type: actionTypes.SET_CURRENT_STEP, payload: step })
    },
    
    resetProject: () => {
      dispatch({ type: actionTypes.RESET_PROJECT })
    },
  }

  const value = {
    ...state,
    ...actions,
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}

// Hook to use the context
export function useProject() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}
