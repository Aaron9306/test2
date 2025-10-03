import axios from "axios";

export async function getAIRecommendation(input: {
  userRole: string;
  healthInfo?: string;
  current: any;
  forecast: any[];
}) {
  const prompt = `
You are an environmental health assistant. Inputs:
- Role: ${input.userRole}
- Health: ${input.healthInfo}
- Current: ${JSON.stringify(input.current)}
- Forecast: ${JSON.stringify(input.forecast)}
Produce:
1) Short directive (1-2 sentences) for the user.
2) Recommended actions, with times and thresholds (e.g. "avoid outdoor activities until AQI < 100").
3) A suggested notification message (<= 140 chars).
4) Confidence level (low/medium/high).
Return as JSON.
  `;
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );
  return res.data.choices[0].message.content;
}