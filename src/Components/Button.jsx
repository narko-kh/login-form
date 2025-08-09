import React from 'react'

export default function Button({children, className, type}) {
  return (
    <button
          type={type}
          className={`w-full h-12 text-sm -mt-1 mb-5 font-bold flex items-center justify-center text-primary-text-dark rounded-xl bg-primary hover:bg-[#368cff] focus-within:scale-[.99] transition-all duration-150 ${className}`}
        >
          {children}
        </button>
  )
}
