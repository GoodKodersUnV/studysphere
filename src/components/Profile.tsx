"use client"

// Import statements
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Profile = ({ currentUser } :any) => {
  const router = useRouter()
  const email = currentUser?.email;
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data :any) => {


    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!currentUser || !currentUser?.email) {
      toast.error("An error occurred while updating the profile");
      return;
    }

    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, email }),
      });

      if (response?.ok) {
        toast.success("Profile updated successfully");
        return;
      }
      if (!response.ok) {
        // Handle server-side errors
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }


    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the profile");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response?.ok) {
        toast.success("Login again to create new password");
        localStorage.clear();
        signOut({ callbackUrl: "/signin?callbackUrl=profile" })
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while sending password reset link");
    }
  }
  return (
    <div className="flex justify-center items-center w-full h-[80vh]">
      <div className="max-w-[600px] p-5 m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 sm:gap-6 flex-wrap sm:flex-nowrap ">
              <label className="text-lg font-medium  w-full sm:w-[35%] ">Email</label> <span className="font-bold hidden sm:block">:</span>
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 px-2 py-1 rounded-lg bg-slate-400/40 w-full sm:w-auto"
                value={email}
                disabled
              />
            </div>
            {currentUser?.password && (
              <div className="flex gap-2 sm:gap-6 flex-wrap sm:flex-nowrap ">
                <label className="text-lg font-medium w-full sm:w-[35%]  ">Old Password <a onClick={handleForgotPassword} className="text-xs text-blue-500 hover:cursor-pointer hover:text-red-700">forgot?</a> </label> <span className="font-bold hidden sm:block">:</span>
                <input
                  type="password"
                  placeholder="Old Password"
                  className="border border-gray-300 px-2 py-1 rounded-lg w-full sm:w-auto"
                  {...register("oldPassword")}
                />
              </div>
            )}
            <div className="flex gap-2 sm:gap-6 flex-wrap sm:flex-nowrap ">
              <label className="text-lg font-medium w-full sm:w-[35%]  ">New Password</label> <span className="font-bold hidden sm:block">:</span>
              <input
                type="password"
                placeholder="New Password"
                className="border border-gray-300 px-2 py-1 rounded-lg w-full sm:w-auto"
                {...register("newPassword", { required: true, minLength: 8 })}
              />
            </div>
            {errors.newPassword?.type == "required" && <span className="text-red-500">Password is required</span>}
            {errors.newPassword?.type == "minLength" && <span className="text-red-500">Password must have more than 8 characters</span>}
            <div className="flex gap-2 sm:gap-6 flex-wrap sm:flex-nowrap ">

              <label className="text-lg font-medium w-full sm:w-[35%]  ">Confirm Password</label> <span className="font-bold hidden sm:block">:</span>
              <input
                type="password"
                placeholder="Confirm Password"
                className="border border-gray-300 px-2 py-1 rounded-lg w-full sm:w-auto"

                {...register("confirmPassword", { required: true, minLength: 8 })}
              />
            </div>
            {errors.confirmPassword?.type == "required" && <span className="text-red-500">Confirm Password is required</span>}


            <button
              type="submit"
              className="bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold py-2 px-3 rounded-lg mt-4"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
