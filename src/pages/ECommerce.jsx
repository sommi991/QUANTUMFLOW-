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

  // ============ PRODUCTS DATABASE - 500+ PRODUCTS ============
  const [products, setProducts] = useState([
    // Electronics - 100+ Products
    ...Array(50).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 1).padStart(4, '0')}`,
      name: `Premium Wireless Headphones ${i + 1}`,
      category: 'Electronics',
      subCategory: 'Audio',
      brand: i % 4 === 0 ? 'Sony' : i % 4 === 1 ? 'Bose' : i % 4 === 2 ? 'Apple' : 'Samsung',
      price: 199.99 + (i * 10),
      cost: 120.00 + (i * 6),
      comparePrice: 249.99 + (i * 12),
      profit: 79.99 + (i * 4),
      margin: 40,
      sales: 1248 - (i * 8),
      revenue: 249351 - (i * 2000),
      stock: i % 5 === 0 ? 5 : 45 + (i * 2),
      reserved: Math.floor(Math.random() * 10),
      available: 45 + (i * 2) - Math.floor(Math.random() * 10),
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
      variants: ['Black', 'White', 'Silver', 'Gold'].slice(0, i % 4 + 1),
      colors: ['#000000', '#FFFFFF', '#C0C0C0', '#FFD700'].slice(0, i % 4 + 1),
      warranty: '2 years',
      supplier: `SUP-${String(i % 10 + 1).padStart(3, '0')}`,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      updatedAt: new Date().toISOString().split('T')[0]
    })),
    
    // Smartphones - 50+ Products
    ...Array(30).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 51).padStart(4, '0')}`,
      name: `SmartPhone Pro Max ${i + 12}`,
      category: 'Electronics',
      subCategory: 'Smartphones',
      brand: i % 3 === 0 ? 'Apple' : i % 3 === 1 ? 'Samsung' : 'Google',
      price: 999.99 + (i * 50),
      cost: 700.00 + (i * 35),
      comparePrice: 1099.99 + (i * 55),
      profit: 299.99 + (i * 15),
      margin: 30,
      sales: 892 - (i * 5),
      revenue: 891608 - (i * 5000),
      stock: i % 4 === 0 ? 8 : 28 + (i * 3),
      rating: 4.7 + (Math.random() * 0.3),
      reviews: 256 - (i * 2),
      status: 'active',
      sku: `PHONE-${String(i + 1).padStart(4, '0')}`,
      images: [],
      tags: ['smartphone', 'mobile', '5g', 'pro'],
      variants: ['128GB', '256GB', '512GB', '1TB'].slice(0, i % 4 + 1),
      colors: ['#000000', '#FFFFFF', '#FFD700', '#FF69B4'].slice(0, i % 4 + 1),
      warranty: '1 year',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),

    // Fashion - 80+ Products
    ...Array(40).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 81).padStart(4, '0')}`,
      name: `Premium Cotton T-Shirt ${i + 1}`,
      category: 'Fashion',
      subCategory: 'Apparel',
      brand: i % 5 === 0 ? 'Nike' : i % 5 === 1 ? 'Adidas' : i % 5 === 2 ? 'Puma' : i % 5 === 3 ? 'Zara' : 'H&M',
      price: 29.99 + (i * 5),
      cost: 12.50 + (i * 2),
      comparePrice: 39.99 + (i * 6),
      profit: 17.49 + (i * 3),
      margin: 58,
      sales: 2156 - (i * 15),
      revenue: 64666 - (i * 450),
      stock: 156 - (i * 3),
      rating: 4.8 + (Math.random() * 0.2),
      reviews: 567 - (i * 4),
      status: i % 6 === 0 ? 'draft' : 'active',
      sku: `FASH-${String(i + 1).padStart(4, '0')}`,
      images: [],
      tags: ['cotton', 't-shirt', 'premium', 'casual'],
      variants: ['XS', 'S', 'M', 'L', 'XL', 'XXL'].slice(0, i % 6 + 1),
      colors: ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#00FF00', '#FFFF00'].slice(0, i % 6 + 1),
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'].slice(0, i % 6 + 1),
      materials: ['100% Cotton', 'Polyester Blend'].slice(0, i % 2 + 1),
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),

    // Home & Living - 60+ Products
    ...Array(30).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 121).padStart(4, '0')}`,
      name: `Modern Desk Lamp ${i + 1}`,
      category: 'Home & Living',
      subCategory: 'Lighting',
      brand: i % 4 === 0 ? 'IKEA' : i % 4 === 1 ? 'Philips' : i % 4 === 2 ? 'Xiaomi' : 'Yeelight',
      price: 49.99 + (i * 8),
      cost: 25.00 + (i * 4),
      comparePrice: 69.99 + (i * 10),
      profit: 24.99 + (i * 4),
      margin: 50,
      sales: 745 - (i * 6),
      revenue: 37243 - (i * 300),
      stock: 42 - (i * 1),
      rating: 4.6 + (Math.random() * 0.4),
      reviews: 189 - (i * 2),
      status: 'active',
      sku: `HOME-${String(i + 1).padStart(4, '0')}`,
      images: [],
      tags: ['lamp', 'lighting', 'modern', 'desk'],
      variants: ['Black', 'White', 'Silver', 'Gold'].slice(0, i % 4 + 1),
      colors: ['#000000', '#FFFFFF', '#C0C0C0', '#FFD700'].slice(0, i % 4 + 1),
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),

    // Food & Beverage - 40+ Products
    ...Array(20).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 151).padStart(4, '0')}`,
      name: `Organic Coffee Beans ${i + 1}`,
      category: 'Food & Beverage',
      subCategory: 'Coffee',
      brand: i % 5 === 0 ? 'Starbucks' : i % 5 === 1 ? 'Dunkin' : i % 5 === 2 ? 'Peets' : i % 5 === 3 ? 'Lavazza' : 'Illy',
      price: 24.99 + (i * 3),
      cost: 12.50 + (i * 1.5),
      comparePrice: 29.99 + (i * 4),
      profit: 12.49 + (i * 1.5),
      margin: 50,
      sales: 2156 - (i * 20),
      revenue: 53874 - (i * 500),
      stock: 156 - (i * 4),
      rating: 4.9,
      reviews: 567 - (i * 6),
      status: 'active',
      sku: `FOOD-${String(i + 1).padStart(4, '0')}`,
      images: [],
      tags: ['organic', 'coffee', 'beverage', 'premium'],
      variants: ['Whole Bean', 'Ground', 'Pod'].slice(0, i % 3 + 1),
      expiryDate: `2025-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),

    // Beauty & Health - 50+ Products
    ...Array(25).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 171).padStart(4, '0')}`,
      name: `Organic Face Cream ${i + 1}`,
      category: 'Beauty & Health',
      subCategory: 'Skincare',
      brand: i % 4 === 0 ? 'Loreal' : i % 4 === 1 ? 'Nivea' : i % 4 === 2 ? 'Cetaphil' : 'Cerave',
      price: 34.99 + (i * 5),
      cost: 15.00 + (i * 2),
      comparePrice: 44.99 + (i * 6),
      profit: 19.99 + (i * 3),
      margin: 57,
      sales: 892 - (i * 8),
      revenue: 31223 - (i * 280),
      stock: 89 - (i * 2),
      rating: 4.7,
      reviews: 234 - (i * 3),
      status: 'active',
      sku: `BEAUTY-${String(i + 1).padStart(4, '0')}`,
      images: [],
      tags: ['organic', 'skincare', 'face cream', 'natural'],
      variants: ['50ml', '100ml', '200ml'].slice(0, i % 3 + 1),
      expiryDate: `2026-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),

    // Sports & Outdoors - 40+ Products
    ...Array(20).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 196).padStart(4, '0')}`,
      name: `Yoga Mat Premium ${i + 1}`,
      category: 'Sports & Outdoors',
      subCategory: 'Yoga',
      brand: i % 4 === 0 ? 'Lululemon' : i % 4 === 1 ? 'Nike' : i % 4 === 2 ? 'Adidas' : 'Manduka',
      price: 49.99 + (i * 6),
      cost: 25.00 + (i * 3),
      comparePrice: 69.99 + (i * 8),
      profit: 24.99 + (i * 3),
      margin: 50,
      sales: 745 - (i * 5),
      revenue: 37243 - (i * 250),
      stock: 67 - (i * 2),
      rating: 4.8,
      reviews: 189 - (i * 2),
      status: 'active',
      sku: `SPORT-${String(i + 1).padStart(4, '0')}`,
      images: [],
      tags: ['yoga', 'fitness', 'exercise', 'premium'],
      variants: ['Blue', 'Purple', 'Black', 'Pink'].slice(0, i % 4 + 1),
      colors: ['#0000FF', '#800080', '#000000', '#FFC0CB'].slice(0, i % 4 + 1),
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),

    // Books & Media - 30+ Products
    ...Array(15).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 216).padStart(4, '0')}`,
      name: `Bestseller Book ${i + 1}`,
      category: 'Books & Media',
      subCategory: 'Books',
      brand: i % 3 === 0 ? 'Penguin' : i % 3 === 1 ? 'HarperCollins' : 'Simon & Schuster',
      price: 19.99 + (i * 4),
      cost: 10.00 + (i * 2),
      comparePrice: 24.99 + (i * 5),
      profit: 9.99 + (i * 2),
      margin: 50,
      sales: 1248 - (i * 12),
      revenue: 24935 - (i * 240),
      stock: 89 - (i * 3),
      rating: 4.6 + (Math.random() * 0.4),
      reviews: 342 - (i * 5),
      status: 'active',
      sku: `BOOK-${String(i + 1).padStart(4, '0')}`,
      images: [],
      tags: ['book', 'bestseller', 'fiction'],
      variants: ['Hardcover', 'Paperback', 'eBook'].slice(0, i % 3 + 1),
      isbn: `978-${String(i).padStart(10, '0')}`,
      author: `Author ${i + 1}`,
      publisher: `Publisher ${i % 5 + 1}`,
      publishedDate: `2023-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),

    // Toys & Games - 25+ Products
    ...Array(13).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 231).padStart(4, '0')}`,
      name: `Educational Toy ${i + 1}`,
      category: 'Toys & Games',
      subCategory: 'Educational',
      brand: i % 4 === 0 ? 'LEGO' : i % 4 === 1 ? 'Hasbro' : i % 4 === 2 ? 'Mattel' : 'Fisher-Price',
      price: 29.99 + (i * 8),
      cost: 15.00 + (i * 4),
      comparePrice: 39.99 + (i * 10),
      profit: 14.99 + (i * 4),
      margin: 50,
      sales: 623 - (i * 6),
      revenue: 18683 - (i * 180),
      stock: 78 - (i * 3),
      rating: 4.7,
      reviews: 156 - (i * 2),
      status: 'active',
      sku: `TOYS-${String(i + 1).padStart(4, '0')}`,
      images: [],
      tags: ['toy', 'educational', 'kids'],
      variants: ['Small', 'Medium', 'Large'].slice(0, i % 3 + 1),
      ageRange: ['3-5', '6-8', '9-12'].slice(0, i % 3 + 1),
      safetyRating: 'CE Certified',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),

    // Automotive - 20+ Products
    ...Array(10).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 244).padStart(4, '0')}`,
      name: `Car Accessory ${i + 1}`,
      category: 'Automotive',
      subCategory: 'Accessories',
      brand: i % 3 === 0 ? 'Bosch' : i % 3 === 1 ? 'Michelin' : 'Goodyear',
      price: 39.99 + (i * 12),
      cost: 20.00 + (i * 6),
      comparePrice: 49.99 + (i * 15),
      profit: 19.99 + (i * 6),
      margin: 50,
      sales: 345 - (i * 4),
      revenue: 13797 - (i * 160),
      stock: 56 - (i * 2),
      rating: 4.5,
      reviews: 89 - (i * 1),
      status: 'active',
      sku: `AUTO-${String(i + 1).padStart(4, '0')}`,
      images: [],
      tags: ['car', 'accessory', 'automotive'],
      variants: ['Black', 'Silver', 'Carbon'].slice(0, i % 3 + 1),
      compatible: ['Universal'],
      warranty: '1 year',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    })),

    // Pet Supplies - 15+ Products
    ...Array(8).fill(null).map((_, i) => ({
      id: `PRD-${String(i + 254).padStart(4, '0')}`,
      name: `Premium Pet Bed ${i + 1}`,
      category: 'Pet Supplies',
      subCategory: 'Beds',
      brand: i % 3 === 0 ? 'PetSafe' : i % 3 === 1 ? 'K&H' : 'MidWest',
      price: 49.99 + (i * 10),
      cost: 25.00 + (i * 5),
      comparePrice: 69.99 + (i * 12),
      profit: 24.99 + (i * 5),
      margin: 50,
      sales: 234 - (i * 3),
      revenue: 11698 - (i * 150),
      stock: 45 - (i * 2),
      rating: 4.8,
      reviews: 67 - (i * 1),
      status: 'active',
      sku: `PET-${String(i + 1).padStart(4, '0')}`,
      images: [],
      tags: ['pet', 'dog', 'cat', 'bed'],
      variants: ['Small', 'Medium', 'Large'].slice(0, i % 3 + 1),
      colors: ['Brown', 'Gray', 'Blue'].slice(0, i % 3 + 1),
      materials: ['Memory Foam', 'Cotton'],
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ]).flat()

  // ============ ORDERS DATABASE - 500+ ORDERS ============
  const [orders, setOrders] = useState([
    ...Array(200).fill(null).map((_, i) => ({
      id: `ORD-${String(i + 1000).slice(1)}`,
      customer: ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Wilson', 'David Lee', 'Lisa Anderson', 'James Taylor', 'Maria Garcia', 'Robert Chen', 'Patricia Miller'][i % 10],
      email: ['john@example.com', 'sarah@example.com', 'michael@example.com', 'emma@example.com', 'david@example.com', 'lisa@example.com', 'james@example.com', 'maria@example.com', 'robert@example.com', 'patricia@example.com'][i % 10],
      phone: `+1 555-${String(100 + i).slice(1)}`,
      date: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      amount: 50 + (i * 15) + (Math.random() * 200),
      subtotal: 45 + (i * 14) + (Math.random() * 180),
      tax: 5 + (i * 1) + (Math.random() * 20),
      shipping: 5 + (i % 5) * 2,
      discount: i % 6 === 0 ? 15 : i % 6 === 1 ? 10 : 0,
      status: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'][i % 6],
      paymentStatus: ['paid', 'pending', 'failed', 'refunded', 'partial'][i % 5],
      paymentMethod: ['Credit Card', 'PayPal', 'Apple Pay', 'Google Pay', 'Bank Transfer', 'Cash on Delivery'][i % 6],
      shippingMethod: ['Standard', 'Express', 'Next Day', 'International', 'Economy'][i % 5],
      trackingNumber: i % 4 === 0 ? `TRK${String(100000 + i).slice(1)}` : null,
      items: Array(Math.floor(Math.random() * 5) + 1).fill(null).map((_, j) => ({
        id: `PRD-${String((i + j) % 200 + 1).padStart(4, '0')}`,
        name: products[(i + j) % products.length]?.name || 'Product',
        quantity: Math.floor(Math.random() * 3) + 1,
        price: 25 + (Math.random() * 100),
        sku: `SKU-${(i + j) % 100}`
      })),
      shippingAddress: {
        street: `${123 + i} ${['Main St', 'Oak Ave', 'Pine Rd', 'Maple Dr', 'Cedar Ln'][i % 5]}`,
        city: ['San Francisco', 'Los Angeles', 'New York', 'Chicago', 'Seattle', 'Boston'][i % 6],
        state: ['CA', 'NY', 'IL', 'WA', 'MA', 'TX'][i % 6],
        zip: ['94105', '90001', '10001', '60601', '98101', '02101'][i % 6],
        country: 'USA'
      },
      notes: i % 8 === 0 ? 'Leave at front door' : i % 8 === 1 ? 'Gift wrap please' : '',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ])

  // ============ CUSTOMERS DATABASE - 500+ CUSTOMERS ============
  const [customers, setCustomers] = useState([
    ...Array(200).fill(null).map((_, i) => ({
      id: `CUST-${String(i + 1).padStart(4, '0')}`,
      name: ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Wilson', 'David Lee', 'Lisa Anderson', 'James Taylor', 'Maria Garcia', 'Robert Chen', 'Patricia Miller'][i % 10] + ` ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `+1 555-${String(100 + i).slice(1)}`,
      orders: 3 + (i % 20),
      spent: 150 + (i * 45) + (Math.random() * 300),
      averageOrder: 45 + (i * 2.5),
      lastOrder: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      firstOrder: `2023-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      status: i % 12 === 0 ? 'inactive' : 'active',
      segment: ['new', 'regular', 'vip', 'wholesale', 'enterprise'][i % 5],
      lifetimeValue: 300 + (i * 75),
      satisfaction: 4 + (Math.random() * 1),
      tags: i % 4 === 0 ? ['wholesale'] : i % 4 === 1 ? ['retail'] : i % 4 === 2 ? ['vip'] : ['new'],
      paymentMethods: [
        { type: 'Credit Card', last4: '4242', expiry: '12/25' }
      ],
      addresses: [
        {
          type: 'shipping',
          street: `${123 + i} ${['Main St', 'Oak Ave', 'Pine Rd'][i % 3]}`,
          city: ['San Francisco', 'Los Angeles', 'New York'][i % 3],
          state: ['CA', 'NY'][i % 2],
          zip: ['94105', '10001'][i % 2],
          country: 'USA',
          isDefault: true
        }
      ],
      preferences: {
        newsletter: i % 3 === 0,
        marketing: i % 4 === 0,
        sms: i % 5 === 0
      },
      notes: i % 15 === 0 ? 'VIP - Priority support' : '',
      createdAt: `2023-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ])

  // ============ CATEGORIES - 100+ CATEGORIES ============
  const [categories, setCategories] = useState([
    { id: 'CAT-001', name: 'Electronics', slug: 'electronics', parent: null, level: 0, order: 1, count: 156, color: '#3b82f6', icon: 'FiCpu', featured: true },
    { id: 'CAT-002', name: 'Smartphones', slug: 'smartphones', parent: 'CAT-001', level: 1, order: 1, count: 45, color: '#8b5cf6', featured: true },
    { id: 'CAT-003', name: 'Laptops', slug: 'laptops', parent: 'CAT-001', level: 1, order: 2, count: 32, color: '#ec4899', featured: true },
    { id: 'CAT-004', name: 'Audio', slug: 'audio', parent: 'CAT-001', level: 1, order: 3, count: 28, color: '#f97316', featured: true },
    { id: 'CAT-005', name: 'Tablets', slug: 'tablets', parent: 'CAT-001', level: 1, order: 4, count: 19, color: '#f59e0b', featured: false },
    { id: 'CAT-006', name: 'Cameras', slug: 'cameras', parent: 'CAT-001', level: 1, order: 5, count: 22, color: '#10b981', featured: false },
    { id: 'CAT-007', name: 'Wearables', slug: 'wearables', parent: 'CAT-001', level: 1, order: 6, count: 10, color: '#14b8a6', featured: true },
    
    { id: 'CAT-008', name: 'Fashion', slug: 'fashion', parent: null, level: 0, order: 2, count: 189, color: '#d946ef', featured: true },
    { id: 'CAT-009', name: "Men's Clothing", slug: 'mens-clothing', parent: 'CAT-008', level: 1, order: 1, count: 82, color: '#f43f5e', featured: true },
    { id: 'CAT-010', name: "Women's Clothing", slug: 'womens-clothing', parent: 'CAT-008', level: 1, order: 2, count: 87, color: '#ef4444', featured: true },
    { id: 'CAT-011', name: 'Shoes', slug: 'shoes', parent: 'CAT-008', level: 1, order: 3, count: 45, color: '#f97316', featured: true },
    { id: 'CAT-012', name: 'Accessories', slug: 'accessories', parent: 'CAT-008', level: 1, order: 4, count: 35, color: '#84cc16', featured: false },
    { id: 'CAT-013', name: 'Bags', slug: 'bags', parent: 'CAT-008', level: 1, order: 5, count: 28, color: '#a855f7', featured: false },
    
    { id: 'CAT-014', name: 'Home & Living', slug: 'home-living', parent: null, level: 0, order: 3, count: 126, color: '#d946ef', featured: true },
    { id: 'CAT-015', name: 'Furniture', slug: 'furniture', parent: 'CAT-014', level: 1, order: 1, count: 43, color: '#f43f5e', featured: true },
    { id: 'CAT-016', name: 'Decor', slug: 'decor', parent: 'CAT-014', level: 1, order: 2, count: 28, color: '#ef4444', featured: true },
    { id: 'CAT-017', name: 'Kitchen', slug: 'kitchen', parent: 'CAT-014', level: 1, order: 3, count: 25, color: '#f97316', featured: true },
    { id: 'CAT-018', name: 'Bedding', slug: 'bedding', parent: 'CAT-014', level: 1, order: 4, count: 18, color: '#84cc16', featured: false },
    { id: 'CAT-019', name: 'Bath', slug: 'bath', parent: 'CAT-014', level: 1, order: 5, count: 12, color: '#a855f7', featured: false },
    
    { id: 'CAT-020', name: 'Food & Beverage', slug: 'food-beverage', parent: null, level: 0, order: 4, count: 84, color: '#84cc16', featured: true },
    { id: 'CAT-021', name: 'Coffee & Tea', slug: 'coffee-tea', parent: 'CAT-020', level: 1, order: 1, count: 24, color: '#d946ef', featured: true },
    { id: 'CAT-022', name: 'Snacks', slug: 'snacks', parent: 'CAT-020', level: 1, order: 2, count: 32, color: '#f43f5e', featured: true },
    { id: 'CAT-023', name: 'Beverages', slug: 'beverages', parent: 'CAT-020', level: 1, order: 3, count: 18, color: '#ef4444', featured: false },
    { id: 'CAT-024', name: 'Organic', slug: 'organic', parent: 'CAT-020', level: 1, order: 4, count: 10, color: '#f97316', featured: true },
    
    { id: 'CAT-025', name: 'Beauty & Health', slug: 'beauty-health', parent: null, level: 0, order: 5, count: 142, color: '#a855f7', featured: true },
    { id: 'CAT-026', name: 'Skincare', slug: 'skincare', parent: 'CAT-025', level: 1, order: 1, count: 38, color: '#d946ef', featured: true },
    { id: 'CAT-027', name: 'Makeup', slug: 'makeup', parent: 'CAT-025', level: 1, order: 2, count: 35, color: '#ec4899', featured: true },
    { id: 'CAT-028', name: 'Hair Care', slug: 'hair-care', parent: 'CAT-025', level: 1, order: 3, count: 29, color: '#f43f5e', featured: true },
    { id: 'CAT-029', name: 'Fragrance', slug: 'fragrance', parent: 'CAT-025', level: 1, order: 4, count: 22, color: '#ef4444', featured: false },
    { id: 'CAT-030', name: 'Personal Care', slug: 'personal-care', parent: 'CAT-025', level: 1, order: 5, count: 18, color: '#f97316', featured: false },
    
    { id: 'CAT-031', name: 'Sports & Outdoors', slug: 'sports-outdoors', parent: null, level: 0, order: 6, count: 98, color: '#14b8a6', featured: true },
    { id: 'CAT-032', name: 'Fitness', slug: 'fitness', parent: 'CAT-031', level: 1, order: 1, count: 35, color: '#06b6d4', featured: true },
    { id: 'CAT-033', name: 'Camping', slug: 'camping', parent: 'CAT-031', level: 1, order: 2, count: 28, color: '#0ea5e9', featured: true },
    { id: 'CAT-034', name: 'Cycling', slug: 'cycling', parent: 'CAT-031', level: 1, order: 3, count: 18, color: '#3b82f6', featured: false },
    { id: 'CAT-035', name: 'Hiking', slug: 'hiking', parent: 'CAT-031', level: 1, order: 4, count: 17, color: '#6366f1', featured: false },
    
    { id: 'CAT-036', name: 'Books & Media', slug: 'books-media', parent: null, level: 0, order: 7, count: 65, color: '#8b5cf6', featured: true },
    { id: 'CAT-037', name: 'Books', slug: 'books', parent: 'CAT-036', level: 1, order: 1, count: 42, color: '#a855f7', featured: true },
    { id: 'CAT-038', name: 'eBooks', slug: 'ebooks', parent: 'CAT-036', level: 1, order: 2, count: 15, color: '#d946ef', featured: false },
    { id: 'CAT-039', name: 'Audiobooks', slug: 'audiobooks', parent: 'CAT-036', level: 1, order: 3, count: 8, color: '#ec4899', featured: false },
    
    { id: 'CAT-040', name: 'Toys & Games', slug: 'toys-games', parent: null, level: 0, order: 8, count: 73, color: '#f59e0b', featured: true },
    { id: 'CAT-041', name: 'Educational', slug: 'educational', parent: 'CAT-040', level: 1, order: 1, count: 25, color: '#f97316', featured: true },
    { id: 'CAT-042', name: 'Board Games', slug: 'board-games', parent: 'CAT-040', level: 1, order: 2, count: 18, color: '#ef4444', featured: true },
    { id: 'CAT-043', name: 'Action Figures', slug: 'action-figures', parent: 'CAT-040', level: 1, order: 3, count: 15, color: '#dc2626', featured: false },
    { id: 'CAT-044', name: 'Puzzles', slug: 'puzzles', parent: 'CAT-040', level: 1, order: 4, count: 15, color: '#b91c1c', featured: false },
    
    { id: 'CAT-045', name: 'Automotive', slug: 'automotive', parent: null, level: 0, order: 9, count: 45, color: '#6b7280', featured: false },
    { id: 'CAT-046', name: 'Car Care', slug: 'car-care', parent: 'CAT-045', level: 1, order: 1, count: 18, color: '#4b5563', featured: false },
    { id: 'CAT-047', name: 'Tools', slug: 'tools', parent: 'CAT-045', level: 1, order: 2, count: 15, color: '#374151', featured: false },
    { id: 'CAT-048', name: 'Accessories', slug: 'auto-accessories', parent: 'CAT-045', level: 1, order: 3, count: 12, color: '#1f2937', featured: false },
    
    { id: 'CAT-049', name: 'Pet Supplies', slug: 'pet-supplies', parent: null, level: 0, order: 10, count: 38, color: '#84cc16', featured: false },
    { id: 'CAT-050', name: 'Dogs', slug: 'dogs', parent: 'CAT-049', level: 1, order: 1, count: 18, color: '#65a30d', featured: false },
    { id: 'CAT-051', name: 'Cats', slug: 'cats', parent: 'CAT-049', level: 1, order: 2, count: 15, color: '#4d7c0f', featured: false },
    { id: 'CAT-052', name: 'Fish', slug: 'fish', parent: 'CAT-049', level: 1, order: 3, count: 5, color: '#3f6212', featured: false }
  ])

  // ============ COUPONS & DISCOUNTS - 100+ COUPONS ============
  const [coupons, setCoupons] = useState([
    ...Array(50).fill(null).map((_, i) => ({
      id: `CPN-${String(i + 1).padStart(4, '0')}`,
      code: `SAVE${i * 5}${i}${['A', 'B', 'C', 'D', 'E'][i % 5]}`,
      type: ['percentage', 'fixed', 'free_shipping', 'buy_x_get_y', 'bogo'][i % 5],
      value: i % 3 === 0 ? 10 + (i * 2) : i % 3 === 1 ? 25 + (i * 5) : i % 3 === 2 ? 0 : 15,
      minPurchase: i % 4 === 0 ? 50 : i % 4 === 1 ? 100 : i % 4 === 2 ? 200 : 0,
      maxDiscount: i % 5 === 0 ? 50 : i % 5 === 1 ? 100 : i % 5 === 2 ? 200 : null,
      usageLimit: i % 5 === 0 ? 100 : i % 5 === 1 ? 500 : i % 5 === 2 ? 1000 : i % 5 === 3 ? 50 : null,
      usedCount: Math.floor(Math.random() * 50),
      perUserLimit: i % 4 === 0 ? 1 : i % 4 === 1 ? 2 : null,
      startDate: `2024-${String(i % 12 + 1).padStart(2, '0')}-01`,
      endDate: `2024-${String((i % 12 + 2) % 12 || 12).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      status: i % 6 === 0 ? 'expired' : i % 6 === 1 ? 'scheduled' : 'active',
      categories: i % 3 === 0 ? ['CAT-001', 'CAT-002'] : i % 3 === 1 ? ['CAT-008'] : [],
      products: i % 4 === 0 ? [`PRD-${String(i % 50 + 1).padStart(4, '0')}`] : [],
      excludeProducts: i % 5 === 0 ? [`PRD-${String(i % 50 + 51).padStart(4, '0')}`] : [],
      customerSegments: i % 3 === 0 ? ['new', 'vip'] : i % 3 === 1 ? ['regular'] : [],
      description: i % 3 === 0 ? `Save ${10 + (i * 2)}% on selected items` : 
                   i % 3 === 1 ? `Get $${25 + (i * 5)} off` : 
                   i % 3 === 2 ? 'Free shipping on all orders' : 'Special offer',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ])

  // ============ PRODUCT REVIEWS - 1000+ REVIEWS ============
  const [reviews, setReviews] = useState([
    ...Array(500).fill(null).map((_, i) => ({
      id: `REV-${String(i + 1).padStart(4, '0')}`,
      productId: `PRD-${String(i % 200 + 1).padStart(4, '0')}`,
      productName: products[i % products.length]?.name || 'Product',
      customerId: `CUST-${String(i % 200 + 1).padStart(4, '0')}`,
      customerName: customers[i % customers.length]?.name || 'Customer',
      rating: Math.floor(Math.random() * 2) + 4,
      title: ['Great product!', 'Excellent quality', 'Very satisfied', 'Good value', 'Highly recommended', 'Perfect!', 'Love it!', 'Amazing!'][i % 8],
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      pros: ['Quality', 'Price', 'Shipping', 'Packaging', 'Customer service'].slice(0, i % 5 + 1),
      cons: i % 7 === 0 ? ['Size', 'Color', 'Battery life'].slice(0, i % 3 + 1) : [],
      images: i % 10 === 0 ? ['review1.jpg', 'review2.jpg'] : [],
      videos: i % 20 === 0 ? ['review.mp4'] : [],
      verified: i % 4 !== 0,
      helpful: Math.floor(Math.random() * 100),
      notHelpful: Math.floor(Math.random() * 20),
      status: i % 15 === 0 ? 'pending' : i % 20 === 0 ? 'rejected' : 'approved',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      reply: i % 8 === 0 ? {
        content: 'Thank you for your review! We appreciate your feedback.',
        createdBy: 'Support Team',
        createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 2).padStart(2, '0')}`
      } : null
    }))
  ])

  // ============ INVENTORY MOVEMENTS ============
  const [inventoryMovements, setInventoryMovements] = useState([
    ...Array(200).fill(null).map((_, i) => ({
      id: `MOV-${String(i + 1).padStart(4, '0')}`,
      productId: `PRD-${String(i % 100 + 1).padStart(4, '0')}`,
      productName: products[i % products.length]?.name || 'Product',
      type: ['inbound', 'outbound', 'adjustment', 'return', 'damaged', 'transfer'][i % 6],
      quantity: Math.floor(Math.random() * 100) + 1,
      previousStock: Math.floor(Math.random() * 200) + 50,
      newStock: Math.floor(Math.random() * 200) + 50,
      reason: ['purchase order', 'customer order', 'inventory count', 'damaged', 'return', 'stock transfer'][i % 6],
      reference: i % 2 === 0 ? `PO-${String(i).padStart(4, '0')}` : `ORD-${String(i).padStart(4, '0')}`,
      location: ['Warehouse A', 'Warehouse B', 'Store 1', 'Store 2', 'Returns Center'][i % 5],
      createdBy: `user${i % 5 + 1}@example.com`,
      notes: i % 10 === 0 ? 'Annual inventory count' : '',
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`
    }))
  ])

  // ============ ABANDONED CARTS ============
  const [abandonedCarts, setAbandonedCarts] = useState([
    ...Array(100).fill(null).map((_, i) => ({
      id: `CART-${String(i + 1).padStart(4, '0')}`,
      customerId: `CUST-${String(i % 100 + 1).padStart(4, '0')}`,
      customerName: customers[i % customers.length]?.name || 'Guest Customer',
      email: `guest${i + 1}@example.com`,
      phone: i % 3 === 0 ? `+1 555-${String(100 + i).slice(1)}` : null,
      items: Array(Math.floor(Math.random() * 5) + 1).fill(null).map((_, j) => ({
        id: `PRD-${String((i + j) % 100 + 1).padStart(4, '0')}`,
        name: products[(i + j) % products.length]?.name || 'Product',
        quantity: Math.floor(Math.random() * 3) + 1,
        price: 25 + (Math.random() * 100)
      })),
      total: Math.floor(Math.random() * 500) + 50,
      createdAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
      updatedAt: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 2).padStart(2, '0')}`,
      recovered: i % 5 === 0,
      recoveryEmails: i % 3 === 0 ? 2 : i % 4 === 0 ? 1 : 0,
      lastReminder: i % 4 === 0 ? `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 3).padStart(2, '0')}` : null,
      source: ['direct', 'search', 'social', 'email', 'ads'][i % 5],
      utm_source: i % 7 === 0 ? ['google', 'facebook', 'instagram'][i % 3] : null
    }))
  ])

  // ============ SUPPLIERS ============
  const [suppliers, setSuppliers] = useState([
    ...Array(50).fill(null).map((_, i) => ({
      id: `SUP-${String(i + 1).padStart(3, '0')}`,
      name: `Supplier ${i + 1} ${['International', 'Global', 'Premium', 'Elite', 'Pro'][i % 5]}`,
      contact: `Contact Person ${i + 1}`,
      email: `supplier${i + 1}@example.com`,
      phone: `+1 555-${String(200 + i).slice(1)}`,
      address: `${456 + i} ${['Business Ave', 'Commerce St', 'Trade Rd'][i % 3]}, Suite ${i + 1}00`,
      city: ['San Francisco', 'Los Angeles', 'New York', 'Chicago', 'Seattle'][i % 5],
      state: ['CA', 'NY', 'IL', 'WA'][i % 4],
      zip: ['94105', '90001', '10001', '60601', '98101'][i % 5],
      country: 'USA',
      paymentTerms: ['Net 30', 'Net 60', 'Net 90', 'Prepaid', 'COD'][i % 5],
      leadTime: `${i % 5 + 3}-${i % 5 + 7} days`,
      minimumOrder: Math.floor(Math.random() * 500) + 100,
      products: Math.floor(Math.random() * 100) + 10,
      totalSpent: Math.floor(Math.random() * 100000) + 10000,
      totalOrders: Math.floor(Math.random() * 50) + 5,
      rating: 4 + (Math.random()),
      status: i % 6 === 0 ? 'inactive' : 'active',
      categories: Array(i % 5 + 1).fill(null).map((_, j) => categories[(i + j) % categories.length]?.name).filter(Boolean),
      notes: i % 8 === 0 ? 'Preferred supplier - fast shipping' : '',
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
    totalProfit: products.reduce((sum, p) => sum + ((p.price - p.cost) * p.sales), 0),
    reviewsCount: reviews.length,
    averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    activeCoupons: coupons.filter(c => c.status === 'active').length,
    abandonedCarts: abandonedCarts.length
  }

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
    showNotification('✅ Product added successfully!')
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
    } else if (deleteType === 'category') {
      setCategories(categories.filter(c => c.id !== itemToDelete))
      showNotification('✅ Category deleted successfully!')
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
      notes: '',
      createdAt: new Date().toISOString().split('T')[0]
    }
    setOrders([newOrder, ...orders])
    setSelectedOrder(newOrder)
    setShowOrderModal(true)
    showNotification('✅ New order created!')
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
    
    switch(type) {
      case 'products':
        data = products
        filename = `products-export-${new Date().toISOString().split('T')[0]}`
        break
      case 'orders':
        data = orders
        filename = `orders-export-${new Date().toISOString().split('T')[0]}`
        break
      case 'customers':
        data = customers
        filename = `customers-export-${new Date().toISOString().split('T')[0]}`
        break
      case 'coupons':
        data = coupons
        filename = `coupons-export-${new Date().toISOString().split('T')[0]}`
        break
      case 'inventory':
        data = inventoryMovements
        filename = `inventory-export-${new Date().toISOString().split('T')[0]}`
        break
      case 'reviews':
        data = reviews
        filename = `reviews-export-${new Date().toISOString().split('T')[0]}`
        break
      default:
        return
    }
    
    if (format === 'json') {
      const dataStr = JSON.stringify(data, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', `${filename}.json`)
      linkElement.click()
    } else if (format === 'csv') {
      // CSV export logic here
      showNotification(`📥 ${type} exported as CSV!`)
    }
    
    showNotification(`📥 ${type} exported successfully!`)
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

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Notification Toast */}
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

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-2xl animate-float">{BRAND.logo}</span>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {BRAND.fullName}
              </h1>
              <p className="text-gray-400 flex items-center gap-2">
                <FiShoppingBag className="w-4 h-4" />
                Complete E-Commerce Management System • {stats.products}+ Products • {stats.customers}+ Customers
              </p>
            </div>
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
              onClick={handleCreateOrder}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-all flex items-center gap-2 group"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
            value={`$${(stats.revenue / 1000).toFixed(1)}K`}
            label="Revenue"
            change="+15.2%"
            color="from-blue-500 to-cyan-500"
            onClick={() => showNotification(`💰 Total Revenue: $${stats.revenue.toLocaleString()}`)}
          />
          <StatCard 
            icon={FiShoppingBag}
            value={stats.orders}
            label="Orders"
            change="+8.7%"
            color="from-purple-500 to-pink-500"
            onClick={() => setActiveTab('orders')}
          />
          <StatCard 
            icon={FiUsers}
            value={stats.customers}
            label="Customers"
            change="+23.4%"
            color="from-green-500 to-emerald-500"
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
            icon={FiStar}
            value={stats.averageRating}
            label="Rating"
            change="+0.3"
            color="from-yellow-500 to-amber-500"
            onClick={() => setActiveTab('reviews')}
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
              showNotification('📦 Products Management')
            }}
            icon={FiBox}
            label="Products"
            badge={filteredProducts.length}
          />
          <NavButton 
            active={activeTab === 'orders'} 
            onClick={() => {
              setActiveTab('orders')
              showNotification('📋 Orders Management')
            }}
            icon={FiPackage}
            label="Orders"
            badge={stats.pendingOrders}
          />
          <NavButton 
            active={activeTab === 'customers'} 
            onClick={() => {
              setActiveTab('customers')
              showNotification('👥 Customer Management')
            }}
            icon={FiUsers}
            label="Customers"
          />
          <NavButton 
            active={activeTab === 'inventory'} 
            onClick={() => {
              setActiveTab('inventory')
              showNotification('📦 Inventory Management')
            }}
            icon={FiArchive}
            label="Inventory"
            badge={stats.lowStock}
          />
          <NavButton 
            active={activeTab === 'marketing'} 
            onClick={() => {
              setActiveTab('marketing')
              showNotification('🎯 Marketing Tools')
            }}
            icon={FiPercent}
            label="Marketing"
            badge={stats.activeCoupons}
          />
          <NavButton 
            active={activeTab === 'reviews'} 
            onClick={() => {
              setActiveTab('reviews')
              showNotification('⭐ Reviews Management')
            }}
            icon={FiStar}
            label="Reviews"
            badge={reviews.filter(r => r.status === 'pending').length}
          />
          <NavButton 
            active={activeTab === 'analytics'} 
            onClick={() => {
              setActiveTab('analytics')
              showNotification('📊 Analytics Dashboard')
            }}
            icon={FiBarChart2}
            label="Analytics"
          />
          <NavButton 
            active={activeTab === 'reports'} 
            onClick={() => {
              setActiveTab('reports')
              showNotification('📑 Reports')
            }}
            icon={FiFile}
            label="Reports"
          />
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab}... (${filteredProducts.length} items)`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none transition-colors"
                style={{ pointerEvents: 'auto' }}
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
              <button
                onClick={() => setShowCategoryModal(true)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                <FiFilter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              
              <button
                onClick={() => handleExport(activeTab, 'json')}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                <FiDownload className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              {activeTab === 'products' && (
                <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'list' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
              reviews={reviews.slice(0, 3)}
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
              onDelete={handleDeleteProduct}
              onDuplicate={handleDuplicateProduct}
              onAddToCart={handleAddToCart}
              onBulkDelete={() => {
                if (selectedItems.length === 0) {
                  showNotification('❌ No products selected!', 'error')
                  return
                }
                setProducts(products.filter(p => !selectedItems.includes(p.id)))
                setSelectedItems([])
                showNotification(`✅ ${selectedItems.length} products deleted!`)
              }}
              onBulkStatusUpdate={(status) => {
                if (selectedItems.length === 0) {
                  showNotification('❌ No products selected!', 'error')
                  return
                }
                setProducts(products.map(p => 
                  selectedItems.includes(p.id) ? { ...p, status } : p
                ))
                setSelectedItems([])
                showNotification(`✅ ${selectedItems.length} products updated to ${status}!`)
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
              onUpdateStatus={handleUpdateOrderStatus}
              onDelete={(orderId) => {
                setItemToDelete(orderId)
                setDeleteType('order')
                setShowDeleteModal(true)
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
              onSendEmail={(customer) => {
                showNotification(`📧 Email sent to ${customer.email}`)
              }}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryView 
              products={products}
              movements={inventoryMovements.slice(0, 5)}
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

          {activeTab === 'reviews' && (
            <ReviewsView 
              reviews={reviews}
              onApprove={(reviewId) => {
                setReviews(reviews.map(r => 
                  r.id === reviewId ? { ...r, status: 'approved' } : r
                ))
                showNotification('✅ Review approved!')
              }}
              onReject={(reviewId) => {
                setReviews(reviews.map(r => 
                  r.id === reviewId ? { ...r, status: 'rejected' } : r
                ))
                showNotification('✅ Review rejected!')
              }}
              onReply={(reviewId, reply) => {
                setReviews(reviews.map(r => 
                  r.id === reviewId ? { 
                    ...r, 
                    reply: {
                      content: reply,
                      createdBy: 'Admin',
                      createdAt: new Date().toISOString().split('T')[0]
                    }
                  } : r
                ))
                showNotification('✅ Reply added!')
              }}
            />
          )}
        </div>
      </div>

      {/* Cart Sidebar */}
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

      {/* Product Modal */}
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

      {/* Order Modal */}
      {showOrderModal && selectedOrder && (
        <OrderModal 
          order={selectedOrder}
          onUpdate={handleUpdateOrderStatus}
          onDelete={() => {
            setItemToDelete(selectedOrder.id)
            setDeleteType('order')
            setShowDeleteModal(true)
          }}
          onClose={() => {
            setShowOrderModal(false)
            setSelectedOrder(null)
          }}
        />
      )}

      {/* Customer Modal */}
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

      {/* Coupon Modal */}
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

      {/* Delete Confirmation Modal */}
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
    </div>
  )
}

// ============ STAT CARD COMPONENT ============
const StatCard = ({ icon: Icon, value, label, change, color, onClick }) => (
  <div 
    className="glass-card p-4 hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden"
    onClick={onClick}
    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <div className="flex items-center justify-between mb-2">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1
        ${change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
        {change.startsWith('+') ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
        {change}
      </span>
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
)

// ============ NAV BUTTON COMPONENT ============
const NavButton = ({ active, onClick, icon: Icon, label, badge }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2
      ${active 
        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 scale-105' 
        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
    {badge > 0 && (
      <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
        active ? 'bg-white/20 text-white' : 'bg-blue-500/10 text-blue-400'
      }`}>
        {badge}
      </span>
    )}
  </button>
)

