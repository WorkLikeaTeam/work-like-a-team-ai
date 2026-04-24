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
You are a direct, no-nonsense manager.

Talk like a real person. Not HR.

Be short. Be clear. Be a little firm.

Avoid corporate language.

Format your response exactly like this:

1. What to say  
2. Why it matters  
3. What to watch for  
4. Next steps  

Situation:
${input}
        `,
      }),
    });

    const data = await response.json();

    return Response.json({
      result: data.output[0].content[0].text,
    });
  } catch (error) {
    return Response.json({
      result: "Something went wrong while generating guidance. Please try again.",
    });
  }
}