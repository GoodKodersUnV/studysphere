"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { GiArrowScope } from "react-icons/gi";
import { BiMessageRoundedDots } from "react-icons/bi";

function HomePage({ currentUser }) {
  const [profile, setProfile] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [Participants, setParticipants] = useState(0)

  
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
        setAllUsers(res.data.users);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();

  }, []);


const formatDate = (e) => {
    const date = new Date(e);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; 

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
}

  const router = useRouter();
  return (
    <div className="flex h-full">
      <div className="w-[70%] p-5">
        <div className="flex gap-4">
          <div>
            <Image
              src={currentUser.image} width={120} height={120} className="rounded"
              alt="profile"
            />
          </div>
          <div className="flex flex-col justify-between">
            <h1><span className="font-semibold">Name :</span> <span className="text-gray-500 ml-2">{currentUser.name}</span></h1>
            <h1><span className="font-semibold">Email :</span> <span className="text-gray-500 ml-2">{currentUser.email}</span></h1>
            <h1><span className="font-semibold">Id :</span> <span className="text-gray-500 ml-2">{currentUser.id}</span></h1>
            <h1><span className="font-semibold">CreatedAt :</span> <span className="text-gray-500 ml-2">{currentUser.createdAt.toString()}</span></h1>
            <div className=" flex items-center justify-start gap-4">
              <h1><span className="font-semibold">Following :</span> <span className="text-gray-500 ml-2">{currentUser.friends.length}</span></h1>
              <h1><span className="font-semibold">Followers :</span> <span className="text-gray-500 ml-2">{currentUser.friendsof.length }</span></h1>
            </div>
          </div>
        </div>
        <table className="m-auto border mt-12">
          <thead>
            <tr className="text-center bg-orange-300 text-gray-600">  
              <th className="p-3 border text-center">Id</th>
              <th className="p-3 border text-center">Name</th>
              <th className="p-3 text-center flex justify-center items-center ">Points <GiArrowScope className="ml-3 h-5 w-5"/></th>
              <th className="p-3 border text-center">Submission Time</th>
              <th className="p-3 border text-center">Participants</th>
            </tr>
          </thead>
          <tbody>
            {profile.map((quiz) => {
              return (
                <tr
                  onClick={() => router.push(`/leaderboard/${quiz.quizId}`)}
                  className="hover:bg-gray-100 cursor-pointer text-gray-600"
                  key={quiz.id}
                >
                  <td className="p-2 border text-center">{quiz.id}</td>
                  <td className="p-2 border text-center">{quiz.Quiz.name}</td>
                  <td className="p-2 border text-center">{quiz.points}</td>
                  <td className="p-2 border text-center text-sm">{formatDate(quiz.endedAt)}</td>
                  <td className="p-2 border text-center">{quiz.Quiz.usersPoints.length}</td>
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
                className="flex items-center gap-2 mt-3 p-2 border rounded-md justify-between hover:bg-gray-100"
                key={user.id}
                
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={user.image}
                    width={40}
                    height={40}
                    onClick={()=>router.push(`/profile/${user.id}`)}
                    className="rounded-full cursor-pointer"
                    alt="profile"
                  />
                  <h1>{user.name}</h1>
                </div>

                {user.isFriend ? (
                  <span className="text-cyan-500 flex items-center gap-4 me-1 cursor-pointer">
                    <BiMessageRoundedDots onClick={()=>router.push(`/message/${user.id}`)} className=" w-5 cursor-pointer hover:text-cyan-600 h-5" />
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
