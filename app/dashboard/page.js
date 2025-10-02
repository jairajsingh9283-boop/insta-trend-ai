// app/dashboard/page.js - UPDATED FOR UNLIMITED + ADS SYSTEM
'use client';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [userStats, setUserStats] = useState({
    totalGenerations: 0,
    adGenerations: 0,
    freeGenerations: 0,
    lastGeneration: null
  });

  const [adAvailable, setAdAvailable] = useState(true);

  // Load user stats (simulated - replace with real data)
  useEffect(() => {
    loadUserStats();
    checkAdAvailability();
  }, []);

  const loadUserStats = () => {
    // 🔥 Replace with actual API call to your analytics
    const stats = {
      totalGenerations: 12, // Example data
      adGenerations: 8,
      freeGenerations: 4,
      lastGeneration: new Date().toISOString()
    };
    setUserStats(stats);
  };

  const checkAdAvailability = () => {
    // Simulate ad availability check
    setAdAvailable(Math.random() > 0.2); // 80% available
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your AI Generator Dashboard</h1>
        <p>Track your script generations and ad usage</p>
      </div>
      
      {/* Current Status */}
      <div className="status-card">
        <h3>🔄 Current System Status</h3>
        <div className="status-indicators">
          <div className={`status-item ${adAvailable ? 'active' : 'inactive'}`}>
            <span className="status-dot"></span>
            <span>Ad System: {adAvailable ? 'Available' : 'Unavailable'}</span>
          </div>
          <div className="status-item active">
            <span className="status-dot"></span>
            <span>AI Models: Operational</span>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <h3>Total Generations</h3>
          <div className="stat-number">{userStats.totalGenerations}</div>
          <p>All-time AI script creations</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📺</div>
          <h3>Ad-Supported</h3>
          <div className="stat-number">{userStats.adGenerations}</div>
          <p>Generations with ads watched</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🤖</div>
          <h3>Free Generations</h3>
          <div className="stat-number">{userStats.freeGenerations}</div>
          <p>When ads were unavailable</p>
        </div>
      </div>

      {/* Ad Support Section */}
      <div className="ad-support-section">
        <h2>🎁 Ad-Supported Free Access</h2>
        <div className="ad-benefits-grid">
          <div className="ad-benefit">
            <div className="benefit-icon">✨</div>
            <div className="benefit-content">
              <h4>Unlimited Access</h4>
              <p>Generate as many scripts as you need</p>
            </div>
          </div>
          
          <div className="ad-benefit">
            <div className="benefit-icon">📺</div>
            <div className="benefit-content">
              <h4>Ad-Supported</h4>
              <p>Watch short ads to keep service free</p>
            </div>
          </div>
          
          <div className="ad-benefit">
            <div className="benefit-icon">⚡</div>
            <div className="benefit-content">
              <h4>Premium AI</h4>
              <p>High-quality models for best results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-type ad">📺 Ad Generation</span>
            <span className="activity-time">2 hours ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-type free">🤖 Free Generation</span>
            <span className="activity-time">1 day ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-type ad">📺 Ad Generation</span>
            <span className="activity-time">2 days ago</span>
          </div>
        </div>
      </div>

      {/* Support Info */}
      <div className="support-info">
        <h3>💡 How It Works</h3>
        <ul>
          <li>• Every generation attempts to show an ad first</li>
          <li>• If ads are unavailable, generation is free</li>
          <li>• Your support through ads keeps this service running</li>
          <li>• No daily limits - generate whenever you need</li>
        </ul>
      </div>
    </div>
  );
}