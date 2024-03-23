import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const users = await db.user.findMany({
    include: {
      friends: true,
      friendsof: true,
    },
  });

  users.forEach((user) => {
    user.isFriend = currentUser.friends.some(
      (friend) => friend.friendUserId === user.id
    )
    if(user.id === currentUser.id) {
      user.isFriend = true
    }
  });

  

  return NextResponse.json(users);
}
