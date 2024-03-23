import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const body = await  req.json()

  let profileId = body.profileId

  if(!profileId) {
    profileId = currentUser.id
  }

  const users = await db.user.findMany({
    include: {
      friends: true,
      friendsof: true,
    },
  });

  const profileUser = users.find((user) => user.id === profileId)

  users.forEach((user) => {
    user.isFriend = profileUser.friends.some(
      (friend) => friend.friendUserId === user.id
    )
    if(user.id === profileUser.id) {
      user.isFriend = true
    }
  });

  return NextResponse.json({users, profileUser});
}
