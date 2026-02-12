import React, { useState, useEffect } from 'react'
import {
  FiDollarSign, FiShoppingBag, FiUsers, FiBox, FiClock, FiAlertCircle,
  FiTrendingUp, FiTrendingDown, FiPackage, FiTruck, FiCheckCircle,
  FiXCircle, FiBarChart2, FiPieChart, FiActivity, FiCalendar,
  FiArrowRight, FiDownload, FiFilter, FiMoreVertical, FiEye,
  FiStar, FiCreditCard, FiMapPin, FiPhone, FiMail, FiUser,
  FiAward, FiTarget, FiGlobe, FiSmartphone, FiMonitor,
  FiSun, FiCloud, FiShoppingCart, FiGift, FiPercent
} from 'react-icons/fi'

const Dashboard = ({ showToast }) => {
  const [dateRange, setDateRange] = useState('week')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [isLoading, setIsLoading] = useState(false)

  // Real-time stats with animations
  const [stats, setStats] = useState({
    revenue: { current: 154200, previous: 134000, change: 15.2, target: 200000 },
    orders: { current: 1248, previous: 1148, change: 8.7, target: 1500 },
    customers: { current: 892, previous: 723, change: 23.4, target: 1000 },
    conversion: { current: 3.2, previous: 2.9, change: 0.3, target: 3.5 },
    aov: { current: 124, previous: 119, change: 4.2, target: 135 },
    profit: { current: 48500, previous: 41200, change: 17.7, target: 60000 }
  })

  // Sales data by period
  const salesData = {
    today: [3200, 4100, 3800, 5200, 4800, 5900, 6200, 7100, 6800, 7400, 8200, 8900],
    week: [45200, 48700, 51200, 49800, 53400, 58900, 62100],
    month: [142000, 154000, 148000, 162000, 158000, 171000, 165000, 182000, 178000, 191000, 185000, 198000],
    year: [1240000, 1320000, 1410000, 1530000, 1480000, 1620000, 1750000, 1840000, 1920000, 2050000, 2180000, 2340000]
  }

  // Recent orders with status
  const [recentOrders, setRecentOrders] = useState([
    { 
      id: 'ORD-7842', 
      customer: 'John Smith', 
      email: 'john.smith@example.com',
      amount: 1248.00, 
      status: 'delivered', 
      date: '2024-03-15 14:23',
      items: 3,
      payment: 'paid',
      shipping: 'delivered',
      tracking: 'TRK78425632'
    },
    { 
      id: 'ORD-7841', 
      customer: 'Sarah Johnson', 
      email: 'sarah.j@example.com',
      amount: 845.50, 
      status: 'processing', 
      date: '2024-03-15 11:42',
      items: 2,
      payment: 'paid',
      shipping: 'processing',
      tracking: null
    },
    { 
      id: 'ORD-7840', 
      customer: 'Michael Brown', 
      email: 'michael.b@example.com',
      amount: 299.99, 
      status: 'shipped', 
      date: '2024-03-14 09:15',
      items: 1,
      payment: 'paid',
      shipping: 'shipped',
      tracking: 'TRK78425589'
    },
    { 
      id: 'ORD-7839', 
      customer: 'Emma Wilson', 
      email: 'emma.w@example.com',
      amount: 1567.80, 
      status: 'pending', 
      date: '2024-03-14 08:30',
      items: 4,
      payment: 'pending',
      shipping: 'pending',
      tracking: null
    },
    { 
      id: 'ORD-7838', 
      customer: 'David Lee', 
      email: 'david.l@example.com',
      amount: 89.99, 
      status: 'delivered', 
      date: '2024-03-13 16:45',
      items: 1,
      payment: 'paid',
      shipping: 'delivered',
      tracking: 'TRK78361234'
    }
  ])

  // Top products
  const [topProducts, setTopProducts] = useState([
    { 
      id: 'PRD-001',
      name: 'Premium Wireless Headphones', 
      sales: 1248, 
      revenue: 374351, 
      trend: 12,
      stock: 45,
      rating: 4.8,
      image: null
    },
    { 
      id: 'PRD-002',
      name: 'Smart Fitness Watch', 
      sales: 892, 
      revenue: 178391, 
      trend: 8,
      stock: 28,
      rating: 4.6,
      image: null
    },
    { 
      id: 'PRD-003',
      name: 'Organic Coffee Beans', 
      sales: 2156, 
      revenue: 53874, 
      trend: 23,
      stock: 156,
      rating: 4.9,
      image: null
    },
    { 
      id: 'PRD-004',
      name: 'Yoga Mat Premium', 
      sales: 745, 
      revenue: 37243, 
      trend: -2,
      stock: 12,
      rating: 4.7,
      image: null
    },
    { 
      id: 'PRD-005',
      name: 'Bluetooth Speaker', 
      sales: 623, 
      revenue: 31150, 
      trend: 15,
      stock: 34,
      rating: 4.5,
      image: null
    }
  ])

  // Traffic sources
  const trafficSources = [
    { source: 'Organic Search', visitors: 45200, percentage: 35, color: 'from-blue-500 to-cyan-500' },
    { source: 'Direct', visitors: 32400, percentage: 25, color: 'from-purple-500 to-pink-500' },
    { source: 'Social Media', visitors: 25800, percentage: 20, color: 'from-green-500 to-emerald-500' },
    { source: 'Email', visitors: 15500, percentage: 12, color: 'from-yellow-500 to-orange-500' },
    { source: 'Referral', visitors: 10300, percentage: 8, color: 'from-red-500 to-rose-500' }
  ]

  // Geographic data
  const topLocations = [
    { country: 'United States', flag: '🇺🇸', visitors: 45200, revenue: 185000, orders: 1450 },
    { country: 'United Kingdom', flag: '🇬🇧', visitors: 23100, revenue: 82000, orders: 680 },
    { country: 'Canada', flag: '🇨🇦', visitors: 18400, revenue: 65000, orders: 520 },
    { country: 'Australia', flag: '🇦🇺', visitors: 12500, revenue: 48000, orders: 380 },
    { country: 'Germany', flag: '🇩🇪', visitors: 10800, revenue: 45000, orders: 350 }
  ]

  // Device statistics
  const deviceStats = [
    { device: 'Mobile', percentage: 55, revenue: 234000, icon: FiSmartphone, color: 'blue' },
    { device: 'Desktop', percentage: 35, revenue: 149000, icon: FiMonitor, color: 'purple' },
    { device: 'Tablet', percentage: 10, revenue: 42500, icon: FiMonitor, color: 'green' }
  ]

  // Recent activities
  const [activities, setActivities] = useState([
    { 
      id: 1,
      user: 'John Smith',
      action: 'placed order',
      target: 'ORD-7842',
      amount: '$1,248.00',
      time: '2 minutes ago',
      type: 'order',
      icon: FiShoppingBag,
      color: 'blue'
    },
    { 
      id: 2,
      user: 'System',
      action: 'low stock alert',
      target: 'Premium Headphones',
      amount: '5 units left',
      time: '15 minutes ago',
      type: 'inventory',
      icon: FiBox,
      color: 'orange'
    },
    { 
      id: 3,
      user: 'Emma Wilson',
      action: 'registered',
      target: 'New account',
      amount: null,
      time: '1 hour ago',
      type: 'customer',
      icon: FiUsers,
      color: 'green'
    },
    { 
      id: 4,
      user: 'Michael Brown',
      action: 'left a review',
      target: 'Yoga Mat Premium',
      amount: '★★★★★',
      time: '3 hours ago',
      type: 'review',
      icon: FiStar,
      color: 'yellow'
    }
  ])

  // Goals
  const goals = [
    { label: 'Monthly Revenue', current: 185000, target: 200000, unit: '$', color: 'blue' },
    { label: 'New Customers', current: 245, target: 300, unit: '', color: 'green' },
    { label: 'Orders', current: 1248, target: 1500, unit: '', color: 'purple' },
    { label: 'Conversion Rate', current: 3.2, target: 3.5, unit: '%', color: 'orange' }
  ]

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        revenue: { ...prev.revenue, current: prev.revenue.current + Math.floor(Math.random() * 100) },
        orders: { ...prev.orders, current: prev.orders.current + Math.floor(Math.random() * 5) }
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status) => {
    const badges = {
      delivered: 'bg-green-500/10 text-green-500 border border-green-500/20',
      shipped: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      processing: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
      pending: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
      cancelled: 'bg-red-500/10 text-red-500 border border-red-500/20'
    }
    return badges[status] || 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
  }

  const getProgressColor = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500'
    }
    return colors[color] || 'bg-blue-500'
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden glass-card p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold">
                Welcome back, Admin! 👋
              </h1>
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-semibold border border-green-500/20">
                Online
              </span>
            </div>
            <p className="text-gray-400">
              Here's what's happening with your store today.
              <span className="block sm:inline text-blue-400 ml-2">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none text-sm"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            
            <button
              onClick={() => setIsLoading(!isLoading)}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2 group"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              <FiRefreshCw className={`w-4 h-4 group-hover:rotate-180 transition-transform duration-500 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            
            <button
              onClick={() => showToast?.('📊 Dashboard data exported successfully!', 'success')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-all flex items-center gap-2"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              <FiDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          <QuickStat
            label="Revenue"
            value={`$${stats.revenue.current.toLocaleString()}`}
            change={stats.revenue.change}
            trend="up"
            color="from-blue-500 to-purple-500"
          />
          <QuickStat
            label="Orders"
            value={stats.orders.current}
            change={stats.orders.change}
            trend="up"
            color="from-green-500 to-emerald-500"
          />
          <QuickStat
            label="Customers"
            value={stats.customers.current}
            change={stats.customers.change}
            trend="up"
            color="from-purple-500 to-pink-500"
          />
          <QuickStat
            label="Conversion"
            value={`${stats.conversion.current}%`}
            change={stats.conversion.change}
            trend="up"
            color="from-yellow-500 to-orange-500"
          />
          <QuickStat
            label="AOV"
            value={`$${stats.aov.current}`}
            change={stats.aov.change}
            trend="up"
            color="from-cyan-500 to-blue-500"
          />
          <QuickStat
            label="Profit"
            value={`$${stats.profit.current.toLocaleString()}`}
            change={stats.profit.change}
            trend="up"
            color="from-indigo-500 to-purple-500"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={`$${stats.revenue.current.toLocaleString()}`}
          previousValue={`$${stats.revenue.previous.toLocaleString()}`}
          change={stats.revenue.change}
          target={`$${stats.revenue.target.toLocaleString()}`}
          icon={FiDollarSign}
          color="from-blue-500 to-purple-500"
          chart={salesData[dateRange].slice(0, 4)}
        />
        <KPICard
          title="Total Orders"
          value={stats.orders.current}
          previousValue={stats.orders.previous}
          change={stats.orders.change}
          target={stats.orders.target}
          icon={FiShoppingBag}
          color="from-green-500 to-emerald-500"
          chart={salesData[dateRange].slice(0, 4)}
        />
        <KPICard
          title="Total Customers"
          value={stats.customers.current}
          previousValue={stats.customers.previous}
          change={stats.customers.change}
          target={stats.customers.target}
          icon={FiUsers}
          color="from-purple-500 to-pink-500"
          chart={salesData[dateRange].slice(0, 4)}
        />
        <KPICard
          title="Conversion Rate"
          value={`${stats.conversion.current}%`}
          previousValue={`${stats.conversion.previous}%`}
          change={stats.conversion.change}
          target={`${stats.conversion.target}%`}
          icon={FiTarget}
          color="from-yellow-500 to-orange-500"
          chart={salesData[dateRange].slice(0, 4)}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FiActivity className="w-5 h-5 text-blue-400" />
                Sales Overview
              </h3>
              <p className="text-sm text-gray-400">Monthly sales performance vs last year</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 p-1 bg-white/5 rounded-lg">
                <button
                  onClick={() => setSelectedMetric('revenue')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${selectedMetric === 'revenue' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'text-gray-400 hover:text-white'}`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setSelectedMetric('orders')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${selectedMetric === 'orders' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'text-gray-400 hover:text-white'}`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setSelectedMetric('customers')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${selectedMetric === 'customers' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'text-gray-400 hover:text-white'}`}
                >
                  Customers
                </button>
              </div>
              
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <FiMoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="h-80 relative">
            {/* Chart Placeholder - Ready for Chart.js/Recharts */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-end gap-2 h-40 mb-4">
                  {salesData[dateRange].slice(0, 7).map((value, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div 
                        className="w-12 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-500 hover:scale-105"
                        style={{ height: `${(value / Math.max(...salesData[dateRange])) * 150}px` }}
                      ></div>
                      <span className="text-xs text-gray-500">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-400">📊 Interactive chart ready for Chart.js integration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FiGlobe className="w-5 h-5 text-green-400" />
                Traffic Sources
              </h3>
              <p className="text-sm text-gray-400">Total 129.2K visitors</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <FiMoreVertical className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">{source.source}</span>
                  <span className="text-sm font-semibold">{source.visitors.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white/5 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${source.color} transition-all duration-500`}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400">{source.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-400">Conversion Rate</span>
                <div className="text-2xl font-bold text-green-400">3.2%</div>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-400">Bounce Rate</span>
                <div className="text-2xl font-bold text-orange-400">42.5%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FiPackage className="w-5 h-5" />
                Recent Orders
              </h3>
              <p className="text-sm text-gray-400">You have {recentOrders.filter(o => o.status === 'pending').length} pending orders</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <FiFilter className="w-4 h-4" />
              </button>
              <button 
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                onClick={() => showToast?.('📋 Navigating to orders page...', 'info')}
              >
                View All <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-400 border-b border-white/10">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 text-sm font-medium">{order.id}</td>
                    <td className="py-3">
                      <div>
                        <div className="text-sm">{order.customer}</div>
                        <div className="text-xs text-gray-400">{order.email}</div>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-400">{order.date}</td>
                    <td className="py-3 text-sm font-semibold text-blue-400">${order.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.payment === 'paid' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-orange-500/10 text-orange-400'
                      }`}>
                        {order.payment}
                      </span>
                    </td>
                    <td className="py-3">
                      <button 
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={() => showToast?.(`🔍 Viewing order ${order.id}`, 'info')}
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FiAward className="w-5 h-5 text-yellow-400" />
                Top Products
              </h3>
              <p className="text-sm text-gray-400">Best selling this month</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <FiMoreVertical className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-400">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate max-w-[150px]">{product.name}</span>
                    <span className="text-sm font-semibold text-green-400">
                      ${product.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{product.sales} units</span>
                    <span className="text-xs flex items-center gap-1">
                      <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {product.rating}
                    </span>
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
          
          <button className="w-full mt-4 py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center justify-center gap-2">
            View All Products <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geographic Distribution */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FiMapPin className="w-5 h-5 text-purple-400" />
                Top Locations
              </h3>
              <p className="text-sm text-gray-400">Sales by country</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <FiMoreVertical className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {topLocations.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{location.flag}</span>
                  <div>
                    <span className="text-sm font-medium">{location.country}</span>
                    <div className="text-xs text-gray-400">{location.visitors.toLocaleString()} visitors</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-blue-400">${location.revenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">{location.orders} orders</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">International</span>
              <span className="font-semibold">45.2%</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-400">Domestic</span>
              <span className="font-semibold">54.8%</span>
            </div>
          </div>
        </div>

        {/* Device Statistics */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FiSmartphone className="w-5 h-5 text-blue-400" />
                Devices
              </h3>
              <p className="text-sm text-gray-400">Traffic by device</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <FiMoreVertical className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-6">
            {deviceStats.map((device, index) => {
              const Icon = device.icon
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-${device.color}-500/10 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${device.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{device.device}</span>
                      <span className="text-sm text-gray-400">{device.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-${device.color}-500 transition-all duration-500`}
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      ${device.revenue.toLocaleString()} revenue
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FiClock className="w-5 h-5 text-orange-400" />
                Recent Activity
              </h3>
              <p className="text-sm text-gray-400">Latest store updates</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <FiMoreVertical className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className={`w-8 h-8 rounded-lg bg-${activity.color}-500/10 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 text-${activity.color}-400`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-400"> {activity.action} </span>
                      <span className="font-medium text-blue-400">{activity.target}</span>
                    </div>
                    {activity.amount && (
                      <div className="text-xs text-gray-400 mt-0.5">{activity.amount}</div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <button className="w-full mt-4 py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center justify-center gap-2">
            View All Activity <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Goals & Targets */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiTarget className="w-5 h-5 text-green-400" />
              Monthly Goals
            </h3>
            <p className="text-sm text-gray-400">Track your progress towards targets</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Overall Progress</span>
            <span className="text-lg font-bold text-green-400">68%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal, index) => {
            const percentage = (goal.current / goal.target) * 100
            return (
              <div key={index} className="p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">{goal.label}</span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold">
                      {goal.unit}{goal.current.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 ml-1">
                      / {goal.unit}{goal.target.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(goal.color)} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className="text-gray-400">Remaining</span>
                  <span className="font-medium">
                    {goal.unit}{(goal.target - goal.current).toLocaleString()}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FiActivity className="w-5 h-5 text-blue-400" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <QuickAction 
            icon={FiShoppingBag} 
            label="New Order" 
            desc="Create order"
            color="from-blue-500 to-purple-500"
            onClick={() => showToast?.('🛍️ Creating new order...', 'info')}
          />
          <QuickAction 
            icon={FiBox} 
            label="Add Product" 
            desc="Add to catalog"
            color="from-green-500 to-emerald-500"
            onClick={() => showToast?.('📦 Opening product creator...', 'info')}
          />
          <QuickAction 
            icon={FiUsers} 
            label="Add Customer" 
            desc="New customer"
            color="from-purple-500 to-pink-500"
            onClick={() => showToast?.('👤 Adding new customer...', 'info')}
          />
          <QuickAction 
            icon={FiPercent} 
            label="Create Coupon" 
            desc="Discount code"
            color="from-yellow-500 to-orange-500"
            onClick={() => showToast?.('🏷️ Creating coupon...', 'info')}
          />
          <QuickAction 
            icon={FiFile} 
            label="Generate Report" 
            desc="Export data"
            color="from-red-500 to-pink-500"
            onClick={() => showToast?.('📊 Generating report...', 'info')}
          />
          <QuickAction 
            icon={FiMail} 
            label="Send Email" 
            desc="Newsletter"
            color="from-indigo-500 to-blue-500"
            onClick={() => showToast?.('📧 Opening email composer...', 'info')}
          />
        </div>
      </div>
    </div>
  )
}

// Sub-components
const QuickStat = ({ label, value, change, trend, color }) => (
  <div className="p-3 bg-white/5 rounded-lg">
    <div className="text-xs text-gray-400 mb-1">{label}</div>
    <div className="text-lg font-bold">{value}</div>
    <div className={`flex items-center gap-1 text-xs mt-1 ${
      trend === 'up' ? 'text-green-500' : 'text-red-500'
    }`}>
      {trend === 'up' ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
      <span>{change > 0 ? '+' : ''}{change}%</span>
    </div>
  </div>
)

const KPICard = ({ title, value, previousValue, change, target, icon: Icon, color, chart }) => (
  <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className={`text-sm font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${
        change > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
      }`}>
        {change > 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
        {change > 0 ? '+' : ''}{change}%
      </span>
    </div>
    <div className="flex items-end justify-between">
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-400 mt-1">{title}</div>
      </div>
      <div className="text-right">
        <div className="text-xs text-gray-400">vs last period</div>
        <div className="text-xs font-medium">{previousValue}</div>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-white/10">
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">Target: {target}</span>
        <span className="text-blue-400">${parseInt(value.toString().replace(/[^0-9]/g, '')) / parseInt(target.toString().replace(/[^0-9]/g, '')) * 100}%</span>
      </div>
    </div>
  </div>
)

const QuickAction = ({ icon: Icon, label, desc, color, onClick }) => (
  <button
    onClick={onClick}
    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
  >
    <div className={`w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <span className="text-sm font-medium block">{label}</span>
    <span className="text-xs text-gray-400">{desc}</span>
  </button>
)

import { FiRefreshCw } from 'react-icons/fi'
export default Dashboard
