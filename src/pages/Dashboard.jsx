impimport React, { useState } from 'react'
import {
  FiDollarSign, FiShoppingBag, FiUsers, FiBox, FiClock, FiAlertCircle,
  FiTrendingUp, FiTrendingDown, FiPackage, FiTruck, FiCheckCircle,
  FiXCircle, FiBarChart2, FiPieChart, FiActivity, FiCalendar,
  FiArrowRight, FiDownload, FiFilter, FiMoreVertical, FiEye,
  FiStar, FiCreditCard, FiMapPin, FiPhone, FiMail, FiUser,
  FiAward, FiTarget, FiGlobe, FiSmartphone, FiMonitor,
  FiRefreshCw
} from 'react-icons/fi'

const Dashboard = ({ showToast }) => {
  const [dateRange, setDateRange] = useState('week')

  const stats = {
    revenue: { current: 154200, previous: 134000, change: 15.2 },
    orders: { current: 1248, previous: 1148, change: 8.7 },
    customers: { current: 892, previous: 723, change: 23.4 },
    conversion: { current: 3.2, previous: 2.9, change: 0.3 }
  }

  const recentOrders = [
    { id: 'ORD-7842', customer: 'John Smith', amount: 1248.00, status: 'delivered', date: '2024-03-15' },
    { id: 'ORD-7841', customer: 'Sarah Johnson', amount: 845.50, status: 'processing', date: '2024-03-15' },
    { id: 'ORD-7840', customer: 'Michael Brown', amount: 299.99, status: 'shipped', date: '2024-03-14' },
    { id: 'ORD-7839', customer: 'Emma Wilson', amount: 1567.80, status: 'pending', date: '2024-03-14' },
  ]

  const topProducts = [
    { name: 'Premium Wireless Headphones', sales: 1248, revenue: 374351, trend: 12 },
    { name: 'Smart Fitness Watch', sales: 892, revenue: 178391, trend: 8 },
    { name: 'Organic Coffee Beans', sales: 2156, revenue: 53874, trend: 23 },
    { name: 'Yoga Mat Premium', sales: 745, revenue: 37243, trend: -2 },
  ]

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className={`text-sm font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${
          change > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {change > 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your store today.
            <span className="text-blue-400 ml-2">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none text-sm"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          
          <button
            onClick={() => showToast?.('Dashboard refreshed!', 'success')}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${stats.revenue.current.toLocaleString()}`}
          change={stats.revenue.change}
          icon={FiDollarSign}
          color="from-blue-500 to-purple-500"
        />
        <StatCard
          title="Total Orders"
          value={stats.orders.current}
          change={stats.orders.change}
          icon={FiShoppingBag}
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Total Customers"
          value={stats.customers.current}
          change={stats.customers.change}
          icon={FiUsers}
          color="from-purple-500 to-pink-500"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversion.current}%`}
          change={stats.conversion.change}
          icon={FiTarget}
          color="from-yellow-500 to-orange-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiActivity className="w-5 h-5 text-blue-400" />
              Sales Overview
            </h3>
            <button className="p-2 rounded-lg hover:bg-white/5">
              <FiMoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-white/10 rounded-xl">
            <div className="text-center">
              <FiBarChart2 className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p>Sales chart ready for integration</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiPieChart className="w-5 h-5 text-purple-400" />
              Sales by Category
            </h3>
            <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View Details <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-white/10 rounded-xl">
            <div className="text-center">
              <FiPieChart className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p>Category chart ready for integration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiPackage className="w-5 h-5" />
              Recent Orders
            </h3>
            <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View All <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <FiPackage className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-gray-400">{order.customer}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-semibold">${order.amount.toFixed(2)}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'delivered' ? 'bg-green-500/10 text-green-500' :
                    order.status === 'shipped' ? 'bg-blue-500/10 text-blue-400' :
                    order.status === 'processing' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-orange-500/10 text-orange-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiAward className="w-5 h-5 text-yellow-400" />
              Top Products
            </h3>
          </div>
          
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 text-center font-bold text-gray-400">#{index + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate max-w-[150px]">{product.name}</span>
                    <span className="text-sm font-semibold text-green-400">
                      ${product.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{product.sales} units</span>
                    <span className={`text-xs flex items-center gap-1 ${
                      product.trend > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {product.trend > 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                      {Math.abs(product.trend)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
