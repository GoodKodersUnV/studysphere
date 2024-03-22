
import getCurrentUser from "@/actions/getCurrentUser"
import Link from "next/link";
import { redirect } from "next/navigation";
import HomePage from "@/components/Home/HomePage";
import UnauthorizedPage from "../components/UnauthorizedPage";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/signin')
  }
  
  const noaccess = currentUser?.role == "disabled"

  if (noaccess) {
    return (
      <UnauthorizedPage />
    )
  }

  if (!currentUser?.email) {
    return (
      <div>
        <div className=" text-center text-3xl font-bold mt-20">
          sign in to view this page
        </div>
        <Link href="/signin">
          <div className="text-center mt-20 bg-gray-950 hover:bg-gray-700 text-white text-xl font-semibold py-4 px-6 rounded-lg w-[200px] mx-auto">
            Sign in
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="h-full">
      <HomePage currentUser={currentUser} />
    </div>
  )
}
