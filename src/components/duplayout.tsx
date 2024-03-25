"use client"
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { TbArrowsJoin2 } from 'react-icons/tb';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { LiaUserEditSolid } from 'react-icons/lia';
import { AiOutlineFontSize } from 'react-icons/ai';



export default function Layout({ children, currentUser }) {
  
    const [open, setOpen] = useState(true);
    const router = useRouter();
    const [layoutFontSize, setLayoutFontSize] = useState(16);
    const pathname = usePathname();
    const [fontopen, setFontopen] = useState(false);
  

  const links = [
  {
    name: 'Dashboard',
    icon: <LuLayoutDashboard />,
    path: '/',
    active:pathname===`/`
  },
  {
    name: 'Join Room',
    icon: <TbArrowsJoin2 />,
    path: '/join-quiz',
    active:pathname===`/join-quiz`
  },
  {
    name: 'Create Room',
    icon: <MdOutlineCreateNewFolder />,
    path: '/create-quiz',
    active:pathname===`/create-quiz`
  },
  {
    name: 'Manage',
    icon: <MdOutlineManageAccounts />,
    path: '/manage-quiz',
    active:pathname===`/manage-quiz`
  },
  {
    name: 'Edit profile',
    icon: <LiaUserEditSolid />,
    path: '/update-profile',
    active:pathname===`/update-profile`
  },
  {
    name: 'Friends',
    icon: <LiaUserFriendsSolid />,
    path: '/friends',
    active:pathname===`/friends`
  },
];


  useEffect(() => {
    document.documentElement.style.fontSize = `${layoutFontSize}px`;
  }, [layoutFontSize]);

  const SetSize = (data) => {
    setLayoutFontSize(data);
  };

  const handleOpen = () => {
    setFontopen((prev) => !prev);
  };

  return (
    <div>
      {currentUser && <Header currentUser={currentUser} open={open} setOpen={setOpen} />}
      {currentUser ? (
        <div className="border flex min-h-[90vh] bg-gradient-to-bl from-bg-blue-100 to-bg-rose-100">
          {/* side bar */}
          <div className={`${open ? 'w-[15vw]' : ''} border flex flex-col justify-between `}>
            <div>
              {links.map((link) => {
                return (
                  <div onClick={() => router.push(link.path)} className={( link.active ? "w-full h-[50px] flex items-center gap-3 border px-2 bg-blue-400": "bg-gray-50 w-full h-[50px] cursor-pointer flex items-center gap-3 border hover:bg-slate-200 px-2 "  )} key={link.name}>
                    <h1 className="text-xl px-3">{link.icon}</h1>
                    <h1 className={`${open === false && 'hidden'}`}>{link.name}</h1>
                  </div>
                );
              })}
              <div className={`${open ? 'w-[15vw]' : ''} flex  cursor-pointer relative justify-center text-xl items-center border px-2 h-[50px] hover:bg-white text-center`} onClick={handleOpen}>
                <AiOutlineFontSize />
                <div>
                  {fontopen ? (
                      <div className="absolute font-semibold w-full top-12 text-sm left-0 text-blue-950 cursor-pointer" style={{ borderRadius: 5 }}>
                        <p className="p-2 w-full hover:bg-slate-200" onClick={() => SetSize(10)}>
                          10px
                        </p>
                        <p className="p-2 w-full hover:bg-slate-200" onClick={() => SetSize(16)}>
                          16px
                        </p>
                        <p className="p-2 w-full hover:bg-slate-200" onClick={() => SetSize(20)}>
                          20px
                        </p>
                        <p className="p-2 w-full hover:bg-slate-200" onClick={() => SetSize(24)}>
                          24px
                        </p>
                        <p className="p-2 w-full hover:bg-slate-200" onClick={() => SetSize(28)}>
                          28px
                        </p>
                      </div>
                  ) : (
                    <div></div>
                  )}
                </div>
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
