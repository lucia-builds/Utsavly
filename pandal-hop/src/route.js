// Distance in metres between two points [lat, lng].
// (The "haversine" formula: it accounts for the Earth being round.)
export function distance(a, b) {
  const R = 6371000; // Earth's radius in metres
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Puts the pandals in visiting order, starting from `start`.
export function orderStops(start, pandals) {
  const left = [...pandals]; // pandals we haven't visited yet
  const ordered = [];        // the final order
  let current = start;       // where we are right now

  while (left.length > 0) {
    // Find the closest pandal to where we are
    let bestIndex = 0;
    for (let i = 1; i < left.length; i++) {
      const dNew = distance(current, [left[i].lat, left[i].lng]);
      const dBest = distance(current, [left[bestIndex].lat, left[bestIndex].lng]);
      if (dNew < dBest) bestIndex = i;
    }
    // Move it from "left" to "ordered", and walk there
    const next = left.splice(bestIndex, 1)[0];
    ordered.push(next);
    current = [next.lat, next.lng];
  }
  return ordered;
}
// Asks OSRM for a real walking route through all the points.
// points = [[lat, lng], [lat, lng], ...]
export async function getWalkingRoute(points) {
  // OSRM wants "lng,lat;lng,lat" (longitude FIRST, opposite of Leaflet!)
  const coords = points.map((p) => `${p[1]},${p[0]}`).join(";");
  const url = `https://routing.openstreetmap.de/routed-foot/route/v1/foot/${coords}?overview=full&geometries=geojson`;

  const res = await fetch(url);
  const data = await res.json();
  if (data.code !== "Ok") throw new Error(data.code);

  const route = data.routes[0];
  return {
    // flip [lng, lat] back to [lat, lng] so Leaflet can draw it
    line: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
    seconds: route.duration,
    metres: route.distance,
    // one entry per hop: start→stop1, stop1→stop2, ...
    legs: route.legs.map((l) => ({ seconds: l.duration, metres: l.distance })),
  };
}