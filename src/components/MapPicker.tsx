'use client';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Picker({ pos, setPos }: { pos: [number, number]; setPos: (p: [number, number]) => void }) {
  useMapEvents({ click(e) { setPos([e.latlng.lat, e.latlng.lng]); } });
  return <Marker position={pos} />;
}

export default function MapPicker({ pos, setPos }: { pos: [number, number]; setPos: (p: [number, number]) => void }) {
  return (
    <div className="h-64 rounded-xl overflow-hidden border border-slate-200">
      <MapContainer center={pos} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Picker pos={pos} setPos={setPos} />
      </MapContainer>
    </div>
  );
}
