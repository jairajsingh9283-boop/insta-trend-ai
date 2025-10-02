// app/layout.js - USING NEXT.JS LINK COMPONENT
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Instagram Reel Generator - AI Powered',
  description: 'Create viral Instagram Reel scripts with AI. Free ad-supported tool for content creators.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navigation Header */}
        <nav className="navbar">
          <div className="nav-container">
            {/* Logo */}
            <div className="nav-logo">
              <Link href="/">🎬 ReelAI</Link>
            </div>

            {/* Navigation Links */}
            <div className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              
              {/* Dropdown Menu */}
              <div className="dropdown">
                <button className="dropbtn">🔍 Menu</button>
                <div className="dropdown-content">
                  {/* Authentication Section */}
                  <div className="dropdown-section">
                    <div className="section-title">Account</div>
                    <Link href="/login" className="dropdown-item login-item">
                      <span className="item-icon">🔐</span>
                      Login
                    </Link>
                    <Link href="/signup" className="dropdown-item signup-item">
                      <span className="item-icon">✨</span>
                      Sign Up
                    </Link>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  {/* Information Pages */}
                  <div className="dropdown-section">
                    <div className="section-title">Information</div>
                    <Link href="/about" className="dropdown-item">
                      <span className="item-icon">ℹ️</span>
                      About Us
                    </Link>
                    <Link href="/contact" className="dropdown-item">
                      <span className="item-icon">📞</span>
                      Contact
                    </Link>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  {/* Legal Pages */}
                  <div className="dropdown-section">
                    <div className="section-title">Legal</div>
                    <Link href="/privacy" className="dropdown-item">
                      <span className="item-icon">🛡️</span>
                      Privacy Policy
                    </Link>
                    <Link href="/terms" className="dropdown-item">
                      <span className="item-icon">📄</span>
                      Terms of Service
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/about">About</Link>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </div>
            <p>&copy; 2024 ReelAI Generator. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}