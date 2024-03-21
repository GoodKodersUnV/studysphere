import getCurrentUser from '@/actions/getCurrentUser'
import Profile from '@/components/Profile'
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/signin');
  }
  return (
    <Profile currentUser={currentUser} />
  )
}

export default Page