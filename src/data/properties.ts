import propertyElgin from "@/assets/property-elgin.jpeg";
import propertyGreinertDr from "@/assets/property-greinert-dr.jpeg";
import propertySynergyDr from "@/assets/property-synergy-dr.jpeg";
import propertyMichaelLn from "@/assets/property-michael-ln.jpeg";
import propertyKailynneCt from "@/assets/property-kailynne-ct.jpeg";

// Pine Point additional photos
import pinePointHallway from "@/assets/pine-point/hallway.jpg";
import pinePointLivingRoom from "@/assets/pine-point/living-room.jpg";
import pinePointKitchen from "@/assets/pine-point/kitchen.jpg";
import pinePointKitchen2 from "@/assets/pine-point/kitchen-2.jpg";
import pinePointLaundry from "@/assets/pine-point/laundry.jpg";
import pinePointMasterBedroom from "@/assets/pine-point/master-bedroom.jpg";
import pinePointBathroom from "@/assets/pine-point/bathroom.jpg";
import pinePointWalkInCloset from "@/assets/pine-point/walk-in-closet.jpg";
import pinePointBedroom from "@/assets/pine-point/bedroom.jpg";
import pinePointBedroom2 from "@/assets/pine-point/bedroom-2.jpg";
import pinePointBathroom2 from "@/assets/pine-point/bathroom-2.jpg";
import pinePointBedroom3 from "@/assets/pine-point/bedroom-3.jpg";
import pinePointGarage from "@/assets/pine-point/garage.jpg";
import pinePointPorch from "@/assets/pine-point/porch.jpg";
import pinePointYard from "@/assets/pine-point/yard.jpg";
import pinePointYardSide from "@/assets/pine-point/yard-side.jpg";
import pinePointAerial from "@/assets/pine-point/aerial.jpg";
import pinePointAerial2 from "@/assets/pine-point/aerial-2.jpg";

export interface Property {
  id: number;
  slug: string;
  image: string;
  images: string[];
  title: string;
  description: string;
  fullDescription?: string;
  bedrooms: number | null;
  bathrooms: string | null;
  location?: string;
  size?: string;
  sqft?: number;
  lotAcres?: number;
  price?: number;
  pricePerAcre?: number;
  yearBuilt?: number;
  propertyType?: string;
  maintenanceFee?: string;
  status?: string;
  highlights?: string[];
  interior?: Record<string, string>;
  exterior?: Record<string, string>;
}

