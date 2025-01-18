import React from "react";

const QuestionSidebar = ({
  questions,
  currentQuestion,
  setCurrentQuestion,
  selectedAnswers,
}) => {
  return (
    <div className="flex flex-col items-center text-center pt-2 text-lg min-w-[130px] h-[calc(100vh-155px)] bg-opacity-30 overflow-y-scroll scrollbar-hide">
      <ul>
        {questions.map((q, index) => {
          const isMarked = selectedAnswers[q.question_id]; // Check if the question is marked
          return (
            <li key={q.question_id}>
              <button
                onClick={() => setCurrentQuestion(index)}
                className={`w-full px-[3rem] py-[2px] text-sm mb-1 rounded-sm ${
                  isMarked
                    ? "bg-[#4D4C4D] text-white" // Marked question (gray background)
                    : "bg-[#8CC63F] text-white" // Default unmarked style
                }`}
              >
                {index + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestionSidebar;
