import React, { useEffect, useState } from "react";
import "./About.css";

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch("https://alexsuciu.ro/projects/inscripto/php/get_data.php?type=about_us")
      .then((res) => res.json())
      .then((data) => setAboutData(data[0]))
      .catch((err) => console.error("Failed to load About Us data:", err));
  }, []);

  if (!aboutData) return <p>Loading...</p>;

  return (
    <div className="about-container">
      <h1>{aboutData.title}</h1>
      <h2>{aboutData.subtitle}</h2>
      <p className="description">{aboutData.description}</p>
      <p className="mission">
        <strong>Mission:</strong> {aboutData.mission}
      </p>

      <div className="values">
        <h3>Our Values</h3>
        <ul>
          {aboutData.values.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>

      <div className="team">
        <h3>Meet the Team</h3>
        {aboutData.team.map((member, index) => (
          <div key={index} className="team-member">
            <h4>
              {member.name} - {member.role}
            </h4>
            <p>{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
