import { Property } from "@/data/properties";

const PropertySchemaMarkup = ({ property }: { property: Property }) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.fullDescription || property.description,
    url: `https://elrealtoremilio.lovable.app/property/${property.slug}`,
    ...(property.price && {
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "USD",
        availability: property.status === "Sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      },
    }),
    ...(property.location && {
      address: {
        "@type": "PostalAddress",
        addressLocality: property.location.split(",")[0]?.trim(),
        addressRegion: "TX",
        addressCountry: "US",
      },
    }),
    ...(property.sqft && { floorSize: { "@type": "QuantitativeValue", value: property.sqft, unitCode: "FTK" } }),
    ...(property.bedrooms && { numberOfBedrooms: property.bedrooms }),
    ...(property.bathrooms && { numberOfBathroomsTotal: parseFloat(property.bathrooms) }),
    ...(property.lotAcres && { lotSize: { "@type": "QuantitativeValue", value: property.lotAcres, unitCode: "ACR" } }),
    ...(property.yearBuilt && { dateCreated: String(property.yearBuilt) }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default PropertySchemaMarkup;
