"use client";

import axios from "axios";
import React, { useState } from "react";

const Message = ({ messageData }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    console.log("ajsdh");

    const res = await axios.post("/api/send-message",{
      convId : messageData.id,
      message : message,
      messages : messageData.messages
    })

    setMessage("")
  };
  return (
    <div>
      <div>{JSON.stringify(messageData?.messages) || ""}</div>

      <div>
        <input value={message} onChange={(e)=>setMessage(e.target.value)} />
        <button className="bg-blue-500 text-white rounded p-2" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
