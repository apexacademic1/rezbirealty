/* ============================================================================
   REZBIREALTY — LISTINGS
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE YOUR LISTINGS.

   HOW TO ADD / CHANGE / REMOVE A LISTING
   --------------------------------------
   - Each listing is one block inside { ... } separated by a comma.
   - Copy an existing block, paste it, and change the values.
   - Keep the quotes "" around text. Numbers (price, beds, sqft) have no quotes.
   - "id" must be UNIQUE for every listing (no two the same).
   - When you're done, save the file and push to GitHub. That's it.

   FIELD GUIDE
   -----------
   id          A unique short code, e.g. "r-101". Never reuse one.
   type        "rental"  OR  "sale"   (this decides which page it shows on)
   status      "available" or "in-contract" or "rented"  (hidden if not available)
   title       The headline, e.g. "Sunlit 1-Bed in the West Village"
   neighborhood One of the names in NEIGHBORHOODS below (spelling must match)
   borough     "Manhattan" / "Brooklyn" / "Queens" / "Bronx" / "Staten Island"
   address     Street line shown on the detail page (kept general for privacy)
   price       Number only. Rentals = monthly rent. Sales = full price.
   beds        Number. Use 0 for a studio.
   baths       Number. You can use 1.5, 2, etc.
   sqft        Number (square feet). Use null if unknown.
   noFee       true or false  (rentals only — "true" = no broker fee)
   doorman     true or false
   pets        "Yes" / "Cats only" / "No" / "Case by case"
   amenities   A list of strings. Add or remove freely.
   lat, lng    Map coordinates. Find them at https://www.latlong.net (search the
               building, copy the two numbers). Roughly right is fine.
   photos      A list of image file names you put in /images/listings/.
               Example: ["r-101-1.jpg", "r-101-2.jpg"]. Leave [] to show a
               clean placeholder until you upload photos.
   floorPlan   A file name in /images/listings/ or "" if none.
   tourUrl     A link to a Matterport / YouTube virtual tour, or "" if none.
   available   Move-in or closing date text, e.g. "Available Aug 1".
   summary     1–3 sentences describing the home.
   ============================================================================ */

// The neighborhoods that appear in the filter dropdown.
// Add a new one here if you list somewhere new (must match the listing spelling).
const NEIGHBORHOODS = [
  "West Village", "East Village", "SoHo", "Tribeca", "Chelsea",
  "Upper East Side", "Upper West Side", "Harlem", "Financial District",
  "Williamsburg", "Greenpoint", "Brooklyn Heights", "Park Slope",
  "Long Island City", "Astoria"
];

