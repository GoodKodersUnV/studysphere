import getCurrentUser from '@/actions/getCurrentUser';
import { db } from '@/libs/db';
import React from 'react'
import Message from './Message'

const page = async ({ params }) => {

  const currentUser = await getCurrentUser();

  const messageData = await db.friend.findFirst({
    where: {
      friendUserId: params.id,
      userId: currentUser.id,
    },
    include: {
      friendUser: true,
    }
  });


  return (
    <div>
      <h1>Message</h1>
      <p>Message ID: {params.id}</p>
      <p>Message Data: {JSON.stringify(messageData)}</p>
      <Message messageData={messageData} />
      
    </div>
  )
}

export default page