// app/about/page.js
export default function AboutPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>About ReelAI Generator</h1>
        
        <div className="about-section">
          <h2>🎬 Our Mission</h2>
          <p>
            ReelAI Generator is an innovative AI-powered tool designed to help content creators, 
            marketers, and social media enthusiasts create engaging Instagram Reel scripts effortlessly. 
            Our mission is to democratize content creation by providing accessible AI technology to everyone.
          </p>
        </div>

        <div className="about-section">
          <h2>🤖 How It Works</h2>
          <p>
            Using advanced artificial intelligence and machine learning models, our platform 
            generates unique, creative, and trend-appropriate Instagram Reel scripts based on 
            your input. Simply describe your idea, and our AI will create multiple script 
            variations ready for production.
          </p>
        </div>

        <div className="about-section">
          <h2>🆓 Free & Accessible</h2>
          <p>
            We believe powerful tools should be available to everyone. That is why we offer 
            free access to our AI generator supported by advertisements. This model allows us 
            to maintain and improve our service while keeping it accessible to all users.
          </p>
        </div>

        <div className="about-section">
          <h2>📈 Our Vision</h2>
          <p>
            We are constantly working to improve our AI models and expand our features to 
            become the go-to platform for social media content creation. Your feedback and 
            support help us grow and serve you better.
          </p>
        </div>

        <div className="about-section">
          <h2>📞 Get In Touch</h2>
          <p>
            Have questions, suggestions, or feedback? We would love to hear from you! 
            Visit our <a href="/contact">Contact page</a> to reach out to our team.
          </p>
        </div>
      </div>
    </div>
  );
}