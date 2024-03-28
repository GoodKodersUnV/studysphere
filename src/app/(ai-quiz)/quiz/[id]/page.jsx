
import { db } from '@/libs/db'
import QuizStartPage from "./QuizStartPage.jsx";
import RedirectQuiz from './RedirectQuiz.jsx';


const Page =async ({ params }) => {


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
    <div className="h-screen">
      {
        <RedirectQuiz params={params}  quiz={quiz} /> 
      }
    </div>
  );
};

export default Page;

