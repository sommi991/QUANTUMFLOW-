import { useState, useEffect } from 'react'
import { 
  FiDollarSign, 
  FiUsers, 
  FiShoppingCart, 
  FiAlertTriangle,
  FiTrendingUp,
  FiTrendingDown,
  FiFilter,
  FiDownload,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiEye,
  FiRefreshCw,
  FiCheckCircle,
  FiXCircle,
  FiMoreVertical
} from 'react-icons/fi'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('last30days')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeOrders, setActiveOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [stats, setStats] = useState([
    {
      title: 'Total Revenue',
      value: 24589,
      change: 12.5,
      icon: FiDollarSign,
      color: 'from-blue-500 to-purple-500',
      trend: 'up',
      isCurrency: true
    },
    {
      title: 'Active Users',
      value: 1248,
      change: 8.2,
      icon: FiUsers,
      color: 'from-green-500 to-emerald-500',
      trend: 'up',
      isCurrency: false
    },
    {
      title: 'New Orders',
      value: 342,
      change: -3.1,
      icon: FiShoppingCart,
      color: 'from-yellow-500 to-orange-500',
      trend: 'down',
      isCurrency: false
    },
    {
      title: 'Pending Issues',
      value: 12,
      change: -25,
      icon: FiAlertTriangle,
      color: 'from-red-500 to-pink-500',
      trend: 'down',
      isCurrency: false
    }
  ])
  
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [chartData, setChartData] = useState(null)

  // Initialize with sample data
  const initialOrders = [
    {
      id: 'ORD-7842',
      customer: 'John Smith',
      email: 'john@example.com',
      date: '2024-03-15',
      amount: 1248.00,
      status: 'completed',
      items: 3,
      lastUpdated: '10 minutes ago'
    },
    {
      id: 'ORD-7841',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      date: '2024-03-15',
      amount: 845.50,
      status: 'processing',
      items: 5,
      lastUpdated: '25 minutes ago'
    },
    {
      id: 'ORD-7840',
      customer: 'Michael Brown',
      email: 'michael@example.com',
      date: '2024-03-14',
      amount: 2415.00,
      status: 'completed',
      items: 8,
      lastUpdated: '1 hour ago'
    },
    {
      id: 'ORD-7839',
      customer: 'Emma Wilson',
      email: 'emma@example.com',
      date: '2024-03-14',
      amount: 623.75,
      status: 'cancelled',
      items: 2,
      lastUpdated: '2 hours ago'
    },
    {
      id: 'ORD-7838',
      customer: 'David Lee',
      email: 'david@example.com',
      date: '2024-03-13',
      amount: 1540.25,
      status: 'processing',
      items: 4,
      lastUpdated: '3 hours ago'
    }
  ]

  useEffect(() => {
    setActiveOrders(initialOrders)
    initializeChartData()
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      updateRandomStats()
    }, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const initializeChartData = () => {
    setChartData({
      revenue: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      traffic: {
        labels: ['Direct', 'Organic', 'Social', 'Email', 'Referral'],
        datasets: [{
          data: [35, 25, 20, 15, 5],
          backgroundColor: [
            '#3b82f6',
            '#8b5cf6',
            '#ec4899',
            '#f97316',
            '#f59e0b'
          ]
        }]
      }
    })
  }

  const updateRandomStats = () => {
    setStats(prev => prev.map(stat => {
      const randomChange = Math.random() > 0.5 ? 
        (Math.random() * 10).toFixed(1) : 
        -(Math.random() * 5).toFixed(1)
      
      const randomValue = stat.isCurrency ? 
        stat.value + Math.floor(Math.random() * 100) :
        stat.value + Math.floor(Math.random() * 10)
      
      return {
        ...stat,
        value: randomValue,
        change: parseFloat(randomChange),
        trend: randomChange >= 0 ? 'up' : 'down'
      }
    }))
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    
    // Simulate API call
    setTimeout(() => {
      updateRandomStats()
      setIsRefreshing(false)
      
      // Show success notification
      showNotification('Data refreshed successfully!', 'success')
    }, 1000)
  }

  const handleExportData = () => {
    setIsLoading(true)
    
    // Simulate export process
    setTimeout(() => {
      const dataStr = JSON.stringify(activeOrders, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileDefaultName = `dashboard-data-${new Date().toISOString().split('T')[0]}.json`
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
      
      setIsLoading(false)
      showNotification('Data exported successfully!', 'success')
    }, 1500)
  }

  const handleAddOrder = () => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      customer: `Customer ${Math.floor(Math.random() * 1000)}`,
      email: `customer${Math.floor(Math.random() * 1000)}@example.com`,
      date: new Date().toISOString().split('T')[0],
      amount: Math.floor(Math.random() * 2000) + 100,
      status: 'processing',
      items: Math.floor(Math.random() * 10) + 1,
      lastUpdated: 'Just now'
    }
    
    setActiveOrders(prev => [newOrder, ...prev])
    showNotification(`New order ${newOrder.id} added!`, 'success')
  }

  const handleDeleteOrder = (orderId) => {
    setOrderToDelete(orderId)
    setShowDeleteModal(true)
  }

  const confirmDeleteOrder = () => {
    setActiveOrders(prev => prev.filter(order => order.id !== orderToDelete))
    setShowDeleteModal(false)
    setOrderToDelete(null)
    showNotification('Order deleted successfully!', 'success')
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setShowOrderModal(true)
  }

  const handleUpdateStatus = (orderId, newStatus) => {
    setActiveOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus, lastUpdated: 'Just now' } : order
    ))
    showNotification(`Order ${orderId} status updated to ${newStatus}!`, 'success')
  }

  const handleDateRangeChange = (range) => {
    setDateRange(range)
    setIsLoading(true)
    
    // Simulate data loading for different date ranges
    setTimeout(() => {
      setStats(prev => prev.map(stat => ({
        ...stat,
        value: stat.value + Math.floor(Math.random() * (range === 'today' ? 10 : 100))
      })))
      setIsLoading(false)
      showNotification(`Data filtered for ${range}!`, 'info')
    }, 800)
  }

  const filteredOrders = activeOrders.filter(order => 
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const showNotification = (message, type = 'info') => {
    // You can implement a proper notification system here
    alert(`${type.toUpperCase()}: ${message}`)
  }

  const orderColumns = [
    { 
      key: 'id', 
      title: 'Order ID',
      className: 'min-w-[120px]' 
    },
    { 
      key: 'customer', 
      title: 'Customer',
      className: 'min-w-[150px]',
      render: (value, order) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-gray-400 truncate">{order.email}</div>
        </div>
      )
    },
    { 
      key: 'date', 
      title: 'Date',
      className: 'min-w-[100px]',
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
      className: 'min-w-[100px]',
      render: (value) => (
        <span className="font-semibold text-blue-400">
          ${value.toFixed(2)}
        </span>
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      className: 'min-w-[120px]',
      render: (value, order) => (
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            value === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
            value === 'processing' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
            'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
          <span className="text-xs text-gray-400">{order.lastUpdated}</span>
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      className: 'min-w-[140px]',
      render: (_, order) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewOrder(order)}
            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
            title="View Details"
          >
            <FiEye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleUpdateStatus(order.id, order.status === 'completed' ? 'processing' : 'completed')}
            className={`p-2 rounded-lg transition-colors ${
              order.status === 'completed' 
                ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' 
                : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
            }`}
            title={order.status === 'completed' ? 'Mark as Processing' : 'Mark as Completed'}
          >
            {order.status === 'completed' ? <FiRefreshCw className="w-4 h-4" /> : <FiCheckCircle className="w-4 h-4" />}
          </button>
          <button
            onClick={() => handleDeleteOrder(order.id)}
            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
            title="Delete Order"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#a0a0d0',
          font: {
            size: 12
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#a0a0d0'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#a0a0d0'
        }
      }
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-400">
              Welcome back, Admin! Manage your business in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={handleExportData}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              <FiDownload className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="glass-card p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleAddOrder}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Add New Order
            </button>
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select 
                value={dateRange}
                onChange={(e) => handleDateRangeChange(e.target.value)}
                className="form-input pl-10 w-48"
                disabled={isLoading}
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
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pl-10 w-64"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Live Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="glass-card p-5 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            onClick={() => showNotification(`Clicked on ${stat.title}: $${stat.value} (${stat.change}% ${stat.trend})`)}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">
                    {stat.isCurrency ? '$' : ''}{stat.value.toLocaleString()}
                  </h3>
                  <span className={`inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {stat.trend === 'up' ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              Updated just now • Click for details
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="glass-card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Revenue Overview</h3>
            <button 
              onClick={() => showNotification('Revenue chart details')}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              View Details
            </button>
          </div>
          <div className="h-64">
            {chartData?.revenue && (
              <Line data={chartData.revenue} options={chartOptions} />
            )}
          </div>
        </div>

        {/* Traffic Sources Chart */}
        <div className="glass-card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Traffic Sources</h3>
            <button 
              onClick={() => showNotification('Traffic sources refreshed')}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <FiRefreshCw className="w-3 h-3" />
              Refresh
            </button>
          </div>
          <div className="h-64">
            {chartData?.traffic && (
              <Doughnut data={chartData.traffic} options={chartOptions} />
            )}
          </div>
        </div>
      </div>

      {/* Interactive Orders Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Recent Orders</h3>
            <p className="text-sm text-gray-400">Click on orders to manage them</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              Showing {filteredOrders.length} of {activeOrders.length} orders
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {orderColumns.map((col) => (
                  <th key={col.key} className={`p-4 text-left text-sm font-semibold text-gray-400 ${col.className}`}>
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => handleViewOrder(order)}
                >
                  {orderColumns.map((col) => (
                    <td key={col.key} className={`p-4 ${col.className}`}>
                      {col.render ? col.render(order[col.key], order) : order[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No orders found. Try a different search or add a new order.
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Order Details: {selectedOrder.id}</h3>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <FiXCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Customer</label>
                    <p className="font-medium">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="font-medium">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Amount</label>
                    <p className="text-xl font-bold text-blue-400">${selectedOrder.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <p className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedOrder.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                      selectedOrder.status === 'processing' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-semibold mb-3">Quick Actions</h4>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        handleUpdateStatus(selectedOrder.id, 'completed')
                        setShowOrderModal(false)
                      }}
                      className="px-4 py-2 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20 flex items-center gap-2"
                    >
                      <FiCheckCircle className="w-4 h-4" />
                      Mark as Completed
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteOrder(selectedOrder.id)
                        setShowOrderModal(false)
                      }}
                      className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 flex items-center gap-2"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      Delete Order
                    </button>
                    <button
                      onClick={() => showNotification(`Invoice for ${selectedOrder.id} generated!`)}
                      className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border border-blue-500/20 flex items-center gap-2"
                    >
                      <FiDownload className="w-4 h-4" />
                      Generate Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                  <FiTrash2 className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Delete Order</h3>
                <p className="text-gray-400">
                  Are you sure you want to delete order {orderToDelete}? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteOrder}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
                >
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
