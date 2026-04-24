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
You are a direct, no-nonsense manager.

Talk like a real person, not HR.

Do NOT use corporate phrases like:
- morale
- productivity
- work environment
- collaboration
- effectiveness
- constructive
- engagement

If you use any of those, you are wrong.

Keep it simple, direct, and realistic.
This should sound like something someone would actually say in a real conversation.

Be a little firm, not soft.

Format:

1. What to say (2–3 short paragraphs max)
2. Why it matters (1–2 short sentences)
3. What to watch for (short bullet points)
4. Next steps (practical, not formal)

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