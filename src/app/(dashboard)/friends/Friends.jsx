'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdPersonAdd } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Friends = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.post("/api/all-users", { profileId: currentUser?.id });
      setUsers(res.data.users);
    };
    getUsers();
  }, [currentUser?.id]);

  const handleFriend = async (friendUserId) => {
    try {
      const res = await axios.post("/api/friend-request", {
        userId: currentUser?.id,
        friendUserId: friendUserId,
      });
      if (res.status === 200) {
        const newUsers = users.map((user) => {
          if (user?.id === friendUserId) {
            return { ...user, isFriend: true };
          }
          return user;
        });
        setUsers(newUsers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const newFriends = users.filter((user) => !user.isFriend && user?.id !== currentUser?.id);
  const existingFriends = users.filter((user) => user.isFriend && user?.id !== currentUser?.id);

  return (
    <div className="flex justify-center mt-10 mx-6">
      <div className="w-1/2 me-4">
        <h2 className="text-lg font-semibold mb-4">New Friends</h2>
        <table className="w-full">
          <tbody>
            {newFriends.map((user) => (
              <tr
                key={user?.id}
                className="transition-transform hover:scale-105 hover:shadow-lg duration-500 ease-in-out hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push(`/profile/${user?.id}`)}
              >
                <td className="p-2 border-b">
                  <img src={user?.image} width={50} height={50} className="rounded-full" alt={user?.name} />
                </td>
                <td className="p-2 border-b">{user?.name}</td>
                <td className="p-2 border-b">
                  <span
                    className="text-cyan-500 flex items-center gap-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFriend(user?.id);
                    }}
                  >
                    <IoMdPersonAdd className="text-xl" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-1/2 ms-4">
        <h2 className="text-lg font-semibold mb-4">Existing Friends</h2>
        <table className="w-full">
          <tbody>
            {existingFriends.map((user) => (
              <tr
                key={user?.id}
                className="transition-transform hover:scale-105 hover:shadow-lg duration-500 ease-in-out hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push(`/profile/${user?.id}`)}
              >
                <td className="p-2 border-b">
                  <img src={user?.image} width={50} height={50} className="rounded-full" alt={user?.name} />
                </td>
                <td className="p-2 border-b">{user?.name}</td>
                <td className="p-2 border-b">
                  <FaCheckCircle className="text-cyan-500 text-xl" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Friends;
