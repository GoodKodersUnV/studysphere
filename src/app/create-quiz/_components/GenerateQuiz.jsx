"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const GenerateQuiz = () => {
  const [amount, setSelectedOption] = useState("");
  const [topic, setTopicInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleGenerateQuiz = () => {
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
        window.location.href(`/quiz/${data.quizId}`)
      })
      .catch((error) => {
        console.error("Error generating quiz:", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isFormValid = () => {
    return amount.trim() !== "" && topic.trim() !== "" && /^\d+$/.test(amount);
  };

  return (
    <div className="flex justify-center items-center h-[92vh] w-screen  bg-gradient-to-r from-rose-100 to-teal-100 border">
      <div className="max-w-md mx-auto p-8 bg-gray-200 rounded-md shadow-md mt-4 h-[300px]">
        <h1 className="text-2xl font-bold mb-4">Generate Quiz</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Number of questions
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
            Topic:
            <input
              className="p-2 form-input mt-1 block w-full transition duration-300 ease-in-out border-b-2 rounded-lg hover:outline-none border-gray-300 focus:border-blue-500"
              type="text"
              value={topic}
              onChange={(e) => setTopicInput(e.target.value)}
            />
          </label>
        </div>
        <button
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isLoading || !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleGenerateQuiz}
          disabled={isLoading || !isFormValid()}
        >
          {isLoading ? "Generating..." : "Generate Quiz"}
        </button>
        {/* {isLoading === false && <p className='text-red-600'>*No.of questions need to be integer</p>} */}
      </div>
    </div>
  );
};

export default GenerateQuiz;
