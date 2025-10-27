// app/page.js - Instagram Reel Generator (fixed layout)
'use client';
import { useState } from 'react';

export default function Home() {
  const [userScript, setUserScript] = useState('');
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState('');

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
        }),
      });

      const data = await response.json();
      if (data.success && data.scripts) {
        setScripts(data.scripts);
        console.log('✅ AI generated scripts successfully!');
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

  // Helper function to extract trend name
  const extractTrendName = (script) => {
    const match = script.match(/🎬\s*TREN(D|DS)?:\s*(.+)/i);
    return match ? match[2].trim() : 'Untitled Trend';
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="generator-header">
        <h1>Instagram Reel Script Generator</h1>
        <p>AI-Powered Content Creation • Generate Unlimited Scripts</p>
      </div>

      {/* Main Input Area */}
      <div className="chat-container">
        <div className="input-area">
          <label>Your Content Niche or Idea</label>
          <textarea 
            value={userScript}
            onChange={(e) => setUserScript(e.target.value)}
            placeholder="e.g., I am a lifestyle creator and want to talk about coffee health benefits..."
            rows="3"
          />
          
          {/* Generate Button */}
          <button 
            onClick={generateScripts}
            disabled={loading}
            className="generate-button"
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

      {/* Error Message */}
      {lastError && (
        <div className="error-message">
          <p>{lastError}</p>
          <button onClick={() => setLastError('')}>Try Again</button>
        </div>
      )}

      {/* Generated Scripts */}
      {scripts.length > 0 && (
        <div className="scripts-container">
          <div className="scripts-header">
            <p>✨ Your 10 AI Generated Reel Scripts ✨</p>
            <small>Complete with trends, songs, and hashtags</small>
          </div>

          {scripts.map((script, index) => {
            const trendName = extractTrendName(script);
            return (
              <div key={index} className="script-card">
                {/* ✅ Trend Title INSIDE the card */}
                <h2 className="trend-title">
                  {index + 1}. {trendName}
                </h2>

                <div className="script-content">
                  <pre>{script}</pre>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(script);
                    alert('Script copied to clipboard!');
                  }}
                  className="copy-button"
                >
                  📋 Copy Script
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Loading Indicator */}
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
