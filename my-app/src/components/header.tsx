import countTotalCities from "../utils/counntUniqueCities";

const Header = ({
  stationCount,
  cityCount,
}: {
  stationCount: number;
  cityCount: number;
}) => {
  return (
    <div className="mb-6 text-center border-blue-500 border-2 rounded-2xl w-full py-3">
      <h2 className="text-3xl font-bold bg-blue-500 bg-clip-text text-transparent mb-2">
        🚉 Train Stations
      </h2>
      <p className="text-gray-600 text-lg">
        <span className="font-bold text-blue-600">{stationCount}</span> stations
        across <span className="font-bold text-blue-500">{cityCount}</span>{" "}
        cities
      </p>
    </div>
  );
};

export default Header;
