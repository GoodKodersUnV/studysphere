import { db } from '@/libs/db'
import React from 'react'
import ManageQuiz from './ManageQuiz'

const page = async ({params}) => {

  const quiz = await db.quiz.findUnique({
    where: {
      id: params.id
    },
    include: {
      createdBy: true,
      usersPoints: true,
    }
  })

  return (
    <div>
      <ManageQuiz quiz={quiz} />
    </div>
  )
}

export default page