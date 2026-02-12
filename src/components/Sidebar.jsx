import React, { useState, useEffect } from 'react'
import { 
  FiHome, FiUsers, FiBarChart2, FiShoppingBag, FiSettings, 
  FiCalendar, FiMessageCircle, FiMail, FiUser, FiFileText,
  FiChevronLeft, FiChevronRight, FiBox, FiPackage, FiCreditCard,
  FiTruck, FiAward, FiStar, FiHeart, FiTrendingUp, FiTrendingDown,
  FiHelpCircle, FiLogOut, FiShield, FiDatabase, FiCloud,
  FiMonitor, FiSmartphone, FiGlobe, FiClock, FiBell, FiSearch,
  FiDollarSign, FiPercent, FiTag, FiGift, FiCamera, FiVideo,
  FiHeadphones, FiSpeaker, FiPrinter, FiCoffee, FiWatch,
  FiSun, FiMoon, FiDownload, FiUpload, FiRefreshCw, FiFilter,
  FiGrid, FiList, FiArchive, FiTrash2, FiEdit, FiCopy,
  FiPlus, FiMinus, FiCheck, FiX, FiAlertCircle, FiInfo
} from 'react-icons/fi'

const Sidebar = ({ collapsed, currentPage, onNavigate, onToggle, isMobile, theme, onThemeToggle }) => {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(['dashboard', 'ecommerce', 'orders'])

  // Complete menu structure with categories
  const menuStructure = [
    {
      category: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: FiHome, badge: null, badgeColor: null, permission: 'all' },
        { id: 'ecommerce', label: 'E-Commerce', icon: FiShoppingBag, badge: 'New', badgeColor: 'blue', permission: 'all' },
        { id: 'analytics', label: 'Analytics', icon: FiBarChart2, badge: '24', badgeColor: 'purple', permission: 'admin' },
      ]
    },
    {
      category: 'Management',
      items: [
        { id: 'products', label: 'Products', icon: FiBox, badge: '156', badgeColor: 'green', permission: 'all' },
        { id: 'orders', label: 'Orders', icon: FiPackage, badge: '12', badgeColor: 'orange', permission: 'all' },
        { id: 'customers', label: 'Customers', icon: FiUsers, badge: '892', badgeColor: 'blue', permission: 'all' },
        { id: 'inventory', label: 'Inventory', icon: FiArchive, badge: '3 low', badgeColor: 'red', permission: 'manager' },
        { id: 'suppliers', label: 'Suppliers', icon: FiTruck, badge: null, badgeColor: null, permission: 'admin' },
      ]
    },
    {
      category: 'Sales & Marketing',
      items: [
        { id: 'coupons', label: 'Coupons', icon: FiPercent, badge: '5 active', badgeColor: 'pink', permission: 'marketing' },
        { id: 'reviews', label: 'Reviews', icon: FiStar, badge: '23', badgeColor: 'yellow', permission: 'all' },
        { id: 'abandoned', label: 'Abandoned Carts', icon: FiShoppingBag, badge: '8', badgeColor: 'red', permission: 'marketing' },
        { id: 'campaigns', label: 'Campaigns', icon: FiTrendingUp, badge: '2', badgeColor: 'purple', permission: 'marketing' },
      ]
    },
    {
      category: 'Finance',
      items: [
        { id: 'invoices', label: 'Invoices', icon: FiFileText, badge: '4 unpaid', badgeColor: 'orange', permission: 'admin' },
        { id: 'payments', label: 'Payments', icon: FiCreditCard, badge: null, badgeColor: null, permission: 'admin' },
        { id: 'reports', label: 'Reports', icon: FiBarChart2, badge: null, badgeColor: null, permission: 'admin' },
        { id: 'taxes', label: 'Taxes', icon: FiDollarSign, badge: 'Due', badgeColor: 'red', permission: 'admin' },
      ]
    },
    {
      category: 'Communication',
      items: [
        { id: 'chat', label: 'Chat', icon: FiMessageCircle, badge: '3', badgeColor: 'blue', permission: 'all' },
        { id: 'email', label: 'Email', icon: FiMail, badge: '12', badgeColor: 'purple', permission: 'all' },
        { id: 'calendar', label: 'Calendar', icon: FiCalendar, badge: '5', badgeColor: 'green', permission: 'all' },
        { id: 'notifications', label: 'Notifications', icon: FiBell, badge: '7', badgeColor: 'red', permission: 'all' },
      ]
    },
    {
      category: 'System',
      items: [
        { id: 'profile', label: 'Profile', icon: FiUser, badge: null, badgeColor: null, permission: 'all' },
        { id: 'settings', label: 'Settings', icon: FiSettings, badge: null, badgeColor: null, permission: 'admin' },
        { id: 'security', label: 'Security', icon: FiShield, badge: null, badgeColor: null, permission: 'admin' },
        { id: 'help', label: 'Help Center', icon: FiHelpCircle, badge: null, badgeColor: null, permission: 'all' },
      ]
    }
  ]

  // Flatten items for search
  const allItems = menuStructure.flatMap(category => category.items)
  
  const filteredItems = searchQuery
    ? allItems.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const handleNavigation = (e, pageId) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('🔵 Navigating to:', pageId)
    onNavigate(pageId)
    if (isMobile) {
      onToggle()
    }
  }

  const toggleFavorite = (e, itemId) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getBadgeColor = (color) => {
    const colors = {
      blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      green: 'bg-green-500/10 text-green-500 border-green-500/20',
      red: 'bg-red-500/10 text-red-500 border-red-500/20',
      orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      pink: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    }
    return colors[color] || 'bg-white/10 text-gray-400 border-white/20'
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          style={{ pointerEvents: 'auto' }}
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full glass-sidebar z-50 flex flex-col
          transition-all duration-500 ease-out-expo
          ${collapsed ? 'w-20' : 'w-80'}
          ${isMobile && collapsed ? '-translate-x-full' : 'translate-x-0'}`}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Logo Section */}
        <div className={`flex items-center h-20 px-4 border-b border-white/10
          ${collapsed ? 'justify-center' : 'justify-between'}`}>
          
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl animate-float">Q</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-bg animate-pulse"></div>
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  QuantumDash
                </span>
                <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Enterprise v2.0</span>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-bg"></div>
            </div>
          )}

          {/* Toggle Button - Desktop Only */}
          {!isMobile && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onToggle()
              }}
              className={`w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all
                ${collapsed ? 'rotate-180' : ''}`}
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              {collapsed ? <FiChevronRight className="w-5 h-5" /> : <FiChevronLeft className="w-5 h-5" />}
            </button>
          )}
        </div>

        {/* Search Bar - Expanded Only */}
        {!collapsed && (
          <div className="px-4 py-4">
            <div className="relative group">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search menu... (Ctrl + K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 
                  focus:border-blue-500/50 focus:outline-none focus:bg-white/10 transition-all text-sm"
                style={{ pointerEvents: 'auto' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="absolute left-4 right-4 mt-2 p-2 glass-card z-50 max-h-64 overflow-y-auto">
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={(e) => handleNavigation(e, item.id)}
                        className="w-full p-2 rounded-lg hover:bg-white/5 flex items-center gap-3 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.category}</div>
                        </div>
                        {item.badge && (
                          <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(item.badgeColor)}`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )
                  })
                ) : (
                  <div className="p-4 text-center text-gray-400 text-sm">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Favorites Section - Expanded Only */}
        {!collapsed && favorites.length > 0 && (
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Favorites</span>
              <span className="text-[10px] text-gray-600">{favorites.length} items</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {favorites.slice(0, 5).map(favId => {
                const item = allItems.find(i => i.id === favId)
                if (!item) return null
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={(e) => handleNavigation(e, item.id)}
                    className="group relative px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 flex items-center gap-2 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs">{item.label}</span>
                    <button
                      onClick={(e) => toggleFavorite(e, item.id)}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX className="w-2.5 h-2.5 text-red-400" />
                    </button>
                  </button>
                )
              })}
              {favorites.length > 5 && (
                <span className="text-xs text-gray-500">+{favorites.length - 5} more</span>
              )}
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2">
          {menuStructure.map((category, idx) => {
            // Filter items by collapsed state
            const visibleItems = collapsed ? category.items.slice(0, 1) : category.items
            
            return (
              <div key={idx} className="mb-6">
                {/* Category Header - Hidden when collapsed */}
                {!collapsed && (
                  <div className="px-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                      {category.category}
                    </span>
                  </div>
                )}

                {/* Category Items */}
                <div className="space-y-0.5">
                  {visibleItems.map((item) => {
                    const Icon = item.icon
                    const isActive = currentPage === item.id
                    const isFavorite = favorites.includes(item.id)
                    const isHovered = hoveredItem === item.id

                    return (
                      <div
                        key={item.id}
                        className="relative group"
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <button
                          onClick={(e) => handleNavigation(e, item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300
                            ${collapsed ? 'justify-center' : 'justify-start'}
                            ${isActive 
                              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-500 shadow-lg shadow-blue-500/10' 
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }
                            ${isHovered ? 'scale-105' : ''}
                          `}
                          style={{ 
                            pointerEvents: 'auto', 
                            cursor: 'pointer',
                            minHeight: '44px'
                          }}
                        >
                          {/* Icon with glow effect when active */}
                          <div className={`relative transition-transform duration-300
                            ${isActive ? 'scale-110' : ''}
                            ${isHovered ? 'scale-110' : ''}
                          `}>
                            <Icon className={`w-5 h-5 transition-colors
                              ${isActive ? 'text-blue-400' : ''}
                            `} />
                            {isActive && (
                              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full -z-10"></div>
                            )}
                          </div>

                          {/* Label - Hidden when collapsed */}
                          {!collapsed && (
                            <span className={`flex-1 text-left text-sm font-medium transition-all
                              ${isActive ? 'text-white' : ''}
                            `}>
                              {item.label}
                            </span>
                          )}

                          {/* Badge - Hidden when collapsed */}
                          {!collapsed && item.badge && (
                            <span className={`text-xs px-2 py-1 rounded-full border ${getBadgeColor(item.badgeColor)}`}>
                              {item.badge}
                            </span>
                          )}

                          {/* Favorite Star - Hidden when collapsed */}
                          {!collapsed && (
                            <button
                              onClick={(e) => toggleFavorite(e, item.id)}
                              className={`p-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 hover:bg-white/10
                                ${isFavorite ? 'opacity-100' : ''}
                              `}
                            >
                              <FiStar className={`w-4 h-4 transition-colors
                                ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}
                              `} />
                            </button>
                          )}
                        </button>

                        {/* Tooltip for collapsed mode */}
                        {collapsed && (
                          <div className={`
                            absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2
                            bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap
                            border border-white/10 shadow-xl z-50
                            transition-all duration-200
                            ${isHovered ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'}
                          `}>
                            <div className="flex items-center gap-2">
                              <span>{item.label}</span>
                              {item.badge && (
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${getBadgeColor(item.badgeColor)}`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {/* Show more indicator for collapsed mode */}
                  {collapsed && category.items.length > 1 && (
                    <div className="relative group px-3 py-2">
                      <div className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center mx-auto">
                        <span className="text-[10px] text-gray-400">+{category.items.length - 1}</span>
                      </div>
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2
                        bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap border border-white/10 
                        shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div className="space-y-1">
                          {category.items.slice(1).map(item => (
                            <div key={item.id} className="flex items-center gap-2">
                              <span>{item.label}</span>
                              {item.badge && (
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${getBadgeColor(item.badgeColor)}`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-white/10 mt-auto">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">AU</span>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-bg"></div>
                
                {/* Status Menu */}
                <div className="absolute left-0 bottom-full mb-2 w-48 glass-card p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Online</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Away</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span>Busy</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm hover:bg-white/5 rounded-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Invisible</span>
                  </button>
                </div>
              </div>

              {/* User Info - Hidden when collapsed */}
              {!collapsed && (
                <div>
                  <div className="font-semibold text-sm">Admin User</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <FiShield className="w-3 h-3" />
                    Super Admin
                  </div>
                </div>
              )}
            </div>

            {/* Actions - Hidden when collapsed */}
            {!collapsed && (
              <div className="flex items-center gap-1">
                <button
                  onClick={onThemeToggle}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors relative group"
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                >
                  {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Toggle theme
                  </span>
                </button>
                
                <button
                  onClick={() => onNavigate('settings')}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors relative group"
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                >
                  <FiSettings className="w-4 h-4" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Settings
                  </span>
                </button>
                
                <button
                  onClick={() => {
                    // Handle logout
                    console.log('Logout')
                  }}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors relative group"
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                >
                  <FiLogOut className="w-4 h-4" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Logout
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats - Expanded Only */}
          {!collapsed && (
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
              <div className="text-center">
                <div className="text-xs text-gray-400">Orders</div>
                <div className="font-bold text-sm">1,248</div>
                <span className="text-[10px] text-green-500">+12%</span>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">Sales</div>
                <div className="font-bold text-sm">$374k</div>
                <span className="text-[10px] text-green-500">+8%</span>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">Products</div>
                <div className="font-bold text-sm">156</div>
                <span className="text-[10px] text-red-500">-3</span>
              </div>
            </div>
          )}
        </div>

        {/* Version Info - Expanded Only */}
        {!collapsed && (
          <div className="px-4 pb-4">
            <div className="text-[10px] text-gray-600 flex items-center justify-between">
              <span>QuantumDash Enterprise v2.0.0</span>
              <span className="px-2 py-0.5 bg-white/5 rounded-full">Build 2024.03</span>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

export default Sidebar
