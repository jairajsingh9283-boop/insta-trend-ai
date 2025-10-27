// app/api/generate/route.js
import { NextResponse } from 'next/server';

// In-memory store for demo
let userGenerations = new Map();

export async function POST(request) {
  try {
    const { userScript, userId = 'anonymous', regenerate = false } = await request.json();

    if (!userScript) {
      return NextResponse.json({ error: 'Please enter your script idea' }, { status: 400 });
    }

    // Check if user already has a generation and just wants new 2 picks
    if (regenerate && userGenerations.has(userId)) {
      const previousScripts = userGenerations.get(userId)?.[0]?.allScripts || [];
      const randomTwo = pickRandomTwo(previousScripts);
      return NextResponse.json({ 
        scripts: randomTwo, 
        regenerated: true 
      });
    }

    console.log('TREND AI - Generating for:', userScript);

    const models = [
      "google/gemini-flash-1.5",
      "meta-llama/llama-3.1-8b-instruct",
      "anthropic/claude-3-haiku",
      "microsoft/wizardlm-2-8x22b"
    ];

    let lastError;

    for (let modelIndex = 0; modelIndex < models.length; modelIndex++) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://insta-trend-ai.vercel.app',
            'X-Title': 'Instagram Reel Generator'
          },
          body: JSON.stringify({
            model: models[modelIndex],
            messages: [
              {
                role: "user",
                content: `Create 10 Instagram Reel scripts for: "${userScript}"

USE THESE EXACT TRENDS:

1. Stop Talking Dirty to Me — playful rejection then reveal love.
2. Smile If — neutral face then smile on reveal.
3. Things I Do to Fill My Cup — 3 short happy moments.
4. Who Are You Trying to Impress — hardworking now, flashback to child self.
5. Almost Forgot This Was the Whole Point — stress to joy transition.
6. Not Ashamed to Admit — 3 relatable confessions.
7. Maturing — “Maturing is realizing…” then “Jk I’m still…”
8. It’s Whackadoodle Time — calm to chaotic excitement.
9. I’m Gonna Have to Disagree — debunk a common misconception.
10. Doesn’t Know it Yet — before vs after big realization.

FORMAT EACH:
🎬 TREND:
📱 VISUALS:
💬 SCRIPT:
🎵 SONG:
🏷️ HASHTAGS:

Output all 10 scripts cleanly.`
              }
            ],
            max_tokens: 4000,
            temperature: 0.8,
          })
        });

        if (!response.ok) continue;
        const data = await response.json();

        const aiContent = data?.choices?.[0]?.message?.content || "";
        const allScripts = formatAIScripts(aiContent);
        const selectedTwo = pickRandomTwo(allScripts);

        // Save all 10 for "regenerate" reuse
        userGenerations.set(userId, [
          {
            timestamp: new Date().toISOString(),
            input: userScript.substring(0, 100),
            model: models[modelIndex],
            allScripts
          }
        ]);

        return NextResponse.json({
          scripts: selectedTwo,
          model: models[modelIndex],
          success: true
        });

      } catch (error) {
        lastError = error;
        console.log(`Model ${models[modelIndex]} failed:`, error.message);
      }

      await new Promise(res => setTimeout(res, 1000));
    }

    throw new Error('All models busy. Try again.');

  } catch (error) {
    console.error('TREND AI FAILED:', error);
    return NextResponse.json({
      error: 'AI services are currently optimizing. Try again soon.',
      success: false
    }, { status: 503 });
  }
}

function formatAIScripts(aiContent) {
  const sections = aiContent.split(/(?=🎬 TREND: |\d+\. 🎬|Script \d+:)/i);
  return sections
    .map(section => section.trim())
    .filter(section => section.length > 0);
}

function pickRandomTwo(arr) {
  if (arr.length <= 2) return arr;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}
