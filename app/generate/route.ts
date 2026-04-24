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

Write like a real manager talking to an employee.

Be direct, clear, and a little firm.
Use everyday language — no corporate or HR phrases.

Do NOT use phrases like:
- morale
- productivity
- work environment
- collaboration
- effectiveness

Keep it simple and realistic.
This should sound like something someone would actually say out loud.

Keep answers short:
- What to say: 2–3 short paragraphs max
- Everything else: brief and practical advice.

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