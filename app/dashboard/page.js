// app/dashboard/page.js - REAL GENERATION STATS
'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [userStats, setUserStats] = useState({
    totalGenerations: 0,
    todayGenerations: 0,
    favoriteTopics: []
  });

  // Load stats from localStorage
  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = () => {
    try {
      const savedStats = localStorage.getItem('ai_generation_stats');
      if (savedStats) {
        const stats = JSON.parse(savedStats);
        
        // Calculate today's generations
        const today = new Date().toDateString();
        const todayGenerations = stats.generations.filter(gen => 
          new Date(gen.timestamp).toDateString() === today
        ).length;

        // Get favorite topics (most used keywords)
        const topics = stats.generations.map(gen => 
          gen.userScript.toLowerCase().split(' ').slice(0, 3).join(' ')
        );
        
        const topicCounts = {};
        topics.forEach(topic => {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        });
        
        const favoriteTopics = Object.entries(topicCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([topic]) => topic);

        setUserStats({
          totalGenerations: stats.generations.length,
          todayGenerations,
          favoriteTopics
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Clear all stats (for testing)
  const clearStats = () => {
    localStorage.removeItem('ai_generation_stats');
    setUserStats({
      totalGenerations: 0,
      todayGenerations: 0,
      favoriteTopics: []
    });
    alert('Stats cleared!');
  };

  return (
    <div className="dashboard-container">
      <h1>Your Generation Analytics</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Generations</h3>
          <p className="stat-number">{userStats.totalGenerations}</p>
          <p className="stat-label">All Time</p>
        </div>
        
        <div className="stat-card">
          <h3>Generations today</h3>
          <p className="stat-number">{userStats.todayGenerations}</p>
          <p className="stat-label">Last 24 Hours</p>
        </div>
        
        <div className="stat-card">
          <h3>Active Streak</h3>
          <p className="stat-number">{userStats.todayGenerations > 0 ? '🔥' : '0'}</p>
          <p className="stat-label">Daily Usage</p>
        </div>
      </div>

      {/* Favorite Topics */}
      {userStats.favoriteTopics.length > 0 && (
        <div className="topics-section">
          <h3>Your Favorite Topics</h3>
          <div className="topics-list">
            {userStats.favoriteTopics.map((topic, index) => (
              <span key={index} className="topic-tag">
                #{topic}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-info">
        <h3>About Your Analytics</h3>
        <ul>
          <li>📊 <strong>Track your creativity</strong> - See how many scripts you have generated</li>
          <li>🎯 <strong>Discover patterns</strong> - Find your most common content themes</li>
          <li>⚡ <strong>Unlimited generations</strong> - No restrictions, generate as much as you want</li>
          <li>🔒 <strong>Private & secure</strong> - Your data stays on your device</li>
        </ul>
      </div>

      {/* Clear button for testing */}
      <button 
        onClick={clearStats}
        className="clear-stats-button"
      >
        🗑️ Clear Stats (Testing)
      </button>
    </div>
  );
}