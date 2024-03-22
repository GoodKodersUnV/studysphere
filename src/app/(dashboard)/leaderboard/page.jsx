
import React from 'react';
import { GiArrowScope } from "react-icons/gi";
import { PiMedalDuotone } from "react-icons/pi";
import badge1 from './assets/badge1.svg'
import badge2 from './assets/badge2.svg'
import badge3 from './assets/badge3.svg'
import Image from 'next/image';


const students = [
  {
    "id": 1,
    "rank": 1,
    "img": "https://example.com/user1.jpg",
    "name": "John Doe",
    "username": "johndoe123",
    "points": 500,
    "badge": "Gold Badge"
  },
  {
    "id": 2,
    "rank": 2,
    "img": "https://example.com/user2.jpg",
    "name": "Jane Smith",
    "username": "janesmith456",
    "points": 450,
    "badge": "Silver Badge"
  },
  {
    "id": 3,
    "rank": 3,
    "img": "https://example.com/user3.jpg",
    "name": "Alice Johnson",
    "username": "alicej",
    "points": 400,
    "badge": "Bronze Badge"
  },
  {
    "id": 4,
    "rank": 4,
    "img": "https://example.com/user4.jpg",
    "name": "Bob Brown",
    "username": "bobbrown789",
    "points": 350,
    "badge":''
  },
  {
    "id": 5,
    "rank": 5,
    "img": "https://example.com/user5.jpg",
    "name": "Emily Davis",
    "username": "emilyd",
    "points": 300,
    "badge":''
  },
  {
    "id": 6,
    "rank": 6,
    "img": "https://example.com/user6.jpg",
    "name": "Michael Wilson",
    "username": "michaelw",
    "points": 280,
    "badge":''
  },
  {
    "id": 7,
    "rank": 7,
    "img": "https://example.com/user7.jpg",
    "name": "Sarah Lee",
    "username": "sarahlee10",
    "points": 250,
    "badge":''
  },
  {
    "id": 8,
    "rank": 8,
    "img": "https://example.com/user8.jpg",
    "name": "David Martinez",
    "username": "davidm",
    "points": 220,
    "badge":''
  },
  {
    "id": 9,
    "rank": 9,
    "img": "https://example.com/user9.jpg",
    "name": "Laura Taylor",
    "username": "laurat",
    "points": 200,
    "badge":''
  },
  {
    "id": 10,
    "rank": 10,
    "img": "https://example.com/user10.jpg",
    "name": "Kevin Rodriguez",
    "username": "kevinr",
    "points": 180,
    "badge":''
  }
]

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
    <tr className={`flex flex-col md:flex-row items-center border border-slate-900 ${!rankColorClass&&'hover:bg-sky-200' }  ${rankColorClass} hover:transform hover:-translate-y-1 hover:translate-x-1 transition-transform duration-300 ease-in-out`}>
      <td className="p-2 text-center ms-2 me-5 ">{badge}</td>
      <td className="text-md p-0 text-center me-5 ">
        <div className={ `p-2 w-full h-full me-5 flex items-center justify-center font-semibold bg-gray-500 border border-gray-50 border-spacing-4 outline-offset-2 text-gray-50  rounded-full ${BadgeColorClass}`} >
          {rank}
        </div>
      </td>
      <td className="p-4 me-5 flex items-center min-w-80 ">
        <img src={img} alt={name} className="w-9 me-3 h-9 mr-4 border border-gray-700 border-opacity-45 outline outline-offset-2 outline-1 rounded-full" />
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
  const sortedStudents = [...students].sort((a, b) => b.points - a.points);

  const rankMap = new Map();
  sortedStudents.forEach((student, index) => {
    rankMap.set(student.id, index + 1);
  });
  const badgeMap = new Map();
  sortedStudents.forEach((student, index) => {
    switch(rankMap.get(student.id))
    {
      case 1 :  badgeMap.set(student.id,<Image src={badge1} alt="badge1" width={30} height={30} />);
                break;
      case 2 :  badgeMap.set(student.id,<Image src={badge2} alt="badge2" width={30} height={30} />);
                break;
      case 3 :  badgeMap.set(student.id,<Image src={badge3} alt="badge3" width={30} height={30} />);
                break;
      default :  badgeMap.set(student.id,<PiMedalDuotone className='h-7 w-7 text-zinc-700' />);
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
