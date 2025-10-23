// app/layout.js - CLEANED (NO DASHBOARD, LOGIN, SIGNUP)
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
              
              {/* Dropdown Menu */}
              <div className="dropdown">
                <button className="dropbtn">🔍 Menu</button>
                <div className="dropdown-content">
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
            </div>
            <p>&copy; 2024 ReelAI Generator. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}