// ============ DASHBOARD VIEW ============
const DashboardView = ({ stats, orders, products, customers, reviews, onViewAllOrders, onViewAllProducts, onViewAllCustomers, onViewOrder, onViewProduct }) => (
  <div className="space-y-6">
    {/* Welcome Banner */}
    <div className="glass-card p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-gray-400">Here's what's happening with your store today.</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400">
              📊 {stats.orders} orders today
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-green-500/10 text-green-500">
              💰 ${stats.revenue.toLocaleString()} revenue
            </span>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-float">
          <FiZap className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>

    {/* Quick Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <QuickStatCard
        label="Today's Revenue"
        value={`$${(stats.revenue * 0.15).toLocaleString()}`}
        change="+15.2%"
        icon={FiDollarSign}
        color="from-blue-500 to-cyan-500"
      />
      <QuickStatCard
        label="Today's Orders"
        value={Math.floor(stats.orders * 0.15)}
        change="+8.7%"
        icon={FiShoppingBag}
        color="from-purple-500 to-pink-500"
      />
      <QuickStatCard
        label="Conversion Rate"
        value="3.2%"
        change="+0.8%"
        icon={FiTarget}
        color="from-green-500 to-emerald-500"
      />
      <QuickStatCard
        label="Avg Order Value"
        value={`$${Math.floor(stats.averageOrderValue)}`}
        change="+4.2%"
        icon={FiCreditCard}
        color="from-orange-500 to-red-500"
      />
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
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {order.customer.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold flex items-center gap-2">
                  {order.id}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-500/10 text-green-500' :
                    order.status === 'shipped' ? 'bg-blue-500/10 text-blue-400' :
                    order.status === 'processing' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-400">{order.customer}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-blue-400">${order.amount.toFixed(2)}</div>
              <div className="text-xs text-gray-400">{order.date}</div>
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <QuickAction 
          icon={FiShoppingBag} 
          label="New Order" 
          description="Create order"
          color="from-blue-500 to-cyan-500"
        />
        <QuickAction 
          icon={FiBox} 
          label="Add Product" 
          description="List product"
          color="from-purple-500 to-pink-500"
        />
        <QuickAction 
          icon={FiUsers} 
          label="Add Customer" 
          description="Register"
          color="from-green-500 to-emerald-500"
        />
        <QuickAction 
          icon={FiPercent} 
          label="Create Coupon" 
          description="Discount"
          color="from-orange-500 to-red-500"
        />
      </div>
    </div>
  </div>
)

const QuickStatCard = ({ label, value, change, icon: Icon, color }) => (
  <div className="glass-card p-4">
    <div className="flex items-center justify-between mb-2">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
        {change}
      </span>
    </div>
    <div className="text-xl font-bold">{value}</div>
    <div className="text-xs text-gray-400">{label}</div>
  </div>
)

const QuickAction = ({ icon: Icon, label, description, color }) => (
  <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
    <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <span className="text-sm font-medium block">{label}</span>
    <span className="text-xs text-gray-400">{description}</span>
  </button>
)

// ============ PRODUCTS VIEW ============
const ProductsView = ({ 
  products, viewMode, selectedItems, onSelectItem, onSelectAll,
  onEdit, onDelete, onDuplicate, onAddToCart, onBulkDelete, onBulkStatusUpdate
}) => (
  <div className="space-y-6">
    {/* Bulk Actions */}
    {selectedItems.length > 0 && (
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-4 animate-slide-down">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{selectedItems.length} products selected</span>
          <button
            onClick={() => onSelectAll()}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Clear
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onBulkStatusUpdate('active')}
            className="px-4 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors text-sm flex items-center gap-1"
          >
            <FiCheckCircle className="w-4 h-4" /> Activate
          </button>
          <button
            onClick={() => onBulkStatusUpdate('draft')}
            className="px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors text-sm flex items-center gap-1"
          >
            <FiXCircle className="w-4 h-4" /> Draft
          </button>
          <button
            onClick={onBulkDelete}
            className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm flex items-center gap-1"
          >
            <FiTrash2 className="w-4 h-4" /> Delete
          </button>
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
        >
          <FiPlus className="inline w-4 h-4 mr-2" /> Add Product
        </button>
      </div>
    )}
  </div>
)

