import { useState } from 'react'
import StatsCard from '../components/StatsCard'
import ChartCard from '../components/ChartCard'
import DataTable from '../components/DataTable'
import { 
  FiDollarSign, 
  FiUsers, 
  FiShoppingCart, 
  FiAlertTriangle,
  FiTrendingUp,
  FiTrendingDown
} from 'react-icons/fi'

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('last30days')

  const stats = [
    {
      title: 'Total Revenue',
      value: 24589,
      change: 12.5,
      icon: FiDollarSign,
      color: 'from-blue-500 to-purple-500',
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: 1248,
      change: 8.2,
      icon: FiUsers,
      color: 'from-green-500 to-emerald-500',
      trend: 'up'
    },
    {
      title: 'New Orders',
      value: 342,
      change: -3.1,
      icon: FiShoppingCart,
      color: 'from-yellow-500 to-orange-500',
      trend: 'down'
    },
    {
      title: 'Pending Issues',
      value: 12,
      change: -25,
      icon: FiAlertTriangle,
      color: 'from-red-500 to-pink-500',
      trend: 'down'
    }
  ]

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const trafficData = {
    labels: ['Direct', 'Organic', 'Social', 'Email', 'Referral'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#f97316',
          '#f59e0b'
        ]
      }
    ]
  }

  const orders = [
    {
      id: 'ORD-7842',
      customer: 'John Smith',
      date: '2024-03-15',
      amount: 1248.00,
      status: 'completed'
    },
    {
      id: 'ORD-7841',
      customer: 'Sarah Johnson',
      date: '2024-03-15',
      amount: 845.50,
      status: 'processing'
    },
    {
      id: 'ORD-7840',
      customer: 'Michael Brown',
      date: '2024-03-14',
      amount: 2415.00,
      status: 'completed'
    },
    {
      id: 'ORD-7839',
      customer: 'Emma Wilson',
      date: '2024-03-14',
      amount: 623.75,
      status: 'cancelled'
    }
  ]

  const orderColumns = [
    { 
      key: 'id', 
      title: 'Order ID',
      className: 'min-w-[100px] md:min-w-[120px]' 
    },
    { 
      key: 'customer', 
      title: 'Customer',
      className: 'min-w-[120px] md:min-w-[150px]' 
    },
    { 
      key: 'date', 
      title: 'Date',
      className: 'min-w-[100px] md:min-w-[120px]',
      render: (value) => (
        <span className="text-sm">
          {new Date(value).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
      )
    },
    { 
      key: 'amount', 
      title: 'Amount',
      className: 'min-w-[90px] md:min-w-[100px]',
      render: (value) => (
        <span className="font-semibold text-sm md:text-base">
          ${value.toFixed(2)}
        </span>
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      className: 'min-w-[100px] md:min-w-[120px]',
      render: (value) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
          value === 'processing' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
          'bg-red-500/10 text-red-500 border border-red-500/20'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 md:mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-1 md:mb-2">
          Dashboard Overview
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-400">
          Welcome back, John! Here's what's happening with your business today.
        </p>
      </div>

      {/* Date Range */}
      <div className="glass-card p-3 sm:p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold">Performance Overview</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Last 30 days</p>
          </div>
          <div className="w-full sm:w-auto">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="form-input w-full sm:w-48 text-sm md:text-base"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thismonth">This Month</option>
              <option value="lastmonth">Last Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card p-3 sm:p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-400 mb-1 truncate">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold truncate">
                    {stat.title.includes('Revenue') ? '$' : ''}{stat.value.toLocaleString()}
                  </h3>
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {stat.trend === 'up' ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 ml-3`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <ChartCard
          title="Revenue Overview"
          type="line"
          data={revenueData}
          action="View Details"
          height={250}
        />
        
        <ChartCard
          title="Traffic Sources"
          type="doughnut"
          data={trafficData}
          action="Refresh"
          height={250}
        />
        
        <ChartCard
          title="User Acquisition"
          type="bar"
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'New Users',
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: 'rgba(59, 130, 246, 0.7)',
              borderColor: '#3b82f6',
              borderWidth: 2
            }]
          }}
          action="Daily"
          height={250}
        />
        
        <ChartCard
          title="Top Products"
          type="bar"
          data={{
            labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
            datasets: [{
              label: 'Sales',
              data: [45, 38, 29, 24, 18],
              backgroundColor: 'rgba(139, 92, 246, 0.7)',
              borderColor: '#8b5cf6',
              borderWidth: 2
            }]
          }}
          action="By Revenue"
          height={250}
        />
      </div>

      {/* Recent Orders Table */}
      <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="p-4 md:p-6 border-b border-white/10">
          <h3 className="text-lg md:text-xl font-bold">Recent Orders</h3>
        </div>
        <div className="min-w-full">
          <div className="min-w-[600px] md:min-w-0">
            <div className="grid grid-cols-5 gap-4 p-4 md:p-6 border-b border-white/10 bg-white/5">
              {orderColumns.map((col) => (
                <div key={col.key} className={`font-semibold text-xs md:text-sm text-gray-400 ${col.className || ''}`}>
                  {col.title}
                </div>
              ))}
            </div>
            
            {orders.map((order, index) => (
              <div 
                key={order.id}
                className={`grid grid-cols-5 gap-4 p-4 md:p-6 border-b border-white/10 hover:bg-white/5 transition-colors ${index === orders.length - 1 ? 'border-b-0' : ''}`}
              >
                {orderColumns.map((col) => (
                  <div key={col.key} className={col.className || ''}>
                    {col.render ? col.render(order[col.key]) : (
                      <span className="text-sm md:text-base">{order[col.key]}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
