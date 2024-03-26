'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoChatbubblesOutline } from "react-icons/io5";


const Message = ({ message ,user ,friend}) => {
    
    let router = useRouter()
    
    let isReceiver = message.friend.friendId !== user.id ;
    let messageContainerClass = isReceiver ?  'flex-row-reverse':'flex-row ';

    // console.log( isReceiver);
    // receiver ->user and sender -> friendUser
    return (
        <div className={`flex items-center mb-2  ${messageContainerClass}`}>
            <div className={`flex items-center  p-0 ${messageContainerClass}`}>
                {
                    isReceiver ?  
                    <img src={user.image } alt={user.name} onClick={() => router.push(`/profile/${user.id}`)} 
                    className="w-10 h-10 rounded-full ml-4 cursor-pointer"
                    />
                    :
                    <img src={ friend.image} alt={friend.name} onClick={() => router.push(`/profile/${friend.id}`)} 
                    className="w-10 h-10 rounded-full mr-4 cursor-pointer"
                    />
                }
                <div className={` p-[3px] px-3 min-w-56 text-sm rounded-lg max-w-sm mb-0 ${isReceiver ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    &nbsp;{message.message}
                    <p style={{fontSize:'11px'}} className={` text-gray-500 ml-auto  text-right ${isReceiver ? 'bg-blue-600 text-white' : 'bg-gray-200'} `}>&nbsp; {formattedTime(message.createdAt)}</p>
                </div>
            </div>
        </div>
    );
    };

const formattedTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
};




const MessagingPage = ({ messages,user,friend  }) => {
    
    return (
        <div className="container mx-auto pt-3">
            <h1 className="text-2xl font-semibold mb-4 text-center flex items-center justify-center">Messaging Page &nbsp; <IoChatbubblesOutline className=' w-7 h-7' /></h1>
            <div className="flex flex-col space-y-4">
                {messages?.map((message, id) => (
                    <Message user={user} friend={friend}  key={id} message={message} />
                ))}
            </div>
        </div>
    );
    };

    export default MessagingPage;
