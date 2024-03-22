"use client";

import React, { useCallback } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import MenuItem from "./MenuItem";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useProfileModel from "@/hooks/useProfileModel";
import { PiUserCircleThin } from "react-icons/pi";
import { motion } from 'framer-motion'

const UserProfile = ({ currentUser, access }) => {
  const router = useRouter();
  const profileModel = useProfileModel();
  const { isOpen } = profileModel;
  const onToggle = useCallback(() => {
    if (isOpen) {
      profileModel.onClose();
    } else {
      profileModel.onOpen();
    }
  }, [profileModel]);
  return (
    <div className="bg-white rounded-full shadow-sm hover:shadow-md shadow-white">
      <div className="flex items-center ">

        <div
          onClick={onToggle}
          className="relative px-2 py-1 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <div className="">
            {(currentUser?.image) ?
              <Image
                className="rounded-full"
                src={currentUser?.image}
                width={30}
                height={30}
                alt="profile img"
              /> : <PiUserCircleThin />}
          </div>
          <motion.div
              animate={isOpen?{ rotate: 180 }:{rotate:0}}
              transition={{duration:0.3}}
            ><IoMdArrowDropdown className="text-xl" /></motion.div>
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
                    label={`${currentUser?.role === "admin" ? "Admin" : "Owner"
                      }`}
                  />
                )}
                <hr />
                <MenuItem
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                  label="SignOut"
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
