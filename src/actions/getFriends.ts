
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function getFirends() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      "message" : "Unauthorized"
    }
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
  });

  const friendsList = friends?.friends.map((friend) => {
    return {
      id: friend.friendUser.id,
      name: friend.friendUser.name,
      image: friend.friendUser.image,
    };
  }
  );
  
  return {
    friendsList ,
    currentUser
  }
}
