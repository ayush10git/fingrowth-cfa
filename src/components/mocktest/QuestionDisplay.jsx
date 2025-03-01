import { Bookmark, BookmarkCheck } from "lucide-react";
import React from "react";

const QuestionDisplay = ({
  question,
  selectedAnswers,
  handleAnswerSelect,
  bookmarkedQuestions,
  handleBookmarkToggle,
}) => {
  if (!question) return <p>Loading question...</p>;

  return (
    <div className="flex flex-col gap-5 text-lg">
      <div className="flex justify-between bg-gray-200 px-3 py-2">
        <span className="text-base">{question.title}</span>
        <div
          onClick={() => handleBookmarkToggle(question.id)}
          className="cursor-pointer"
        >
          {bookmarkedQuestions.includes(question.id) ? (
            <BookmarkCheck className="w-5 h-5 text-yellow-500" />
          ) : (
            <Bookmark className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </div>

      <div className="text-lg flex flex-col gap-4">
        {question.options.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index); // Converts 0 → A, 1 → B, etc.

          return (
            <div key={index} className="flex items-center gap-4 w-full">
              <span className="font-medium text-gray-500">{optionLetter}</span>
              <label
                className={`border w-full cursor-pointer flex items-center px-4 py-2 border-2 ${
                  selectedAnswers[question.id] === optionLetter
                    ? "border-yellow-500 bg-yellow-200"
                    : "border-gray-400"
                } hover:border-yellow-500`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={selectedAnswers[question.id] === optionLetter}
                  onChange={() => handleAnswerSelect(question.id, optionLetter)}
                  className="hidden"
                />
                <span className="text-base font-medium w-full">{option}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionDisplay;
