import React, { useEffect, useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    fetch(
      "https://alexsuciu.ro/projects/inscripto/php/get_data.php?type=contact_info"
    )
      .then((res) => res.json())
      .then((data) => setContactInfo(data[0]))
      .catch((err) => console.error("Failed to load contact info:", err));
  }, []);

  if (!contactInfo) return <p>Loading...</p>;

  const whatsappLink = `https://wa.me/${contactInfo.phone.replace(/\D/g, "")}`;

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <div className="contact-info">
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
        </p>
        <p>
          <strong>Address:</strong>{" "}
          <a
            href={contactInfo.map_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contactInfo.address}
          </a>
        </p>
      </div>

      <div className="whatsapp-contact">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
        >
          📱 Message Us on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Contact;
