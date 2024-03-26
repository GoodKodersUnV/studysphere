"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { GiTargetArrows } from "react-icons/gi";

function HomePage({ currentUser }) {
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.post("/api/get-quizzes-taken", {
        userId: currentUser.id,
      });
      setProfile(res.data);
    };
    getProfile();
    const getUser = async () => {
      try {
        const res = await axios.post("/api/all-users", {
          profileId: currentUser.id,
        });
        setUser(res.data.profileUser);
        setAllUsers(res.data.users);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);
  const router = useRouter();
  return (
    <div className="flex h-full">
      <div className="w-[70%] p-5">
        <div className="flex gap-4">
          <div>
            <Image
              src={currentUser.image} width={100} height={100} className="rounded"
              alt="profile"
            />
          </div>
          <div className="flex flex-col justify-between">
            <h1><span className="font-semibold">Name :</span> <span className="text-gray-500 ml-2">{currentUser.name}</span></h1>
            <h1><span className="font-semibold">Email :</span> <span className="text-gray-500 ml-2">{currentUser.email}</span></h1>
            <h1><span className="font-semibold">Id :</span> <span className="text-gray-500 ml-2">{currentUser.id}</span></h1>
            <h1><span className="font-semibold">CreatedAt :</span> <span className="text-gray-500 ml-2">{currentUser.createdAt.toString()}</span></h1>
          </div>
        </div>
        <table className="w-[80%] m-auto border mt-12">
          <thead>
            <tr className="text-blue-500">
              <th className="p-3 border text-start">Id</th>
              <th className="p-3 border text-start">Name</th>
              <th className="p-3 text-start flex items-center">Points <GiTargetArrows className="ml-3 h-5 w-5"/></th>
            </tr>
          </thead>
          <tbody>
            {profile.map((quiz) => {
              return (
                <tr
                  onClick={() => router.push(`/manage-quiz/${quiz.id}`)}
                  className="hover:bg-gray-100 cursor-pointer text-gray-600"
                  key={quiz.id}
                >
                  <td className="p-3 border text-start">{quiz.id}</td>
                  <td className="p-3 border text-start">{quiz.Quiz.name}</td>
                  <td className="p-3 border text-start">{quiz.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border-l p-5 w-[30%]">
        <span className="font-semibold">Friends</span>
        {allUsers
          .filter((user) => user.isFriend && user.id !== currentUser.id)
          .map((user) => {
            return (
              <div
                className="flex items-center gap-2 mt-3 cursor-pointer p-2 border border-cyan-300 rounded-md justify-between hover:bg-gray-100"
                key={user.id}
                onClick={()=>router.push(`/message/${user.id}`)}
              >
                <div className="flex gap-5 items-center">
                  <Image
                    src={user.image}
                    width={40}
                    height={40}
                    className="rounded"
                    alt="profile"
                  />
                  <h1>{user.name}</h1>
                </div>

                {user.isFriend ? (
                  <span className="text-cyan-500 flex items-center gap-2 cursor-pointer">
                    <FaCheckCircle />
                  </span>
                ) : (
                  <span
                    className="text-cyan-500 flex items-center gap-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFriend(user.id);
                    }}
                  >
                    <IoMdPersonAdd className="text-xl" />
                  </span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default HomePage;
