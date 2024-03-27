"use client"

import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoBookmarks } from "react-icons/io5";


const FriendsList = () => {

  const pathname = usePathname()
  const friendId = pathname.split("/")[2];

  const router = useRouter();

  const [friends, setFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/api/get-friends")
      setFriends(res.data.friendsList);
      setCurrentUser(res.data.currentUser);
    }
    getFriends();
  }, []
  )

  return (
    <div className="w-full">
      <div className="font-semibold text-2xl mb-4 text-center">Friends</div>

      {
        currentUser && (
          <div
            className={`flex items-center gap-2 cursor-pointer p-2 justify-between hover:bg-gray-100 rounded-md ${friendId == currentUser.id ? "bg-gray-200" : ""}`}
            onClick={() => router.push(`/message/${currentUser.id}`)}
          >
            <div className="flex gap-5 items-center">
              <div className="text-[30px] p-1">
                <IoBookmarks />
              </div>
              <h1>Only You</h1>
            </div>
          </div>
        )
      }

      {friends
        .map((user) => {
          return (
            <div
              className={`flex items-center gap-2 cursor-pointer p-2 justify-between hover:bg-gray-100 rounded-md ${user.id == friendId ? "bg-gray-200" : ""}`}
              key={user.id}
              onClick={() => router.push(`/message/${user.id}`)}
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
            </div>
          );
        })}
    </div>
  )
}

export default FriendsList