import React, { useEffect, useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    fetch(
      "https://alex-suciu.homebuddy.ro/CAD/php/get_data.php?type=contact_info"
    )
      .then((res) => res.json())
      .then((data) => setContactInfo(data[0]))
      .catch((err) => console.error("Failed to load contact info:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending email (you'd use a backend or service like EmailJS here)
    alert(`Message sent to ${contactInfo.email}:\n\n${formData.message}`);
    setFormData({ name: "", email: "", message: "" });
  };

  if (!contactInfo) return <p>Loading...</p>;

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <div className="contact-info">
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </p>
        <p>
          <strong>Phone:</strong> {contactInfo.phone}
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

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
