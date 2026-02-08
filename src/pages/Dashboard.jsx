import { useState } from 'react'
import StatsCard from '../components/StatsCard'
import ChartCard from '../components/ChartCard'
import DataTable from '../components/DataTable'
import { 
  FiDollarSign, 
  FiUsers, 
  FiShoppingCart, 
  FiAlertTriangle
} from 'react-icons/fi'

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('last30days')

  const stats = [
    {
      title: 'Total Revenue',
      value: 24589,
      change: 12.5,
      icon: FiDollarSign,
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Active Users',
      value: 1248,
      change: 8.2,
      icon: FiUsers,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'New Orders',
      value: 342,
      change: -3.1,
      icon: FiShoppingCart,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Pending Issues',
      value: 12,
      change: -25,
      icon: FiAlertTriangle,
      color: 'from-red-500 to-pink-500'
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
    { key: 'id', title: 'Order ID', className: 'min-w-[120px]' },
    { key: 'customer', title: 'Customer', className: 'min-w-[150px]' },
    { 
      key: 'date', 
      title: 'Date',
      className: 'min-w-[120px]',
      render: (value) => new Date(value).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    },
    { 
      key: 'amount', 
      title: 'Amount',
      className: 'min-w-[100px]',
      render: (value) => `$${value.toFixed(2)}`
    },
    { 
      key: 'status', 
      title: 'Status',
      className: 'min-w-[120px]',
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
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Dashboard Overview</h1>
        <p className="text-sm sm:text-base text-gray-400">Welcome back, John! Here's what's happening with your business today.</p>
      </div>

      {/* Date Range */}
      <div className="glass-card p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold">Performance Overview</h3>
            <p className="text-xs sm:text-sm text-gray-400">Last 30 days</p>
          </div>
          <div className="w-full sm:w-auto">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="form-input w-full sm:w-48"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
            isCurrency={stat.title.includes('Revenue')}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
      <div className="w-full overflow-x-auto">
        <DataTable
          title="Recent Orders"
          columns={orderColumns}
          data={orders}
          actions={true}
        />
      </div>
    </div>
  )
}

export default Dashboard
