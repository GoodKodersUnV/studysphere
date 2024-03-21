import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const access = currentUser.role === "admin" || currentUser.role === "owner";

  if (!access) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (currentUser.role === "owner") {
    const users = await db.user.findMany({});
    return NextResponse.json(users);
  }
  if (access) {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
        organisation: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(users);
  }
}
