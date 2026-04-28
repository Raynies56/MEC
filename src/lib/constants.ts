import { Eye, Stethoscope, Glasses, Activity, Microscope, Clock, ShieldAlert } from "lucide-react";

export const SERVICES = [
  {
    id: "consulta-general",
    title: "Consulta General Oftalmológica",
    description: "Evaluación integral de tu salud visual y ocular para prevenir y tratar afecciones.",
    icon: Stethoscope,
  },
  {
    id: "examen-visual",
    title: "Examen Visual Completo",
    description: "Medición exhaustiva de la agudeza visual, presión intraocular y fondo de ojo.",
    icon: Eye,
  },
  {
    id: "lentes",
    title: "Evaluación y Receta de Lentes",
    description: "Diagnóstico de miopía, astigmatismo, hipermetropía y presbicia con prescripción exacta.",
    icon: Glasses,
  },
  {
    id: "glaucoma",
    title: "Diagnóstico de Glaucoma",
    description: "Detección temprana y control de la presión intraocular para prevenir pérdida de visión.",
    icon: Activity,
  },
  {
    id: "cataratas",
    title: "Revisión de Cataratas",
    description: "Evaluación del cristalino y planificación quirúrgica con tecnología avanzada.",
    icon: Microscope,
  },
  {
    id: "urgencias",
    title: "Urgencias Oculares",
    description: "Atención prioritaria para infecciones, traumatismos oculares y dolor súbito.",
    icon: ShieldAlert,
  }
];

export const FAQS = [
  {
    question: "¿Con qué frecuencia debo hacerme un examen visual?",
    answer: "Se recomienda un examen oftalmológico completo al menos una vez al año para adultos, y cada 6 meses si existen condiciones preexistentes como diabetes, hipertensión o antecedentes familiares de glaucoma.",
  },
  {
    question: "¿Cómo sé si necesito lentes?",
    answer: "Los síntomas comunes incluyen visión borrosa, dolores de cabeza frecuentes, fatiga visual, necesidad de entrecerrar los ojos para enfocar y dificultad para ver de noche. Una evaluación determinará tu prescripción exacta.",
  },
  {
    question: "¿A qué edad debo llevar a mi hijo al oftalmólogo?",
    answer: "Es vital un primer examen a los 6 meses de edad, luego a los 3 años, y posteriormente antes de iniciar la etapa preescolar (5-6 años).",
  },
  {
    question: "¿Qué es el glaucoma?",
    answer: "Es una enfermedad del nervio óptico que a menudo se asocia con un aumento en la presión intraocular. Es conocida como el 'ladrón silencioso de la visión' porque usualmente no presenta síntomas hasta etapas avanzadas.",
  },
  {
    question: "¿Qué seguros médicos aceptan?",
    answer: "Trabajamos con las principales aseguradoras: ARS Humano, ARS Universal, Senasa, Mapfre BHD, Primera ARS, entre otras. Te sugerimos contactarnos con tu carnet a mano para verificar cobertura específica.",
  },
  {
    question: "¿Atienden emergencias?",
    answer: "Sí, priorizamos las emergencias oculares como dolor intenso, pérdida súbita de visión o traumas. Por favor contáctanos vía WhatsApp para instrucción inmediata.",
  }
];

export const INSURANCES = [
  "ARS Humano",
  "ARS Universal",
  "Senasa",
  "Mapfre BHD",
  "Primera ARS de Humano",
  "Monumental",
  "Banreservas",
];

