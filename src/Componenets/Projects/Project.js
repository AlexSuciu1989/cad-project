import "./Project.css";

function Project({ image, title, category, description }) {
  return (
    <div className="Project">
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <h5>{category}</h5>
      <p>{description}</p>
    </div>
  );
}

export default Project;
