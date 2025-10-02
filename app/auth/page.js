export default function AuthPage() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Welcome to AI Assistant</h1>
        
        <div className="auth-tabs">
          <button className="tab-active">Login</button>
          <button>Sign Up</button>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your@email.com" />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button type="submit" className="auth-button">
            Login to Your Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Do not have an account? <a href="#">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
}