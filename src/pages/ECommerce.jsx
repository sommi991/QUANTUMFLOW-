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
  FiPieChart, FiActivity, FiCompass, FiTarget
} from 'react-icons/fi'

const ECommerce = () => {
  // ============ COMPLETE STATE MANAGEMENT ============
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
  const [dateRange, setDateRange] = useState('month')
  const [currency, setCurrency] = useState('USD')
  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('UTC')
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

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

  // ============ PRODUCTS DATABASE - 500+ PRODUCTS ============
  const [products, setProducts] = useState([
    // Electronics - 100+ products
    ...Array(50).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 1).padStart(4, '0')}`,
      name: `Premium Wireless Headphones ${i + 1}`,
      category: 'Electronics',
      subCategory: 'Audio',
      brand: ['Sony', 'Bose', 'Apple', 'Samsung', 'JBL'][i % 5],
      price: 199.99 + (i * 25),
      cost: 120.00 + (i * 15),
      comparePrice: 249.99 + (i * 30),
      profit: 79.99 + (i * 10),
      margin: 40,
      sales: 1248 - (i * 12),
      revenue: 249351 - (i * 2500),
      stock: i % 5 === 0 ? 3 : 45 + (i * 5),
      reserved: Math.floor(Math.random() * 10),
      available: 45 + (i * 5) - Math.floor(Math.random() * 10),
      lowStockThreshold: 20,
      rating: 4.5 + (Math.random() * 0.5),
      reviews: 342 - (i * 3),
      status: i % 8 === 0 ? 'draft' : 'active',
      sku: `ELEC-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i).padStart(10, '0')}`,
      weight: '0.5kg',
      dimensions: '18x15x8cm',
      images: [],
      tags: ['wireless', 'audio', 'premium', 'bluetooth'],
      variants: ['Black', 'White', 'Silver'].slice(0, i % 3 + 1),
      colors: ['#000000', '#FFFFFF', '#C0C0C0'].slice(0, i % 3 + 1),
      warranty: '2 years',
      supplier: {
        id: `SUP-${String(i % 10 + 1).padStart(3, '0')}`,
        name: `Supplier ${i % 10 + 1}`,
        price: 100 + (i * 15),
        minOrder: 10,
        leadTime: '3-5 days'
      },
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      updatedAt: new Date().toISOString().split('T')[0]
    })),
    // Smartphones - 50+ products
    ...Array(30).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 51).padStart(4, '0')}`,
      name: `SmartPhone Pro Max ${i + 12}`,
      category: 'Electronics',
      subCategory: 'Smartphones',
      brand: i % 2 === 0 ? 'Apple' : 'Samsung',
      price: 999.99 + (i * 50),
      cost: 700.00 + (i * 35),
      comparePrice: 1099.99 + (i * 55),
      profit: 299.99 + (i * 15),
      margin: 30,
      sales: 892 - (i * 5),
      revenue: 891608 - (i * 5000),
      stock: i % 3 === 0 ? 2 : 28 + (i * 3),
      reserved: Math.floor(Math.random() * 5),
      available: 28 + (i * 3) - Math.floor(Math.random() * 5),
      lowStockThreshold: 10,
      rating: 4.7 + (Math.random() * 0.3),
      reviews: 256 - (i * 2),
      status: 'active',
      sku: `PHONE-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i + 50).padStart(10, '0')}`,
      weight: '0.3kg',
      dimensions: '15x7x1cm',
      images: [],
      tags: ['smartphone', 'mobile', '5g', 'pro'],
      variants: ['128GB', '256GB', '512GB'].slice(0, i % 3 + 1),
      colors: ['#000000', '#FFFFFF', '#FFD700'].slice(0, i % 3 + 1),
      warranty: '1 year',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),
    // Fashion - 100+ products
    ...Array(50).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 81).padStart(4, '0')}`,
      name: `Premium Cotton T-Shirt ${i + 1}`,
      category: 'Fashion',
      subCategory: 'Apparel',
      brand: ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M'][i % 5],
      price: 29.99 + (i * 5),
      cost: 12.50 + (i * 2),
      comparePrice: 39.99 + (i * 6),
      profit: 17.49 + (i * 3),
      margin: 58,
      sales: 2156 - (i * 15),
      revenue: 64666 - (i * 450),
      stock: 156 - (i * 3),
      reserved: Math.floor(Math.random() * 15),
      available: 156 - (i * 3) - Math.floor(Math.random() * 15),
      lowStockThreshold: 30,
      rating: 4.8 + (Math.random() * 0.2),
      reviews: 567 - (i * 5),
      status: i % 6 === 0 ? 'draft' : 'active',
      sku: `APPAREL-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i + 80).padStart(10, '0')}`,
      weight: '0.2kg',
      dimensions: '30x20x5cm',
      images: [],
      tags: ['cotton', 't-shirt', 'premium', 'casual'],
      variants: ['S', 'M', 'L', 'XL'].slice(0, i % 4 + 1),
      colors: ['#000000', '#FFFFFF', '#FF0000', '#0000FF'].slice(0, i % 4 + 1),
      sizes: ['S', 'M', 'L', 'XL'].slice(0, i % 4 + 1),
      materials: ['100% Cotton'],
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),
    // Home & Living - 80+ products
    ...Array(40).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 131).padStart(4, '0')}`,
      name: `Modern Desk Lamp ${i + 1}`,
      category: 'Home & Living',
      subCategory: 'Lighting',
      brand: ['IKEA', 'Philips', 'Xiaomi', 'Osram'][i % 4],
      price: 49.99 + (i * 8),
      cost: 25.00 + (i * 4),
      comparePrice: 69.99 + (i * 10),
      profit: 24.99 + (i * 4),
      margin: 50,
      sales: 745 - (i * 6),
      revenue: 37243 - (i * 300),
      stock: 42 - (i * 1),
      reserved: Math.floor(Math.random() * 5),
      available: 42 - (i * 1) - Math.floor(Math.random() * 5),
      lowStockThreshold: 15,
      rating: 4.6 + (Math.random() * 0.4),
      reviews: 189 - (i * 2),
      status: 'active',
      sku: `HOME-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i + 130).padStart(10, '0')}`,
      weight: '1.2kg',
      dimensions: '40x15x15cm',
      images: [],
      tags: ['lamp', 'lighting', 'modern', 'desk'],
      variants: ['Black', 'White', 'Silver'].slice(0, i % 3 + 1),
      colors: ['#000000', '#FFFFFF', '#C0C0C0'].slice(0, i % 3 + 1),
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),
    // Food & Beverage - 60+ products
    ...Array(30).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 171).padStart(4, '0')}`,
      name: `Organic Coffee Beans ${i + 1}`,
      category: 'Food & Beverage',
      subCategory: 'Coffee',
      brand: ['Starbucks', 'Dunkin', 'Peets', 'Local Roast'][i % 4],
      price: 24.99 + (i * 3),
      cost: 12.50 + (i * 1.5),
      comparePrice: 29.99 + (i * 4),
      profit: 12.49 + (i * 1.5),
      margin: 50,
      sales: 2156 - (i * 20),
      revenue: 53874 - (i * 500),
      stock: 156 - (i * 4),
      reserved: Math.floor(Math.random() * 10),
      available: 156 - (i * 4) - Math.floor(Math.random() * 10),
      lowStockThreshold: 40,
      rating: 4.9,
      reviews: 567 - (i * 8),
      status: 'active',
      sku: `FOOD-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i + 170).padStart(10, '0')}`,
      weight: '0.5kg',
      dimensions: '15x10x10cm',
      images: [],
      tags: ['organic', 'coffee', 'beverage', 'premium'],
      variants: ['Whole Bean', 'Ground'].slice(0, i % 2 + 1),
      expiryDate: `2025-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),
    // Beauty & Health - 50+ products
    ...Array(25).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 201).padStart(4, '0')}`,
      name: `Organic Face Cream ${i + 1}`,
      category: 'Beauty & Health',
      subCategory: 'Skincare',
      brand: ['Loreal', 'Nivea', 'Cetaphil', 'Neutrogena'][i % 4],
      price: 34.99 + (i * 4),
      cost: 15.00 + (i * 2),
      comparePrice: 44.99 + (i * 5),
      profit: 19.99 + (i * 2),
      margin: 57,
      sales: 892 - (i * 8),
      revenue: 31223 - (i * 280),
      stock: 89 - (i * 2),
      reserved: Math.floor(Math.random() * 8),
      available: 89 - (i * 2) - Math.floor(Math.random() * 8),
      lowStockThreshold: 20,
      rating: 4.7,
      reviews: 234 - (i * 3),
      status: 'active',
      sku: `BEAUTY-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i + 200).padStart(10, '0')}`,
      weight: '0.2kg',
      dimensions: '8x8x6cm',
      images: [],
      tags: ['organic', 'skincare', 'face cream', 'natural'],
      variants: ['50ml', '100ml'].slice(0, i % 2 + 1),
      expiryDate: `2026-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),
    // Sports & Outdoors - 40+ products
    ...Array(20).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 226).padStart(4, '0')}`,
      name: `Yoga Mat Premium ${i + 1}`,
      category: 'Sports & Outdoors',
      subCategory: 'Yoga',
      brand: ['Lululemon', 'Nike', 'Adidas', 'Gaiam'][i % 4],
      price: 49.99 + (i * 6),
      cost: 25.00 + (i * 3),
      comparePrice: 69.99 + (i * 8),
      profit: 24.99 + (i * 3),
      margin: 50,
      sales: 745 - (i * 5),
      revenue: 37243 - (i * 250),
      stock: 67 - (i * 2),
      reserved: Math.floor(Math.random() * 6),
      available: 67 - (i * 2) - Math.floor(Math.random() * 6),
      lowStockThreshold: 20,
      rating: 4.8,
      reviews: 189 - (i * 2),
      status: 'active',
      sku: `SPORT-${String(i + 1).padStart(4, '0')}`,
      barcode: `890${String(i + 225).padStart(10, '0')}`,
      weight: '1.5kg',
      dimensions: '180x60x0.5cm',
      images: [],
      tags: ['yoga', 'fitness', 'exercise', 'premium'],
      variants: ['Blue', 'Purple', 'Black'].slice(0, i % 3 + 1),
      colors: ['#0000FF', '#800080', '#000000'].slice(0, i % 3 + 1),
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ]).flat()

  // ============ ORDERS DATABASE - 300+ ORDERS ============
  const [orders, setOrders] = useState([
    ...Array(100).fill(null).map((_, i) => ({
      id: `ORD-${String(i + 1000).slice(1)}`,
      customer: ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Wilson', 'David Lee', 'Lisa Anderson', 'James Taylor', 'Maria Garcia'][i % 8],
      email: ['john@example.com', 'sarah@example.com', 'michael@example.com', 'emma@example.com', 'david@example.com', 'lisa@example.com', 'james@example.com', 'maria@example.com'][i % 8],
      phone: `+1 555-${String(100 + i).slice(1)}`,
      date: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      amount: 50 + (i * 15) + (Math.random() * 100),
      subtotal: 45 + (i * 13) + (Math.random() * 90),
      tax: 5 + (i * 2) + (Math.random() * 10),
      shipping: i % 3 === 0 ? 0 : 9.99,
      discount: i % 4 === 0 ? 10 : 0,
      status: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'][i % 5],
      paymentStatus: ['paid', 'pending', 'failed', 'refunded'][i % 4],
      paymentMethod: ['Credit Card', 'PayPal', 'Apple Pay', 'Google Pay', 'Bank Transfer'][i % 5],
      shippingMethod: ['Standard', 'Express', 'Next Day', 'International'][i % 4],
      trackingNumber: i % 3 === 0 ? `TRK${String(100000 + i).slice(1)}` : null,
      items: Array(Math.floor(Math.random() * 3) + 1).fill(null).map((_, j) => ({
        id: `PRD-${String((i + j) % 50 + 1).padStart(4, '0')}`,
        name: products[(i + j) % products.length]?.name || 'Product',
        quantity: Math.floor(Math.random() * 3) + 1,
        price: 25 + (i * 3) % 100,
        sku: `SKU-${i}-${j}`
      })),
      shippingAddress: {
        street: `${123 + i} Main St`,
        city: ['San Francisco', 'Los Angeles', 'New York', 'Chicago', 'Seattle'][i % 5],
        state: ['CA', 'NY', 'IL', 'WA', 'TX'][i % 5],
        zip: ['94105', '90001', '10001', '60601', '98101'][i % 5],
        country: 'USA'
      },
      billingAddress: {
        street: `${123 + i} Main St`,
        city: ['San Francisco', 'Los Angeles', 'New York', 'Chicago', 'Seattle'][i % 5],
        state: ['CA', 'NY', 'IL', 'WA', 'TX'][i % 5],
        zip: ['94105', '90001', '10001', '60601', '98101'][i % 5],
        country: 'USA'
      },
      notes: i % 5 === 0 ? 'Gift wrap please' : '',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ])

  // ============ CUSTOMERS DATABASE - 200+ CUSTOMERS ============
  const [customers, setCustomers] = useState([
    ...Array(100).fill(null).map((_, i) => ({
      id: `CUST-${String(i + 1).padStart(4, '0')}`,
      name: ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Wilson', 'David Lee', 'Lisa Anderson', 'James Taylor', 'Maria Garcia'][i % 8] + ` ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `+1 555-${String(100 + i).slice(1)}`,
      orders: 3 + (i % 20),
      spent: 150 + (i * 45) + (Math.random() * 200),
      averageOrder: 45 + (i * 2),
      lastOrder: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      firstOrder: `2023-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      status: i % 8 === 0 ? 'inactive' : 'active',
      segment: ['new', 'regular', 'vip', 'wholesale'][i % 4],
      lifetimeValue: 300 + (i * 60),
      notes: i % 10 === 0 ? 'VIP Customer - Priority Support' : '',
      tags: i % 3 === 0 ? ['wholesale'] : i % 3 === 1 ? ['retail'] : ['online'],
      paymentMethods: [
        { type: 'Credit Card', last4: '4242', expiry: '12/25' }
      ],
      addresses: [
        {
          type: 'shipping',
          street: `${123 + i} Main St`,
          city: ['San Francisco', 'Los Angeles', 'New York', 'Chicago', 'Seattle'][i % 5],
          state: ['CA', 'NY', 'IL', 'WA', 'TX'][i % 5],
          zip: ['94105', '90001', '10001', '60601', '98101'][i % 5],
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
    { id: 'CAT-020', name: 'Camping', slug: 'camping', parent: 'CAT-018', level: 1, order: 2, count: 8, color: '#0ea5e9', featured: false },
    { id: 'CAT-021', name: 'Books', slug: 'books', parent: null, level: 0, order: 7, count: 45, color: '#8b5cf6', featured: true },
    { id: 'CAT-022', name: 'Toys & Games', slug: 'toys-games', parent: null, level: 0, order: 8, count: 32, color: '#f59e0b', featured: true },
    { id: 'CAT-023', name: 'Automotive', slug: 'automotive', parent: null, level: 0, order: 9, count: 24, color: '#ef4444', featured: false },
    { id: 'CAT-024', name: 'Pet Supplies', slug: 'pet-supplies', parent: null, level: 0, order: 10, count: 18, color: '#10b981', featured: false },
    { id: 'CAT-025', name: 'Office Products', slug: 'office-products', parent: null, level: 0, order: 11, count: 27, color: '#3b82f6', featured: false }
  ])

  // ============ COUPONS & DISCOUNTS - 100+ COUPONS ============
  const [coupons, setCoupons] = useState([
    ...Array(50).fill(null).map((_, i) => ({
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

  // ============ PRODUCT REVIEWS - 500+ REVIEWS ============
  const [reviews, setReviews] = useState([
    ...Array(200).fill(null).map((_, i) => ({
      id: `REV-${String(i + 1).padStart(4, '0')}`,
      productId: `PRD-${String(i % 50 + 1).padStart(4, '0')}`,
      productName: products[i % products.length]?.name || 'Product',
      customerId: `CUST-${String(i % 50 + 1).padStart(4, '0')}`,
      customerName: customers[i % customers.length]?.name || 'Customer',
      rating: Math.floor(Math.random() * 2) + 4,
      title: ['Great product!', 'Excellent quality', 'Very satisfied', 'Good value', 'Highly recommended', 'Perfect!', 'Love it!', 'Amazing!'][i % 8],
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      pros: ['Quality', 'Price', 'Shipping', 'Design', 'Features'].slice(0, i % 6),
      cons: i % 5 === 0 ? ['Size', 'Color', 'Battery life'].slice(0, i % 4) : [],
      images: i % 10 === 0 ? ['review1.jpg', 'review2.jpg'] : [],
      verified: i % 3 !== 0,
      helpful: Math.floor(Math.random() * 50),
      notHelpful: Math.floor(Math.random() * 10),
      status: i % 10 === 0 ? 'pending' : 'approved',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      reply: i % 8 === 0 ? {
        content: 'Thank you for your review! We appreciate your feedback.',
        createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 2).padStart(2, '0')}`
      } : null
    }))
  ])

  // ============ INVENTORY MOVEMENTS ============
  const [inventoryMovements, setInventoryMovements] = useState([
    ...Array(100).fill(null).map((_, i) => ({
      id: `MOV-${String(i + 1).padStart(4, '0')}`,
      productId: `PRD-${String(i % 50 + 1).padStart(4, '0')}`,
      type: ['inbound', 'outbound', 'adjustment', 'return'][i % 4],
      quantity: Math.floor(Math.random() * 50) + 1,
      previousStock: Math.floor(Math.random() * 100) + 50,
      newStock: Math.floor(Math.random() * 100) + 50,
      reason: ['purchase order', 'customer sale', 'inventory count', 'damaged item', 'return'][i % 5],
      reference: i % 2 === 0 ? `PO-${String(i).padStart(4, '0')}` : `ORD-${String(i).padStart(4, '0')}`,
      createdBy: `user${i % 5 + 1}@example.com`,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ])

  // ============ ABANDONED CARTS ============
  const [abandonedCarts, setAbandonedCarts] = useState([
    ...Array(50).fill(null).map((_, i) => ({
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
    ...Array(30).fill(null).map((_, i) => ({
      id: `SUP-${String(i + 1).padStart(3, '0')}`,
      name: `Supplier ${i + 1}`,
      contactName: `Contact Person ${i + 1}`,
      email: `supplier${i + 1}@example.com`,
      phone: `+1 555-${String(200 + i).slice(1)}`,
      address: `${456 + i} Business Ave`,
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
      notes: i % 4 === 0 ? 'Preferred supplier - fast shipping' : '',
      createdAt: `2023-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ])

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

  // ============ NOTIFICATION SYSTEM ============
  const showNotification = (message, type = 'success') => {
    setNotification({ id: Date.now(), message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // ============ FILTERED DATA ============
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            E-Commerce Dashboard
          </h1>
          <p className="text-gray-400 flex items-center gap-2 mt-1">
            <FiShoppingBag className="w-4 h-4" />
            Complete e-commerce management system with {products.length} products, {orders.length} orders, and {customers.length} customers
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span className="hidden sm:inline">Add Product</span>
          </button>

          {/* New Order Button */}
          <button
            onClick={() => {
              const newOrder = {
                id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
                customer: 'New Customer',
                email: 'customer@example.com',
                phone: '+1 555-0000',
                date: new Date().toISOString().split('T')[0],
                amount: 0,
                status: 'pending',
                items: []
              }
              setOrders([newOrder, ...orders])
              setSelectedOrder(newOrder)
              setShowOrderModal(true)
              showNotification('✅ New order created!')
            }}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-all flex items-center gap-2 group"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <FiTruck className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            <span className="hidden sm:inline">New Order</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
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
          onClick={() => setActiveTab('orders')}
        />
        <StatCard 
          icon={FiAlertCircle}
          value={stats.lowStock}
          label="Low Stock"
          change="-5.1%"
          color="from-red-500 to-pink-500"
          onClick={() => setActiveTab('inventory')}
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
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <TabButton 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
          label="Dashboard"
          icon={FiHome}
        />
        <TabButton 
          active={activeTab === 'products'} 
          onClick={() => setActiveTab('products')}
          label="Products"
          icon={FiBox}
          badge={filteredProducts.length}
        />
        <TabButton 
          active={activeTab === 'orders'} 
          onClick={() => setActiveTab('orders')}
          label="Orders"
          icon={FiPackage}
          badge={stats.pendingOrders}
        />
        <TabButton 
          active={activeTab === 'customers'} 
          onClick={() => setActiveTab('customers')}
          label="Customers"
          icon={FiUsers}
        />
        <TabButton 
          active={activeTab === 'inventory'} 
          onClick={() => setActiveTab('inventory')}
          label="Inventory"
          icon={FiArchive}
          badge={stats.lowStock}
        />
        <TabButton 
          active={activeTab === 'marketing'} 
          onClick={() => setActiveTab('marketing')}
          label="Marketing"
          icon={FiPercent}
        />
        <TabButton 
          active={activeTab === 'analytics'} 
          onClick={() => setActiveTab('analytics')}
          label="Analytics"
          icon={FiBarChart2}
        />
        <TabButton 
          active={activeTab === 'reports'} 
          onClick={() => setActiveTab('reports')}
          label="Reports"
          icon={FiFile}
        />
      </div>

      {/* Search and Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none transition-colors"
              style={{ pointerEvents: 'auto' }}
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
            <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
              <FiFilter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            
            <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
              <FiDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            
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

      {/* Content Area */}
      <div className="space-y-6">
        {activeTab === 'dashboard' && (
          <DashboardOverview 
            stats={stats}
            orders={orders.slice(0, 5)}
            products={products.slice(0, 5)}
            customers={customers.slice(0, 5)}
            onViewAllOrders={() => setActiveTab('orders')}
            onViewAllProducts={() => setActiveTab('products')}
            onViewAllCustomers={() => setActiveTab('customers')}
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
            onSelectAll={() => {
              if (selectedItems.length === filteredProducts.length) {
                setSelectedItems([])
              } else {
                setSelectedItems(filteredProducts.map(p => p.id))
              }
            }}
            onEdit={(product) => {
              setSelectedProduct(product)
              setShowProductModal(true)
            }}
            onDelete={(id) => {
              setItemToDelete(id)
              setDeleteType('product')
              setShowDeleteModal(true)
            }}
            onAddToCart={(product) => {
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
            }}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersView 
            orders={filteredOrders}
            onViewOrder={(order) => {
              setSelectedOrder(order)
              setShowOrderModal(true)
            }}
            onUpdateStatus={(orderId, status) => {
              setOrders(orders.map(o => 
                o.id === orderId ? { ...o, status } : o
              ))
              showNotification(`✅ Order status updated to ${status}`)
            }}
          />
        )}

        {activeTab === 'customers' && (
          <CustomersView 
            customers={filteredCustomers}
            onViewCustomer={(customer) => {
              setSelectedCustomer(customer)
              setShowCustomerModal(true)
            }}
          />
        )}
      </div>

      {/* Notifications */}
      {notification && (
        <div 
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border animate-slide-in-right
            ${notification.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-400' : 
              notification.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' :
              'bg-green-500/20 border-green-500/30 text-green-400'}`}
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

const TabButton = ({ active, onClick, icon: Icon, label, badge }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 relative
      ${active 
        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
    {badge && (
      <span className="ml-1 px-2 py-0.5 text-xs bg-white/20 rounded-full">
        {badge}
      </span>
    )}
  </button>
)

// Placeholder components - to be expanded
const DashboardOverview = ({ stats, orders, products, customers, onViewAllOrders, onViewAllProducts, onViewAllCustomers }) => (
  <div className="glass-card p-6">
    <h3 className="text-lg font-bold mb-4">Dashboard Overview</h3>
    <p className="text-gray-400">Welcome to your e-commerce dashboard. Select a tab above to manage products, orders, and customers.</p>
  </div>
)

const ProductsView = ({ products, viewMode, selectedItems, onSelectItem, onSelectAll, onEdit, onDelete, onAddToCart }) => (
  <div className="space-y-4">
    {selectedItems.length > 0 && (
      <div className="glass-card p-4 flex items-center justify-between">
        <span className="text-sm text-gray-400">{selectedItems.length} products selected</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-sm hover:bg-red-500/20">
            Delete Selected
          </button>
        </div>
      </div>
    )}
    
    {viewMode === 'grid' ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.slice(0, 8).map(product => (
          <div key={product.id} className="glass-card p-6 hover:scale-105 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <FiBox className="w-8 h-8 text-white" />
              </div>
              <input
                type="checkbox"
                checked={selectedItems.includes(product.id)}
                onChange={() => onSelectItem(product.id)}
                className="w-5 h-5 rounded border-white/10 bg-white/5"
              />
            </div>
            <h4 className="font-semibold text-lg mb-1">{product.name}</h4>
            <p className="text-sm text-gray-400 mb-2">{product.category}</p>
            <div className="flex items-center justify-between mb-3">
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
                <span className="font-semibold">{product.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm flex items-center justify-center gap-1"
              >
                <FiEdit className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 px-3 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 text-sm flex items-center justify-center gap-1"
              >
                <FiShoppingCart className="w-4 h-4" /> Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems.length === products.length && products.length > 0}
                  onChange={onSelectAll}
                  className="w-5 h-5 rounded border-white/10 bg-white/5"
                />
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-400">Product</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-400">SKU</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-400">Category</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-400">Price</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-400">Stock</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-400">Status</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map(product => (
              <tr key={product.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(product.id)}
                    onChange={() => onSelectItem(product.id)}
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
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'active' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-gray-500/10 text-gray-400'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
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
    )}
  </div>
)

const OrdersView = ({ orders, onViewOrder, onUpdateStatus }) => (
  <div className="glass-card overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="border-b border-white/10 bg-white/5">
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Order ID</th>
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Customer</th>
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Date</th>
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Amount</th>
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Status</th>
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Payment</th>
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.slice(0, 5).map(order => (
          <tr key={order.id} className="border-b border-white/10 hover:bg-white/5 cursor-pointer" onClick={() => onViewOrder(order)}>
            <td className="p-4 font-semibold">{order.id}</td>
            <td className="p-4">
              <div>
                <div className="font-medium">{order.customer}</div>
                <div className="text-xs text-gray-400">{order.email}</div>
              </div>
            </td>
            <td className="p-4 text-sm">{new Date(order.date).toLocaleDateString()}</td>
            <td className="p-4 font-semibold text-blue-400">${order.amount.toFixed(2)}</td>
            <td className="p-4">
              <select
                value={order.status}
                onChange={(e) => {
                  e.stopPropagation()
                  onUpdateStatus(order.id, e.target.value)
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  order.status === 'delivered' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                  order.status === 'shipped' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  order.status === 'processing' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                  order.status === 'pending' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                  'bg-red-500/10 text-red-500 border-red-500/20'
                }`}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
            <td className="p-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                order.paymentStatus === 'paid' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-orange-500/10 text-orange-400'
              }`}>
                {order.paymentStatus}
              </span>
            </td>
            <td className="p-4">
              <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                <FiEye className="w-4 h-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const CustomersView = ({ customers, onViewCustomer }) => (
  <div className="glass-card overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="border-b border-white/10 bg-white/5">
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Customer</th>
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Contact</th>
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Orders</th>
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Spent</th>
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Segment</th>
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Status</th>
          <th className="p-4 text-left text-sm font-semibold text-gray-400">Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.slice(0, 5).map(customer => (
          <tr key={customer.id} className="border-b border-white/10 hover:bg-white/5 cursor-pointer" onClick={() => onViewCustomer(customer)}>
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
            <td className="p-4 font-semibold">{customer.orders}</td>
            <td className="p-4 font-semibold text-blue-400">${customer.spent.toFixed(2)}</td>
            <td className="p-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                customer.segment === 'vip' ? 'bg-purple-500/10 text-purple-400' :
                customer.segment === 'new' ? 'bg-green-500/10 text-green-500' :
                'bg-blue-500/10 text-blue-400'
              }`}>
                {customer.segment}
              </span>
            </td>
            <td className="p-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                customer.status === 'active' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-gray-500/10 text-gray-400'
              }`}>
                {customer.status}
              </span>
            </td>
            <td className="p-4">
              <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                <FiEye className="w-4 h-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

import { FiX, FiFile } from 'react-icons/fi'
export default ECommerce
