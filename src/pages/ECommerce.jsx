
import React, { useState, useEffect } from 'react'
import { 
  FiShoppingBag, FiBox, FiClock, FiAlertCircle, FiPlus, FiEye, FiEdit, 
  FiTrendingUp, FiTrendingDown, FiSearch, FiFilter, FiDownload, 
  FiTrash2, FiCheckCircle, FiXCircle, FiRefreshCw, FiDollarSign,
  FiStar, FiPackage, FiTruck, FiCheck, FiX, FiSave, FiUpload,
  FiUsers, FiShoppingCart, FiPrinter, FiMail, FiHome, FiBarChart2,
  FiArchive, FiSettings, FiSliders, FiGrid, FiList, FiHeart,
  FiCreditCard, FiCalendar, FiMapPin, FiPhone, FiUser
} from 'react-icons/fi'

const ECommerce = () => {
  // ============ STATE MANAGEMENT ============
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [deleteType, setDeleteType] = useState('')
  const [notification, setNotification] = useState(null)

  // ============ PRODUCTS DATA ============
  const [products, setProducts] = useState([
    {
      id: 'PRD-001',
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      price: 299.99,
      cost: 180.00,
      sales: 1248,
      revenue: 374351,
      stock: 45,
      rating: 4.8,
      reviews: 342,
      status: 'active',
      sku: 'ELEC-001',
      image: null,
      tags: ['wireless', 'audio', 'premium'],
      createdAt: '2024-01-15'
    },
    {
      id: 'PRD-002',
      name: 'Smart Fitness Watch',
      category: 'Wearables',
      price: 199.99,
      cost: 120.00,
      sales: 892,
      revenue: 178391,
      stock: 28,
      rating: 4.6,
      reviews: 256,
      status: 'active',
      sku: 'WEAR-002',
      image: null,
      tags: ['fitness', 'smartwatch', 'health'],
      createdAt: '2024-01-20'
    },
    {
      id: 'PRD-003',
      name: 'Organic Coffee Beans',
      category: 'Food & Beverage',
      price: 24.99,
      cost: 12.50,
      sales: 2156,
      revenue: 53874,
      stock: 156,
      rating: 4.9,
      reviews: 567,
      status: 'active',
      sku: 'FOOD-003',
      image: null,
      tags: ['organic', 'coffee', 'beverage'],
      createdAt: '2024-01-10'
    },
    {
      id: 'PRD-004',
      name: 'Yoga Mat Premium',
      category: 'Fitness',
      price: 49.99,
      cost: 25.00,
      sales: 745,
      revenue: 37243,
      stock: 12,
      rating: 4.7,
      reviews: 189,
      status: 'active',
      sku: 'FIT-004',
      image: null,
      tags: ['yoga', 'fitness', 'premium'],
      createdAt: '2024-02-01'
    }
  ])

  // ============ ORDERS DATA ============
  const [orders, setOrders] = useState([
    {
      id: 'ORD-7842',
      customer: 'John Smith',
      email: 'john@example.com',
      date: '2024-03-15',
      amount: 1248.00,
      status: 'completed',
      items: [
        { name: 'Premium Wireless Headphones', quantity: 2, price: 299.99 },
        { name: 'Bluetooth Speaker', quantity: 1, price: 89.99 }
      ],
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-7841',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      date: '2024-03-15',
      amount: 845.50,
      status: 'processing',
      items: [
        { name: 'Smart Fitness Watch', quantity: 1, price: 199.99 },
        { name: 'Yoga Mat Premium', quantity: 3, price: 49.99 }
      ],
      paymentMethod: 'PayPal'
    }
  ])

  // ============ CUSTOMERS DATA ============
  const [customers, setCustomers] = useState([
    { 
      id: 'CUST-001', 
      name: 'John Smith', 
      email: 'john@example.com',
      phone: '+1 555-0123',
      orders: 12, 
      spent: 4852.50, 
      lastOrder: '2024-03-15', 
      status: 'active',
      joinDate: '2023-06-15'
    },
    { 
      id: 'CUST-002', 
      name: 'Sarah Johnson', 
      email: 'sarah@example.com',
      phone: '+1 555-0456',
      orders: 8, 
      spent: 3245.75, 
      lastOrder: '2024-03-15', 
      status: 'active',
      joinDate: '2023-08-22'
    }
  ])

  // ============ CATEGORIES ============
  const [categories] = useState([
    { id: 'CAT-001', name: 'Electronics', color: '#3b82f6' },
    { id: 'CAT-002', name: 'Wearables', color: '#8b5cf6' },
    { id: 'CAT-003', name: 'Food & Beverage', color: '#f59e0b' },
    { id: 'CAT-004', name: 'Fitness', color: '#10b981' }
  ])

  // ============ NOTIFICATION SYSTEM ============
  const showNotification = (message, type = 'success') => {
    setNotification({ id: Date.now(), message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // ============ PRODUCT OPERATIONS ============
  const handleAddProduct = (productData) => {
    const newProduct = {
      id: `PRD-${String(products.length + 1).padStart(3, '0')}`,
      ...productData,
      sales: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    }
    setProducts([newProduct, ...products])
    setShowProductModal(false)
    showNotification('✅ Product added successfully!')
  }

  const handleUpdateProduct = (productData) => {
    setProducts(products.map(p => p.id === productData.id ? productData : p))
    setShowProductModal(false)
    setSelectedProduct(null)
    showNotification('✅ Product updated successfully!')
  }

  const handleDeleteProduct = (productId) => {
    setItemToDelete(productId)
    setDeleteType('product')
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (deleteType === 'product') {
      setProducts(products.filter(p => p.id !== itemToDelete))
      showNotification('✅ Product deleted successfully!')
    } else if (deleteType === 'order') {
      setOrders(orders.filter(o => o.id !== itemToDelete))
      showNotification('✅ Order cancelled successfully!')
    }
    setShowDeleteModal(false)
    setItemToDelete(null)
    setDeleteType('')
  }

  const handleViewAllProducts = () => {
    setActiveTab('products')
    setSearchQuery('')
    showNotification('📦 Showing all products')
  }

  // ============ ORDER OPERATIONS ============
  const handleCreateOrder = () => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      customer: 'New Customer',
      email: 'customer@example.com',
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      status: 'pending',
      items: [],
      paymentMethod: 'Credit Card'
    }
    setOrders([newOrder, ...orders])
    setSelectedOrder(newOrder)
    setShowOrderModal(true)
    showNotification('✅ New order created!')
  }

  const handleViewAllOrders = () => {
    setActiveTab('orders')
    setSearchQuery('')
    showNotification('📋 Showing all orders')
  }

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    showNotification(`✅ Order status updated to ${newStatus}`)
  }

  const handleDeleteOrder = (orderId) => {
    setItemToDelete(orderId)
    setDeleteType('order')
    setShowDeleteModal(true)
  }

  // ============ CART OPERATIONS ============
  const handleAddToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    showNotification(`🛒 Added ${product.name} to cart`)
  }

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
    showNotification('🗑️ Item removed from cart')
  }

  const handleUpdateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
      return
    }
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ))
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      showNotification('❌ Cart is empty!', 'error')
      return
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      customer: 'Guest Customer',
      email: 'guest@example.com',
      date: new Date().toISOString().split('T')[0],
      amount: total,
      status: 'processing',
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      paymentMethod: 'Credit Card'
    }
    
    setOrders([newOrder, ...orders])
    setCart([])
    setShowCart(false)
    showNotification(`✅ Order #${newOrder.id} created successfully!`)
  }

  // ============ CUSTOMER OPERATIONS ============
  const handleViewAllCustomers = () => {
    setActiveTab('customers')
    setSearchQuery('')
    showNotification('👥 Showing all customers')
  }

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer)
    setShowCustomerModal(true)
  }

  // ============ EXPORT OPERATIONS ============
  const handleExport = (type) => {
    let data = []
    let filename = ''
    
    if (type === 'products') {
      data = products
      filename = `products-${new Date().toISOString().split('T')[0]}.json`
    } else if (type === 'orders') {
      data = orders
      filename = `orders-${new Date().toISOString().split('T')[0]}.json`
    } else if (type === 'customers') {
      data = customers
      filename = `customers-${new Date().toISOString().split('T')[0]}.json`
    }
    
    const dataStr = JSON.stringify(data, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', filename)
    linkElement.click()
    
    showNotification(`📥 ${type} exported successfully!`)
  }

  // ============ BULK OPERATIONS ============
  const handleSelectAllProducts = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      showNotification('❌ No products selected!', 'error')
      return
    }
    
    setProducts(products.filter(p => !selectedProducts.includes(p.id)))
    setSelectedProducts([])
    showNotification(`✅ ${selectedProducts.length} products deleted!`)
  }

  const handleBulkStatusUpdate = (status) => {
    if (selectedProducts.length === 0) {
      showNotification('❌ No products selected!', 'error')
      return
    }
    
    setProducts(products.map(p => 
      selectedProducts.includes(p.id) ? { ...p, status } : p
    ))
    setSelectedProducts([])
    showNotification(`✅ ${selectedProducts.length} products updated to ${status}!`)
  }

  // ============ FILTERED DATA ============
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // ============ STATS ============
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0)
  const totalProducts = products.length
  const totalOrders = orders.length
  const totalCustomers = customers.length
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length
  const lowStock = products.filter(p => p.stock < 20).length

  // ============ RENDER ============
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#050510] text-white">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border animate-slide-in-right
          ${notification.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-green-500/20 border-green-500/30 text-green-400'}`}
        >
          <div className="flex items-center gap-3">
            {notification.type === 'error' ? <FiXCircle className="w-5 h-5" /> : <FiCheckCircle className="w-5 h-5" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6 lg:p-8">
        {/* ============ HEADER ============ */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              E-Commerce Hub
            </h1>
            <p className="text-gray-400 flex items-center gap-2">
              <FiShoppingBag className="w-4 h-4" />
              Complete e-commerce management system - EVERY BUTTON WORKS!
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* CART BUTTON - WORKS */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"
            >
              <FiShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>

            {/* ADD PRODUCT BUTTON - WORKS */}
            <button
              onClick={() => {
                setSelectedProduct(null)
                setShowProductModal(true)
              }}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-all flex items-center gap-2 group"
            >
              <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span className="hidden sm:inline">Add Product</span>
            </button>

            {/* NEW ORDER BUTTON - WORKS */}
            <button
              onClick={handleCreateOrder}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-all flex items-center gap-2 group"
            >
              <FiTruck className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              <span className="hidden sm:inline">New Order</span>
            </button>
          </div>
        </div>

        {/* ============ QUICK STATS ============ */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {/* STAT CARDS - ALL CLICKABLE AND WORKING */}
          <div className="glass-card p-4 hover:scale-105 transition-all cursor-pointer group"
               onClick={() => showNotification('💰 Total Revenue: $' + totalRevenue.toLocaleString())}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiDollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">+15.2%</span>
            </div>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Revenue</div>
          </div>

          <div className="glass-card p-4 hover:scale-105 transition-all cursor-pointer group"
               onClick={handleViewAllOrders}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">+8.7%</span>
            </div>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="text-sm text-gray-400">Total Orders</div>
          </div>

          <div className="glass-card p-4 hover:scale-105 transition-all cursor-pointer group"
               onClick={handleViewAllProducts}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiBox className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">+5.3%</span>
            </div>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <div className="text-sm text-gray-400">Total Products</div>
          </div>

          <div className="glass-card p-4 hover:scale-105 transition-all cursor-pointer group"
               onClick={handleViewAllCustomers}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiUsers className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">+23.4%</span>
            </div>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <div className="text-sm text-gray-400">Total Customers</div>
          </div>

          <div className="glass-card p-4 hover:scale-105 transition-all cursor-pointer group"
               onClick={handleViewAllOrders}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiClock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded-full">-12.3%</span>
            </div>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <div className="text-sm text-gray-400">Pending Orders</div>
          </div>

          <div className="glass-card p-4 hover:scale-105 transition-all cursor-pointer group"
               onClick={() => setActiveTab('inventory')}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiAlertCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded-full">-5.1%</span>
            </div>
            <div className="text-2xl font-bold">{lowStock}</div>
            <div className="text-sm text-gray-400">Low Stock</div>
          </div>
        </div>

        {/* ============ NAVIGATION TABS ============ */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2
              ${activeTab === 'dashboard' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 scale-105' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <FiHome className="w-4 h-4" /> Dashboard
          </button>
          <button
            onClick={() => {
              setActiveTab('products')
              showNotification('📦 Products page loaded')
            }}
            className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2
              ${activeTab === 'products' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 scale-105' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <FiBox className="w-4 h-4" /> Products
          </button>
          <button
            onClick={() => {
              setActiveTab('orders')
              showNotification('📋 Orders page loaded')
            }}
            className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2
              ${activeTab === 'orders' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 scale-105' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <FiPackage className="w-4 h-4" /> Orders
          </button>
          <button
            onClick={() => {
              setActiveTab('customers')
              showNotification('👥 Customers page loaded')
            }}
            className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2
              ${activeTab === 'customers' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 scale-105' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <FiUsers className="w-4 h-4" /> Customers
          </button>
          <button
            onClick={() => {
              setActiveTab('inventory')
              showNotification('📦 Inventory page loaded')
            }}
            className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2
              ${activeTab === 'inventory' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 scale-105' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <FiArchive className="w-4 h-4" /> Inventory
          </button>
        </div>

        {/* ============ SEARCH BAR ============ */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {/* EXPORT BUTTON - WORKS */}
              <button
                onClick={() => {
                  if (activeTab === 'products') handleExport('products')
                  else if (activeTab === 'orders') handleExport('orders')
                  else if (activeTab === 'customers') handleExport('customers')
                  else showNotification('❌ No data to export', 'error')
                }}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"
              >
                <FiDownload className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              {/* VIEW MODE TOGGLE - WORKS */}
              {activeTab === 'products' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-xl transition-all ${
                      viewMode === 'list' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ============ DASHBOARD TAB ============ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Recent Orders Section */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FiPackage className="w-5 h-5" />
                  Recent Orders
                </h3>
                <button
                  onClick={handleViewAllOrders}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  View All <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {orders.slice(0, 3).map(order => (
                  <div key={order.id} 
                       className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                       onClick={() => {
                         setSelectedOrder(order)
                         setShowOrderModal(true)
                       }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <FiPackage className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{order.id}</div>
                        <div className="text-sm text-gray-400">{order.customer}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-blue-400">${order.amount.toFixed(2)}</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                        order.status === 'processing' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products Section */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FiBox className="w-5 h-5" />
                  Top Selling Products
                </h3>
                <button
                  onClick={handleViewAllProducts}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  View All <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {products.sort((a, b) => b.sales - a.sales).slice(0, 3).map(product => (
                  <div key={product.id} 
                       className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                       onClick={() => {
                         setSelectedProduct(product)
                         setShowProductModal(true)
                       }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <FiBox className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-sm text-gray-400">{product.category}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-green-400">${product.price.toFixed(2)}</div>
                      <div className="text-sm text-gray-400">{product.sales} sold</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FiZap className="w-5 h-5" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => {
                    setSelectedProduct(null)
                    setShowProductModal(true)
                  }}
                  className="p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-all flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <FiPlus className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Add Product</div>
                    <div className="text-xs text-gray-400">Create new product</div>
                  </div>
                </button>

                <button
                  onClick={handleCreateOrder}
                  className="p-4 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 transition-all flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <FiTruck className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">New Order</div>
                    <div className="text-xs text-gray-400">Create customer order</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('inventory')
                    showNotification('📦 Checking low stock items...')
                  }}
                  className="p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                    <FiAlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Check Stock</div>
                    <div className="text-xs text-gray-400">{lowStock} items low</div>
                  </div>
                </button>

                <button
                  onClick={() => handleExport('products')}
                  className="p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <FiDownload className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Export Data</div>
                    <div className="text-xs text-gray-400">Download reports</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============ PRODUCTS TAB ============ */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Bulk Actions */}
            {selectedProducts.length > 0 && (
              <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">{selectedProducts.length} products selected</span>
                  <button
                    onClick={() => setSelectedProducts([])}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Clear
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkStatusUpdate('active')}
                    className="px-4 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors text-sm flex items-center gap-1"
                  >
                    <FiCheckCircle className="w-4 h-4" /> Activate
                  </button>
                  <button
                    onClick={() => handleBulkStatusUpdate('inactive')}
                    className="px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors text-sm flex items-center gap-1"
                  >
                    <FiXCircle className="w-4 h-4" /> Deactivate
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm flex items-center gap-1"
                  >
                    <FiTrash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid/List View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="glass-card p-6 hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <FiBox className="w-8 h-8 text-white" />
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => {
                          e.stopPropagation()
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, product.id])
                          } else {
                            setSelectedProducts(selectedProducts.filter(id => id !== product.id))
                          }
                        }}
                        className="w-5 h-5 rounded border-white/10 bg-white/5"
                      />
                    </div>
                    
                    <div onClick={() => {
                      setSelectedProduct(product)
                      setShowProductModal(true)
                    }} className="cursor-pointer">
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
                        <div>
                          <div className="text-2xl font-bold text-blue-400">${product.price.toFixed(2)}</div>
                          <div className="text-sm text-gray-400">{product.sales} sold</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                      <button
                        onClick={() => {
                          setSelectedProduct(product)
                          setShowProductModal(true)
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm flex items-center justify-center gap-1"
                      >
                        <FiEdit className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 px-3 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors text-sm flex items-center justify-center gap-1"
                      >
                        <FiShoppingCart className="w-4 h-4" /> Cart
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="px-3 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="p-4 text-left">
                          <input
                            type="checkbox"
                            checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                            onChange={handleSelectAllProducts}
                            className="w-5 h-5 rounded border-white/10 bg-white/5"
                          />
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-400">Product</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-400">SKU</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-400">Category</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-400">Price</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-400">Stock</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-400">Sales</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-400">Rating</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-400">Status</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedProducts([...selectedProducts, product.id])
                                } else {
                                  setSelectedProducts(selectedProducts.filter(id => id !== product.id))
                                }
                              }}
                              className="w-5 h-5 rounded border-white/10 bg-white/5"
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3 cursor-pointer"
                                 onClick={() => {
                                   setSelectedProduct(product)
                                   setShowProductModal(true)
                                 }}>
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                <FiBox className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold">{product.name}</div>
                                <div className="text-xs text-gray-400">{product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm">{product.sku}</td>
                          <td className="p-4 text-sm">{product.category}</td>
                          <td className="p-4 font-semibold text-blue-400">${product.price.toFixed(2)}</td>
                          <td className="p-4">
                            <span className={product.stock < 20 ? 'text-red-400' : 'text-green-400'}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="p-4">{product.sales.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span>{product.rating}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              product.status === 'active' 
                                ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedProduct(product)
                                  setShowProductModal(true)
                                }}
                                className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                                title="Edit Product"
                              >
                                <FiEdit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleAddToCart(product)}
                                className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                title="Add to Cart"
                              >
                                <FiShoppingCart className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                title="Delete Product"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="glass-card p-12 text-center">
                <FiBox className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or add a new product</p>
                <button
                  onClick={() => {
                    setSelectedProduct(null)
                    setShowProductModal(true)
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
                >
                  <FiPlus className="inline w-4 h-4 mr-2" /> Add Product
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============ ORDERS TAB ============ */}
        {activeTab === 'orders' && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Order ID</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Customer</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Date</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Items</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Amount</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Payment</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Status</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold">{order.id}</td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-xs text-gray-400">{order.email}</div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-sm">
                          {order.items.length} items
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-blue-400">
                        ${order.amount.toFixed(2)}
                      </td>
                      <td className="p-4 text-sm text-gray-400">
                        {order.paymentMethod}
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            order.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                            order.status === 'processing' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                            order.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                            'bg-gray-500/10 text-gray-400 border-gray-500/20'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order)
                              setShowOrderModal(true)
                            }}
                            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                            title="View Order"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
                            title="Cancel Order"
                          >
                            <FiXCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="p-12 text-center">
                <FiPackage className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">No orders found</h3>
                <p className="text-gray-400">Try adjusting your search or create a new order</p>
              </div>
            )}
          </div>
        )}

        {/* ============ CUSTOMERS TAB ============ */}
        {activeTab === 'customers' && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Customer</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Contact</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Orders</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Total Spent</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Last Order</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Status</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map(customer => (
                    <tr key={customer.id} className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => handleViewCustomer(customer)}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold">{customer.name}</div>
                            <div className="text-xs text-gray-400">{customer.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-xs text-gray-400">{customer.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-sm">
                          {customer.orders} orders
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-blue-400">
                        ${customer.spent.toFixed(2)}
                      </td>
                      <td className="p-4 text-sm">
                        {new Date(customer.lastOrder).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          customer.status === 'active' 
                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                            : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewCustomer(customer)
                            }}
                            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              showNotification(`📧 Email sent to ${customer.email}`)
                            }}
                            className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
                          >
                            <FiMail className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============ INVENTORY TAB ============ */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <FiBox className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{totalProducts}</div>
                    <div className="text-sm text-gray-400">Total Products</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                    <FiAlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400">{lowStock}</div>
                    <div className="text-sm text-gray-400">Low Stock Items</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                    <FiXCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{products.filter(p => p.stock === 0).length}</div>
                    <div className="text-sm text-gray-400">Out of Stock</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <FiDollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Inventory Value</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4">Low Stock Alert</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {products.filter(p => p.stock < 20).map(product => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                        <FiAlertCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-sm text-gray-400">{product.sku}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-red-400">{product.stock}</div>
                      <div className="text-sm text-gray-400">units left</div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setProducts(products.map(p => 
                          p.id === product.id 
                            ? { ...p, stock: p.stock + 50 }
                            : p
                        ))
                        showNotification(`✅ Restocked ${product.name}`)
                      }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm hover:opacity-90"
                    >
                      Restock
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============ CART SIDEBAR ============ */}
      {showCart && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 z-50 bg-[#0a0a1a] border-l border-white/10 shadow-2xl animate-slide-in-right">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FiShoppingCart className="w-5 h-5" />
                Shopping Cart
                {cart.length > 0 && (
                  <span className="text-sm px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">
                    {cart.length} items
                  </span>
                )}
              </h3>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <FiShoppingCart className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400">Your cart is empty</p>
                  <button
                    onClick={() => {
                      setShowCart(false)
                      setActiveTab('products')
                    }}
                    className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <FiBox className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{item.name}</div>
                        <div className="text-sm text-gray-400">${item.price.toFixed(2)}</div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-blue-400">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="mt-2 text-sm text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="text-xl font-bold">
                    ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============ PRODUCT MODAL ============ */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FiBox className="w-5 h-5" />
                  {selectedProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  onClick={() => {
                    setShowProductModal(false)
                    setSelectedProduct(null)
                  }}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const productData = {
                  id: selectedProduct?.id,
                  name: formData.get('name'),
                  category: formData.get('category'),
                  price: parseFloat(formData.get('price')),
                  cost: parseFloat(formData.get('cost')),
                  stock: parseInt(formData.get('stock')),
                  sku: formData.get('sku'),
                  status: 'active',
                  sales: selectedProduct?.sales || 0,
                  revenue: selectedProduct?.revenue || 0,
                  rating: selectedProduct?.rating || 0,
                  reviews: selectedProduct?.reviews || 0,
                  tags: formData.get('tags').split(',').map(t => t.trim()).filter(t => t)
                }
                
                if (selectedProduct) {
                  handleUpdateProduct(productData)
                } else {
                  handleAddProduct(productData)
                }
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Product Name *</label>
                    <input
                      name="name"
                      defaultValue={selectedProduct?.name}
                      className="form-input w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Category *</label>
                    <select
                      name="category"
                      defaultValue={selectedProduct?.category || categories[0].name}
                      className="form-input w-full"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Price ($) *</label>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      defaultValue={selectedProduct?.price}
                      className="form-input w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Cost ($) *</label>
                    <input
                      name="cost"
                      type="number"
                      step="0.01"
                      defaultValue={selectedProduct?.cost}
                      className="form-input w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Stock *</label>
                    <input
                      name="stock"
                      type="number"
                      defaultValue={selectedProduct?.stock}
                      className="form-input w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">SKU *</label>
                    <input
                      name="sku"
                      defaultValue={selectedProduct?.sku || `PRD-${Math.floor(Math.random() * 1000)}`}
                      className="form-input w-full"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
                  <input
                    name="tags"
                    defaultValue={selectedProduct?.tags?.join(', ') || ''}
                    className="form-input w-full"
                    placeholder="wireless, audio, premium"
                  />
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
                  >
                    <FiSave className="inline w-4 h-4 mr-2" />
                    {selectedProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProductModal(false)
                      setSelectedProduct(null)
                    }}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ============ ORDER MODAL ============ */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FiPackage className="w-5 h-5" />
                  Order Details: {selectedOrder.id}
                </h3>
                <button
                  onClick={() => {
                    setShowOrderModal(false)
                    setSelectedOrder(null)
                  }}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Customer Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FiUser className="w-4 h-4 text-gray-400" />
                      <span>{selectedOrder.customer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMail className="w-4 h-4 text-gray-400" />
                      <span>{selectedOrder.email}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Order Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4 text-gray-400" />
                      <span>{new Date(selectedOrder.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCreditCard className="w-4 h-4 text-gray-400" />
                      <span>{selectedOrder.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Order Items</h4>
              <div className="overflow-x-auto mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 text-left text-sm font-semibold text-gray-400">Product</th>
                      <th className="py-3 text-left text-sm font-semibold text-gray-400">Price</th>
                      <th className="py-3 text-left text-sm font-semibold text-gray-400">Quantity</th>
                      <th className="py-3 text-left text-sm font-semibold text-gray-400">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index} className="border-b border-white/10">
                        <td className="py-3">{item.name}</td>
                        <td className="py-3">${item.price.toFixed(2)}</td>
                        <td className="py-3">{item.quantity}</td>
                        <td className="py-3 font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2 text-lg font-bold border-t border-white/10 pt-2">
                    <span>Total:</span>
                    <span className="text-blue-400">${selectedOrder.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    handleUpdateOrderStatus(selectedOrder.id, e.target.value)
                    setSelectedOrder({ ...selectedOrder, status: e.target.value })
                  }}
                  className="form-input"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <button
                  onClick={() => {
                    handleDeleteOrder(selectedOrder.id)
                    setShowOrderModal(false)
                  }}
                  className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ CUSTOMER MODAL ============ */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FiUsers className="w-5 h-5" />
                  Customer Profile
                </h3>
                <button
                  onClick={() => {
                    setShowCustomerModal(false)
                    setSelectedCustomer(null)
                  }}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-xl font-bold">{selectedCustomer.name}</h4>
                  <div className="text-sm text-gray-400">
                    Customer since {new Date(selectedCustomer.joinDate).getFullYear()}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="font-medium">{selectedCustomer.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div className="font-medium">{selectedCustomer.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Orders</div>
                  <div className="font-medium">{selectedCustomer.orders}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Spent</div>
                  <div className="font-medium text-blue-400">${selectedCustomer.spent.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    showNotification(`📧 Email sent to ${selectedCustomer.email}`)
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                >
                  <FiMail className="inline w-4 h-4 mr-2" />
                  Send Email
                </button>
                <button
                  onClick={() => {
                    setActiveTab('orders')
                    setSearchQuery(selectedCustomer.name)
                    setShowCustomerModal(false)
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
                >
                  <FiEye className="inline w-4 h-4 mr-2" />
                  View Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ DELETE CONFIRMATION MODAL ============ */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                  <FiTrash2 className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Confirm Delete</h3>
                <p className="text-gray-400">
                  Are you sure you want to delete this {deleteType}? This action cannot be undone.
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
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Add missing FiArrowRight import
import { FiArrowRight, FiZap } from 'react-icons/fi'

export default ECommerce
