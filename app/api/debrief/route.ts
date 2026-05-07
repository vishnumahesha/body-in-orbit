import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are the Crew Debrief Assistant for Body in Orbit, an evidence-constrained molecular monitoring brief for astronaut health.

You are NOT a physician. You do NOT diagnose, predict disease, recommend treatment, determine flight eligibility, or imply clinical abnormality.

You may ONLY answer from these 5 biological domains observed in Inspiration4:

1. IMMUNE REGULATION (Score 3/3, High confidence): 18 cytokines/chemokines/growth factors changed after spaceflight, FOXP3 up-regulation in T cells, MHC class I suppression. Source: Kim et al. 2024 Nature Communications. NOT claiming: infection, immune dysfunction, illness.

2. OXIDATIVE/ANTIOXIDANT RESPONSE (Score 2/3, Medium-high confidence): Plasma and EVP profiles showed oxidative stress changes. Inosine and taurine increased post-flight. >93% EVP DAPs recovered within 6 months. 73% plasma DAPs remained perturbed. Source: Houerbi et al. 2024 Nature Communications. NOT claiming: cellular injury, tissue damage.

3. MITOCHONDRIAL/ENERGY METABOLISM (Score 2/3, Medium confidence): OXPHOS enrichment in immune cell gene expression. Mitochondrial metabolism pathway-level signal. Source: Kim et al. 2024. NOT claiming: mitochondrial disease or failure.

4. GENOME STABILITY/TELOMERE DYNAMICS (Score 2/3, High confidence): Telomere elongation in ALL 4 crew during flight (P<0.001). Shortened post-flight in 3 of 4 crew (P<0.02). No significant CHIP or genome instability. Source: Garcia-Medina et al. 2024 Precision Clinical Medicine. NOT claiming: genome damage, rejuvenation, anti-aging.

5. MICROBIOME-HOST INTERACTION (Score 1/3, Medium confidence): Skin and oral microbiota shifted during and after flight. Some microbial changes correlated with host immune activity. Source: Tierney et al. 2024 Nature Microbiology. NOT claiming: infection, harmful exposure.

KEY RECOVERY FINDING: >93% of EVP proteins and metabolites recovered within 6 months. Approximately 73% of plasma differentially abundant proteins remained perturbed post-flight. Source: Houerbi et al. 2024.

RULES:
- NEVER use these words: diagnosis, disease, abnormal, dangerous, damaged, risk score, treatment, clearance, safe, unsafe, predicts, clinically significant, pathology
- ALWAYS use: monitoring signal, relative to preflight baseline, exploratory, confidence, recovery trend, communication score
- Always cite which paper supports your answer
- Always state confidence level
- Always end your answer with "Do not conclude:" followed by what the answer does NOT prove
- If asked something outside these 5 domains, say: "That is outside the scope of this molecular debrief."
- Keep answers to 3-5 sentences maximum
- Be direct and calm, like a flight surgeon briefing a crew member`;

interface RequestBody {
  message: string;
  history: { role: string; content: string }[];
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("changed") || lowerMessage.includes("shifted")) {
    return "The strongest monitoring signal came from immune regulation, where 18 cytokines and chemokines shifted after flight (Kim et al. 2024, high confidence). Oxidative stress and energy metabolism pathways also showed postflight changes. These are monitoring signals, not diagnoses. Do not conclude: disease, infection, or treatment need.";
  }

  if (lowerMessage.includes("recovered") || lowerMessage.includes("recovery")) {
    return "Recovery was not uniform across molecular layers. More than 93% of EVP proteins and metabolites returned toward baseline within six months, but approximately 73% of plasma proteins remained perturbed (Houerbi et al. 2024). Do not conclude: full recovery or permanent damage.";
  }

  if (lowerMessage.includes("monitor")) {
    return "Mission control should prioritize immune regulation (cytokine patterns, immune markers, symptoms), oxidative stress markers, and recovery trajectory across timepoints. These should be interpreted alongside clinical context. Do not conclude: clinical decisions from omics data alone.";
  }

  if (lowerMessage.includes("conclude") || lowerMessage.includes("not allowed")) {
    return "This report cannot determine disease risk, clinical abnormality, treatment need, or flight eligibility. It can only summarize molecular monitoring signals relative to preflight baseline. Do not conclude: any clinical decision.";
  }

  if (lowerMessage.includes("risk score")) {
    return "Body in Orbit uses communication scores, not clinical risk scores. A communication score summarizes how strongly a biological domain shifted relative to preflight baseline, how persistent that shift appears, and how much evidence supports the interpretation. It guides attention, not medical decisions. Do not conclude: that these scores have clinical validation.";
  }

  return "Based on the Inspiration4 molecular data, five biological domains were monitored: immune regulation, oxidative stress, energy metabolism, telomere dynamics, and microbiome interaction. Each domain showed some level of postflight shift relative to preflight baseline. These are exploratory monitoring signals. Do not conclude: diagnosis, treatment recommendation, or flight eligibility decision.";
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { message, history } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Try Anthropic API if key is available
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey && apiKey !== "your_api_key_here") {
      try {
        const client = new Anthropic({ apiKey });

        const response = await client.messages.create({
          model: "claude-sonnet-4-5-20250514",
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages: [
            ...history.map((msg) => ({
              role: msg.role as "user" | "assistant",
              content: msg.content,
            })),
            {
              role: "user",
              content: message,
            },
          ],
        });

        const content = response.content[0];
        const responseText =
          content.type === "text" ? content.text : "Unable to generate response.";

        return NextResponse.json({ response: responseText });
      } catch (apiError) {
        console.error("Anthropic API error:", apiError);
        // Fall through to fallback
      }
    }

    // Use fallback response
    const fallbackResponse = getFallbackResponse(message);
    return NextResponse.json({ response: fallbackResponse });
  } catch (error) {
    console.error("Debrief API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
