import { useParams } from "react-router-dom";
import { services } from "./ServicesData";
import Process from "../process/Process";
import { useState } from "react";

export default function ServicePage() {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  const [rating, setRating] = useState(0);

  if (!service) return <div>Servicio no encontrado</div>;

  return (
    <section className="service-page">
      <div className="container">
        {/* Nombre e imagen */}
        <h1>{service.title}</h1>
        <img
          src={service.image}
          alt={service.title}
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
        />

        {/* Información del proveedor y calificación */}
        <div className="provider-info">
          <span className="label">Proveedor:</span> <strong>{service.provider}</strong>
          <div className="rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                style={{ cursor: "pointer", color: i < rating ? "#1D4ED8" : "#ccc", fontSize: "1.5rem" }}
                onClick={() => setRating(i + 1)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Comunicación con proveedor */}
        <div className="communication">
          <h3>Comunicación</h3>
          <p>
            Puedes iniciar un chat con el proveedor vía WhatsApp:
            <a
              href={`https://wa.me/521XXXXXXXXXX?text=Hola,%20quiero%20información%20sobre%20${service.title}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn"
            >
              🟢 Iniciar Chat
            </a>
          </p>
        </div>

        {/* Características */}
        {service.features && (
          <div className="features">
            <h3>Características del servicio</h3>
            <ul>
              {service.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Carrusel de fotos/videos */}
        {service.gallery && (
          <div className="gallery">
            <h3>Galería</h3>
            <div className="gallery-grid">
              {service.gallery.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${service.title}-${idx}`}
                  style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bloque de proceso */}
        <Process serviceSteps={service.processSteps} />

        {/* Prueba de pago */}
        <div className="trial-payment">
          <h3>Versión de prueba</h3>
          <button className="primary">Realizar Pago de Prueba</button>
        </div>
      </div>
    </section>
  );
}