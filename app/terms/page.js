// app/terms/page.js
export default function TermsOfService() {
  return (
    <div className="page-container">
      <div className="legal-content">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using ReelAI Generator, you accept and agree to be bound by 
            the terms and provision of this agreement.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily use ReelAI Generator for personal, non-commercial transitory viewing only.</p>
          <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or other proprietary notations</li>
            <li>Transfer the materials to another person</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. AI-Generated Content</h2>
          <p>
            Our service uses artificial intelligence to generate Instagram Reel scripts. 
            While we strive for quality and originality:
          </p>
          <ul>
            <li>AI-generated content may not be perfect or error-free</li>
            <li>You are responsible for reviewing and editing generated content</li>
            <li>We cannot guarantee the uniqueness or copyright status of generated content</li>
            <li>Commercial use of generated content is at your own risk</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. Ad-Supported Service</h2>
          <p>
            ReelAI Generator is provided free of charge and is supported by advertisements. 
            By using our service, you agree to:
          </p>
          <ul>
            <li>View advertisements as part of the service experience</li>
            <li>Not employ ad-blocking software while using our service</li>
            <li>Understand that ads help keep the service free for all users</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Limitations</h2>
          <p>
            In no event shall ReelAI Generator or its suppliers be liable for any damages 
            arising out of the use or inability to use the materials on our service.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Revisions and Errata</h2>
          <p>
            The materials appearing on ReelAI Generator could include technical, 
            typographical, or photographic errors. We do not warrant that any of the 
            materials are accurate, complete, or current.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Contact Information</h2>
          <p>For any questions about these Terms of Service, please contact us at:</p>
          <p>Email: legal@reelai-generator.com</p>
        </section>
      </div>
    </div>
  );
}