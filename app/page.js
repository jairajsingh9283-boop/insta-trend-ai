// app/page.js - PURE AI GENERATION (NO ADS, NO LIMITS)
'use client';
import { useState } from 'react';

export default function Home() {
  const [userScript, setUserScript] = useState('');
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState('');

  // Pure generation function - NO LIMITS
  const generateScripts = async () => {
    if (!userScript.trim()) {
      alert('Please enter your script idea!');
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
          <label>Your Reel Idea</label>
          <textarea 
            value={userScript}
            onChange={(e) => setUserScript(e.target.value)}
            placeholder="e.g., I want to make reel showing my new laptop with cinematic shots"
            rows="3"
          />
          
          {/* Generation Button - NO LIMITS */}
          <button 
            onClick={generateScripts}
            disabled={loading}
            className="generate-button"
          >
            {loading ? '🔄 AI is Generating...' : '🎬 Generate AI Scripts'}
          </button>

          {/* Info Text */}
          <div className="generation-info">
            <p>
              <strong>Unlimited Generations:</strong> Create as many AI scripts as you need. No limits, no ads.
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {lastError && (
        <div className="error-message">
          <p>{lastError}</p>
          <button onClick={() => setLastError('')}>
            Try Again
          </button>
        </div>
      )}

      {/* Generated Scripts */}
      {scripts.length > 0 && (
        <div className="scripts-container">
          <div className="scripts-header">
            <p>✨ Your AI Generated Scripts ✨</p>
          </div>
          {scripts.map((script, index) => (
            <div key={index} className="script-card">
              <div className="script-content">
                {script}
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
          ))}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>AI is creating your scripts...</p>
          <p className="loading-subtext">This may take 10-30 seconds</p>
        </div>
      )}
    </div>
  );
}