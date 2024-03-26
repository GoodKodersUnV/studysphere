"use client"

import React, { useEffect, useState } from 'react'
import Message from './Message'
import Messages from './Messages'
import axios from 'axios';


const page = ({ params }) => {

  const [conversation, setConversation] = useState(null)

  useEffect(() => {
    const fetchConversation = async () => {
      const { data } = await axios.post('/api/get-messages', {
        convId: params.id
      })
      setConversation(data)
    }

    fetchConversation()
  }
  , [])


  return (
    <div className=' overflow-x-hidden max-w-screen'>
      <h1>Message</h1>
      <p>Message ID: {params.id}</p>
      <p className='mb-24'>Message Data: {JSON.stringify(conversation, null, 5)}</p> 
      <div className=' outline min-h-[450px] px-3 flex flex-col justify-between outline-gray-400 outline-1 bg-zinc-50 pb-5'>
        {/* <Messages user={conversation?.user} friend={conversation?.friendUser} messages={conversation?.messages}/> */}
        <Message convId={params.id} setConversation={setConversation} />
      </div>
    </div>
  )
}

export default page