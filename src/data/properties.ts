import propertyElgin from "@/assets/property-elgin.jpeg";
import propertyGreinertDr from "@/assets/property-greinert-dr.jpeg";
import propertySynergyDr from "@/assets/property-synergy-dr.jpeg";
import propertyMichaelLn from "@/assets/property-michael-ln.jpeg";
import propertyKailynneCt from "@/assets/property-kailynne-ct.jpeg";

export interface Property {
  id: number;
  image: string;
  title: string;
  description: string;
  bedrooms: number | null;
  bathrooms: string | null;
  location?: string;
  size?: string;
  status?: string;
  highlights?: string[];
}

export const properties: Property[] = [
  {
    id: 1,
    image: propertyElgin,
    title: "116 Pine Point Cv",
    description: "Beautiful stone and wood home with 10k Flex Cash incentive. Features elegant craftsmanship, spacious garage, and a lush green yard in a peaceful setting.",
    bedrooms: 4,
    bathrooms: "2",
    location: "Elgin, TX",
    status: "Available",
    highlights: ["10k Flex Cash Incentive", "Stone & Wood Construction", "Spacious Garage", "Lush Green Yard"],
  },
  {
    id: 2,
    image: propertyGreinertDr,
    title: "104 Greinert Dr",
    description: "Brand-new home for rent! Located just 2 minutes from Walmart and H-E-B, less than 10 minutes from the Samsung plant in Taylor, and under 3 minutes from the elementary and middle school.",
    bedrooms: 3,
    bathrooms: "2.5",
    location: "Taylor, TX",
    status: "For Rent",
    highlights: ["Brand New Construction", "2 min from Walmart & H-E-B", "Near Samsung Plant", "Close to Schools"],
  },
  {
    id: 3,
    image: propertySynergyDr,
    title: "3.9 Acres Synergy Dr",
    description: "Experience the allure of Texas countryside living with this remarkable 3.91-acre parcel nestled in the heart of Bastrop.",
    bedrooms: null,
    bathrooms: null,
    location: "Bastrop, TX",
    size: "3.91 acres",
    status: "Available",
    highlights: ["3.91 Acres", "Texas Countryside", "Heart of Bastrop", "Development Ready"],
  },
  {
    id: 4,
    image: propertyMichaelLn,
    title: "105 Michael Ln",
    description: "105 Michael Ln (currently not for sale) is located in Frame Switch subdivision in Williamson County.",
    bedrooms: null,
    bathrooms: null,
    location: "Williamson County, TX",
    status: "Not For Sale",
    highlights: ["Frame Switch Subdivision", "Williamson County"],
  },
  {
    id: 5,
    image: propertyKailynneCt,
    title: "103 Kailynne Ct",
    description: "103 Kailynne Ct (currently not for sale) is located in Country Meadows Estates subdivision in Milam County.",
    bedrooms: null,
    bathrooms: null,
    location: "Milam County, TX",
    status: "Not For Sale",
    highlights: ["Country Meadows Estates", "Milam County"],
  },
];
