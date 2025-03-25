"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export default function SolutionSidebar({
  handleQuestionClick,
  totalQuestions,
  activeQuestionIndex,
  questionAttempts,
}) {
  const { open } = useSidebar();

  // Function to determine question status
  const getQuestionStatus = (index) => {
    if (index === activeQuestionIndex) return "active";

    const attempt = questionAttempts[index];
    if (!attempt || !attempt.answer_given) return "default";

    return attempt.answer_given === attempt.correct_answer
      ? "correct"
      : "incorrect";
  };

  const questions = Array.from(
    { length: totalQuestions },
    (_, index) => index + 1
  );

  // Function to get background and text classes based on question status
  const getStatusClasses = (status, isActive) => {
    switch (status) {
      case "correct":
        return {
          bg: "bg-green-50 border-green-200",
          text: "text-green-700",
          activeAddition: isActive ? "ring-2 ring-green-500" : "",
        };
      case "incorrect":
        return {
          bg: "bg-red-50 border-red-200",
          text: "text-red-700",
          activeAddition: isActive ? "ring-2 ring-red-500" : "",
        };
      case "active":
        return {
          bg: "bg-blue-50 border-blue-200",
          text: "text-blue-700",
          activeAddition: "ring-2 ring-blue-500",
        };
      default:
        return {
          bg: "bg-gray-50 border-gray-200",
          text: "text-gray-700",
          activeAddition: isActive ? "ring-2 ring-gray-500" : "",
        };
    }
  };

  const renderContent = () => {
    if (!open) {
      return (
        <SidebarMenu
          className="h-[calc(100vh-150px)] overflow-y-auto bg-gradient-to-b from-white to-blue-50 rounded-lg"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {questions.map((questionNumber, index) => {
            const status = getQuestionStatus(index);
            const isActive = index === activeQuestionIndex;
            const { bg, text, activeAddition } = getStatusClasses(
              status,
              isActive
            );

            return (
              <SidebarMenuItem
                key={questionNumber}
                className={`
                  flex items-center justify-center my-3 mx-2 cursor-pointer 
                  border transition-all duration-300 ease-in-out aspect-square
                  ${bg} ${text} ${activeAddition}
                  hover:scale-105 hover:shadow-md
                `}
                onClick={() => handleQuestionClick(index)}
              >
                <SidebarMenuButton asChild>
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <span
                      className={`
                      text-sm font-bold 
                      ${questionNumber > 99 ? "text-xs" : ""}
                    `}
                    >
                      {questionNumber}
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      );
    }

    const questionRows = [];
    for (let i = 0; i < questions.length; i += 4) {
      const rowQuestions = questions.slice(i, i + 4);
      questionRows.push(
        <div key={i} className="grid grid-cols-4 gap-4 mb-4">
          {rowQuestions.map((questionNumber, index) => {
            const globalIndex = i + index;
            const status = getQuestionStatus(globalIndex);
            const isActive = globalIndex === activeQuestionIndex;
            const { bg, text, activeAddition } = getStatusClasses(
              status,
              isActive
            );

            return (
              <SidebarMenuItem
                key={questionNumber}
                className={`
                  flex items-center justify-center cursor-pointer 
                  border transition-all duration-300 ease-in-out aspect-square
                  ${bg} ${text} ${activeAddition}
                  hover:scale-105 hover:shadow-md
                `}
                onClick={() => handleQuestionClick(globalIndex)}
              >
                <SidebarMenuButton asChild>
                  <div className="flex items-center justify-center w-full h-full">
                    <span
                      className={`
                      text-sm font-bold 
                      ${questionNumber > 99 ? "text-xs" : ""}
                    `}
                    >
                      {questionNumber}
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </div>
      );
    }
    return (
      <SidebarMenu
        className="bg-gradient-to-b from-white to-blue-50 rounded-lg p-4 h-[calc(100vh-150px)] overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {questionRows}
      </SidebarMenu>
    );
  };

  return (
    <Sidebar
      collapsible="icon"
      className="w-64 bg-gradient-to-b from-white to-blue-50 border-r flex flex-col z-50 shadow-lg"
    >
      <SidebarContent className="flex-grow">
        <SidebarGroup>
          <SidebarGroupContent>{renderContent()}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="flex justify-center items-center px-1 py-4">
        <SidebarTrigger className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300 shadow-md" />
      </div>
    </Sidebar>
  );
}
