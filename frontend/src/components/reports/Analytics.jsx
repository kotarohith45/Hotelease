import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChartLine, FaChartBar, FaChartPie, FaUsers, FaBed, FaDollarSign,
  FaCalendarAlt, FaDownload, FaFilter, FaEye, FaArrowUp, FaArrowDown,
  FaStar, FaClock, FaMapMarkerAlt
} from 'react-icons/fa';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isLoading, setIsLoading] = useState(true);
  const [animatedValues, setAnimatedValues] = useState({});

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 125430,
      totalBookings: 1247,
      occupancyRate: 87.5,
      averageRating: 4.6
    },
    revenue: {
      daily: [1200, 1350, 1180, 1420, 1680, 1520, 1890, 1750, 1920, 2100, 1980, 2250, 2180, 2400, 2350, 2580, 2450, 2720, 2680, 2850, 2780, 2950, 2880, 3120, 3050, 3280, 3220, 3450, 3380, 3520],
      monthly: [28500, 31200, 29800, 34500, 32800, 36200, 34800, 38500, 37200, 39800, 38500, 41200],
      yearly: [285000, 312000, 298000, 345000]
    },
    bookings: {
      daily: [12, 15, 11, 18, 22, 19, 24, 21, 25, 28, 26, 30, 27, 32, 29, 35, 31, 38, 36, 40, 37, 42, 39, 45, 41, 48, 44, 50, 46, 52],
      monthly: [320, 380, 350, 420, 390, 450, 410, 480, 440, 500, 460, 520],
      yearly: [4200, 4800, 4500, 5200]
    },
    occupancy: {
      daily: [85, 87, 83, 89, 92, 88, 94, 90, 95, 97, 93, 98, 96, 99, 97, 100, 98, 100, 99, 100, 98, 100, 99, 100, 98, 100, 99, 100, 98, 100],
      monthly: [82, 85, 83, 87, 84, 89, 86, 91, 88, 93, 90, 95],
      yearly: [85, 87, 86, 89]
    },
    roomTypes: [
      { name: 'Deluxe Suite', bookings: 245, revenue: 73500, occupancy: 92 },
      { name: 'Executive Room', bookings: 312, revenue: 21840, occupancy: 88 },
      { name: 'Standard Room', bookings: 456, revenue: 13680, occupancy: 82 },
      { name: 'Family Suite', bookings: 189, revenue: 56700, occupancy: 95 },
      { name: 'Presidential Suite', bookings: 45, revenue: 54000, occupancy: 98 }
    ],
    topLocations: [
      { location: 'Downtown', bookings: 423, revenue: 126900 },
      { location: 'Airport', bookings: 312, revenue: 93600 },
      { location: 'Business District', bookings: 289, revenue: 86700 },
      { location: 'Tourist Area', bookings: 223, revenue: 66900 }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // Animate values when data loads
    if (!isLoading) {
      const timer = setTimeout(() => {
        setAnimatedValues({
          totalRevenue: analyticsData.overview.totalRevenue,
          totalBookings: analyticsData.overview.totalBookings,
          occupancyRate: analyticsData.overview.occupancyRate,
          averageRating: analyticsData.overview.averageRating
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const MetricCard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
    <motion.div
      className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 ${color}`}
      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color.replace('border-l-', 'bg-').replace('-500', '-100')}`}>
          <Icon className={`text-2xl ${color.replace('border-l-', 'text-')}`} />
        </div>
        {trend && (
          <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
            <span className="ml-1 text-sm font-semibold">{trendValue}%</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <motion.p
        className="text-3xl font-bold text-gray-800"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        {typeof value === 'number' && value > 100
          ? `$${value.toLocaleString()}`
          : value
        }
      </motion.p>
    </motion.div>
  );

  const ChartContainer = ({ title, children, icon: Icon }) => (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Icon className="text-blue-500 text-xl mr-3" />
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  const SimpleBarChart = ({ data, color = 'blue' }) => (
    <div className="flex items-end justify-between h-32 space-x-1">
      {data.map((value, index) => (
        <motion.div
          key={index}
          className={`bg-${color}-500 rounded-t`}
          style={{ width: `${100 / data.length}%` }}
          initial={{ height: 0 }}
          animate={{ height: `${(value / Math.max(...data)) * 100}%` }}
          transition={{ delay: index * 0.05, duration: 0.5 }}
        />
      ))}
    </div>
  );

  const SimpleLineChart = ({ data, color = 'blue' }) => {
    const colorMap = {
      blue: '#3B82F6',
      green: '#10B981',
      purple: '#8B5CF6',
      red: '#EF4444',
      yellow: '#F59E0B'
    };

    return (
      <div className="relative h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d={`M 0,${100 - (data[0] / Math.max(...data)) * 100} ${data.map((value, index) =>
              `L ${(index / (data.length - 1)) * 100},${100 - (value / Math.max(...data)) * 100}`
            ).join(' ')}`}
            fill="none"
            stroke={colorMap[color] || colorMap.blue}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    );
  };

  const PieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.bookings, 0);
    let currentAngle = 0;

    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.map((item, index) => {
            const angle = (item.bookings / total) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;

            const startAngleRad = (startAngle * Math.PI) / 180;
            const endAngleRad = (currentAngle * Math.PI) / 180;

            const x1 = 50 + 40 * Math.cos(startAngleRad);
            const y1 = 50 + 40 * Math.sin(startAngleRad);
            const x2 = 50 + 40 * Math.cos(endAngleRad);
            const y2 = 50 + 40 * Math.sin(endAngleRad);

            const largeArcFlag = angle > 180 ? 1 : 0;

            const pathData = [
              `M 50 50`,
              `L ${x1} ${y1}`,
              `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');

            const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

            return (
              <motion.path
                key={index}
                d={pathData}
                fill={colors[index % colors.length]}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{total}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        </div>
      </div>
    );
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
      className="p-8 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Analytics Dashboard</h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="revenue">Revenue</option>
              <option value="bookings">Bookings</option>
              <option value="occupancy">Occupancy</option>
            </select>
          </div>
          <motion.button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload className="mr-2" />
            Export Report
          </motion.button>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <MetricCard
          title="Total Revenue"
          value={animatedValues.totalRevenue || 0}
          icon={FaDollarSign}
          color="border-l-green-500"
          trend="up"
          trendValue="12.5"
        />
        <MetricCard
          title="Total Bookings"
          value={animatedValues.totalBookings || 0}
          icon={FaCalendarAlt}
          color="border-l-blue-500"
          trend="up"
          trendValue="8.3"
        />
        <MetricCard
          title="Occupancy Rate"
          value={`${animatedValues.occupancyRate || 0}%`}
          icon={FaBed}
          color="border-l-purple-500"
          trend="up"
          trendValue="5.2"
        />
        <MetricCard
          title="Average Rating"
          value={animatedValues.averageRating || 0}
          icon={FaStar}
          color="border-l-yellow-500"
          trend="up"
          trendValue="2.1"
        />
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartContainer title="Revenue Trend" icon={FaChartLine}>
          <SimpleLineChart data={analyticsData.revenue.daily} color="green" />
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </ChartContainer>

        <ChartContainer title="Booking Volume" icon={FaChartBar}>
          <SimpleBarChart data={analyticsData.bookings.daily} color="blue" />
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </ChartContainer>

        <ChartContainer title="Room Type Performance" icon={FaChartPie}>
          <PieChart data={analyticsData.roomTypes} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {analyticsData.roomTypes.map((room, index) => (
              <motion.div
                key={room.name}
                className="flex items-center text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index] }}
                />
                <span className="truncate">{room.name}</span>
              </motion.div>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="Top Locations" icon={FaMapMarkerAlt}>
          <div className="space-y-4">
            {analyticsData.topLocations.map((location, index) => (
              <motion.div
                key={location.location}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-red-500 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-800">{location.location}</div>
                    <div className="text-sm text-gray-600">{location.bookings} bookings</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">${location.revenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">revenue</div>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Detailed Room Types Table */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FaBed className="mr-3 text-blue-500" />
          Room Type Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Room Type</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Bookings</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Revenue</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Occupancy</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.roomTypes.map((room, index) => (
                <motion.tr
                  key={room.name}
                  className="border-b border-gray-100 hover:bg-gray-50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="py-4 px-4 font-medium text-gray-800">{room.name}</td>
                  <td className="py-4 px-4 text-center">{room.bookings}</td>
                  <td className="py-4 px-4 text-center font-semibold text-green-600">
                    ${room.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <motion.div
                          className="bg-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${room.occupancy}%` }}
                          transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                        />
                      </div>
                      <span className="text-sm font-medium">{room.occupancy}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <motion.div
                      className="flex items-center justify-center text-green-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5 + index * 0.1, type: 'spring' }}
                    >
                      <FaArrowUp className="mr-1" />
                      <span className="text-sm font-semibold">+{Math.floor(Math.random() * 15) + 5}%</span>
                    </motion.div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
