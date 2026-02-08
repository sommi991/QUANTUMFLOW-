import { useState } from 'react'
import StatsCard from '../components/StatsCard'
import DataTable from '../components/DataTable'
import { FiShoppingBag, FiBox, FiClock, FiAlertCircle } from 'react-icons/fi'

const ECommerce = () => {
  const [products] = useState([
    { id: 1, name: 'Premium Headphones', price: 299, sales: 1245, stock: 42 },
    { id: 2, name: 'Wireless Mouse', price: 49, sales: 2341, stock: 15 },
    { id: 3, name: '4K Monitor', price: 599, sales: 856, stock: 8 },
    { id: 4, name: 'Mechanical Keyboard', price: 129, sales: 1923, stock: 23 },
    { id: 5, name: 'Laptop Stand', price: 89, sales: 3124, stock: 56 }
  ])

  const [recentOrders] = useState([
    { id: 'ORD-7842', customer: 'John Smith', total: 1248.00, status: 'completed' },
    { id: 'ORD-7841', customer: 'Sarah Johnson', total: 845.50, status: 'processing' },
    { id: 'ORD-7840', customer: 'Michael Brown', total: 2415.00, status: 'completed' },
    { id: 'ORD-7839', customer: 'Emma Wilson', total: 623.75, status: 'cancelled' },
    { id: 'ORD-7838', customer: 'David Lee', total: 321.25, status: 'processing' }
  ])

  const stats = [
    {
      title: 'Daily Revenue',
      value: 8245,
      change: 15.2,
      icon: FiShoppingBag,
      color: 'bg-gradient-to-br from-primary-blue to-primary-purple',
      isCurrency: true
    },
    {
      title: 'Total Products',
      value: 1245,
      change: 8.7,
      icon: FiBox,
      color: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    {
      title: 'Pending Orders',
      value: 42,
      change: -12.3,
      icon: FiClock,
      color: 'bg-gradient-to-br from-yellow-500 to-orange-500'
    },
    {
      title: 'Low Stock Items',
      value: 18,
      change: -5.1,
      icon: FiAlertCircle,
      color: 'bg-gradient-to-br from-red-500 to-pink-500'
    }
  ]

  const orderColumns = [
    { key: 'id', title: 'Order #' },
    { key: 'customer', title: 'Customer' },
    { 
      key: 'total', 
      title: 'Total',
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
        <h1 className="text-3xl font-bold gradient-text mb-2">E-Commerce Dashboard</h1>
        <p className="text-gray-400">Manage products, inventory, orders, and customer relationships.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Products & Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Top Selling Products</h3>
            <button className="btn-primary text-sm">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-sm text-gray-400">
                    ${product.price} • {product.sales.toLocaleString()} sales
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  product.stock > 20 ? 'bg-green-500/10 text-green-400' :
                  product.stock > 10 ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  {product.stock} in stock
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Orders</h3>
            <button className="btn-primary text-sm">
              New Order
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  {orderColumns.map((col) => (
                    <th key={col.key}>{col.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>${order.total.toFixed(2)}</td>
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
        </div>
      </div>
    </div>
  )
}

export default ECommerce