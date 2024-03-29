'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdPersonAdd } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoMdSearch } from "react-icons/io";
import { BiMessageRoundedDots } from "react-icons/bi";


const Friends = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [nfsearchQuery, setNFSearchQuery] = useState("");
  const [ofsearchQuery, setOFSearchQuery] = useState("");

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

  const handleNFSearchInputChange = (e) => {
    setNFSearchQuery(e.target.value);
  };
  const handleOFSearchInputChange = (e) => {
    setOFSearchQuery(e.target.value);
  };

  const newFriends = users.filter((user) => !user.isFriend && user?.id !== currentUser?.id);
  const filteredNewFriends = newFriends.filter((user) =>
  user.name.toLowerCase().includes(nfsearchQuery.toLowerCase())
  ) ;
  
  const existingFriends = users.filter((user) => user.isFriend && user?.id !== currentUser?.id);
  const filteredOldFriends = existingFriends.filter((user) =>
    user.name.toLowerCase().includes(ofsearchQuery.toLowerCase())
  ) ;

  return (
    <div className=" grid grid-cols-2 mt-10 ">
      <div className="w-full mb-3">
      <div className=" flex items-center justify-between me-4 px-6">
        <h2 className="text-lg font-semibold mb-4">New Friends</h2>
        <div className=" flex justify-end items-center">
          <input type="text" id='nfsearch' placeholder="Search by name" value={nfsearchQuery} onChange={handleNFSearchInputChange}
            className="p-1 ps-2 border rounded-md " />
          <label htmlFor="nfsearch">  
            <IoMdSearch className=" w-7 h-7 ms-1 cursor-pointer text-gray-600" />
          </label>
        </div>
      </div>
      <div className=" mx-4 px-4 max-h-[80vh] overflow-y-auto overflow-x-hidden ">
        <table className="w-full">
          <tbody>
            {filteredNewFriends.map((user) => (
              <tr
              key={user?.id}
                className="transition-transform hover:scale-105 hover:shadow-lg duration-500 ease-in-out hover:bg-gray-100 "
                >
                <td className="p-2 border-b ">
                  <img src={user?.image} onClick={() => router.push(`/profile/${user?.id}`)} width={50} height={50} className="rounded-full cursor-pointer" alt={user?.name} />
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
                    <IoMdPersonAdd className="text-xl hover:text-cyan-600" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      <div className=" w-full mb-3">
      <div className=" flex items-center justify-between ms-4 px-6">
        <h2 className="text-lg font-semibold mb-4">Existing Friends</h2>
        <div className=" flex justify-end items-center">
          <input type="text" id='ofsearch' placeholder="Search by name" value={ofsearchQuery} onChange={handleOFSearchInputChange}
            className="p-1 ps-2 border rounded-md " />
          <label htmlFor="ofsearch">  
            <IoMdSearch className=" w-7 h-7 ms-1 cursor-pointer text-gray-600" />
          </label>
        </div>
      </div>
      <div className="mx-4  px-6 max-h-[80vh] overflow-y-auto overflow-x-hidden  ">
        <table className="w-full  ">
          <tbody>
            {filteredOldFriends.map((user) => (
              <tr
              key={user?.id}
              className="transition-transform hover:scale-105 hover:shadow-lg duration-500 ease-in-out hover:bg-gray-100 "
              >
                <td className="p-2 border-b ">
                  <img src={user?.image} width={50} height={50}  onClick={() => router.push(`/profile/${user?.id}`)} className="rounded-full cursor-pointer"  alt={user?.name} />
                </td>
                <td className="p-2 border-b">{user?.name}</td>
                <td className="p-2 border-b ">
                  <div className="flex items-center gap-4 me-4 justify-end">
                    <BiMessageRoundedDots onClick={()=>router.push(`/message/${user.id}`)} className="text-cyan-500 cursor-pointer hover:text-cyan-600 text-xl w-7 h-7" />
                    <FaCheckCircle className="text-cyan-500 text-xl" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default Friends;
