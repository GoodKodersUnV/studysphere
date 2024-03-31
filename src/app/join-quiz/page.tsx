"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import axios from "axios";
import WhatsappButton from "@/components/share";
import { MdOutlineLeaderboard } from "react-icons/md";

const Page = () => {
    const [id, setId] = useState("");
    const router = useRouter();
    const [quizzes, setQuizzes] = useState([]);



    const msg = "Hey, want to test your knowledge? Check out this quiz link and see how you perform , Let's see who gets the highest score!"

    useEffect(() => {
        const getQuizzes = async () => {
            const res = await axios.get("/api/get-all-quizzes");
            setQuizzes(res.data);
        }
        getQuizzes();
    }, [])

    return (
        <div>
            <div className="w-3/4 m-auto mt-[50px] flex flex-col gap-12 items-center">
                <input onChange={(e) => setId(e.target.value)} type="text" className="w-[400px] block  m-auto border border-slate-300  bg-slate-100 outline-none p-3 pl-6  rounded-full" />
                <div className="flex flex-center w-[30vw]">
                    <button onClick={() => router.push(`/quiz/${id}`)} className="block m-auto border rounded p-2 bg-blue-500 hover:bg-blue-600 text-white">Join Quiz</button>
                </div>
            </div>

            <table className='w-2/3 m-auto mt-12 mb-10'>
                <thead className="border">
                    <tr className="bg-orange-300 text-gray-600">
                        <th className='p-2 border text-center'>Id</th>
                        <th className='p-2 border text-center'>Name</th>
                        <th className='p-2 border text-center'>Share</th>
                        <th className='p-2 border text-center'>Participate</th>
                        <th className='p-2 border text-center'>Standings</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        quizzes.splice(0, 5).map((quiz) => {
                            return (
                                <tr className='hover:bg-gray-100 ' key={quiz.id}>
                                    <td className='p-2 border text-center '>{quiz.id}</td>
                                    <td className='p-2 border text-center '>{quiz.name}</td>
                                    <td className='p-2 border text-center cursor-pointer text-green-700'><WhatsappButton url={`https://studysphere-ai.vercel.app/quiz/${quiz.id}`} msg={msg} /></td>
                                    <td className='p-2 border text-center text-blue-500 cursor-pointer hover:font-semibold'><p onClick={() => router.push(`/quiz/${quiz.id}`)}>Enter</p></td>
                                    <td className='p-2 border text-center cursor-pointer text-red-600'><p onClick={() => router.push(`/leaderboard/${quiz.id}`)}><MdOutlineLeaderboard className="h-5 w-5 m-auto"/></p></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Page
