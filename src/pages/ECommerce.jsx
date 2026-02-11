
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { 
  FiShoppingBag, FiBox, FiClock, FiAlertCircle, FiPlus, FiEye, FiEdit, 
  FiTrendingUp, FiTrendingDown, FiSearch, FiFilter, FiDownload, 
  FiTrash2, FiCheckCircle, FiXCircle, FiRefreshCw, FiDollarSign,
  FiStar, FiPackage, FiTruck, FiCheck, FiX, FiSave, FiUpload,
  FiPieChart, FiBarChart2, FiUsers, FiShoppingCart, FiPrinter,
  FiMail, FiMoreVertical, FiHome, FiTag, FiPercent, FiAward,
  FiCreditCard, FiCalendar, FiMapPin, FiPhone, FiUser, FiSettings,
  FiSliders, FiGrid, FiList, FiHeart, FiShare2, FiCopy, FiArchive
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

// Register ChartJS
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

// ==================== CUSTOM HOOKS ====================

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

const useNotification = () => {
  const [notifications, setNotifications] = useState([])

  const showNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, duration)
  }, [])

  return { notifications, showNotification }
}

// ==================== MAIN COMPONENT ====================

const ECommerce = () => {
  // ============ STATE MANAGEMENT ============
  const [activeTab, setActiveTab] = useLocalStorage('ecommerce_tab', 'dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useLocalStorage('product_view', 'grid')
  const [dateRange, setDateRange] = useLocalStorage('date_range', 'month')
  const { notifications, showNotification } = useNotification()

  // ============ MODAL STATES ============
  const [modals, setModals] = useState({
    product: false,
    order: false,
    delete: false,
    invoice: false,
    category: false,
    customer: false,
    bulkEdit: false,
    import: false
  })

  // ============ SELECTED ITEMS ============
  const [selectedItems, setSelectedItems] = useState({
    product: null,
    order: null,
    category: null,
    customer: null
  })

  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectedOrders, setSelectedOrders] = useState([])

  // ============ CART STATE ============
  const [cart, setCart] = useLocalStorage('shopping_cart', [])
  const [showCart, setShowCart] = useState(false)

  // ============ PRODUCTS DATA ============
  const [products, setProducts] = useLocalStorage('products', [
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
      createdAt: '2024-01-15',
      lastUpdated: '2024-03-15'
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
      createdAt: '2024-01-20',
      lastUpdated: '2024-03-14'
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
      createdAt: '2024-01-10',
      lastUpdated: '2024-03-15'
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
      createdAt: '2024-02-01',
      lastUpdated: '2024-03-13'
    },
    {
      id: 'PRD-005',
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
      tags: ['audio', 'bluetooth', 'speaker'],
      createdAt: '2024-02-10',
      lastUpdated: '2024-03-14'
    }
  ])

  // ============ CATEGORIES DATA ============
  const [categories, setCategories] = useLocalStorage('categories', [
    { id: 'CAT-001', name: 'Electronics', productCount: 45, revenue: 425374, color: '#3b82f6' },
    { id: 'CAT-002', name: 'Fashion', productCount: 32, revenue: 287654, color: '#8b5cf6' },
    { id: 'CAT-003', name: 'Home & Living', productCount: 28, revenue: 198765, color: '#ec4899' },
    { id: 'CAT-004', name: 'Food & Beverage', productCount: 15, revenue: 145678, color: '#f59e0b' },
    { id: 'CAT-005', name: 'Fitness', productCount: 12, revenue: 98765, color: '#10b981' },
    { id: 'CAT-006', name: 'Books', productCount: 8, revenue: 45678, color: '#6b7280' },
    { id: 'CAT-007', name: 'Wearables', productCount: 5, revenue: 178391, color: '#ef4444' }
  ])

  // ============ ORDERS DATA ============
  const [orders, setOrders] = useLocalStorage('orders', [
    {
      id: 'ORD-7842',
      customer: 'John Smith',
      email: 'john@example.com',
      phone: '+1 555-0123',
      date: '2024-03-15',
      amount: 1248.00,
      status: 'completed',
      paymentStatus: 'paid',
      shippingStatus: 'delivered',
      items: [
        { productId: 'PRD-001', name: 'Premium Wireless Headphones', quantity: 2, price: 299.99 },
        { productId: 'PRD-005', name: 'Bluetooth Speaker', quantity: 1, price: 89.99 }
      ],
      paymentMethod: 'Credit Card',
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA'
      },
      lastUpdated: '10 minutes ago'
    },
    {
      id: 'ORD-7841',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 555-0456',
      date: '2024-03-15',
      amount: 845.50,
      status: 'processing',
      paymentStatus: 'paid',
      shippingStatus: 'processing',
      items: [
        { productId: 'PRD-002', name: 'Smart Fitness Watch', quantity: 1, price: 199.99 },
        { productId: 'PRD-004', name: 'Yoga Mat Premium', quantity: 3, price: 49.99 }
      ],
      paymentMethod: 'PayPal',
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001',
        country: 'USA'
      },
      lastUpdated: '25 minutes ago'
    }
  ])

  // ============ CUSTOMERS DATA ============
  const [customers, setCustomers] = useLocalStorage('customers', [
    { 
      id: 'CUST-001', 
      name: 'John Smith', 
      email: 'john@example.com',
      phone: '+1 555-0123',
      orders: 12, 
      spent: 4852.50, 
      lastOrder: '2024-03-15', 
      status: 'active',
      joinDate: '2023-06-15',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001'
      }
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
      joinDate: '2023-08-22',
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001'
      }
    }
  ])

  // ============ STATS DATA ============
  const [stats, setStats] = useState([
    { id: 1, title: 'Total Revenue', value: 124589, change: 15.2, icon: FiDollarSign, color: 'from-blue-500 to-purple-500', isCurrency: true, trend: 'up' },
    { id: 2, title: 'Total Orders', value: 1248, change: 8.7, icon: FiShoppingBag, color: 'from-green-500 to-emerald-500', isCurrency: false, trend: 'up' },
    { id: 3, title: 'Active Products', value: 145, change: 5.3, icon: FiBox, color: 'from-yellow-500 to-orange-500', isCurrency: false, trend: 'up' },
    { id: 4, title: 'Total Customers', value: 2847, change: 23.4, icon: FiUsers, color: 'from-purple-500 to-pink-500', isCurrency: false, trend: 'up' },
    { id: 5, title: 'Pending Orders', value: 42, change: -12.3, icon: FiClock, color: 'from-orange-500 to-red-500', isCurrency: false, trend: 'down' },
    { id: 6, title: 'Low Stock Items', value: 8, change: -5.1, icon: FiAlertCircle, color: 'from-red-500 to-pink-500', isCurrency: false, trend: 'down' }
  ])

  // ============ CHART DATA ============
  const salesData = useMemo(() => ({
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
  }), [])

  const categoryData = useMemo(() => ({
    labels: categories.map(c => c.name),
    datasets: [{
      data: categories.map(c => c.revenue),
      backgroundColor: categories.map(c => c.color),
      borderWidth: 0
    }]
  }), [categories])

  // ============ REAL-TIME SIMULATION ============
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        if (stat.id === 1) { // Revenue
          return { ...stat, value: stat.value + Math.floor(Math.random() * 100) }
        }
        if (stat.id === 5) { // Pending Orders
          const change = Math.floor(Math.random() * 3) - 1
          return { ...stat, value: Math.max(0, stat.value + change) }
        }
        return stat
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // ============ PRODUCT OPERATIONS ============
  const handleAddProduct = useCallback((productData) => {
    const newProduct = {
      id: `PRD-${String(products.length + 1).padStart(3, '0')}`,
      ...productData,
      sales: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    
    setProducts(prev => [newProduct, ...prev])
    setModals(prev => ({ ...prev, product: false }))
    showNotification('Product added successfully!', 'success')
    
    // Update category count
    setCategories(prev => prev.map(cat => 
      cat.name === productData.category 
        ? { ...cat, productCount: cat.productCount + 1 }
        : cat
    ))
  }, [products, setProducts, setCategories, showNotification])

  const handleUpdateProduct = useCallback((productData) => {
    setProducts(prev => prev.map(p => 
      p.id === productData.id 
        ? { ...productData, lastUpdated: new Date().toISOString().split('T')[0] }
        : p
    ))
    setModals(prev => ({ ...prev, product: false }))
    setSelectedItems(prev => ({ ...prev, product: null }))
    showNotification('Product updated successfully!', 'success')
  }, [setProducts, showNotification])

  const handleDeleteProduct = useCallback((productId) => {
    const productToDelete = products.find(p => p.id === productId)
    setSelectedItems(prev => ({ ...prev, product: productToDelete }))
    setModals(prev => ({ ...prev, delete: true }))
  }, [products])

  const confirmDelete = useCallback(() => {
    if (selectedItems.product) {
      // Update category count
      setCategories(prev => prev.map(cat => 
        cat.name === selectedItems.product.category 
          ? { ...cat, productCount: cat.productCount - 1 }
          : cat
      ))
      
      setProducts(prev => prev.filter(p => p.id !== selectedItems.product.id))
      showNotification('Product deleted successfully!', 'success')
    }
    
    if (selectedItems.order) {
      setOrders(prev => prev.filter(o => o.id !== selectedItems.order.id))
      showNotification('Order cancelled successfully!', 'success')
    }
    
    setModals(prev => ({ ...prev, delete: false }))
    setSelectedItems(prev => ({ ...prev, product: null, order: null }))
  }, [selectedItems, setProducts, setOrders, setCategories, showNotification])

  // ============ ORDER OPERATIONS ============
  const handleCreateOrder = useCallback(() => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      customer: 'New Customer',
      email: 'customer@example.com',
      phone: '',
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      status: 'pending',
      paymentStatus: 'pending',
      shippingStatus: 'pending',
      items: [],
      paymentMethod: 'Credit Card',
      shippingAddress: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'USA'
      },
      lastUpdated: 'Just now'
    }
    
    setOrders(prev => [newOrder, ...prev])
    setSelectedItems(prev => ({ ...prev, order: newOrder }))
    setModals(prev => ({ ...prev, order: true }))
    showNotification('New order created!', 'success')
  }, [setOrders, showNotification])

  const handleUpdateOrderStatus = useCallback((orderId, field, value) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            [field]: value, 
            lastUpdated: 'Just now',
            status: field === 'status' ? value : order.status,
            paymentStatus: field === 'paymentStatus' ? value : order.paymentStatus,
            shippingStatus: field === 'shippingStatus' ? value : order.shippingStatus
          }
        : order
    ))
    showNotification(`Order ${orderId} updated!`, 'success')
  }, [setOrders, showNotification])

  // ============ CART OPERATIONS ============
  const handleAddToCart = useCallback((product) => {
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
  }, [setCart, showNotification])

  const handleRemoveFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
    showNotification('Item removed from cart', 'info')
  }, [setCart, showNotification])

  const handleUpdateCartQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
      return
    }
    
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ))
  }, [setCart, handleRemoveFromCart])

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) {
      showNotification('Cart is empty!', 'error')
      return
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      customer: 'Guest Customer',
      email: 'guest@example.com',
      phone: '',
      date: new Date().toISOString().split('T')[0],
      amount: total,
      status: 'processing',
      paymentStatus: 'paid',
      shippingStatus: 'processing',
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      paymentMethod: 'Credit Card',
      shippingAddress: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'USA'
      },
      lastUpdated: 'Just now'
    }
    
    setOrders(prev => [newOrder, ...prev])
    setCart([])
    setShowCart(false)
    showNotification(`Order #${newOrder.id} created successfully!`, 'success')
  }, [cart, setOrders, setCart, showNotification])

  // ============ BULK OPERATIONS ============
  const handleBulkDelete = useCallback(() => {
    if (selectedProducts.length === 0) {
      showNotification('No products selected!', 'error')
      return
    }
    
    setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)))
    setSelectedProducts([])
    showNotification(`${selectedProducts.length} products deleted!`, 'success')
  }, [selectedProducts, setProducts, showNotification])

  const handleBulkStatusUpdate = useCallback((status) => {
    if (selectedProducts.length === 0) {
      showNotification('No products selected!', 'error')
      return
    }
    
    setProducts(prev => prev.map(p => 
      selectedProducts.includes(p.id) 
        ? { ...p, status, lastUpdated: new Date().toISOString().split('T')[0] }
        : p
    ))
    setSelectedProducts([])
    showNotification(`${selectedProducts.length} products updated to ${status}!`, 'success')
  }, [selectedProducts, setProducts, showNotification])

  // ============ EXPORT OPERATIONS ============
  const handleExport = useCallback((type) => {
    let data = []
    let filename = ''
    
    switch(type) {
      case 'products':
        data = products
        filename = `products-export-${new Date().toISOString().split('T')[0]}.json`
        break
      case 'orders':
        data = orders
        filename = `orders-export-${new Date().toISOString().split('T')[0]}.json`
        break
      case 'customers':
        data = customers
        filename = `customers-export-${new Date().toISOString().split('T')[0]}.json`
        break
      case 'inventory':
        data = products.map(p => ({
          id: p.id,
          name: p.name,
          sku: p.sku,
          stock: p.stock,
          price: p.price,
          status: p.status
        }))
        filename = `inventory-export-${new Date().toISOString().split('T')[0]}.json`
        break
    }
    
    const dataStr = JSON.stringify(data, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', filename)
    linkElement.click()
    
    showNotification(`${type} exported successfully!`, 'success')
  }, [products, orders, customers, showNotification])

  // ============ FILTERED DATA ============
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [products, searchQuery])

  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [orders, searchQuery])

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [customers, searchQuery])

  // ============ CALCULATED STATS ============
  const calculatedStats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0)
    const totalProducts = products.length
    const totalOrders = orders.length
    const totalCustomers = customers.length
    const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length
    const lowStock = products.filter(p => p.stock < 20).length
    
    return { totalRevenue, totalProducts, totalOrders, totalCustomers, pendingOrders, lowStock }
  }, [products, orders, customers])

  // ============ CHART OPTIONS ============
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#a0a0d0', font: { size: 12 } }
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
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0a0d0' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0a0d0' } }
    }
  }

  // ============ RENDER ============
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#050510] text-white">
      {/* Notification System */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`
              px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border 
              animate-slide-in-right flex items-center gap-3
              ${notification.type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-400' : ''}
              ${notification.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-400' : ''}
              ${notification.type === 'info' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' : ''}
              ${notification.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' : ''}
            `}
          >
            {notification.type === 'success' && <FiCheckCircle className="w-5 h-5" />}
            {notification.type === 'error' && <FiXCircle className="w-5 h-5" />}
            {notification.type === 'info' && <FiAlertCircle className="w-5 h-5" />}
            {notification.type === 'warning' && <FiAlertCircle className="w-5 h-5" />}
            <span>{notification.message}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              E-Commerce Hub
            </h1>
            <p className="text-gray-400 flex items-center gap-2">
              <FiShoppingBag className="w-4 h-4" />
              Complete e-commerce management system with real-time operations
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group"
            >
              <FiShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Add Product Button */}
            <button
              onClick={() => {
                setSelectedItems(prev => ({ ...prev, product: null }))
                setModals(prev => ({ ...prev, product: true }))
              }}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-all duration-300 flex items-center gap-2 group"
            >
              <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span className="hidden sm:inline">Add Product</span>
            </button>

            {/* New Order Button */}
            <button
              onClick={handleCreateOrder}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-all duration-300 flex items-center gap-2 group"
            >
              <FiTruck className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              <span className="hidden sm:inline">New Order</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div className="glass-card p-4 hover:scale-105 transition-all duration-300 cursor-pointer group"
               onClick={() => showNotification('Viewing revenue details')}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiDollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">
                +15.2%
              </span>
            </div>
            <div className="text-2xl font-bold">${calculatedStats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Revenue</div>
          </div>

          <div className="glass-card p-4 hover:scale-105 transition-all duration-300 cursor-pointer group"
               onClick={() => showNotification('Viewing orders')}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">
                +8.7%
              </span>
            </div>
            <div className="text-2xl font-bold">{calculatedStats.totalOrders}</div>
            <div className="text-sm text-gray-400">Total Orders</div>
          </div>

          <div className="glass-card p-4 hover:scale-105 transition-all duration-300 cursor-pointer group"
               onClick={() => setActiveTab('products')}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiBox className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">
                +5.3%
              </span>
            </div>
            <div className="text-2xl font-bold">{calculatedStats.totalProducts}</div>
            <div className="text-sm text-gray-400">Active Products</div>
          </div>

          <div className="glass-card p-4 hover:scale-105 transition-all duration-300 cursor-pointer group"
               onClick={() => setActiveTab('customers')}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiUsers className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">
                +23.4%
              </span>
            </div>
            <div className="text-2xl font-bold">{calculatedStats.totalCustomers}</div>
            <div className="text-sm text-gray-400">Total Customers</div>
          </div>

          <div className="glass-card p-4 hover:scale-105 transition-all duration-300 cursor-pointer group"
               onClick={() => setActiveTab('orders')}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiClock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded-full">
                -12.3%
              </span>
            </div>
            <div className="text-2xl font-bold">{calculatedStats.pendingOrders}</div>
            <div className="text-sm text-gray-400">Pending Orders</div>
          </div>

          <div className="glass-card p-4 hover:scale-105 transition-all duration-300 cursor-pointer group"
               onClick={() => setActiveTab('inventory')}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiAlertCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded-full">
                -5.1%
              </span>
            </div>
            <div className="text-2xl font-bold">{calculatedStats.lowStock}</div>
            <div className="text-sm text-gray-400">Low Stock</div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: FiHome },
            { id: 'products', label: 'Products', icon: FiBox },
            { id: 'orders', label: 'Orders', icon: FiPackage },
            { id: 'customers', label: 'Customers', icon: FiUsers },
            { id: 'inventory', label: 'Inventory', icon: FiArchive },
            { id: 'analytics', label: 'Analytics', icon: FiBarChart2 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2.5 rounded-xl font-medium transition-all duration-300
                flex items-center gap-2 text-sm lg:text-base
                ${activeTab === tab.id 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 scale-105' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:scale-105'
                }
              `}
            >
              <tab.icon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
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
              <button
                onClick={() => handleExport(activeTab)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group"
              >
                <FiDownload className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              <button
                onClick={() => showNotification('Refreshing data...')}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <FiRefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Conditional Content */}
        {activeTab === 'dashboard' && (
          <DashboardContent 
            stats={stats}
            salesData={salesData}
            categoryData={categoryData}
            chartOptions={chartOptions}
            orders={orders}
            products={products}
            onViewOrder={(order) => {
              setSelectedItems(prev => ({ ...prev, order }))
              setModals(prev => ({ ...prev, order: true }))
            }}
            onViewProduct={(product) => {
              setSelectedItems(prev => ({ ...prev, product }))
              setModals(prev => ({ ...prev, product: true }))
            }}
            showNotification={showNotification}
          />
        )}

        {activeTab === 'products' && (
          <ProductsContent 
            products={filteredProducts}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            onEdit={(product) => {
              setSelectedItems(prev => ({ ...prev, product }))
              setModals(prev => ({ ...prev, product: true }))
            }}
            onDelete={handleDeleteProduct}
            onAddToCart={handleAddToCart}
            onBulkDelete={handleBulkDelete}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersContent 
            orders={filteredOrders}
            onUpdateStatus={handleUpdateOrderStatus}
            onViewOrder={(order) => {
              setSelectedItems(prev => ({ ...prev, order }))
              setModals(prev => ({ ...prev, order: true }))
            }}
            onCancelOrder={(orderId) => {
              const order = orders.find(o => o.id === orderId)
              setSelectedItems(prev => ({ ...prev, order }))
              setModals(prev => ({ ...prev, delete: true }))
            }}
          />
        )}

        {activeTab === 'customers' && (
          <CustomersContent 
            customers={filteredCustomers}
            onViewCustomer={(customer) => {
              setSelectedItems(prev => ({ ...prev, customer }))
              setModals(prev => ({ ...prev, customer: true }))
            }}
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryContent 
            products={products}
            onRestock={(productId) => {
              setProducts(prev => prev.map(p => 
                p.id === productId 
                  ? { ...p, stock: p.stock + 50, lastUpdated: new Date().toISOString().split('T')[0] }
                  : p
              ))
              showNotification('Stock updated successfully!', 'success')
            }}
            onExport={handleExport}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsContent 
            orders={orders}
            products={products}
            customers={customers}
            categories={categories}
          />
        )}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <CartSidebar 
          cart={cart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
          onClose={() => setShowCart(false)}
        />
      )}

      {/* Product Modal */}
      {modals.product && (
        <ProductModal
          product={selectedItems.product}
          categories={categories}
          onSubmit={selectedItems.product ? handleUpdateProduct : handleAddProduct}
          onClose={() => {
            setModals(prev => ({ ...prev, product: false }))
            setSelectedItems(prev => ({ ...prev, product: null }))
          }}
        />
      )}

      {/* Order Modal */}
      {modals.order && selectedItems.order && (
        <OrderModal
          order={selectedItems.order}
          onUpdateStatus={handleUpdateOrderStatus}
          onClose={() => {
            setModals(prev => ({ ...prev, order: false }))
            setSelectedItems(prev => ({ ...prev, order: null }))
          }}
          showNotification={showNotification}
        />
      )}

      {/* Customer Modal */}
      {modals.customer && selectedItems.customer && (
        <CustomerModal
          customer={selectedItems.customer}
          orders={orders.filter(o => o.customer === selectedItems.customer.name)}
          onClose={() => {
            setModals(prev => ({ ...prev, customer: false }))
            setSelectedItems(prev => ({ ...prev, customer: null }))
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {modals.delete && (
        <DeleteModal
          item={selectedItems.product || selectedItems.order}
          type={selectedItems.product ? 'product' : 'order'}
          onConfirm={confirmDelete}
          onClose={() => {
            setModals(prev => ({ ...prev, delete: false }))
            setSelectedItems(prev => ({ ...prev, product: null, order: null }))
          }}
        />
      )}
    </div>
  )
}

// ==================== DASHBOARD CONTENT ====================
const DashboardContent = ({ stats, salesData, categoryData, chartOptions, orders, products, onViewOrder, onViewProduct, showNotification }) => {
  const recentOrders = orders.slice(0, 5)
  const topProducts = products.sort((a, b) => b.sales - a.sales).slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Revenue Analytics</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full">2024</span>
              <span className="text-xs px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full">2023</span>
            </div>
          </div>
          <div className="h-80">
            <Line data={salesData} options={chartOptions} />
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Category Distribution</h3>
            <button 
              onClick={() => showNotification('Category analysis view')}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              View Details
            </button>
          </div>
          <div className="h-80">
            <Doughnut data={categoryData} options={{
              ...chartOptions,
              cutout: '65%',
              plugins: {
                ...chartOptions.plugins,
                legend: { position: 'bottom' }
              }
            }} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Recent Orders</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
          </div>
          
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div 
                key={order.id}
                onClick={() => onViewOrder(order)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
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

        {/* Top Products */}
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Top Selling Products</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
          </div>
          
          <div className="space-y-3">
            {topProducts.map(product => (
              <div 
                key={product.id}
                onClick={() => onViewProduct(product)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiBox className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-sm text-gray-400">{product.category}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-green-400">${product.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">{product.sales} sales</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== PRODUCTS CONTENT ====================
const ProductsContent = ({ 
  products, selectedProducts, setSelectedProducts, 
  onEdit, onDelete, onAddToCart, onBulkDelete, onBulkStatusUpdate,
  viewMode, setViewMode 
}) => {
  if (viewMode === 'grid') {
    return (
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
                onClick={() => onBulkStatusUpdate('active')}
                className="px-4 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors text-sm"
              >
                <FiCheckCircle className="inline w-4 h-4 mr-1" />
                Activate
              </button>
              <button
                onClick={() => onBulkStatusUpdate('inactive')}
                className="px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors text-sm"
              >
                <FiXCircle className="inline w-4 h-4 mr-1" />
                Deactivate
              </button>
              <button
                onClick={onBulkDelete}
                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm"
              >
                <FiTrash2 className="inline w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div 
              key={product.id}
              className="glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:rotate-12 transition-transform"
                  onClick={() => onEdit(product)}
                >
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
              
              <div onClick={() => onEdit(product)}>
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
                  onClick={() => onEdit(product)}
                  className="flex-1 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm flex items-center justify-center gap-1"
                >
                  <FiEdit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 px-3 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors text-sm flex items-center justify-center gap-1"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  Cart
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="px-3 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="glass-card p-12 text-center">
            <FiBox className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or add a new product</p>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Add Product
            </button>
          </div>
        )}
      </div>
    )
  }

  // Table View
  return (
    <div className="glass-card overflow-hidden">
      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
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
              onClick={() => onBulkStatusUpdate('active')}
              className="px-4 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors text-sm"
            >
              Activate
            </button>
            <button
              onClick={() => onBulkStatusUpdate('inactive')}
              className="px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors text-sm"
            >
              Deactivate
            </button>
            <button
              onClick={onBulkDelete}
              className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedProducts(products.map(p => p.id))
                    } else {
                      setSelectedProducts([])
                    }
                  }}
                  checked={selectedProducts.length === products.length && products.length > 0}
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
            {products.map(product => (
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
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <FiBox className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-xs text-gray-400">ID: {product.id}</div>
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
                      onClick={() => onEdit(product)}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                      title="Edit Product"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20"
                      title="Add to Cart"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
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
  )
}

// ==================== ORDERS CONTENT ====================
const OrdersContent = ({ orders, onUpdateStatus, onViewOrder, onCancelOrder }) => {
  return (
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
            {orders.map(order => (
              <tr 
                key={order.id} 
                className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => onViewOrder(order)}
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
                  <span className="px-3 py-1 bg-white/5 rounded-full text-sm">
                    {order.items.length} items
                  </span>
                </td>
                <td className="p-4 font-semibold text-blue-400">
                  ${order.amount.toFixed(2)}
                </td>
                <td className="p-4 text-sm text-gray-400">
                  {order.paymentMethod}
                  <div className="text-xs">
                    <span className={`${
                      order.paymentStatus === 'paid' ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      • {order.paymentStatus}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                      order.status === 'processing' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                      order.status === 'shipped' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                      order.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                      'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                    }`}>
                      {order.status}
                    </span>
                    <div className="text-xs text-gray-400">
                      Shipping: {order.shippingStatus}
                    </div>
                  </div>
                </td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order.id, 'status', e.target.value)}
                      className="text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1.5"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => onCancelOrder(order.id)}
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

      {orders.length === 0 && (
        <div className="p-12 text-center">
          <FiPackage className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">No orders found</h3>
          <p className="text-gray-400">Try adjusting your search</p>
        </div>
      )}
    </div>
  )
}

