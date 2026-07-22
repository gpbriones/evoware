import type { Service } from "./ServicesData";
import { useNavigate } from "react-router-dom";

type ServiceCardProps = Service;

export default function ServiceCard({ id, title, description, image }: ServiceCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/service/${id}`)} // <-- navegación al click
      style={{ cursor: "pointer" }}
    >
      <div
        className="card-bg"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="overlay">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}