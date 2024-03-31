'use client'

import { useRouter } from 'next/navigation';
import UserProfile from './UserProfile';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NotificationModal from './NotificationModal';
import { IoNotificationsCircle } from "react-icons/io5";

export default function Header({ currentUser }: { currentUser: any }) {

  const access = currentUser?.role === 'admin' || currentUser?.role === 'owner'
  const router = useRouter()

  const [showNotification, setShowNotification] = useState(false)
  const [notifications, setNotifications] = useState(currentUser?.notifications.filter((notification) => !notification.readAt) || [])
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (event.target.closest('.header')) {
        return;
      }
      setShowNotification(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotification]);

  return (
    <div className=' px-2 z-10 sticky top-0 header'>
      <div className='flex items-center justify-between p-1  '>
        <div className='text-2xl font-bold flex gap-1.5 items-center'>
          <Image onClick={() => router.push('/')} src={'https://i.postimg.cc/j5Sw7w7B/Your-paragraph-text-removebg-preview-1.png'} width={100} className='ml-2 cursor-pointer p-0' height={100} alt='Logo' />
          
        </div>
        <div className='flex items-center gap-5 relative'>
          <div className=' relative' >
            <div className='cursor-pointer'>
              <IoNotificationsCircle size={30} onClick={() => setShowNotification(!showNotification)} />
            </div>
            {
              notifications.length > 0 && <div className='absolute -top-2 -right-2 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center'>
                {notifications.length}
              </div>
            }
            {showNotification && (
              <div className='absolute right-0 mt-2'>
                <NotificationModal notifications={notifications} setNotifications={setNotifications} />
              </div>
            )}
          </div>
          <UserProfile currentUser={currentUser} access={access} />
        </div>
      </div>
    </div>
  );
}
