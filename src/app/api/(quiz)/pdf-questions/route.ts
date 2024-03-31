import { NextResponse } from "next/server";
import OpenAI from "openai";
import { db } from "@/libs/db";
import updateTokens from "@/actions/updateTokens";
import getCurrentUser from "@/actions/getCurrentUser";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  
  try {
    const currentUser = await getCurrentUser()
    const currentTime = new Date().getTime();
    if (!(currentUser?.plan && (new Date(currentUser?.plan?.endTime).getTime() > currentTime))) {
      await updateTokens(-1);
    }

    const body = await req.json();
    const { pdfText, amount } = body;



    const promt = `You are a helpful assistant designed to output JSON.You are to generate a random hard mcq ${amount} question about topic user going to input and output format of each object is  {
      question: "question",
      options: ["option1 with max length of 15 words","option2 with max length of 15 words","maximum of 5 options"],
      answer: "1 for 1st option or n for nth option which is correct ",
    } and you have to generate array of of objects consisting of ${amount} questions on the topic user going to input and questions should contain variable number of options like 1st queestion of 3 options 2nd of 5 options 3rd of 3 options e.t.c `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: promt,
        },
        {
          role: "user",
          content: `Generate ${amount} hard mcq questions about below
          ${pdfText}
          
          and the output should look like this 
          
          "questions" : [
            {
                "question": "question1",
                "options": [
                    "option1",
                    "option2",
                    "option3"
                ],
                "answer": "2"
            },
            {
              "question": "question2",
              "options": [
                  "option1",
                  "option2",
                  "option3",
                  "option4",
                  "option5"
              ],
              "answer": "3"
            },
            {
              "question": "question3",
              "options": [
                  "option1",
                  "option2",
                  "option3",
                  "option4",
              ],
              "answer": "1"
            },

            and so on based on number of questions
        ]`,
        },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });
    const quiz = await db.quiz.create({
      data: {
        questions: completion.choices[0].message.content,
        createdByID: currentUser.id,
      },
    });

    return NextResponse.json(
      {
        completionions: JSON.parse(completion.choices[0].message.content),
        quizId: quiz.id,
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
