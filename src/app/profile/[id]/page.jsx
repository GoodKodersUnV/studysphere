"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function ({ params }) {
    const router=useRouter();
    const [profile, setProfile] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => {
        const getProfile = async () => {
            const res = await axios.post("/api/get-quizzes-taken", {
                userId: params.id
            })
            setProfile(res.data)
        }
        getProfile()
        const getUser = async () => {
            try {
                const response = await fetch("/api/get-user-details/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: params.id }),
                    });
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser();
    }, [])

    return (
        <div className="m-5 border flex h-full">
            <div className="w-[75%] p-5">
                <div className="flex gap-4">
                    <div>
                        <Image src={user.image} width={100} height={100} className="rounded" alt="profile" />
                    </div>
                    <div className="flex flex-col justify-between">
                        <h1>{user.email}</h1>
                        <h1>{user.id}</h1>
                        <h1>{user.name}</h1>
                        <h1>{user.createdAt}</h1>
                    </div>
                </div>
                <table className='w-1/2 m-auto mt-12'>
                    <thead>
                        <tr>
                            <th className='p-2 border-b'>id</th>
                            <th className='p-2 border-b'>Name</th>
                            <th className='p-2 border-b'>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            profile.map((quiz) => {
                                return (
                                    <tr onClick={() => router.push(`/manage-quiz/${quiz.id}`)} className='hover:bg-gray-100 cursor-pointer' key={quiz.id}>
                                        <td className='p-2 border-b'>{quiz.id}</td>
                                        <td className='p-2 border-b'>{quiz.Quiz.name}</td>
                                        <td className='p-2 border-b'>{quiz.points}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="border p-5 w-[25%]">
                Friends
            </div>
        </div>
    )
}