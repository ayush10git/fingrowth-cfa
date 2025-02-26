import CompletionProgress from "./CompletionProgress";
import MockCompletionBar from "./MockCompletionBar";

const SubjectCompletions = () => {
  return (
    <div className="pl-7 py-4 bg-white rounded-md w-full">
      <h1 className="mb-4 text-xl">Completion</h1>
      <div className="flex gap-10">
        <div className="w-[85%] flex flex-col gap-3">
          <CompletionProgress subject="Subject A" completion={50} />
          <CompletionProgress subject="Subject B" completion={43} />
          <CompletionProgress subject="Subject C" completion={62} />
          <CompletionProgress subject="Subject D" completion={29} />
          <CompletionProgress subject="Subject E" completion={33} />
          <CompletionProgress subject="Subject F" completion={71} />
          <CompletionProgress subject="Subject G" completion={44} />
          <CompletionProgress subject="Subject H" completion={16} />
          <CompletionProgress subject="Subject I" completion={27} />
          <CompletionProgress subject="Subject J" completion={59} />
        </div>
        <div className="">
          <MockCompletionBar subject="Mock Completion" completion={40} />
        </div>
      </div>
    </div>
  );
};

export default SubjectCompletions;
