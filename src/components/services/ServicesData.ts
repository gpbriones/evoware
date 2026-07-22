import type { Step } from "../process/Process";

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  provider?: string;
  features?: string[];
  gallery?: string[];
  processSteps?: Step[];
};

export const services: Service[] = [
  {
    id: "impresion-3d",
    title: "Impresión 3D",
    description: "Convierto diseños en prototipos tridimensionales con precisión.",
    image: "https://images.pexels.com/photos/18296466/pexels-photo-18296466.jpeg",
    category: "Impresión 3D",
    provider: "Evoware",
    features: ["Alta precisión", "Material resistente", "Entrega rápida"],
    gallery: [
      "https://images.pexels.com/photos/18296466/pexels-photo-18296466.jpeg",
      "https://images.pexels.com/photos/237297/pexels-photo-237297.jpeg",
    ],
    processSteps: [
      {
        title: "Diagnóstico vía WhatsApp",
        description: "Envíanos archivos STL o fotos para evaluar tu diseño.",
        status: "active",
        whatsapp: true,
        icon: "🟢",
      },
      {
        title: "Evaluación Técnica",
        description: "Analizamos el diseño y la viabilidad de impresión.",
        status: "pending",
        icon: "🔧",
      },
      {
        title: "Propuesta y Aprobación",
        description: "Cotización y tiempos estimados.",
        status: "pending",
        icon: "📄",
      },
      {
        title: "Pago Retenido",
        description: "Pago seguro hasta la entrega del prototipo.",
        status: "pending",
        icon: "💰",
        escrow: true,
      },
      {
        title: "Ejecución del Servicio",
        description: "Impresión y revisión de calidad.",
        status: "pending",
        icon: "⚙️",
      },
      {
        title: "Liberación del Pago",
        description: "Pago liberado al proveedor tras entrega.",
        status: "pending",
        icon: "💸",
        escrow: true,
      },
      {
        title: "Entrega y Garantía",
        description: "Entrega final y soporte incluido.",
        status: "pending",
        icon: "🎁",
      },
    ],
  },

  /* otro negocio*/
  {
    id: "repComp",
    title: "Reparacion de computadoras",
    description: "Convierto diseños en prototipos tridimensionales con precisión.",
    image: "https://images.pexels.com/photos/18296466/pexels-photo-18296466.jpeg",
    category: "Impresión 3D",
    provider: "Evoware",
    features: ["Alta precisión", "Material resistente", "Entrega rápida"],
    gallery: [
      "https://images.pexels.com/photos/18296466/pexels-photo-18296466.jpeg",
      "https://images.pexels.com/photos/237297/pexels-photo-237297.jpeg",
    ],
    processSteps: [
      {
        title: "Diagnóstico vía WhatsApp",
        description: "Envíanos archivos STL o fotos para evaluar tu diseño.",
        status: "active",
        whatsapp: true,
        icon: "🟢",
      },
      {
        title: "Evaluación Técnica",
        description: "Analizamos el diseño y la viabilidad de impresión.",
        status: "pending",
        icon: "🔧",
      },
      {
        title: "Propuesta y Aprobación",
        description: "Cotización y tiempos estimados.",
        status: "pending",
        icon: "📄",
      },
      {
        title: "Pago Retenido",
        description: "Pago seguro hasta la entrega del prototipo.",
        status: "pending",
        icon: "💰",
        escrow: true,
      },
      {
        title: "Ejecución del Servicio",
        description: "Impresión y revisión de calidad.",
        status: "pending",
        icon: "⚙️",
      },
      {
        title: "Liberación del Pago",
        description: "Pago liberado al proveedor tras entrega.",
        status: "pending",
        icon: "💸",
        escrow: true,
      },
      {
        title: "Entrega y Garantía",
        description: "Entrega final y soporte incluido.",
        status: "pending",
        icon: "🎁",
      },
    ],
  },
];