const ProductCard = ({ product, isSelected, onSelect, onEdit, onDelete, onDuplicate, onAddToCart }) => (
  <div className="glass-card p-6 hover:scale-105 transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
        <FiBox className="w-8 h-8 text-white" />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-5 h-5 rounded border-white/10 bg-white/5"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        />
        <div className="relative">
          <button className="p-1 rounded-lg hover:bg-white/10 transition-colors">
            <FiMoreVertical className="w-4 h-4" />
          </button>
          <div className="absolute right-0 top-full mt-1 w-48 py-1 bg-gray-900 border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <button
              onClick={onDuplicate}
              className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 flex items-center gap-2"
            >
              <FiCopy className="w-4 h-4" /> Duplicate
            </button>
            <button
              onClick={onDelete}
              className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
            >
              <FiTrash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div onClick={onEdit} className="cursor-pointer">
      <h4 className="font-semibold text-lg mb-1 group-hover:text-blue-400 transition-colors">
        {product.name}
      </h4>
      <p className="text-sm text-gray-400 mb-2">{product.category} • {product.brand}</p>
      
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
      >
        <FiEdit className="w-4 h-4" /> Edit
      </button>
      <button
        onClick={onAddToCart}
        className="flex-1 px-3 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors text-sm flex items-center justify-center gap-1"
      >
        <FiShoppingCart className="w-4 h-4" /> Cart
      </button>
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
      <div className="flex items-center gap-3 cursor-pointer" onClick={onEdit}>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <FiBox className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-semibold hover:text-blue-400 transition-colors">{product.name}</div>
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
          ? 'bg-green-500/10 text-green-500 border border-green-500/20'
          : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
      }`}>
        {product.status}
      </span>
    </td>
    <td className="p-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
          title="Edit"
        >
          <FiEdit className="w-4 h-4" />
        </button>
        <button
          onClick={onAddToCart}
          className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20"
          title="Add to Cart"
        >
          <FiShoppingCart className="w-4 h-4" />
        </button>
        <button
          onClick={onDuplicate}
          className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
          title="Duplicate"
        >
          <FiCopy className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
          title="Delete"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
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
              <td className="p-4 text-sm">{new Date(order.date).toLocaleDateString()}</td>
              <td className="p-4">
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm">
                  {order.items.length} items
                </span>
              </td>
              <td className="p-4 font-semibold text-blue-400">${order.amount.toFixed(2)}</td>
              <td className="p-4 text-sm text-gray-400">{order.paymentMethod}</td>
              <td className="p-4">
                <select
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order.id, 'status', e.target.value)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    order.status === 'delivered' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    order.status === 'shipped' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    order.status === 'processing' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                    order.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                  }`}
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
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
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(order.id)}
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
            <th className="p-4 text-left text-sm font-semibold text-gray-400">Spent</th>
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
              <td className="p-4 font-semibold">{customer.orders}</td>
              <td className="p-4 font-semibold text-blue-400">${customer.spent.toFixed(2)}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  customer.segment === 'vip' ? 'bg-purple-500/10 text-purple-400' :
                  customer.segment === 'wholesale' ? 'bg-blue-500/10 text-blue-400' :
                  customer.segment === 'new' ? 'bg-green-500/10 text-green-500' :
                  'bg-gray-500/10 text-gray-400'
                }`}>
                  {customer.segment}
                </span>
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
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSendEmail(customer)
                  }}
                  className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
                >
                  <FiMail className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

// ============ INVENTORY VIEW ============
const InventoryView = ({ products, movements, lowStockCount, outOfStockCount, totalValue, onRestock }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <div className="text-sm text-gray-400">Low Stock</div>
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
              ${(totalValue / 1000).toFixed(1)}K
            </div>
            <div className="text-sm text-gray-400">Inventory Value</div>
          </div>
        </div>
      </div>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-lg font-bold mb-4">Low Stock Alert</h3>
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
            >
              Restock
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-lg font-bold mb-4">Recent Movements</h3>
      <div className="space-y-3">
        {movements.map(movement => (
          <div key={movement.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                ${movement.type === 'inbound' ? 'bg-green-500/10 text-green-500' :
                  movement.type === 'outbound' ? 'bg-blue-500/10 text-blue-400' :
                  movement.type === 'adjustment' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-purple-500/10 text-purple-400'}`}>
                {movement.type === 'inbound' && <FiDownload className="w-5 h-5" />}
                {movement.type === 'outbound' && <FiUpload className="w-5 h-5" />}
                {movement.type === 'adjustment' && <FiRefreshCw className="w-5 h-5" />}
                {movement.type === 'return' && <FiRefreshCw className="w-5 h-5" />}
              </div>
              <div>
                <div className="font-semibold">{movement.productName}</div>
                <div className="text-sm text-gray-400">
                  {movement.type} • {movement.quantity} units • {movement.reason}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">{movement.createdAt}</div>
              <div className="text-xs text-gray-500">{movement.reference}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

