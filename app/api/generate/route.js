// app/api/generate/route.js - PURE AI, NO TEMPLATES
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userScript } = await request.json();

    if (!userScript) {
      return NextResponse.json({ error: 'Please enter your script idea' }, { status: 400 });
    }

    console.log('PURE AI - Generating for:', userScript);

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
            'HTTP-Referer': 'http://localhost:3000',
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
          
          // Format the pure AI response
          const scripts = formatPureAIScripts(aiContent);
          return NextResponse.json({ 
            scripts: scripts,
            model: models[modelIndex],
            success: true 
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

    // If ALL models fail, return error (NO TEMPLATES)
    console.log('ALL MODELS FAILED');
    throw new Error('All AI models are currently busy. Please try again in 60 seconds for pure AI generation.');

  } catch (error) {
    console.error('PURE AI FAILED:', error);
    
    // NO TEMPLATES - only return error
    return NextResponse.json({ 
      error: 'AI services are currently optimizing. Please try again in 60 seconds for pure AI-generated scripts.',
      success: false 
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