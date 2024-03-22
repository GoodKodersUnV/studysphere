"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function () {
    const [id,setId] = useState("");
    const router = useRouter();
    return (
        <div>
            <div className="w-3/4 m-auto mt-[100px] flex flex-col gap-12">
                <input onChange={(e)=>setId(e.target.value)} type="text" className="w-[400px] block  m-auto border border-slate-300  bg-slate-100 outline-none p-3 rounded-full"/>
                <button onClick={()=>router.push(`/quiz/${id}`)} className="block m-auto border rounded p-2">Join Quiz</button>
            </div>
        </div>
    )
}