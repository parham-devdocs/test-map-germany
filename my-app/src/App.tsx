import "leaflet/dist/leaflet.css";
import "./App.css";
import useFetch from "./hooks/useFetch";
import Loading from "./components/loading";
import { Station } from "./types";
import StationsList from "./components/stationList";
import Header from "./components/header";
import countTotalCities from "./utils/counntUniqueCities";
import { useEffect, useState } from "react";
import Map from "./components/map";
import useStation from "./zustand/store";

const API_URL = "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/fc7dc242f41393845d90edaa99e32e28f1ddfe24/train-stations.json";

function App() {
  const { data, loading, error } = useFetch<Station[]>(API_URL);
  const setStations = useStation((s) => s.setStations);
  const stations = useStation((s) => s.stations);

  // Lifted state: Parent controls filtering to sync Map & List safely
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<Station[]>([]);

  // Cache raw data in Zustand
  useEffect(() => { if (data) setStations(data); }, [data]);

  // Recalculate filter whenever search or data changes
  useEffect(() => {
    if (!stations) return;
    setFilteredData(
      stations.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [stations, searchTerm]);

  const totalCities = countTotalCities(stations);

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-100"><Loading /></div>;
  if (error) return <div className="flex items-center justify-center min-h-screen bg-gray-100">{error}</div>;
  if (!stations?.length) return <div className="flex items-center justify-center min-h-screen bg-gray-100">No stations found</div>;

  const defaultCenter = [stations[0].lat, stations[0].lng] as [number, number];

  return (
    <div className="flex flex-col gap-5 items-center bg-gray-100 py-5">
      <div className="w-[700px] flex flex-col items-center">
        <Header stationCount={stations.length} cityCount={totalCities} />
        
        {/* Map updates instantly as filteredData changes */}
        <Map defaultCenter={defaultCenter} stations={filteredData} />

        {/* List drives the search state; clicks focus the map */}
        <StationsList
          stations={filteredData}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onStationClick={(station) => {
            setFilteredData(station);
            window.scrollTo(0, 0);
          }}
        />
      </div>
    </div>
  );
}

export default App;