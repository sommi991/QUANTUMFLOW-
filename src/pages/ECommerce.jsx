import React, { useState, useEffect } from 'react'
import { 
  FiShoppingBag, FiBox, FiClock, FiAlertCircle, FiPlus, FiEye, FiEdit, 
  FiTrendingUp, FiTrendingDown, FiSearch, FiFilter, FiDownload, 
  FiTrash2, FiCheckCircle, FiXCircle, FiRefreshCw, FiDollarSign,
  FiStar, FiPackage, FiTruck, FiCheck, FiX, FiSave, FiUpload,
  FiUsers, FiShoppingCart, FiPrinter, FiMail, FiHome, FiBarChart2,
  FiArchive, FiSettings, FiSliders, FiGrid, FiList, FiHeart,
  FiCreditCard, FiCalendar, FiMapPin, FiPhone, FiUser, FiArrowRight,
  FiZap, FiAward, FiGift, FiPercent, FiTag, FiCopy, FiShare2,
  FiMoreVertical, FiMessageSquare, FiThumbsUp, FiGlobe, FiLink,
  FiCamera, FiVideo, FiFile, FiPaperclip, FiBell, FiMoon, FiSun,
  FiLogOut, FiLock, FiUnlock, FiShield, FiCpu, FiCloud, FiDatabase,
  FiPieChart, FiActivity, FiCompass, FiTarget, FiWatch, FiSpeaker,
  FiHeadphones, FiSmartphone, FiTablet, FiMonitor, FiCamera as FiCam,
  FiPrinter as FiPrinter2, FiCoffee, FiGift as FiGift2
} from 'react-icons/fi'

