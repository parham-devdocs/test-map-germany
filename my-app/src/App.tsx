// App.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import useFetch from "./hooks/useFetch";
import Loading from "./components/loading";
import { Station } from "./types";
import StationsList from "./components/stationList";
import Header from "./components/header";
import countTotalCities from "./utils/counntUniqueCities";
import { useState, useEffect } from "react";

const API_URL =
  "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/fc7dc242f41393845d90edaa99e32e28f1ddfe24/train-stations.json";

function App() {
  const { data: fetchedData, loading, error } = useFetch<Station[]>(API_URL);
  const [data, setData] = useState<Station[]>([]);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  const totalCities = countTotalCities(data);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>{error || "Something unexpected occurred"}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-600 text-lg">No stations found</div>
      </div>
    );
  }

  const defaultCenter = [data[0].lat, data[0].lng] as [number, number];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-5">
      <Header stationCount={data.length} cityCount={totalCities} />

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

          {data.map((station) => (
            <Marker key={station.id} position={[station.lat, station.lng]}>
              <Popup>
                <div className="font-medium">{station.name}</div>
                <div className="text-sm text-gray-600">{station.city}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <StationsList stations={data} onFilterChange={(e)=>{console.log(e)}}/>
    </div>
  );
}

export default App;