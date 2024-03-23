"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import axios from "axios";
import WhatsappButton from "@/components/share";


const Page = () => {
    const [id, setId] = useState("");
    const router = useRouter();
    const [quizzes, setQuizzes] = useState([]);

    const msg="Hey, want to test your knowledge? Check out this quiz link and see how you fare, Let's see who gets the highest score!"

    useEffect(() => {
        const getQuizzes = async () => {
            const res = await axios.get("/api/get-all-quizzes");
            setQuizzes(res.data);
        }
        getQuizzes();
    }, [])
    return (
        <div>
            <div className="w-3/4 m-auto mt-[100px] flex flex-col gap-12">
                <input onChange={(e) => setId(e.target.value)} type="text" className="w-[400px] block  m-auto border border-slate-300  bg-slate-100 outline-none p-3 rounded-full" />
                <button onClick={() => router.push(`/quiz/${id}`)} className="block m-auto border rounded p-2">Join Quiz</button>
            </div>
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
                        quizzes.splice(0,5).map((quiz) => {
                            return (
                                <tr onClick={() => router.push(`/quiz/${quiz.id}`)} className='hover:bg-gray-100 cursor-pointer' key={quiz.id}>
                                    <td className='p-2 border-b'>{quiz.id}</td>
                                    <td className='p-2 border-b'>{quiz.name}</td>
                                    <td className='p-2 border-b'><WhatsappButton url={`https://studysphere-ai.vercel.app/quiz/${quiz.id}`} msg={msg} /></td>
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
