import { NextResponse } from "next/server";
import { db } from "@/libs/db";

export async function POST(req: Request) {

 try {
    const body = await req.json();
    const { quizId ,startTime ,endTime ,name} = body;


    const updatedQuiz = await db.quiz.update({
      where: { id: quizId },
      data: {
        startTime: startTime,
        endTime: endTime,
        name: name,
      },
    });

    return NextResponse.json(updatedQuiz);
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 400,
      }
    );
  }
}
