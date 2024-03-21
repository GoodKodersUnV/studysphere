"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useProfileModel from "@/hooks/useProfileModel";

const UserProfile = ({ currentUser, access }) => {
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(false)
  const profileModel = useProfileModel();
  const { isOpen } = profileModel;
  const onToggle = useCallback(() => {
    // setIsOpen(prev => !prev);
    if (isOpen) {
      profileModel.onClose();
    } else {
      profileModel.onOpen();
    }
  }, [profileModel]);
  return (
    <div className="">
      <div className="flex gap-1 sm:gap-3 items-center ">

        <div
          onClick={onToggle}
          className="relative px-2 py-1 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <div className="">
            <Image
              className="rounded-full"
              src={currentUser?.image || "/images/placeholder.jpg"}
              width={30}
              height={30}
              alt="profile img"
            />
          </div>
          <AiOutlineMenu />
          {isOpen && (
            <div className="absolute rounded-xl shadow-md min-w-max bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/profile");
                  }}
                  label={
                    currentUser?.password
                      ? "Change password"
                      : "Create password"
                  }
                />
                {access && (
                  <MenuItem
                    onClick={() => {
                      router.push("/admin");
                    }}
                    label={`${
                      currentUser?.role === "admin" ? "Admin" : "Owner"
                    }`}
                  />
                )}
                {currentUser?.role === "owner" && (
                  <MenuItem
                    onClick={() => {
                      router.push("/admin/updateHolidays");
                    }}
                    label="Holidays"
                  />
                )}
                <hr />
                <MenuItem
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                  label="SignOut"
                />
                <MenuItem
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  label="Clear Form"
                />
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
