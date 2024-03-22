import { User } from '@prisma/client';
import UserProfile from './UserProfile';
import { motion } from 'framer-motion';
import logo from '/public/logo.png'
import Image from 'next/image';
// type newUser = User

// interface Props {
//   currentUser?: newUser | null;
//   open
// }

export default function ({ currentUser,open,setOpen }) {

  const access = currentUser?.role === 'admin' || currentUser?.role === 'owner'
  
  return (

    <div className='bg-blue-100 px-2 z-10 sticky top-0'>
      <div className='flex items-center justify-between p-2'>
        <div className='text-2xl font-bold flex gap-3 items-center'>
          <motion.button onClick={() => setOpen(!open)} className="z-50 flex flex-col w-[20px] h-[16px] justify-between">
            <motion.div animate={open ? { rotate: 45 } : { rotate: 0 }} className="w-full border border-black rounded origin-left"></motion.div>
            <motion.div animate={open ? { opacity: 0 } : { opacity: 1 }} className="w-full border border-black rounded"></motion.div>
            <motion.div animate={open ? { rotate: -45 } : { rotate: 0 }} className="w-full border border-black rounded origin-left"></motion.div>
          </motion.button>
          <Image src={logo} width={'50'} className='m-0 p-0' height={'50'} alt='Logo' />
          <h1>StudySphere</h1>
        </div>
        <UserProfile currentUser={currentUser} access={access} />
      </div>
    </div>
  )
}