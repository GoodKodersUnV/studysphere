import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { amount, topic, type } = body;
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant designed to output JSON.You are to generate a random hard mcq ${amount} question about ${topic} and output format of each object is  {
            question: "question",
            options: ["option1 with max length of 15 words","option2 with max length of 15 words","maximum of 5 options"],
            answer: "1 for 1st option or n for nth option which is correct ",
          } and you have to generate array of of objects consisting of ${amount} questions on the topic ${topic} and questions should contain variable number of options like 1st queestion of 3 options 2nd of 5 options 3rd of 3 options e.t.c `,
        },
        { role: "user", content: `You are to generate a random hard mcq question about ${topic}` },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });
    return NextResponse.json(
      {
        completionions: JSON.stringify(completion.choices[0].message.content),
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
