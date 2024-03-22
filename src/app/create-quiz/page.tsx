"use client"

import React, { useState } from 'react'
import GenerateQuiz from './_components/GenerateQuiz'
import FileUpload from './_components/FileUpload'
import CreateRoomFooter from './_components/CreateRoomFooter'
import { FaFileExport } from "react-icons/fa";
import { GiArtificialHive } from "react-icons/gi";


const page = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const page = {
    "0": <CreateRoomFooter/>,
    "1": <FileUpload />,
    "2": <GenerateQuiz />,
  }

  return (
    <div>
      <div className='border'>
        <div className="flex gap-20 p-5 justify-center items-center cursor-pointer">
          <div onClick={() => setCurrentIndex(1)}>
            <FaFileExport/>
            Generate from a file
          </div>
          <div onClick={() => setCurrentIndex(2)}>
            <GiArtificialHive/>
            Generate using Ai
          </div>
          <div onClick={() => setCurrentIndex(3)}>
            
            Create Quiz Manually
          </div>
        </div>
      </div>
    {page[currentIndex]}
    </div>
  )
}

export default page