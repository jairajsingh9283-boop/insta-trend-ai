// app/contact/page.js
export default function ContactPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Contact Us</h1>
        <p>We would love to hear from you! Get in touch with our team.</p>
        
        <div className="contact-grid">
          <div className="contact-info">
            <h2>📧 Email Support</h2>
            <p>For general inquiries and support:</p>
            <a href="mailto:support@reelai-generator.com" className="contact-email">
              support@reelai-generator.com
            </a>
            
            <h2>🕒 Response Time</h2>
            <p>We typically respond to all emails within 24-48 hours.</p>
            
            <h2>🔧 Technical Support</h2>
            <p>For technical issues or bug reports, please include:</p>
            <ul>
              <li>Device and browser information</li>
              <li>Steps to reproduce the issue</li>
              <li>Screenshots if possible</li>
            </ul>
          </div>
          
          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form className="message-form">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your name" className="form-input" />
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" className="form-input" />
              </div>
              
              <div className="form-group">
                <label>Subject</label>
                <select className="form-input">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Feature Request</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  placeholder="Enter your message..." 
                  className="form-input" 
                  rows="5"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}