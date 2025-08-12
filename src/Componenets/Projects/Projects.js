import React, { useEffect, useState } from "react";
import Project from "./Project";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/database.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  // Group projects by category
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
            <Project
              key={index}
              image={proj.image}
              title={proj.title}
              category={proj.category}
              description={proj.description}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Projects;
