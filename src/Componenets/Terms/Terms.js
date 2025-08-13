import React, { useEffect, useState } from "react";
import "./Terms.css";

const Terms = () => {
  const [termsData, setTermsData] = useState(null);

  useEffect(() => {
    fetch(
      "https://alex-suciu.homebuddy.ro/CAD/php/get_data.php?type=terms_and_conditions"
    )
      .then((res) => res.json())
      .then((data) => setTermsData(data[0]))
      .catch((err) =>
        console.error("Failed to load Terms and Conditions:", err)
      );
  }, []);

  if (!termsData) return <p>Loading...</p>;

  return (
    <div className="terms-container">
      <h1>{termsData.title}</h1>
      <p className="last-updated">Last updated: {termsData.last_updated}</p>

      {termsData.sections.map((section, index) => (
        <div key={index} className="terms-section">
          <h2>{section.heading}</h2>
          <p>{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Terms;
