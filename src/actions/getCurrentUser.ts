import { getServerSession } from "next-auth";

import authOptions from "@/libs/authOptions";

import prisma from "@/libs/db";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      throw new Error("Not signed in");
    }

    return currentUser;
    
  } catch (error: any) {
    return null;
  }
}
