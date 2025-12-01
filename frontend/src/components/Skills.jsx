import "../styles/Skills.css";

const skillData = [
  { icon: "⚛️", title: "React.js", desc: "Frontend UI development" },
  { icon: "🟩", title: "Node.js", desc: "Backend APIs & logic" },
  { icon: "📦", title: "Express.js", desc: "REST API routing" },
  { icon: "🗄️", title: "MySQL", desc: "Database + queries" },
  { icon: "📱", title: "React Native", desc: "Cross-platform mobile apps" },
  { icon: "🎨", title: "UI/UX", desc: "Modern clean UI designing" }
];

const Skills = () => {
  return (
    <section id="skills" className="section section-animate delay-1">
      <h2 className="section__title">Skills</h2>
      <p className="section__subtitle">
        Technologies I use to build real projects
      </p>

      <div className="skills-grid">
        {skillData.map((skill, idx) => (
          <div key={idx} className="skill-card">
            <div className="skill-icon">{skill.icon}</div>
            <h3 className="skill-title">{skill.title}</h3>
            <p className="skill-desc">{skill.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
