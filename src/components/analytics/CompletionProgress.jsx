"use client";
import { useState, useEffect } from "react";

const CompletionProgress = ({subject, completion}) => {

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const animateBars = () => {
      setWidth(completion);
    };
    animateBars();
  }, [completion]);
  return (
    <div className="">
      <div className="flex items-center justify-center gap-4 w-full">
        <div className="flex-grow">
          <Bar
            label={subject}
            width={width}
            color="#8E6FD8"
            percentage={completion}
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

export default CompletionProgress;
