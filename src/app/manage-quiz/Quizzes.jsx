"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WhatsappButton from "@/components/share";
import Image from 'next/image'
import image from '/public/assets/nodata.jpg'
import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import { BiSolidQuoteSingleRight } from "react-icons/bi";
import { FaExternalLinkAlt } from "react-icons/fa";
import Loader from "./loading";



const Quizzes = ({ currentUser }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [isloading, setisloading] = useState(true);


  const msg =
    "Hey, want to test your knowledge? Check out this quiz link and see how you fare, Let's see who gets the highest score!";
    
  useEffect(() => {
    const getQuizzes = async () => {
      const res = await axios.post("/api/get-quizzes-created", {
        userId: currentUser?.id,
      });
      setQuizzes(res.data);
      setisloading(false);
    };
    getQuizzes();
  }, []);

  const router = useRouter();


return (
        <div>
          {
            ( isloading )?
            <Loader/>:
            
              quizzes.length!==0 ?
              <table className='w-1/2 m-auto mt-12 mb-12 border'>
                  <thead>
                  <tr className="border">
                  <th className='p-2 border text-center'>Quiz name</th>
                          <th className='p-2 border text-center'>Share</th>
                          <th className='p-2 border text-center'>Details</th>
                          </tr>
                  </thead>
                  <tbody>
                  {
                          quizzes.map((quiz) => {
                              return (
                                  <tr className='' key={quiz.id} >
                                      <td className='p-2 border text-center'>{quiz.name}</td>
                                      <td className='p-2 border text-center text-green-600'><WhatsappButton url={`https://studysphere-ai.vercel.app/quiz/${quiz.id}`} msg={msg}/></td>
                                      <td onClick={() => router.push(`/manage-quiz/${quiz.id}`)} className='p-2 border cursor-pointer font-semibold text-center text-blue-500   hover:text-blue-700 underline underline-offset-2'>Enter</td>
                                  </tr>
                              )
                          })
                        }
                  </tbody>
              </table>
          :
          <div className=" flex flex-col items-center justify-center mt-8 ">
            <Image src={image} className=" w-96 h-96 text-center" alt="no Data found "  />
            <h1 className=" text-3xl text-gray-500 "> You haven't created any quiz yet... </h1> 
            <div className="mt-3 flex  justify-center">
              <BiSolidQuoteSingleLeft className="me-1" />
              <p className=" text-xl font-semibold">Create your quiz today! Explore different modes and challenge yourself. Dive in and share your knowledge.</p>
              <BiSolidQuoteSingleRight />
            </div>
            <button onClick={()=>router.push('/create-quiz')} className=" mt-3 flex gap-3 items-center justify-center py-2 px-3 rounded-xl text-gray-50 font-semibold  bg-cyan-600 hover:bg-cyan-700">Explore our quizes <FaExternalLinkAlt /></button>
          </div> 
          }
        
      </div>
    )
}

export default Quizzes;