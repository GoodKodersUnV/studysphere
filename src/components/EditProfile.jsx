"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Page = ({currentUser }) => {

  const [user, setUser] = useState("...fetching user");

  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/getUserById/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: currentUser.id }),
          });
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        router.push('/');
        toast.error(error.message);
      }
    }
    getUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/updateUser/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
      toast.success("User updated successfully");

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
      <div className="flex flex-col items-center m-10 font-semibold">
            <img src={user?.image} alt="User Image" className="w-40 h-40 rounded-full bg-slate-300" />
            <label className="text-md font-semibold text-gray-600 m-2">Change Image URL:</label>
            <input
              type="text"
              value={user?.image}
              onChange={(event) => setUser({ ...user, image: event.target.value })}
              className=" w-96 px-4 py-2 rounded border text-gray-600 border-blue-200 focus:outline-none focus:border-blue-500"
            />
        <div className="flex justify-center gap-10">
          <div className="w-[40%] mt-2 text-gray-600">
              <label className="text-sm text-gray-600">ID:</label>
              <input
                type="text"
                value={user?.id}
                disabled
                className="w-full px-4 text-sm py-2 mb-2 rounded bg-gray-100 border border-blue-200 focus:outline-none"
              />
              <label className="text-sm text-gray-600">Username:</label>
              <input
                type="text"
                value={user?.username}
                onChange={(event) => setUser({ ...user, username: event.target.value })}
                className="w-full px-4 py-2 mb-2 text-sm rounded border border-blue-200 focus:outline-none focus:border-blue-500"
              />
              <label className="text-sm text-gray-600">Created At:</label>
              <input
                type="text"
                value={user?.createdAt}
                disabled
                className="w-full px-4 py-2 text-sm mb-2 rounded bg-gray-100 border border-blue-200 focus:outline-none"
              />
              <label className="text-sm text-gray-600">Updated At:</label>
              <input
                type="text"
                value={user?.updatedAt}
                disabled
                className="w-full px-4 py-2 text-sm mb-2 rounded bg-gray-100 border border-blue-200 focus:outline-none"
              />
          </div>
          <div className="w-[40%] mt-3 text-gray-600">
            <form onSubmit={handleSubmit}>
              <label className="block mb-1 text-sm">
                Name:
                <input
                  type="text"
                  value={user?.name}
                  onChange={(event) => setUser({ ...user, name: event.target.value })}
                  className="w-full px-4 py-2.5 rounded border mb-2 border-blue-200 focus:outline-none focus:border-blue-500"
                />
              </label>
              <label className="block mb-1 text-sm">
                Email:
                <input
                  type="email"
                  value={user?.email}
                  onChange={(event) => setUser({ ...user, email: event.target.value })}
                  className="w-full px-4 py-2.5 mb-2 text-sm rounded border border-blue-200 focus:outline-none focus:border-blue-500"
                />
              </label>
              <label className="block mb-2 text-sm">
                Organisation:
                <input
                  type="text"
                  value={user?.organisation}
                  onChange={(event) => setUser({ ...user, organisation: event.target.value })}
                  className="w-full px-4 py-2.5  rounded border border-blue-200 focus:outline-none focus:border-blue-500"
                />
              </label>
              <label className="block mt-8 text-sm">
                Email Verified:
                <input
                  type="checkbox"
                  checked={user?.emailVerified}
                  onChange={(event) => setUser({ ...user, emailVerified: event.target.checked })}
                  className="ml-2"
                />
              </label>
            </form>
          </div>
      </div>
      <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-3 rounded-lg mt-4 mx-auto block"
              >
                Update
           </button>
    </div>

  );
};

export default Page;