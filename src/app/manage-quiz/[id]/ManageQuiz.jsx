"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ManageQuiz = ({ quiz }) => {
  const formatTime = (time) => {
    const date = new Date(time);
    const formattedDate = date.toISOString().split("T")[0];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${formattedDate}T${hours}:${minutes}`;
  };

  const [startTime, setStartTime] = useState(
    quiz.startTime ? formatTime(quiz.startTime) : ""
  );
  const [endTime, setEndTime] = useState(
    quiz.endTime ? formatTime(quiz.endTime) : ""
  );

  const [name, setName] = useState(quiz.name);

  const router = useRouter();

  const handleUpdate = async () => {
    const parsedStartTime = new Date(startTime);
    const parsedEndTime = new Date(endTime);
  
    const response = await axios.post("/api/update-quiz", {
      quizId: quiz.id,
      name,
      startTime: parsedStartTime,
      endTime: parsedEndTime,
    })
  };
  

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 mt-10">
      <h1 className="text-2xl font-bold mb-4">Manage Quiz</h1>
      <h2 className="text-lg mb-2">Quiz id : {quiz.id}</h2>
      <h2 className="text-lg mb-2">Quiz createdBy : {quiz.createdBy.name}</h2>
      <h2 className="text-lg mb-2">
        Quiz name :
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full py-2 px-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
        />
      </h2>
      <div className="mb-4">
        <label className="text-lg mb-2 block">Quiz startTime :</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full py-2 px-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="text-lg mb-2 block">Quiz endTime :</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full py-2 px-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
        />
      </div>
      <button
        onClick={() => router.push(`/leaderboard/${quiz.id}`)}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4"
      >
        Leaderboard
      </button>
      <button
        onClick={() => router.push(`/quiz/${quiz.id}`)}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Enter
      </button>
      <button
        onClick={handleUpdate}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded float-right"
      >
        Update
      </button>
    </div>
  );
};

export default ManageQuiz;
