

## Plan: Neighborhood Pages with Placeholder Images

### New Files

1. **`src/data/neighborhoods.ts`** — Data for Hutto, Round Rock, Pflugerville, Taylor. Each entry: slug, name, city, heroImage (using Unsplash placeholder URLs), lifestyle description (i18n keys), market stats (median price, population, growth), schools array, highlights. Properties will be filtered by matching city in `property.location`.

2. **`src/pages/Neighborhoods.tsx`** — Grid of 4 neighborhood cards linking to `/neighborhoods/:slug`. Each card shows placeholder hero image, name, median price, and a brief tagline.

3. **`src/pages/NeighborhoodDetail.tsx`** — Dynamic page with:
   - Hero banner (placeholder image + neighborhood name overlay)
   - Lifestyle description section
   - Market data grid (median price, population, days on market, YoY growth)
   - Schools table (name, type, rating)
   - Active listings section (filtered from existing `properties` by city match)
   - CTA to contact Emilio

### Modified Files

4. **`src/App.tsx`** — Add routes `/neighborhoods` and `/neighborhoods/:slug`

5. **`src/components/Navbar.tsx`** — Add "Neighborhoods" nav link

6. **`src/i18n/en.ts`** and **`src/i18n/es.ts`** — Add neighborhood translation keys (navbar label, page titles, section headers, all 4 neighborhood descriptions)

### Placeholder Images
Will use high-quality Unsplash URLs for each neighborhood hero (Texas suburban/aerial shots). These can be swapped later with real photos by updating `src/data/neighborhoods.ts`.

### Market Data (Hardcoded)

| Area | Median Price | Population | Highlights |
|------|-------------|------------|------------|
| Hutto | ~$350K | ~45K | Samsung nearby, family-friendly |
| Round Rock | ~$425K | ~130K | Dell HQ, top schools |
| Pflugerville | ~$400K | ~75K | Lake Pflugerville, tech corridor |
| Taylor | ~$320K | ~20K | Historic downtown, Samsung campus |

