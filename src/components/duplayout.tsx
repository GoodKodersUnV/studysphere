"use client"
import { useState } from 'react';
import Header from '../components/Header'
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { TbArrowsJoin2 } from "react-icons/tb";
import { MdOutlineManageAccounts } from "react-icons/md";
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion'

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
    icon: <MdOutlineManageAccounts />,
    path: "/manage-quiz"
  }
]

export default function ({ children, currentUser }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      {currentUser && <Header currentUser={currentUser} open={open} setOpen={setOpen} />}
      {currentUser ? <div className='border flex min-h-[90vh] bg-gradient-to-bl from-bg-blue-100 to-bg-rose-100'>
        {/* side bar */}
        <div className={`${open ? "w-[15vw]" : ""} border flex flex-col`}>
          {
            links.map((link) => {
              return (
                <div onClick={() => router.push(link.path)} className='w-full cursor-pointer border p-2 flex h-[40px] hover:bg-white items-center gap-3' key={link.name}>
                  <h1 className='text-xl px-2'>{link.icon}</h1>
                  <h1 className={`${open === false && "hidden"}`}>{link.name}</h1>
                </div>
              )
            })
          }
        </div>
        <AnimatePresence key={pathname}>
          <motion.div className='w-full'
            initial={{ y: "-100vw", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div> :
        <div className='w-full'>{children}</div>
      }
    </div>
  )
}