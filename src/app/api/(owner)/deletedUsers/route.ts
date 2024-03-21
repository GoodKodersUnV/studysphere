import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const access = currentUser.role === "owner";

  if (!access) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (access) {
    const users = await db.deletedUsers.findMany({});
    return NextResponse.json(users);
  }
}
