import { useState } from "react";
import "./styles.css";
import Menu from "./Componenets/Menu/Menu";
import Home from "./Componenets/Home/Home";
import Projects from "./Componenets/Projects/Projects";
import About from "./Componenets/About/About";
import Contact from "./Componenets/Contact/Contact";
import Terms from "./Componenets/Terms/Terms";
import Footer from "./Componenets/Footer/Footer";

export default function App() {
  const [activeView, setActiveView] = useState("home");

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <Home />;
      case "projects":
        return <Projects />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "terms":
        return <Terms />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Menu setActiveView={setActiveView} />
      {renderView()}
      <Footer />
    </div>
  );
}
