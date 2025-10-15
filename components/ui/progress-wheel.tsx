interface ProgressWheelProps {
  currentDays: number;
  totalDays: number;
  progressPercentage: number;
  remainingDays: number;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

export function ProgressWheel({ 
  currentDays, 
  totalDays, 
  progressPercentage, 
  remainingDays,
  size = "md",
  showLabels = true
}: ProgressWheelProps) {
  const sizeClasses = {
    sm: "w-16 h-16 text-lg",
    md: "w-24 h-24 text-2xl",
    lg: "w-32 h-32 text-3xl"
  };

  const borderSize = {
    sm: "border-2",
    md: "border-4",
    lg: "border-6"
  };

  const textSize = {
    sm: "text-sm",
    md: "text-2xl",
    lg: "text-3xl"
  };

  const labelSize = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm"
  };

  return (
    <div className="text-center mb-6">
      <div className="relative inline-block mb-3">
        <div className={`${sizeClasses[size]} rounded-full ${borderSize[size]} border-gray-100 flex items-center justify-center`}>
          <div className="text-center">
            <div className={`font-bold text-gray-800 ${textSize[size]}`}>
              {currentDays}
            </div>
            <div className={`text-gray-400 ${labelSize[size]}`}>dias</div>
          </div>
        </div>
        <div 
          className={`absolute inset-0 rounded-full ${borderSize[size]} border-transparent border-t-green-500`}
          style={{transform: `rotate(${progressPercentage * 3.6}deg)`}}
        />
      </div>
      
      {showLabels && (
        <div className="flex justify-center items-center gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-gray-800">{Math.round(progressPercentage)}%</div>
            <div className="text-gray-400 text-xs">progresso</div>
          </div>
          <div className="w-px h-6 bg-gray-200"></div>
          <div className="text-center">
            <div className="font-semibold text-gray-800">{remainingDays}</div>
            <div className="text-gray-400 text-xs">restantes</div>
          </div>
        </div>
      )}
    </div>
  );
}
