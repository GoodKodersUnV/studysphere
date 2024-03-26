"use client"
import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import WhatsappButton from "@/components/share"
import { MdOutlineLeaderboard } from "react-icons/md";

const Quizzes = ({ currentUser }) => {
    const [quizzes, setQuizzes] = useState([]);
    const msg="Hey, want to test your knowledge? Check out this quiz link and see how you fare, Let's see who gets the highest score!"
    useEffect(() => {
        const getQuizzes = async () => {
            const res = await axios.post("/api/get-quizzes-created", {
                userId: currentUser?.id
            })
            setQuizzes(res.data)
        }
        getQuizzes()
    }, [])
    const router = useRouter();
    return (
        <table className='w-2/3 m-auto mt-12 border'>
            <thead>
                <tr className="border">
                    <th className='p-2 border text-center'>id</th>
                    <th className='p-2 border text-center'>Name</th>
                    <th className='p-2 border text-center'>Share</th>
                    <th className='p-2 border text-center'>Participate</th>
                    <th className='p-2 border text-center'>Standings</th>
                </tr>
            </thead>
            <tbody>
                {
                    quizzes.map((quiz) => {
                        return (
                            <tr className='hover:bg-gray-100 cursor-pointer' key={quiz.id}>
                                <td className='p-2 border text-center'>{quiz.id}</td>
                                <td className='p-2 border text-center'>{quiz.name}</td>
                                <td className='p-2 border text-center text-green-600'><WhatsappButton url={`https://studysphere-ai.vercel.app/quiz/${quiz.id}`} msg={msg}/></td>
                                <td className='p-2 border text-center text-blue-500 hover:font-semibold'><p onClick={() => router.push(`/quiz/${quiz.id}`)}>Enter</p></td>
                                <td className='p-2 border text-center text-red-600'><p onClick={() => router.push(`/manage-quiz/${quiz.id}`)}><MdOutlineLeaderboard className="h-5 w-5 m-auto"/></p></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Quizzes