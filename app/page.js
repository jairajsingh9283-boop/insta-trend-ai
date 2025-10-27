// app/page.js - Instagram Reel Generator (robust parsing)
'use client';
import { useState } from 'react';

export default function Home() {
  const [userScript, setUserScript] = useState('');
  const [scripts, setScripts] = useState([]); // will hold { trend, body } objects
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState('');

  // helper: parse single AI script text into { trend, body }
  const parseScript = (scriptText) => {
    if (!scriptText || typeof scriptText !== 'string') {
      return { trend: 'Untitled Trend', body: '' };
    }

    // Normalize line endings and trim
    let text = scriptText.replace(/\r\n/g, '\n').trim();

    // Remove top stray asterisks like "**" or multiple lines of them
    text = text.replace(/^\*+\s*\n?/, '');

    // Try to find "🎬 TREND: ..." first
    let trend = null;
    const trendEmojiMatch = text.match(/🎬\s*TREN(D|DS)?:\s*(.+)/i);
    if (trendEmojiMatch) {
      // Grab the rest of the line as trend
      trend = trendEmojiMatch[2].split('\n')[0].trim();
    }

    // If not found, try to find number + quoted title e.g. 1. "Stop Talking Dirty to Me"
    if (!trend) {
      const numberedQuoted = text.match(/^\s*\**\s*(\d+)\.\s*["“]?([^"“\n]+?)["”]?\s*(Trend)?\**/i);
      if (numberedQuoted) {
        trend = numberedQuoted[2].trim();
      }
    }

    // If still not found, try plain "1. Stop Talking..." (without quotes)
    if (!trend) {
      const numberedPlain = text.match(/^\s*\**\s*(\d+)\.\s*([^"\n\r]+)\s*(Trend)?\**/i);
      if (numberedPlain) {
        trend = numberedPlain[2].replace(/Trend$/i, '').trim();
      }
    }

    // Final fallback
    if (!trend) trend = 'Untitled Trend';

    // Remove the initial title/numbering block from the body if present
    text = text
      .replace(/^\s*\**\s*(\d+)\.\s*["“]?([^"“\n]+?)["”]?\s*(Trend)?\**\s*/i, '')
      .replace(/🎬\s*TREN(D|DS)?:.*(\n|$)/i, '') // remove the line with 🎬 TREND:
      .replace(/^\s*\*+\s*/g, '') // remove leftover leading stars
      .trim();

    // If after cleaning body is empty, use original trimmed script as fallback (safe)
    const body = text.length ? text : scriptText.trim();

    return { trend, body };
  };

  // Main generation function
  const generateScripts = async () => {
    if (!userScript.trim()) {
      alert('Please enter your content niche or idea!');
      return;
    }

    setLoading(true);
    setScripts([]);
    setLastError('');

    try {
      console.log('🔄 Generating AI scripts...');
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userScript,
          userId: 'user_' + Date.now()
        })
      });

      const data = await response.json();

      if (data.success && data.scripts && Array.isArray(data.scripts)) {
        // parse each script into { trend, body }
        const parsed = data.scripts.map((s) => parseScript(s));
        setScripts(parsed);
        console.log('✅ AI generated and parsed scripts successfully!');
      } else {
        setLastError(data.error || 'Generation failed. Please try again.');
      }
    } catch (error) {
      console.error('💥 Error:', error);
      setLastError('Connection failed. Please check your internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page-content">
      {/* Header */}
      <div className="generator-header">
        <h1>Instagram Reel Script Generator</h1>
        <p>AI-Powered Content Creation • Generate Unlimited Scripts</p>
      </div>

      {/* Input */}
      <div className="chat-container">
        <div className="input-area">
          <label>Your Content Niche or Idea</label>
          <textarea
            value={userScript}
            onChange={(e) => setUserScript(e.target.value)}
            placeholder="e.g., I am a lifestyle creator and want to talk about coffee health benefits..."
            rows="3"
          />

          <button
            onClick={generateScripts}
            disabled={loading}
            className={loading ? 'generate-button:disabled' : 'generate-button'}
          >
            {loading ? '🔄 AI is Generating...' : '🎬 Generate 10 Trendy Scripts'}
          </button>

          <div className="generation-info">
            <p>
              <strong>10 Complete Scripts:</strong> Get 10 viral Reel scripts with trends, songs, and hashtags tailored to your niche.
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {lastError && (
        <div className="error-message">
          <p>{lastError}</p>
          <button onClick={() => setLastError('')}>Try Again</button>
        </div>
      )}

      {/* Results */}
      {scripts.length > 0 && (
        <div className="scripts-container">
          <div className="scripts-header">
            <p>✨ Your AI Generated Reel Scripts ✨</p>
            <small>Complete with trends, songs, and hashtags</small>
          </div>

          {scripts.map((item, idx) => (
            <div key={idx} className="script-card">
              <h2 className="trend-title">
                {idx + 1}. {item.trend}
              </h2>

              <div className="script-content">
                <pre>{item.body}</pre>
              </div>

              <button
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(item.body).then(() => {
                    alert('Script copied to clipboard!');
                  }).catch(() => {
                    alert('Unable to copy. Please select and copy manually.');
                  });
                }}
              >
                📋 Copy Script
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Loading UI - shown while generating */}
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>AI is creating your 10 trendy scripts...</p>
          <p className="loading-subtext">Using current viral trends + your niche</p>
        </div>
      )}
    </div>
  );
}
