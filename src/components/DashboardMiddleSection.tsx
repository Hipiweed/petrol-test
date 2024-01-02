import GasPriceChart from '@/components/GasPriceChart';
import AveragePricePieChart from '@/components/AveragePricePieChart';
import { statistics } from '../utils/chart';

function DashboardMiddleSection() {
  return (
    <div className="p-3 grid lg:grid-cols-6 gap-4">
      <div className="lg:col-span-4 col-span-6 bg-white w-full p-4 rounded shadow">
        <GasPriceChart />
      </div>
      <div className="lg:col-span-2 col-span-6 bg-white w-full p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4 text-center">
          Gas Price Statistics
        </h2>
        <div className="grid grid-cols-2 gap-2 text-sm text-center">
          <p>
            <strong>Average Diesel Price:</strong> €
            {statistics.averageDieselPrice}
          </p>
          <p>
            <strong>Average Petrol Price:</strong> €
            {statistics.averagePetrolPrice}
          </p>
          <p>
            <strong>Highest Diesel Price:</strong> €
            {statistics.highestDieselPrice}
          </p>
          <p>
            <strong>Highest Petrol Price:</strong> €
            {statistics.highestPetrolPrice}
          </p>
          <p>
            <strong>Lowest Diesel Price:</strong> €
            {statistics.lowestDieselPrice}
          </p>
          <p>
            <strong>Lowest Petrol Price:</strong> €
            {statistics.lowestPetrolPrice}
          </p>
        </div>
        <div className="mt-4">
          <AveragePricePieChart />
        </div>
      </div>
    </div>
  );
}

export default DashboardMiddleSection;
