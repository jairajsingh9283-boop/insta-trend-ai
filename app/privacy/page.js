// app/privacy/page.js
export default function PrivacyPolicy() {
  return (
    <div className="page-container">
      <div className="legal-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="policy-section">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us when using our Instagram Reel Generator service:</p>
          <ul>
            <li><strong>Script Content:</strong> The ideas and prompts you input for AI script generation</li>
            <li><strong>Usage Data:</strong> Information about your interactions with our service</li>
            <li><strong>Technical Information:</strong> Browser type, IP address, and device information</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Generate AI-powered Instagram Reel scripts based on your input</li>
            <li>Improve our AI models and service quality</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Display relevant advertisements to support our free service</li>
            <li>Ensure the security and proper functioning of our platform</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. Data Storage and Security</h2>
          <p>We implement appropriate security measures to protect your information:</p>
          <ul>
            <li>Script data is stored temporarily for service improvement</li>
            <li>We do not store personal identification information unless provided voluntarily</li>
            <li>All data transmission is encrypted using SSL/TLS protocols</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Third-Party Services</h2>
          <p>We use third-party services that may collect information:</p>
          <ul>
            <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
            <li><strong>Analytics Services:</strong> To understand usage patterns and improve our service</li>
            <li><strong>AI Model Providers:</strong> To process and generate script content</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of certain data collection practices</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>Email: privacy@reelai-generator.com</p>
        </section>
      </div>
    </div>
  );
}