"use client";

import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";

const Message = ({ convId, setConversation, conversation }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/send-message", {
        convId: convId,
        message: message,
        sender: conversation.sender,
        receiver: conversation.receiver,
      });
      setConversation({...conversation, conversation: [...conversation.conversation, res.data]});
      setMessage("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="w-full flex mt-4 gap-5 px-5">
        <input
          value={message}
          className=" bg-slate-200 px-2 w-[90%]"
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <button
          className="flex justify-around items-center bg-blue-500 hover:bg-blue-400 text-white rounded p-2 w-[10%] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={!loading && handleSubmit}
        >
          {loading ? (
            <div className={`${loading ? "animate-spin" : ""}`}>
              <LuRefreshCcw />
            </div>
          ) : (
            <IoSend />
          )}
          Send
        </button>
      </form>
    </div>
  );
};

export default Message;