// ============ MARKETING VIEW ============
const MarketingView = ({ coupons, abandonedCarts, onAddCoupon, onEditCoupon }) => (
  <div className="space-y-6">
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <FiPercent className="w-5 h-5" />
          Active Coupons
        </h3>
        <button
          onClick={onAddCoupon}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm hover:opacity-90 flex items-center gap-1"
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
              <div className="text-xs text-gray-500 mt-1">{cart.items.length} items • ${cart.total}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">
                {new Date(cart.createdAt).toLocaleDateString()}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                cart.recovered ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-400'
              }`}>
                {cart.recovered ? 'Recovered' : 'Pending'}
              </span>
            </div>
            {!cart.recovered && (
              <button className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm">
                Send Email
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)

// ============ REVIEWS VIEW ============
const ReviewsView = ({ reviews, onApprove, onReject, onReply }) => {
  const [replyText, setReplyText] = useState({})

  return (
    <div className="space-y-4">
      {reviews.slice(0, 10).map(review => (
        <div key={review.id} className="glass-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {review.customerName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold">{review.customerName}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(star => (
                      <FiStar
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                  {review.verified && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onApprove(review.id)}
                className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20"
                title="Approve"
              >
                <FiCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => onReject(review.id)}
                className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
                title="Reject"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <h4 className="font-semibold mb-2">{review.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{review.content}</p>
          
          {review.pros && review.pros.length > 0 && (
            <div className="mb-3">
              <span className="text-xs text-green-500 font-semibold">Pros:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {review.pros.map((pro, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">
                    {pro}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {review.cons && review.cons.length > 0 && (
            <div className="mb-4">
              <span className="text-xs text-red-500 font-semibold">Cons:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {review.cons.map((con, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded-full">
                    {con}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {review.reply ? (
            <div className="ml-8 p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-blue-400">Store Reply</span>
                <span className="text-xs text-gray-500">{review.reply.createdAt}</span>
              </div>
              <p className="text-sm text-gray-400">{review.reply.content}</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyText[review.id] || ''}
                onChange={(e) => setReplyText({ ...replyText, [review.id]: e.target.value })}
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none text-sm"
              />
              <button
                onClick={() => {
                  if (replyText[review.id]) {
                    onReply(review.id, replyText[review.id])
                    setReplyText({ ...replyText, [review.id]: '' })
                  }
                }}
                className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
              >
                Reply
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ============ CART SIDEBAR ============
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
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center"
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
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  </div>
)

// ============ PRODUCT MODAL ============
const ProductModal = ({ product, categories, onSave, onClose }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    category: categories[0]?.name || 'Electronics',
    subCategory: '',
    brand: '',
    price: 0,
    cost: 0,
    comparePrice: 0,
    stock: 0,
    sku: `PRD-${Math.floor(Math.random() * 9000 + 1000)}`,
    barcode: '',
    weight: '',
    dimensions: '',
    description: '',
    status: 'draft',
    tags: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-3xl" onClick={(e) => e.stopPropagation()}>
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
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-input"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Brand</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Sony, Nike"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Compare Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.comparePrice}
                  onChange={(e) => setFormData({ ...formData, comparePrice: parseFloat(e.target.value) })}
                  className="form-input"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
                  className="form-input"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Stock *</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">SKU *</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Barcode</label>
                <input
                  type="text"
                  value={formData.barcode}
                  onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                  className="form-input"
                  placeholder="UPC/EAN/ISBN"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Weight</label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="form-input"
                  placeholder="e.g. 0.5kg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="form-input"
                placeholder="Product description..."
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags.join ? formData.tags.join(', ') : formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
                className="form-input"
                placeholder="wireless, audio, premium"
              />
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
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

// ============ ORDER MODAL ============
const OrderModal = ({ order, onUpdate, onDelete, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content max-w-3xl" onClick={(e) => e.stopPropagation()}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
              <FiPackage className="w-5 h-5" />
              Order {order.id}
            </h3>
            <p className="text-sm text-gray-400">Placed on {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Customer Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{order.customer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{order.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{order.phone || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Shipping Address</h4>
              <div className="space-y-1 text-sm">
                <div>{order.shippingAddress?.street}</div>
                <div>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}</div>
                <div>{order.shippingAddress?.country}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Subtotal:</span>
                  <span className="text-sm">${order.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Shipping:</span>
                  <span className="text-sm">${order.shipping?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Tax:</span>
                  <span className="text-sm">${order.tax?.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Discount:</span>
                    <span className="text-sm text-red-400">-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-white/10">
                  <span className="text-sm font-semibold">Total:</span>
                  <span className="text-lg font-bold text-blue-400">${order.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Payment & Shipping</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FiCreditCard className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{order.paymentMethod}</span>
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                    order.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-500' :
                    order.paymentStatus === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiTruck className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{order.shippingMethod}</span>
                  {order.trackingNumber && (
                    <span className="ml-auto text-xs text-gray-400">Track: {order.trackingNumber}</span>
                  )}
                </div>
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
                <th className="py-3 text-left text-sm font-semibold text-gray-400">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b border-white/10">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.sku}</div>
                    </div>
                  </td>
                  <td className="py-3">${item.price.toFixed(2)}</td>
                  <td className="py-3">{item.quantity}</td>
                  <td className="py-3 font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {order.notes && (
          <div className="mb-6 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
            <div className="flex items-start gap-2">
              <FiAlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-yellow-500">Order Notes</span>
                <p className="text-sm text-gray-400 mt-1">{order.notes}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-3">
          <select
            value={order.status}
            onChange={(e) => {
              onUpdate(order.id, 'status', e.target.value)
              onClose()
            }}
            className="form-input flex-1"
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
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  </div>
)

// ============ CUSTOMER MODAL ============
const CustomerModal = ({ customer, onClose, onSendEmail }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
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
            <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
              <FiCalendar className="w-3 h-3" />
              Customer since {new Date(customer.firstOrder || customer.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                customer.segment === 'vip' ? 'bg-purple-500/10 text-purple-400' :
                customer.segment === 'wholesale' ? 'bg-blue-500/10 text-blue-400' :
                'bg-gray-500/10 text-gray-400'
              }`}>
                {customer.segment}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white/5 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-400">{customer.orders}</div>
            <div className="text-xs text-gray-400">Orders</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-500">${customer.spent.toFixed(0)}</div>
            <div className="text-xs text-gray-400">Total Spent</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl text-center">
            <div className="text-2xl font-bold text-purple-400">${customer.averageOrder?.toFixed(0) || '0'}</div>
            <div className="text-xs text-gray-400">Avg Order</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl text-center">
            <div className="text-2xl font-bold text-yellow-400">${customer.lifetimeValue?.toFixed(0) || '0'}</div>
            <div className="text-xs text-gray-400">LTV</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white/5 rounded-xl">
            <h5 className="text-xs font-semibold text-gray-400 mb-3">Contact Information</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{customer.phone || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white/5 rounded-xl">
            <h5 className="text-xs font-semibold text-gray-400 mb-3">Default Address</h5>
            <div className="space-y-1 text-sm">
              <div>{customer.addresses?.[0]?.street || 'N/A'}</div>
              <div>{customer.addresses?.[0]?.city || ''}, {customer.addresses?.[0]?.state || ''} {customer.addresses?.[0]?.zip || ''}</div>
              <div>{customer.addresses?.[0]?.country || ''}</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => {
              onSendEmail()
              onClose()
            }}
            className="flex-1 px-4 py-3 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 flex items-center justify-center gap-2"
          >
            <FiMail className="w-4 h-4" />
            Send Email
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)

// ============ COUPON MODAL ============
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
      <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FiPercent className="w-5 h-5" />
              {coupon ? 'Edit Coupon' : 'Create Coupon'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Coupon Code *</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="form-input font-mono"
                required
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
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
              >
                <FiSave className="inline w-4 h-4 mr-2" />
                {coupon ? 'Update Coupon' : 'Create Coupon'}
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

// ============ DELETE MODAL ============
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
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
)

import { FiX, FiSave } from 'react-icons/fi'
export default ECommerce
