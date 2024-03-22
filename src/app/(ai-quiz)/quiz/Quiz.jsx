"use client";

import { useState, useEffect } from "react";
import { Clock10 } from "lucide-react";
import axios from "axios";




const Quiz = ({questions,quizId}) => {
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[index]);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(10); 

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleNextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setCurrentQuestion(questions[index + 1]);
      setSelectedOption(null);
      setTimer(10);
    } else {
      setShowSummary(true);
    }
  };

  const handleOptionClick = (i) => {
    if (selectedOption === null) {
      setSelectedOption(i);
      if (i === currentQuestion.answer - 1) {
        setScore(score + 1);
      }
    }
  };

  const handleTryAgain = () => {
    setIndex(0);
    setCurrentQuestion(questions[0]);
    setScore(0);
    setShowSummary(false);
    setSelectedOption(null);
    setTimer(10);
  };

  const handleQuizSubmit = async () =>{
    const res = await axios.post("/api/submit-quiz",{quizId ,points: +((score/questions.length)*100)})
  }

  return (
    <div className="bg-gradient-to-r from-rose-100 to-teal-100 border h-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-[500px] ">
        {!showSummary ? (
          <>
            <h1 className="font-bold text-2xl mb-6 text-indigo-900">
              {currentQuestion.question}
            </h1>
            <div className="flex flex-col gap-5">
              {currentQuestion.options.map((option, i) => (
                <button
                  key={i}
                  className={`${
                    selectedOption === i
                      ? i === currentQuestion.answer - 1
                        ? "border-green-500 bg-green-200"
                        : "border-red-500 bg-red-200"
                      : "border-indigo-700 hover:bg-indigo-500"
                  } text-indigo-900 font-bold py-3 px-6 rounded-md shadow-md cursor-pointer transition duration-300 ease-in-out`}
                  onClick={() => handleOptionClick(i)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <Clock10 className="text-slate-800 mr-2" />
                <p className="text-red-700">{timer} seconds left</p>
              </div>
              <button
                className={`${
                  selectedOption === null
                    ? "border-indigo-700 hover:bg-indigo-500"
                    : "bg-gray-400"
                } font-bold py-3 px-6 ml-auto rounded-md shadow-md cursor-pointer transition duration-300 ease-in-out`}
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h1 className="font-bold text-3xl mb-6 text-indigo-900">
              Quiz Summary
            </h1>
            <p className="text-lg text-indigo-900">
              Your score is {score}/{questions.length}
            </p>
            <button
              className="border-indigo-700 hover:bg-indigo-500 text-indigo-900 font-bold py-3 px-6 rounded-md mt-8 shadow-md cursor-pointer transition duration-300 ease-in-out"
              onClick={handleTryAgain}
            >
              Try Again
            </button>
            <button
              className="border-indigo-700 hover:bg-indigo-500 text-indigo-900 font-bold py-3 px-6 rounded-md mt-8 shadow-md cursor-pointer transition duration-300 ease-in-out"
              onClick={handleQuizSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
