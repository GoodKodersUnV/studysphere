import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET() {
    const currentUser = await getCurrentUser();

    const currentTime = new Date().getTime();
    if (currentUser?.plan && (new Date(currentUser?.plan?.endTime).getTime() > currentTime)) {
        return NextResponse.json({ token: "pro", endTime: new Date(currentUser?.plan?.endTime).toLocaleString() });
    } else {
        return NextResponse.json({ token: currentUser?.tokens, startTime: currentUser?.plan, currentTime });
    }
}