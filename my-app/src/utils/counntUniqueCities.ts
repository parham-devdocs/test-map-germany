import { Station } from "../types";

 const countUniqueCities = (stations: Station[] | null | undefined): number => {
    if (!stations || stations.length === 0) return 0;
    return new Set(stations.map(s => s.city)).size;
  };

  export default countUniqueCities