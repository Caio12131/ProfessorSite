"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"
  showText?: boolean
  text?: string
  className?: string
}

export default function LoadingSpinner({
  size = "medium",
  showText = false,
  text = "Carregando...",
  className,
}: LoadingSpinnerProps) {
  const [rotation, setRotation] = useState(0)

  // Animate the inner circle rotation independently with faster speed
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360) // Increased rotation speed
    }, 10) // Reduced interval for faster rotation

    return () => clearInterval(interval)
  }, [])

  // Size classes for the container
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  }

  // Text size classes
  const textSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center w-full h-full", className)}>
      <div className={`${sizeClasses[size]} relative mx-auto`}>
        {/* Outer spinning ring with gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 animate-spin">
          <div className="absolute inset-[2px] bg-white dark:bg-gray-900 rounded-full"></div>
        </div>

        {/* Additional spinning ring in opposite direction */}
        <div className="absolute inset-[4px] rounded-full border-2 border-dashed border-green-300 animate-reverse-spin"></div>

        {/* Middle pulsating ring */}
        <div
          className="absolute inset-0 rounded-full opacity-70"
          style={{
            background: "radial-gradient(circle, rgba(52,211,153,0.3) 0%, rgba(16,185,129,0.2) 70%, transparent 100%)",
            animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        ></div>

        {/* Inner spinning dots - more dots and varied animations */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-full">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-600 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${i * 45}deg) translateY(-${size === "small" ? "6" : size === "medium" ? "9" : "12"}px) translateX(-50%)`,
                  opacity: 0.7,
                  animation: `pulse 1.2s ease-in-out ${i * 0.15}s infinite`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Orbiting particles */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={`orbit-${i}`}
              className="absolute w-1.5 h-1.5 bg-green-300 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "center",
                animation: `orbit ${1 + i * 0.5}s linear infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Center circle with emoji */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="bg-white dark:bg-gray-800 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 flex items-center justify-center"
            style={{
              width: size === "small" ? "40%" : size === "medium" ? "40%" : "40%",
              height: size === "small" ? "40%" : size === "medium" ? "40%" : "40%",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              transform: `rotate(${rotation}deg)`,
            }}
          >
            
            <span className={size === "small" ? "text-lg" : size === "medium" ? "text-xl" : "text-2xl"}>🥦</span>
            
          </div>
        </div>
      </div>

      {showText && (
        <div
          className={`mt-4 ${textSizeClasses[size]} text-gray-700 dark:text-gray-300 font-medium text-center`}
          style={{
            animation: "fadeInOut 2s ease-in-out infinite",
          }}
        >
          {text}
        </div>
      )}

      {/* Add keyframes for custom animations */}
      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(${size === "small" ? "7" : size === "medium" ? "10" : "13"}px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(${size === "small" ? "7" : size === "medium" ? "10" : "13"}px) rotate(-360deg); }
        }
        
        @keyframes reverse-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  )
}

