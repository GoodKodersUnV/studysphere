import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const quizzes = await db.quiz.findMany({
    orderBy:{
      createdAt:"desc"
    }
  });
  return NextResponse.json(quizzes);
}
