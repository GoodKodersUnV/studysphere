"use client"

import React, { useEffect, useState } from 'react';
import Message from './Message';
import Messages from './Messages';
import axios from 'axios';
import { LuRefreshCcw } from 'react-icons/lu';
import { IoChatbubblesOutline } from 'react-icons/io5';

const MainPage = ({ params }) => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchConversation = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/get-messages', {
        convId: params.id
      });
      setConversation(data);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversation();
  }, []);



  const handleRefresh = () => {
    fetchConversation();
  };

  return (
    <div className='overflow-x-hidden'>

      <div className='outline min-h-[450px] mx-5 px-3 flex flex-col justify-between outline-gray-400 outline-1 bg-zinc-50 pb-5 overflow-y-auto'>
        <div className="container mx-auto pt-3">
          <div className='flex items-center justify-between px-5 py-2 shadow-md rounded-md'>
            <div>
              <p className='text-gray-600'>Name: {conversation?.receiver.name}</p>
            </div>
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-semibold mb-4 text-center flex">Messaging MainPage <IoChatbubblesOutline className='w-7 h-7 ml-2' /></h1>
            </div>
            <div className={`${loading ? 'animate-spin' : ''} cursor-pointer bg-slate-200 p-2 rounded-full`} onClick={handleRefresh}>
              <LuRefreshCcw />
            </div>
          </div>
          <Messages user={conversation?.sender} friend={conversation?.receiver} messages={conversation?.conversation} />
        </div>
        <Message convId={params.id} setConversation={setConversation} conversation={conversation} />
      </div>
    </div>
  );
};

export default MainPage;
