'use client'

import { useEffect, useState } from "react";
import QuizStartPage from "./QuizStartPage";
import Quiz from "../Quiz";
import { FaHourglassStart } from "react-icons/fa";
import useTimeStore from "@/hooks/useTimeStore";

const RedirectQuiz=({quiz,params})=>{
    const [redirectQuiz, setredirectQuiz] = useState(true);
    const [data, setData] = useState();

    const {setStartTime} = useTimeStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/get-questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quizId: params.id }),
                });
                if (!response.ok) {
                throw new Error(`Error generating quiz: ${response.status}`);
                }
                const responseData = await response.json();
                setData(responseData.questions)
                
                
            } catch (error) {
                console.error("Error generating quiz:", error.message);
            }
        };

        fetchData();
    }, [params.id]);


    return (
    <div className="h-screen">
    {
        redirectQuiz ? (
            <div>
                <QuizStartPage quiz={quiz}  />
                <button
                    className="bg-blue-500 ms-12 hover:bg-blue-600 flex-center gap-1 text-white font-semibold py-2 px-4 rounded"
                    onClick={()=>(setredirectQuiz(false) ,setStartTime(new Date().toISOString()) )}
                >
                    Start Quiz <FaHourglassStart className=" text-gray-900 w-4 h-4" />
                </button>
            </div>
            ) 
            :
            <Quiz questions={data} quizId={params.id} /> 
    }
    </div>
    )
}


export default RedirectQuiz;