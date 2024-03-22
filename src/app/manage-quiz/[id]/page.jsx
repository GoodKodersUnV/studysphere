"use client"
import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Image from 'next/image';

export default function ({ params }) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const res = await axios.post("/api/get-leaderboard", {
                quizId: params.id
            })
            setUsers(res.data)
        }
        getUsers()
        console.log(users);
    }, [])
    const router = useRouter();
    return (
        <table className='w-3/4 m-auto mt-12'>
            <thead>
                <tr>
                    <th className='p-2 border-b'>Name</th>
                    <th className='p-2 border-b'>id</th>
                    <th className='p-2 border-b'>Points</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => {
                        return (
                            <tr className='hover:bg-gray-100 cursor-pointer' key={user.id} onClick={()=>router.push(`/profile/${user.User.id}`)}>
                                <td className='p-2 border-b flex gap-2'>
                                    <Image src={user.User.image} className='rounded-full' width={25} height={25} alt='profile' />
                                    {user.User.name}
                                </td>
                                <td className='p-2 border-b'>{user.User.id}</td>
                                <td className='p-2 border-b'>{user.points}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}