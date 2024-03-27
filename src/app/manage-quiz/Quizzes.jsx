"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WhatsappButton from "@/components/share";
import { MdOutlineLeaderboard } from "react-icons/md";

const Quizzes = ({ currentUser }) => {
  const [quizzes, setQuizzes] = useState([]);

  const msg =
    "Hey, want to test your knowledge? Check out this quiz link and see how you fare, Let's see who gets the highest score!";
  useEffect(() => {
    const getQuizzes = async () => {
      const res = await axios.post("/api/get-quizzes-created", {
        userId: currentUser?.id,
      });
      setQuizzes(res.data);
    };
    getQuizzes();
  }, []);

  const router = useRouter();

  const ScheduleTime = (quiz) => {
    quiz.endTime = document.getElementById(`${quiz.id}`).value;
    const start = new Date();
    const end = new Date(quiz.endTime);
    const timeLeft = end - start;

    if ("serviceWorker" in navigator && "PushManager" in window) {
      setTimeout(() => {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification("StudySphere", {
            body: "You hava a quiz scheduled !!",
            icon: "https://ssl.gstatic.com/onebox/media/sports/logos/f958HPOsI1ugsHmwc4piCw_96x96.png",
          });
        });
      }, timeLeft);
    }
  };
  return (
    <table className="w-2/3 m-auto mt-12 border">
      <thead>
        <tr className="border">
          <th className="p-2 border text-center">Quiz name</th>
          <th className="p-2 border text-center">Share</th>
          <th className="p-2 border text-center">Standings</th>
          <th className="p-2 border text-center">Schedule Quiz</th>
        </tr>
      </thead>
      <tbody>
        {quizzes.map((quiz) => {
          return (
            <tr
              className="cursor-pointer"
              key={quiz.id}
              onClick={() => router.push(`/manage-quiz/${quiz.id}`)}
            >
              <td className="p-2 border text-center">{quiz.name}</td>
              <td className="p-2 border text-center text-green-600">
                <WhatsappButton
                  url={`https://studysphere-ai.vercel.app/quiz/${quiz.id}`}
                  msg={msg}
                />
              </td>
              {/* {
                                    timeLeft<=0?<td className='p-2 border text-center text-gray-500 hover:font-semibold'><p onClick={() => router.push(`/quiz/${quiz.id}`)}>Enter</p></td>
                                    :
                                    <div></div>
                                }
     */}
              <td className="p-2 border text-center text-gray-500 hover:font-semibold">
                <p onClick={() => router.push(`/quiz/${quiz.id}`)}>Enter</p>
              </td>
              <td className="p-2 border text-center text-red-600">
                <p onClick={() => router.push(`/leaderboard/${quiz.id}`)}>
                  <MdOutlineLeaderboard className="h-5 w-5 m-auto" />
                </p>
              </td>
              <td className="p-2 border text-center">
                <input
                  type="datetime-local"
                  id={`${quiz.id}`}
                  className="cursor-pointer outline-0 border-none"
                />
              </td>
              <td className="p-2 border text-center">
                <button onClick={() => ScheduleTime(quiz)}>Schedule</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Quizzes;
