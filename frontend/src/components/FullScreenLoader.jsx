import React from 'react'

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
        </div>

        <p className="text-gray-600 text-sm mt-4">
          Checking authentication...
        </p>
      </div>
    </div>
  )
}

export default FullScreenLoader