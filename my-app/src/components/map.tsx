import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import { Station } from '../types'


const Map = ({ stations, defaultCenter }: { stations: Station[], defaultCenter: [number, number] }) => {
  return (
    // Container 
    <div className="w-full h-[500px] border-2 border-blue-500 rounded-lg shadow-lg overflow-hidden bg-white">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render a marker for every station in the filtered list */}
        {stations.map((station) => (
          <Marker key={station.id} position={[station.lat, station.lng]}>
            <Popup>
              <div className="font-medium">{station.name}</div>
              <div className="text-sm text-gray-600">{station.city}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map