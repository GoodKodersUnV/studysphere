"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Friends = ({ currentUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.post("/api/all-users" ,{profileId : currentUser.id});
      setUsers(res.data.users);
    };
    getUsers();
  }, []);
  const router = useRouter();

  const handleFriend = async (friendUserId) => {
    try {
      const res = await axios.post("/api/friend-request", {
        userId: currentUser.id,
        friendUserId: friendUserId,
      })
      if (res.status === 200) {
        const newUsers = users.map((user) => {
          if (user.id === friendUserId) {
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

  return (
    <table className="w-1/2 m-auto mt-12">
      <thead>
        <tr>
          <th className="p-2 border-b">id</th>
          <th className="p-2 border-b">Name</th>
          <th className="p-2 border-b"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
           return (
            <tr
              onClick={() => router.push(`/profile/${user.id}`)}
              className="hover:bg-gray-100 "
              key={user.id}
            >
              <td className="p-2 border-b">{user.id}</td>
              <td className="p-2 border-b">{user.name}</td>
              <td className="p-2 border-b">
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
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Friends;
