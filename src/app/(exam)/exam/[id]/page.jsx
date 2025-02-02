"use client"
import { useEffect, useState } from "react";
import QuestionDisplay from "@/components/mocktest/QuestionDisplay";
import MocktestNavbar from "@/components/navbar/MocktestNavbar";
import QuestionSidebar from "@/components/sidebar/QuestionSidebar";
import { questions } from "../../../../utils/data";

const Page = () => {
  const ques = questions.questions;

  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCurrentQuestion =
        JSON.parse(localStorage.getItem("currentQuestion")) || 0;
      const savedSelectedAnswers =
        JSON.parse(localStorage.getItem("selectedAnswers")) || {};
      const savedBookmarkedQuestions =
        JSON.parse(localStorage.getItem("bookmarkedQuestions")) || [];

      setCurrentQuestion(savedCurrentQuestion);
      setSelectedAnswers(savedSelectedAnswers);
      setBookmarkedQuestions(savedBookmarkedQuestions);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      localStorage.setItem(
        "bookmarkedQuestions",
        JSON.stringify(bookmarkedQuestions)
      );
    }
  }, [bookmarkedQuestions, loading]);

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

  const handleBookmarkToggle = (questionId) => {
    setBookmarkedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleResetMock = () => {
    setSelectedAnswers({});
    setBookmarkedQuestions([]);
    setIsModalOpen(false); // Close modal

    if (typeof window !== "undefined") {
      localStorage.removeItem("selectedAnswers");
      localStorage.removeItem("bookmarkedQuestions");
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

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
          selectedAnswers={selectedAnswers}
          bookmarkedQuestions={bookmarkedQuestions}
        />

        <div className="flex flex-col justify-between flex-grow p-4 border border-gray-400 rounded-md m-1">
          <QuestionDisplay
            question={ques[currentQuestion]}
            selectedAnswers={selectedAnswers}
            handleAnswerSelect={handleAnswerSelect}
            currentQuestion={currentQuestion}
            totalQuestions={ques.length}
            bookmarkedQuestions={bookmarkedQuestions}
            handleBookmarkToggle={handleBookmarkToggle}
          />
        </div>
      </div>
      <div className="flex justify-between gap-2 h-[60px] bg-[#4D4C4D] px-2 py-2 font-semibold text-white border-t-4 border-[#8CC63F]">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
          className="px-7 py-3 bg-[#8CC63F] flex items-center rounded-md"
        >
          Prev
        </button>
        <div className="flex gap-3">
          <button className="px-7 py-3 bg-[#8CC63F] flex items-center rounded-md">
            Complete Later
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-7 py-3 bg-[#8CC63F] flex items-center rounded-md"
          >
            Reset Mock
          </button>
        </div>
        <button
          onClick={handleNextQuestion}
          disabled={currentQuestion === ques.length - 1}
          className="px-7 py-3 bg-[#8CC63F] flex items-center rounded-md"
        >
          Next
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Reset</h2>
            <p>
              Are you sure you want to reset the mock? All answers will be
              cleared.
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleResetMock}
                className="px-5 py-2 bg-[#8CC63F] hover:bg-[#688d37] flex items-center rounded-md text-white font-semibold"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
