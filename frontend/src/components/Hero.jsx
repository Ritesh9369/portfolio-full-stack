import { useEffect, useRef } from "react";
import "../styles/Hero.css";

const Hero = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const sentences = [
      "Hi, I'm Ritesh Chauhan",
      "Full-Stack & Mobile Developer"
    ];

    let index = 0;
    let started = false;

    const startTyping = () => {
      if (started) return;
      started = true;

      const el = textRef.current;
      let charIndex = 0;

      const type = () => {
        if (charIndex < sentences[index].length) {
          el.textContent = sentences[index].slice(0, charIndex + 1);
          charIndex++;
          setTimeout(type, 110);
        } else {
          setTimeout(erase, 1400);
        }
      };

      const erase = () => {
        if (charIndex > 0) {
          el.textContent = sentences[index].slice(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, 65);
        } else {
          index = (index + 1) % sentences.length;
          setTimeout(type, 500);
        }
      };

      type();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) startTyping();
      },
      { threshold: 0.4 }
    );

    if (textRef.current) observer.observe(textRef.current);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        {/* LEFT SIDE */}
        <div className="hero__left">
          <span className="hero__pill">
            <span className="hero__pill-dot" /> Full-Stack • MERN • RN
          </span>

          <div className="typing-wrapper">
            <h1 className="animated-text">
              <span ref={textRef} className="dynamic-text" />
              <span className="cursor" />
            </h1>
          </div>

          <p className="hero__subtitle">
            I develop modern, scalable & UI-rich applications using <b>React</b>
            ,<b> Node</b>, <b>MySQL</b> & <b>React-Native</b> with animations,
            API automation & clean architecture.
          </p>

          <div className="hero__buttons">
            <a href="#projects">
              <button className="btn-primary">View Projects ↗</button>
            </a>
            <a href="#contact">
              <button className="btn-outline">Contact Me</button>
            </a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero__right">
          <div className="tech-orb">
            <div className="orb-core"></div>
            <div className="orb-ring orb-ring-1"></div>
            <div className="orb-ring orb-ring-2"></div>
            <div className="orb-scanline"></div>

            <div className="tech-icons">
              <span>⚛️</span>
              <span>🟩</span>
              <span>🗄️</span>
              <span>📱</span>
            </div>

            <p className="orb-label">Next-Gen Tech Stack</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
