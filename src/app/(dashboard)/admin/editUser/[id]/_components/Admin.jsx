"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Page = ({ params }) => {

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
            body: JSON.stringify({ id: params.id }),
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

  const handleUpdateBeta = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/updateBetaUser/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
      const userData = await response.json();
      toast.success("User updated successfully");
      router.push('/admin');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex flex-col sm:grid grid-cols-3 gap-4 p-10">
      <div className="col-span-1">
        <div className="flex flex-col items-center">
          <img src={user?.image} alt="User Image" className="w-40 h-40 rounded-full mb-4 bg-slate-300" />
          <label className="text-sm text-gray-600">Change Image URL:</label>
          <input
            type="text"
            value={user?.image}
            disabled
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <div className="mt-4">
            <label className="text-sm text-gray-600">ID:</label>
            <input
              type="text"
              value={user?.id}
              disabled
              className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            />
            <label className="text-sm text-gray-600">Username:</label>
            <input
              type="text"
              value={user?.username}
              disabled
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <label className="text-sm text-gray-600">Created At:</label>
            <input
              type="text"
              value={user?.createdAt}
              disabled
              className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            />
            <label className="text-sm text-gray-600">Updated At:</label>
            <input
              type="text"
              value={user?.updatedAt}
              disabled
              className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <form>
          <label className="block mb-2 text-sm">
            Name:
            <input
              type="text"
              value={user?.name}
              disabled
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="block mb-2 text-sm">
            Email:
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="block mb-2 text-sm">
            Email Verified:
            <input
              type="checkbox"
              checked={user?.emailVerified}
              disabled
              className="ml-2"
            />
          </label>

          <label className="block mb-2 text-sm">
            Role:
            <select
              value={user?.role}
              disabled
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
              <option value="disabled">Disable</option>
            </select>
          </label>
          <label className="block mb-2 text-sm">
            Organisation:
            <input
              type="text"
              value={user?.organisation}
              disabled
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Page;