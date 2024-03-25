import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const { convId, message, messages } = await req.json();

  const newMessage = {
    message : message,
    date : new Date()
  }

  const prevMessages = JSON.parse(messages)

  try{
    const messageData = await db.friend.update({
      where: {
        id : convId
      },
      data: {
        messages: {
          push : message
        }
      },
    });
    return NextResponse.json(messageData);
  } catch(e){
    return NextResponse.json(e.message)
  }


}
