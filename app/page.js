// app/page.js - MANDATORY ADS FOR EVERY GENERATION
'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [userScript, setUserScript] = useState('');
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState('');
  const [adAvailable, setAdAvailable] = useState(true); // Assume ads are available
  const [showAd, setShowAd] = useState(false);

  // Check ad availability on load
  useEffect(() => {
    checkAdAvailability();
  }, []);

  const checkAdAvailability = () => {
    // 🔥 SIMULATION: Replace with actual AdMob availability check
    // For real implementation: admob.rewarded.load() then check if .isLoaded()
    const isAdAvailable = Math.random() > 0.1; // 90% available for testing
    setAdAvailable(isAdAvailable);
    console.log('Ad available:', isAdAvailable);
  };

  // Main generation function - ALWAYS tries to show ad first
  const generateScripts = async () => {
    if (!userScript.trim()) {
      alert('Please enter your script idea!');
      return;
    }

    // ALWAYS try to show ad first
    if (adAvailable) {
      console.log('🤑 Showing ad for generation...');
      setShowAd(true);
      showRewardedAd();
    } else {
      console.log('🚫 Ad not available - generating for free');
      startGeneration(false); // false = no ad watched
    }
  };
  // 🧪 TEST FUNCTION - Add this
const testAPI = async () => {
  console.log('🧪 Testing API connection...');
  setLoading(true);
  
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userScript: 'Test: create a reel about morning coffee', 
        userId: 'test_user_123',
        adWatched: true 
      }),
    });
    
    const data = await response.json();
    console.log('🧪 API Test Result:', data);
    
    if (data.success) {
      alert('✅ API is working! Check console for details.');
    } else {
      alert('❌ API error: ' + data.error);
    }
  } catch (error) {
    console.error('🧪 API Test Failed:', error);
    alert('💥 API connection failed: ' + error.message);
  } finally {
    setLoading(false);
  }
};
  // Show actual rewarded ad
  const showRewardedAd = () => {
    setLoading(true);
    
    // 🔥 PLACEHOLDER: Replace with actual AdMob rewarded ad code
    // Real implementation: admob.rewarded.show()
    
    // Simulate ad loading and showing
    setTimeout(() => {
      // Simulate ad completion (80% success rate)
      const adCompleted = Math.random() > 0.2;
      
      if (adCompleted) {
        console.log('✅ Ad completed successfully - premium generation');
        startGeneration(true); // true = ad watched
      } else {
        console.log('❌ Ad failed or user closed ad - free generation');
        startGeneration(false); // false = no ad watched
      }
      
      setShowAd(false);
    }, 3000); // Simulate 3 second ad
  };

 // Start the actual generation process - FIXED VERSION
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
      // ✅ FIXED: Directly use the scripts array
      setScripts(data.scripts);
      console.log('✅ Generation successful! Scripts:', data.scripts.length);
      
      // Re-check ad availability for next generation
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

  // Get button text
  const getButtonText = () => {
    if (loading) {
      return showAd ? '📺 Showing Ad...' : '🔄 AI is Generating...';
    }
    return adAvailable ? '🎬 Generate Script (Watch Ad)' : '🎬 Generate Script (Free)';
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
        <p>AI-Powered Content Creation • Ads Support Free Service</p>
      </div>

      {/* Ad Status */}
      <div className="ad-status-banner">
        {adAvailable ? (
          <div className="ad-available">
            <span>📺</span>
            <strong>Ad Required:</strong> Watch a short ad to generate scripts
          </div>
        ) : (
          <div className="ad-unavailable">
            <span>🤖</span>
            <strong>Free Generation:</strong> Ads currently unavailable
          </div>
        )}
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
          {/* Single Generation Button */}
<button 
  onClick={generateScripts}
  disabled={loading}
  className={`generate-button ${adAvailable ? 'ad-required' : 'free-mode'}`}
>
  {getButtonText()}
</button>

{/* 🧪 ADD THIS TEMPORARY TEST BUTTON */}
<button 
  onClick={testAPI}
  disabled={loading}
  style={{
    backgroundColor: '#ff6b35',
    color: 'white',
    padding: '10px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }}
>
  🧪 Test API Connection
</button>
          {/* Single Generation Button */}
          <button 
            onClick={generateScripts}
            disabled={loading}
            className={`generate-button ${adAvailable ? 'ad-required' : 'free-mode'}`}
          >
            {getButtonText()}
          </button>

          {/* Info Text */}
          <div className="generation-info">
            {adAvailable ? (
              <p>
                <strong>📺 Ad Required:</strong> Every generation requires watching a short ad. 
                This keeps our AI service free for everyone.
              </p>
            ) : (
              <p>
                <strong>🤖 Free Mode:</strong> Ads are temporarily unavailable. 
                You can generate scripts for free until ads return.
              </p>
            )}
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
                onClick={() => navigator.clipboard.writeText(script)}
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

      {/* AdMob Status */}
      <div className="admob-status">
        <small>Ad System: {adAvailable ? '🟢 Ads Available' : '🔴 Ads Unavailable'}</small>
      </div>
    </div>
  );
}