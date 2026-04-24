import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { input } = await req.json();

  if (!input || input.length < 10) {
    return NextResponse.json({
      output: "Tell me a little more about what's going on so I can help you."
    });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: `
You are a practical, experienced manager coach.

Write in plain, direct language.
Avoid overly corporate or HR-style phrasing.
Match how real managers actually speak in everyday work environments.

Situation:
${input}

Respond in this format:

1. What to say
2. Why it matters
3. What to watch for
4. Next steps
`
    })
  });

  const data = await response.json();

  return NextResponse.json({
    output: data.output?.[0]?.content?.[0]?.text || "Something went wrong."
  });
}