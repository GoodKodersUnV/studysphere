
import UserProfile from './UserProfile';
import logo from '/public/logo.png'
import Image from 'next/image';
// type newUser = User

// interface Props {
//   currentUser?: newUser | null;
//   open
// }

export default function ({ currentUser}) {

  const access = currentUser?.role === 'admin' || currentUser?.role === 'owner'
  
  return (

    <div className=' px-2 z-10 sticky top-0 bg-blue-100'>
      <div className='flex items-center justify-between p-1'>
        <div className='text-2xl font-bold flex gap-1.5 items-center'>
          <Image src={logo} width={'50'} className='-ml-3 p-0' height={'50'} alt='Logo' />
          <h1>StudySphere</h1>
        </div>
        <UserProfile currentUser={currentUser} access={access} />
      </div>
    </div>
  )
}