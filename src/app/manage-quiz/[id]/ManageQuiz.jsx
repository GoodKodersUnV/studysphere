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

const ScheduleTime = () => {

    if ("serviceWorker" in navigator && "PushManager" in window) {
      setTimeout(() => {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification("StudySphere", {
            body: "You hava a quiz scheduled !!",
            icon: "https://ssl.gstatic.com/onebox/media/sports/logos/f958HPOsI1ugsHmwc4piCw_96x96.png",
          });
        });
      });
    }
  }


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
    <div className="max-w-md mx-auto mb-10 bg-white rounded-lg shadow-lg p-8 mt-10">
      <h1 className="text-2xl font-bold ">Manage Quiz</h1>
      <hr className="mb-4" />
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
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 ml-6 rounded mr-2"
      >
        Leaderboard
      </button>
      <button
        onClick={() => router.push(`/quiz/${quiz.id}`)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded mr-2"
      >
        Enter
      </button>
      <button
        onClick={handleUpdate}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 mr-2 rounded"
      >
        Update
      </button>
      <button
        onClick={()=>ScheduleTime()}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded"
      >
        Notify
      </button>
    </div>
  );
};

export default ManageQuiz;
