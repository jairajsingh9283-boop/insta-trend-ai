export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <h1>Your Dashboard</h1>
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Free Generations Today</h3>
          <div className="stat-number">0/1</div>
          <p>Resets daily at midnight</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Generations</h3>
          <div className="stat-number">0</div>
          <p>All time usage</p>
        </div>
      </div>

      <div className="upgrade-section">
        <h2>Want Unlimited Access?</h2>
        <p>Get unlimited AI generations for just $8/month</p>
        <button className="upgrade-button">
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
}