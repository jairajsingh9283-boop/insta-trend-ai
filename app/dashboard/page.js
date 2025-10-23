// app/page.js - 1 CREDIT = 1 GENERATION
'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [userScript, setUserScript] = useState('');
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState('');
  const [adAvailable, setAdAvailable] = useState(true);
  const [showAd, setShowAd] = useState(false);
  const [credits, setCredits] = useState(1); // Start with 1 credit

  // Check ad availability on load
  useEffect(() => {
    checkAdAvailability();
  }, []);

  const checkAdAvailability = () => {
    const isAdAvailable = Math.random() > 0.1;
    setAdAvailable(isAdAvailable);
    console.log('Ad available:', isAdAvailable);
  };

  // Main generation function - 1 credit = 1 generation
  const generateScripts = async () => {
    if (!userScript.trim()) {
      alert('Please enter your script idea!');
      return;
    }

    // SCENARIO 1: User has credit
    if (credits > 0) {
      console.log('🎫 Using 1 credit for generation');
      setCredits(0); // Use the credit
      startGeneration(false); // Free generation (no ad needed)
    }
    // SCENARIO 2: No credits but ads available
    else if (adAvailable) {
      console.log('📺 No credits - showing ad for 1 generation');
      setShowAd(true);
      showRewardedAd();
    }
    // SCENARIO 3: No credits & no ads
    else {
      alert('Please watch an ad to generate scripts. Ads help keep this service free.');
    }
  };

  // Show actual rewarded ad
  const showRewardedAd = () => {
    setLoading(true);
    
    setTimeout(() => {
      const adCompleted = Math.random() > 0.2;
      
      if (adCompleted) {
        console.log('✅ Ad completed - granting 1 generation');
        startGeneration(true); // Ad watched generation
      } else {
        console.log('❌ Ad failed - no generation granted');
        alert('Ad not completed. Please try again.');
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
        console.log('✅ Generation successful!');
        
        // If user watched ad, give them 1 credit for next time
        if (adWatched) {
          setCredits(1);
          console.log('🎫 Granted 1 credit for watching ad');
        }
        
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
              <small>💡 Watch complete ad to get 1 free generation</small>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="generator-header">
        <h1>Instagram Reel Script Generator</h1>
        <p>AI-Powered Content Creation • Watch Ads = Get Generations</p>
      </div>

      {/* Credits System */}
      <div className="credits-system">
        <div className="credits-display">
          <span className="credits-icon">🎬</span>
          <span className="credits-text">
            {credits > 0 ? '1 Free Generation Available' : 'Watch Ad to Generate'}
          </span>
          <span className="credits-reset">1 Ad = 1 Generation</span>
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
          
          {/* Generation Button */}
          <button 
            onClick={generateScripts}
            disabled={loading}
            className={`generate-button ${credits > 0 ? 'has-credit' : 'needs-ad'}`}
          >
            {loading ? (
              showAd ? '📺 Showing Ad...' : '🔄 AI is Generating...'
            ) : credits > 0 ? (
              '🎬 Generate Script (Free)'
            ) : (
              '📺 Watch Ad to Generate'
            )}
          </button>

          {/* Info Text */}
          <div className="generation-info">
            <p>
              <strong>How it works:</strong> {credits > 0 
                ? 'You have 1 free generation. After this, watch ads for more.' 
                : 'Watch a short ad to generate AI scripts. 1 ad = 1 generation.'}
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
            <small>You can generate again by watching an ad</small>
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