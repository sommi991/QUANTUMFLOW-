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
      color: 'bg-gradient-to-br from-primary-blue to-primary-purple'
    },
    {
      title: 'Active Users',
      value: 1248,
      change: 8.2,
      icon: FiUsers,
      color: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    {
      title: 'New Orders',
      value: 342,
      change: -3.1,
      icon: FiShoppingCart,
      color: 'bg-gradient-to-br from-yellow-500 to-orange-500'
    },
    {
      title: 'Pending Issues',
      value: 12,
      change: -25,
      icon: FiAlertTriangle,
      color: 'bg-gradient-to-br from-red-500 to-pink-500'
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
    { key: 'id', title: 'Order ID' },
    { key: 'customer', title: 'Customer' },
    { 
      key: 'date', 
      title: 'Date',
      render: (value) => new Date(value).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    },
    { 
      key: 'amount', 
      title: 'Amount',
      render: (value) => `$${value.toFixed(2)}`
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (value) => (
        <span className={`status-badge ${
          value === 'completed' ? 'status-active' :
          value === 'processing' ? 'status-pending' :
          'status-inactive'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back, John! Here's what's happening with your business today.</p>
      </div>

      {/* Date Range */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">Performance Overview</h3>
            <p className="text-sm text-gray-400">Last 30 days</p>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="form-input w-48"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            {...stat}
            isCurrency={index === 0}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Revenue Overview"
          type="line"
          data={revenueData}
        />
        
        <ChartCard
          title="Traffic Sources"
          type="doughnut"
          data={trafficData}
          action="Refresh"
        />
      </div>

      {/* Recent Orders */}
      <DataTable
        title="Recent Orders"
        columns={orderColumns}
        data={orders}
        onView={(row) => console.log('View:', row)}
        onEdit={(row) => console.log('Edit:', row)}
        onDelete={(row) => console.log('Delete:', row)}
      />
    </div>
  )
}

export default Dashboard