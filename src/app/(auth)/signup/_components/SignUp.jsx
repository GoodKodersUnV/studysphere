"use client"

import SigninWithGoogle from "@/components/SigninWithGoogle";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Link from "next/link";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const {email, name} = data;

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, email: email.toLowerCase(), name: name.toLowerCase() }),
    });

    if (response.ok) {
      toast.success("Registration successful");
      const signinResponse = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/'
      });

      if (signinResponse?.ok) {
        window.location.href = '/';
      }
    } else {
      toast.error("Registration failed")
    }
  }

  return (
    <div className="w-full signup">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="name"
            className="border border-gray-300 p-2 rounded-lg"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded-lg"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded-lg"
            {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must have than 8 characters" } })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-300 p-2 rounded-lg"
            {...register("confirmPassword", { required: "Password confirmation is required" })}
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          <button
            type="submit"
            className="bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold p-2.5 rounded-lg"
          >
            Sign up
          </button>
        </div>
        <SigninWithGoogle />
        <p className="text-center mt-4 font-semibold">
          Already have a account ? <Link href="/signin" className="text-blue-500">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
