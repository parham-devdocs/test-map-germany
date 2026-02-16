

import { MapContainer, Marker, TileLayer,Popup } from 'react-leaflet'
import { Station } from '../types'

const Map = ({stations,defaultCenter}:{stations:Station[],defaultCenter:any}) => {
  return (
    <div className="w-[500px] h-[500px] rounded-lg shadow-lg overflow-hidden">
    <MapContainer
      center={defaultCenter}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stations.map((station) => (
        <Marker key={station.id} position={[station.lat, station.lng]}>
          <Popup>
            <div className="font-medium">{station.name}</div>
            <div className="text-sm text-gray-600">{station.city}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>  )
}

export default Map