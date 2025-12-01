import "../styles/Projects.css";

const projects = [
  {
    title: "EV Charging Station Booking",
    period: "2025 • Full-Stack Web App",
    description:
      "End-to-end platform to search, book and manage EV charging slots with location-based station listing.",
    stack: "React, Node.js, Express, MySQL, Leaflet.js",
    highlights: [
      "Search stations by area / city with interactive map view",
      "Slot booking flow with user authentication",
      "Responsive UI built with modern components"
    ]
  },
  {
    title: "Employee Management Dashboard",
    period: "2025 • Full-Stack Web App",
    description:
      "Dashboard to manage employees, attendance and records with filters and export features.",
    stack: "React, Node.js, Express, MySQL, JWT",
    highlights: [
      "Secure login & role-based access",
      "CRUD operations with search & filters",
      "CSV/Excel style data handling features"
    ]
  },
  {
    title: "Mobile Utility App (React Native)",
    period: "In Progress • Mobile App",
    description:
      "A simple React Native app to track tasks/expenses (placeholder – update with your actual app).",
    stack: "React Native, Expo",
    highlights: [
      "Clean mobile-first UI",
      "Local storage or backend integration",
      "Built to learn cross-platform patterns"
    ]
  }
];

const Projects = () => {
  return (
    <section id="projects" className="section section-animate">
      <h2 className="section__title">Projects</h2>
      <p className="section__subtitle">
        Some of the real-world apps I’ve been working on recently.
      </p>

      <div className="projects-grid">
        {projects.map((p) => (
          <div className="project-card" key={p.title}>
            <h3 className="project-title">{p.title}</h3>
            <span className="project-period">{p.period}</span>

            <div className="project-title-line"></div>

            <p className="project-desc">{p.description}</p>
            <p className="project-stack">
              <b>Tech:</b> {p.stack}
            </p>

            <ul className="project-list">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
