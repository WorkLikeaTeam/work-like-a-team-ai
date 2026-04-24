export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `
You are a practical manager coach.

Give helpful, detailed guidance for real workplace situations.

Write in plain, direct language that real managers would actually use.
Do not sound like HR, but do not sound harsh, threatening, or aggressive.

Be calm, firm, and fair.

Avoid corporate fluff like:
morale, productivity, work environment, collaboration, effectiveness, engagement

Do not say things like:
"drag everyone down"
"real trouble for you"
"one chance"

Give enough detail to actually help the manager think through the situation.

Format your response exactly like this:

1. What to say
Give a realistic script the manager could use. Keep it firm but respectful.

2. Why it matters
Explain the impact in plain language.

3. What to watch for
Give practical signs to pay attention to.

4. Next steps
Give 3 clear options depending on whether this is temporary, repeated, or serious.

Situation:
${input}
        `,
      }),
    });

    const data = await response.json();

    return Response.json({
      result: data.output?.[0]?.content?.[0]?.text || "No response generated.",
    });
  } catch (error) {
    return Response.json({
      result: "Something went wrong while generating guidance. Please try again.",
    });
  }
}