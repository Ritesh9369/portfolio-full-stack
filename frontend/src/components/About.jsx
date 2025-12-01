import "../styles/About.css";

const About = () => {
  return (
    <section id="about" className="section section-animate">
      <h2 className="section__title">About Me</h2>
      <p className="section__subtitle">
        Full Stack Developer • BSc IT Graduate • Mobile App Enthusiast
      </p>

      <div className="card about-card fade-slide">
        <div className="about-badge">
          <span className="dot"></span>
          BSc IT • 2025 Graduate
        </div>

        <p className="about-text">
          I'm a passionate full-stack developer from Mumbai, focused on building
          modern, scalable and visually polished web & mobile applications.
        </p>

        <p className="about-text">
          I work with <b>React.js</b>, <b>Node.js</b>, <b>Express</b> and
          <b> MySQL</b>, and also build cross-platform apps using
          <b> React Native</b>. I enjoy solving real problems and improving user
          experience through clean UI/UX and smooth animations.
        </p>

        <p className="about-text">
          I'm currently sharpening my mobile development skills and actively
          looking for opportunities where I can contribute, learn and grow.
        </p>

        <div className="about-skills">
          <span className="chip">⚛️ React</span>
          <span className="chip">🟩 Node.js</span>
          <span className="chip">🗄️ MySQL</span>
          <span className="chip">📱 React Native</span>
          <span className="chip">🎨 UI / UX</span>
        </div>
      </div>
    </section>
  );
};

export default About;
