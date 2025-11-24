import React from "react";

interface ProgressBarProps {
  progress: number;
  isExpired?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  isExpired = false,
}) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div
      className={`h-2.5 rounded-full transition-all duration-500 ${
        isExpired
          ? "bg-gray-400"
          : progress === 100
          ? "bg-green-500"
          : "bg-[#006a78]"
      }`}
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);
