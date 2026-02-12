Iimpimport React, { useState } from 'react'
import { 
  FiShoppingBag, FiBox, FiClock, FiAlertCircle, FiPlus, FiEye, FiEdit, 
  FiTrendingUp, FiTrendingDown, FiSearch, FiFilter, FiDownload, 
  FiTrash2, FiCheckCircle, FiXCircle, FiDollarSign,
  FiStar, FiPackage, FiTruck, FiCheck, FiX, FiSave,
  FiUsers, FiShoppingCart, FiHome, FiBarChart2,
  FiArchive, FiGrid, FiList, FiCreditCard,
  FiCalendar, FiUser, FiArrowRight, FiPercent,
  FiRefreshCw, FiFile, FiCopy, FiMoreVertical
} from 'react-icons/fi'

const ECommerce = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [notification, setNotification] = useState(null)

  // Sample products
  const [products] = useState([
    { id: 'PRD-001', name: 'Premium Wireless Headphones', category: 'Electronics', price: 299.99, stock: 45, rating: 4.8, sales: 1248, sku: 'ELEC-001', status: 'active' },
    { id: 'PRD-002', name: 'Smart Fitness Watch', category: 'Wearables', price: 199.99, stock: 28, rating: 4.6, sales: 892, sku: 'WEAR-002', status: 'active' },
    { id: 'PRD-003', name: 'Organic Coffee Beans', category: 'Food & Beverage', price: 24.99, stock: 156, rating: 4.9, sales: 2156, sku: 'FOOD-003', status: 'active' },
    { id: 'PRD-004', name: 'Yoga Mat Premium', category: 'Fitness', price: 49.99, stock: 12, rating: 4.7, sales: 745, sku: 'FIT-004', status: 'active' },
    { id: 'PRD-005', name: 'Bluetooth Speaker', category: 'Electronics', price: 89.99, stock: 34, rating: 4.5, sales: 623, sku: 'ELEC-005', status: 'active' },
  ])

  // Sample orders
  const [orders] = useState([
    { id: 'ORD-7842', customer: 'John Smith', amount: 1248.00, status: 'delivered', date: '2024-03-15' },
    { id: 'ORD-7841', customer: 'Sarah Johnson', amount: 845.50, status: 'processing', date: '2024-03-15' },
    { id: 'ORD-7840', customer: 'Michael Brown', amount: 299.99, status: 'shipped', date: '2024-03-14' },
    { id: 'ORD-7839', customer: 'Emma Wilson', amount: 1567.80, status: 'pending', date: '2024-03-14' },
  ])

  // Stats
  const stats = {
    revenue: 485200,
    orders: 1248,
    customers: 892,
    products: products.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    lowStock: products.filter(p => p.stock < 20).length
  }

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }])
    showNotification(`🛒 Added ${product.name} to cart`)
  }

  const StatCard = ({ icon: Icon, value, label, change, color, onClick }) => (
    <div 
      className="glass-card p-4 hover:scale-105 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center group-hover:rotate-12 transition-transform`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {change}
        </span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )

  const TabButton = ({ active, onClick, icon: Icon, label, badge }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2
        ${active 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25' 
          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {badge > 0 && (
        <span className="px-2 py-0.5 text-xs bg-white/20 rounded-full">{badge}</span>
      )}
    </button>
  )

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border animate-slide-in-right
          ${notification.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-green-500/20 border-green-500/30 text-green-400'}`}>
          <div className="flex items-center gap-3">
            {notification.type === 'error' ? <FiXCircle className="w-5 h-5" /> : <FiCheckCircle className="w-5 h-5" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            E-Commerce Hub
          </h1>
          <p className="text-gray-400 flex items-center gap-2 mt-1">
            <FiShoppingBag className="w-4 h-4" />
            Complete e-commerce management system
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <FiShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                {cart.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setSelectedProduct(null)
              setShowProductModal(true)
            }}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-all flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard 
          icon={FiDollarSign}
          value={`$${stats.revenue.toLocaleString()}`}
          label="Revenue"
          change="+15.2%"
          color="from-blue-500 to-purple-500"
          onClick={() => showNotification(`💰 Revenue: $${stats.revenue.toLocaleString()}`)}
        />
        <StatCard 
          icon={FiShoppingBag}
          value={stats.orders}
          label="Orders"
          change="+8.7%"
          color="from-green-500 to-emerald-500"
          onClick={() => setActiveTab('orders')}
        />
        <StatCard 
          icon={FiUsers}
          value={stats.customers}
          label="Customers"
          change="+23.4%"
          color="from-purple-500 to-pink-500"
          onClick={() => setActiveTab('customers')}
        />
        <StatCard 
          icon={FiBox}
          value={stats.products}
          label="Products"
          change="+5.3%"
          color="from-yellow-500 to-orange-500"
          onClick={() => setActiveTab('products')}
        />
        <StatCard 
          icon={FiClock}
          value={stats.pendingOrders}
          label="Pending"
          change="-12.3%"
          color="from-orange-500 to-red-500"
          onClick={() => setActiveTab('orders')}
        />
        <StatCard 
          icon={FiAlertCircle}
          value={stats.lowStock}
          label="Low Stock"
          change="-5.1%"
          color="from-red-500 to-pink-500"
          onClick={() => showNotification(`📦 ${stats.lowStock} products low on stock`)}
        />
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap items-center gap-2">
        <TabButton 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
          icon={FiHome}
          label="Dashboard"
        />
        <TabButton 
          active={activeTab === 'products'} 
          onClick={() => setActiveTab('products')}
          icon={FiBox}
          label="Products"
          badge={products.length}
        />
        <TabButton 
          active={activeTab === 'orders'} 
          onClick={() => setActiveTab('orders')}
          icon={FiPackage}
          label="Orders"
          badge={stats.pendingOrders}
        />
        <TabButton 
          active={activeTab === 'customers'} 
          onClick={() => setActiveTab('customers')}
          icon={FiUsers}
          label="Customers"
          badge={stats.customers}
        />
      </div>

      {/* Search */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
              <FiFilter className="w-4 h-4" />
            </button>
            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
              <FiDownload className="w-4 h-4" />
            </button>
            {activeTab === 'products' && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FiPackage className="w-5 h-5" />
              Recent Orders
            </h3>
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-gray-400">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-400">${order.amount.toFixed(2)}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-500/10 text-green-500' :
                      order.status === 'shipped' ? 'bg-blue-500/10 text-blue-400' :
                      order.status === 'processing' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-orange-500/10 text-orange-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FiBox className="w-5 h-5" />
              Top Products
            </h3>
            <div className="space-y-3">
              {products.slice(0, 4).map(product => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-sm text-gray-400">{product.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400">${product.price.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">{product.sales} sold</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="glass-card p-6 hover:scale-105 transition-all">
              <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <FiBox className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-lg mb-1">{product.name}</h4>
              <p className="text-sm text-gray-400 mb-2">{product.category}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-1 bg-white/5 rounded-full">{product.sku}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  product.stock < 20 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                }`}>
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-blue-400">${product.price.toFixed(2)}</div>
                <div className="flex items-center gap-1">
                  <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                <button className="flex-1 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm flex items-center justify-center gap-1">
                  <FiEdit className="w-4 h-4" /> Edit
                </button>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 px-3 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 text-sm flex items-center justify-center gap-1"
                >
                  <FiShoppingCart className="w-4 h-4" /> Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-left text-sm font-semibold text-gray-400">Order ID</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-400">Customer</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-400">Date</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-400">Amount</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="p-4 font-semibold">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-4 font-semibold text-blue-400">${order.amount.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'delivered' ? 'bg-green-500/10 text-green-500' :
                      order.status === 'shipped' ? 'bg-blue-500/10 text-blue-400' :
                      order.status === 'processing' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-orange-500/10 text-orange-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="glass-card p-6 text-center text-gray-400">
          <FiUsers className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-bold mb-2">Customer Management</h3>
          <p>Customer view coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default ECommerce
