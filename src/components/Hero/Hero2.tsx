"use client";
import { useEffect, useState } from "react";
//import HeroMenu from "./HeroMenu";
import "./Hero.css"

export default function Hero2() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);

  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Título */}
        <h1 className={`hero-title ${loaded ? "fade-slide-in" : ""}`}>
          Acerca tus servicios <span className="highlight">  a quien los necesita ...</span>
        </h1>

        {/* Subtítulo */}
        <p className={`hero-subtitle ${loaded ? "fade-slide-in delay-1" : ""}`}>
          Realiza tus transacciones de forma segura en los servicios o productos que necesites, 
          nuestro proceso de pago acegura que el vendedor y el comprador tengan una excelente experiencia
          al brindar o recibir un servico o producto.
        </p>


        {/* Menú horizontal compacto de secciones
        {/* <HeroMenu loaded={loaded} />  */}
      </div>
    </section>
  );
}