// ==================== CUSTOMERS CONTENT ====================
const CustomersContent = ({ customers, onViewCustomer }) => {
  return (
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
            {customers.map(customer => (
              <tr 
                key={customer.id} 
                className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => onViewCustomer(customer)}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold">{customer.name}</div>
                      <div className="text-xs text-gray-400">ID: {customer.id}</div>
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
                  {new Date(customer.lastOrder).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
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
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                      <FiMail className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20">
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
  )
}

// ==================== INVENTORY CONTENT ====================
const InventoryContent = ({ products, onRestock, onExport }) => {
  const lowStockProducts = products.filter(p => p.stock < 20)
  const outOfStock = products.filter(p => p.stock === 0)
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)

  return (
    <div className="space-y-6">
      {/* Inventory Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <FiBox className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold">{products.length}</div>
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
              <div className="text-2xl font-bold text-red-400">{lowStockProducts.length}</div>
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
              <div className="text-2xl font-bold">{outOfStock.length}</div>
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
              <div className="text-2xl font-bold text-green-400">${totalValue.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Inventory Value</div>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Low Stock Alert</h3>
          <button
            onClick={() => onExport('inventory')}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <FiDownload className="w-4 h-4" />
            Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {lowStockProducts.map(product => (
            <div 
              key={product.id}
              className="flex items-center justify-between p-4 bg-red-500/5 rounded-xl border border-red-500/20 hover:bg-red-500/10 transition-colors"
            >
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
                onClick={() => onRestock(product.id)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm hover:opacity-90 transition-opacity"
              >
                Restock
              </button>
            </div>
          ))}
        </div>

        {lowStockProducts.length === 0 && (
          <div className="text-center py-8">
            <FiCheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <p className="text-gray-400">No low stock items found</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== ANALYTICS CONTENT ====================
const AnalyticsContent = ({ orders, products, customers, categories }) => {
  // Calculate analytics
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0)
  const avgOrderValue = totalRevenue / (orders.length || 1)
  const conversionRate = ((orders.length / (customers.length || 1)) * 100).toFixed(1)
  
  const topCategory = categories.sort((a, b) => b.revenue - a.revenue)[0]
  const topProduct = products.sort((a, b) => b.sales - a.sales)[0]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="text-sm text-gray-400 mb-1">Average Order Value</div>
          <div className="text-3xl font-bold text-blue-400">${avgOrderValue.toFixed(2)}</div>
          <div className="text-sm text-gray-400 mt-2">Across {orders.length} orders</div>
        </div>

        <div className="glass-card p-6">
          <div className="text-sm text-gray-400 mb-1">Conversion Rate</div>
          <div className="text-3xl font-bold text-green-400">{conversionRate}%</div>
          <div className="text-sm text-gray-400 mt-2">Customers to orders</div>
        </div>

        <div className="glass-card p-6">
          <div className="text-sm text-gray-400 mb-1">Top Category</div>
          <div className="text-3xl font-bold text-purple-400">{topCategory?.name}</div>
          <div className="text-sm text-gray-400 mt-2">${topCategory?.revenue.toLocaleString()}</div>
        </div>

        <div className="glass-card p-6">
          <div className="text-sm text-gray-400 mb-1">Best Seller</div>
          <div className="text-xl font-bold text-yellow-400 truncate">{topProduct?.name}</div>
          <div className="text-sm text-gray-400 mt-2">{topProduct?.sales} units sold</div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-3">Category Performance</h4>
            <div className="space-y-3">
              {categories.slice(0, 5).map(cat => (
                <div key={cat.id} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="flex-1 text-sm">{cat.name}</span>
                  <span className="text-sm font-semibold">${(cat.revenue / 1000).toFixed(1)}k</span>
                  <span className="text-xs text-gray-400">{cat.productCount} products</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-3">Recommendations</h4>
            <div className="space-y-3">
              {products.filter(p => p.stock < 20).length > 0 && (
                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="font-semibold text-yellow-500">⚠️ Low Stock Alert</div>
                  <div className="text-sm text-gray-400">
                    {products.filter(p => p.stock < 20).length} products need restocking
                  </div>
                </div>
              )}
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="font-semibold text-blue-500">📈 Sales Opportunity</div>
                <div className="text-sm text-gray-400">
                  {topCategory?.name} category is performing well
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== CART SIDEBAR ====================
const CartSidebar = ({ cart, onUpdateQuantity, onRemove, onCheckout, onClose }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
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
            onClick={onClose}
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
                onClick={onClose}
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
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
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
                      onClick={() => onRemove(item.id)}
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
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={onCheckout}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== PRODUCT MODAL ====================
const ProductModal = ({ product, categories, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    category: categories[0]?.name || '',
    price: '',
    cost: '',
    stock: '',
    sku: `PRD-${Math.floor(Math.random() * 1000)}`,
    description: '',
    tags: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FiBox className="w-5 h-5" />
              {product ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category *</label>
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
                <label className="block text-sm text-gray-400 mb-1">Price ($) *</label>
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
                <label className="block text-sm text-gray-400 mb-1">Cost ($) *</label>
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
                <label className="block text-sm text-gray-400 mb-1">Stock *</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">SKU *</label>
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
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                rows="3"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-input w-full"
                placeholder="Product description..."
              />
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
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <FiSave className="inline w-4 h-4 mr-2" />
                {product ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// ==================== ORDER MODAL ====================
const OrderModal = ({ order, onUpdateStatus, onClose, showNotification }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FiPackage className="w-5 h-5" />
              Order Details: {order.id}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Customer Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4 text-gray-400" />
                  <span>{order.customer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMail className="w-4 h-4 text-gray-400" />
                  <span>{order.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="w-4 h-4 text-gray-400" />
                  <span>{order.phone || 'N/A'}</span>
                </div>
              </div>
              
              <h4 className="text-sm font-semibold text-gray-400 mt-4 mb-3">Shipping Address</h4>
              <div className="space-y-1 text-sm">
                <div>{order.shippingAddress.street}</div>
                <div>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </div>
                <div>{order.shippingAddress.country}</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Order Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(order.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCreditCard className="w-4 h-4 text-gray-400" />
                  <span>{order.paymentMethod}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
              
              <h4 className="text-sm font-semibold text-gray-400 mt-4 mb-3">Order Status</h4>
              <div className="space-y-3">
                <select
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order.id, 'status', e.target.value)}
                  className="form-input w-full"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <select
                  value={order.shippingStatus}
                  onChange={(e) => onUpdateStatus(order.id, 'shippingStatus', e.target.value)}
                  className="form-input w-full"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
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
                {order.items.map((item, index) => (
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
                <span className="font-semibold">${order.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Shipping:</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold border-t border-white/10 pt-2">
                <span>Total:</span>
                <span className="text-blue-400">${order.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== CUSTOMER MODAL ====================
const CustomerModal = ({ customer, orders, onClose }) => {
  const customerOrders = orders.filter(o => o.customer === customer.name)
  const totalSpent = customerOrders.reduce((sum, o) => sum + o.amount, 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FiUsers className="w-5 h-5" />
              Customer Profile
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {customer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h4 className="text-xl font-bold">{customer.name}</h4>
              <div className="text-sm text-gray-400">Customer since {new Date(customer.joinDate).getFullYear()}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FiMail className="w-4 h-4 text-gray-400" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="w-4 h-4 text-gray-400" />
                  <span>{customer.phone}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Customer Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Orders:</span>
                  <span className="font-semibold">{customerOrders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Spent:</span>
                  <span className="font-semibold text-blue-400">${totalSpent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Order:</span>
                  <span className="font-semibold">{new Date(customer.lastOrder).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Order History</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 text-left text-sm font-semibold text-gray-400">Order ID</th>
                  <th className="py-3 text-left text-sm font-semibold text-gray-400">Date</th>
                  <th className="py-3 text-left text-sm font-semibold text-gray-400">Items</th>
                  <th className="py-3 text-left text-sm font-semibold text-gray-400">Amount</th>
                  <th className="py-3 text-left text-sm font-semibold text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {customerOrders.map(order => (
                  <tr key={order.id} className="border-b border-white/10">
                    <td className="py-3 font-semibold">{order.id}</td>
                    <td className="py-3">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="py-3">{order.items.length} items</td>
                    <td className="py-3 font-semibold text-blue-400">${order.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                        order.status === 'processing' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {order.status}
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

// ==================== DELETE MODAL ====================
const DeleteModal = ({ item, type, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-card max-w-md w-full animate-slide-up">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
              <FiTrash2 className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Confirm Delete</h3>
            <p className="text-gray-400">
              Are you sure you want to delete this {type}?
              {item && (
                <span className="block mt-2 font-semibold text-white">
                  {item.id || item.name}
                </span>
              )}
              This action cannot be undone.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ECommerce
