const QuestionSidebar = ({
  questions,
  currentQuestion,
  setCurrentQuestion,
  selectedAnswers,
  bookmarkedQuestions
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
                  bookmarkedQuestions.includes(q.question_id)
                    ? "bg-yellow-300 text-black" // Highlight bookmarked question
                    : isMarked
                    ? "bg-[#4D4C4D] text-white"
                    : "bg-[#8CC63F] text-white"
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
