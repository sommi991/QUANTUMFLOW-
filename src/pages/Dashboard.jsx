import React, { useState, useEffect } from 'react'
import {
  FiDollarSign, FiShoppingBag, FiUsers, FiBox, FiClock, FiAlertCircle,
  FiTrendingUp, FiTrendingDown, FiPackage, FiTruck, FiCheckCircle,
  FiXCircle, FiBarChart2, FiPieChart, FiActivity, FiCalendar,
  FiArrowRight, FiDownload, FiFilter, FiMoreVertical, FiEye,
  FiStar, FiCreditCard, FiMapPin, FiPhone, FiMail, FiUser,
  FiAward, FiTarget, FiGlobe, FiSmartphone, FiMonitor, FiSun,
  FiMoon, FiCloud, FiDatabase, FiCpu, FiZap, FiGift, FiPercent,
  FiClock as FiClockIcon, FiRefreshCw, FiPlus, FiEdit, FiTrash2
} from 'react-icons/fi'

const Dashboard = ({ showToast }) => {
  const [dateRange, setDateRange] = useState('week')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  // Analytics Data
  const [analytics, setAnalytics] = useState({
    revenue: { total: 154200, change: 15.2, data: [45000, 52000, 48000, 61000, 58000, 63000, 72000] },
    orders: { total: 1248, change: 8.7, data: [120, 135, 142, 158, 149, 163, 181] },
    customers: { total: 892, change: 23.4, data: [45, 52, 48, 61, 58, 63, 72] },
    conversion: { total: 3.2, change: 0.8, data: [2.8, 3.0, 2.9, 3.1, 3.0, 3.2, 3.4] },
    aov: { total: 124, change: 4.2, data: [118, 122, 119, 125, 121, 126, 128] }
  })

  // Real-time Stats
  const [realtime, setRealtime] = useState({
    activeUsers: 124,
    pageViews: 1842,
    bounceRate: 32.5,
    serverLoad: 45
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtime(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        pageViews: prev.pageViews + Math.floor(Math.random() * 50),
        bounceRate: Number((prev.bounceRate + (Math.random() * 2 - 1)).toFixed(1)),
        serverLoad: Math.min(100, Math.max(0, prev.serverLoad + Math.floor(Math.random() * 10) - 5))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Recent Orders
  const [recentOrders] = useState([
    { id: 'ORD-7842', customer: 'John Smith', amount: 1248.00, status: 'delivered', date: '2024-03-15', items: 3, payment: 'Credit Card', avatar: 'JS' },
    { id: 'ORD-7841', customer: 'Sarah Johnson', amount: 845.50, status: 'processing', date: '2024-03-15', items: 2, payment: 'PayPal', avatar: 'SJ' },
    { id: 'ORD-7840', customer: 'Michael Brown', amount: 299.99, status: 'shipped', date: '2024-03-14', items: 1, payment: 'Apple Pay', avatar: 'MB' },
    { id: 'ORD-7839', customer: 'Emma Wilson', amount: 1567.80, status: 'pending', date: '2024-03-14', items: 4, payment: 'Credit Card', avatar: 'EW' },
    { id: 'ORD-7838', customer: 'David Lee', amount: 89.99, status: 'delivered', date: '2024-03-13', items: 1, payment: 'Google Pay', avatar: 'DL' }
  ])

  // Top Products
  const [topProducts] = useState([
    { name: 'Premium Wireless Headphones', sales: 1248, revenue: 374351, trend: 12, stock: 45, image: '🎧' },
    { name: 'Smart Fitness Watch', sales: 892, revenue: 178391, trend: 8, stock: 28, image: '⌚' },
    { name: 'Organic Coffee Beans', sales: 2156, revenue: 53874, trend: 23, stock: 156, image: '☕' },
    { name: 'Yoga Mat Premium', sales: 745, revenue: 37243, trend: -2, stock: 12, image: '🧘' },
    { name: 'Bluetooth Speaker', sales: 623, revenue: 31150, trend: 15, stock: 34, image: '🔊' }
  ])

  // Sales by Category
  const [categories] = useState([
    { name: 'Electronics', value: 45, color: 'from-blue-500 to-cyan-500', icon: '📱' },
    { name: 'Fashion', value: 25, color: 'from-purple-500 to-pink-500', icon: '👕' },
    { name: 'Home & Living', value: 15, color: 'from-green-500 to-emerald-500', icon: '🏠' },
    { name: 'Sports', value: 10, color: 'from-orange-500 to-red-500', icon: '⚽' },
    { name: 'Others', value: 5, color: 'from-gray-500 to-gray-600', icon: '📦' }
  ])

  // Recent Activities
  const [activities] = useState([
    { user: 'Sarah Johnson', action: 'placed order', target: '#ORD-7841', time: '2 minutes ago', type: 'order', icon: FiShoppingBag },
    { user: 'Admin', action: 'updated product', target: 'Premium Headphones', time: '15 minutes ago', type: 'product', icon: FiBox },
    { user: 'System', action: 'low stock alert', target: 'Yoga Mat (12 left)', time: '1 hour ago', type: 'alert', icon: FiAlertCircle },
    { user: 'Emma Wilson', action: 'left a review', target: '5 stars', time: '3 hours ago', type: 'review', icon: FiStar },
    { user: 'Michael Brown', action: 'requested refund', target: '#ORD-7835', time: '5 hours ago', type: 'refund', icon: FiCreditCard }
  ])

  // Sales by Location
  const [locations] = useState([
    { country: 'United States', revenue: 185000, orders: 1450, flag: '🇺🇸', percentage: 45 },
    { country: 'United Kingdom', revenue: 82000, orders: 680, flag: '🇬🇧', percentage: 20 },
    { country: 'Canada', revenue: 65000, orders: 520, flag: '🇨🇦', percentage: 15 },
    { country: 'Australia', revenue: 48000, orders: 380, flag: '🇦🇺', percentage: 12 },
    { country: 'Germany', revenue: 45000, orders: 350, flag: '🇩🇪', percentage: 8 }
  ])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      showToast?.('Dashboard data refreshed!', 'success')
    }, 1500)
  }

  const getMetricIcon = (metric) => {
    switch(metric) {
      case 'revenue': return FiDollarSign
      case 'orders': return FiShoppingBag
      case 'customers': return FiUsers
      case 'conversion': return FiTarget
      case 'aov': return FiCreditCard
      default: return FiActivity
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'shipped': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      {showWelcome && (
        <div className="glass-card p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/30 animate-float">
                <FiZap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                  Welcome back, Admin! 👋
                </h1>
                <p className="text-gray-400 flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    📊 {realtime.activeUsers} active users
                  </span>
                  <span className="text-xs px-3 py-1.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                    ⚡ {realtime.pageViews} page views
                  </span>
                  <span className={`text-xs px-3 py-1.5 rounded-full ${
                    realtime.serverLoad > 80 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                  } border ${
                    realtime.serverLoad > 80 ? 'border-red-500/20' : 'border-green-500/20'
                  }`}>
                    🖥️ Server load: {realtime.serverLoad}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowWelcome(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold">Dashboard Overview</h2>
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setDateRange('day')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${dateRange === 'day' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Day
            </button>
            <button
              onClick={() => setDateRange('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${dateRange === 'week' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Week
            </button>
            <button
              onClick={() => setDateRange('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${dateRange === 'month' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Month
            </button>
            <button
              onClick={() => setDateRange('year')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${dateRange === 'year' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Year
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <FiRefreshCw className={`w-4 h-4 group-hover:rotate-180 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm">Refresh</span>
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <FiDownload className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
          <button
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <FiFilter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`$${analytics.revenue.total.toLocaleString()}`}
          change={analytics.revenue.change}
          icon={FiDollarSign}
          color="from-blue-500 to-cyan-500"
          data={analytics.revenue.data}
          onClick={() => setSelectedMetric('revenue')}
        />
        <MetricCard
          title="Total Orders"
          value={analytics.orders.total}
          change={analytics.orders.change}
          icon={FiShoppingBag}
          color="from-purple-500 to-pink-500"
          data={analytics.orders.data}
          onClick={() => setSelectedMetric('orders')}
        />
        <MetricCard
          title="Total Customers"
          value={analytics.customers.total}
          change={analytics.customers.change}
          icon={FiUsers}
          color="from-green-500 to-emerald-500"
          data={analytics.customers.data}
          onClick={() => setSelectedMetric('customers')}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${analytics.conversion.total}%`}
          change={analytics.conversion.change}
          icon={FiTarget}
          color="from-orange-500 to-red-500"
          data={analytics.conversion.data}
          onClick={() => setSelectedMetric('conversion')}
        />
        <MetricCard
          title="Avg Order Value"
          value={`$${analytics.aov.total}`}
          change={analytics.aov.change}
          icon={FiCreditCard}
          color="from-indigo-500 to-blue-500"
          data={analytics.aov.data}
          onClick={() => setSelectedMetric('aov')}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FiActivity className="w-5 h-5 text-blue-400" />
                Revenue Overview
              </h3>
              <p className="text-sm text-gray-400">Monthly revenue performance vs last year</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-400">2024</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <span className="text-xs text-gray-400">2023</span>
              </div>
            </div>
          </div>
          
          <div className="h-80 w-full relative">
            {/* Chart Placeholder - Replace with actual chart library */}
            <div className="absolute inset-0 flex items-end justify-between px-4">
              {[65, 72, 68, 85, 78, 82, 95, 88, 92, 88, 86, 90].map((height, i) => (
                <div key={i} className="flex flex-col items-center gap-2 w-12">
                  <div className="relative group">
                    <div 
                      className="w-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-300 group-hover:from-purple-500 group-hover:to-pink-500 cursor-pointer"
                      style={{ height: `${height}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${(height * 1000).toLocaleString()}
                      </div>
                    </div>
                    <div 
                      className="w-8 bg-gray-700/50 rounded-t-lg mt-1"
                      style={{ height: `${height - 10}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">Jan</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FiPieChart className="w-5 h-5 text-purple-400" />
            Sales by Category
          </h3>
          
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-400">{category.value}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${category.color} transition-all duration-500 group-hover:scale-x-105 origin-left`}
                    style={{ width: `${category.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total Categories</span>
              <span className="text-2xl font-bold text-blue-400">5</span>
            </div>
            <button className="w-full mt-4 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center justify-center gap-2">
              <FiPlus className="w-4 h-4" />
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Second Row - Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiPackage className="w-5 h-5" />
              Recent Orders
            </h3>
            <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              View All <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {order.avatar}
                  </div>
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      {order.id}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 flex items-center gap-2">
                      <FiUser className="w-3 h-3" />
                      {order.customer}
                      <FiCreditCard className="w-3 h-3 ml-2" />
                      {order.payment}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-blue-400">${order.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    {order.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiStar className="w-5 h-5 text-yellow-400" />
              Top Selling Products
            </h3>
            <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              View All <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                  {product.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </span>
                    <span className="text-sm font-semibold text-blue-400">
                      ${product.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">{product.sales} units sold</span>
                    <span className={`text-xs flex items-center gap-1 ${
                      product.trend > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {product.trend > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                      {Math.abs(product.trend)}%
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      product.stock < 20 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                    }`}>
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row - Location & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales by Location */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FiGlobe className="w-5 h-5 text-green-400" />
            Sales by Location
          </h3>
          
          <div className="space-y-4">
            {locations.map((location, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{location.flag}</span>
                    <span className="text-sm font-medium">{location.country}</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-400">
                    ${location.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:scale-x-105 origin-left"
                      style={{ width: `${location.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400">{location.percentage}%</span>
                </div>
                <span className="text-xs text-gray-500">{location.orders} orders</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FiClockIcon className="w-5 h-5 text-orange-400" />
            Recent Activity
          </h3>
          
          <div className="space-y-3">
            {activities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                    ${activity.type === 'order' ? 'bg-blue-500/10 text-blue-400' :
                      activity.type === 'product' ? 'bg-green-500/10 text-green-500' :
                      activity.type === 'alert' ? 'bg-red-500/10 text-red-500' :
                      activity.type === 'review' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-purple-500/10 text-purple-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-400"> {activity.action} </span>
                      <span className="font-medium text-blue-400">{activity.target}</span>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <FiMoreVertical className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FiZap className="w-5 h-5 text-yellow-400" />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <QuickActionCard
            icon={FiShoppingBag}
            label="New Order"
            description="Create customer order"
            color="from-blue-500 to-cyan-500"
            shortcut="⌘ N"
            onClick={() => console.log('New Order')}
          />
          <QuickActionCard
            icon={FiBox}
            label="Add Product"
            description="List new product"
            color="from-purple-500 to-pink-500"
            shortcut="⌘ P"
            onClick={() => console.log('Add Product')}
          />
          <QuickActionCard
            icon={FiUsers}
            label="Add Customer"
            description="Register customer"
            color="from-green-500 to-emerald-500"
            shortcut="⌘ U"
            onClick={() => console.log('Add Customer')}
          />
          <QuickActionCard
            icon={FiPercent}
            label="Create Coupon"
            description="Discount code"
            color="from-orange-500 to-red-500"
            shortcut="⌘ C"
            onClick={() => console.log('Create Coupon')}
          />
          <QuickActionCard
            icon={FiDownload}
            label="Export Report"
            description="Download data"
            color="from-indigo-500 to-blue-500"
            shortcut="⌘ E"
            onClick={() => console.log('Export')}
          />
          <QuickActionCard
            icon={FiSettings}
            label="Settings"
            description="Configure store"
            color="from-gray-500 to-gray-600"
            shortcut="⌘ ,"
            onClick={() => console.log('Settings')}
          />
        </div>
      </div>
    </div>
  )
}

const MetricCard = ({ title, value, change, icon: Icon, color, data, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Sparkline Chart */}
      <div className="absolute bottom-0 right-0 opacity-20">
        <svg width="120" height="40" viewBox="0 0 120 40">
          {data.map((point, i, arr) => {
            const x = (i / (arr.length - 1)) * 100
            const y = 40 - (point / Math.max(...data)) * 30
            return i === 0 ? (
              <path
                key={i}
                d={`M${x},${y}`}
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
            ) : (
              <path
                key={i}
                d={`L${x},${y}`}
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
            )
          })}
        </svg>
      </div>

      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className={`text-sm font-semibold px-2 py-1 rounded-full flex items-center gap-1
          ${change > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {change > 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </span>
      </div>
      
      <div className="relative z-10">
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-sm text-gray-400">{title}</div>
      </div>

      {/* Hover Tooltip */}
      {isHovered && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded whitespace-nowrap border border-white/10">
          Click to view details
        </div>
      )}
    </div>
  )
}

const QuickActionCard = ({ icon: Icon, label, description, color, shortcut, onClick }) => (
  <button
    onClick={onClick}
    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group relative"
    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
  >
    <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <span className="text-sm font-medium block">{label}</span>
    <span className="text-xs text-gray-400 block mt-1">{description}</span>
    <span className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-gray-400">
      {shortcut}
    </span>
  </button>
)

import { FiX } from 'react-icons/fi'
export default Dashboard
