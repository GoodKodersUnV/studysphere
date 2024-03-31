import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET() {
    const currentUser = await getCurrentUser();
    if (currentUser?.plan && (currentUser?.plan?.endTime < new Date())){
        return NextResponse.json({token:"pro" , endTime : currentUser?.plan?.endTime.toLocaleDateString()});
    }
    return NextResponse.json({token:currentUser?.tokens});
}