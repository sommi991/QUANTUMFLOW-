import { useState } from 'react'
import { FiShoppingBag, FiBox, FiClock, FiAlertCircle, FiPlus, FiEye, FiEdit, FiTrendingUp, FiTrendingDown } from 'react-icons/fi'
import ChartCard from '../components/ChartCard'
import DataTable from '../components/DataTable'

const ECommerce = () => {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Stats data
  const stats = [
    {
      title: 'Daily Revenue',
      value: 8245,
      change: 15.2,
      icon: FiShoppingBag,
      color: 'from-blue-500 to-purple-500',
      isCurrency: true,
      trend: 'up'
    },
    {
      title: 'Total Products',
      value: 1245,
      change: 8.7,
      icon: FiBox,
      color: 'from-green-500 to-emerald-500',
      isCurrency: false,
      trend: 'up'
    },
    {
      title: 'Pending Orders',
      value: 42,
      change: 12.3,
      icon: FiClock,
      color: 'from-yellow-500 to-orange-500',
      isCurrency: false,
      trend: 'down'
    },
    {
      title: 'Low Stock Items',
      value: 18,
      change: 5.1,
      icon: FiAlertCircle,
      color: 'from-red-500 to-pink-500',
      isCurrency: false,
      trend: 'down'
    }
  ]

  // Top products data
  const topProducts = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      price: 299.99,
      sales: 1248,
      revenue: 374,351,
      stock: 45,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      category: 'Wearables',
      price: 199.99,
      sales: 892,
      revenue: 178,391,
      stock: 28,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Organic Coffee Beans',
      category: 'Food & Beverage',
      price: 24.99,
      sales: 2156,
      revenue: 53,874,
      stock: 156,
      rating: 4.9
    },
    {
      id: 4,
      name: 'Yoga Mat Premium',
      category: 'Fitness',
      price: 49.99,
      sales: 745,
      revenue: 37,243,
      stock: 12,
      rating: 4.7
    }
  ]

  // Recent orders data
  const recentOrders = [
    {
      id: 'ORD-7842',
      customer: 'John Smith',
      date: '2024-03-15',
      amount: 1248.00,
      status: 'completed',
      items: 3
    },
    {
      id: 'ORD-7841',
      customer: 'Sarah Johnson',
      date: '2024-03-15',
      amount: 845.50,
      status: 'processing',
      items: 2
    },
    {
      id: 'ORD-7840',
      customer: 'Michael Brown',
      date: '2024-03-14',
      amount: 2415.00,
      status: 'completed',
      items: 5
    },
    {
      id: 'ORD-7839',
      customer: 'Emma Wilson',
      date: '2024-03-14',
      amount: 623.75,
      status: 'pending',
      items: 1
    },
    {
      id: 'ORD-7838',
      customer: 'David Lee',
      date: '2024-03-13',
      amount: 189.99,
      status: 'completed',
      items: 1
    }
  ]

  // Sales chart data
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 78, 66, 89, 96, 112, 105],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  // Category distribution data
  const categoryData = {
    labels: ['Electronics', 'Fashion', 'Home', 'Books', 'Sports'],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: [
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#f59e0b',
          '#10b981'
        ]
      }
    ]
  }

  // Product columns for table
  const productColumns = [
    { 
      key: 'name', 
      title: 'Product',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <FiBox className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold">{value}</div>
            <div className="text-sm text-gray-400">{row.category}</div>
          </div>
        </div>
      )
    },
    { 
      key: 'price', 
      title: 'Price',
      render: (value) => `$${value.toFixed(2)}`
    },
    { 
      key: 'sales', 
      title: 'Sales',
      render: (value) => value.toLocaleString()
    },
    { 
      key: 'revenue', 
      title: 'Revenue',
      render: (value) => `$${value.toLocaleString()}`
    },
    { 
      key: 'stock', 
      title: 'Stock',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span className={value < 20 ? 'text-red-400 font-semibold' : 'text-green-400'}>
            {value}
          </span>
          {value < 20 && (
            <span className="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded-full">
              Low
            </span>
          )}
        </div>
      )
    },
    { 
      key: 'rating', 
      title: 'Rating',
      render: (value) => (
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span>{value}</span>
        </div>
      )
    }
  ]

  // Order columns for table
  const orderColumns = [
    { key: 'id', title: 'Order ID' },
    { key: 'customer', title: 'Customer' },
    { 
      key: 'date', 
      title: 'Date',
      render: (value) => new Date(value).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
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
    },
    { 
      key: 'items', 
      title: 'Items',
      render: (value) => (
        <span className="px-2 py-1 bg-white/5 rounded-full text-sm">
          {value} items
        </span>
      )
    }
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">E-Commerce Dashboard</h1>
        <p className="text-gray-400">Manage products, inventory, orders, and customer relationships</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['overview', 'products', 'orders', 'customers', 'inventory'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="text-2xl font-bold">
                  {stat.isCurrency ? '$' : ''}{stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">{stat.title}</div>
              </div>
              
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                stat.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {stat.trend === 'up' ? (
                  <FiTrendingUp className="w-4 h-4" />
                ) : (
                  <FiTrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(stat.change)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Sales Performance"
          type="line"
          data={salesData}
          options={{
            plugins: {
              legend: { display: false }
            }
          }}
          action="View Report"
        />
        
        <ChartCard
          title="Category Distribution"
          type="doughnut"
          data={categoryData}
          action="See All"
        />
      </div>

      {/* Products & Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Top Selling Products</h3>
            <button className="btn-primary text-sm">
              <FiPlus className="mr-2" />
              Add Product
            </button>
          </div>
          
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <FiBox className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-sm text-gray-400">{product.category}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold">${product.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">{product.sales.toLocaleString()} sales</div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
            View All Products
          </button>
        </div>

        {/* Recent Orders */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Orders</h3>
            <button className="btn-primary text-sm">
              <FiPlus className="mr-2" />
              New Order
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <div className="font-semibold">{order.id}</div>
                      <div className="text-sm text-gray-400">{order.items} items</div>
                    </td>
                    <td>{order.customer}</td>
                    <td className="font-bold">${order.amount.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${
                        order.status === 'completed' ? 'status-active' :
                        order.status === 'processing' ? 'status-pending' :
                        'status-inactive'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
            View All Orders
          </button>
        </div>
      </div>

      {/* Full Data Tables (Conditional based on active tab) */}
      {activeTab === 'products' && (
        <div className="mt-8">
          <DataTable
            title="Product Management"
            columns={productColumns}
            data={topProducts}
            actions={true}
          />
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="mt-8">
          <DataTable
            title="Order Management"
            columns={orderColumns}
            data={recentOrders}
            actions={true}
          />
        </div>
      )}
    </div>
  )
}

export default ECommerce
