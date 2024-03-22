import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const body = await req.json();

  const { id, createdAt, updatedAt, password, ...rest } = body;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const access = currentUser.role == "owner" || currentUser.id == id

  if (!access) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (access) {
    const user = await db.user.update({
      where: {
        id: body.id,
      },
      data: {
        ...rest,
      },
    });
    return NextResponse.json(user);
  }
}
