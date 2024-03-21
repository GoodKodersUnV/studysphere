import React from "react";
import GenerateQuiz from "./GenerateQuiz";
import getCurrentUser from '@/actions/getCurrentUser'



const page = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full flex justify-center align-middle">
      <GenerateQuiz currentUser={currentUser} />
    </div>
  );
};

export default page;
