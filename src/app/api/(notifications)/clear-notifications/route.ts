import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const notification = await db.notification.updateMany({
    where: {
      userId: currentUser.id ,
      readAt: null,
    },
    data: {
      readAt : new Date(),
    },
  });

  return NextResponse.json(notification);
}