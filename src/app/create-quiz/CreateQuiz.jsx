"use client"

import React, { useEffect, useState } from 'react'
import GenerateQuiz from './_components/GenerateQuiz'
import FileUpload from './_components/FileUpload'
import CreateRoomFooter from './_components/CreateRoomFooter'
import CreateManually from './_components/CreateManually'
import { FaRegFilePdf } from "react-icons/fa6";
import { SiOpenai } from "react-icons/si";
import { GiTwoCoins } from "react-icons/gi";
import { TfiWrite } from "react-icons/tfi";

const CreateQuiz = ({token}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const page = {
    "0": <CreateRoomFooter />,
    "1": <FileUpload  token={token} />,
    "2": <GenerateQuiz  token={token} />,
    "3": <CreateManually />,
  }

  let isActive1 = currentIndex === 1 ? ' text-blue-500' : ''
  let isActive2 = currentIndex === 2 ? ' text-blue-500' : ''
  let isActive3 = currentIndex === 3 ? ' text-blue-500' : ''

  return (
    <div className='border'>
      <div className="flex gap-20 p-5 justify-center items-center font-semibold cursor-pointer">
        <div className={` ${isActive1} flex items-center `} onClick={() => setCurrentIndex(1)}>
          <FaRegFilePdf className='w-6 h-6' /> &nbsp;
          Generate from a file
        </div>
        <div className={` ${isActive2} flex items-center `} onClick={() => setCurrentIndex(2)}>
          <SiOpenai className='w-6 h-6' />&nbsp;
          Generate using Ai
        </div>
        <div className={` ${isActive3} flex items-center `} onClick={() => setCurrentIndex(3)}>
          <TfiWrite className='w-6 h-6' /> &nbsp;
          Create Quiz Manually
        </div>
        <div className='right-0 flex items-center gap-2 py-1 top-5 px-3 rounded border bg-yellow-300'>
          {token} <GiTwoCoins className="text-xl"/>
        </div>
      </div>
      <hr className=' bg-slate-950 ' style={{ height: '1.5px' }} />
      {page[currentIndex]}
    </div>
  )
}

export default CreateQuiz