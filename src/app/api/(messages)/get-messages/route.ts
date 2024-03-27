import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const { convId } = await req.json();

  try {

    const conversation = await db.message.findMany({
      where: {
        OR: [
          {
            senderId: currentUser.id,
            receiverId: convId,
          },
          {
            senderId: convId,
            receiverId: currentUser.id,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const sender = await db.user.findUnique({
      where: {
        id: currentUser.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        image: true,
        role: true,
      },
    });

    const receiver = await db.user.findUnique({
      where: {
        id: convId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        image: true,
        role: true,
      },
    });

    return NextResponse.json({ sender, receiver, conversation });
  } catch (e) {
    return NextResponse.json(e.message);
  }
}
