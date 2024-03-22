import { User } from '@prisma/client';
import UserProfile from './UserProfile';
import { motion } from 'framer-motion';
// type newUser = User

// interface Props {
//   currentUser?: newUser | null;
//   open
// }

export default function ({ currentUser,open,setOpen }) {

  const access = currentUser?.role === 'admin' || currentUser?.role === 'owner'
  
  return (

    <div className='shadow-md px-2 bg-white z-10 sticky top-0'>
      <div className='flex items-center justify-between p-2'>
        <div className='text-2xl font-bold flex gap-3 items-center'>
          <motion.button onClick={() => setOpen(!open)} className="z-50 flex flex-col w-[20px] h-[16px] justify-between">
            <motion.div animate={open ? { rotate: 45 } : { rotate: 0 }} className="w-full border border-black rounded origin-left"></motion.div>
            <motion.div animate={open ? { opacity: 0 } : { opacity: 1 }} className="w-full border border-black rounded"></motion.div>
            <motion.div animate={open ? { rotate: -45 } : { rotate: 0 }} className="w-full border border-black rounded origin-left"></motion.div>
          </motion.button>
          <h1>StudySphere</h1>
        </div>
        <UserProfile currentUser={currentUser} access={access} />
      </div>
    </div>
  )
}