import React, { useEffect, useState } from "react";
import "./Home.css";
import Project from "../Projects/Project";

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [latestProjects, setLatestProjects] = useState([]);

  useEffect(() => {
    fetch("https://alexsuciu.ro/projects/inscripto/php/get_data.php?type=home")
      .then((res) => res.json())
      .then((data) => {
        const content = data[0]; // Assuming it's an array with one object
        setHomeData(content);

        if (content.latest_projects) {
          fetch(
            "https://alexsuciu.ro/projects/inscripto/php/get_data.php?type=projects"
          )
            .then((res) => res.json())
            .then((projects) => {
              const sorted = [...projects].sort((a, b) => b.id - a.id);
              setLatestProjects(sorted.slice(0, 3));
            })
            .catch((err) => console.error("Failed to load projects:", err));
        }
      })
      .catch((err) => console.error("Failed to load home data:", err));
  }, []);

  if (!homeData) return null; // or a loading spinner

  return (
    <div className="promo-container">
      <div className="promo_subcontainer">
        <div className="promo_text">
          <h1 className="title">{homeData.title}</h1>
          <h2 className="tagline">{homeData.subtitle}</h2>
          <p className="description">{homeData.headline}</p>
          <p className="mission">{homeData.mission}</p>
        </div>
        <img src="./project_img.jpg" className="headImg" alt="Promo" />
      </div>

      <div className="cta">
        <strong>{homeData.call_to_arms_title}</strong>
        <br />
        <span>{homeData.call_to_arms_desc}</span>
      </div>

      {homeData.latest_projects && (
        <>
          <h1>Latest projects</h1>
          <div className="CategorySection">
            {latestProjects.map((proj) => (
              <Project
                key={proj.id}
                image={proj.image}
                title={proj.title}
                category={proj.category}
                description={proj.description}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
