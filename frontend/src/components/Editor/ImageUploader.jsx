import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

function ImageUploader({ onImageUpload, currentImage, onClearImage }) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onImageUpload(e.target.result, file)
      }
      reader.readAsDataURL(file)
    }
    setIsDragActive(false)
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive: isDragActiveDropzone } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false)
  })

  return (
    <div className="w-full">
      {!currentImage ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive || isDragActiveDropzone
              ? 'border-wood-500 bg-wood-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            {isDragActive ? 'Suelta la imagen aquí' : 'Arrastra y suelta una imagen'}
          </p>
          <p className="text-sm text-gray-500 mb-4">o</p>
          <button className="px-4 py-2 bg-wood-600 text-white rounded-lg hover:bg-wood-700 transition-colors">
            Seleccionar archivo
          </button>
          <p className="text-xs text-gray-400 mt-4">
            Formatos aceptados: PNG, JPG (máx. 10MB)
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="border rounded-lg overflow-hidden">
            <img
              src={currentImage}
              alt="Uploaded"
              className="w-full h-64 object-contain bg-gray-50"
            />
          </div>
          <button
            onClick={onClearImage}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="mt-2 text-sm text-gray-600">
            <ImageIcon className="w-4 h-4 inline mr-1" />
            Imagen cargada correctamente
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
