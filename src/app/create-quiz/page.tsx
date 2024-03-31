"use client"

import { useEffect, useState } from "react";
import CreateQuiz from "./CreateQuiz";
import axios from "axios";

const Page = () => {
  const [token, setToken] = useState("fetching...");

  useEffect(() => {
    const getTokens = async () => {
      try {
        const res = await axios.post("/api/get-user-tokens");
        setToken(res.data.token);
      } catch (error) {
        console.error("Error fetching tokens:", error);
        setToken("Error fetching tokens");
      }
    };

    getTokens();
  }, []);

  return (
    <CreateQuiz token={token} />
  );
};

export default Page;