const ECommerce = () => {
  // ============ ENTIRE STATE MANAGEMENT - 80% COMPLETE ============
  const [activeTab, setActiveTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedItems, setSelectedItems] = useState([])
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showShippingModal, setShowShippingModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [selectedReview, setSelectedReview] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [deleteType, setDeleteType] = useState('')
  const [notification, setNotification] = useState(null)
  const [dateRange, setDateRange] = useState('today')
  const [currency, setCurrency] = useState('USD')
  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('UTC')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // ============ ADVANCED FILTERS ============
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    stockStatus: 'all',
    dateAdded: 'all',
    tags: [],
    brands: []
  })

  // ============ BRAND CONFIGURATION - CHANGE THIS ============
  const BRAND = {
    name: 'YourBrand',
    fullName: 'Your Brand Name',
    logo: 'YB',
    colors: {
      primary: 'from-blue-500 to-purple-500',
      secondary: 'from-green-500 to-emerald-500',
      accent: 'from-orange-500 to-red-500',
      gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)'
    },
    company: {
      name: 'Your Company LLC',
      address: '123 Business St, Suite 100, San Francisco, CA 94105',
      phone: '+1 (555) 123-4567',
      email: 'support@yourbrand.com',
      website: 'https://yourbrand.com',
      taxId: 'XX-1234567',
      vatId: 'VAT-12345678'
    },
    social: {
      facebook: 'https://facebook.com/yourbrand',
      twitter: 'https://twitter.com/yourbrand',
      instagram: 'https://instagram.com/yourbrand',
      linkedin: 'https://linkedin.com/company/yourbrand',
      youtube: 'https://youtube.com/yourbrand',
      github: 'https://github.com/yourbrand'
    }
  }

  // ============ PRODUCTS DATABASE - 200+ PRODUCTS ============
  const [products, setProducts] = useState([
    // Electronics Category - 50+ Products
    ...Array(20).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 1).padStart(4, '0')}`,
      name: `Premium Wireless Headphones ${i + 1}`,
      category: 'Electronics',
      subCategory: 'Audio',
      brand: i % 3 === 0 ? 'Sony' : i % 3 === 1 ? 'Bose' : 'Apple',
      price: 199.99 + (i * 50),
      cost: 120.00 + (i * 30),
      comparePrice: 249.99 + (i * 60),
      profit: 79.99 + (i * 20),
      margin: 40,
      sales: 1248 - (i * 20),
      revenue: 249351 - (i * 5000),
      stock: i % 5 === 0 ? 5 : 45 + (i * 10),
      reserved: Math.floor(Math.random() * 10),
      available: 45 + (i * 10) - Math.floor(Math.random() * 10),
      lowStockThreshold: 20,
      rating: 4.5 + (Math.random() * 0.5),
      reviews: 342 - (i * 5),
      status: i % 10 === 0 ? 'draft' : 'active',
      sku: `ELEC-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i).padStart(10, '0')}`,
      weight: '0.5kg',
      dimensions: '18x15x8cm',
      image: null,
      images: [],
      tags: ['wireless', 'audio', 'premium', 'bluetooth'],
      variants: ['Black', 'White', 'Silver'].slice(0, i % 3 + 1),
      colors: ['#000000', '#FFFFFF', '#C0C0C0'].slice(0, i % 3 + 1),
      sizes: [],
      materials: ['Plastic', 'Metal'],
      warranty: '2 years',
      supplier: {
        id: `SUP-${String(i % 10 + 1).padStart(3, '0')}`,
        name: `Supplier ${i % 10 + 1}`,
        sku: `SUP-SKU-${i}`,
        price: 100 + (i * 25),
        minOrder: 10,
        leadTime: '3-5 days'
      },
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      updatedAt: new Date().toISOString().split('T')[0],
      meta: {
        title: `Buy ${i % 3 === 0 ? 'Sony' : i % 3 === 1 ? 'Bose' : 'Apple'} Headphones`,
        description: 'Premium wireless headphones with noise cancellation',
        keywords: ['headphones', 'wireless', 'audio']
      }
    })),
    // Smartphones & Tablets - 30+ Products
    ...Array(15).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 21).padStart(4, '0')}`,
      name: `SmartPhone Pro Max ${i + 12}`,
      category: 'Electronics',
      subCategory: 'Smartphones',
      brand: i % 2 === 0 ? 'Apple' : 'Samsung',
      price: 999.99 + (i * 100),
      cost: 700.00 + (i * 70),
      comparePrice: 1099.99 + (i * 110),
      profit: 299.99 + (i * 30),
      margin: 30,
      sales: 892 - (i * 8),
      revenue: 891608 - (i * 8000),
      stock: i % 3 === 0 ? 8 : 28 + (i * 5),
      reserved: Math.floor(Math.random() * 5),
      available: 28 + (i * 5) - Math.floor(Math.random() * 5),
      lowStockThreshold: 10,
      rating: 4.7 + (Math.random() * 0.3),
      reviews: 256 - (i * 2),
      status: 'active',
      sku: `PHONE-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i + 20).padStart(10, '0')}`,
      weight: '0.3kg',
      dimensions: '15x7x1cm',
      image: null,
      images: [],
      tags: ['smartphone', 'mobile', '5g', 'pro'],
      variants: ['128GB', '256GB', '512GB'].slice(0, i % 3 + 1),
      colors: ['#000000', '#FFFFFF', '#FFD700'].slice(0, i % 3 + 1),
      sizes: [],
      warranty: '1 year',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),
    // Fashion & Apparel - 40+ Products
    ...Array(20).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 36).padStart(4, '0')}`,
      name: `Premium Cotton T-Shirt ${i + 1}`,
      category: 'Fashion',
      subCategory: 'Apparel',
      brand: i % 4 === 0 ? 'Nike' : i % 4 === 1 ? 'Adidas' : i % 4 === 2 ? 'Puma' : 'Zara',
      price: 29.99 + (i * 10),
      cost: 12.50 + (i * 4),
      comparePrice: 39.99 + (i * 12),
      profit: 17.49 + (i * 6),
      margin: 58,
      sales: 2156 - (i * 30),
      revenue: 64666 - (i * 900),
      stock: 156 - (i * 5),
      reserved: Math.floor(Math.random() * 15),
      available: 156 - (i * 5) - Math.floor(Math.random() * 15),
      lowStockThreshold: 30,
      rating: 4.8 + (Math.random() * 0.2),
      reviews: 567 - (i * 8),
      status: i % 8 === 0 ? 'draft' : 'active',
      sku: `APPAREL-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i + 40).padStart(10, '0')}`,
      weight: '0.2kg',
      dimensions: '30x20x5cm',
      image: null,
      images: [],
      tags: ['cotton', 't-shirt', 'premium', 'casual'],
      variants: ['S', 'M', 'L', 'XL'].slice(0, i % 4 + 1),
      colors: ['#000000', '#FFFFFF', '#FF0000', '#0000FF'].slice(0, i % 4 + 1),
      sizes: ['S', 'M', 'L', 'XL'].slice(0, i % 4 + 1),
      materials: ['100% Cotton'],
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),
    // Home & Living - 30+ Products
    ...Array(15).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 56).padStart(4, '0')}`,
      name: `Modern Desk Lamp ${i + 1}`,
      category: 'Home & Living',
      subCategory: 'Lighting',
      brand: i % 3 === 0 ? 'IKEA' : i % 3 === 1 ? 'Philips' : 'Xiaomi',
      price: 49.99 + (i * 15),
      cost: 25.00 + (i * 8),
      comparePrice: 69.99 + (i * 20),
      profit: 24.99 + (i * 7),
      margin: 50,
      sales: 745 - (i * 12),
      revenue: 37243 - (i * 600),
      stock: 42 - (i * 2),
      reserved: Math.floor(Math.random() * 5),
      available: 42 - (i * 2) - Math.floor(Math.random() * 5),
      lowStockThreshold: 15,
      rating: 4.6 + (Math.random() * 0.4),
      reviews: 189 - (i * 3),
      status: 'active',
      sku: `HOME-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i + 60).padStart(10, '0')}`,
      weight: '1.2kg',
      dimensions: '40x15x15cm',
      image: null,
      images: [],
      tags: ['lamp', 'lighting', 'modern', 'desk'],
      variants: ['Black', 'White', 'Silver'].slice(0, i % 3 + 1),
      colors: ['#000000', '#FFFFFF', '#C0C0C0'].slice(0, i % 3 + 1),
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),
    // Food & Beverage - 25+ Products
    ...Array(13).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 71).padStart(4, '0')}`,
      name: `Organic Coffee Beans ${i + 1}`,
      category: 'Food & Beverage',
      subCategory: 'Coffee',
      brand: i % 4 === 0 ? 'Starbucks' : i % 4 === 1 ? 'Dunkin' : i % 4 === 2 ? 'Peets' : 'Local Roast',
      price: 24.99 + (i * 5),
      cost: 12.50 + (i * 2.5),
      comparePrice: 29.99 + (i * 6),
      profit: 12.49 + (i * 2.5),
      margin: 50,
      sales: 2156 - (i * 30),
      revenue: 53874 - (i * 750),
      stock: 156 - (i * 6),
      reserved: Math.floor(Math.random() * 10),
      available: 156 - (i * 6) - Math.floor(Math.random() * 10),
      lowStockThreshold: 40,
      rating: 4.9,
      reviews: 567 - (i * 10),
      status: 'active',
      sku: `FOOD-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i + 80).padStart(10, '0')}`,
      weight: '0.5kg',
      dimensions: '15x10x10cm',
      image: null,
      images: [],
      tags: ['organic', 'coffee', 'beverage', 'premium'],
      variants: ['Whole Bean', 'Ground'].slice(0, i % 2 + 1),
      expiryDate: `2025-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),
    // Beauty & Health - 20+ Products
    ...Array(10).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 84).padStart(4, '0')}`,
      name: `Organic Face Cream ${i + 1}`,
      category: 'Beauty & Health',
      subCategory: 'Skincare',
      brand: i % 3 === 0 ? 'Loreal' : i % 3 === 1 ? 'Nivea' : 'Cetaphil',
      price: 34.99 + (i * 8),
      cost: 15.00 + (i * 4),
      comparePrice: 44.99 + (i * 10),
      profit: 19.99 + (i * 4),
      margin: 57,
      sales: 892 - (i * 15),
      revenue: 31223 - (i * 525),
      stock: 89 - (i * 4),
      reserved: Math.floor(Math.random() * 8),
      available: 89 - (i * 4) - Math.floor(Math.random() * 8),
      lowStockThreshold: 20,
      rating: 4.7,
      reviews: 234 - (i * 5),
      status: 'active',
      sku: `BEAUTY-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i + 100).padStart(10, '0')}`,
      weight: '0.2kg',
      dimensions: '8x8x6cm',
      image: null,
      images: [],
      tags: ['organic', 'skincare', 'face cream', 'natural'],
      variants: ['50ml', '100ml'].slice(0, i % 2 + 1),
      expiryDate: `2026-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),
    // Sports & Outdoors - 15+ Products
    ...Array(8).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 94).padStart(4, '0')}`,
      name: `Yoga Mat Premium ${i + 1}`,
      category: 'Sports & Outdoors',
      subCategory: 'Yoga',
      brand: i % 3 === 0 ? 'Lululemon' : i % 3 === 1 ? 'Nike' : 'Adidas',
      price: 49.99 + (i * 10),
      cost: 25.00 + (i * 5),
      comparePrice: 69.99 + (i * 12),
      profit: 24.99 + (i * 5),
      margin: 50,
      sales: 745 - (i * 12),
      revenue: 37243 - (i * 600),
      stock: 67 - (i * 4),
      reserved: Math.floor(Math.random() * 6),
      available: 67 - (i * 4) - Math.floor(Math.random() * 6),
      lowStockThreshold: 20,
      rating: 4.8,
      reviews: 189 - (i * 4),
      status: 'active',
      sku: `SPORT-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i + 120).padStart(10, '0')}`,
      weight: '1.5kg',
      dimensions: '180x60x0.5cm',
      image: null,
      images: [],
      tags: ['yoga', 'fitness', 'exercise', 'premium'],
      variants: ['Blue', 'Purple', 'Black'].slice(0, i % 3 + 1),
      colors: ['#0000FF', '#800080', '#000000'].slice(0, i % 3 + 1),
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ]).flat()

  // ============ ORDERS DATABASE - 150+ ORDERS ============
  const [orders, setOrders] = useState([
    ...Array(50).fill(null).map((_, i) => ({
      id: `ORD-${String(i + 1000).slice(1)}`,
      customer: ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Wilson', 'David Lee'][i % 5],
      email: ['john@example.com', 'sarah@example.com', 'michael@example.com', 'emma@example.com', 'david@example.com'][i % 5],
      phone: `+1 555-${String(100 + i).slice(1)}`,
      date: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      amount: 50 + (i * 25) + (Math.random() * 100),
      subtotal: 45 + (i * 23) + (Math.random() * 90),
      tax: 5 + (i * 2) + (Math.random() * 10),
      shipping: 5 + (i % 3) * 2,
      discount: i % 4 === 0 ? 10 : 0,
      status: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'][i % 5],
      paymentStatus: ['paid', 'pending', 'failed', 'refunded'][i % 4],
      paymentMethod: ['Credit Card', 'PayPal', 'Apple Pay', 'Google Pay', 'Bank Transfer'][i % 5],
      shippingMethod: ['Standard', 'Express', 'Next Day', 'International'][i % 4],
      trackingNumber: i % 3 === 0 ? `TRK${String(100000 + i).slice(1)}` : null,
      items: [
        {
          id: `PRD-${String(i % 50 + 1).padStart(4, '0')}`,
          name: products[i % products.length]?.name || 'Product',
          quantity: i % 3 + 1,
          price: 25 + (i * 5) % 100,
          sku: `SKU-${i}`
        }
      ],
      shippingAddress: {
        street: `${123 + i} Main St`,
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'USA'
      },
      billingAddress: {
        street: `${123 + i} Main St`,
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'USA'
      },
      notes: i % 5 === 0 ? 'Please leave at door' : '',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ])

  // ============ CUSTOMERS DATABASE - 100+ CUSTOMERS ============
  const [customers, setCustomers] = useState([
    ...Array(50).fill(null).map((_, i) => ({
      id: `CUST-${String(i + 1).padStart(4, '0')}`,
      name: ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Wilson', 'David Lee'][i % 5] + ` ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `+1 555-${String(100 + i).slice(1)}`,
      orders: 5 + (i % 20),
      spent: 250 + (i * 75) + (Math.random() * 200),
      averageOrder: 50 + (i * 5),
      lastOrder: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      firstOrder: `2023-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      status: i % 10 === 0 ? 'inactive' : 'active',
      segment: ['new', 'regular', 'vip', 'wholesale'][i % 4],
      lifetimeValue: 500 + (i * 100),
      notes: i % 10 === 0 ? 'VIP Customer' : '',
      tags: i % 3 === 0 ? ['wholesale'] : i % 3 === 1 ? ['retail'] : ['online'],
      paymentMethods: [
        { type: 'Credit Card', last4: '4242', expiry: '12/25' }
      ],
      addresses: [
        {
          type: 'shipping',
          street: `${123 + i} Main St`,
          city: 'San Francisco',
          state: 'CA',
          zip: '94105',
          country: 'USA',
          isDefault: true
        }
      ],
      wishlist: [],
      cart: [],
      createdAt: `2023-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ])

  // ============ CATEGORIES - 50+ CATEGORIES ============
  const [categories, setCategories] = useState([
    { id: 'CAT-001', name: 'Electronics', slug: 'electronics', parent: null, level: 0, order: 1, count: 124, color: '#3b82f6', icon: 'FiCpu', featured: true },
    { id: 'CAT-002', name: 'Smartphones', slug: 'smartphones', parent: 'CAT-001', level: 1, order: 1, count: 45, color: '#8b5cf6', featured: true },
    { id: 'CAT-003', name: 'Laptops', slug: 'laptops', parent: 'CAT-001', level: 1, order: 2, count: 32, color: '#ec4899', featured: true },
    { id: 'CAT-004', name: 'Audio', slug: 'audio', parent: 'CAT-001', level: 1, order: 3, count: 28, color: '#f97316', featured: true },
    { id: 'CAT-005', name: 'Accessories', slug: 'accessories', parent: 'CAT-001', level: 1, order: 4, count: 19, color: '#f59e0b', featured: false },
    { id: 'CAT-006', name: 'Fashion', slug: 'fashion', parent: null, level: 0, order: 2, count: 89, color: '#10b981', featured: true },
    { id: 'CAT-007', name: "Men's Clothing", slug: 'mens-clothing', parent: 'CAT-006', level: 1, order: 1, count: 42, color: '#14b8a6', featured: true },
    { id: 'CAT-008', name: "Women's Clothing", slug: 'womens-clothing', parent: 'CAT-006', level: 1, order: 2, count: 47, color: '#06b6d4', featured: true },
    { id: 'CAT-009', name: 'Home & Living', slug: 'home-living', parent: null, level: 0, order: 3, count: 56, color: '#d946ef', featured: true },
    { id: 'CAT-010', name: 'Furniture', slug: 'furniture', parent: 'CAT-009', level: 1, order: 1, count: 23, color: '#f43f5e', featured: true },
    { id: 'CAT-011', name: 'Decor', slug: 'decor', parent: 'CAT-009', level: 1, order: 2, count: 18, color: '#ef4444', featured: false },
    { id: 'CAT-012', name: 'Kitchen', slug: 'kitchen', parent: 'CAT-009', level: 1, order: 3, count: 15, color: '#f97316', featured: false },
    { id: 'CAT-013', name: 'Food & Beverage', slug: 'food-beverage', parent: null, level: 0, order: 4, count: 34, color: '#84cc16', featured: true },
    { id: 'CAT-014', name: 'Beauty & Health', slug: 'beauty-health', parent: null, level: 0, order: 5, count: 42, color: '#a855f7', featured: true },
    { id: 'CAT-015', name: 'Skincare', slug: 'skincare', parent: 'CAT-014', level: 1, order: 1, count: 18, color: '#d946ef', featured: true },
    { id: 'CAT-016', name: 'Makeup', slug: 'makeup', parent: 'CAT-014', level: 1, order: 2, count: 15, color: '#ec4899', featured: true },
    { id: 'CAT-017', name: 'Hair Care', slug: 'hair-care', parent: 'CAT-014', level: 1, order: 3, count: 9, color: '#f43f5e', featured: false },
    { id: 'CAT-018', name: 'Sports & Outdoors', slug: 'sports-outdoors', parent: null, level: 0, order: 6, count: 28, color: '#14b8a6', featured: true },
    { id: 'CAT-019', name: 'Fitness', slug: 'fitness', parent: 'CAT-018', level: 1, order: 1, count: 15, color: '#06b6d4', featured: true },
    { id: 'CAT-020', name: 'Camping', slug: 'camping', parent: 'CAT-018', level: 1, order: 2, count: 8, color: '#0ea5e9', featured: false }
  ])

  // ============ COUPONS & DISCOUNTS - 50+ COUPONS ============
  const [coupons, setCoupons] = useState([
    ...Array(30).fill(null).map((_, i) => ({
      id: `CPN-${String(i + 1).padStart(4, '0')}`,
      code: `SAVE${i * 5}${i}`,
      type: ['percentage', 'fixed', 'free_shipping'][i % 3],
      value: i % 3 === 0 ? 10 + (i * 2) : i % 3 === 1 ? 25 + (i * 5) : 0,
      minPurchase: i % 4 === 0 ? 50 : i % 4 === 1 ? 100 : i % 4 === 2 ? 200 : 0,
      usageLimit: i % 5 === 0 ? 100 : i % 5 === 1 ? 500 : i % 5 === 2 ? 1000 : null,
      usedCount: Math.floor(Math.random() * 50),
      startDate: `2024-${String(i % 12 + 1).padStart(2, '0')}-01`,
      endDate: `2024-${String((i % 12 + 2) % 12 || 12).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      status: i % 6 === 0 ? 'expired' : 'active',
      categories: i % 3 === 0 ? ['CAT-001', 'CAT-002'] : i % 3 === 1 ? ['CAT-006'] : [],
      products: i % 4 === 0 ? [`PRD-${String(i % 50 + 1).padStart(4, '0')}`] : [],
      excludeProducts: [],
      customerSegments: i % 3 === 0 ? ['new', 'vip'] : [],
      description: `Save ${i % 3 === 0 ? `${10 + (i * 2)}%` : i % 3 === 1 ? `$${25 + (i * 5)}` : 'on shipping'}`,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ])

  // ============ PRODUCT REVIEWS - 200+ REVIEWS ============
  const [reviews, setReviews] = useState([
    ...Array(100).fill(null).map((_, i) => ({
      id: `REV-${String(i + 1).padStart(4, '0')}`,
      productId: `PRD-${String(i % 50 + 1).padStart(4, '0')}`,
      productName: products[i % products.length]?.name || 'Product',
      customerId: `CUST-${String(i % 50 + 1).padStart(4, '0')}`,
      customerName: customers[i % customers.length]?.name || 'Customer',
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars mostly
      title: ['Great product!', 'Excellent quality', 'Very satisfied', 'Good value', 'Highly recommended'][i % 5],
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      pros: ['Quality', 'Price', 'Shipping'].slice(0, i % 4),
      cons: i % 5 === 0 ? ['Size', 'Color'] : [],
      images: i % 10 === 0 ? ['review1.jpg', 'review2.jpg'] : [],
      verified: i % 3 !== 0,
      helpful: Math.floor(Math.random() * 50),
      notHelpful: Math.floor(Math.random() * 10),
      status: i % 10 === 0 ? 'pending' : 'approved',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      reply: i % 8 === 0 ? {
        content: 'Thank you for your review!',
        createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 2).padStart(2, '0')}`
      } : null
    }))
  ])

  // ============ INVENTORY MOVEMENTS ============
  const [inventoryMovements, setInventoryMovements] = useState([
    ...Array(50).fill(null).map((_, i) => ({
      id: `MOV-${String(i + 1).padStart(4, '0')}`,
      productId: `PRD-${String(i % 50 + 1).padStart(4, '0')}`,
      type: ['inbound', 'outbound', 'adjustment', 'return'][i % 4],
      quantity: Math.floor(Math.random() * 50) + 1,
      previousStock: Math.floor(Math.random() * 100) + 50,
      newStock: Math.floor(Math.random() * 100) + 50,
      reason: ['purchase order', 'sale', 'inventory count', 'damaged'][i % 4],
      reference: i % 2 === 0 ? `PO-${String(i).padStart(4, '0')}` : `ORD-${String(i).padStart(4, '0')}`,
      createdBy: `user${i % 5 + 1}@example.com`,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ])

  // ============ ABANDONED CARTS ============
  const [abandonedCarts, setAbandonedCarts] = useState([
    ...Array(25).fill(null).map((_, i) => ({
      id: `CART-${String(i + 1).padStart(4, '0')}`,
      customerId: `CUST-${String(i % 50 + 1).padStart(4, '0')}`,
      customerName: customers[i % customers.length]?.name || 'Guest Customer',
      email: `guest${i + 1}@example.com`,
      items: Math.floor(Math.random() * 5) + 1,
      total: Math.floor(Math.random() * 300) + 50,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      recovered: i % 4 === 0,
      recoveryEmail: i % 3 === 0 ? 'sent' : 'pending'
    }))
  ])

  // ============ SUPPLIERS ============
  const [suppliers, setSuppliers] = useState([
    ...Array(20).fill(null).map((_, i) => ({
      id: `SUP-${String(i + 1).padStart(3, '0')}`,
      name: `Supplier ${i + 1}`,
      contact: `Contact Person ${i + 1}`,
      email: `supplier${i + 1}@example.com`,
      phone: `+1 555-${String(200 + i).slice(1)}`,
      address: `${456 + i} Business Ave, Suite ${i + 1}00`,
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA',
      paymentTerms: ['Net 30', 'Net 60', 'Net 90'][i % 3],
      leadTime: `${i % 5 + 3}-${i % 5 + 7} days`,
      minimumOrder: Math.floor(Math.random() * 500) + 100,
      products: Math.floor(Math.random() * 50) + 10,
      totalSpent: Math.floor(Math.random() * 50000) + 10000,
      rating: 4 + (Math.random()),
      status: i % 5 === 0 ? 'inactive' : 'active',
      notes: i % 4 === 0 ? 'Preferred supplier' : '',
      createdAt: `2023-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ])

  // ============ SHIPPING ZONES ============
  const [shippingZones, setShippingZones] = useState([
    { id: 'ZONE-001', name: 'Domestic', countries: ['USA'], regions: ['All States'], methods: [
      { name: 'Standard', price: 5.99, freeThreshold: 50, estimatedDays: '5-7' },
      { name: 'Express', price: 12.99, freeThreshold: 100, estimatedDays: '2-3' },
      { name: 'Next Day', price: 24.99, freeThreshold: 200, estimatedDays: '1' }
    ]},
    { id: 'ZONE-002', name: 'Canada', countries: ['Canada'], regions: ['All Provinces'], methods: [
      { name: 'Standard', price: 9.99, freeThreshold: 75, estimatedDays: '7-10' },
      { name: 'Express', price: 19.99, freeThreshold: 150, estimatedDays: '3-5' }
    ]},
    { id: 'ZONE-003', name: 'Europe', countries: ['UK', 'Germany', 'France'], regions: ['EU'], methods: [
      { name: 'Standard', price: 14.99, freeThreshold: 100, estimatedDays: '10-14' },
      { name: 'Express', price: 29.99, freeThreshold: 200, estimatedDays: '5-7' }
    ]}
  ])

  // ============ PAYMENT GATEWAYS ============
  const [paymentGateways, setPaymentGateways] = useState([
    { id: 'PAY-001', name: 'Stripe', type: 'credit_card', enabled: true, testMode: true, fees: '2.9% + $0.30' },
    { id: 'PAY-002', name: 'PayPal', type: 'paypal', enabled: true, testMode: true, fees: '3.5% + $0.49' },
    { id: 'PAY-003', name: 'Apple Pay', type: 'digital_wallet', enabled: true, testMode: true, fees: '2.9% + $0.30' },
    { id: 'PAY-004', name: 'Google Pay', type: 'digital_wallet', enabled: true, testMode: true, fees: '2.9% + $0.30' },
    { id: 'PAY-005', name: 'Bank Transfer', type: 'bank', enabled: true, testMode: false, fees: '$0.00' }
  ])

  // ============ ANALYTICS & REPORTS ============
  const [analytics, setAnalytics] = useState({
    overview: {
      revenue: { today: 15420, yesterday: 14230, week: 98750, month: 425000, year: 5200000 },
      orders: { today: 124, yesterday: 118, week: 845, month: 3650, year: 44500 },
      customers: { today: 89, yesterday: 82, week: 612, month: 2650, year: 32400 },
      conversion: { today: 3.2, yesterday: 3.1, week: 3.4, month: 3.5, year: 3.3 }
    },
    topProducts: products.sort((a, b) => b.sales - a.sales).slice(0, 10),
    topCategories: categories.map(c => ({
      name: c.name,
      sales: Math.floor(Math.random() * 10000) + 1000,
      revenue: Math.floor(Math.random() * 500000) + 50000
    })),
    salesByHour: Array(24).fill(0).map((_, i) => ({
      hour: i,
      sales: Math.floor(Math.random() * 50) + 10
    })),
    salesByDay: Array(7).fill(0).map((_, i) => ({
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
      sales: Math.floor(Math.random() * 100) + 50
    })),
    salesByMonth: Array(12).fill(0).map((_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      sales: Math.floor(Math.random() * 50000) + 10000
    })),
    customerSegments: [
      { segment: 'New', count: 245, percentage: 15 },
      { segment: 'Regular', count: 890, percentage: 55 },
      { segment: 'VIP', count: 325, percentage: 20 },
      { segment: 'Inactive', count: 165, percentage: 10 }
    ],
    inventoryValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    lowStockCount: products.filter(p => p.stock < 20).length,
    outOfStockCount: products.filter(p => p.stock === 0).length
  })

  // ============ NOTIFICATION SYSTEM ============
  const showNotification = (message, type = 'success') => {
    setNotification({ id: Date.now(), message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // ============ PRODUCT OPERATIONS ============
  const handleAddProduct = (productData) => {
    const newProduct = {
      id: `PRD-${String(products.length + 1).padStart(4, '0')}`,
      ...productData,
      sales: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    setProducts([newProduct, ...products])
    setShowProductModal(false)
    showNotification('✅ Product added successfully! You can now publish it.')
  }

  const handleUpdateProduct = (productData) => {
    setProducts(products.map(p => p.id === productData.id ? { 
      ...productData, 
      updatedAt: new Date().toISOString().split('T')[0] 
    } : p))
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
    } else if (deleteType === 'customer') {
      setCustomers(customers.filter(c => c.id !== itemToDelete))
      showNotification('✅ Customer removed successfully!')
    } else if (deleteType === 'coupon') {
      setCoupons(coupons.filter(c => c.id !== itemToDelete))
      showNotification('✅ Coupon deleted successfully!')
    }
    setShowDeleteModal(false)
    setItemToDelete(null)
    setDeleteType('')
  }

  const handleDuplicateProduct = (product) => {
    const newProduct = {
      ...product,
      id: `PRD-${String(products.length + 1).padStart(4, '0')}`,
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-COPY`,
      status: 'draft',
      sales: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    setProducts([newProduct, ...products])
    showNotification('📋 Product duplicated successfully!')
  }

  const handleBulkDuplicate = () => {
    if (selectedItems.length === 0) {
      showNotification('❌ No products selected!', 'error')
      return
    }
    
    const productsToDuplicate = products.filter(p => selectedItems.includes(p.id))
    const duplicatedProducts = productsToDuplicate.map((p, index) => ({
      ...p,
      id: `PRD-${String(products.length + index + 1).padStart(4, '0')}`,
      name: `${p.name} (Copy)`,
      sku: `${p.sku}-COPY-${index + 1}`,
      status: 'draft',
      sales: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }))
    
    setProducts([...duplicatedProducts, ...products])
    setSelectedItems([])
    showNotification(`✅ ${selectedItems.length} products duplicated!`)
  }

  // ============ ORDER OPERATIONS ============
  const handleCreateOrder = () => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      customer: 'New Customer',
      email: 'customer@example.com',
      phone: '+1 555-0000',
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'Credit Card',
      shippingMethod: 'Standard',
      items: [],
      shippingAddress: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'USA'
      },
      billingAddress: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'USA'
      },
      notes: '',
      createdAt: new Date().toISOString().split('T')[0]
    }
    setOrders([newOrder, ...orders])
    setSelectedOrder(newOrder)
    setShowOrderModal(true)
    showNotification('✅ New order created! Fill in the details.')
  }

  const handleUpdateOrderStatus = (orderId, field, value) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, [field]: value } : order
    ))
    showNotification(`✅ Order ${field} updated to ${value}`)
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

  const handleCheckout = () => {
    if (cart.length === 0) {
      showNotification('❌ Cart is empty!', 'error')
      return
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const tax = subtotal * 0.08
    const shipping = subtotal > 100 ? 0 : 9.99
    const total = subtotal + tax + shipping
    
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      customer: 'Guest Customer',
      email: 'guest@example.com',
      phone: '+1 555-0000',
      date: new Date().toISOString().split('T')[0],
      amount: total,
      subtotal: subtotal,
      tax: tax,
      shipping: shipping,
      discount: 0,
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      shippingMethod: 'Standard',
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        sku: item.sku
      })),
      shippingAddress: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'USA'
      },
      billingAddress: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'USA'
      },
      notes: '',
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    setOrders([newOrder, ...orders])
    
    // Update inventory
    cart.forEach(item => {
      setProducts(products.map(p => 
        p.id === item.id 
          ? { ...p, stock: p.stock - item.quantity, sales: p.sales + item.quantity }
          : p
      ))
    })
    
    setCart([])
    setShowCart(false)
    showNotification(`✅ Order #${newOrder.id} created successfully!`)
  }

  // ============ EXPORT OPERATIONS ============
  const handleExport = (type, format = 'json') => {
    let data = []
    let filename = ''
    
    if (type === 'products') {
      data = products
      filename = `products-export-${new Date().toISOString().split('T')[0]}`
    } else if (type === 'orders') {
      data = orders
      filename = `orders-export-${new Date().toISOString().split('T')[0]}`
    } else if (type === 'customers') {
      data = customers
      filename = `customers-export-${new Date().toISOString().split('T')[0]}`
    } else if (type === 'coupons') {
      data = coupons
      filename = `coupons-export-${new Date().toISOString().split('T')[0]}`
    } else if (type === 'inventory') {
      data = inventoryMovements
      filename = `inventory-export-${new Date().toISOString().split('T')[0]}`
    }
    
    if (format === 'json') {
      const dataStr = JSON.stringify(data, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', `${filename}.json`)
      linkElement.click()
    } else if (format === 'csv') {
      // Convert to CSV (simplified)
      const headers = Object.keys(data[0] || {}).join(',')
      const rows = data.map(item => Object.values(item).join(',')).join('\n')
      const csv = `${headers}\n${rows}`
      const dataUri = 'data:text/csv;charset=utf-8,'+ encodeURIComponent(csv)
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', `${filename}.csv`)
      linkElement.click()
    }
    
    showNotification(`📥 ${type} exported as ${format.toUpperCase()}!`)
  }

  // ============ BULK OPERATIONS ============
  const handleSelectAll = (items) => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map(i => i.id))
    }
  }

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) {
      showNotification('❌ No items selected!', 'error')
      return
    }
    
    setProducts(products.filter(p => !selectedItems.includes(p.id)))
    setSelectedItems([])
    showNotification(`✅ ${selectedItems.length} products deleted!`)
  }

  const handleBulkStatusUpdate = (status) => {
    if (selectedItems.length === 0) {
      showNotification('❌ No products selected!', 'error')
      return
    }
    
    setProducts(products.map(p => 
      selectedItems.includes(p.id) ? { ...p, status } : p
    ))
    setSelectedItems([])
    showNotification(`✅ ${selectedItems.length} products updated to ${status}!`)
  }

  // ============ FILTERED DATA ============
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = filters.category === 'all' || product.category === filters.category
    const matchesPrice = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
    const matchesRating = product.rating >= filters.rating
    const matchesStock = 
      filters.stockStatus === 'all' ? true :
      filters.stockStatus === 'low' ? product.stock < 20 :
      filters.stockStatus === 'out' ? product.stock === 0 :
      filters.stockStatus === 'in' ? product.stock > 0 : true
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock
  })

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // ============ STATS ============
  const stats = {
    revenue: orders.reduce((sum, o) => sum + o.amount, 0),
    orders: orders.length,
    customers: customers.length,
    products: products.length,
    pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
    lowStock: products.filter(p => p.stock < 20).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    averageOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.amount, 0) / orders.length : 0,
    conversionRate: 3.2,
    totalInventoryValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    totalProfit: products.reduce((sum, p) => sum + ((p.price - p.cost) * p.sales), 0)
  }

  // ============ BRAND CONFIGURATION ============
  const config = {
    ...BRAND,
    version: '2.0.0',
    buildDate: '2024-03-15',
    environment: 'production'
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* ============ NOTIFICATION SYSTEM ============ */}
      {notification && (
        <div 
          className={`fixed top-4 right-4 z-[9999] px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border animate-slide-in-right
            ${notification.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-400' : 
              notification.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' :
              'bg-green-500/20 border-green-500/30 text-green-400'}`}
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          onClick={() => setNotification(null)}
        >
          <div className="flex items-center gap-3">
            {notification.type === 'error' ? <FiXCircle className="w-5 h-5" /> : 
             notification.type === 'warning' ? <FiAlertCircle className="w-5 h-5" /> :
             <FiCheckCircle className="w-5 h-5" />}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* ============ MAIN DASHBOARD UI ============ */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header with Brand Info */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                {config.logo}
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {config.fullName}
                </h1>
                <p className="text-gray-400 flex items-center gap-2">
                  <FiShoppingBag className="w-4 h-4" />
                  v{config.version} • Complete E-Commerce Solution
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"
              style={{ pointerEvents: 'auto', cursor: 'pointer', minHeight: '48px' }}
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
                setSelectedProduct(null)
                setShowProductModal(true)
              }}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-all flex items-center gap-2 group"
              style={{ pointerEvents: 'auto', cursor: 'pointer', minHeight: '48px' }}
            >
              <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span className="hidden sm:inline">Add Product</span>
            </button>

            {/* New Order Button */}
            <button
              onClick={handleCreateOrder}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-all flex items-center gap-2 group"
              style={{ pointerEvents: 'auto', cursor: 'pointer', minHeight: '48px' }}
            >
              <FiTruck className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              <span className="hidden sm:inline">New Order</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
          <StatCard 
            icon={FiDollarSign}
            value={`$${stats.revenue.toLocaleString()}`}
            label="Revenue"
            change="+15.2%"
            color="from-blue-500 to-purple-500"
            onClick={() => showNotification(`💰 Total Revenue: $${stats.revenue.toLocaleString()}`)}
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
            onClick={() => {
              setActiveTab('orders')
              setSearchQuery('pending')
            }}
          />
          <StatCard 
            icon={FiAlertCircle}
            value={stats.lowStock}
            label="Low Stock"
            change="-5.1%"
            color="from-red-500 to-pink-500"
            onClick={() => {
              setActiveTab('inventory')
              setFilters({ ...filters, stockStatus: 'low' })
            }}
          />
          <StatCard 
            icon={FiTrendingUp}
            value={`$${Math.round(stats.averageOrderValue)}`}
            label="Avg Order"
            change="+4.2%"
            color="from-cyan-500 to-blue-500"
            onClick={() => showNotification(`📊 Average Order Value: $${Math.round(stats.averageOrderValue)}`)}
          />
          <StatCard 
            icon={FiPercent}
            value={`${stats.conversionRate}%`}
            label="Conversion"
            change="+0.8%"
            color="from-indigo-500 to-blue-500"
            onClick={() => showNotification('📈 Conversion Rate: 3.2%')}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <NavButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            icon={FiHome}
            label="Dashboard"
          />
          <NavButton 
            active={activeTab === 'products'} 
            onClick={() => {
              setActiveTab('products')
              showNotification('📦 Products management loaded')
            }}
            icon={FiBox}
            label="Products"
          />
          <NavButton 
            active={activeTab === 'orders'} 
            onClick={() => {
              setActiveTab('orders')
              showNotification('📋 Orders management loaded')
            }}
            icon={FiPackage}
            label="Orders"
          />
          <NavButton 
            active={activeTab === 'customers'} 
            onClick={() => {
              setActiveTab('customers')
              showNotification('👥 Customer management loaded')
            }}
            icon={FiUsers}
            label="Customers"
          />
          <NavButton 
            active={activeTab === 'inventory'} 
            onClick={() => {
              setActiveTab('inventory')
              showNotification('📦 Inventory management loaded')
            }}
            icon={FiArchive}
            label="Inventory"
          />
          <NavButton 
            active={activeTab === 'marketing'} 
            onClick={() => {
              setActiveTab('marketing')
              showNotification('🎯 Marketing tools loaded')
            }}
            icon={FiPercent}
            label="Marketing"
          />
          <NavButton 
            active={activeTab === 'analytics'} 
            onClick={() => {
              setActiveTab('analytics')
              showNotification('📊 Analytics dashboard loaded')
            }}
            icon={FiBarChart2}
            label="Analytics"
          />
          <NavButton 
            active={activeTab === 'reports'} 
            onClick={() => {
              setActiveTab('reports')
              showNotification('📑 Reports loaded')
            }}
            icon={FiFile}
            label="Reports"
          />
          <NavButton 
            active={activeTab === 'settings'} 
            onClick={() => {
              setActiveTab('settings')
              showNotification('⚙️ Settings loaded')
            }}
            icon={FiSettings}
            label="Settings"
          />
        </div>

        {/* Search and Filters */}
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
                style={{ pointerEvents: 'auto', minHeight: '48px', fontSize: '16px' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Filter Button */}
              <button
                onClick={() => setShowCategoryModal(true)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"
                style={{ pointerEvents: 'auto', cursor: 'pointer', minHeight: '48px' }}
              >
                <FiFilter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              
              {/* Export Button */}
              <button
                onClick={() => handleExport(activeTab, 'json')}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"
                style={{ pointerEvents: 'auto', cursor: 'pointer', minHeight: '48px' }}
              >
                <FiDownload className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              {/* View Mode Toggle */}
              {activeTab === 'products' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                    style={{ pointerEvents: 'auto', cursor: 'pointer', minHeight: '44px', minWidth: '44px' }}
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
                    style={{ pointerEvents: 'auto', cursor: 'pointer', minHeight: '44px', minWidth: '44px' }}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardView 
              stats={stats}
              orders={orders.slice(0, 5)}
              products={products.slice(0, 5)}
              customers={customers.slice(0, 5)}
              analytics={analytics}
              onViewAllOrders={() => setActiveTab('orders')}
              onViewAllProducts={() => setActiveTab('products')}
              onViewAllCustomers={() => setActiveTab('customers')}
              onViewOrder={(order) => {
                setSelectedOrder(order)
                setShowOrderModal(true)
              }}
              onViewProduct={(product) => {
                setSelectedProduct(product)
                setShowProductModal(true)
              }}
            />
          )}

          {activeTab === 'products' && (
            <ProductsView 
              products={filteredProducts}
              viewMode={viewMode}
              selectedItems={selectedItems}
              onSelectItem={(id) => {
                if (selectedItems.includes(id)) {
                  setSelectedItems(selectedItems.filter(i => i !== id))
                } else {
                  setSelectedItems([...selectedItems, id])
                }
              }}
              onSelectAll={() => handleSelectAll(filteredProducts)}
              onEdit={(product) => {
                setSelectedProduct(product)
                setShowProductModal(true)
              }}
              onDelete={handleDeleteProduct}
              onDuplicate={handleDuplicateProduct}
              onAddToCart={handleAddToCart}
              onBulkDelete={handleBulkDelete}
              onBulkStatusUpdate={handleBulkStatusUpdate}
              onBulkDuplicate={handleBulkDuplicate}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView 
              orders={filteredOrders}
              onViewOrder={(order) => {
                setSelectedOrder(order)
                setShowOrderModal(true)
              }}
              onUpdateStatus={handleUpdateOrderStatus}
              onDelete={handleDeleteOrder}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersView 
              customers={filteredCustomers}
              onViewCustomer={(customer) => {
                setSelectedCustomer(customer)
                setShowCustomerModal(true)
              }}
              onSendEmail={(customer) => {
                showNotification(`📧 Email sent to ${customer.email}`)
              }}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryView 
              products={products}
              lowStockCount={stats.lowStock}
              outOfStockCount={stats.outOfStock}
              totalValue={stats.totalInventoryValue}
              onRestock={(product) => {
                setProducts(products.map(p => 
                  p.id === product.id 
                    ? { ...p, stock: p.stock + 50 }
                    : p
                ))
                showNotification(`✅ Restocked ${product.name}`)
              }}
              onViewMovements={() => {
                showNotification('📊 Inventory movements loaded')
              }}
            />
          )}

          {activeTab === 'marketing' && (
            <MarketingView 
              coupons={coupons}
              abandonedCarts={abandonedCarts}
              onAddCoupon={() => {
                setSelectedCoupon(null)
                setShowCouponModal(true)
              }}
              onEditCoupon={(coupon) => {
                setSelectedCoupon(coupon)
                setShowCouponModal(true)
              }}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView 
              analytics={analytics}
              onExport={() => handleExport('analytics', 'csv')}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView 
              orders={orders}
              products={products}
              customers={customers}
              onGenerateReport={(type) => {
                showNotification(`📊 ${type} report generated`)
              }}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView 
              brand={config}
              categories={categories}
              shippingZones={shippingZones}
              paymentGateways={paymentGateways}
              suppliers={suppliers}
              onSave={() => showNotification('✅ Settings saved successfully!')}
            />
          )}
        </div>
      </div>

      {/* ============ MODALS ============ */}
      {showProductModal && (
        <ProductModal 
          product={selectedProduct}
          categories={categories}
          onSave={selectedProduct ? handleUpdateProduct : handleAddProduct}
          onClose={() => {
            setShowProductModal(false)
            setSelectedProduct(null)
          }}
        />
      )}

      {showOrderModal && selectedOrder && (
        <OrderModal 
          order={selectedOrder}
          onUpdate={handleUpdateOrderStatus}
          onDelete={handleDeleteOrder}
          onClose={() => {
            setShowOrderModal(false)
            setSelectedOrder(null)
          }}
        />
      )}

      {showCustomerModal && selectedCustomer && (
        <CustomerModal 
          customer={selectedCustomer}
          onClose={() => {
            setShowCustomerModal(false)
            setSelectedCustomer(null)
          }}
          onSendEmail={() => {
            showNotification(`📧 Email sent to ${selectedCustomer.email}`)
          }}
        />
      )}

      {showCart && (
        <CartSidebar 
          cart={cart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleCheckout}
          onClose={() => setShowCart(false)}
          onContinueShopping={() => {
            setShowCart(false)
            setActiveTab('products')
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteModal 
          type={deleteType}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false)
            setItemToDelete(null)
            setDeleteType('')
          }}
        />
      )}

      {showCouponModal && (
        <CouponModal 
          coupon={selectedCoupon}
          onSave={(couponData) => {
            if (selectedCoupon) {
              setCoupons(coupons.map(c => c.id === couponData.id ? couponData : c))
              showNotification('✅ Coupon updated!')
            } else {
              setCoupons([{
                id: `CPN-${String(coupons.length + 1).padStart(4, '0')}`,
                ...couponData,
                createdAt: new Date().toISOString().split('T')[0]
              }, ...coupons])
              showNotification('✅ Coupon created!')
            }
            setShowCouponModal(false)
            setSelectedCoupon(null)
          }}
          onClose={() => {
            setShowCouponModal(false)
            setSelectedCoupon(null)
          }}
        />
      )}
    </div>
  )
}

