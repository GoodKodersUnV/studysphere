"use client";

import axios from "axios";
import React, { useState } from "react";

const Message = ({ convId }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {

    const res = await axios.post("/api/send-message",{
      convId :  convId,
      message : message,
    })

    console.log(res);
    setMessage("")
  };

  return (
    <div>
      {/* <div>1st Message Data Received :  {JSON.stringify(messageData[0]?.message) || "null"}</div> */}
      <div className="w-full mt-4 grid grid-cols-12 gap-5">
        <input value={message} className=" bg-slate-200 px-2 col-span-11" onChange={(e)=>setMessage(e.target.value)} />
        <button className="bg-blue-500 hover:bg-blue-400 text-white rounded p-2 col-span-1" onClick={handleSubmit}>
            Send
        </button>
      </div>
    </div>
  );
};

export default Message;
