"use client"

import { useEffect, useState } from "react";
import Quiz from "../Quiz.jsx";
import Loader from './loading.jsx'


const Page =async ({ params }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

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
        localStorage.setItem("temp", responseData)
        
        
      } catch (error) {
        console.error("Error generating quiz:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);
  


  return (
    <div className="h-screen">
      {
        isLoading ? <Loader/> : <Quiz questions={data} quizId={params.id} /> 
      }
    </div>
  );
};

export default Page;

