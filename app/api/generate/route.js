// app/api/generate/route.js - PURE AI, NO LIMITS + ADMOB READY
import { NextResponse } from 'next/server';

// In-memory store for demo (replace with database later)
let userGenerations = new Map();

export async function POST(request) {
  
  try {
    const { userScript, userId = 'anonymous', adWatched = false } = await request.json();

    if (!userScript) {
      return NextResponse.json({ error: 'Please enter your script idea' }, { status: 400 });
    }

    console.log('PURE AI - Generating for:', userScript, 'User:', userId, 'AdWatched:', adWatched);

    // 🚫 REMOVED ALL USAGE LIMITS - Users can generate unlimited scripts
    // 🎯 AdMob Integration: Track if ad was watched (for future rewarded ads)
    if (adWatched) {
      console.log('✅ User watched ad - granting premium generation');
      // Future: Grant bonus features, remove cooldowns, etc.
    }

    // 📊 Analytics Tracking (for your insights)
    const generationAnalytics = {
      userId,
      timestamp: new Date().toISOString(),
      input: userScript.substring(0, 100), // Store first 100 chars only
      adWatched,
      modelUsed: null,
      success: false
    };

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
            'HTTP-Referer': 'https://insta-trend-ai.vercel.app', // ✅ Updated to your live domain
            'X-Title': 'Instagram Reel Generator'
          },
          body: JSON.stringify({
            model: models[modelIndex],
            messages: [
              {
                role: "user",
                content: `Create 3 COMPLETELY DIFFERENT Instagram Reel scripts for: "${userScript}"

IMPORTANT: 
- Create REAL, ORIGINAL scripts (no templates)
- Each script must be UNIQUE and READY-TO-SHOOT
- Include specific visual directions, sound suggestions, and creative approaches
- Make it engaging and trend-appropriate

OUTPUT FORMAT:
Script 1: [Unique creative script]
Script 2: [Completely different approach] 
Script 3: [Another unique perspective]

NO TEMPLATES - ONLY ORIGINAL CREATIVE CONTENT`
              }
            ],
            max_tokens: 2000,
            temperature: 0.9, // High creativity
            top_p: 0.95
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
          console.log('AI Content:', aiContent.substring(0, 200) + '...');
          
          // 📊 Update analytics
          generationAnalytics.modelUsed = models[modelIndex];
          generationAnalytics.success = true;

          // 💾 Store generation data (for future database)
          if (!userGenerations.has(userId)) {
            userGenerations.set(userId, []);
          }
          userGenerations.get(userId).push({
            timestamp: generationAnalytics.timestamp,
            input: generationAnalytics.input,
            model: generationAnalytics.modelUsed
          });

          // Keep only last 100 generations per user (memory management)
          if (userGenerations.get(userId).length > 100) {
            userGenerations.set(userId, userGenerations.get(userId).slice(-100));
          }

          // Format the pure AI response
          const scripts = formatPureAIScripts(aiContent);
          return NextResponse.json({ 
            scripts: scripts,
            model: models[modelIndex],
            success: true,
            analytics: {
              totalGenerations: userGenerations.get(userId)?.length || 1,
              adWatched: adWatched,
              // Future: Add user tier (free/premium) based on ad engagement
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

    // If ALL models fail
    console.log('ALL MODELS FAILED');
    generationAnalytics.success = false;
    
    throw new Error('All AI models are currently busy. Please try again in 30 seconds.');

  } catch (error) {
    console.error('PURE AI FAILED:', error);
    
    return NextResponse.json({ 
      error: 'AI services are currently optimizing. Please try again in 30 seconds.',
      success: false,
      retryAfter: 30
    }, { status: 503 });
  }
}

function formatPureAIScripts(aiContent) {
  // The AI should return properly formatted scripts
  // Just clean it up and return as-is
  const cleaned = aiContent
    .replace(/^(Script|Scripts|Here).*?:\s*/i, '')
    .replace(/```/g, '')
    .trim();

  // Try to split into 3 scripts if possible
  const sections = cleaned.split(/(?=Script \d+|🎬|Option \d+)/i);
  
  if (sections.length >= 3) {
    return sections.slice(0, 3).map(section => section.trim());
  }
  
  // If we can't split, return as one block (pure AI content)
  return [cleaned];
}

// 📊 Optional: Add analytics endpoint for your insights
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