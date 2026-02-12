import React, { useState, useEffect } from 'react'
import { 
  FiDollarSign, FiShoppingBag, FiUsers, FiBox, FiClock, FiAlertCircle,
  FiTrendingUp, FiTrendingDown, FiPackage, FiTruck, FiCheckCircle,
  FiXCircle, FiBarChart2, FiPieChart, FiActivity, FiCalendar,
  FiArrowRight, FiDownload, FiFilter, FiMoreVertical, FiEye,
  FiStar, FiCreditCard, FiMapPin, FiPhone, FiMail, FiUser
} from 'react-icons/fi'

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('week')
  const [analytics, setAnalytics] = useState({
    revenue: { total: 154200, change: 15.2 },
    orders: { total: 1248, change: 8.7 },
    customers: { total: 892, change: 23.4 },
    conversion: { total: 3.2, change: 0.8 },
    aov: { total: 124, change: 4.2 }
  })

  const [recentOrders] = useState([
    { id: 'ORD-7842', customer: 'John Smith', amount: 1248.00, status: 'delivered', date: '2024-03-15', items: 3 },
    { id: 'ORD-7841', customer: 'Sarah Johnson', amount: 845.50, status: 'processing', date: '2024-03-15', items: 2 },
    { id: 'ORD-7840', customer: 'Michael Brown', amount: 299.99, status: 'shipped', date: '2024-03-14', items: 1 },
    { id: 'ORD-7839', customer: 'Emma Wilson', amount: 1567.80, status: 'pending', date: '2024-03-14', items: 4 },
    { id: 'ORD-7838', customer: 'David Lee', amount: 89.99, status: 'delivered', date: '2024-03-13', items: 1 }
  ])

  const [topProducts] = useState([
    { name: 'Premium Wireless Headphones', sales: 1248, revenue: 374351, trend: 12 },
    { name: 'Smart Fitness Watch', sales: 892, revenue: 178391, trend: 8 },
    { name: 'Organic Coffee Beans', sales: 2156, revenue: 53874, trend: 23 },
    { name: 'Yoga Mat Premium', sales: 745, revenue: 37243, trend: -2 },
    { name: 'Bluetooth Speaker', sales: 623, revenue: 31150, trend: 15 }
  ])

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, Admin! 👋
            </h1>
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
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none text-sm"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              onClick={() => window.location.reload()}
            >
              <FiDownload className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`$${analytics.revenue.total.toLocaleString()}`}
          change={analytics.revenue.change}
          icon={FiDollarSign}
          color="from-blue-500 to-purple-500"
        />
        <MetricCard
          title="Total Orders"
          value={analytics.orders.total}
          change={analytics.orders.change}
          icon={FiShoppingBag}
          color="from-green-500 to-emerald-500"
        />
        <MetricCard
          title="Total Customers"
          value={analytics.customers.total}
          change={analytics.customers.change}
          icon={FiUsers}
          color="from-purple-500 to-pink-500"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${analytics.conversion.total}%`}
          change={analytics.conversion.change}
          icon={FiTrendingUp}
          color="from-yellow-500 to-orange-500"
        />
        <MetricCard
          title="Average Order"
          value={`$${analytics.aov.total}`}
          change={analytics.aov.change}
          icon={FiCreditCard}
          color="from-cyan-500 to-blue-500"
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
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <FiFilter className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <FiMoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="h-80 flex items-center justify-center text-gray-400 border-2 border-dashed border-white/10 rounded-xl">
            <div className="text-center">
              <FiBarChart2 className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p>Sales Chart Ready for Integration</p>
              <p className="text-sm mt-2">Connect Chart.js or Recharts</p>
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
          <div className="h-80 flex items-center justify-center text-gray-400 border-2 border-dashed border-white/10 rounded-xl">
            <div className="text-center">
              <FiPieChart className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p>Category Chart Ready for Integration</p>
              <p className="text-sm mt-2">Connect Chart.js or Recharts</p>
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
            <button 
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              View All <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div 
                key={order.id} 
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <FiPackage className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-gray-400 flex items-center gap-2">
                      <FiUser className="w-3 h-3" /> {order.customer}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-semibold">${order.amount.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">{order.items} items</div>
                  </div>
                  <div className="w-24">
                    <span className={`status-badge ${
                      order.status === 'delivered' ? 'status-completed' :
                      order.status === 'shipped' ? 'status-processing' :
                      order.status === 'pending' ? 'status-pending' :
                      'status-pending'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <FiEye className="w-4 h-4 text-gray-400 hover:text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiStar className="w-5 h-5 text-yellow-400" />
              Top Products
            </h3>
            <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View All <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 text-center font-bold text-gray-400">#{index + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate pr-2">{product.name}</span>
                    <span className="text-sm font-semibold text-blue-400">
                      ${product.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{product.sales} units</span>
                    <span className={`text-xs flex items-center gap-1 ${
                      product.trend > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {product.trend > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                      {Math.abs(product.trend)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FiActivity className="w-5 h-5 text-blue-400" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <QuickAction icon={FiShoppingBag} label="New Order" color="from-blue-500 to-purple-500" />
          <QuickAction icon={FiUsers} label="Add Customer" color="from-green-500 to-emerald-500" />
          <QuickAction icon={FiBox} label="Add Product" color="from-yellow-500 to-orange-500" />
          <QuickAction icon={FiPercent} label="Create Coupon" color="from-pink-500 to-red-500" />
          <QuickAction icon={FiTruck} label="Track Shipment" color="from-indigo-500 to-blue-500" />
          <QuickAction icon={FiDownload} label="Export Report" color="from-purple-500 to-pink-500" />
        </div>
      </div>
    </div>
  )
}

const MetricCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
    <div className="flex items-center justify-between mb-3">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
        change > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
      }`}>
        {change > 0 ? '+' : ''}{change}%
      </span>
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-gray-400">{title}</div>
  </div>
)

const QuickAction = ({ icon: Icon, label, color }) => (
  <button 
    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
  >
    <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <span className="text-sm font-medium">{label}</span>
  </button>
)

export default Dashboard
