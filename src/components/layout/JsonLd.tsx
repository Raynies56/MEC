/**
 * JSON-LD Structured Data for SEO
 * Schema: MedicalBusiness + Physician
 * This helps Google understand the site is a medical practice,
 * enabling rich search results (address, hours, reviews, etc.)
 */
export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Visión Plena — Dra. Valentina Reyes",
    description:
      "Centro oftalmológico especializado en glaucoma, cataratas y salud visual. Más de 12 años de experiencia.",
    url: "https://visionplena.com",
    telephone: "+18095551234",
    email: "info@visionplena.com",
    image: "https://visionplena.com/og-image.jpg",
    priceRange: "$$",
    medicalSpecialty: "Ophthalmology",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Abraham Lincoln, Torre Médica",
      addressLocality: "Santo Domingo",
      addressRegion: "Distrito Nacional",
      postalCode: "10100",
      addressCountry: "DO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.4861,
      longitude: -69.9312,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
    founder: {
      "@type": "Physician",
      name: "Dra. Valentina Reyes M.",
      medicalSpecialty: "Ophthalmology",
      description:
        "Cirujana oftalmóloga especialista en glaucoma y cataratas con más de 12 años de experiencia.",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Universidad Nacional",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios Oftalmológicos",
      itemListElement: [
        {
          "@type": "MedicalProcedure",
          name: "Consulta General Oftalmológica",
          procedureType: "https://schema.org/DiagnosticProcedure",
        },
        {
          "@type": "MedicalProcedure",
          name: "Cirugía de Cataratas",
          procedureType: "https://schema.org/SurgicalProcedure",
        },
        {
          "@type": "MedicalProcedure",
          name: "Diagnóstico de Glaucoma",
          procedureType: "https://schema.org/DiagnosticProcedure",
        },
        {
          "@type": "MedicalProcedure",
          name: "Examen Visual Completo",
          procedureType: "https://schema.org/DiagnosticProcedure",
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
