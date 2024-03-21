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

  const access = currentUser.role === "admin" || currentUser.role === "owner";

  if (!access) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if(currentUser.role==="owner"){
    const user = await db.user.findUnique({
      where: {
        id: body.id,
      }
    });
    return NextResponse.json(user);
  }

  if (access) {
    const user = await db.user.findUnique({
      where: {
        id: body.id,
      },
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
    return NextResponse.json(user);
  }
}
