function DashboardCardsTop() {
  return (
    <div className="grid lg:grid-cols-6 gap-4 p-3">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded">
        <div className="flex flex-col w-full pb-3">
          <div className="text-gray-400 text-xs">Gas price today</div>
          <div className="text-gray-900 text-2xl">1.1€</div>
        </div>
        <span className="text-red-600">-1.2%</span>
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded">
        <div className="flex flex-col w-full pb-3">
          <div className="text-gray-400 text-xs">Gas price yesterday</div>
          <div className="text-gray-900 text-2xl">1.2€</div>
        </div>
        <span className="text-green-600">+1%</span>
      </div>
      <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded">
        <div className="flex flex-col w-full pb-3">
          <div className="text-gray-400 text-xs">Monthly growth</div>
          <div className="w-100 bg-green-300 rounded flex justify-center items-center">
            <h3 className="text-2xl text-green-700">+3%</h3>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded">
        <div className="flex flex-col w-full pb-3">
          <div className="text-gray-400 text-xs">Yearly growth</div>
          <div className="w-100 bg-green-300 rounded flex justify-center items-center">
            <h3 className="text-2xl text-green-700">+5%</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCardsTop;