const LISTINGS = [
  /* ----------------------------- RENTALS ----------------------------- */
  {
    id: "r-101", type: "rental", status: "available",
    title: "Sunlit 1-Bed Off Bleecker",
    neighborhood: "West Village", borough: "Manhattan",
    address: "Bank St & W 4th St",
    price: 4200, beds: 1, baths: 1, sqft: 680,
    noFee: true, doorman: false, pets: "Cats only",
    amenities: ["Dishwasher", "Hardwood floors", "In-unit laundry", "Pre-war details", "Exposed brick"],
    lat: 40.7351, lng: -74.0036,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Available Aug 1",
    summary: "A quiet south-facing one-bedroom on a classic West Village block. Pre-war proportions, real light, steps from the 1 train."
  },
  {
    id: "r-102", type: "rental", status: "available",
    title: "Doorman Studio, Park Views",
    neighborhood: "Upper West Side", borough: "Manhattan",
    address: "Central Park West & W 86th St",
    price: 3100, beds: 0, baths: 1, sqft: 480,
    noFee: false, doorman: true, pets: "Yes",
    amenities: ["24-hr doorman", "Elevator", "Laundry in building", "Fitness center", "Live-in super"],
    lat: 40.7869, lng: -73.9712,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Available now",
    summary: "Full-service building one block from Central Park. Ideal first apartment with a doorman, gym, and easy B/C access."
  },
  {
    id: "r-103", type: "rental", status: "available",
    title: "Loft-Style 2-Bed in DUMBO-adjacent Williamsburg",
    neighborhood: "Williamsburg", borough: "Brooklyn",
    address: "Kent Ave & N 5th St",
    price: 5400, beds: 2, baths: 2, sqft: 1050,
    noFee: true, doorman: true, pets: "Yes",
    amenities: ["Floor-to-ceiling windows", "In-unit laundry", "Roof deck", "Doorman", "Bike room"],
    lat: 40.7212, lng: -73.9610,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Available Sep 1",
    summary: "Bright corner two-bedroom with skyline views and a shared roof deck. No fee, perfect for a pair of roommates or a couple."
  },
  {
    id: "r-104", type: "rental", status: "available",
    title: "Cozy Studio in the East Village",
    neighborhood: "East Village", borough: "Manhattan",
    address: "E 7th St & Avenue A",
    price: 2650, beds: 0, baths: 1, sqft: 420,
    noFee: false, doorman: false, pets: "Case by case",
    amenities: ["Hardwood floors", "Exposed brick", "Laundromat next door"],
    lat: 40.7259, lng: -73.9815,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Available Aug 15",
    summary: "A characterful walk-up studio in the heart of the East Village — Tompkins Square Park, cafes, and the L train all close by."
  },
  {
    id: "r-105", type: "rental", status: "available",
    title: "Bright 1-Bed in Long Island City",
    neighborhood: "Long Island City", borough: "Queens",
    address: "Jackson Ave & 11th St",
    price: 3450, beds: 1, baths: 1, sqft: 720,
    noFee: true, doorman: true, pets: "Yes",
    amenities: ["Floor-to-ceiling windows", "In-unit laundry", "Doorman", "Gym", "Pool", "Roof deck"],
    lat: 40.7470, lng: -73.9490,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Available now",
    summary: "Amenity-rich new construction one stop from Midtown on the 7/E/M. No fee, with a pool and skyline roof deck."
  },
  {
    id: "r-106", type: "rental", status: "available",
    title: "Classic 2-Bed in Park Slope",
    neighborhood: "Park Slope", borough: "Brooklyn",
    address: "7th Ave & 9th St",
    price: 4100, beds: 2, baths: 1, sqft: 900,
    noFee: false, doorman: false, pets: "Yes",
    amenities: ["Pre-war details", "Dishwasher", "Backyard access", "Hardwood floors"],
    lat: 40.6680, lng: -73.9830,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Available Sep 1",
    summary: "A warm brownstone two-bedroom near Prospect Park, with original moldings and access to a shared backyard."
  },
  {
    id: "r-107", type: "rental", status: "available",
    title: "Modern Studio in Chelsea",
    neighborhood: "Chelsea", borough: "Manhattan",
    address: "W 23rd St & 8th Ave",
    price: 3300, beds: 0, baths: 1, sqft: 510,
    noFee: true, doorman: true, pets: "Cats only",
    amenities: ["Doorman", "Elevator", "Laundry in building", "Stainless appliances"],
    lat: 40.7448, lng: -73.9995,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Available Aug 1",
    summary: "A sharp, low-maintenance studio near the High Line and the C/E. No fee and a doorman — a clean first move into Manhattan."
  },
  {
    id: "r-108", type: "rental", status: "available",
    title: "Spacious 3-Bed in Astoria",
    neighborhood: "Astoria", borough: "Queens",
    address: "31st St & Ditmars Blvd",
    price: 3900, beds: 3, baths: 1.5, sqft: 1150,
    noFee: true, doorman: false, pets: "Yes",
    amenities: ["Dishwasher", "Laundry in building", "Hardwood floors", "Near N/W train"],
    lat: 40.7757, lng: -73.9120,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Available now",
    summary: "Roommate-friendly three-bedroom in a friendly, food-filled neighborhood. No fee and great value per bedroom."
  },

  /* ------------------------------ SALES ------------------------------ */
  {
    id: "s-201", type: "sale", status: "available",
    title: "Renovated 1-Bed Co-op in Brooklyn Heights",
    neighborhood: "Brooklyn Heights", borough: "Brooklyn",
    address: "Henry St & Clark St",
    price: 749000, beds: 1, baths: 1, sqft: 700,
    noFee: false, doorman: true, pets: "Cats only",
    amenities: ["Doorman", "Elevator", "Laundry in building", "Renovated kitchen", "Storage"],
    lat: 40.6960, lng: -73.9950,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Move-in ready",
    summary: "A turnkey one-bedroom in a well-run co-op steps from the Promenade. Low maintenance and a strong building for first-time buyers."
  },
  {
    id: "s-202", type: "sale", status: "available",
    title: "Loft Condo in Tribeca",
    neighborhood: "Tribeca", borough: "Manhattan",
    address: "Franklin St & Church St",
    price: 2150000, beds: 2, baths: 2, sqft: 1480,
    noFee: false, doorman: true, pets: "Yes",
    amenities: ["Doorman", "Cast-iron details", "In-unit laundry", "Oversized windows", "Elevator"],
    lat: 40.7190, lng: -74.0070,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Available now",
    summary: "A true Tribeca loft with soaring ceilings and architectural windows, in a landmark cast-iron building."
  },
  {
    id: "s-203", type: "sale", status: "available",
    title: "Studio Condo in the Financial District",
    neighborhood: "Financial District", borough: "Manhattan",
    address: "Wall St & Water St",
    price: 565000, beds: 0, baths: 1, sqft: 540,
    noFee: false, doorman: true, pets: "Yes",
    amenities: ["Doorman", "Gym", "Roof deck", "Elevator", "In-unit laundry"],
    lat: 40.7050, lng: -74.0090,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Move-in ready",
    summary: "An efficient, full-service studio condo — a smart entry purchase with strong amenities and major transit at the door."
  },
  {
    id: "s-204", type: "sale", status: "available",
    title: "Pre-War 2-Bed Co-op on the Upper East Side",
    neighborhood: "Upper East Side", borough: "Manhattan",
    address: "E 79th St & Lexington Ave",
    price: 1195000, beds: 2, baths: 2, sqft: 1100,
    noFee: false, doorman: true, pets: "Case by case",
    amenities: ["Full-time doorman", "Pre-war details", "Elevator", "Live-in super", "Storage"],
    lat: 40.7740, lng: -73.9590,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Available now",
    summary: "Classic pre-war proportions with two real bedrooms near the Met and the Q train. A timeless, well-run co-op."
  },
  {
    id: "s-205", type: "sale", status: "available",
    title: "Bright 1-Bed Condo in Long Island City",
    neighborhood: "Long Island City", borough: "Queens",
    address: "Center Blvd & 47th Ave",
    price: 825000, beds: 1, baths: 1, sqft: 760,
    noFee: false, doorman: true, pets: "Yes",
    amenities: ["Doorman", "Pool", "Gym", "Waterfront park", "In-unit laundry", "Roof deck"],
    lat: 40.7430, lng: -73.9580,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Available now",
    summary: "Waterfront condo living with Manhattan views, resort-style amenities, and a quick commute on the 7."
  },
  {
    id: "s-206", type: "sale", status: "available",
    title: "Garden Townhouse Floor in Harlem",
    neighborhood: "Harlem", borough: "Manhattan",
    address: "W 122nd St & Lenox Ave",
    price: 685000, beds: 2, baths: 1, sqft: 980,
    noFee: false, doorman: false, pets: "Yes",
    amenities: ["Private garden", "Original details", "Renovated kitchen", "Hardwood floors"],
    lat: 40.8050, lng: -73.9460,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Move-in ready",
    summary: "A charming garden-level home with private outdoor space on a beautiful Harlem brownstone block."
  },
  {
    id: "s-207", type: "sale", status: "available",
    title: "SoHo Studio Loft",
    neighborhood: "SoHo", borough: "Manhattan",
    address: "Grand St & Wooster St",
    price: 915000, beds: 0, baths: 1, sqft: 650,
    noFee: false, doorman: false, pets: "Cats only",
    amenities: ["Cast-iron building", "High ceilings", "Oversized windows", "Keyed elevator"],
    lat: 40.7220, lng: -74.0020,
    photos: [], floorPlan: "", tourUrl: "",
    available: "Available now",
    summary: "An artist-style loft studio in the heart of SoHo with dramatic ceiling height and classic cast-iron character."
  }
];

// Makes the data available to the rest of the site. Do not edit below this line.
if (typeof window !== "undefined") {
  window.LISTINGS = LISTINGS;
  window.NEIGHBORHOODS = NEIGHBORHOODS;
}