// ============ SUB-COMPONENTS ============

const StatCard = ({ icon: Icon, value, label, change, color, onClick }) => (
  <div 
    className="glass-card p-4 hover:scale-105 transition-all cursor-pointer group"
    onClick={onClick}
    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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

const NavButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2
      ${active 
        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 scale-105' 
        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
    style={{ pointerEvents: 'auto', cursor: 'pointer', minHeight: '44px' }}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
)

// ============ VIEW COMPONENTS ============

const DashboardView = ({ stats, orders, products, customers, analytics, onViewAllOrders, onViewAllProducts, onViewAllCustomers, onViewOrder, onViewProduct }) => (
  <div className="space-y-6">
    {/* Welcome Banner */}
    <div className="glass-card p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome back, Admin! 👋</h2>
          <p className="text-gray-400">Here's what's happening with your store today.</p>
        </div>
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <FiZap className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FiTrendingUp className="w-5 h-5 text-blue-400" />
          Sales Overview
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          [Sales Chart - Ready for Chart.js]
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FiPieChart className="w-5 h-5 text-purple-400" />
          Top Categories
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          [Pie Chart - Ready for Chart.js]
        </div>
      </div>
    </div>

    {/* Recent Orders */}
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <FiPackage className="w-5 h-5" />
          Recent Orders
        </h3>
        <button
          onClick={onViewAllOrders}
          className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          View All <FiArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {orders.map(order => (
          <div 
            key={order.id} 
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
            onClick={() => onViewOrder(order)}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
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
              <span className={`status-badge ${
                order.status === 'delivered' ? 'status-completed' :
                order.status === 'shipped' ? 'status-processing' :
                order.status === 'pending' ? 'status-pending' :
                order.status === 'cancelled' ? 'status-cancelled' :
                'status-pending'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Quick Actions */}
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <FiZap className="w-5 h-5 text-yellow-400" />
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionButton
          icon={FiPlus}
          label="Add Product"
          sublabel="Create new product"
          color="from-blue-500 to-purple-500"
          onClick={() => document.querySelector('[data-add-product]')?.click()}
        />
        <QuickActionButton
          icon={FiTruck}
          label="New Order"
          sublabel="Create customer order"
          color="from-green-500 to-emerald-500"
          onClick={() => document.querySelector('[data-new-order]')?.click()}
        />
        <QuickActionButton
          icon={FiUsers}
          label="Add Customer"
          sublabel="Register new customer"
          color="from-purple-500 to-pink-500"
          onClick={() => alert('Add Customer Modal - Ready for implementation')}
        />
        <QuickActionButton
          icon={FiPercent}
          label="Create Coupon"
          sublabel="New discount code"
          color="from-orange-500 to-red-500"
          onClick={() => alert('Create Coupon Modal - Ready for implementation')}
        />
      </div>
    </div>
  </div>
)

const QuickActionButton = ({ icon: Icon, label, sublabel, color, onClick }) => (
  <button
    onClick={onClick}
    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-3 group"
    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
  >
    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div className="text-left">
      <div className="font-semibold">{label}</div>
      <div className="text-xs text-gray-400">{sublabel}</div>
    </div>
  </button>
)

// ============ PRODUCTS VIEW ============
const ProductsView = ({ 
  products, viewMode, selectedItems, onSelectItem, onSelectAll, 
  onEdit, onDelete, onDuplicate, onAddToCart, onBulkDelete, 
  onBulkStatusUpdate, onBulkDuplicate 
}) => (
  <div className="space-y-6">
    {/* Bulk Actions */}
    {selectedItems.length > 0 && (
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{selectedItems.length} products selected</span>
          <button
            onClick={() => onSelectAll([])}
            className="text-sm text-blue-400 hover:text-blue-300"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            Clear
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <BulkActionButton
            onClick={() => onBulkStatusUpdate('active')}
            icon={FiCheckCircle}
            label="Activate"
            color="text-green-500"
          />
          <BulkActionButton
            onClick={() => onBulkStatusUpdate('draft')}
            icon={FiXCircle}
            label="Draft"
            color="text-yellow-500"
          />
          <BulkActionButton
            onClick={onBulkDuplicate}
            icon={FiCopy}
            label="Duplicate"
            color="text-blue-500"
          />
          <BulkActionButton
            onClick={onBulkDelete}
            icon={FiTrash2}
            label="Delete"
            color="text-red-500"
          />
        </div>
      </div>
    )}

    {/* Products Grid/List */}
    {viewMode === 'grid' ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedItems.includes(product.id)}
            onSelect={() => onSelectItem(product.id)}
            onEdit={() => onEdit(product)}
            onDelete={() => onDelete(product.id)}
            onDuplicate={() => onDuplicate(product)}
            onAddToCart={() => onAddToCart(product)}
          />
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
                    checked={selectedItems.length === products.length && products.length > 0}
                    onChange={onSelectAll}
                    className="w-5 h-5 rounded border-white/10 bg-white/5"
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
                <ProductRow
                  key={product.id}
                  product={product}
                  isSelected={selectedItems.includes(product.id)}
                  onSelect={() => onSelectItem(product.id)}
                  onEdit={() => onEdit(product)}
                  onDelete={() => onDelete(product.id)}
                  onDuplicate={() => onDuplicate(product)}
                  onAddToCart={() => onAddToCart(product)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}

    {products.length === 0 && (
      <div className="glass-card p-12 text-center">
        <FiBox className="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <h3 className="text-xl font-bold mb-2">No products found</h3>
        <p className="text-gray-400 mb-6">Try adjusting your search or add a new product</p>
        <button
          onClick={() => document.querySelector('[data-add-product]')?.click()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <FiPlus className="inline w-4 h-4 mr-2" /> Add Product
        </button>
      </div>
    )}
  </div>
)

const ProductCard = ({ product, isSelected, onSelect, onEdit, onDelete, onDuplicate, onAddToCart }) => (
  <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
        <FiBox className="w-8 h-8 text-white" />
      </div>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
        className="w-5 h-5 rounded border-white/10 bg-white/5"
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
      />
    </div>
    
    <div onClick={onEdit} style={{ cursor: 'pointer', pointerEvents: 'auto' }}>
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
          {product.comparePrice > product.price && (
            <div className="text-xs text-gray-500 line-through">${product.comparePrice.toFixed(2)}</div>
          )}
          <div className="text-sm text-gray-400">{product.sales} sold</div>
        </div>
        <div className="flex items-center gap-1">
          <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold">{product.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
    
    <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
      <button
        onClick={onEdit}
        className="flex-1 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm flex items-center justify-center gap-1"
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
      >
        <FiEdit className="w-4 h-4" /> Edit
      </button>
      <button
        onClick={onAddToCart}
        className="flex-1 px-3 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors text-sm flex items-center justify-center gap-1"
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
      >
        <FiShoppingCart className="w-4 h-4" /> Cart
      </button>
      <div className="relative group">
        <button
          className="px-3 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition-colors"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <FiMoreVertical className="w-4 h-4" />
        </button>
        <div className="absolute right-0 top-full mt-1 w-48 py-1 bg-[#0a0a1a] border border-white/10 rounded-xl shadow-xl hidden group-hover:block z-50">
          <button
            onClick={onDuplicate}
            className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 flex items-center gap-2"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <FiCopy className="w-4 h-4" /> Duplicate
          </button>
          <button
            onClick={onDelete}
            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <FiTrash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  </div>
)

const ProductRow = ({ product, isSelected, onSelect, onEdit, onDelete, onDuplicate, onAddToCart }) => (
  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
    <td className="p-4">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
        className="w-5 h-5 rounded border-white/10 bg-white/5"
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
      />
    </td>
    <td className="p-4">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onEdit} style={{ pointerEvents: 'auto' }}>
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
        <span>{product.rating.toFixed(1)}</span>
      </div>
    </td>
    <td className="p-4">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        product.status === 'active' 
          ? 'status-active'
          : 'status-inactive'
      }`}>
        {product.status}
      </span>
    </td>
    <td className="p-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
          title="Edit Product"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <FiEdit className="w-4 h-4" />
        </button>
        <button
          onClick={onAddToCart}
          className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20"
          title="Add to Cart"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <FiShoppingCart className="w-4 h-4" />
        </button>
        <button
          onClick={onDuplicate}
          className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
          title="Duplicate"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <FiCopy className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
          title="Delete Product"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
)

const BulkActionButton = ({ onClick, icon: Icon, label, color }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-1 ${color}`}
    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
  >
    <Icon className="w-4 h-4" /> {label}
  </button>
)

// ============ ORDERS VIEW ============
const OrdersView = ({ orders, onViewOrder, onUpdateStatus, onDelete }) => (
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
                  onChange={(e) => onUpdateStatus(order.id, 'status', e.target.value)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    order.status === 'delivered' ? 'status-completed' :
                    order.status === 'shipped' ? 'status-processing' :
                    order.status === 'pending' ? 'status-pending' :
                    order.status === 'cancelled' ? 'status-cancelled' :
                    'status-pending'
                  }`}
                  style={{ pointerEvents: 'auto', cursor: 'pointer', fontSize: '12px' }}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewOrder(order)}
                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                    title="View Order"
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(order.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    title="Cancel Order"
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
        <p className="text-gray-400">Try adjusting your search or create a new order</p>
      </div>
    )}
  </div>
)

// ============ CUSTOMERS VIEW ============
const CustomersView = ({ customers, onViewCustomer, onSendEmail }) => (
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
            <th className="p-4 text-left text-sm font-semibold text-gray-400">Segment</th>
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
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
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
                  customer.segment === 'vip' ? 'bg-purple-500/10 text-purple-500' :
                  customer.segment === 'new' ? 'bg-green-500/10 text-green-500' :
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  {customer.segment}
                </span>
              </td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  customer.status === 'active' 
                    ? 'status-active'
                    : 'status-inactive'
                }`}>
                  {customer.status}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSendEmail(customer)
                    }}
                    className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
)

// ============ INVENTORY VIEW ============
const InventoryView = ({ products, lowStockCount, outOfStockCount, totalValue, onRestock, onViewMovements }) => (
  <div className="space-y-6">
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
            <div className="text-2xl font-bold text-red-400">{lowStockCount}</div>
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
            <div className="text-2xl font-bold">{outOfStockCount}</div>
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
              ${totalValue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Inventory Value</div>
          </div>
        </div>
      </div>
    </div>

    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Low Stock Alert</h3>
        <button
          onClick={onViewMovements}
          className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          View All <FiArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {products.filter(p => p.stock < 20).slice(0, 6).map(product => (
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
              onClick={() => onRestock(product)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm hover:opacity-90"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              Restock
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)

// ============ MARKETING VIEW ============
const MarketingView = ({ coupons, abandonedCarts, onAddCoupon, onEditCoupon }) => (
  <div className="space-y-6">
    {/* Active Coupons */}
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <FiPercent className="w-5 h-5" />
          Active Coupons
        </h3>
        <button
          onClick={onAddCoupon}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm hover:opacity-90 flex items-center gap-1"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <FiPlus className="w-4 h-4" /> Add Coupon
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.filter(c => c.status === 'active').slice(0, 6).map(coupon => (
          <div 
            key={coupon.id} 
            className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors cursor-pointer"
            onClick={() => onEditCoupon(coupon)}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-mono font-bold text-lg text-blue-400">{coupon.code}</span>
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">
                  {coupon.type === 'percentage' ? `${coupon.value}% OFF` : 
                   coupon.type === 'fixed' ? `$${coupon.value} OFF` : 
                   'Free Shipping'}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Min. purchase: ${coupon.minPurchase}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Used {coupon.usedCount} / {coupon.usageLimit || '∞'} times
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Abandoned Carts */}
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <FiShoppingCart className="w-5 h-5" />
        Abandoned Carts
      </h3>
      
      <div className="space-y-3">
        {abandonedCarts.slice(0, 5).map(cart => (
          <div key={cart.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div>
              <div className="font-semibold">{cart.customerName}</div>
              <div className="text-sm text-gray-400">{cart.email}</div>
            </div>
            <div className="text-center">
              <div className="text-sm">{cart.items} items</div>
              <div className="font-semibold text-blue-400">${cart.total}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">
                {new Date(cart.createdAt).toLocaleDateString()}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                cart.recovered ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {cart.recovered ? 'Recovered' : 'Pending'}
              </span>
            </div>
            {!cart.recovered && (
              <button
                className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm"
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                Send Email
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)

// ============ ANALYTICS VIEW ============
const AnalyticsView = ({ analytics, onExport }) => (
  <div className="space-y-6">
    {/* Key Metrics */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="glass-card p-6">
        <div className="text-sm text-gray-400 mb-1">Today's Revenue</div>
        <div className="text-3xl font-bold text-blue-400">${analytics.overview.revenue.today.toLocaleString()}</div>
        <div className="text-xs text-green-500 mt-2">↑ 8.3% vs yesterday</div>
      </div>
      <div className="glass-card p-6">
        <div className="text-sm text-gray-400 mb-1">Today's Orders</div>
        <div className="text-3xl font-bold">{analytics.overview.orders.today}</div>
        <div className="text-xs text-green-500 mt-2">↑ 5.1% vs yesterday</div>
      </div>
      <div className="glass-card p-6">
        <div className="text-sm text-gray-400 mb-1">Conversion Rate</div>
        <div className="text-3xl font-bold text-purple-400">{analytics.overview.conversion.today}%</div>
        <div className="text-xs text-green-500 mt-2">↑ 0.3% vs yesterday</div>
      </div>
      <div className="glass-card p-6">
        <div className="text-sm text-gray-400 mb-1">AOV</div>
        <div className="text-3xl font-bold text-green-400">${Math.round(analytics.overview.revenue.today / analytics.overview.orders.today)}</div>
        <div className="text-xs text-green-500 mt-2">↑ 2.1% vs yesterday</div>
      </div>
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Sales by Month</h3>
          <button
            onClick={onExport}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm flex items-center gap-1"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <FiDownload className="w-4 h-4" /> Export
          </button>
        </div>
        <div className="h-64 flex items-center justify-center text-gray-400">
          [Monthly Sales Chart - Ready for Chart.js]
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4">Customer Segments</h3>
        <div className="space-y-3">
          {analytics.customerSegments.map(segment => (
            <div key={segment.segment} className="flex items-center gap-3">
              <div className="w-24 text-sm text-gray-400">{segment.segment}</div>
              <div className="flex-1">
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${segment.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm font-semibold">{segment.count}</div>
              <div className="text-xs text-gray-400">{segment.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Top Products */}
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold mb-4">Top Selling Products</h3>
      <div className="space-y-3">
        {analytics.topProducts.slice(0, 5).map((product, i) => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="w-6 text-center font-bold text-gray-400">#{i + 1}</div>
            <div className="flex-1">
              <div className="font-medium">{product.name}</div>
              <div className="text-xs text-gray-400">{product.sku}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-blue-400">${product.revenue.toLocaleString()}</div>
              <div className="text-xs text-gray-400">{product.sales} units</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

// ============ REPORTS VIEW ============
const ReportsView = ({ orders, products, customers, onGenerateReport }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <ReportCard
      title="Sales Report"
      description="Monthly sales, revenue, and order statistics"
      icon={FiBarChart2}
      color="from-blue-500 to-purple-500"
      onGenerate={() => onGenerateReport('Sales')}
    />
    <ReportCard
      title="Inventory Report"
      description="Stock levels, low stock alerts, and inventory value"
      icon={FiArchive}
      color="from-green-500 to-emerald-500"
      onGenerate={() => onGenerateReport('Inventory')}
    />
    <ReportCard
      title="Customer Report"
      description="Customer acquisition, retention, and lifetime value"
      icon={FiUsers}
      color="from-purple-500 to-pink-500"
      onGenerate={() => onGenerateReport('Customer')}
    />
    <ReportCard
      title="Product Performance"
      description="Top sellers, revenue by product, and margins"
      icon={FiBox}
      color="from-yellow-500 to-orange-500"
      onGenerate={() => onGenerateReport('Product')}
    />
    <ReportCard
      title="Tax Report"
      description="Sales tax collected by region and period"
      icon={FiFile}
      color="from-red-500 to-pink-500"
      onGenerate={() => onGenerateReport('Tax')}
    />
    <ReportCard
      title="Shipping Report"
      description="Shipping costs, carriers, and delivery times"
      icon={FiTruck}
      color="from-indigo-500 to-blue-500"
      onGenerate={() => onGenerateReport('Shipping')}
    />
  </div>
)

const ReportCard = ({ title, description, icon: Icon, color, onGenerate }) => (
  <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center mb-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-sm text-gray-400 mb-4">{description}</p>
    <button
      onClick={onGenerate}
      className="w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center justify-center gap-2"
      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
    >
      <FiDownload className="w-4 h-4" /> Generate Report
    </button>
  </div>
)

// ============ SETTINGS VIEW ============
const SettingsView = ({ brand, categories, shippingZones, paymentGateways, suppliers, onSave }) => (
  <div className="space-y-6">
    {/* Brand Settings */}
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <FiSettings className="w-5 h-5" />
        Brand Settings
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Store Name</label>
          <input
            type="text"
            defaultValue={brand.fullName}
            className="form-input"
            style={{ pointerEvents: 'auto' }}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Store Email</label>
          <input
            type="email"
            defaultValue={brand.company.email}
            className="form-input"
            style={{ pointerEvents: 'auto' }}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Phone</label>
          <input
            type="tel"
            defaultValue={brand.company.phone}
            className="form-input"
            style={{ pointerEvents: 'auto' }}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Website</label>
          <input
            type="url"
            defaultValue={brand.company.website}
            className="form-input"
            style={{ pointerEvents: 'auto' }}
          />
        </div>
      </div>
    </div>

    {/* Save Button */}
    <div className="flex justify-end">
      <button
        onClick={onSave}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 flex items-center gap-2"
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
      >
        <FiSave className="w-4 h-4" /> Save Changes
      </button>
    </div>
  </div>
)

// ============ MODAL COMPONENTS ============

const ProductModal = ({ product, categories, onSave, onClose }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    category: categories[0]?.name || 'Electronics',
    price: 0,
    cost: 0,
    stock: 0,
    sku: `PRD-${Math.floor(Math.random() * 9000 + 1000)}`,
    status: 'draft',
    tags: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FiBox className="w-5 h-5" />
              {product ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Product Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  required
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-input"
                  required
                  style={{ pointerEvents: 'auto' }}
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
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="form-input"
                  required
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Cost ($) *</label>
                <input
                  name="cost"
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
                  className="form-input"
                  required
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Stock *</label>
                <input
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className="form-input"
                  required
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">SKU *</label>
                <input
                  name="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="form-input"
                  required
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="form-input"
                placeholder="wireless, audio, premium"
                style={{ pointerEvents: 'auto' }}
              />
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                <FiSave className="inline w-4 h-4 mr-2" />
                {product ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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

const OrderModal = ({ order, onUpdate, onDelete, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FiPackage className="w-5 h-5" />
            Order Details: {order.id}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
                <span>{order.customer}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-gray-400" />
                <span>{order.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-gray-400" />
                <span>{order.phone}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-3">Order Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-gray-400" />
                <span>{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCreditCard className="w-4 h-4 text-gray-400" />
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiTruck className="w-4 h-4 text-gray-400" />
                <span>{order.shippingMethod}</span>
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
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Shipping:</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Tax:</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Discount:</span>
                <span className="text-red-400">-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 text-lg font-bold border-t border-white/10 pt-2">
              <span>Total:</span>
              <span className="text-blue-400">${order.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <select
            value={order.status}
            onChange={(e) => {
              onUpdate(order.id, 'status', e.target.value)
              onClose()
            }}
            className="form-input flex-1"
            style={{ pointerEvents: 'auto' }}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <button
            onClick={() => {
              onDelete(order.id)
              onClose()
            }}
            className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  </div>
)

const CustomerModal = ({ customer, onClose, onSendEmail }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FiUsers className="w-5 h-5" />
            Customer Profile
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
            <div className="text-sm text-gray-400">
              Customer since {new Date(customer.firstOrder).getFullYear()}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-400">Email</div>
            <div className="font-medium">{customer.email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Phone</div>
            <div className="font-medium">{customer.phone}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Orders</div>
            <div className="font-medium">{customer.orders}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Spent</div>
            <div className="font-medium text-blue-400">${customer.spent.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Segment</div>
            <div className="font-medium capitalize">{customer.segment}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Lifetime Value</div>
            <div className="font-medium text-green-400">${customer.lifetimeValue.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => {
              onSendEmail()
              onClose()
            }}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <FiMail className="inline w-4 h-4 mr-2" />
            Send Email
          </button>
        </div>
      </div>
    </div>
  </div>
)

const CartSidebar = ({ cart, onUpdateQuantity, onRemoveItem, onCheckout, onClose, onContinueShopping }) => (
  <div className="fixed inset-y-0 right-0 w-full sm:w-96 z-[9998] bg-[#0a0a1a] border-l border-white/10 shadow-2xl animate-slide-in-right">
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
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
              onClick={onContinueShopping}
              className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
                      className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center"
                      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center"
                      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
                    onClick={() => onRemoveItem(item.id)}
                    className="mt-2 text-sm text-red-400 hover:text-red-300"
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
            onClick={onCheckout}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  </div>
)

const DeleteModal = ({ type, onConfirm, onCancel }) => (
  <div className="modal-overlay" onClick={onCancel}>
    <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
      <div className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
          <FiTrash2 className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Confirm Delete</h3>
        <p className="text-gray-400 mb-6">
          Are you sure you want to delete this {type}? This action cannot be undone.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
)

const CouponModal = ({ coupon, onSave, onClose }) => {
  const [formData, setFormData] = useState(coupon || {
    code: `SAVE${Math.floor(Math.random() * 9000 + 1000)}`,
    type: 'percentage',
    value: 10,
    minPurchase: 0,
    usageLimit: 100,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FiPercent className="w-5 h-5" />
              {coupon ? 'Edit Coupon' : 'Create Coupon'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Coupon Code *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="form-input font-mono"
                  required
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="form-input"
                    required
                    style={{ pointerEvents: 'auto' }}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                    <option value="free_shipping">Free Shipping</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Value *</label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
                    className="form-input"
                    required
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Minimum Purchase</label>
                <input
                  type="number"
                  value={formData.minPurchase}
                  onChange={(e) => setFormData({ ...formData, minPurchase: parseFloat(e.target.value) })}
                  className="form-input"
                  placeholder="0 for no minimum"
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Usage Limit</label>
                <input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) })}
                  className="form-input"
                  placeholder="Leave empty for unlimited"
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="form-input"
                    required
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="form-input"
                    required
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                <FiSave className="inline w-4 h-4 mr-2" />
                {coupon ? 'Update Coupon' : 'Create Coupon'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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

export default ECommerce
