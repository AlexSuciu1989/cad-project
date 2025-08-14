import "./Menu.css";

function Menu({ setActiveView }) {
  return (
    <div className="MenuContainer">
      <ul className="Menu">
        <li onClick={() => setActiveView("home")}>home</li>
        <li onClick={() => setActiveView("projects")}>my projects</li>
        <li onClick={() => setActiveView("about")}>about us</li>
        <li onClick={() => setActiveView("terms")}>terms and conditions</li>
      </ul>
      <button className="cta-button" onClick={() => setActiveView("contact")}>
        Contact Us
      </button>
    </div>
  );
}

export default Menu;
