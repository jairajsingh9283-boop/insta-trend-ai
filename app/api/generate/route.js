// app/api/generate/route.js - WITH PROPER TREND DESCRIPTIONS
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

USE THESE EXACT TRENDS WITH THEIR PROPER FORMATS:

1. "Stop Talking Dirty to Me" Trend - Lip sync to this sound while playfully rejecting something people say, then revealing what you actually love.

2. "Smile If" Trend - Start with neutral face + text "Smile if you've ever...", then big smile appears when revealing a relatable truth.

3. "Things I Do to Fill My Cup" Trend - Show 3 quick activities that represent self-care or things that make you happy in your niche.

4. "Who Are You Trying to Impress?" Trend - Show current you working hard with text "Why do you work so hard?", then childhood photo with text "Them" - showing you're doing it for your younger self.

5. "Almost Forgot This Was the Whole Point" Trend - Show stressful situation, then transition to joyful moment with text "Almost forgot THIS was the whole point".

6. "Not Ashamed to Admit" Trend - Direct to camera with text "I'm a [niche] and I'm not ashamed to admit..." followed by 3 funny/relatable confessions.

7. "Maturing" Trend - Text "Maturing is realizing..." with a wise statement, then "Jk I'm still..." with a funny twist showing you haven't changed.

8. "It's Whackadoodle Time" Trend - Start calm, then sudden energetic burst with crazy excitement about your niche topic.

9. "I'm Gonna Have to Go and Disagree With You There" Trend - Lip sync to this audio while disagreeing with a common misconception in your niche, then proving your point.

10. "Doesn't Know it Yet" Trend - Show ordinary moment with text "This was me before...", then dramatic transition to big achievement/realization.
FORMAT FOR EACH SCRIPT:
🎬 TREND: [Trend Name]
📱 VISUALS: [3-4 specific camera shots/angles]
💬 SCRIPT: [Natural dialogue that matches the trend format]
🎵 SONG: [Current viral audio that fits the trend]
🏷️ HASHTAGS: [5-7 relevant hashtags including the trend name]

Create EXACTLY 10 scripts - one for each trend above. Make them authentic and easy to film with a phone.`
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