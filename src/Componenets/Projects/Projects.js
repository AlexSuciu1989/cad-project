import React, { useEffect, useState } from "react";
import Project from "./Project";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch("/database/homebudd_db_table_cad_projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  const grouped = projects.reduce((acc, proj) => {
    const category = proj.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(proj);
    return acc;
  }, {});

  return (
    <div className="Projects">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="CategorySection">
          <h1>{category}</h1>
          {items.map((proj, index) => (
            <div key={index} onClick={() => setSelectedProject(proj)}>
              <Project
                image={proj.image}
                title={proj.title}
                category={proj.category}
                description={proj.description}
              />
            </div>
          ))}
        </div>
      ))}

      {selectedProject && (
        <div className="ProjectModal" onClick={() => setSelectedProject(null)}>
          <div
            className="ProjectModalContent"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <h2>{selectedProject.title}</h2>
            <img src={selectedProject.image} alt={selectedProject.title} />
            <p>
              <strong>Category:</strong> {selectedProject.category}
            </p>
            <p>{selectedProject.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
