"use client";
import { useState, useEffect } from "react";

const MockCompletionBar = ({ subject, completion }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const animateBars = () => {
      setHeight(completion);
    };
    animateBars();
  }, [completion]);

  return (
    <div className="flex flex-col items-center w-10 relative top-5">
      <div className="absolute top-0 right-[-20px] text-sm text-zinc-600">
        {completion}%
      </div>

      <Bar height={height} color="#8E6FD8" />

      <div className="absolute bottom-12 right-[-60px] w-[120px] text-sm text-zinc-600 rotate-90">
        {subject}
      </div>
    </div>
  );
};

const Bar = ({ height, color }) => (
  <div className="w-4 h-[445px] bg-gray-200 rounded-full overflow-hidden flex items-end">
    <div
      className="w-full rounded-full"
      style={{
        height: `${height}%`,
        backgroundColor: color,
        transition: "height 1s ease-out",
      }}
    ></div>
  </div>
);

export default MockCompletionBar;
