'use client';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Marker = { id: string; lat: number; lng: number; title: string; severity: string; affected?: string };

export default function MapView({ markers, center = [31.5204, 74.3587], zoom = 11, height = '100%' }: { markers: Marker[]; center?: [number, number]; zoom?: number; height?: string }) {
  return (
    <div style={{ height }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
        {markers.map(m => (
          <CircleMarker key={m.id} center={[m.lat, m.lng]} radius={14}
            pathOptions={{ color: m.severity === 'HIGH' ? '#DC2626' : m.severity === 'MEDIUM' ? '#F59E0B' : '#15966B', fillOpacity: 0.35 }}>
            <Popup>
              <div className="text-sm">
                <div className="font-bold">{m.title}</div>
                {m.affected && <div className="text-xs text-gray-600 mt-1">Affected: {m.affected}</div>}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
