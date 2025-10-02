// app/page.js - UPDATED WITH PROPER LAYOUT
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [userScript, setUserScript] = useState('');
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [maxFreeUsage] = useState(1);

  // Check usage when page loads
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('aiUsage');
    
    if (stored) {
      const usageData = JSON.parse(stored);
      if (usageData.date === today) {
        setUsageCount(usageData.count);
      } else {
        localStorage.setItem('aiUsage', JSON.stringify({ date: today, count: 0 }));
        setUsageCount(0);
      }
    }
  }, []);

  const generateScripts = async () => {
    if (!userScript.trim()) {
      alert('Please enter your script idea!');
      return;
    }

    if (usageCount >= maxFreeUsage) {
      alert('You have used your free generation for today. Please sign up for unlimited access!');
      return;
    }

    setLoading(true);
    setScripts([]);
    setLastError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userScript }),
      });

      const data = await response.json();
      
      if (data.success) {
        setScripts(data.scripts);
        const newCount = usageCount + 1;
        setUsageCount(newCount);
        const today = new Date().toDateString();
        localStorage.setItem('aiUsage', JSON.stringify({ date: today, count: newCount }));
      } else {
        setLastError(data.error);
      }
    } catch (error) {
      setLastError('Connection failed. Please check your internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Usage Counter */}
      <div className="usage-counter">
        <div className="usage-text">
          <strong>Free Generations Today:</strong>
          <span id="usage-count">{usageCount}/{maxFreeUsage}</span>
        </div>
        <div className="upgrade-prompt">
          <Link href="/auth" className="upgrade-button">
            ✨ Get Unlimited
          </Link>
        </div>
      </div>

      {/* Main Generator */}
      <div className="generator-header">
        <h1>Instagram Reel Script Generator</h1>
        <p>Pure AI Generation - No Templates</p>
      </div>

      <div className="chat-container">
        <div className="input-area">
          <label>Your Reel Idea</label>
          <textarea 
            value={userScript}
            onChange={(e) => setUserScript(e.target.value)}
            placeholder="e.g., I want to make reel showing my new laptop with cinematic shots"
            rows="3"
            disabled={usageCount >= maxFreeUsage}
          />
          
          <button 
            onClick={generateScripts}
            disabled={loading || usageCount >= maxFreeUsage}
            className={usageCount >= maxFreeUsage ? 'disabled-button' : 'generate-button'}
          >
            {usageCount >= maxFreeUsage 
              ? '❌ Daily Limit Reached' 
              : loading 
                ? '🔄 AI is Generating...' 
                : '🚀 Generate Pure AI Scripts'
            }
          </button>

          {usageCount >= maxFreeUsage && (
            <div className="limit-message">
              <p>You have used your free generation for today</p>
              <p><Link href="/auth">Sign up</Link> for unlimited AI generations!</p>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {lastError && (
        <div className="error-message">
          <p>{lastError}</p>
          <button onClick={() => setLastError('')}>
            Retry in 30 seconds
          </button>
        </div>
      )}

      {/* Generated Scripts */}
      {scripts.length > 0 && (
        <div className="scripts-container">
          <div className="scripts-header">
            <p>✨ Pure AI Generated Content ✨</p>
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
                📋 Copy AI Script
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Connecting to AI models...</p>
          <p className="loading-subtext">This may take 10-30 seconds</p>
        </div>
      )}
    </div>
  );
}