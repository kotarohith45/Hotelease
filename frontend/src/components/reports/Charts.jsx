import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaChartBar, FaChartPie, FaChartArea, FaDownload, FaExpand, FaCompress } from 'react-icons/fa';

const Charts = () => {
  const [chartData, setChartData] = useState({});
  const [selectedChart, setSelectedChart] = useState('revenue');
  const [timeRange, setTimeRange] = useState('month');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data generation
    const generateData = () => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const revenue = months.map(() => Math.floor(Math.random() * 50000) + 20000);
      const bookings = months.map(() => Math.floor(Math.random() * 200) + 50);
      const occupancy = months.map(() => Math.floor(Math.random() * 40) + 60);
      const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Presidential'];
      const roomTypeData = roomTypes.map(type => ({
        name: type,
        value: Math.floor(Math.random() * 100) + 20,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      }));

      setChartData({
        revenue,
        bookings,
        occupancy,
        roomTypes: roomTypeData,
        months
      });
      setIsLoading(false);
    };

    setTimeout(generateData, 1000);
  }, [timeRange]);

  const chartTypes = [
    { id: 'revenue', name: 'Revenue Trend', icon: FaChartLine, color: 'blue' },
    { id: 'bookings', name: 'Booking Volume', icon: FaChartBar, color: 'green' },
    { id: 'occupancy', name: 'Occupancy Rate', icon: FaChartArea, color: 'purple' },
    { id: 'roomTypes', name: 'Room Type Distribution', icon: FaChartPie, color: 'orange' }
  ];

  const SimpleChart = ({ type, data, isFullscreen }) => {
    const maxValue = Math.max(...data);
    const chartHeight = isFullscreen ? 400 : 200;

    if (type === 'roomTypes') {
      return (
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${isFullscreen ? 'h-96' : 'h-48'}`}>
          {data.map((item, index) => (
            <motion.div
              key={item.name}
              className="bg-white rounded-lg p-4 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: item.color }}
                >
                  {item.value}
                </div>
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.value} bookings</p>
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <div className="flex items-end space-x-2" style={{ height: chartHeight }}>
          {data.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-t from-blue-500 to-blue-600 rounded-t flex-1 flex items-end justify-center pb-2"
              initial={{ height: 0 }}
              animate={{ height: `${(value / maxValue) * 100}%` }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white text-xs font-semibold transform -rotate-90 whitespace-nowrap">
                {value.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {chartData.months?.map(month => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    );
  };

  const exportData = () => {
    const dataStr = JSON.stringify(chartData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `hotel-charts-${selectedChart}-${timeRange}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={`bg-gray-50 p-6 rounded-2xl ${isFullscreen ? 'fixed inset-0 z-50 bg-white p-8 overflow-auto' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          className="text-3xl font-bold text-gray-800"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          Analytics Dashboard
        </motion.h2>

        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>

          <motion.button
            onClick={exportData}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload className="mr-2" />
            Export
          </motion.button>

          <motion.button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isFullscreen ? <FaCompress className="mr-2" /> : <FaExpand className="mr-2" />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {chartTypes.map((chart, index) => {
          const Icon = chart.icon;
          return (
            <motion.button
              key={chart.id}
              onClick={() => setSelectedChart(chart.id)}
              className={`p-4 rounded-xl shadow-lg transition-all duration-300 ${
                selectedChart === chart.id
                  ? `bg-${chart.color}-500 text-white`
                  : 'bg-white text-gray-700 hover:shadow-xl'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="text-2xl mb-2 mx-auto" />
              <h3 className="font-semibold text-sm">{chart.name}</h3>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          {chartTypes.find(c => c.id === selectedChart)?.name}
        </h3>

        <SimpleChart
          type={selectedChart}
          data={chartData[selectedChart] || []}
          isFullscreen={isFullscreen}
        />
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h4 className="text-lg font-semibold mb-2">Total Revenue</h4>
          <p className="text-3xl font-bold">
            ${chartData.revenue?.reduce((a, b) => a + b, 0).toLocaleString() || 0}
          </p>
          <p className="text-sm opacity-80">+12% from last month</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h4 className="text-lg font-semibold mb-2">Total Bookings</h4>
          <p className="text-3xl font-bold">
            {chartData.bookings?.reduce((a, b) => a + b, 0) || 0}
          </p>
          <p className="text-sm opacity-80">+8% from last month</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h4 className="text-lg font-semibold mb-2">Average Occupancy</h4>
          <p className="text-3xl font-bold">
            {Math.round(chartData.occupancy?.reduce((a, b) => a + b, 0) / (chartData.occupancy?.length || 1))}%
          </p>
          <p className="text-sm opacity-80">+5% from last month</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Charts;
