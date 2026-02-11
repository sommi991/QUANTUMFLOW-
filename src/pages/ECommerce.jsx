import { useState, useEffect } from 'react'
import { 
  FiShoppingBag, FiBox, FiClock, FiAlertCircle, FiPlus, 
  FiEye, FiEdit, FiTrendingUp, FiTrendingDown, FiTrash2,
  FiDownload, FiRefreshCw, FiCheckCircle, FiXCircle,
  FiSearch, FiFilter, FiDollarSign, FiUsers, FiPackage,
  FiShoppingCart, FiStar, FiTag, FiShare2, FiCopy
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

const ECommerce = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [stockFilter, setStockFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  })

  // Real-time stats
  const [stats, setStats] = useState([
    {
      id: 1,
      title: 'Daily Revenue',
      value: 8245,
      change: 15.2,
      icon: FiShoppingBag,
      color: 'from-blue-500 to-purple-500',
      isCurrency: true,
      trend: 'up'
    },
    {
      id: 2,
      title: 'Total Products',
      value: 1245,
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
      change: 5.1,
      icon: FiAlertCircle,
      color: 'from-red-500 to-pink-500',
      isCurrency: false,
      trend: 'up'
    }
  ])

  // Products with real inventory
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      sku: 'ELEC-001',
      category: 'Electronics',
      price: 299.99,
      cost: 189.99,
      sales: 1248,
      revenue: 374351,
      stock: 45,
      minStock: 20,
      rating: 4.8,
      reviews: 342,
      image: '🎧',
      status: 'active',
      lastRestock: '2024-03-10'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      sku: 'WEAR-001',
      category: 'Wearables',
      price: 199.99,
      cost: 129.99,
      sales: 892,
      revenue: 178391,
      stock: 28,
      minStock: 15,
      rating: 4.6,
      reviews: 215,
      image: '⌚',
      status: 'active',
      lastRestock: '2024-03-12'
    },
    {
      id: 3,
      name: 'Organic Coffee Beans',
      sku: 'FOOD-001',
      category: 'Food & Beverage',
      price: 24.99,
      cost: 12.99,
      sales: 2156,
      revenue: 53874,
      stock: 156,
      minStock: 50,
      rating: 4.9,
      reviews: 478,
      image: '☕',
      status: 'active',
      lastRestock: '2024-03-14'
    },
    {
      id: 4,
      name: 'Yoga Mat Premium',
      sku: 'FIT-001',
      category: 'Fitness',
      price: 49.99,
      cost: 29.99,
      sales: 745,
      revenue: 37243,
      stock: 12,
      minStock: 25,
      rating: 4.7,
      reviews: 189,
      image: '🧘',
      status: 'low-stock',
      lastRestock: '2024-03-05'
    },
    {
      id: 5,
      name: 'Laptop Backpack',
      sku: 'ACC-001',
      category: 'Accessories',
      price: 79.99,
      cost: 49.99,
      sales: 512,
      revenue: 40956,
      stock: 68,
      minStock: 30,
      rating: 4.5,
      reviews: 167,
      image: '🎒',
      status: 'active',
      lastRestock: '2024-03-13'
    },
    {
      id: 6,
      name: 'Wireless Mouse',
      sku: 'ELEC-002',
      category: 'Electronics',
      price: 39.99,
      cost: 19.99,
      sales: 1843,
      revenue: 73657,
      stock: 0,
      minStock: 50,
      rating: 4.4,
      reviews: 324,
      image: '🖱️',
      status: 'out-of-stock',
      lastRestock: '2024-02-28'
    }
  ])

  // Orders with real-time status
  const [orders, setOrders] = useState([
    {
      id: 'ORD-7842',
      customer: 'John Smith',
      email: 'john@example.com',
      date: '2024-03-15',
      amount: 1248.00,
      items: [
        { product: 'Premium Wireless Headphones', quantity: 1, price: 299.99 },
        { product: 'Smart Fitness Watch', quantity: 2, price: 199.99 }
      ],
      status: 'completed',
      shipping: 'Express',
      payment: 'Credit Card',
      tracking: 'TRK-789456123'
    },
    {
      id: 'ORD-7841',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      date: '2024-03-15',
      amount: 845.50,
      items: [
        { product: 'Yoga Mat Premium', quantity: 1, price: 49.99 }
      ],
      status: 'processing',
      shipping: 'Standard',
      payment: 'PayPal',
      tracking: 'TRK-123456789'
    },
    {
      id: 'ORD-7840',
      customer: 'Michael Brown',
      email: 'michael@example.com',
      date: '2024-03-14',
      amount: 2415.00,
      items: [
        { product: 'Premium Wireless Headphones', quantity: 3, price: 299.99 },
        { product: 'Laptop Backpack', quantity: 2, price: 79.99 }
      ],
      status: 'shipped',
      shipping: 'Express',
      payment: 'Credit Card',
      tracking: 'TRK-456789123'
    },
    {
      id: 'ORD-7839',
      customer: 'Emma Wilson',
      email: 'emma@example.com',
      date: '2024-03-14',
      amount: 623.75,
      items: [
        { product: 'Organic Coffee Beans', quantity: 5, price: 24.99 },
        { product: 'Wireless Mouse', quantity: 2, price: 39.99 }
      ],
      status: 'pending',
      shipping: 'Standard',
      payment: 'Credit Card',
      tracking: ''
    },
    {
      id: 'ORD-7838',
      customer: 'David Lee',
      email: 'david@example.com',
      date: '2024-03-13',
      amount: 189.99,
      items: [
        { product: 'Wireless Mouse', quantity: 1, price: 39.99 }
      ],
      status: 'cancelled',
      shipping: 'Standard',
      payment: 'PayPal',
      tracking: ''
    }
  ])

  // Categories for filtering
  const categories = ['Electronics', 'Wearables', 'Food & Beverage', 'Fitness', 'Accessories', 'All']
  const stockStatus = ['All', 'In Stock', 'Low Stock', 'Out of Stock']

  // Chart data
  const [chartData, setChartData] = useState({
    sales: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Sales ($)',
          data: [2450, 3120, 2980, 4150, 3890, 5210, 4870],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    categories: {
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
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      updateRealTimeStats()
    }, 45000) // Update every 45 seconds

    return () => clearInterval(interval)
  }, [])

  const updateRealTimeStats = () => {
    setStats(prev => prev.map(stat => {
      const randomChange = Math.random() > 0.4 ? 
        (Math.random() * 8).toFixed(1) : 
        -(Math.random() * 4).toFixed(1)
      
      const changeValue = stat.id === 1 || stat.id === 3 ? 
        parseFloat(randomChange) : 
        stat.change // Keep some stats stable for demo

      return {
        ...stat,
        change: changeValue,
        trend: changeValue >= 0 ? 'up' : 'down',
        value: stat.id === 1 ? stat.value + Math.floor(Math.random() * 200) :
               stat.id === 3 ? stat.value + (Math.random() > 0.5 ? 1 : -1) :
               stat.value
      }
    }))
  }

  const handleRefreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      updateRealTimeStats()
      setIsRefreshing(false)
      showNotification('Dashboard data refreshed!', 'success')
    }, 1200)
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      showNotification('Please fill in all required fields', 'error')
      return
    }

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      sku: `SKU-${String(products.length + 1).padStart(3, '0')}`,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      cost: parseFloat(newProduct.price) * 0.6,
      sales: 0,
      revenue: 0,
      stock: parseInt(newProduct.stock) || 0,
      minStock: 20,
      rating: 4.0,
      reviews: 0,
      image: '📦',
      status: parseInt(newProduct.stock) > 20 ? 'active' : 'low-stock',
      lastRestock: new Date().toISOString().split('T')[0]
    }

    setProducts([product, ...products])
    setNewProduct({ name: '', category: '', price: '', stock: '', description: '' })
    setShowProductModal(false)
    showNotification(`Product "${product.name}" added successfully!`, 'success')
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowProductModal(true)
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return

    setProducts(products.map(p => 
      p.id === editingProduct.id ? {
        ...p,
        name: editingProduct.name,
        price: editingProduct.price,
        stock: editingProduct.stock,
        category: editingProduct.category,
        status: editingProduct.stock > p.minStock ? 'active' : 
                editingProduct.stock === 0 ? 'out-of-stock' : 'low-stock'
      } : p
    ))

    setEditingProduct(null)
    setShowProductModal(false)
    showNotification(`Product "${editingProduct.name}" updated!`, 'success')
  }

  const handleDeleteProduct = (productId) => {
    setItemToDelete({ type: 'product', id: productId })
    setShowDeleteModal(true)
  }

  const handleRestockProduct = (productId) => {
    setProducts(products.map(p => 
      p.id === productId ? {
        ...p,
        stock: p.stock + 50,
        status: 'active',
        lastRestock: new Date().toISOString().split('T')[0]
      } : p
    ))
    showNotification('Product restocked successfully!', 'success')
  }

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {
        ...order,
        status: newStatus,
        tracking: newStatus === 'shipped' ? `TRK-${Math.floor(Math.random() * 1000000000)}` : order.tracking
      } : order
    ))
    showNotification(`Order ${orderId} status updated to ${newStatus}!`, 'success')
  }

  const handleCreateOrder = () => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      customer: `Customer ${Math.floor(Math.random() * 1000)}`,
      email: `customer${Math.floor(Math.random() * 1000)}@example.com`,
      date: new Date().toISOString().split('T')[0],
      amount: Math.floor(Math.random() * 2000) + 100,
      items: [{ product: 'Sample Product', quantity: 1, price: 99.99 }],
      status: 'pending',
      shipping: 'Standard',
      payment: 'Credit Card',
      tracking: ''
    }

    setOrders([newOrder, ...orders])
    setShowOrderModal(false)
    showNotification(`New order ${newOrder.id} created!`, 'success')
  }

  const handleExportProducts = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + products.map(p => 
          `${p.sku},${p.name},${p.category},${p.price},${p.stock},${p.status}`
        ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `products-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    
    showNotification('Products exported successfully!', 'success')
  }

  const handleDuplicateProduct = (product) => {
    const duplicate = {
      ...product,
      id: products.length + 1,
      sku: `SKU-${String(products.length + 1).padStart(3, '0')}`,
      name: `${product.name} (Copy)`,
      sales: 0,
      reviews: 0
    }
    setProducts([duplicate, ...products])
    showNotification('Product duplicated successfully!', 'success')
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    const matchesStock = stockFilter === 'All' || 
                        (stockFilter === 'In Stock' && product.stock > 20) ||
                        (stockFilter === 'Low Stock' && product.stock > 0 && product.stock <= 20) ||
                        (stockFilter === 'Out of Stock' && product.stock === 0)
    
    return matchesSearch && matchesCategory && matchesStock
  })

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const showNotification = (message, type = 'info') => {
    // Implement your notification system here
    alert(`${type.toUpperCase()}: ${message}`)
  }

  const confirmDelete = () => {
    if (itemToDelete.type === 'product') {
      setProducts(products.filter(p => p.id !== itemToDelete.id))
      showNotification('Product deleted successfully!', 'success')
    }
    setShowDeleteModal(false)
    setItemToDelete(null)
  }

  const productColumns = [
    { 
      key: 'name', 
      title: 'Product',
      className: 'min-w-[200px]',
      render: (value, product) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg">
            {product.image}
          </div>
          <div className="min-w-0">
            <div className="font-semibold truncate">{value}</div>
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <span>{product.sku}</span>
              <span>•</span>
              <span>{product.category}</span>
            </div>
          </div>
        </div>
      )
    },
    { 
      key: 'price', 
      title: 'Price',
      className: 'min-w-[100px]',
      render: (value) => (
        <div className="space-y-1">
          <div className="font-bold text-blue-400">${value.toFixed(2)}</div>
          <div className="text-xs text-gray-400">Cost: ${(value * 0.6).toFixed(2)}</div>
        </div>
      )
    },
    { 
      key: 'stock', 
      title: 'Stock',
      className: 'min-w-[120px]',
      render: (value, product) => (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${
              value === 0 ? 'text-red-400' :
              value <= product.minStock ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {value}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              value === 0 ? 'bg-red-500/10 text-red-400' :
              value <= product.minStock ? 'bg-yellow-500/10 text-yellow-400' :
              'bg-green-500/10 text-green-400'
            }`}>
              {value === 0 ? 'Out of Stock' :
               value <= product.minStock ? 'Low Stock' : 'In Stock'}
            </span>
          </div>
          <div className="text-xs text-gray-400">
            Min: {product.minStock} • Last restock: {product.lastRestock}
          </div>
        </div>
      )
    },
    { 
      key: 'performance', 
      title: 'Performance',
      className: 'min-w-[150px]',
      render: (_, product) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FiShoppingCart className="w-3 h-3 text-gray-400" />
            <span className="text-sm">{product.sales.toLocaleString()} sales</span>
          </div>
          <div className="flex items-center gap-2">
            <FiDollarSign className="w-3 h-3 text-gray-400" />
            <span className="text-sm">${product.revenue.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiStar className="w-3 h-3 text-yellow-400" />
            <span className="text-sm">{product.rating} ({product.reviews})</span>
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      className: 'min-w-[180px]',
      render: (_, product) => (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedProduct(product)
              setShowProductModal(true)
            }}
            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
            title="View Details"
          >
            <FiEye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEditProduct(product)}
            className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
            title="Edit"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDuplicateProduct(product)}
            className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
            title="Duplicate"
          >
            <FiCopy className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleRestockProduct(product.id)}
            className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20"
            title="Restock"
          >
            <FiPackage className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteProduct(product.id)}
            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
            title="Delete"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

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
          <div className="text-xs text-gray-400">{order.email}</div>
        </div>
      )
    },
    { 
      key: 'details', 
      title: 'Order Details',
      className: 'min-w-[180px]',
      render: (_, order) => (
        <div>
          <div className="font-bold text-blue-400">${order.amount.toFixed(2)}</div>
          <div className="text-xs text-gray-400">
            {order.items.length} items • {order.shipping}
          </div>
        </div>
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      className: 'min-w-[130px]',
      render: (value, order) => (
        <div className="space-y-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            value === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
            value === 'processing' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
            value === 'shipped' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
            value === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
            'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
          {order.tracking && (
            <div className="text-xs text-gray-400 truncate">Track: {order.tracking}</div>
          )}
        </div>
      )
    },
    { 
      key: 'payment', 
      title: 'Payment',
      className: 'min-w-[100px]',
      render: (value) => (
        <div className="text-sm">{value}</div>
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
          font: { size: 12 }
        }
      }
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
              E-Commerce Dashboard
            </h1>
            <p className="text-gray-400">
              Manage products, inventory, orders, and customer relationships
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefreshData}
              disabled={isRefreshing}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={handleExportProducts}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <FiDownload className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['overview', 'products', 'orders', 'inventory', 'analytics'].map((tab) => (
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
      </div>

      {/* Quick Actions Bar */}
      <div className="glass-card p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowProductModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Add Product
            </button>
            <button
              onClick={() => setShowOrderModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <FiShoppingCart className="w-4 h-4" />
              Create Order
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="form-input"
            >
              {categories.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
            <select 
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="form-input"
            >
              {stockStatus.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products/orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Stats Grid */}
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <div 
                key={stat.id}
                className="glass-card p-5 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                onClick={() => showNotification(`${stat.title}: $${stat.value} (${stat.change}% ${stat.trend})`)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold">
                        {stat.isCurrency ? '$' : ''}{stat.value.toLocaleString()}
                      </h3>
                      <span className={`inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
                        stat.trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
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
                  Live • Click for details
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Sales Performance</h3>
                <button 
                  onClick={() => showNotification('Sales performance details')}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  View Details
                </button>
              </div>
              <div className="h-64">
                <Line data={chartData.sales} options={chartOptions} />
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Category Distribution</h3>
                <button 
                  onClick={() => showNotification('Category distribution refreshed')}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <FiRefreshCw className="w-3 h-3" />
                  Refresh
                </button>
              </div>
              <div className="h-64">
                <Doughnut data={chartData.categories} options={chartOptions} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Products Management */}
      {(activeTab === 'products' || activeTab === 'overview') && (
        <div className="glass-card overflow-hidden mb-6">
          <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">Product Management</h3>
              <p className="text-sm text-gray-400">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowProductModal(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 flex items-center gap-2"
              >
                <FiPlus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {productColumns.map((col) => (
                    <th key={col.key} className={`p-4 text-left text-sm font-semibold text-gray-400 ${col.className}`}>
                      {col.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr 
                    key={product.id} 
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    {productColumns.map((col) => (
                      <td key={col.key} className={`p-4 ${col.className}`}>
                        {col.render ? col.render(product[col.key], product) : product[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No products found. Try a different search or add a new product.
            </div>
          )}
        </div>
      )}

      {/* Orders Management */}
      {(activeTab === 'orders' || activeTab === 'overview') && (
        <div className="glass-card overflow-hidden">
          <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">Order Management</h3>
              <p className="text-sm text-gray-400">
                {filteredOrders.filter(o => o.status === 'pending').length} pending orders
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowOrderModal(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 flex items-center gap-2"
              >
                <FiPlus className="w-4 h-4" />
                Create Order
              </button>
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
                    onClick={() => {
                      setSelectedOrder(order)
                      setShowOrderModal(true)
                    }}
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
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  onClick={() => {
                    setShowProductModal(false)
                    setEditingProduct(null)
                    setNewProduct({ name: '', category: '', price: '', stock: '', description: '' })
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <FiXCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={editingProduct ? editingProduct.name : newProduct.name}
                      onChange={(e) => editingProduct 
                        ? setEditingProduct({...editingProduct, name: e.target.value})
                        : setNewProduct({...newProduct, name: e.target.value})
                      }
                      className="form-input"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      value={editingProduct ? editingProduct.category : newProduct.category}
                      onChange={(e) => editingProduct
                        ? setEditingProduct({...editingProduct, category: e.target.value})
                        : setNewProduct({...newProduct, category: e.target.value})
                      }
                      className="form-input"
                    >
                      <option value="">Select category</option>
                      {categories.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price ($) *</label>
                    <input
                      type="number"
                      value={editingProduct ? editingProduct.price : newProduct.price}
                      onChange={(e) => editingProduct
                        ? setEditingProduct({...editingProduct, price: e.target.value})
                        : setNewProduct({...newProduct, price: e.target.value})
                      }
                      className="form-input"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Stock Quantity</label>
                    <input
                      type="number"
                      value={editingProduct ? editingProduct.stock : newProduct.stock}
                      onChange={(e) => editingProduct
                        ? setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})
                        : setNewProduct({...newProduct, stock: e.target.value})
                      }
                      className="form-input"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editingProduct ? editingProduct.description : newProduct.description}
                    onChange={(e) => editingProduct
                      ? setEditingProduct({...editingProduct, description: e.target.value})
                      : setNewProduct({...newProduct, description: e.target.value})
                    }
                    className="form-input min-h-[100px]"
                    placeholder="Product description..."
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex gap-3">
                  <button
                    onClick={() => {
                      setShowProductModal(false)
                      setEditingProduct(null)
                      setNewProduct({ name: '', category: '', price: '', stock: '', description: '' })
                    }}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {selectedOrder ? `Order: ${selectedOrder.id}` : 'Create New Order'}
                </h3>
                <button
                  onClick={() => {
                    setShowOrderModal(false)
                    setSelectedOrder(null)
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <FiXCircle className="w-5 h-5" />
                </button>
              </div>

              {selectedOrder ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Customer</label>
                        <p className="font-medium">{selectedOrder.customer}</p>
                        <p className="text-sm text-gray-400">{selectedOrder.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Order Details</label>
                        <p className="font-bold text-blue-400">${selectedOrder.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-400">{selectedOrder.shipping} shipping</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Status</label>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            selectedOrder.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                            selectedOrder.status === 'processing' ? 'bg-blue-500/10 text-blue-500' :
                            selectedOrder.status === 'shipped' ? 'bg-purple-500/10 text-purple-500' :
                            'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                          </span>
                          {selectedOrder.tracking && (
                            <div className="text-sm">
                              <span className="text-gray-400">Tracking: </span>
                              <span className="font-mono">{selectedOrder.tracking}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Payment</label>
                        <p className="font-medium">{selectedOrder.payment}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h4 className="font-semibold mb-4">Order Items</h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="font-medium">{item.product}</p>
                            <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h4 className="font-semibold mb-4">Quick Actions</h4>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          handleUpdateOrderStatus(selectedOrder.id, 'processing')
                          setShowOrderModal(false)
                        }}
                        className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border border-blue-500/20 flex items-center gap-2"
                      >
                        <FiCheckCircle className="w-4 h-4" />
                        Mark as Processing
                      </button>
                      <button
                        onClick={() => {
                          handleUpdateOrderStatus(selectedOrder.id, 'shipped')
                          setShowOrderModal(false)
                        }}
                        className="px-4 py-2 rounded-xl bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border border-purple-500/20 flex items-center gap-2"
                      >
                        <FiPackage className="w-4 h-4" />
                        Mark as Shipped
                      </button>
                      <button
                        onClick={() => {
                          handleUpdateOrderStatus(selectedOrder.id, 'cancelled')
                          setShowOrderModal(false)
                        }}
                        className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 flex items-center gap-2"
                      >
                        <FiXCircle className="w-4 h-4" />
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-gray-400">Create a new order manually or import from CSV.</p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCreateOrder}
                      className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
                    >
                      Create Sample Order
                    </button>
                  </div>
                </div>
              )}
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
                  Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
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

export default ECommerce
