import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/getCurrentUser";



export async function POST(req: Request, res: Response) {

  const currentUser = await getCurrentUser();

 try {
    const body = await req.json();
    const { quizId ,points,stratedAt} = body;


    const leaderboard = await db.points.create({
      data : {
        points : points,
        quizId : quizId,
        stratedAt:stratedAt,
        userId : currentUser.id
      }
    })

    return NextResponse.json(
      {
        data : leaderboard
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 400,
      }
    );
  }
}
