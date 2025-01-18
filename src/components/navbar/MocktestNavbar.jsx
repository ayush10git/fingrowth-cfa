import Image from "next/image";
import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import { RectangleVertical } from "lucide-react";
import Progress from "../mocktest/Progress";

const MocktestNavbar = ({currentQuestion}) => {
  return (
    <div className="">
      <div className="flex justify-between items-center bg-[#4D4C4D] px-2 min-h-[70px] text-white">
        <div className="flex flex-col">
          <span>Page: {currentQuestion + 1}</span>
          <span>Section: Introduction</span>
        </div>
        <div className="flex items-center gap-4">
          <RectangleVertical />
          <div className="flex flex-col">
            <span>Quantitative Methods</span>
            <span>00:11:15</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Progress />
          <button className="px-7 py-3 bg-gray-300 text-[#4D4C4D] text-lg font-semibold rounded-md">
            Finish Test
          </button>
        </div>
      </div>
      <div className="flex justify-between bg-[#8CC63F] px-2 text-white">
        <span>Test: CFA Online Tutorial</span>
        <span>Candidate: USER Demo</span>
      </div>
    </div>
  );
};

export default MocktestNavbar;
