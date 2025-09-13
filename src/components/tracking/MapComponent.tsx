import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
  name: string;
  status?: string;
  time?: string;
}

interface MapComponentProps {
  currentLocation: Location;
  trackingHistory?: Location[];
  className?: string;
}

export default function MapComponent({ 
  currentLocation, 
  trackingHistory = [],
  className = "h-64 w-full rounded-lg"
}: MapComponentProps) {
  const mapRef = useRef<L.Map>(null);

  // I will upload the icon soon
  const currentLocationIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'current-location-marker'
  });

  const historyLocationIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 12.5 41 12.5 41S25 19.4 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="#6B7280"/>
        <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      </svg>
    `),
    iconSize: [20, 32],
    iconAnchor: [10, 32],
    popupAnchor: [0, -32],
  });

  const pathCoordinates = trackingHistory.map(location => [location.lat, location.lng] as [number, number]);
  if (pathCoordinates.length > 0) {
    pathCoordinates.push([currentLocation.lat, currentLocation.lng]);
  }

  useEffect(() => {
    if (mapRef.current && trackingHistory.length > 0) {
      const allCoords = [...trackingHistory, currentLocation];
      const bounds = L.latLngBounds(allCoords.map(coord => [coord.lat, coord.lng]));
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [currentLocation, trackingHistory]);

  return (
    <div className={className}>
      <MapContainer
        center={[currentLocation.lat, currentLocation.lng]}
        zoom={13}
        className="h-full w-full rounded-lg"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Current location marker */}
        <Marker position={[currentLocation.lat, currentLocation.lng]} icon={currentLocationIcon}>
          <Popup>
            <div className="text-sm">
              <strong className="text-green-600">Current Location</strong>
              <br />
              {currentLocation.name}
            </div>
          </Popup>
        </Marker>

        {/* History markers */}
        {trackingHistory.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={historyLocationIcon}
          >
            <Popup>
              <div className="text-sm">
                <strong>{location.status || 'Previous Location'}</strong>
                <br />
                {location.name}
                {location.time && (
                  <>
                    <br />
                    <span className="text-gray-500">{location.time}</span>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Path line */}
        {pathCoordinates.length > 1 && (
          <Polyline
            positions={pathCoordinates}
            color="#465fff"
            weight={3}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}
      </MapContainer>
    </div>
  );
} 