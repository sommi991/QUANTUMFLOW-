import { useState, useEffect } from 'react'
import { 
  FiShoppingBag, FiBox, FiClock, FiAlertCircle, FiPlus, FiEye, FiEdit, 
  FiTrendingUp, FiTrendingDown, FiSearch, FiFilter, FiDownload, 
  FiTrash2, FiCheckCircle, FiXCircle, FiRefreshCw, FiDollarSign,
  FiStar, FiPackage, FiTruck, FiCheck, FiX, FiSave, FiUpload,
  FiPieChart, FiBarChart2, FiUsers, FiShoppingCart, FiPrinter,
  FiMail, FiMoreVertical, FiHome, FiTag, FiPercent, FiAward
} from 'react-icons/fi'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import ChartCard from '../components/ChartCard'

const ECommerce = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dateRange, setDateRange] = useState('month')
  
  // Modal States
  const [showProductModal, setShowProductModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  
  // Selected Items
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [deleteType, setDeleteType] = useState('')
  
  // Cart/Bulk Selection
  const [selectedProducts, setSelectedProducts] = useState([])
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  // Stats Data with real-time simulation
  const [stats, setStats] = useState([
    {
      id: 1,
      title: 'Daily Revenue',
      value: 8245,
      change: 15.2,
      icon: FiDollarSign,
      color: 'from-blue-500 to-purple-500',
      isCurrency: true,
      trend: 'up'
    },
    {
      id: 2,
      title: 'Total Products',
      value: 145,
      change: 8.7,
      icon: FiBox,
      color: 'from-green-500 to-emerald-500',
      isCurrency: false,
      trend: 'up'
    },
    {
      id: 3,
      title: 'Pending Orders',
      value: 42,
      change: -12.3,
      icon: FiClock,
      color: 'from-yellow-500 to-orange-500',
      isCurrency: false,
      trend: 'down'
    },
    {
      id: 4,
      title: 'Low Stock Items',
      value: 18,
      change: -5.1,
      icon: FiAlertCircle,
      color: 'from-red-500 to-pink-500',
      isCurrency: false,
      trend: 'down'
    },
    {
      id: 5,
      title: 'Total Customers',
      value: 2847,
      change: 23.4,
      icon: FiUsers,
      color: 'from-purple-500 to-pink-500',
      isCurrency: false,
      trend: 'up'
    },
    {
      id: 6,
      title: 'Conversion Rate',
      value: 3.6,
      change: 0.8,
      icon: FiPercent,
      color: 'from-orange-500 to-red-500',
      isCurrency: false,
      trend: 'up',
      suffix: '%'
    }
  ])

  // Products Data
  const [products, setProducts] = useState([
    {
      id: 1,
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
      tags: ['wireless', 'audio', 'premium']
    },
    {
      id: 2,
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
      tags: ['fitness', 'smartwatch', 'health']
    },
    {
      id: 3,
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
      tags: ['organic', 'coffee', 'beverage']
    },
    {
      id: 4,
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
      tags: ['yoga', 'fitness', 'premium']
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      price: 89.99,
      cost: 45.00,
      sales: 567,
      revenue: 51023,
      stock: 8,
      rating: 4.5,
      reviews: 134,
      status: 'active',
      sku: 'ELEC-005',
      image: null,
      tags: ['audio', 'bluetooth', 'speaker']
    },
    {
      id: 6,
      name: 'Leather Wallet',
      category: 'Fashion',
      price: 39.99,
      cost: 18.00,
      sales: 1234,
      revenue: 49387,
      stock: 67,
      rating: 4.8,
      reviews: 278,
      status: 'active',
      sku: 'FASH-006',
      image: null,
      tags: ['leather', 'wallet', 'accessories']
    }
  ])

  // Categories Data
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', productCount: 45, revenue: 425374, color: '#3b82f6' },
    { id: 2, name: 'Fashion', productCount: 32, revenue: 287654, color: '#8b5cf6' },
    { id: 3, name: 'Home & Living', productCount: 28, revenue: 198765, color: '#ec4899' },
    { id: 4, name: 'Food & Beverage', productCount: 15, revenue: 145678, color: '#f59e0b' },
    { id: 5, name: 'Fitness', productCount: 12, revenue: 98765, color: '#10b981' },
    { id: 6, name: 'Books', productCount: 8, revenue: 45678, color: '#6b7280' },
    { id: 7, name: 'Wearables', productCount: 5, revenue: 178391, color: '#ef4444' }
  ])

  // Orders Data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-7842',
      customer: 'John Smith',
      email: 'john@example.com',
      date: '2024-03-15',
      amount: 1248.00,
      status: 'completed',
      items: [
        { productId: 1, name: 'Premium Wireless Headphones', quantity: 2, price: 299.99 },
        { productId: 5, name: 'Bluetooth Speaker', quantity: 1, price: 89.99 }
      ],
      paymentMethod: 'Credit Card',
      shippingAddress: '123 Main St, New York, NY 10001',
      lastUpdated: '10 minutes ago'
    },
    {
      id: 'ORD-7841',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      date: '2024-03-15',
      amount: 845.50,
      status: 'processing',
      items: [
        { productId: 2, name: 'Smart Fitness Watch', quantity: 1, price: 199.99 },
        { productId: 4, name: 'Yoga Mat Premium', quantity: 3, price: 49.99 }
      ],
      paymentMethod: 'PayPal',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
      lastUpdated: '25 minutes ago'
    },
    {
      id: 'ORD-7840',
      customer: 'Michael Brown',
      email: 'michael@example.com',
      date: '2024-03-14',
      amount: 2415.00,
      status: 'completed',
      items: [
        { productId: 1, name: 'Premium Wireless Headphones', quantity: 3, price: 299.99 },
        { productId: 2, name: 'Smart Fitness Watch', quantity: 2, price: 199.99 }
      ],
      paymentMethod: 'Credit Card',
      shippingAddress: '789 Pine St, Chicago, IL 60601',
      lastUpdated: '1 hour ago'
    },
    {
      id: 'ORD-7839',
      customer: 'Emma Wilson',
      email: 'emma@example.com',
      date: '2024-03-14',
      amount: 623.75,
      status: 'cancelled',
      items: [
        { productId: 6, name: 'Leather Wallet', quantity: 5, price: 39.99 },
        { productId: 3, name: 'Organic Coffee Beans', quantity: 10, price: 24.99 }
      ],
      paymentMethod: 'Debit Card',
      shippingAddress: '321 Elm St, Miami, FL 33101',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'ORD-7838',
      customer: 'David Lee',
      email: 'david@example.com',
      date: '2024-03-13',
      amount: 189.99,
      status: 'completed',
      items: [
        { productId: 5, name: 'Bluetooth Speaker', quantity: 1, price: 89.99 },
        { productId: 6, name: 'Leather Wallet', quantity: 2, price: 39.99 }
      ],
      paymentMethod: 'PayPal',
      shippingAddress: '654 Maple Dr, Dallas, TX 75201',
      lastUpdated: '3 hours ago'
    },
    {
      id: 'ORD-7837',
      customer: 'Lisa Anderson',
      email: 'lisa@example.com',
      date: '2024-03-13',
      amount: 349.99,
      status: 'processing',
      items: [
        { productId: 1, name: 'Premium Wireless Headphones', quantity: 1, price: 299.99 },
        { productId: 6, name: 'Leather Wallet', quantity: 1, price: 39.99 }
      ],
      paymentMethod: 'Credit Card',
      shippingAddress: '987 Cedar Rd, Seattle, WA 98101',
      lastUpdated: '4 hours ago'
    },
    {
      id: 'ORD-7836',
      customer: 'James Taylor',
      email: 'james@example.com',
      date: '2024-03-12',
      amount: 524.97,
      status: 'shipped',
      items: [
        { productId: 3, name: 'Organic Coffee Beans', quantity: 15, price: 24.99 },
        { productId: 4, name: 'Yoga Mat Premium', quantity: 2, price: 49.99 }
      ],
      paymentMethod: 'Credit Card',
      shippingAddress: '147 Birch Ln, Boston, MA 02101',
      lastUpdated: '5 hours ago'
    }
  ])

  // Customers Data
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', orders: 12, spent: 4852.50, lastOrder: '2024-03-15', status: 'active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', orders: 8, spent: 3245.75, lastOrder: '2024-03-15', status: 'active' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', orders: 15, spent: 8762.30, lastOrder: '2024-03-14', status: 'active' },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', orders: 5, spent: 1845.25, lastOrder: '2024-03-14', status: 'inactive' },
    { id: 5, name: 'David Lee', email: 'david@example.com', orders: 9, spent: 3678.90, lastOrder: '2024-03-13', status: 'active' }
  ])

  // Chart Data
  const [salesData, setSalesData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue 2024',
        data: [45.2, 52.1, 48.3, 58.9, 62.5, 71.8, 68.4, 75.2, 82.1, 78.5, 85.3, 92.7],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Revenue 2023',
        data: [38.1, 42.3, 40.2, 45.8, 49.3, 52.7, 55.1, 58.4, 62.8, 65.2, 68.9, 72.5],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
        fill: true,
        tension: 0.4,
        borderDash: [5, 5]
      }
    ]
  })

  const categoryData = {
    labels: categories.map(c => c.name),
    datasets: [
      {
        data: categories.map(c => c.revenue),
        backgroundColor: categories.map(c => c.color),
        borderWidth: 0
      }
    ]
  }

  const dailySalesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [42, 38, 45, 52, 58, 67, 71],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: '#10b981',
        borderWidth: 2
      }
    ]
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateStats()
    }, 45000) // Update every 45 seconds
    
    return () => clearInterval(interval)
  }, [])

  const updateStats = () => {
    setStats(prev => prev.map(stat => {
      if (stat.id === 1) { // Daily Revenue
        return { ...stat, value: stat.value + Math.floor(Math.random() * 200) - 50 }
      }
      if (stat.id === 3) { // Pending Orders
        const change = Math.floor(Math.random() * 3) - 1
        return { ...stat, value: Math.max(0, stat.value + change) }
      }
      return stat
    }))
  }

  // CRUD Operations for Products
  const handleAddProduct = (product) => {
    const newProduct = {
      id: products.length + 1,
      ...product,
      sales: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      status: 'active'
    }
    setProducts([...products, newProduct])
    setShowProductModal(false)
    showNotification('Product added successfully!', 'success')
    
    // Update category product count
    setCategories(prev => prev.map(cat => 
      cat.name === product.category 
        ? { ...cat, productCount: cat.productCount + 1 }
        : cat
    ))
  }

  const handleUpdateProduct = (product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p))
    setShowProductModal(false)
    setSelectedProduct(null)
    showNotification('Product updated successfully!', 'success')
  }

  const handleDeleteProduct = (productId) => {
    setItemToDelete(productId)
    setDeleteType('product')
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (deleteType === 'product') {
      const productToDelete = products.find(p => p.id === itemToDelete)
      setProducts(prev => prev.filter(p => p.id !== itemToDelete))
      
      // Update category product count
      if (productToDelete) {
        setCategories(prev => prev.map(cat => 
          cat.name === productToDelete.category 
            ? { ...cat, productCount: cat.productCount - 1 }
            : cat
        ))
      }
      showNotification('Product deleted successfully!', 'success')
    }
    
    if (deleteType === 'order') {
      setOrders(prev => prev.filter(o => o.id !== itemToDelete))
      showNotification('Order cancelled successfully!', 'success')
    }
    
    if (deleteType === 'category') {
      setCategories(prev => prev.filter(c => c.id !== itemToDelete))
      showNotification('Category deleted successfully!', 'success')
    }
    
    setShowDeleteModal(false)
    setItemToDelete(null)
    setDeleteType('')
  }

  // Order Management
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, lastUpdated: 'Just now' }
        : order
    ))
    showNotification(`Order ${orderId} status updated to ${newStatus}!`, 'success')
  }

  const handleCreateOrder = () => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      customer: 'New Customer',
      email: 'customer@example.com',
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      status: 'pending',
      items: [],
      paymentMethod: 'Credit Card',
      shippingAddress: '',
      lastUpdated: 'Just now'
    }
    setOrders([newOrder, ...orders])
    setSelectedOrder(newOrder)
    setShowOrderModal(true)
    showNotification('New order created!', 'success')
  }

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    showNotification(`${product.name} added to cart!`, 'success')
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      showNotification('Cart is empty!', 'error')
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
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      paymentMethod: 'Credit Card',
      shippingAddress: '',
      lastUpdated: 'Just now'
    }
    
    setOrders([newOrder, ...orders])
    setCart([])
    setShowCart(false)
    showNotification(`Order #${newOrder.id} created successfully!`, 'success')
  }

  // Filtering & Search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Notifications
  const showNotification = (message, type = 'info') => {
    const notification = new CustomEvent('showNotification', {
      detail: { message, type }
    })
    window.dispatchEvent(notification)
  }

  // Bulk Operations
  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      showNotification('No products selected!', 'error')
      return
    }
    
    setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)))
    setSelectedProducts([])
    showNotification(`${selectedProducts.length} products deleted!`, 'success')
  }

  const handleBulkStatusUpdate = (status) => {
    if (selectedProducts.length === 0) {
      showNotification('No products selected!', 'error')
      return
    }
    
    setProducts(prev => prev.map(p => 
      selectedProducts.includes(p.id) ? { ...p, status } : p
    ))
    setSelectedProducts([])
    showNotification(`${selectedProducts.length} products updated to ${status}!`, 'success')
  }

  // Export Data
  const handleExport = (type) => {
    let data = []
    let filename = ''
    
    if (type === 'products') {
      data = products
      filename = 'products-export.json'
    } else if (type === 'orders') {
      data = orders
      filename = 'orders-export.json'
    } else if (type === 'customers') {
      data = customers
      filename = 'customers-export.json'
    }
    
    const dataStr = JSON.stringify(data, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', filename)
    linkElement.click()
    
    showNotification(`${type} exported successfully!`, 'success')
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#a0a0d0',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(10, 10, 26, 0.9)',
        titleColor: '#f0f0ff',
        bodyColor: '#a0a0d0',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#a0a0d0' }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#a0a0d0' }
      }
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
            E-Commerce Hub
          </h1>
          <p className="text-gray-400 flex items-center gap-2">
            <FiShoppingBag className="w-4 h-4" />
            Manage your entire e-commerce ecosystem in one place
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <FiShoppingCart className="w-4 h-4" />
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setShowProductModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" />
            Add Product
          </button>
          
          <button
            onClick={() => handleCreateOrder()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <FiTruck className="w-4 h-4" />
            New Order
          </button>
        </div>
      </div>

      {/* Cart Slideout */}
      {showCart && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 z-50 bg-[#0a0a1a] border-l border-white/10 shadow-2xl">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FiShoppingCart className="w-5 h-5" />
                Shopping Cart
              </h3>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 rounded-lg hover:bg-white/10"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <FiShoppingCart className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <FiBox className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-gray-400">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </div>
                      </div>
                      <div className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
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
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions Bar */}
      <div className="glass-card p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <span className="text-sm text-gray-400">Quick Filters:</span>
          </div>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === 'overview' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <FiPieChart className="inline w-4 h-4 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === 'products' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <FiBox className="inline w-4 h-4 mr-2" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === 'orders' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <FiPackage className="inline w-4 h-4 mr-2" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === 'customers' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <FiUsers className="inline w-4 h-4 mr-2" />
            Customers
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === 'inventory' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <FiAlertCircle className="inline w-4 h-4 mr-2" />
            Inventory
          </button>
          
          <div className="flex-1" />
          
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products, orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm w-64"
            />
          </div>
          
          <button
            onClick={() => handleExport(activeTab === 'products' ? 'products' : activeTab === 'orders' ? 'orders' : 'customers')}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
            title="Export Data"
          >
            <FiDownload className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {stats.map((stat) => (
              <div 
                key={stat.id}
                className="glass-card p-4 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                onClick={() => showNotification(`Viewing ${stat.title} details`)}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {stat.trend === 'up' ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
                <div className="mt-3">
                  <div className="text-xl font-bold">
                    {stat.isCurrency ? '$' : ''}{stat.value.toLocaleString()}{stat.suffix || ''}
                  </div>
                  <div className="text-sm text-gray-400">{stat.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Revenue Trends</h3>
                <div className="flex items-center gap-2">
                  <select 
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
                    <FiRefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="h-80">
                <Line data={salesData} options={chartOptions} />
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Category Revenue</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300">
                  View All
                </button>
              </div>
              <div className="h-80">
                <Doughnut data={categoryData} options={{
                  ...chartOptions,
                  cutout: '60%',
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      position: 'bottom',
                      labels: { ...chartOptions.plugins.legend.labels }
                    }
                  }
                }} />
              </div>
            </div>
          </div>

          {/* Daily Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4">Daily Orders</h3>
              <div className="h-48">
                <Bar data={dailySalesData} options={{
                  ...chartOptions,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } }
                }} />
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4">Top Categories</h3>
              <div className="space-y-3">
                {categories.slice(0, 5).map((category) => (
                  <div key={category.id} className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="flex-1 text-sm">{category.name}</span>
                    <span className="text-sm font-semibold">
                      ${(category.revenue / 1000).toFixed(1)}k
                    </span>
                    <span className="text-xs text-gray-400">
                      {category.productCount} products
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setShowProductModal(true)}
                  className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-3 transition-colors"
                >
                  <FiBox className="w-4 h-4 text-blue-400" />
                  <span className="flex-1 text-left">Add New Product</span>
                  <FiPlus className="w-4 h-4 text-gray-400" />
                </button>
                <button 
                  onClick={handleCreateOrder}
                  className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-3 transition-colors"
                >
                  <FiTruck className="w-4 h-4 text-green-400" />
                  <span className="flex-1 text-left">Create New Order</span>
                  <FiPlus className="w-4 h-4 text-gray-400" />
                </button>
                <button 
                  onClick={() => setActiveTab('inventory')}
                  className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-3 transition-colors"
                >
                  <FiAlertCircle className="w-4 h-4 text-red-400" />
                  <span className="flex-1 text-left">Check Low Stock</span>
                  <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-full">
                    8 items
                  </span>
                </button>
                <button 
                  onClick={() => handleExport('reports')}
                  className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-3 transition-colors"
                >
                  <FiBarChart2 className="w-4 h-4 text-purple-400" />
                  <span className="flex-1 text-left">Generate Report</span>
                  <FiDownload className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FiBox className="w-5 h-5" />
              Product Management
            </h2>
            
            {selectedProducts.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">
                  {selectedProducts.length} products selected
                </span>
                <button
                  onClick={() => handleBulkStatusUpdate('active')}
                  className="px-3 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 text-sm"
                >
                  <FiCheck className="inline w-4 h-4 mr-1" />
                  Activate
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('inactive')}
                  className="px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 text-sm"
                >
                  <FiX className="inline w-4 h-4 mr-1" />
                  Deactivate
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 text-sm"
                >
                  <FiTrash2 className="inline w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            )}
          </div>
          
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4 text-left">
                      <input 
                        type="checkbox"
                        className="rounded border-white/10 bg-white/5"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts(filteredProducts.map(p => p.id))
                          } else {
                            setSelectedProducts([])
                          }
                        }}
                      />
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Product</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">SKU</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Price</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Cost</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Stock</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Sales</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Revenue</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Rating</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Status</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr 
                      key={product.id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
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
                          className="rounded border-white/10 bg-white/5"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <FiBox className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold">{product.name}</div>
                            <div className="text-sm text-gray-400">{product.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{product.sku}</td>
                      <td className="p-4 font-semibold">${product.price.toFixed(2)}</td>
                      <td className="p-4 text-gray-400">${product.cost.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={product.stock < 20 ? 'text-red-400 font-semibold' : 'text-green-400'}>
                          {product.stock}
                        </span>
                        {product.stock < 20 && (
                          <span className="ml-2 text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded-full">
                            Low
                          </span>
                        )}
                      </td>
                      <td className="p-4">{product.sales.toLocaleString()}</td>
                      <td className="p-4 font-semibold text-blue-400">
                        ${product.revenue.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span>{product.rating}</span>
                          <span className="text-xs text-gray-400">({product.reviews})</span>
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
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
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
            
            {filteredProducts.length === 0 && (
              <div className="p-12 text-center">
                <FiBox className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">No products found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FiPackage className="w-5 h-5" />
            Order Management
          </h2>
          
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Order ID</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Customer</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Date</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Items</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Amount</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Payment</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Status</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Last Updated</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr 
                      key={order.id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedOrder(order)
                        setShowOrderModal(true)
                      }}
                    >
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
                        <span className="px-2 py-1 bg-white/5 rounded-lg text-sm">
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
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          order.status === 'processing' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                          order.status === 'shipped' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          order.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-400">{order.lastUpdated}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => {
                              setSelectedOrder(order)
                              setShowInvoiceModal(true)
                            }}
                            className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
                            title="View Invoice"
                          >
                            <FiPrinter className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Customers Tab */}
      {activeTab === 'customers' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FiUsers className="w-5 h-5" />
            Customer Management
          </h2>
          
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Customer</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Email</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Orders</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Total Spent</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Last Order</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Status</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="font-medium">{customer.name}</div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{customer.email}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-white/5 rounded-lg">
                          {customer.orders} orders
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-blue-400">
                        ${customer.spent.toFixed(2)}
                      </td>
                      <td className="p-4 text-sm">
                        {new Date(customer.lastOrder).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
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
                          <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                            <FiMail className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20">
                            <FiEye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FiAlertCircle className="w-5 h-5" />
            Inventory Management
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6 lg:col-span-2">
              <h3 className="text-lg font-bold mb-4">Low Stock Alert</h3>
              <div className="space-y-4">
                {products.filter(p => p.stock < 20).map((product) => (
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
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                      Restock
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4">Inventory Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Products</span>
                  <span className="font-semibold">{products.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Low Stock Items</span>
                  <span className="font-semibold text-red-400">
                    {products.filter(p => p.stock < 20).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Out of Stock</span>
                  <span className="font-semibold text-red-400">
                    {products.filter(p => p.stock === 0).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Value</span>
                  <span className="font-semibold text-blue-400">
                    ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
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
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <ProductForm 
                product={selectedProduct}
                categories={categories}
                onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
                onCancel={() => {
                  setShowProductModal(false)
                  setSelectedProduct(null)
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Customer Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FiUsers className="w-4 h-4 text-gray-400" />
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
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="font-semibold">${selectedOrder.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Shipping:</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="flex justify-between py-2 text-lg font-bold border-t border-white/10 pt-2">
                    <span>Total:</span>
                    <span className="text-blue-400">${selectedOrder.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'completed')}
                  className="px-4 py-2 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20"
                >
                  <FiCheckCircle className="inline w-4 h-4 mr-2" />
                  Mark Complete
                </button>
                <button
                  onClick={() => setShowInvoiceModal(true)}
                  className="px-4 py-2 rounded-xl bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border border-purple-500/20"
                >
                  <FiPrinter className="inline w-4 h-4 mr-2" />
                  Generate Invoice
                </button>
                <button
                  onClick={() => {
                    handleDeleteOrder(selectedOrder.id)
                    setShowOrderModal(false)
                  }}
                  className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
                >
                  <FiTrash2 className="inline w-4 h-4 mr-2" />
                  Cancel Order
                </button>
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

// Product Form Component
const ProductForm = ({ product, categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    category: categories[0]?.name || '',
    price: '',
    cost: '',
    stock: '',
    sku: `PRD-${Math.floor(Math.random() * 1000)}`,
    status: 'active',
    tags: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-input w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="form-input w-full"
            required
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Price ($)</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="form-input w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Cost ($)</label>
          <input
            type="number"
            step="0.01"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
            className="form-input w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Stock</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
            className="form-input w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">SKU</label>
          <input
            type="text"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            className="form-input w-full"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
        <input
          type="text"
          value={formData.tags.join(', ')}
          onChange={(e) => setFormData({ 
            ...formData, 
            tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) 
          })}
          className="form-input w-full"
          placeholder="wireless, audio, premium"
        />
      </div>
      
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
        >
          <FiSave className="inline w-4 h-4 mr-2" />
          {product ? 'Update Product' : 'Add Product'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ECommerce
