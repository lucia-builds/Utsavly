import { useEffect, useRef, useState } from "react";
import { CircleMarker, Polyline, Popup, useMap } from "react-leaflet";

export default function MyLocation() {
  const map = useMap();               // gives us control of the map
  const [pos, setPos] = useState(null); // your position: [lat, lng]
  const firstFix = useRef(true);      // so we only fly to you once
   const [trail, setTrail] = useState([]);  // list of positions you walked through
  const [metres, setMetres] = useState(0); // total distance walked
  const lastPoint = useRef(null);  

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("This browser has no GPS support");
      return;
    }

    // watchPosition runs again every time your position changes
    const watchId = navigator.geolocation.watchPosition(
      (p) => {
        const here = [p.coords.latitude, p.coords.longitude];
        setPos(here);
                // Only save a new trail point if you moved more than 10 metres
        const last = lastPoint.current;
        if (!last || map.distance(last, here) > 10) {
          if (last) setMetres((m) => m + map.distance(last, here)); // map.distance gives metres
          setTrail((t) => [...t, here]);
          lastPoint.current = here;
        }
        if (firstFix.current) {
          map.flyTo(here, 16);
          firstFix.current = false;
        }
      },
      (err) => console.error("GPS error:", err.message),
      { enableHighAccuracy: true }
    );

    // cleanup: stop tracking when this component disappears
    return () => navigator.geolocation.clearWatch(watchId);
  }, [map]);

  if (!pos) return null; // nothing to draw until we have a position

  return (
    <>
      {/* The trail line behind you */}
      <Polyline positions={trail} color="green" weight={4} />

      {/* The green dot at your current position */}
      <CircleMarker center={pos} radius={8} color="white" weight={2} fillColor="green" fillOpacity={1}>
        <Popup>You are here<br />Walked: {Math.round(metres)} m</Popup>
      </CircleMarker>
    </>
  );
}