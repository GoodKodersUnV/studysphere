import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const { quizId } = await req.json();

  // const currentUser = await getCurrentUser();

  // if (!currentUser) {
  //   return NextResponse.redirect(new URL("/signin", req.url));
  // }

  const user = await db.points.findMany({
    where: {
      quizId,
    },
    include: {
      User: true,
    },
    orderBy: {
      points: "desc",
    },
  })
  return NextResponse.json(
    user
  );
}
