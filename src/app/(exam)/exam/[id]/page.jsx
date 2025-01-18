"use client";
import { useState, useEffect } from "react";
import QuestionSidebar from "@/components/sidebar/QuestionSidebar";
import { questions } from "../../../../utils/data";
import QuestionDisplay from "@/components/mocktest/QuestionDisplay";
import MocktestNavbar from "@/components/navbar/MocktestNavbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Page = () => {
  const ques = questions.questions;

  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCurrentQuestion =
        JSON.parse(localStorage.getItem("currentQuestion")) || 0;
      const savedSelectedAnswers =
        JSON.parse(localStorage.getItem("selectedAnswers")) || {};
      setCurrentQuestion(savedCurrentQuestion);
      setSelectedAnswers(savedSelectedAnswers);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
    }
  }, [currentQuestion, loading]);

  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
    }
  }, [selectedAnswers, loading]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // Navigate to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < ques.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-[15rem] bg-[#DFE7EB]">
      <MocktestNavbar currentQuestion={currentQuestion} />
      <div className="flex bg-white">
        <QuestionSidebar
          questions={ques}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          selectedAnswers={selectedAnswers} // Pass selectedAnswers here
        />

        <div className="flex flex-col justify-between flex-grow p-4 border border-gray-400 rounded-md m-1">
          <QuestionDisplay
            question={ques[currentQuestion]}
            selectedAnswers={selectedAnswers}
            handleAnswerSelect={handleAnswerSelect}
            currentQuestion={currentQuestion}
            totalQuestions={ques.length}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 h-[60px] bg-[#4D4C4D] px-2 py-2 font-semibold text-white border-t-4 border-[#8CC63F]">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
          className="px-7 py-3 bg-[#8CC63F] flex items-center rounded-md"
        >
          Prev
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={currentQuestion === ques.length - 1}
          className="px-7 py-3 bg-[#8CC63F] flex items-center rounded-md"
        >
          Next
        </button>
        <button className="px-7 py-3 bg-[#8CC63F] flex items-center rounded-md">
          Start Test
        </button>
      </div>
    </div>
  );
};

{
  /* <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="px-4 py-1 rounded-md border-2 text-[#527ab6] border-[#527ab6] flex items-center gap-2 text-md disabled:border-opacity-40 disabled:text-opacity-50"
            >
              <ArrowBackIcon className="mt-1" />
              Prev
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestion === ques.length - 1}
              className="px-4 py-1 rounded-md border-2 text-[#527ab6] border-[#527ab6] flex items-center gap-2 text-md disabled:border-opacity-40 disabled:text-opacity-50"
            >
              Next
              <ArrowForwardIcon className="mt-1"/>
            </button>
          </div> */
}

export default Page;
