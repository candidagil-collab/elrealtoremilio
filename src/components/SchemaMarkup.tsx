interface SchemaMarkupProps {
  type: "RealEstateAgent" | "Person" | "FAQPage";
  data?: Record<string, unknown>;
}

const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Emilio Sanchez Real Estate",
  url: "https://elrealtoremilio.lovable.app",
  telephone: "+1-305-490-2669",
  email: "elrealtoremilio@gmail.com",
  areaServed: {
    "@type": "Place",
    name: "Austin Metropolitan Area, Texas",
  },
  knowsLanguage: ["English", "Spanish"],
  description: "Licensed Real Estate Agent based in the Austin, TX area. Specializing in helping first-time buyers, families, and investors make smart real estate decisions.",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressRegion: "TX",
    addressCountry: "US",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Emilio Sanchez",
  jobTitle: "Licensed Real Estate Agent",
  url: "https://elrealtoremilio.lovable.app/about",
  telephone: "+1-305-490-2669",
  email: "elrealtoremilio@gmail.com",
  knowsLanguage: ["English", "Spanish"],
  worksFor: {
    "@type": "RealEstateAgent",
    name: "Emilio Sanchez Real Estate",
  },
  areaServed: "Austin, TX",
};

const SchemaMarkup = ({ type, data }: SchemaMarkupProps) => {
  let schema: Record<string, unknown>;

  switch (type) {
    case "RealEstateAgent":
      schema = realEstateAgentSchema;
      break;
    case "Person":
      schema = personSchema;
      break;
    case "FAQPage":
      schema = data || {};
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaMarkup;
