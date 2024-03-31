import getCurrentUser from "@/actions/getCurrentUser"
import CreateQuiz from "./CreateQuiz"

const page = async () => {
  const currentUser = await getCurrentUser()
  return (
    <CreateQuiz currentUser={currentUser} />
  )
}

export default page