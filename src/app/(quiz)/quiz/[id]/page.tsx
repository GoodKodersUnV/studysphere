"use client"

import { useEffect, useState } from "react";
import Quiz from "../Quiz.jsx";

const Page = ({ params }) => {
  // let questions = require("/home/uday/Desktop/learnease/dummy.json");

  // let questions = JSON.parse(localStorage.getItem("data"));

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a POST request to /api/questions with the amount and topic
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
        // Handle the response if needed
        console.log(responseData)
        setData(responseData.questions)
        localStorage.setItem("temp", responseData)
      } catch (error) {
        // Handle errors
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
        isLoading ? "loading .. " : <Quiz questions={data} />
      }
    </div>
  );
};

export default Page;

