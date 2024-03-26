"use client"
import React, { useEffect, useState } from 'react';
import { GiArrowScope } from "react-icons/gi";
import { PiMedalDuotone } from "react-icons/pi";
import Image from 'next/image';
import axios from 'axios';


const Row = ({ rank, img, name, username, points, badge }) => {

  let rankColorClass = '';
  switch (rank) {
    case 1:
      rankColorClass = 'hover:bg-yellow-500  ';
      break;
    case 2:
      rankColorClass = 'hover:bg-slate-400 ';
      break;
    case 3:
      rankColorClass = 'hover:bg-yellow-700 ';
      break;
    default:
      rankColorClass = '';
  }

  let BadgeColorClass = '';
  switch (rank) {
    case 1:
      BadgeColorClass = 'bg-yellow-500 outline outline-yellow-400  bg-gradient-to-r from-rgb(239,242,18) via-rgb(229,232,64) to-rgb(225,202,2)'
      break;
    case 2:
      BadgeColorClass = 'bg-slate-400  outline outline-gray-300';
      break;
    case 3:
      BadgeColorClass = ' bg-yellow-700 outline outline-yellow-600';
      break;
    default:
      BadgeColorClass = 'outline outline-emerald-500  ';
  }

  return (
    <tr className={`flex flex-col md:flex-row items-center border border-slate-900 ${!rankColorClass && 'hover:bg-sky-200'}  ${rankColorClass} hover:transform hover:-translate-y-1 hover:translate-x-1 transition-transform duration-300 ease-in-out`}>
      <td className="p-2 text-center ms-2 me-5 ">{badge}</td>
      <td className="text-md p-0 text-center me-5 ">
        <div className={`p-2 w-full h-full me-5 flex items-center justify-center font-semibold bg-gray-500 border border-gray-50 border-spacing-4 outline-offset-2 text-gray-50  rounded-full ${BadgeColorClass}`} >
          {rank}
        </div>
      </td>
      <td className="p-4 me-5 flex items-center min-w-80 ">
        <img src={image} alt={name} className="w-9 me-3 h-9 mr-4 border border-gray-700 border-opacity-45 outline outline-offset-2 outline-1 rounded-full" />
        <div>
          <div className="font-bold">{name}</div>
          <div className="text-gray-600">@{username}</div>
        </div>
      </td>
      <td className="p-4 me-5">
        <div className='grid grid-rows-3 md:justify-start'>
          <div className='flex text-xl font-medium items-center row-span-2'>
            {points} &nbsp; <GiArrowScope className='text-red-700 w-8 h-8' />
          </div>
        </div>
      </td>
    </tr>
  );
};

const StudentTable = () => {
  const [students, setStudents] = useState([]);

  
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.post("/api/get-leaderboard", {
        quizId: params.id
      })
      setStudents(res.data)
    }
    getUsers()
  }, [])
  const sortedStudents = [...students];

  const rankMap = new Map();
  sortedStudents.forEach((student, index) => {
    rankMap.set(student.id, index + 1);
  });

  const badgeMap = new Map();
  sortedStudents.forEach((student, index) => {
    switch (rankMap.get(student.id)) {
      case 1: badgeMap.set(student.id, <Image src={"https://raw.githubusercontent.com/UdaySagar-Git/studysphere/db945eb3abd0eb850ddec2a63dde78307b09823f/src/app/manage-quiz/assets/badge1.svg"} alt="badge1" width={30} height={30} />);
        break;
      case 2: badgeMap.set(student.id, <Image src={"https://raw.githubusercontent.com/UdaySagar-Git/studysphere/db945eb3abd0eb850ddec2a63dde78307b09823f/src/app/manage-quiz/assets/badge2.svg"} alt="badge2" width={30} height={30} />);
        break;
      case 3: badgeMap.set(student.id, <Image src={"https://raw.githubusercontent.com/UdaySagar-Git/studysphere/db945eb3abd0eb850ddec2a63dde78307b09823f/src/app/manage-quiz/assets/badge3.svg"} alt="badge3" width={30} height={30} />);
        break;
      default: badgeMap.set(student.id, <PiMedalDuotone className='h-7 w-7 text-zinc-700' />);
    }
  });


  return (
    <table className=" m-4">
      <tbody>
        {sortedStudents.map((student) => (
          <Row
            key={student.id}
            rank={rankMap.get(student.id)}
            img={student.img}
            name={student.name}
            username={student.username}
            points={student.points}
            badge={badgeMap.get(student.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
