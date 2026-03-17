import huttoImg from "@/assets/neighborhoods/hutto.jpg";
import roundRockImg from "@/assets/neighborhoods/round-rock.jpg";
import pflugervilleImg from "@/assets/neighborhoods/pflugerville.jpg";
import taylorImg from "@/assets/neighborhoods/taylor.jpg";

export interface School {
  name: string;
  type: string;
  rating: string;
}

export interface Neighborhood {
  slug: string;
  name: string;
  city: string;
  heroImage: string;
  medianPrice: number;
  population: string;
  growth: string;
  daysOnMarket: number;
  schools: School[];
  highlights: string[];
}

export const neighborhoods: Neighborhood[] = [
  {
    slug: "hutto",
    name: "Hutto",
    city: "Hutto",
    heroImage: huttoImg,
    medianPrice: 350000,
    population: "~45,000",
    growth: "+12.5%",
    daysOnMarket: 42,
    schools: [
      { name: "Hutto ISD", type: "Public District", rating: "B+" },
      { name: "Nadine Johnson Elementary", type: "Elementary", rating: "A-" },
      { name: "Hutto Middle School", type: "Middle", rating: "B+" },
      { name: "Hutto High School", type: "High School", rating: "B" },
    ],
    highlights: [
      "highlights.hutto.samsung",
      "highlights.hutto.family",
      "highlights.hutto.affordable",
      "highlights.hutto.growth",
    ],
  },
  {
    slug: "round-rock",
    name: "Round Rock",
    city: "Round Rock",
    heroImage: roundRockImg,
    medianPrice: 425000,
    population: "~130,000",
    growth: "+8.2%",
    daysOnMarket: 35,
    schools: [
      { name: "Round Rock ISD", type: "Public District", rating: "A" },
      { name: "Westwood High School", type: "High School", rating: "A+" },
      { name: "McNeil High School", type: "High School", rating: "A" },
      { name: "Round Rock High School", type: "High School", rating: "A-" },
    ],
    highlights: [
      "highlights.roundRock.dell",
      "highlights.roundRock.schools",
      "highlights.roundRock.entertainment",
      "highlights.roundRock.healthcare",
    ],
  },
  {
    slug: "pflugerville",
    name: "Pflugerville",
    city: "Pflugerville",
    heroImage: pflugervilleImg,
    medianPrice: 400000,
    population: "~75,000",
    growth: "+10.1%",
    daysOnMarket: 38,
    schools: [
      { name: "Pflugerville ISD", type: "Public District", rating: "A-" },
      { name: "Hendrickson High School", type: "High School", rating: "A" },
      { name: "Connally High School", type: "High School", rating: "B+" },
      { name: "Weiss High School", type: "High School", rating: "B+" },
    ],
    highlights: [
      "highlights.pflugerville.lake",
      "highlights.pflugerville.tech",
      "highlights.pflugerville.diverse",
      "highlights.pflugerville.parks",
    ],
  },
  {
    slug: "taylor",
    name: "Taylor",
    city: "Taylor",
    heroImage: taylorImg,
    medianPrice: 320000,
    population: "~20,000",
    growth: "+15.3%",
    daysOnMarket: 45,
    schools: [
      { name: "Taylor ISD", type: "Public District", rating: "B+" },
      { name: "Taylor High School", type: "High School", rating: "B+" },
      { name: "T.H. Johnson Elementary", type: "Elementary", rating: "A-" },
      { name: "Taylor Middle School", type: "Middle", rating: "B" },
    ],
    highlights: [
      "highlights.taylor.samsung",
      "highlights.taylor.downtown",
      "highlights.taylor.affordable",
      "highlights.taylor.growth",
    ],
  },
];
