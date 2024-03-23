import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const { userId, friendUserId } = await req.json();

  const friend = await db.friend.create({
    data: {
      userId: userId,
      friendUserId: friendUserId,
    },
  });
  
  return NextResponse.json(friend);
}