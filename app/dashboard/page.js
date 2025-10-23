// app/dashboard/page.js
'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [userStats, setUserStats] = useState({
    totalGenerations: 0,
    creditsUsed: 0,
    adsWatched: 0,
    favoriteTopics: []
  });

  return (
    <div className="dashboard-container">
      <h1>Your Analytics</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Generations</h3>
          <p className="stat-number">{userStats.totalGenerations}</p>
        </div>
        
        <div className="stat-card">
          <h3>Credits Used</h3>
          <p className="stat-number">{userStats.creditsUsed}</p>
        </div>
        
        <div className="stat-card">
          <h3>Ads Watched</h3>
          <p className="stat-number">{userStats.adsWatched}</p>
        </div>
      </div>

      <div className="dashboard-info">
        <h3>How Credits Work</h3>
        <ul>
          <li>🎫 <strong>5 free credits daily</strong> - resets every 24 hours</li>
          <li>📺 <strong>Watch ads</strong> - get unlimited generations after credits</li>
          <li>⚡ <strong>No limits</strong> - generate as much as you want</li>
        </ul>
      </div>
    </div>
  );
}