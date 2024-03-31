"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const GenerateQuiz = ({token}) => {
  const [amount, setSelectedOption] = useState("");
  const [topic, setTopicInput] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleGenerateQuiz = () => {
    if (token="pro" || token > 0 ) {
      setIsLoading(true);
        fetch("/api/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, topic }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error generating quiz: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            router.push('/manage-quiz');
          })
        .catch((error) => {
          console.error("Error generating quiz:", error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      router.push('/premium');
    }
  };

  const isFormValid = () => {
    return amount.trim() !== "" && topic.trim() !== "" && /^\d+$/.test(amount);
  };

  return (
    <div className="flex justify-center items-center mt-24 mb-32 w-auto"  >
      <div className="max-w-lg mx-auto p-8 bg-gray-200 rounded-md w-100 shadow-md  h-[400px]">
        <h1 className="text-2xl font-bold mb-4">Generate Quiz</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Number of questions :
            <input
              className="p-2 form-input mt-1 block w-full transition duration-300 ease-in-out border-b-2 rounded-lg hover:outline-none border-gray-300 focus:border-blue-500"
              type="text"
              value={amount}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Topic :
            <input
              className="p-2 form-input mt-1 block w-full transition duration-300 ease-in-out border-b-2 rounded-lg hover:outline-none border-gray-300 focus:border-blue-500"
              type="text"
              value={topic}
              onChange={(e) => setTopicInput(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-4 ">
          <div>
            <label className="block text-gray-700 mb-2">
              Type :
            </label>
            <div className=" grid grid-cols-4 gap-6">
              <div className="flex items-center justify-start">
                <input
                  type="radio"
                  id="trueFalse"
                  name="questionType"
                  value="tf"
                  checked={type === "tf"}
                  onChange={(e) => setType(e.target.value)}
                  className="  accent-violet-500 w-4 h-4 "
                />
                <label htmlFor="trueFalse" className="ml-2"> True/False</label>
              </div>
              <div className="flex items-center justify-center col-span-2">
                <input
                  type="radio"
                  id="shortAnswer"
                  name="questionType"
                  value="sq"
                  checked={type === "sq"}
                  onChange={(e) => setType(e.target.value)}
                  className="mr-2 accent-violet-500 w-4 h-4"
                />
                <label htmlFor="shortAnswer" className="">Short Answer</label>
              </div>
              <div className="flex items-center justify-start">
                <input
                  type="radio"
                  id="mcq"
                  name="questionType"
                  value="mcq"
                  checked={type === "mcq"}
                  onChange={(e) => setType(e.target.value)}
                  className="mr-2 accent-violet-500 w-4 h-4"
                />
                <label htmlFor="mcq">MCQ</label>
              </div>
            </div>
          </div>
        </div>

        <button
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isLoading || !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={handleGenerateQuiz}
          disabled={isLoading || !isFormValid()}
        >
          {isLoading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>
    </div>
  );
};

export default GenerateQuiz;
