import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.redirect(new URL("/signin", req.url));
      }

    const currentTime = new Date().getTime();
    if (currentUser?.plan && (new Date(currentUser?.plan?.endTime).getTime() > currentTime)) {
        return NextResponse.json({ token: "pro", endTime: new Date(currentUser?.plan?.endTime).toLocaleString() });
    } 

    return NextResponse.json({ token: currentUser.tokens.toString()});
    
}