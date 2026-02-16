import { FaSearch } from "react-icons/fa";
import type { Station } from '../types';
import Loading from './loading';
import NotFound from './notFound';

interface StationsListProps {
  stations: Station[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  loading?: boolean;
  error?: string | null;
  onStationClick: (station: Station[]) => void;
}

// Displays the list of stations. 
// Receives filtered data from parent to stay in sync with the Map.
const StationsList = ({
  loading = false,
  error = null,
  searchTerm,
  onSearchChange,
  onStationClick,
  stations,
}: StationsListProps) => {
  
  if (loading) return <div className="flex items-center justify-center py-12"><Loading /></div>;
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-5xl mb-3">⚠️</div>
          <p className="text-red-800 text-lg font-semibold mb-2">Something went wrong</p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      
      {/* Search Input: Updates parent state on every keystroke */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Search stations or cities..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all text-lg"
          />
          {/* Icon positioned absolutely inside input */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
             {/* You can add an icon here if needed, currently empty in your snippet */}
          </div>
        </div>
      </div>

      {/* Empty State: Shows when filter returns no results */}
      {stations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <NotFound />
          {searchTerm && (
            <p className="text-gray-600 text-lg mt-4">
              No stations match "<span className="font-semibold">{searchTerm}</span>"
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Stats Banner: Dynamic counts based on current filter */}
          <div className="bg-blue-500 text-white rounded-xl p-4 mb-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg opacity-90">Showing Results</p>
                <p className="text-3xl font-bold">{stations.length}</p>
              </div>
              <div className="text-right">
                <p className="text-lg opacity-90">Cities</p>
                <p className="text-3xl font-bold">
                  {new Set(stations.map((s) => s.city)).size}
                </p>
              </div>
            </div>
          </div>

          {/* List Items */}
          <div className="space-y-4">
            {stations.map((station) => (
              <div
                key={station.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    
                    {/* Station Info */}
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-white font-bold text-xl">#{station.id}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{station.name}</h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                            {station.city}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Area */}
                    <div className="flex items-center space-x-4">
                      {/* Coordinates (Hidden on mobile) */}
                      <div className="text-right hidden md:block">
                        <div className="text-sm text-gray-600 mb-1">Coordinates</div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700">
                            {station.lat.toFixed(4)}°
                          </span>
                          <span className="bg-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700">
                            {station.lng.toFixed(4)}°
                          </span>
                        </div>
                      </div>

                      {/* Focus Button: Scrolls to top and updates map center */}
                      <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          onStationClick([station]);
                          window.scrollTo(0, 0);
                        }}
                        className="px-6 flex gap-3 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 shadow-md"
                      >
                        <FaSearch />
                        View on Map
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Count */}
          <div className="mt-8 text-center text-gray-600">
            <p className="text-lg">
              Showing{' '}
              <span className="font-bold text-blue-600">{stations.length}</span>{' '}
              stations
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default StationsList;