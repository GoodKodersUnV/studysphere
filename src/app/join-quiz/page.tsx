"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import axios from "axios";

export default function () {
    const [id, setId] = useState("");
    const router = useRouter();
    const [quizzes, setQuizzes] = useState([]);
    const handleClick = () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          setTimeout(() => {
            navigator.serviceWorker.ready.then(function(registration) {
              registration.showNotification('StudySphere', {
                body: 'You hava a quiz scheduled !!',
                icon: 'https://i.postimg.cc/SQfrbS65/webathon-logo-removebg-preview.png',
              });
            });
          },3000);
        }
      };
    useEffect(() => {
        const getQuizzes = async () => {
            const res = await axios.get("/api/get-all-quizzes");
            setQuizzes(JSON.stringify(res.data));
        }
        getQuizzes();
    }, [])

    return (
        <div>
            <div className="w-3/4 m-auto mt-[100px] flex flex-col gap-12 items-center">
                <input onChange={(e) => setId(e.target.value)} type="text" className="w-[400px] block  m-auto border border-slate-300  bg-slate-100 outline-none p-3 rounded-full" />
                <div className="flex flex-center w-[30vw]">
                    <button onClick={() => router.push(`/quiz/${id}`)} className="block m-auto border rounded p-2 bg-blue-500 text-white">Join Quiz</button>
                    <button onClick={()=>handleClick()} className="block m-auto border rounded p-2 bg-blue-500 text-white">Notify me</button>
                </div>
            </div>

            {/* {
                (quizzes)
            } */}
        </div>
    )
}