import { MapContainer, TileLayer, CircleMarker, Circle, Polyline, Popup } from "react-leaflet";
import { zones } from "./zones";
import { pandals } from "./pandals";
import MyLocation from "./MyLocation";
import "leaflet/dist/leaflet.css";
import { useState,useEffect } from "react";
import StartPicker from "./StartPicker";
import { orderStops, getWalkingRoute } from "./route";
// Centre of Kolkata: [latitude, longitude]
const KOLKATA = [22.5726, 88.3639];

// Two sample pandals (coordinates are approximate for now

export default function App() {
    const [selected, setSelected] = useState([]);  // ids of the pandals you ticked
  const [start, setStart] = useState(null);      // [lat, lng] of your start point
  const [picking, setPicking] = useState(false); // true while waiting for a map click
  // The ticked pandals, in visiting order (empty until a start point is set)
  const stops = start ? orderStops(start, pandals.filter((p) => selected.includes(p.id))) : [];
    const [road, setRoad] = useState(null);     // the real walking route
  const [roadMsg, setRoadMsg] = useState(""); // status message for the panel
  const stopKey = stops.map((p) => p.id).join(","); // changes when the order changes

  // Runs every time the start point or the stop order changes
  useEffect(() => {
    if (!start || stops.length === 0) {
      setRoad(null);
      setRoadMsg("");
      return;
    }
    let cancelled = false; // ignore old answers if things changed meanwhile
    setRoadMsg("Finding walking route...");
    const points = [start, ...stops.map((p) => [p.lat, p.lng])];
    getWalkingRoute(points)
      .then((r) => { if (!cancelled) { setRoad(r); setRoadMsg(""); } })
      .catch(() => { if (!cancelled) { setRoad(null); setRoadMsg("Road route unavailable, showing straight lines"); } });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, stopKey]);
  // Tick or untick a pandal
  function toggle(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }
  return (

        <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000, background: "white", padding: 12, borderRadius: 8, width: 240, maxHeight: "80vh", overflowY: "auto", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
        <b>Plan your route</b>
        <p style={{ fontSize: 13 }}>Start: {start ? "set ✅" : "not set"}</p>
        <button onClick={() => setPicking(!picking)} style={{ marginBottom: 8 }}>
          {picking ? "Now click on the map..." : "📍 Set start point"}
        </button>
                  {stops.length > 0 && (
          <div style={{ fontSize: 14, marginBottom: 8 }}>
            <b>Visiting order:</b>
            <ol style={{ margin: "4px 0", paddingLeft: 20 }}>
              {stops.map((p, i) => (
                <li key={p.id}>
                  {p.name}
                                    {road && road.legs[i] && <small> ({Math.round(road.legs[i].seconds / 60)} min walk)</small>}
                </li>
              ))}
            </ol>
            {road && <div>Total: {(road.metres / 1000).toFixed(1)} km, about {Math.round(road.seconds / 60)} min walking</div>}
            {roadMsg && <div style={{ fontSize: 12 }}>{roadMsg}</div>}
          </div>
        )}
        <p style={{ fontSize: 13, margin: "4px 0" }}>Tick the pandals to visit:</p>
        {pandals.map((p) => (
          <label key={p.id} style={{ display: "block", fontSize: 14 }}>
            <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggle(p.id)} /> {p.name}
          </label>
        ))}
      </div>
    // The map needs a fixed height, or it will be invisible
    <MapContainer center={KOLKATA} zoom={13} style={{ height: "100vh" }}>
      {/* TileLayer = the actual map pictures from OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {/* Zones: big translucent blue circles (radius is in metres) */}
      {zones.map((z) => (
        <Circle key={z.id} interactive={!picking} center={[z.lat, z.lng]} radius={600} color="blue" weight={1}>
          <Popup>
            <b>{z.name}</b><br />
            {z.count} pujos · {z.group}
            {z.metro && <><br />Metro: {z.metro}</>}
          </Popup>
        </Circle>
      ))}
      {/* One circle per pandal. CircleMarker avoids the broken-icon issue Leaflet has with Vite */}
      {pandals.map((p) => (
        <CircleMarker key={p.name} center={[p.lat, p.lng]} radius={10} color="red" fillColor="red" fillOpacity={selected.includes(p.id) ? 0.9 : 0.1}>
          <Popup>{p.name}</Popup>
        </CircleMarker>
      ))}
            {/* Real road route (blue). If it fails, fall back to dashed straight lines. */}
      {road ? (
        <Polyline positions={road.line} color="blue" weight={4} />
      ) : (
        start && stops.length > 0 && (
          <Polyline positions={[start, ...stops.map((p) => [p.lat, p.lng])]} color="orange" weight={3} dashArray="8 8" />
        )
      )}
            <StartPicker active={picking} onPick={(pt) => { setStart(pt); setPicking(false); }} />
      {start && (
        <CircleMarker center={start} radius={10} color="white" weight={2} fillColor="orange" fillOpacity={1}>
          <Popup>Start point</Popup>
        </CircleMarker>
      )}
            <MyLocation />
    </MapContainer>
        </div>
  );
}