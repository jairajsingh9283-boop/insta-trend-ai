import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navigation */}
        <nav className="navbar">
          <div className="nav-brand">
            <h2>🤖 Insta-Trend AI</h2>
          </div>
          <div className="nav-links">
            <Link href="/" className="active">AI</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/auth">Login</Link>
          </div>
        </nav>
        
        {/* This will show the page content */}
        {children}
      </body>
    </html>
  );
}