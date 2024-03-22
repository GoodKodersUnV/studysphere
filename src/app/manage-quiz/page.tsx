
import getCurrentUser from "@/actions/getCurrentUser"

import Quizzes from './Quizzes'

export default async function () {
    const currentUser = await getCurrentUser()
    return (
        <Quizzes currentUser={currentUser} />
    )
}