"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function HomePage({ currentUser }) {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.post("/api/get-quizzes-taken", {
        userId: currentUser.id,
      });
      setProfile(res.data);
    };
    getProfile();
  });
  const router = useRouter();
  return (
    <div className="m-5 border flex h-full">
      <div className="w-[75%] p-5">
        <div className="flex gap-4">
          <div>
            <Image
              src={currentUser.image}
              width={100}
              height={100}
              className="rounded"
              alt="profile"
            />
          </div>
          <div className="flex flex-col justify-between">
            <h1>{currentUser.email}</h1>
            <h1>{currentUser.id}</h1>
            <h1>{currentUser.name}</h1>
            <h1>{currentUser.createdAt.toString()}</h1>
          </div>
        </div>
        <table className="w-1/2 m-auto mt-12">
          <thead>
            <tr>
              <th className="p-2 border-b">id</th>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Points</th>
            </tr>
          </thead>
          <tbody>
            {profile.map((quiz) => {
              return (
                <tr
                  onClick={() => router.push(`/manage-quiz/${quiz.id}`)}
                  className="hover:bg-gray-100 cursor-pointer"
                  key={quiz.id}
                >
                  <td className="p-2 border-b">{quiz.id}</td>
                  <td className="p-2 border-b">{quiz.Quiz.name}</td>
                  <td className="p-2 border-b">{quiz.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border p-5 w-[25%]">
        Friends
        {currentUser.friends.map((friend,index) => {
          return (
            <div className="p-2 border-b flex items-center gap-2" key={index}>
              <Image
                src={friend.friendUser.image}
                className="rounded-full"
                width={25}
                height={25}
                alt="profile"
              />
              {friend.friendUser.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
