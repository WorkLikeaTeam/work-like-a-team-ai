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

Write like a real manager having a direct conversation.

Keep it short, clear, and practical.
No corporate language. No HR phrasing. No fluff.

Use natural, everyday wording.
Say things the way someone would actually say them out loud.

Avoid:
- “team morale”
- “overall work environment”
- “let’s work on”
- long explanations

Focus on:
- exactly what to say
- why it matters in simple terms
- what to watch for (short)
- clear next steps (practical, not formal)

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