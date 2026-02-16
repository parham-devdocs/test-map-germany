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

const API_URL =
  "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/fc7dc242f41393845d90edaa99e32e28f1ddfe24/train-stations.json";

function App() {
  const { data, loading, error } = useFetch<Station[]>(API_URL);
  const setStations = useStation((state) => state.setStations);
  const stations = useStation((state) => state.stations);

  // ✅ Move search state and filtering logic here
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<Station[]>([]);

  useEffect(() => {
    if (data) {
      setStations(data);
    }
  }, [data]);

  // ✅ Filter stations when searchTerm or stations change
  useEffect(() => {
    if (!stations) return;
    const filtered = stations.filter(
      (station) =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [stations, searchTerm]);

  const totalCities = countTotalCities(stations);

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

  if (!stations || stations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-600 text-lg">No stations found</div>
      </div>
    );
  }

  const defaultCenter = [stations[0].lat, stations[0].lng] as [number, number];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-5">
      <Header stationCount={stations.length} cityCount={totalCities} />

      <Map defaultCenter={defaultCenter} stations={filteredData} />

      <StationsList
        stations={filteredData} // ✅ Pass filtered data
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onStationClick={(station) => {
          setFilteredData(station);
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}

export default App;