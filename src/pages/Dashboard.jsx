import { useStimport { useState, useEffect } from 'react'
import { 
  FiDollarSign, 
  FiUsers, 
  FiShoppingCart, 
  FiAlertTriangle,
  FiTrendingUp,
  FiTrendingDown,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2,
  FiCheck,
  FiX,
  FiPlus,
  FiMoreVertical,
  FiSearch
} from 'react-icons/fi'
import ChartCard from '../components/ChartCard'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import { formatCurrency, formatDate, generateOrderId } from '../utils/helpers'

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('last30days')
  const [orders, setOrders] = useState([
    {
      id: 'ORD-7842',
      customer: 'John Smith',
      email: 'john@example.com',
      date: '2024-03-15',
      amount: 1248.00,
      status: 'completed',
      items: 3
    },
    {
      id: 'ORD-7841',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      date: '2024-03-15',
      amount: 845.50,
      status: 'processing',
      items: 2
    },
    {
      id: 'ORD-7840',
      customer: 'Michael Brown',
      email: 'michael@example.com',
      date: '2024-03-14',
      amount: 2415.00,
      status: 'completed',
      items: 5
    },
    {
      id: 'ORD-7839',
      customer: 'Emma Wilson',
      email: 'emma@example.com',
      date: '2024-03-14',
      amount: 623.75,
      status: 'cancelled',
      items: 1
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newOrder, setNewOrder] = useState({
    customer: '',
    email: '',
    amount: '',
    status: 'processing',
    items: 1
  })
  const [toast, setToast] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Dynamic stats based on orders
  const [stats, setStats] = useState([
    {
      title: 'Total Revenue',
      value: 0,
      change: 12.5,
      icon: FiDollarSign,
      color: 'from-blue-500 to-purple-500',
      trend: 'up',
      prefix: '$'
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
      value: 0,
      change: -3.1,
      icon: FiShoppingCart,
      color: 'from-yellow-500 to-orange-500',
      trend: 'down'
    },
    {
      title: 'Pending Issues',
      value: 0,
      change: -25,
      icon: FiAlertTriangle,
      color: 'from-red-500 to-pink-500',
      trend: 'down'
    }
  ])

  // Calculate stats from orders data
  useEffect(() => {
    const totalRevenue = orders.reduce((sum, order) => 
      order.status !== 'cancelled' ? sum + order.amount : sum, 0
    )
    const newOrdersCount = orders.filter(order => 
      order.status === 'processing'
    ).length
    const pendingIssues = orders.filter(order => 
      order.status === 'cancelled'
    ).length

    setStats(prev => prev.map(stat => {
      if (stat.title === 'Total Revenue') return { ...stat, value: totalRevenue }
      if (stat.title === 'New Orders') return { ...stat, value: newOrdersCount }
      if (stat.title === 'Pending Issues') return { ...stat, value: pendingIssues }
      return stat
    }))
  }, [orders])

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  // Chart data - dynamic based on orders
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: orders.length > 0 ? [
          12000, 19000, 15000, 
          Math.max(25000, orders[0]?.amount || 0), 
          22000, 30000, 28000
        ] : [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const handleAddOrder = () => {
    if (!newOrder.customer || !newOrder.email || !newOrder.amount) {
      showToast('error', 'Validation Error', 'Please fill all required fields')
      return
    }

    const order = {
      id: generateOrderId(),
      ...newOrder,
      amount: parseFloat(newOrder.amount),
      date: new Date().toISOString().split('T')[0],
      items: parseInt(newOrder.items)
    }

    setOrders(prev => [order, ...prev])
    setNewOrder({
      customer: '',
      email: '',
      amount: '',
      status: 'processing',
      items: 1
    })
    setIsAddModalOpen(false)
    showToast('success', 'Order Added', `Order ${order.id} has been created`)
  }

  const handleEditOrder = () => {
    if (!selectedOrder) return

    setOrders(prev => prev.map(order => 
      order.id === selectedOrder.id ? selectedOrder : order
    ))
    
    setIsEditModalOpen(false)
    setSelectedOrder(null)
    showToast('success', 'Order Updated', `Order ${selectedOrder.id} has been updated`)
  }

  const handleDeleteOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId))
    setIsDeleteModalOpen(false)
    showToast('warning', 'Order Deleted', 'Order has been removed')
  }

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    showToast('info', 'Status Updated', `Order status changed to ${newStatus}`)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
      showToast('success', 'Data Refreshed', 'Dashboard data has been updated')
    }, 1500)
  }

  const handleExportData = () => {
    // Simulate export functionality
    showToast('info', 'Export Started', 'Data export will begin shortly')
    setTimeout(() => {
      showToast('success', 'Export Complete', 'Data has been exported to CSV')
    }, 2000)
  }

  const showToast = (type, title, message) => {
    setToast({ type, title, message })
    setTimeout(() => setToast(null), 5000)
  }

  const orderColumns = [
    { 
      key: 'id', 
      title: 'Order ID',
      className: 'min-w-[120px]',
      render: (value) => (
        <span className="font-mono text-sm font-semibold text-blue-400">
          {value}
        </span>
      )
    },
    { 
      key: 'customer', 
      title: 'Customer',
      className: 'min-w-[150px]',
      render: (value, order) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-gray-400">{order.email}</div>
        </div>
      )
    },
    { 
      key: 'date', 
      title: 'Date',
      className: 'min-w-[120px]',
      render: (value) => (
        <div className="text-sm">
          {formatDate(value)}
          <div className="text-xs text-gray-400">
            {new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      )
    },
    { 
      key: 'amount', 
      title: 'Amount',
      className: 'min-w-[100px]',
      render: (value) => (
        <span className="font-semibold text-base">
          {formatCurrency(value)}
        </span>
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      className: 'min-w-[120px]',
      render: (value, order) => (
        <div className="flex items-center gap-2">
          <select
            value={value}
            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${
              value === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
              value === 'processing' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
              'bg-red-500/10 text-red-500 border-red-500/20'
            } focus:outline-none focus:ring-1 focus:ring-current`}
          >
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
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
            onClick={() => {
              setSelectedOrder(order)
              setIsEditModalOpen(true)
            }}
            className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
            title="Edit order"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedOrder(order)
              setIsDeleteModalOpen(true)
            }}
            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
            title="Delete order"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 transition-colors">
            <FiMoreVertical className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-1">
              Dashboard Overview
            </h1>
            <p className="text-sm md:text-base text-gray-400">
              Welcome back, John! Manage your orders and track performance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={handleExportData}
              className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition-colors flex items-center gap-2"
            >
              <FiDownload className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Date Range & Quick Stats */}
      <div className="glass-card p-4 md:p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold">Performance Overview</h3>
            <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
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
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              New Order
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            onClick={() => showToast('info', stat.title, `Current value: ${stat.prefix || ''}${stat.value.toLocaleString()}`)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl md:text-2xl font-bold">
                    {stat.prefix || ''}{stat.value.toLocaleString()}
                  </h3>
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {stat.trend === 'up' ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {stat.trend === 'up' ? 'Increase from last period' : 'Decrease from last period'}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center ml-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Revenue Overview"
          type="line"
          data={revenueData}
          action={{
            label: "View Details",
            onClick: () => showToast('info', 'Revenue Details', 'Click to view detailed revenue analytics')
          }}
          height={280}
        />
        
        <ChartCard
          title="Order Status Distribution"
          type="doughnut"
          data={{
            labels: ['Completed', 'Processing', 'Cancelled'],
            datasets: [{
              data: [
                orders.filter(o => o.status === 'completed').length,
                orders.filter(o => o.status === 'processing').length,
                orders.filter(o => o.status === 'cancelled').length
              ],
              backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
            }]
          }}
          action={{
            label: "Refresh",
            onClick: handleRefresh
          }}
          height={280}
        />
      </div>

      {/* Recent Orders Table */}
      <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="p-4 md:p-6 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold">Recent Orders ({filteredOrders.length})</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10 w-full sm:w-64"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-input w-full sm:w-40"
              >
                <option value="all">All Status</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {orderColumns.map((col) => (
                  <th key={col.key} className={`p-4 text-left text-xs font-semibold text-gray-400 ${col.className || ''}`}>
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr 
                    key={order.id}
                    className={`border-b border-white/10 hover:bg-white/5 transition-colors ${index === filteredOrders.length - 1 ? 'border-b-0' : ''}`}
                  >
                    {orderColumns.map((col) => (
                      <td key={col.key} className={`p-4 ${col.className || ''}`}>
                        {col.render ? col.render(order[col.key], order) : (
                          <span className="text-sm">{order[col.key]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={orderColumns.length} className="p-8 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-lg">No orders found</div>
                      <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="text-blue-500 hover:text-blue-400"
                      >
                        Create your first order
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Order Modal */}
      {isAddModalOpen && (
        <Modal
          title="Create New Order"
          onClose={() => setIsAddModalOpen(false)}
          actions={[
            {
              label: 'Cancel',
              variant: 'secondary',
              onClick: () => setIsAddModalOpen(false)
            },
            {
              label: 'Create Order',
              variant: 'primary',
              onClick: handleAddOrder
            }
          ]}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                value={newOrder.customer}
                onChange={(e) => setNewOrder(prev => ({ ...prev, customer: e.target.value }))}
                className="form-input w-full"
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={newOrder.email}
                onChange={(e) => setNewOrder(prev => ({ ...prev, email: e.target.value }))}
                className="form-input w-full"
                placeholder="customer@example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Amount *
                </label>
                <input
                  type="number"
                  value={newOrder.amount}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, amount: e.target.value }))}
                  className="form-input w-full"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Items
                </label>
                <input
                  type="number"
                  value={newOrder.items}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, items: e.target.value }))}
                  className="form-input w-full"
                  min="1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status
              </label>
              <select
                value={newOrder.status}
                onChange={(e) => setNewOrder(prev => ({ ...prev, status: e.target.value }))}
                className="form-input w-full"
              >
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Order Modal */}
      {isEditModalOpen && selectedOrder && (
        <Modal
          title={`Edit Order ${selectedOrder.id}`}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedOrder(null)
          }}
          actions={[
            {
              label: 'Cancel',
              variant: 'secondary',
              onClick: () => {
                setIsEditModalOpen(false)
                setSelectedOrder(null)
              }
            },
            {
              label: 'Save Changes',
              variant: 'primary',
              onClick: handleEditOrder
            }
          ]}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                value={selectedOrder.customer}
                onChange={(e) => setSelectedOrder(prev => ({ ...prev, customer: e.target.value }))}
                className="form-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={selectedOrder.email}
                onChange={(e) => setSelectedOrder(prev => ({ ...prev, email: e.target.value }))}
                className="form-input w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={selectedOrder.amount}
                  onChange={(e) => setSelectedOrder(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                  className="form-input w-full"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Items
                </label>
                <input
                  type="number"
                  value={selectedOrder.items}
                  onChange={(e) => setSelectedOrder(prev => ({ ...prev, items: parseInt(e.target.value) }))}
                  className="form-input w-full"
                  min="1"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedOrder && (
        <Modal
          title="Delete Order"
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedOrder(null)
          }}
          actions={[
            {
              label: 'Cancel',
              variant: 'secondary',
              onClick: () => {
                setIsDeleteModalOpen(false)
                setSelectedOrder(null)
              }
            },
            {
              label: 'Delete',
              variant: 'danger',
              onClick: () => handleDeleteOrder(selectedOrder.id)
            }
          ]}
        >
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
              <FiTrash2 className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Are you sure?</h3>
            <p className="text-gray-400 mb-2">
              You are about to delete order <span className="font-semibold">{selectedOrder.id}</span>
            </p>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Dashboard
