import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const { userId } = await req.json();

  // const currentUser = await getCurrentUser();

  // if (!currentUser) {
  //   return NextResponse.redirect(new URL("/signin", req.url));
  // }

  const quizzes = await db.quiz.findMany({
    where: {
      createdByID: userId,
    },
  });
  return NextResponse.json(quizzes);
}
