"use client"
import { useState } from 'react';
import Header from '../components/Header';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { TbArrowsJoin2 } from 'react-icons/tb';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { LiaUserEditSolid } from 'react-icons/lia';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";




export default function Layout({ children, currentUser }) {

  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();


  const links = [
    {
      name: 'Dashboard',
      icon: <LuLayoutDashboard />,
      path: '/',
      active: pathname === `/`
    },
    {
      name: 'Join Room',
      icon: <TbArrowsJoin2 />,
      path: '/join-quiz',
      active: pathname.includes(`/join-quiz`)
    },
    {
      name: 'Create Room',
      icon: <MdOutlineCreateNewFolder />,
      path: '/create-quiz',
      active: pathname.includes(`/create-quiz`)
    },
    {
      name: 'Manage',
      icon: <MdOutlineManageAccounts />,
      path: '/manage-quiz',
      active: pathname.includes(`/manage-quiz`)
    },
    {
      name: 'Edit profile',
      icon: <LiaUserEditSolid />,
      path: '/update-profile',
      active: pathname.includes(`/update-profile`)
    },
    {
      name: 'Friends',
      icon: <LiaUserFriendsSolid />,
      path: '/friends',
      active: pathname.includes(`/friends`)
    },
    {
      name: 'Messages',
      icon: <TiMessages />,
      path: '/message',
      active: pathname.includes(`/message`)
    },
  ];

  const status = () => {
    setOpen(prev => !prev);
  }

  return (
    <div>
      {currentUser && <Header currentUser={currentUser} />}
      {currentUser ? (
        <div className="flex min-h-[90vh]">
          {/* side bar */}
          <div className={`${open ? 'w-[18vw]' : ''} flex bg-orange-50 flex-col justify-between `}>
            <div>
              {links.map((link) => {
                return (
                  <div onClick={() => router.push(link.path)} className={(link.active ? "w-full h-[50px] flex items-center gap-3 px-2 bg-orange-200" : "bg-orange-50 w-full h-[50px] cursor-pointer flex items-center gap-3 hover:bg-orange-100 px-2 ")} key={link.name}>
                    <h1 className="text-xl px-3">{link.icon}</h1>
                    <h1 className={`${open === false && 'hidden'}`}>{link.name}</h1>
                  </div>
                );
              })}
              <div onClick={status}>
                {
                  open ? <FaAngleDoubleLeft className="h-6 w-6 mt-3 ml-[80%] text-orange-300" /> :
                    <FaAngleDoubleRight className="h-6 w-6 m-auto mt-3 text-orange-300" />
                }
              </div>
            </div>
          </div>
          <AnimatePresence key={pathname}>
            <motion.div
              className={`w-full`}
              initial={{ y: '-100vw', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="w-full">{children}</div>
      )}
    </div>
  );
}
