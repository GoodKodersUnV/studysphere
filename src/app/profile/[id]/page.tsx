
import getCurrentUser from '@/actions/getCurrentUser'
import React from 'react'
import Profile from './Profile'
import { useRouter } from 'next/navigation'

const page = async({params}) => {
  const currentUser =await getCurrentUser()

  return (
    <Profile currentUser={currentUser} params={params}/>
  )
}

export default page