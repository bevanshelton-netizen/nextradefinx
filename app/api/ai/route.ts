import { createHash } from "node:crypto";
import { generateText } from "ai";

export const runtime = "nodejs";

const localeNames: Record<string,string> = {
  en:"English","zh-CN":"Mandarin Chinese",hi:"Hindi",es:"Spanish",ar:"Arabic",fr:"French",
  bn:"Bengali",pt:"Portuguese",ru:"Russian",ur:"Urdu",id:"Indonesian",de:"German",
  ja:"Japanese",ko:"Korean",tr:"Turkish",sw:"Swahili",ha:"Hausa",pcm:"Nigerian Pidgin",
  am:"Amharic",yo:"Yoruba",ig:"Igbo",zu:"isiZulu",xh:"isiXhosa",af:"Afrikaans",
  nso:"Sepedi",st:"Sesotho",tn:"Setswana",ss:"siSwati",ve:"Tshivenda",ts:"Xitsonga",nr:"isiNdebele"
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = typeof body?.question === "string" ? body.question.trim() : "";
    const locale = typeof body?.locale === "string" ? body.locale : "en";

    if (!question) {
      return Response.json({ error: "Please enter a question." }, { status: 400 });
    }
    if (question.length > 1200) {
      return Response.json({ error: "Please shorten the question to 1,200 characters." }, { status: 413 });
    }

    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
    const user = createHash("sha256").update(forwarded).digest("hex").slice(0, 24);
    const language = localeNames[locale] || "English";

    const { text } = await generateText({
      model: "openai/gpt-5.4",
      system: `You are NexAI, an Africa-built multilingual financial education and market-intelligence assistant.
Respond in ${language}.
Be clear, practical and concise.
Never invent current prices, breaking news, market status, or portfolio facts. You do not have a live quote feed inside this chat request unless the user explicitly supplies the figures.
Clearly distinguish education, simulated trading and regulated real-money execution.
Never promise profit or guaranteed returns.
When asked what to buy, sell, short or trade, provide an analytical framework, scenarios, risks and questions to consider rather than pretending to know the user's full circumstances or giving a guaranteed directive.
Explain financial terms simply when useful.
Do not claim an order has been placed. Real-money execution is disabled in NexTradeFinX until licensed broker connectivity and jurisdiction controls are active.`,
      prompt: question,
      maxOutputTokens: 550,
      temperature: 0.25,
      maxRetries: 2,
      timeout: { totalMs: 20000 },
      providerOptions: {
        gateway: {
          user,
          tags: ["product:nexai-global-markets","feature:market-chat"],
          disallowPromptTraining: true
        }
      }
    });

    return Response.json({ text, model: "openai/gpt-5.4" });
  } catch (error) {
    console.error("NexAI generation failed", error);
    const message = error instanceof Error ? error.message : "";
    const activationRequired =
      message.includes("valid credit card") ||
      message.toLowerCase().includes("gateway") && message.toLowerCase().includes("credit");

    return Response.json(
      {
        code: activationRequired ? "AI_ACTIVATION_REQUIRED" : "AI_TEMPORARILY_UNAVAILABLE",
        error: activationRequired
          ? "NexAI answers are being activated. Live Markets, NexLearn, Practice Trade and NexRisk remain available."
          : "NexAI is temporarily unavailable. Live Markets, NexLearn, Practice Trade and NexRisk remain available."
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": activationRequired ? "3600" : "60"
        }
      }
    );
  }
}
