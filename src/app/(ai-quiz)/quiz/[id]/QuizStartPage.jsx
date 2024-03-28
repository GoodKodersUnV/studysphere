'use client'

import React, { useState } from "react";
import { IoIosPeople } from "react-icons/io";
import useTimeStore from '@/hooks/useTimeStore'

const QuizStartPage = ({ quiz }) => {
    const [timeLimit, setTimeLimit] = useState(10);

    const { setDuration,Mode,setMode,duration } = useTimeStore();

    const handleTimeLimitChange = (e) => {
        setTimeLimit(e.target.value);
        setDuration(e.target.value);
    };

    const handleMode = (e) =>{
        setMode(e.target.value)
        if(e.target.value==='no-limit')
            setDuration(null);
        else setDuration(timeLimit)
    }

    return (
        <div className="container ms-6 overflow-x-hidden mt-10">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-semibold mb-6">Quiz :<span className="text-cyan-700"> {quiz.name}</span> </h1>
                    <p className="text-gray-700 mb-4">Quiz ID: {quiz.id}</p>
                    <p className="text-gray-700 mb-4">Created by: {quiz.createdBy.name}</p>
                    <p className="text-gray-700 mb-4 flex items-center">Number of participants: {quiz.usersPoints?.length || '0'}<IoIosPeople className="w-6 h-6 ms-1" /> </p>
                    <div className="flex items-center mb-4">
                        <label htmlFor="mode" className="mr-2 text-gray-700">Mode: </label>
                        <select
                            id="mode"
                            value={Mode}
                            onChange={(e) =>handleMode(e)}
                            className="border-gray-500 border rounded-md ps-2 py-1"
                        >
                            <option value="" disabled selected >Please select a mode</option>
                            <option value="quiz-mode">Quiz Mode</option>
                            <option value="timer-mode">Timer Mode</option>
                            <option value="no-limit">No Limit</option>
                        </select>
                    </div>
                    {Mode === 'quiz-mode' && (
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
                    )}
                    {Mode === 'timer-mode' && (
                        <div className="flex items-center mb-4">
                            <label htmlFor="timer" className="mr-2 text-gray-700">Timer (seconds): </label>
                            <input
                                type="number"
                                id="timer"
                                value={timeLimit}
                                onChange={handleTimeLimitChange}
                                className="border-gray-500 border rounded-md ps-2 py-1"
                            />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default QuizStartPage;
