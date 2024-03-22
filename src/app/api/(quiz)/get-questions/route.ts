import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const { quizId } = await req.json();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const user = await db.quiz.findUnique({
    where: {
      id: quizId,
    },
  });
  return NextResponse.json(JSON.parse(String(user?.questions) || "[]"));
}