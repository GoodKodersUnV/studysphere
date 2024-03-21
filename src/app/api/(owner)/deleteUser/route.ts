import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const body = await req.json();
  // console.log(body);

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (currentUser.role !== "owner") {
    return NextResponse.json(
      { message: "You are not allowed to do this." },
      { status: 401 }
    );
  }

  if (currentUser.role === "owner") {

    const user = await db.user.update({
      where: {
        id: body.id,
      },
      data: {
        role: "deleted",
      },
    });

    const { id, ...rest } = user;
    const deleted = { userId: id, ...rest };
    
    const deletedUser = await db.deletedUsers.create({
      data: {
        ...deleted,
      },
    });

    await db.user.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({ message: "User deleted", deletedUser });
  }
}
