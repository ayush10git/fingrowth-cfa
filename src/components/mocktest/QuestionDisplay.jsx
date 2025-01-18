import React from "react";

const QuestionDisplay = ({
  question,
  selectedAnswers,
  handleAnswerSelect,
  currentQuestion,
  totalQuestions,
}) => {
  return (
    <div className="flex flex-col gap-5 text-lg">
      <div className="bg-gray-200 px-3 py-2">
        <span className="text-base"> {question.question}</span>
      </div>

      <div className="text-lg flex flex-col gap-4">
        {/* Option A */}
        <div className="flex items-center gap-4 w-full">
          <span className="font-medium text-gray-500">A</span>
          <div
            className={`border w-full ${
              selectedAnswers[question.question_id] === "A"
                ? "border-yellow-500 bg-yellow-200"
                : "border-gray-400"
            } border-2 flex items-center px-4 py-2 cursor-pointer hover:border-yellow-500`}
            onClick={() => handleAnswerSelect(question.question_id, "A")}
          >
            <input
              type="radio"
              checked={selectedAnswers[question.question_id] === "A"}
              readOnly
              className="hidden"
            />
            <label className="text-base font-medium w-full">
              {question.option_a}
            </label>
          </div>
        </div>

        {/* Option B */}
        <div className="flex items-center gap-4 w-full">
          <span className="font-medium text-gray-500">B</span>
          <div
            className={`border w-full ${
              selectedAnswers[question.question_id] === "B"
                ? "border-yellow-500 bg-yellow-200"
                : "border-gray-400"
            } border-2 flex items-center px-4 py-2 cursor-pointer hover:border-yellow-500`}
            onClick={() => handleAnswerSelect(question.question_id, "B")}
          >
            <input
              type="radio"
              checked={selectedAnswers[question.question_id] === "B"}
              readOnly
              className="hidden"
            />
            <label className="text-base font-medium w-full">
              {question.option_b}
            </label>
          </div>
        </div>

        {/* Option C */}
        <div className="flex items-center gap-4 w-full">
          <span className="font-medium text-gray-500">C</span>
          <div
            className={`border w-full ${
              selectedAnswers[question.question_id] === "C"
                ? "border-yellow-500 bg-yellow-200"
                : "border-gray-400"
            } flex border-2 items-center px-4 py-2 cursor-pointer hover:border-yellow-500`}
            onClick={() => handleAnswerSelect(question.question_id, "C")}
          >
            <input
              type="radio"
              checked={selectedAnswers[question.question_id] === "C"}
              readOnly
              className="hidden"
            />
            <label className="text-base font-medium w-full">
              {question.option_c}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
