"use client"
import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import WhatsappButton from "@/components/share"

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
        <table className='w-1/2 m-auto mt-12'>
            <thead>
                <tr>
                    <th className='p-2 border-b'>id</th>
                    <th className='p-2 border-b'>Name</th>
                    <th className='p-2 border-b'></th>
                </tr>
            </thead>
            <tbody>
                {
                    quizzes.map((quiz) => {
                        return (
                            <tr onClick={()=>router.push(`/manage-quiz/${quiz.id}`)} className='hover:bg-gray-100 cursor-pointer' key={quiz.id}>
                                <td className='p-2 border-b'>{quiz.id}</td>
                                <td className='p-2 border-b'>{quiz.name}</td>
                                <td className='p-2 border-b'><WhatsappButton url={`https://studysphere-ai.vercel.app/quiz/${quiz.id}`} msg={msg}/></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Quizzes