export const properties: Property[] = [
  {
    id: 1,
    slug: "116-pine-point-cv",
    image: propertyElgin,
    images: [
      propertyElgin,
      pinePointHallway,
      pinePointLivingRoom,
      pinePointKitchen,
      pinePointKitchen2,
      pinePointLaundry,
      pinePointMasterBedroom,
      pinePointBathroom,
      pinePointWalkInCloset,
      pinePointBedroom,
    ],
    title: "116 Pine Point Cv",
    description: "Stunning new construction home on a full 1-acre lot in a quiet gated community. Energy-efficient with spray foam insulation, modern finishes, and all appliances included.",
    fullDescription: "Stunning new construction home on a full 1-acre lot in a quiet gated community. This energy-efficient home features an open floor plan, high ceilings, modern finishes, and abundant natural light throughout. Built with spray foam insulation throughout the entire home and garage, providing excellent energy efficiency and year-round comfort. The insulated garage space can easily function as a home gym, game room, workshop, or additional flex space. The kitchen is fully equipped and all appliances are included, such as refrigerator, range, dishwasher, microwave, washer, and dryer, making this home completely move-in ready. Constructed with premium 30-year roof shingles and backed by foundation and structural warranties, offering peace of mind for years to come. The property also includes a brand-new septic system with 2 years of maintenance included. The spacious 1-acre property provides plenty of room for outdoor living, gardening, RV parking, future workshop, or additional improvements. The community features a gated entrance that closes at night, adding privacy and security while still being conveniently located near shopping, schools, and major highways. A rare opportunity to own a brand-new energy-efficient home on acreage with modern features, privacy, and space to grow. The Arbors At Dogwood Creek.",
    bedrooms: 4,
    bathrooms: "2",
    location: "Elgin, TX 78621",
    sqft: 1875,
    lotAcres: 1.05,
    price: 524700,
    pricePerAcre: 500668,
    yearBuilt: 2025,
    propertyType: "Residential Single Family",
    maintenanceFee: "$484 / Annually",
    status: "For Sale",
    highlights: [
      "New Construction 2025",
      "1-Acre Gated Community",
      "Spray Foam Insulation",
      "All Appliances Included",
      "30-Year Roof Shingles",
      "Septic System w/ 2yr Maintenance",
    ],
    interior: {
      "Living Areas": "1",
      "Dining Areas": "1",
      "Floors": "Carpet, Vinyl",
      "Cooling": "Ceiling Fan(s), Central Air, ENERGY STAR Qualified Equipment",
      "Heating": "Central, Electric",
      "Windows": "Double Pane Windows, Vinyl Windows",
      "Appliances": "Disposal, Electric Range, Microwave, Electric Oven, Refrigerator, Washer/Dryer",
      "Security": "Carbon Monoxide Detector(s), Security Lights, Security System, Smoke Detector(s)",
      "Interior Features": "Ceiling Fan(s), Counter-Quartz, Double Vanity, Electric Dryer Hookup, Kitchen Island, No Interior Steps, Open Floorplan, Pantry, Primary Bedroom on Main, Recessed Lighting, Smart Thermostat, Walk-In Closet(s)",
    },
    exterior: {
      "Roof": "Composition",
      "Foundation": "Slab",
      "Private Pool": "No",
      "Exterior Type": "Frame, HardiPlank Type, Stone Veneer, Stucco",
      "Lot Description": "Back Yard, Cul-De-Sac, Front Yard, Level, Trees-Moderate",
      "Parking": "Attached, Driveway, Garage Faces Front",
      "Parking Space": "Garage 2 / Parking 8",
      "Utility": "Electricity Connected, Water Connected",
      "Front Door Face": "East",
      "Exterior Features": "Lighting, Private Yard",
    },
  },
  {
    id: 2,
    slug: "104-greinert-dr",
    image: propertyGreinertDr,
    images: [propertyGreinertDr],
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
    slug: "3-9-acres-synergy-dr",
    image: propertySynergyDr,
    images: [propertySynergyDr],
    title: "3.9 Acres Synergy Dr",
    description: "Experience the allure of Texas countryside living with this remarkable 3.91-acre parcel nestled in the heart of Bastrop.",
    bedrooms: null,
    bathrooms: null,
    location: "Bastrop, TX",
    size: "3.91 acres",
    status: "For Sale",
    highlights: ["3.91 Acres", "Texas Countryside", "Heart of Bastrop", "Development Ready"],
  },
  {
    id: 4,
    slug: "105-michael-ln",
    image: propertyMichaelLn,
    images: [propertyMichaelLn],
    title: "105 Michael Ln",
    description: "105 Michael Ln (currently not for sale) is located in Frame Switch subdivision in Williamson County.",
    bedrooms: null,
    bathrooms: null,
    location: "Williamson County, TX",
    status: "Sold",
    highlights: ["Frame Switch Subdivision", "Williamson County"],
  },
  {
    id: 5,
    slug: "103-kailynne-ct",
    image: propertyKailynneCt,
    images: [propertyKailynneCt],
    title: "103 Kailynne Ct",
    description: "103 Kailynne Ct (currently not for sale) is located in Country Meadows Estates subdivision in Milam County.",
    bedrooms: null,
    bathrooms: null,
    location: "Milam County, TX",
    status: "Sold",
    highlights: ["Country Meadows Estates", "Milam County"],
  },
];

export const getPropertyBySlug = (slug: string) => properties.find((p) => p.slug === slug);
