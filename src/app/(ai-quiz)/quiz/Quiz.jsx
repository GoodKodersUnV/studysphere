"use client";

import { useState, useEffect } from "react";
import { Clock10 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";




const Quiz =  ({questions,quizId}) => {

  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[index]);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(parseInt(localStorage.getItem('time')));
  
  
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


  const [videoAllowed, setVideoAllowed] = useState(false);
  const handleVideoPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoAllowed(true);
    } catch (error) {
      router.push("/");
      console.error('User denied access to video');
      setVideoAllowed(false);
    }
  };

  useEffect(()=>{
  handleVideoPermission();
  },[])
  const handleNextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setCurrentQuestion(questions[index + 1]);
      setSelectedOption(null);
      setTimer(parseInt(localStorage.getItem('time')));
    } else {
      storeEndTime();
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
    setTimer(parseInt(localStorage.getItem('time')));
  };



  const handleQuizSubmit = async () =>{
    const res = await axios.post("/api/submit-quiz",{quizId, stratedAt:(localStorage.getItem("stratedAt")) ,points: +((score/questions.length)*100)})
    router.push(`/leaderboard/${quizId}`);
    setVideoAllowed(false);
    console.log(res);
  }

  const storeEndTime = () => {
    const endTime = new Date().toISOString();
    localStorage.setItem("endTime", endTime);
  };


  const calculateTime= (endtime)=>{
        const time1 = new Date(localStorage.getItem("stratedAt"));
        const time2 = new Date(localStorage.getItem("endTime"))

        const differenceInMs = Math.abs(time2 - time1);

        const seconds = Math.floor(differenceInMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;

        return (`Time Taken: ${hours} : ${remainingMinutes} : ${remainingSeconds}`);
  }

  return (
    <div className="border h-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-[500px] ">
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
          <div className="text-center m-auto ">
            <h1 className="font-bold text-3xl mb-6 text-indigo-900">
              Quiz Summary
            </h1>
            <p className="text-lg text-indigo-900 flex-center gap-2 mb-1">
              {calculateTime(new Date().toISOString())}<Clock10 className="w-4 h-4"/>
            </p>
            <p className="text-lg text-indigo-900">
              Your score is {score}/{questions.length}
            </p>
            <button
              className="border-indigo-700 outline outline-1 bg-gray-300 mr-4  hover:bg-indigo-500 hover:text-gray-950 text-gray-900 font-bold py-2 px-6 rounded-md mt-8 shadow-md cursor-pointer transition duration-300 ease-in-out"
              onClick={handleTryAgain}
            >
              Try Again
            </button>
            <button
              className="border-indigo-700 outline outline-1 bg-emerald-300 hover:bg-indigo-500 hover:text-gray-950 text-indigo-900 font-bold py-2 px-6 rounded-md mt-8 shadow-md cursor-pointer transition duration-300 ease-in-out"
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
