import { DetailReviewQuestionTable } from "@/components/analytics/DetailPageQuestionTable";
import { questionAttempts, questions } from "@/utils/data";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Filters from "@/components/analytics/mock-analysis/Filters";

const page = () => {
  return (
    <div className="absolute top-[70px] left-[60px] p-2 bg-white my-2 mx-3 rounded-md">
      <Sheet>
        <div className="flex items-center justify-between px-5">
          <h1 className="text-xl">Detailed Review</h1>
          <SheetTrigger>
            <SlidersHorizontal />
          </SheetTrigger>
        </div>

        <DetailReviewQuestionTable
          questions={questions.questions}
          questionAttempts={questionAttempts.questionAttempts}
        />
        <SheetContent>
          <SheetHeader>
            <div className="flex items-center justify-between mt-3">
              <SheetTitle className="underline decoration-[#8E6FD8] decoration-2 underline-offset-[7px] text-xl tracking-wide">
                Filters
              </SheetTitle>
              <button className="bg-[#8E6FD8] py-1 px-3 rounded-full text-white">
                APPLY
              </button>
            </div>
          </SheetHeader>

          <div className="flex flex-col gap-3 mt-3">
            <Select className="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Select className="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-col gap-4">
              <Filters
                title="Difficulty"
                options={["Easy", "Medium", "Difficult"]}
              />
              <Filters
                title="Question Type"
                options={["Calculative", "Conceptual"]}
              />
              <Filters title="Confidence" options={["Sure", "Not Sure"]} />
              <Filters title="Correctness" options={["Correct", "Incorrect"]} />
            </div>

            <Select className="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Filters title="Tag" options={[]} />

          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default page;
