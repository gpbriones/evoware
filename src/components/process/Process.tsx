"use client";
import { useEffect, useRef, useState } from "react";

import "./process.css";

export type StepStatus = "completed" | "active" | "pending";

export type Step = {
  title: string;
  description: string;
  status: StepStatus;
  whatsapp?: boolean;
  icon?: string;
  escrow?: boolean;
};

type ProcessProps = {
  serviceSteps?: Step[];
};

// Pasos completos por defecto
const defaultSteps: Step[] = [
  {
    title: "Diagnóstico vía WhatsApp",
    description:
      "Envíanos fotos, archivos STL o detalles del servicio para una evaluación inmediata.",
    status: "active",
    whatsapp: true,
    icon: "🟢",
  },
  {
    title: "Evaluación Técnica",
    description: "Analizamos el proyecto o equipo y definimos la mejor solución.",
    status: "pending",
    icon: "🔧",
  },
  {
    title: "Propuesta y Aprobación",
    description:
      "Te enviamos cotización clara, tiempos estimados y alcance del trabajo.",
    status: "pending",
    icon: "📄",
  },
  {
    title: "Pago Retenido",
    description:
      "El cliente realiza el pago y nuestro sistema lo mantiene seguro mientras el servicio está en ejecución.",
    status: "pending",
    icon: "💰",
    escrow: true,
  },
  {
    title: "Ejecución del Servicio",
    description: "Realizamos el trabajo con precisión, calidad y seguimiento.",
    status: "pending",
    icon: "⚙️",
  },
  {
    title: "Liberación del Pago",
    description:
      "Al finalizar y validar el servicio, el pago se libera automáticamente al proveedor.",
    status: "pending",
    icon: "💸",
    escrow: true,
  },
  {
    title: "Entrega y Garantía",
    description: "Entrega final con pruebas realizadas y soporte incluido.",
    status: "pending",
    icon: "🎁",
  },
];

export default function Process({ serviceSteps }: ProcessProps) {
  const [steps, setSteps] = useState<Step[]>(serviceSteps || defaultSteps);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Detecta cuando la sección entra en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Avance automático del proceso
  useEffect(() => {
    if (!isVisible || paused) return;

    const interval = setInterval(() => {
      setSteps((prev) => {
        const currentIndex = prev.findIndex((s) => s.status === "active");
        let updated = [...prev];

        if (currentIndex === prev.length - 1) {
          // Reinicia el proceso al final
          updated = (serviceSteps || defaultSteps).map((s, idx) => ({
            ...s,
            status: idx === 0 ? "active" : "pending",
          }));
          setProgress(0);
          return updated;
        }

        // Avanza al siguiente paso
        updated[currentIndex].status = "completed";
        updated[currentIndex + 1].status = "active";
        setProgress(((currentIndex + 1) / (prev.length - 1)) * 100);

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, paused, serviceSteps]);

  return (
    <section
      id="process"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="process-section"
    >
       <h2>Nuestro proseso para transacciones seguras</h2>

      <div className="timeline-horizontal">
        <div className="timeline-line" />
        <div className="timeline-progress" style={{ width: `${progress}%` }} />

        {steps.map((step, index) => (
          <div key={index} className="timeline-step">
            <div
              className={`circle ${step.status} ${step.escrow ? "escrow" : ""}`}
            >
              {step.status === "completed" ? (step.escrow ? "💸" : "✓") : step.icon}
            </div>

            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>

              {step.whatsapp && (
                <a
                  href="https://wa.me/521XXXXXXXXXX?text=Hola,%20quiero%20solicitar%20un%20diagnóstico"
                  target="_blank"
                  className="whatsapp-btn"
                >
                  🟢 Iniciar Diagnóstico
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}