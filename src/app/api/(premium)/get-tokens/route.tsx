import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET() {
    const currentUser = await getCurrentUser();
    return NextResponse.json({token:currentUser?.tokens});
}