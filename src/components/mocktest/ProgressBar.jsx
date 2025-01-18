"use client";
import { useState, useEffect } from "react";

const ProgressBar = () => {
  const solved = 20;
  const total = 33;
  const percentage = ((solved / total) * 100).toFixed(0);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const animateBars = () => {
      setWidth(percentage);
    };
    animateBars();
  }, [percentage]);
  return (
    <div className="">
      <div className="flex items-center justify-center gap-4 w-full">
        <div className="flex-grow">
          <Bar
            label="Completion"
            
            width={width}
            color="#8E6FD8"
            percentage={percentage}
          />
        </div>
      </div>
    </div>
  );
};

const Bar = ({ label, width, color, percentage }) => (
  <div className="w-full">
    <div className="flex justify-between mb-1">
      <div className="text-sm text-gray-600">{label}</div>{" "}
      {/* Display Easy, Medium, Hard */}
      <div className="text-sm text-gray-600">{percentage}%</div>
    </div>

    <div className="bg-gray-300 h-3 w-full rounded-lg overflow-hidden">
      <div
        className="h-3 rounded-lg"
        style={{
          width: `${width}%`,
          backgroundColor: color,
          transition: "width 1s ease-out",
        }}
      ></div>
    </div>
  </div>
);

export default ProgressBar;
