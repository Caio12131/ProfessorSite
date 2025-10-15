import type React from "react"

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"
  text?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "medium", text }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 border-t-purple-600 border-r-purple-300 border-b-purple-100 border-l-purple-300 rounded-full animate-spin`}
      ></div>
      {text && <p className="mt-3 text-gray-600">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
