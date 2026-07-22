import { useState } from "react";
import ServiceCard from "./ServiceCard";
import { services } from "./ServicesData";
import "./services.css";

const categories = [
  "Todos",
  "Tecnología",
  "Hogar",
  "Deportes",
  "Impresión 3D",
  "Automatización",
  "Soporte IT",
  "Paneles Solares",
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredServices =
    selectedCategory === "Todos"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2>Nuestros Servicios</h2>

        {/* Botones estilo Hero */}
        <div className="categories-menu hero-menu-section">
          <div className="menu-row">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`menu-card ghost-button ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de servicios filtrados */}
        <div className="services-grid">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}