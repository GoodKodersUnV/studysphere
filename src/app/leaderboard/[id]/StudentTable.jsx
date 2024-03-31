"use client";
import React, { useEffect, useState } from "react";
import { GiArrowScope } from "react-icons/gi";
import { PiMedalDuotone } from "react-icons/pi";
import badge1 from "/public/assets/badge1.svg";
import badge2 from "/public/assets/badge2.svg";
import badge3 from "/public/assets/badge3.svg";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "../../manage-quiz/loading";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineGlobal } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";

const Row = ({ id, rank, img, name, username, points, badge }) => {
  const router = useRouter();

  let rankColorClass = "";
  switch (rank) {
    case 1:
      rankColorClass = "hover:bg-yellow-500  ";
      break;
    case 2:
      rankColorClass = "hover:bg-slate-400 ";
      break;
    case 3:
      rankColorClass = "hover:bg-amber-700 ";
      break;
    default:
      rankColorClass = "";
  }

  let BadgeColorClass = "";
  switch (rank) {
    case 1:
      BadgeColorClass =
        "bg-yellow-600 outline outline-yellow-400  bg-gradient-to-r from-rgb(239,242,18) via-rgb(229,232,64) to-rgb(225,202,2)";
      break;
    case 2:
      BadgeColorClass = "bg-slate-400  outline outline-gray-300";
      break;
    case 3:
      BadgeColorClass = " bg-yellow-700 outline outline-amber-500";
      break;
    default:
      BadgeColorClass = "outline outline-emerald-500  ";
  }

  return (
    <tr
      onClick={() => router.push(`/profile/${id}`)}
      className={`flex flex-col md:flex-row items-center border border-slate-900 ${
        !rankColorClass && "hover:bg-sky-200"
      } cursor-pointer ${rankColorClass} transition-transform hover:scale-105 hover:shadow-lg duration-500 ease-in-out `}
    >
      <td className="p-2 text-center ms-2 me-5">{badge}</td>
      <td className="text-md p-0 text-center me-5">
        <div
          className={`p-2 w-full h-full me-5 flex items-center justify-center font-semibold bg-gray-500 border border-gray-50 border-spacing-4 outline-offset-2 text-gray-50 rounded-full ${BadgeColorClass}`}
        >
          {rank}
        </div>
      </td>
      <td className="p-4 me-5 flex items-center">
        <img
          src={img}
          alt={name}
          className="w-9 me-3 h-9 mr-4 border border-gray-700 border-opacity-45 outline outline-offset-2 outline-1 rounded-full"
        />
        <div className="w-80">
          <div className="font-bold">{name}</div>
          <div className="text-gray-600">@{username}</div>
        </div>
      </td>
      <td className="p-4 me-5 flex items-center flex-grow justify-end">
        <div className="flex text-xl font-medium items-center justify-end">
          {points} &nbsp;
          <GiArrowScope className="text-red-700 w-8 h-8" />
        </div>
      </td>
    </tr>
  );
};

const StudentTable = ({ params, currentUser }) => {
  const [sortedStudents, setSortedStudents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardType, setLeaderboardType] = useState("global");
  
  const router = useRouter();


  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLeaderboardTypeChange = async (e) => {
    setLeaderboardType(e.target.value);
    if (e.target.value === "friends") {
      let data = sortedStudents.filter((sortedStudent) =>
        allUsers.some(
          (user) =>
            user.id === sortedStudent.User.id ||
            sortedStudent.User.id === currentUser.id
        )
      );
      setSortedStudents(data);
    } else {
      const getUsers = async () => {
        const res = await axios.post("/api/get-leaderboard", {
          quizId: params.id,
        });

        setSortedStudents(res.data);
        setLoading(false);
      };

      getUsers();
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.post("/api/get-leaderboard", {
        quizId: params.id,
      });

      setSortedStudents(res.data);
      setLoading(false);
    };

    getUsers();

    const getfriends = async () => {
      try {
        const res = await axios.post("/api/all-users", {
          profileId: currentUser.id,
        });
        setAllUsers(
          res.data.users.filter(
            (user) => user.isFriend && user.id !== currentUser.id
          )
        );
      } catch (error) {
        console.log(error.message);
      }
    };
    getfriends();
  }, []);

  const rankMap = new Map();
  const filteredStudents = sortedStudents.filter((sortedStudent) =>
    sortedStudent.User.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  sortedStudents.forEach((student, index) => {
    rankMap.set(student.id, index + 1);
  });

  const badgeMap = new Map();
  sortedStudents.forEach((student, index) => {
    switch (rankMap.get(student.id)) {
      case 1:
        badgeMap.set(
          student.id,
          <Image src={badge1} alt="badge1" width={30} height={30} />
        );
        break;
      case 2:
        badgeMap.set(
          student.id,
          <Image src={badge2} alt="badge2" width={30} height={30} />
        );
        break;
      case 3:
        badgeMap.set(
          student.id,
          <Image src={badge3} alt="badge3" width={30} height={30} />
        );
        break;
      default:
        badgeMap.set(
          student.id,
          <PiMedalDuotone className="h-7 w-7 text-zinc-700" />
        );
    }
  });

  return (
    <table className="w-3/4 mx-auto mt-12">
      <tbody>
        {sortedStudents.length === 0 ? (
          <div className="w-full h-screen text-center m-auto">
            {loading ? (
              <Loader />
            ) : (
              <div>
                <h1 className="text-center text-2xl text-gray-600">
                  Be the first to participate in the quiz leaderboard and
                  achieve the top rank!
                </h1>
                <button
                  onClick={() => router.push(`/quiz/${params.id}`)}
                  className="flex items-center justify-center m-auto text-center mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md "
                >
                  Take the Quiz &nbsp; <FaExternalLinkAlt className="" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between   ">
              <h1 className=" text-3xl font-bold mb-4 ">Leaderboard :</h1>
              <div className=" ">
                <div className=" flex justify-end items-center">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="p-1 ps-3 border rounded-md "
                  />
                  <label htmlFor="search">
                    <IoMdSearch className=" w-7 h-7 ms-1 cursor-pointer text-gray-600" />
                  </label>
                </div>
                <div className="my-3 flex justify-end me-5">
                  <label htmlFor="friends" className="flex items-center mr-2">
                    Friends <HiUserGroup className="w-5 h-5" />
                  </label>
                  <input
                    type="radio"
                    name="leaderboardType"
                    value="friends"
                    id="friends"
                    checked={leaderboardType === "friends"}
                    onChange={handleLeaderboardTypeChange}
                  />
                  <label
                    htmlFor="global"
                    className=" ml-4 mr-2 flex items-center justify-center"
                  >
                    Global <AiOutlineGlobal className="w-5 h-5" />
                  </label>
                  <input
                    type="radio"
                    name="leaderboardType"
                    value="global"
                    id="global"
                    checked={leaderboardType === "global"}
                    onChange={handleLeaderboardTypeChange}
                  />
                </div>
              </div>
            </div>
            {filteredStudents.map((student) => (
              <Row
                key={student.id}
                id={student.userId}
                rank={rankMap.get(student.id)}
                img={student.User.image}
                name={student.User.name}
                username={student.User.username}
                points={student.points}
                badge={badgeMap.get(student.id)}
              />
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default StudentTable;
