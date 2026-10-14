import { useMapEvents } from "react-leaflet";

// Listens for map clicks. Only does something while "active" is true.
export default function StartPicker({ active, onPick }) {
  useMapEvents({
    click(e) {
      if (active) onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null; // draws nothing, it only listens
}