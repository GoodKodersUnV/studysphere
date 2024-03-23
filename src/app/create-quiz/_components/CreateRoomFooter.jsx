import React from "react"
import pdftotext from '/public/pdf-to-text.png'
import Image from 'next/image';


export default function() {
    return (
            <div className="grid grid-cols-3 gap-10 m-10 mt-24">
                <div className="col-span-1 text-center">
                    <Image src={pdftotext} alt="" className="block m-auto w-40 h-32"/>
                    <p className="mt-4 font-bold text-blue-950 text-xl">Generate from a file</p>
                    <p className="font-semibold text-neutral-500 text-sm mt-2">Effortlessly transform your data with just a file upload.</p>
                </div>
                <div className="col-span-1 text-center">
                    <img src="https://logos-download.com/wp-content/uploads/2022/06/OpenAI_Logo.svg" alt="" className="block m-auto w-40 h-32"/>
                    <p className="mt-4 font-bold text-blue-950 text-xl">Generate using AI</p>
                    <p className="font-semibold text-neutral-500 text-sm mt-2">Empower your projects with AI-generated solutions tailored to your needs, only a click away.</p>
                </div>
                <div className="col-span-1 text-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/3352/3352475.png" alt="" className="block m-auto w-40 h-32"/>
                    <p className="mt-4 font-bold text-blue-950 text-xl">Create Quiz Manually</p>
                    <p className="font-semibold text-neutral-500 text-sm mt-2">Empower your creativity by crafting quizzes manually, tailored to your exact needs.</p>
                </div>
            </div>
    )
}