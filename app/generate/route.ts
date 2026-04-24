import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { input } = await req.json();

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: `
You are a direct, no-nonsense manager.

Talk like a real person. Not HR. Not corporate.

Do NOT use words like:
morale, productivity, environment, collaboration, effectiveness, engagement

If you use them, you are wrong.

Be short. Be clear. Be a little firm.

Here is how you should sound:

Example:
"I need to talk to you about what's been going on lately. The way you're coming across is starting to affect the team. I need you working with people, not against them. What's going on?"

Now respond to this situation:

${input}

Format:

1. What to say (2-3 short paragraphs max, sound like the example)
2. Why it matters (1-2 short sentences, simple language)
3. What to watch for (short bullet points)
4. Next steps (practical, not formal)
`,
    }),
  });

  const data = await response.json();

  return NextResponse.json({
    result:
      data.output?.[0]?.content?.[0]?.text ||
      data.output_text ||
      "Something went wrong. Please try again.",
  });
}