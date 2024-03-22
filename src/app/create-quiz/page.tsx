"use client"

import React, { useState } from 'react'
import GenerateQuiz from './_components/GenerateQuiz'
import FileUpload from './_components/FileUpload'

const page = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const page = {
    "0": <h1>Hi</h1>,
    "1": <FileUpload />,
    "2": <GenerateQuiz />,
  }

  return (
    <div className=''>
      <div className="flex gap-20 p-5 justify-center items-center text-blue-500 hover:text-blue-700 cursor-pointer">
        <div onClick={() => setCurrentIndex(1)}>
          Generate from a file
        </div>
        <div onClick={() => setCurrentIndex(2)}>
          Generate using Ai
        </div>
        <div onClick={() => setCurrentIndex(3)}>
          Create Quiz Manually
        </div>
      </div>
      {page[currentIndex]}
    </div>
  )
}

export default page