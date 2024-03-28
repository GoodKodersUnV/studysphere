"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Message = ({ message, user, friend }) => {
  let router = useRouter();

  let isReceiver = message.senderId === user.id;
  let messageContainerClass = isReceiver ? "flex-row-reverse" : "flex-row ";

  return (
    <div className={`flex items-center mb-2  ${messageContainerClass}`}>
      <div className={`flex items-center  p-0 ${messageContainerClass}`}>
        {isReceiver ? (
          <img
            src={user.image}
            alt={user.name}
            onClick={() => router.push(`/profile/${user.id}`)}
            className="w-10 h-10 rounded-full ml-4 cursor-pointer"
          />
        ) : (
          <img
            src={friend.image}
            alt={friend.name}
            onClick={() => router.push(`/profile/${friend.id}`)}
            className="w-10 h-10 rounded-full mr-4 cursor-pointer"
          />
        )}
        <div
          className={` p-[3px] px-3 min-w-56 text-sm rounded-lg max-w-sm mb-0 ${
            isReceiver ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          &nbsp;{message.message}
          <p
            style={{ fontSize: "11px" }}
            className={` text-gray-500 ml-auto  text-right ${
              isReceiver ? "bg-blue-600 text-white" : "bg-gray-200"
            } `}
          >
            &nbsp; {formattedDateTime(message.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

const formattedDateTime = (timestamp) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const formattedDay = day < 10 ? "0" + day : day;

  return `${formattedDay}-${month}-${year} ${formattedHours}:${formattedMinutes} ${period}`;
};

const MessagingPage = ({ messages, user, friend }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4 h-[450px] p-5 overflow-y-auto">
      {messages?.map((message, id) => (
        <Message user={user} friend={friend} key={id} message={message} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessagingPage;
