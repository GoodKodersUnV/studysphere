'use client'
import {  useRouter } from "next/navigation"
import React, { useState } from "react"
import { FaHourglassStart } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";


const QuizStartPage = ({quiz}) =>{

    const router = useRouter()
    const [timeLimit, setTimeLimit] = useState(10);
    console.log(quiz);

    const handleTimeLimitChange = (e) => {
        setTimeLimit(e.target.value);
    };

    const redirect = ()=>{
        router.push(  `/quiz/${quiz.id}`)
        localStorage.setItem('time',timeLimit)
        localStorage.setItem('stratedAt',(new Date()).toISOString())
    }   

    return (
        <div className="container ms-6 overflow-x-hidden mt-10">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-semibold mb-6">Quiz :<span className=" text-cyan-700" > {quiz.name}</span> </h1>
                    <p className="text-gray-700 mb-4">Quiz ID: {quiz.id}</p>
                    <p className="text-gray-700 mb-4">Created by: {quiz.createdBy.name}</p>
                    <p className="text-gray-700 mb-4 flex items-center">Number of participants: {quiz.usersPoints?.length || '0' }<IoIosPeople className="w-6 h-6 ms-1" /> </p>
                    <div className="flex items-center mb-4">
                        <label htmlFor="timeLimit" className="mr-2 text-gray-700">Time Limit (seconds): </label>
                        <input
                            type="number"
                            id="timeLimit"
                            value={timeLimit}
                            onChange={handleTimeLimitChange}
                            className="border-gray-500 border rounded-md ps-2 py-1"
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 flex-center gap-1 text-white font-semibold py-2 px-4 rounded"
                        onClick={redirect}
                    >
                        Start Quiz <FaHourglassStart className=" text-gray-900 w-4 h-4" />
                    </button>
                </div>
            </div> 
        </div>
    )
}


export default QuizStartPage;

