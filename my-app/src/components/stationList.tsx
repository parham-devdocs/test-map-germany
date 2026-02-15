// components/StationsList.tsx
import { useState } from 'react';
import type { Station } from '../types';
import Loading from './loading';


interface StationsListProps {
  stations: Station[];
  loading?: boolean;
  error?: string | null;
  onStationClick?: (station: Station) => void;
}

const StationsList = ({
  stations,
  loading = false,
  error = null,
  onStationClick,
  
}: StationsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loading  />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        something went wrong
      </div>
    );
  }

  if (filteredStations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No stations found
          </h3>
          <p className="text-gray-600 text-lg">
            Try adjusting your search or check back later
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
     

      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
         
          <input
            type="text"
            placeholder="🔍 Search stations or cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all text-lg"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

  

      {/* Stations Grid */}
      <div className="space-y-4">
        {filteredStations.map((station) => (
          <div
            key={station.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={() => onStationClick?.(station)}
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="flex items-center space-x-3">
                   
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {station.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                          {station.city}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
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
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStationClick?.(station);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 shadow-md"
                  >
                    View on Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-600">
        <p className="text-lg">
          Showing <span className="font-bold text-blue-600">{filteredStations.length}</span> of{' '}
          <span className="font-bold text-blue-600">{stations.length}</span> stations
        </p>
      </div>
    </div>
  );
};

export default StationsList;