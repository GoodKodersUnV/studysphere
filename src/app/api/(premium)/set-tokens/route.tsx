import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const currentUser = await getCurrentUser();
    // no.of tokens to be incremented
    const token = await req.json();
    const currtokens = currentUser?.tokens;
    let total;
    if(Number(token)===1) {
        total = Number(currtokens)-1;
    } else {
        total = Number(token)+Number(currtokens);
    }
    // update in db
    const updateToken = await db.user.update({where:{id:currentUser?.id},data:{tokens:total}})
    // send response
    return NextResponse.json({token:currentUser?.tokens});
}