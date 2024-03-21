import React from 'react'
import Owner from './_components/Owner'
import Admin from './_components/Admin'
import getCurrentUser from '@/actions/getCurrentUser'
import { redirect } from 'next/navigation'

const page = async ({ params }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/');
  }
  const access = currentUser.role == 'admin' || currentUser.role == 'owner'

  if (!currentUser || !access) {
    redirect('/');
  }

  if (currentUser.role == 'owner') {
    return (
      <Owner params={params} />
    )
  }
  if (currentUser.role == 'admin') {
    return (
      <Admin params={params} />
    )
  }
}

export default page