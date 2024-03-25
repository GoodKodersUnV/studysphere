"use client"

import { signIn } from "next-auth/react";
import SigninWithGoogle from "@/components/SigninWithGoogle";
import { toast } from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await signIn('credentials', {
        email: data.email.toLowerCase(),
        password: data.password,
        redirect: false,
      });

      if (response?.ok) {
        toast.success("Signin successful");
        window.location.href = '/';
      }

      if (response?.error) {
        toast.error("Signin failed");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="  z-99  ">
        <div className="w-full ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 p-2 rounded-lg"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              />
              {errors.email && <p className="text-red-500">Email is required</p>}
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 p-2 rounded-lg"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password && <p className="text-red-500">Password must have more than 8 characters</p>}
              <button
                type="submit"
                className="bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold p-2.5 rounded-lg"
              >
                Sign In
              </button>
            </div>
            <SigninWithGoogle />

            <p className="text-center mt-4 font-semibold">
              Don&apos;t have an account? <Link href="/signup" className="text-blue-500 font-semibold">Sign Up</Link>
            </p>
          </form>
        </div>
    </div>
  );
};

export default SignIn;
