import { redirect } from "next/navigation"
import SignUp from "./_components/SignUp"
import getCurrentUser from '@/actions/getCurrentUser'

const page = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect('/')
  }
  return (
    <SignUp />
  )
}

export default page