import { create } from 'zustand';
import { Station } from "../types";

interface StationState {
  stations: Station[];
  setStations: (stations: Station[]) => void;
}

const useStation = create<StationState>((set) => ({
  stations: [], 
  setStations: (stations) => set({ stations }),
}));

export default useStation;