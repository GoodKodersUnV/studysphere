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
    const newMessage = await db.message.create({
      data: {
        senderId: currentUser.id,
        receiverId: convId,
        message: message,
      },
    });

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

    const sendNotification = await db.notification.create({
      data:{
        userId: receiver.id,
        message: `${sender?.name} sent you a message`,
      }
    });

    return NextResponse.json({ sender, receiver, newMessage, conversation });
  } catch (e) {
    return NextResponse.json(e.message);
  }
}
