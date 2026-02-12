import React, { useState, useEffect, useRef } from 'react'
import {
  FiMenu, FiSearch, FiBell, FiSun, FiMoon, FiUser,
  FiSettings, FiLogOut, FiHelpCircle, FiMail, FiCalendar,
  FiMessageCircle, FiShoppingBag, FiDollarSign, FiUsers,
  FiBox, FiStar, FiChevronDown, FiCreditCard, FiTruck,
  FiCheckCircle, FiXCircle, FiClock, FiMoreVertical,
  FiDownload, FiUpload, FiRefreshCw, FiFilter, FiGrid,
  FiList, FiMaximize, FiMinimize, FiBookmark, FiHeart,
  FiAward, FiTrendingUp, FiTrendingDown, FiAlertCircle,
  FiFile, FiPrinter, FiShare2, FiLink, FiSliders
} from 'react-icons/fi'

const Header = ({ 
  sidebarCollapsed, 
  onToggleSidebar, 
  onToggleTheme, 
  theme, 
  isMobile,
  onSearch,
  onNotification,
  onProfile,
  onSettings,
  onLogout,
  userName = 'Admin User',
  userRole = 'Super Administrator',
  unreadNotifications = 7,
  unreadMessages = 3,
  pendingOrders = 12,
  lowStockItems = 5
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  
  const searchRef = useRef(null)
  const notificationsRef = useRef(null)
  const userMenuRef = useRef(null)
  const quickActionsRef = useRef(null)

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false)
      }
      if (quickActionsRef.current && !quickActionsRef.current.contains(e.target)) {
        setShowQuickActions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K - Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        document.getElementById('global-search')?.focus()
      }
      // Esc - Close dropdowns
      if (e.key === 'Escape') {
        setShowSearchResults(false)
        setShowNotifications(false)
        setShowUserMenu(false)
        setShowQuickActions(false)
      }
      // F11 - Toggle fullscreen (prevent default browser behavior)
      if (e.key === 'F11') {
        e.preventDefault()
        toggleFullscreen()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setFullscreen(false)
      }
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
    setShowSearchResults(true)
  }

  const searchResults = [
    { type: 'order', id: 'ORD-7842', label: 'Order #7842', value: 'John Smith', icon: FiShoppingBag },
    { type: 'product', id: 'PRD-001', label: 'Premium Headphones', value: 'In stock: 45', icon: FiBox },
    { type: 'customer', id: 'CUST-001', label: 'Sarah Johnson', value: 'sarah@example.com', icon: FiUsers },
    { type: 'invoice', id: 'INV-001', label: 'Invoice #2024-001', value: '$1,248.00', icon: FiDollarSign },
    { type: 'support', id: 'TKT-001', label: 'Support Ticket #1234', value: 'Pending response', icon: FiHelpCircle },
  ]

  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #ORD-7842 from John Smith - $1,248.00',
      time: '2 minutes ago',
      read: false,
      icon: FiShoppingBag,
      color: 'blue'
    },
    {
      id: 2,
      type: 'inventory',
      title: 'Low Stock Alert',
      message: 'Premium Headphones - Only 5 units left',
      time: '15 minutes ago',
      read: false,
      icon: FiBox,
      color: 'orange'
    },
    {
      id: 3,
      type: 'customer',
      title: 'New Customer Registered',
      message: 'Emma Wilson just created an account',
      time: '1 hour ago',
      read: true,
      icon: FiUsers,
      color: 'green'
    },
    {
      id: 4,
      type: 'review',
      title: 'New 5-Star Review',
      message: 'Michael Brown left a review for Yoga Mat Premium',
      time: '3 hours ago',
      read: true,
      icon: FiStar,
      color: 'yellow'
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of $845.50 from Sarah Johnson',
      time: '5 hours ago',
      read: true,
      icon: FiCreditCard,
      color: 'purple'
    },
    {
      id: 6,
      type: 'shipping',
      title: 'Order Shipped',
      message: 'Order #ORD-7840 has been shipped via UPS',
      time: 'Yesterday',
      read: true,
      icon: FiTruck,
      color: 'indigo'
    }
  ]

  const unreadNotificationsList = notifications.filter(n => !n.read)

  const quickActions = [
    { label: 'New Order', icon: FiShoppingBag, shortcut: 'Ctrl+N', color: 'blue', action: () => console.log('New Order') },
    { label: 'Add Product', icon: FiBox, shortcut: 'Ctrl+P', color: 'purple', action: () => console.log('Add Product') },
    { label: 'Create Invoice', icon: FiFile, shortcut: 'Ctrl+I', color: 'green', action: () => console.log('Create Invoice') },
    { label: 'Send Email', icon: FiMail, shortcut: 'Ctrl+E', color: 'orange', action: () => console.log('Send Email') },
    { label: 'Export Report', icon: FiDownload, shortcut: 'Ctrl+R', color: 'pink', action: () => console.log('Export Report') },
    { label: 'Print', icon: FiPrinter, shortcut: 'Ctrl+Shift+P', color: 'indigo', action: () => console.log('Print') },
  ]

  const getNotificationColor = (color) => {
    const colors = {
      blue: 'bg-blue-500/10 text-blue-400',
      orange: 'bg-orange-500/10 text-orange-400',
      green: 'bg-green-500/10 text-green-500',
      yellow: 'bg-yellow-500/10 text-yellow-400',
      purple: 'bg-purple-500/10 text-purple-400',
      indigo: 'bg-indigo-500/10 text-indigo-400',
      red: 'bg-red-500/10 text-red-500',
    }
    return colors[color] || 'bg-white/10 text-gray-400'
  }

  return (
    <header className="sticky top-0 z-40 glass-sidebar border-b border-white/10">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <FiMenu className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Toggle sidebar
            </span>
          </button>

          {/* Search Bar - Desktop */}
          {!isMobile && (
            <div className="relative w-96" ref={searchRef}>
              <form onSubmit={handleSearch}>
                <div className="relative group">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    id="global-search"
                    type="text"
                    placeholder="Search orders, products, customers... (Ctrl+K)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSearchResults(true)}
                    className="w-full pl-12 pr-12 py-2.5 rounded-xl bg-white/5 border border-white/10 
                      focus:border-blue-500/50 focus:outline-none focus:bg-white/10 transition-all text-sm"
                    style={{ pointerEvents: 'auto' }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>

              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden animate-slide-down">
                  <div className="p-2 border-b border-white/10 bg-white/5">
                    <div className="text-xs text-gray-400">
                      Search results for "{searchQuery}"
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto p-2">
                    {searchResults.map((result, idx) => {
                      const Icon = result.icon
                      return (
                        <button
                          key={idx}
                          className="w-full p-3 rounded-lg hover:bg-white/5 flex items-center gap-3 transition-colors group"
                          onClick={() => {
                            console.log('Navigate to:', result.id)
                            setShowSearchResults(false)
                            setSearchQuery('')
                          }}
                        >
                          <div className={`w-8 h-8 rounded-lg ${getNotificationColor('blue')} flex items-center justify-center`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium group-hover:text-blue-400 transition-colors">
                              {result.label}
                            </div>
                            <div className="text-xs text-gray-400">{result.value}</div>
                          </div>
                          <span className="text-[10px] text-gray-500 uppercase">{result.type}</span>
                        </button>
                      )
                    })}
                  </div>
                  <div className="p-2 border-t border-white/10 bg-white/5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↵</kbd> to search all</span>
                      <span className="text-gray-400"><kbd className="px-1.5 py-0.5 bg-white/10 rounded">ESC</kbd> to close</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Stats - Desktop */}
          {!isMobile && (
            <div className="flex items-center gap-4 mr-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                <FiTrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">+15.2%</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                <FiDollarSign className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">$124.8k</span>
              </div>
            </div>
          )}

          {/* Quick Actions Dropdown */}
          <div className="relative" ref={quickActionsRef}>
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              <FiSliders className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Quick actions
              </span>
            </button>

            {showQuickActions && (
              <div className="absolute top-full right-0 mt-2 w-72 glass-card overflow-hidden animate-slide-down">
                <div className="p-3 border-b border-white/10">
                  <span className="text-sm font-semibold">Quick Actions</span>
                </div>
                <div className="p-2 grid grid-cols-2 gap-1">
                  {quickActions.map((action, idx) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          action.action()
                          setShowQuickActions(false)
                        }}
                        className="p-3 rounded-lg hover:bg-white/5 flex flex-col items-center gap-2 transition-colors group"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-${action.color}-500/10 text-${action.color}-400 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium">{action.label}</span>
                        <span className="text-[10px] text-gray-500">{action.shortcut}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              <FiBell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifications}
                </span>
              )}
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Notifications
              </span>
            </button>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-96 glass-card overflow-hidden animate-slide-down">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold">Notifications</span>
                    {unreadNotificationsList.length > 0 && (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">
                        {unreadNotificationsList.length} new
                      </span>
                    )}
                  </div>
                  <button 
                    className="text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => onNotification?.('markAllRead')}
                  >
                    Mark all as read
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => {
                    const Icon = notification.icon
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer
                          ${!notification.read ? 'bg-blue-500/5' : ''}`}
                        onClick={() => {
                          onNotification?.(notification)
                          setShowNotifications(false)
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg ${getNotificationColor(notification.color)} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{notification.title}</span>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mb-1">{notification.message}</p>
                            <span className="text-[10px] text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="p-3 border-t border-white/10">
                  <button 
                    className="w-full text-center text-xs text-gray-400 hover:text-white"
                    onClick={() => {
                      onNotification?.('viewAll')
                      setShowNotifications(false)
                    }}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="relative">
            <button
              className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              onClick={() => onNavigate?.('chat')}
            >
              <FiMessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {unreadMessages}
                </span>
              )}
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Messages
              </span>
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            {theme === 'dark' ? (
              <FiSun className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            ) : (
              <FiMoon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </span>
          </button>

          {/* Fullscreen Toggle - Desktop */}
          {!isMobile && (
            <button
              onClick={toggleFullscreen}
              className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              {fullscreen ? (
                <FiMinimize className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <FiMaximize className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              </span>
            </button>
          )}

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/5 transition-all group"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AU</span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-dark-bg"></div>
              </div>
              {!isMobile && (
                <div className="hidden lg:block text-left">
                  <div className="text-sm font-medium">{userName}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <FiShield className="w-3 h-3" />
                    {userRole}
                  </div>
                </div>
              )}
              <FiChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors hidden lg:block" />
            </button>

            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-64 glass-card overflow-hidden animate-slide-down">
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold">AU</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{userName}</div>
                      <div className="text-xs text-gray-400">{userRole}</div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      onProfile?.()
                      setShowUserMenu(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <FiUser className="w-4 h-4 text-gray-400" />
                    <span>Your Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      onSettings?.()
                      setShowUserMenu(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <FiSettings className="w-4 h-4 text-gray-400" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      console.log('Activity log')
                      setShowUserMenu(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <FiClock className="w-4 h-4 text-gray-400" />
                    <span>Activity Log</span>
                  </button>
                  <div className="border-t border-white/10 my-2"></div>
                  <button
                    onClick={() => {
                      onHelp?.()
                      setShowUserMenu(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <FiHelpCircle className="w-4 h-4 text-gray-400" />
                    <span>Help Center</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout?.()
                      setShowUserMenu(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-red-500/10 rounded-lg flex items-center gap-3 text-red-400 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobile && (
        <div className="px-4 pb-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none text-sm"
              style={{ pointerEvents: 'auto' }}
            />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
