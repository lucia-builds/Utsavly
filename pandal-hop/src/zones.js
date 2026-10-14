// Approximate centre of each zone (accuracy is roughly 500 m, fine for now).
// "count" = number of pujos listed in that zone.
// "metro" = a hint taken from the directory text; we'll add real stations in Step 8.
export const zones = [
  // North Kolkata (Blue Line nearby)
  { id: "bagbazar", name: "Bagbazar & Shyambazar", group: "North", count: 8, lat: 22.6030, lng: 88.3690, metro: "Blue Line" },
  { id: "kumartuli", name: "Kumartuli, Ahiritola & Sovabazar", group: "North", count: 8, lat: 22.6010, lng: 88.3630, metro: "Blue Line" },
  { id: "jorabagan", name: "Jorabagan & Pathuriaghata", group: "North", count: 5, lat: 22.5850, lng: 88.3580, metro: "Blue Line" },
  { id: "hatibagan", name: "Hatibagan & Beadon St", group: "North", count: 20, lat: 22.5950, lng: 88.3670, metro: "Blue Line" },
  { id: "manicktala", name: "Manicktala & Ultadanga", group: "North", count: 11, lat: 22.5900, lng: 88.3900, metro: "" },
  { id: "tala", name: "Tala, Belgachia & Dakshineswar", group: "North", count: 10, lat: 22.6150, lng: 88.3800, metro: "Blue Line" },
  { id: "dumdum", name: "Dum Dum & Lake Town", group: "North", count: 16, lat: 22.6100, lng: 88.3960, metro: "Blue Line" },
  { id: "college", name: "College St & Sealdah", group: "North", count: 8, lat: 22.5700, lng: 88.3650, metro: "" },
  { id: "beliaghata", name: "Beliaghata & Kankurgachi", group: "North", count: 5, lat: 22.5650, lng: 88.3930, metro: "" },

  // South Kolkata (biggest crowds, longest queues)
  { id: "bhowanipore", name: "Bhowanipore & Hazra", group: "South", count: 16, lat: 22.5340, lng: 88.3470, metro: "" },
  { id: "ballygunge", name: "Ballygunge & Park Circus", group: "South", count: 5, lat: 22.5300, lng: 88.3650, metro: "" },
  { id: "kalighat", name: "Kalighat & Rashbehari", group: "South", count: 22, lat: 22.5190, lng: 88.3470, metro: "" },
  { id: "gariahat", name: "Gariahat & Dhakuria", group: "South", count: 18, lat: 22.5110, lng: 88.3690, metro: "" },
  { id: "tollygunge", name: "Tollygunge & New Alipore", group: "South", count: 13, lat: 22.5000, lng: 88.3380, metro: "" },
  { id: "garia", name: "Garia, Naktala & Netaji Nagar", group: "South", count: 10, lat: 22.4650, lng: 88.3800, metro: "" },
  { id: "kasba", name: "Kasba & Santoshpur", group: "South", count: 15, lat: 22.5000, lng: 88.3920, metro: "" },
  { id: "behala", name: "Behala & Barisha", group: "South", count: 37, lat: 22.4900, lng: 88.3200, metro: "" },
  { id: "khidirpur", name: "Khidirpur", group: "South", count: 4, lat: 22.5400, lng: 88.3250, metro: "" },

  // Salt Lake (Green Line)
  { id: "sl1", name: "Salt Lake Sector I", group: "Salt Lake", count: 21, lat: 22.5870, lng: 88.4080, metro: "Green Line" },
  { id: "sl2", name: "Salt Lake Sector II", group: "Salt Lake", count: 13, lat: 22.5770, lng: 88.4130, metro: "Green Line" },
  { id: "sl3", name: "Salt Lake Sector III", group: "Salt Lake", count: 11, lat: 22.5780, lng: 88.4050, metro: "Green Line" },
  { id: "newtown", name: "New Town & Baguiati", group: "Salt Lake", count: 4, lat: 22.5900, lng: 88.4500, metro: "Green Line" },

  // Howrah (across the river: ferry or local train)
  { id: "belur", name: "Howrah: Belur & Bally", group: "Howrah", count: 2, lat: 22.6320, lng: 88.3530, metro: "" },
  { id: "shibpur", name: "Howrah: Shibpur & Andul", group: "Howrah", count: 5, lat: 22.5750, lng: 88.2950, metro: "" },
];