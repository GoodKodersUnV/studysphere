import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ friendsList: [], currentUser: null });
    }

    const friends = await db.user.findUnique({
      where: {
        id: currentUser.id,
      },
      include: {
        friends: {
          include: {
            friendUser: true,
          },
        },
      },
    }) ?? { friends: [] };

    const friendsList = friends.friends.map((friend) => {
      return {
        id: friend.friendUser.id,
        name: friend.friendUser.name,
        image: friend.friendUser.image,
      };
    });

    return NextResponse.json({ friendsList, currentUser });
  } catch (e :any) {
    return NextResponse.json(e.message);
  }
}
