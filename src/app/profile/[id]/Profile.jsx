"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import { GiArrowScope } from "react-icons/gi";

export default function Profile({ params, currentUser }) {
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const router = useRouter()

  if(params.id===currentUser.id){
    router.push('/')
  }
 
  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.post("/api/get-quizzes-taken", {
        userId: params.id,
      });
      setProfile(res.data);
    };
    getProfile();
    const getUser = async () => {
      try {
        const res = await axios.post("/api/all-users", {
          profileId: params.id,
        });
        setUser(res.data.profileUser);
        setAllUsers(res.data.users);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);


  const handleFriend = async (friendUserId) => {
    try {
      const res = await axios.post("/api/friend-request", {
        userId: currentUser.id,
        friendUserId: friendUserId,
      });
      if (res.status === 200) {
        const newUsers = allUsers.map((user) => {
          if (user.id === friendUserId) {
            return { ...user, isFriend: true };
          }
          return user;
        });
        setAllUsers(newUsers);
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <div className="m-5 border flex h-full">
      <div className="w-[75%] p-5">
        <div className="flex gap-4">
          <div>
            <Image
              src={user.image}
              width={120}
              height={120}
              className="rounded"
              alt="profile"
            />
          </div>
          <div className="flex flex-col justify-between">
            <h1><span className="font-semibold">Name :</span> <span className="text-gray-500 ml-2">{user.name}</span></h1>
            <h1><span className="font-semibold">Email :</span> <span className="text-gray-500 ml-2">{user.email}</span></h1>
            <h1><span className="font-semibold">Id :</span> <span className="text-gray-500 ml-2">{user.id}</span></h1>
            <h1><span className="font-semibold">CreatedAt :</span> <span className="text-gray-500 ml-2">{user.createdAt?.toString()}</span></h1>
            <div className=" flex items-center justify-start gap-4">
              <h1><span className="font-semibold">Following :</span> <span className="text-gray-500 ml-2">{user.friends?.length}</span></h1>
              <h1><span className="font-semibold">Followers :</span> <span className="text-gray-500 ml-2">{user.friendsof?.length}</span></h1>
            </div>
          </div>
        </div>
        {
          profile?.length!==0 &&

          <table className="w-[80%] m-auto border mt-12">
          <thead>
            <tr className=" text-center text-cyan-600">
              <th className="p-3 border text-center">id</th>
              <th className="p-3 border text-center">Name</th>
              <th className="p-3 border text-center flex items-center justify-center">Points<GiArrowScope className="ml-3 h-5 w-5"/></th>
              <th className="p-3 border text-center">Submission Time</th>
              <th className="p-3 border text-center">Participants</th>
            </tr>
          </thead>
          <tbody>
            {profile.map((quiz) => {
              return (
                <tr
                onClick={() => router.push(`/leaderboard/${quiz.id}`)}
                  className="hover:bg-gray-100 cursor-pointer text-gray-600"
                  key={quiz.id}
                  >
                  <td className="p-3 border-b text-center">{quiz.id}</td>
                  <td className="p-3 border-b text-center">{quiz.Quiz.name}</td>
                  <td className="p-3 border-b text-center">{quiz.points}</td>
                  <td className="p-3 border text-center text-sm">{formatDate(quiz.endedAt)}</td>
                  <td className="p-3 border text-center">{profile.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
      </div>
      <div className="border p-5 w-[25%]">
        Friends
        {allUsers
          .filter((user) => user.isFriend && user.id!== params.id )
          .map((user) => {
            return (
              <div
              className="flex items-center gap-2  p-2 border border-b rounded-md justify-between hover:bg-gray-100"
                key={user.id}
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={user.image}
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    alt="profile"
                    onClick={()=>router.push(`/profile/${user.id}`)}
                  />
                  <h1>{user.name}</h1>
                </div>

                {user.isFriend ? (
                  <span className="text-cyan-500 flex items-center gap-2 ">
                    <FaCheckCircle />
                  </span>
                ) : (
                  <span
                    className="text-cyan-500 flex items-center gap-2 "
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

/**
 *
 */
