import { redirect } from "next/navigation"
import SignIn from "./_components/SignIn";
import getCurrentUser from '@/actions/getCurrentUser'

const page = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect('/')
  }
  return (
    <SignIn />
  )
}

export default page