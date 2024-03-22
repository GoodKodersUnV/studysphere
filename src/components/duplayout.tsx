"use client"
import { useState } from 'react';
import Header from '../components/Header'
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { TbArrowsJoin2 } from "react-icons/tb";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useRouter } from 'next/navigation';

const links = [
    {
      name: "Dashboard",
      icon: <LuLayoutDashboard />,
      path: "/"
    },
    {
      name: "Join Room",
      icon: <TbArrowsJoin2 />,
      path: "/join-quiz"
    },
    {
      name: "Create Room",
      icon: <MdOutlineCreateNewFolder />,
      path: "/create-quiz"
    },
    {
      name: "Manage",
      icon: <MdOutlineManageAccounts/>,
      path: "/manage-quiz"
    }
  ]

export default function ({ children, currentUser }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    return (
        <div>
            {currentUser && <Header currentUser={currentUser} open={open} setOpen={setOpen} />}
            <div className='border flex min-h-[90vh]'>
                {/* side bar */}
                <div className={`${open ? "w-[15vw]" : ""} border flex flex-col`}>
                    {
                        links.map((link) => {
                            return (
                                <div onClick={()=>router.push(link.path)} className='w-full cursor-pointer border p-2 flex h-[40px] hover:bg-gray-100 items-center gap-3' key={link.name}>
                                    <h1 className='text-xl px-2'>{link.icon}</h1>
                                    <h1 className={`${open === false && "hidden"}`}>{link.name}</h1>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='w-full'>{children}</div>
            </div>
        </div>
    )
}