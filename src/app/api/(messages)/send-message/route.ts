import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const { convId, message, sender, receiver } = await req.json();

  try {
    const newMessage = await db.message.create({
      data: {
        senderId: currentUser.id,
        receiverId: convId,
        message: message,
      },
    });

    const notification = await db.notification.create({
      data: {
        userId: receiver.id,
        message: `${sender?.name} sent you a message`,
        readAt: null,
        link: `/message/${sender.id}`,
      },
    });

    return NextResponse.json(newMessage);
  } catch (e) {
    return NextResponse.json(e.message);
  }
}
