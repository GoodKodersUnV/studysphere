import getCurrentUser from '@/actions/getCurrentUser';
import { db } from '@/libs/db';
import React from 'react'
import Message from './Message'
import Messages from './Messages'


const page = async ({ params }) => {

  const currentUser = await getCurrentUser();

  const messageData = await db.friend.findFirst({
    where: {
      friendUserId: params.id,
      userId: currentUser.id,
    },
    include: {
      user: true,
      friendUser: true,
      messages: {
        include:{
          friend: {
            select  : {
              userId: true,
              friendUserId: true,
          },
        }
      },
    }
  }});

  // console.log(JSON.stringify(messageData));


  return (
    <div className=' overflow-x-hidden max-w-screen'>
      <h1>Message</h1>
      <p>Message ID: {params.id}</p>
      <p className='mb-24'>Message Data: {JSON.stringify(messageData, null, 5)}</p> 
      <div className=' outline min-h-[450px] px-3 flex flex-col justify-between outline-gray-400 outline-1 bg-zinc-50 pb-5'>
        <Messages user={messageData?.user} friend={messageData?.friendUser} messages={messageData?.messages}/>
        <Message messageData={messageData} />
      </div>
    </div>
  )
}

export default page