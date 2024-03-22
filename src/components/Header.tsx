"use client"

import React from 'react'
import Link from 'next/link';
import { User } from '@prisma/client';
import UserProfile from './UserProfile';
type newUser = User

interface Props {
  currentUser?: newUser | null;
}

const Header: React.FC<Props> = ({ currentUser }) => {

  const access = currentUser?.role === 'admin' || currentUser?.role === 'owner'

  return (

    <div className='shadow-md px-2 bg-white z-10 sticky top-0'>
      <div className='flex items-center justify-between p-2'>

        <Link href='/'>
          <div className='text-2xl font-bold '>
            StudySphere
          </div>
        </Link>
        <UserProfile currentUser={currentUser} access={access} />
      </div>
    </div>
  )
}

export default Header