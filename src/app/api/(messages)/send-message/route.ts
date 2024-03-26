import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const { convId, message } = await req.json();

  try {
    const newMessage = db.message.create({
      data: {
        friendId: convId,
        message: message,
      },
    });

    const conversation = db.friend.findUnique({
      where: {
        id: convId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            image: true,
            role: true,
          },
        },
        friendUser: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            image: true,
            role: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return NextResponse.json(conversation);
  } catch (e) {
    return NextResponse.json(e.message);
  }
}
