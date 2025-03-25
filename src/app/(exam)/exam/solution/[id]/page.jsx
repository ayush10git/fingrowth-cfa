"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Box from "@mui/material/Box";
import { useState } from "react";
import { questionAttempts, questions } from "../../../../../utils/data";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import SolutionSidebar from "@/components/sidebar/SolutionSidebar";

const Page = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const totalQuestions = questions.questions.length;

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const currentQuestion = questions.questions[currentQuestionIndex];
  const currentAttempt = questionAttempts.questionAttempts.find(
    (attempt) => attempt.question_id === currentQuestion.question_id
  );

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <SolutionSidebar
        handleQuestionClick={handleQuestionClick}
        totalQuestions={totalQuestions}
        activeQuestionIndex={currentQuestionIndex}
        questionAttempts={questionAttempts.questionAttempts.map((attempt) => ({
          ...attempt,
          correct_answer: questions.questions.find(
            (q) => q.question_id === attempt.question_id
          )?.answer,
        }))}
      />

      {/* Main Content */}
      <div className="flex flex-col gap-3 p-4 w-full">
        <div className="flex gap-3">
          <div className="flex flex-col h-[calc(100vh-128px)] w-[75%]">
            <div className="w-full">
              <div
                className={`border rounded-t-md p-2 flex justify-between ${
                  currentAttempt.answer_given === currentQuestion.answer
                    ? "border-[#11AC04]"
                    : currentAttempt.answer_given
                    ? "border-red-600"
                    : "bg-transparent"
                }`}
              >
                <div className="w-full">
                  <p className="font-semibold">{currentQuestion.question}</p>
                  <div className="mt-5">
                    <p className="my-2">A: {currentQuestion.option_a}</p>
                    <p className="my-2">B: {currentQuestion.option_b}</p>
                    <p className="my-2">C: {currentQuestion.option_c}</p>
                  </div>
                </div>
              </div>

              <div
                className={`border border-[#11AC04] border-t-0 rounded-b-md ${
                  currentAttempt.answer_given === currentQuestion.answer
                    ? "border-[#11AC04] bg-[#11AC04] bg-opacity-30"
                    : currentAttempt.answer_given
                    ? "border-red-600 bg-red-500 bg-opacity-20"
                    : "bg-transparent"
                }`}
              >
                <p className="p-2">
                  <strong>Explanation: </strong>
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-[25%]">
            <div className="flex flex-col border border-gray-400 p-3 rounded-lg">
              <span>Subject: Subject A</span>
              <span>Topic: Topic A</span>
            </div>
            <div className="flex flex-col border border-gray-400 p-3 rounded-lg">
              <span>
                Correct:{" "}
                {currentAttempt.answer_given === currentQuestion.answer ? (
                  <CheckCircleIcon className="text-green-500" />
                ) : (
                  <CancelIcon className="text-red-500" />
                )}
              </span>
              <span className="">
                Confidence: <span className="">Sure</span>
              </span>
            </div>

            {/* Modal Trigger */}
            <div
              className={`flex flex-col justify-between h-[250px] border border-gray-400 p-3 rounded-lg ${
                isModalOpen && "hidden"
              }`}
              onClick={openModal}
            >
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Still have doubts? Ask here
                </span>
                <ArrowUpRight />
              </div>

              <div className="flex items-center bg-gray-300 rounded-full px-2 py-1 shadow-sm">
                <input
                  type="text"
                  placeholder="Type here..."
                  className="bg-transparent flex-grow outline-none text-gray-700 placeholder-gray-500 px-2"
                />
                <button className="bg-gray-400 text-white w-8 h-8 flex items-center justify-center rounded-full">
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-10">
          <button
            className="px-4 py-1 rounded-md border-2 text-[#527ab6] border-[#527ab6] flex items-center gap-2 text-md disabled:border-opacity-40 disabled:text-opacity-50"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            Previous
            <ArrowBackIcon className="text-base mt-1" />
          </button>
          <button
            className="px-4 py-1 rounded-md border-2 text-[#527ab6] border-[#527ab6] flex items-center gap-2 text-md disabled:border-opacity-40 disabled:text-opacity-50"
            onClick={handleNext}
            disabled={currentQuestionIndex === totalQuestions - 1}
          >
            Next
            <ArrowForwardIcon className="text-base mt-1" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[800px] h-[500px]">
            <div
              className="flex flex-col justify-between h-full border border-gray-400 p-3 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Still have doubts? Ask here
                </span>
                <ArrowUpRight onClick={closeModal} />
              </div>

              <div className="flex items-center bg-gray-300 rounded-full px-2 py-1 shadow-sm">
                <input
                  type="text"
                  placeholder="Type here..."
                  className="bg-transparent flex-grow outline-none text-gray-700 placeholder-gray-500 px-2"
                />
                <button className="bg-gray-400 text-white w-8 h-8 flex items-center justify-center rounded-full">
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
