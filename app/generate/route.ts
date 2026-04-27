import { kv } from "@vercel/kv";
export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    // Simple global usage limit
const count = await kv.incr("usage_count");

if (count > 100) {
  return Response.json({
    result: "This test is currently full. Thank you for your interest!",
  });
}

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `
You are a practical leadership coach for real managers.

Give clear, useful, real-world guidance for workplace situations.

Your tone should be:
- conversational
- calm
- direct but respectful
- practical and grounded in real situations

Do NOT sound like HR.
Do NOT sound aggressive, threatening, or overly blunt.
Do NOT use generic filler statements.

Avoid phrases like:
"morale"
"productivity"
"work environment"
"collaboration"
"engagement"

Also avoid obvious statements like:
"this hurts the team"
"this causes problems"
"this needs to change immediately"

Be specific instead.

---

Format your response exactly like this:

1. What to say  
Write a realistic script the manager could actually say out loud.  
Give 1–2 variations if helpful (one more direct, one more neutral).

2. Why it matters  
Explain the REAL impact of this specific situation.

Do NOT give generic statements.

Instead explain:
- what people will start doing differently
- how work starts breaking down
- what risk this creates (safety, delays, turnover, customer issues, etc.)

Make it feel real and specific to the situation.

3. What to watch for  
Give practical, observable signs:
- behavior changes
- reactions to feedback
- patterns that show improvement or resistance

4. Next steps  
Give clear, practical options:
- if this is new
- if it keeps happening
- if it becomes serious

Make these feel like real decisions a manager would make.

---

Situation:
${input}
        `,
      }),
    });

    const data = await response.json();
    const userId = req.headers.get("x-forwarded-for") || "unknown";

await kv.lpush(
  "usage_logs",
  JSON.stringify({
    input,
    time: new Date().toISOString(),
    userId,
  })
);

    return Response.json({
      result: data.output?.[0]?.content?.[0]?.text || "No response generated.",
    });
  } catch (error) {
    return Response.json({
      result: "Something went wrong while generating guidance. Please try again.",
    });
  }
}