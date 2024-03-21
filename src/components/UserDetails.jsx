"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserDetails = ({ role }) => {
  const [users, setUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);

  useEffect(() => {
    fetch("/api/userDetails")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => toast.error(err.message));
    if (role === "owner") {
      fetch("/api/deletedUsers")
        .then((res) => res.json())
        .then((data) => setDeletedUsers(data))
        .catch((err) => toast.error(err.message));
    }
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold">User Details</h1>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="text-start">Email</th>
            <th className="text-start">Name</th>
            <th className="text-start">Role</th>
            <th className="text-start">Organisation</th>
            <th className="text-start">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.role !== "disabled")
            .map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.organisation}</td>
                <td>
                  <Link href={`admin/editUser/${user.id}`}>
                    <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-[5px] px-4 rounded">
                      {role === "owner" ? "Edit" : "View"}
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {role === "owner" && (
        <div>
          <h1 className="mt-9 text-xl font-semibold">Disabled Users</h1>
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="text-start">Email</th>
                <th className="text-start">Name</th>
                <th className="text-start">Role</th>
                <th className="text-start">Organisation</th>
                <th className="text-start">Edit</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.role === "disabled")
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.organisation}</td>
                    <td>
                      <Link href={`admin/editUser/${user.id}`}>
                        <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-[5px] px-4 rounded">
                          Edit
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h1 className="mt-9">Deleted Users</h1>
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="text-start">Email</th>
                <th className="text-start">Name</th>
                <th className="text-start">Role</th>
                <th className="text-start">Organisation</th>
                <th className="text-start">Edit</th>
              </tr>
            </thead>
            <tbody>
              {deletedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.organisation}</td>
                  <td>
                    <Link href={`admin/editUser/${user.id}`}>
                      <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-[5px] px-4 rounded">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
