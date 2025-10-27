// app/api/generate/route.js - WITH TRENDS, SONGS & HASHTAGS
import { NextResponse } from 'next/server';

// In-memory store for demo
let userGenerations = new Map();

export async function POST(request) {
  try {
    const { userScript, userId = 'anonymous', adWatched = false } = await request.json();

    if (!userScript) {
      return NextResponse.json({ error: 'Please enter your script idea' }, { status: 400 });
    }

    console.log('TREND AI - Generating for:', userScript);

    // STRATEGY: Try multiple models until one works
    const models = [
      "google/gemini-flash-1.5",
      "meta-llama/llama-3.1-8b-instruct", 
      "anthropic/claude-3-haiku",
      "microsoft/wizardlm-2-8x22b"
    ];

    let lastError;
    
    for (let modelIndex = 0; modelIndex < models.length; modelIndex++) {
      try {
        console.log(`Trying model: ${models[modelIndex]}`);
        
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

Use these EXACT trends and blend them naturally:
- "Stop Talking Dirty to Me" Trend
- "Smile If" Trend  
- "Things I Do to Fill My Cup" Trend
- "Who Are You Trying to Impress?" Trend
- "Almost Forgot This Was the Whole Point" Trend
- "Not Ashamed to Admit" Trend
- "Maturing" Trend
- "It's Whackadoodle Time" Trend
- "I'm Gonna Have to Go and Disagree With You There" Trend
- "Doesn't Know it Yet" Trend

FORMAT FOR EACH SCRIPT:
🎬 TREND: [Trend Name]
📱 VISUALS: [3-4 specific shots]
💬 SCRIPT: [Natural dialogue using the trend]
🎵 SONG: [Current viral audio suggestion]
🏷️ HASHTAGS: [5-7 relevant hashtags]

Create 10 complete scripts with songs and hashtags. Make them engaging and easy to film.`
              }
            ],
            max_tokens: 4000,
            temperature: 0.8,
          })
        });

        if (response.status === 429) {
          console.log('Rate limited, trying next model...');
          continue;
        }

        if (!response.ok) {
          console.log(`Model ${models[modelIndex]} not available`);
          continue;
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0].message) {
          const aiContent = data.choices[0].message.content;
          console.log('SUCCESS with model:', models[modelIndex]);
          
          // Format the AI response
          const scripts = formatAIScripts(aiContent);

          // Store generation data
          if (!userGenerations.has(userId)) {
            userGenerations.set(userId, []);
          }
          userGenerations.get(userId).push({
            timestamp: new Date().toISOString(),
            input: userScript.substring(0, 100),
            model: models[modelIndex]
          });

          return NextResponse.json({ 
            scripts: scripts,
            model: models[modelIndex],
            success: true,
            analytics: {
              totalGenerations: userGenerations.get(userId)?.length || 1,
            }
          });
        }
        
      } catch (error) {
        lastError = error;
        console.log(`Model ${models[modelIndex]} failed:`, error.message);
        // Continue to next model
      }
      
      // Wait 1 second before trying next model
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    throw new Error('All AI models are currently busy. Please try again in 30 seconds.');

  } catch (error) {
    console.error('TREND AI FAILED:', error);
    
    return NextResponse.json({ 
      error: 'AI services are currently optimizing. Please try again in 30 seconds.',
      success: false,
      retryAfter: 30
    }, { status: 503 });
  }
}

function formatAIScripts(aiContent) {
  // Split into individual scripts
  const sections = aiContent.split(/(?=🎬 TREND: |\d+\. 🎬|Script \d+:)/i);
  
  if (sections.length >= 10) {
    return sections.slice(0, 10).map(section => section.trim()).filter(section => section.length > 0);
  }
  
  // If we can't split properly, return the content as one block
  return [aiContent];
}

// Analytics endpoint
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (userId && userGenerations.has(userId)) {
    return NextResponse.json({
      totalGenerations: userGenerations.get(userId).length,
      recentActivity: userGenerations.get(userId).slice(-10)
    });
  }
  
  return NextResponse.json({
    totalUsers: userGenerations.size,
    totalGenerations: Array.from(userGenerations.values()).reduce((sum, gens) => sum + gens.length, 0)
  });
}