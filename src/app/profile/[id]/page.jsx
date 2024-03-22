"use client"

import { useEffect, useState } from "react";
import axios from "axios";


export default function({params}) {
    const [profile, setProfile] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => {
        const getProfile = async () => {
            const res = await axios.post("/api/get-quizzes-taken", {
                userId: params.id
            })
            setProfile(res.data)
        }
        getProfile()
        const getUser = async () => {
            try {
              const response = await fetch("/api/get-user-details/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ id: params.id }),
                });
              const userData = await response.json();
              setUser(userData);
            } catch (error) {
              console.log(error.message);
            }
          }
          getUser();
    }, [])
    
    return (
        <div>
            {JSON.stringify(profile)}
            {JSON.stringify(user)}
        </div>
    )
}