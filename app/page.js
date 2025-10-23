// app/page.js - CREDITS SYSTEM + ADS
'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [userScript, setUserScript] = useState('');
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState('');
  const [adAvailable, setAdAvailable] = useState(true);
  const [showAd, setShowAd] = useState(false);
  const [credits, setCredits] = useState(5);
  const [lastReset, setLastReset] = useState(Date.now());

  // Check ad availability and credit reset on load
  useEffect(() => {
    checkAdAvailability();
    checkCreditReset();
  }, );

  const checkAdAvailability = () => {
    const isAdAvailable = Math.random() > 0.1;
    setAdAvailable(isAdAvailable);
    console.log('Ad available:', isAdAvailable);
  };

  const checkCreditReset = () => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (now - lastReset >= oneDay) {
      setCredits(5);
      setLastReset(now);
      console.log('✅ Daily credits reset to 5');
    }
  };

  // Main generation function with credits system
  const generateScripts = async () => {
    if (!userScript.trim()) {
      alert('Please enter your script idea!');
      return;
    }

    // Check if user has credits
    if (credits > 0) {
      // Use free credit
      setCredits(prev => prev - 1);
      console.log('🎫 Using 1 credit. Remaining:', credits - 1);
      startGeneration(false);
    } else {
      // No credits left - require ad
      if (adAvailable) {
        console.log('📺 No credits left - showing ad');
        setShowAd(true);
        showRewardedAd();
      } else {
        alert('No credits left and ads unavailable. Please try again later.');
      }
    }
  };

  // Show actual rewarded ad
  const showRewardedAd = () => {
    setLoading(true);
    
    setTimeout(() => {
      const adCompleted = Math.random() > 0.2;
      
      if (adCompleted) {
        console.log('✅ Ad completed successfully - premium generation');
        startGeneration(true);
      } else {
        console.log('❌ Ad failed or user closed ad - free generation');
        startGeneration(false);
      }
      
      setShowAd(false);
    }, 3000);
  };

  // Start the actual generation process
  const startGeneration = async (adWatched = false) => {
    setLoading(true);
    setScripts([]);
    setLastError('');

    try {
      console.log('🔄 Sending request to API...');
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userScript, 
          userId: 'user_' + Date.now(),
          adWatched: adWatched 
        }),
      });

      console.log('📡 API Response status:', response.status);
      
      const data = await response.json();
      console.log('📦 API Response data:', data);
      
      if (data.success && data.scripts) {
        setScripts(data.scripts);
        console.log('✅ Generation successful! Scripts:', data.scripts.length);
        setTimeout(checkAdAvailability, 1000);
      } else {
        setLastError(data.error || 'Generation failed. Please try again.');
        console.log('❌ API returned error:', data.error);
      }
    } catch (error) {
      console.error('💥 Network error:', error);
      setLastError('Connection failed. Please check your internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Ad Loading Screen */}
      {showAd && (
        <div className="ad-loading-overlay">
          <div className="ad-loading-content">
            <div className="ad-spinner"></div>
            <h3>Loading Ad...</h3>
            <p>Please wait while we load the advertisement</p>
            <div className="ad-tip">
              <small>💡 Watching ads helps us keep this service free</small>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="generator-header">
        <h1>Instagram Reel Script Generator</h1>
        <p>AI-Powered Content Creation • Free Credits + Ads</p>
      </div>

      {/* Credits System */}
      <div className="credits-system">
        <div className="credits-display">
          <span className="credits-icon">🎫</span>
          <span className="credits-text">Daily Credits: {credits}/5</span>
          <span className="credits-reset">Resets in 24h</span>
        </div>
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
          
          {/* Single Generation Button - FIXED */}
          <button 
            onClick={generateScripts}
            disabled={loading || credits === 0}
            className={`generate-button ${credits > 0 ? 'credit-mode' : 'ad-mode'}`}
          >
            {loading ? (
              showAd ? '📺 Showing Ad...' : '🔄 AI is Generating...'
            ) : credits > 0 ? (
              `🎬 Generate Script (${credits} Credits Left)`
            ) : (
              '📺 Watch Ad to Generate'
            )}
          </button>

          {/* Info Text */}
          <div className="generation-info">
            <p>
              <strong>🎫 Credit System:</strong> {credits > 0 
                ? `${credits} free credits remaining today.` 
                : 'No credits left. Watch ads for more generations.'}
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

      {/* Loading Indicator (for AI generation) */}
      {loading && !showAd && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>AI is creating your scripts...</p>
          <p className="loading-subtext">This may take 10-30 seconds</p>
        </div>
      )}
    </div>
  );
}