import { useState, useEffect, useCallback } from 'react'
import { 
  FiHome, FiBarChart2, FiShoppingCart, FiUsers, FiBox, FiFileText, 
  FiInbox, FiCalendar, FiFolder, FiSettings, FiHelpCircle, FiChevronLeft, 
  FiChevronRight, FiLogOut, FiMenu, FiX, FiMessageCircle, FiMail, 
  FiCreditCard, FiUser 
} from 'react-icons/fi'

const Sidebar = ({ collapsed, currentPage, onNavigate, onToggle, isMobile }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile sidebar when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileOpen])

  const navItems = [
    {
      title: 'MAIN',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: FiHome, badge: null },
        { id: 'analytics', label: 'Analytics', icon: FiBarChart2, badge: null },
        { id: 'ecommerce', label: 'E-Commerce', icon: FiShoppingCart, badge: null },
      ]
    },
    {
      title: 'MANAGEMENT',
      items: [
        { id: 'users', label: 'Users', icon: FiUsers, badge: null },
        { id: 'products', label: 'Products', icon: FiBox, badge: null },
        { id: 'orders', label: 'Orders', icon: FiFileText, badge: null },
      ]
    },
    {
      title: 'APPS',
      items: [
        { id: 'calendar', label: 'Calendar', icon: FiCalendar, badge: null },
        { id: 'chat', label: 'Chat', icon: FiMessageCircle, badge: null },
        { id: 'email', label: 'Email', icon: FiMail, badge: null },
        { id: 'inbox', label: 'Inbox', icon: FiInbox, badge: 24 },
      ]
    },
    {
      title: 'PAGES',
      items: [
        { id: 'profile', label: 'User Profile', icon: FiUser, badge: null },
        { id: 'invoice', label: 'Invoice', icon: FiCreditCard, badge: null },
        { id: 'settings', label: 'Settings', icon: FiSettings, badge: null },
        { id: 'help', label: 'Help & Support', icon: FiHelpCircle, badge: null },
      ]
    }
  ]

  const handleNavigation = useCallback((page) => {
    onNavigate(page)
    if (isMobile) {
      setMobileOpen(false)
    }
  }, [onNavigate, isMobile])

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between flex-shrink-0 bg-[#0a0a1a]/95 backdrop-blur-lg">
        <button
          onClick={() => handleNavigation('dashboard')}
          className="flex items-center gap-3 min-w-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0">
            Q
          </div>
          {(!collapsed || isMobile || mobileOpen) && (
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent whitespace-nowrap truncate">
              QuantumDash
            </span>
          )}
        </button>
        
        {/* Desktop toggle button */}
        {!isMobile && (
          <button
            onClick={onToggle}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        )}
        
        {/* Mobile close button */}
        {(isMobile && mobileOpen) && (
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label="Close sidebar"
          >
            <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {/* Navigation - Scrollable area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800">
        <nav className="px-4">
          {navItems.map((group) => (
            <div key={group.title} className="mb-6">
              {(!collapsed || isMobile || mobileOpen) && (
                <div className="text-xs uppercase text-gray-500 font-semibold tracking-wider px-2 mb-3 truncate">
                  {group.title}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 ${
                      currentPage === item.id ? 'bg-blue-500/10 text-blue-400 border-l-4 border-blue-500' : ''
                    } ${collapsed && !isMobile && !mobileOpen ? 'justify-center px-2' : ''}`}
                    title={collapsed && !isMobile && !mobileOpen ? item.label : ''}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {(!collapsed || isMobile || mobileOpen) && (
                      <>
                        <span className="flex-1 text-left truncate text-sm sm:text-base">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-1 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex-shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10 flex-shrink-0 bg-[#0a0a1a]/95 backdrop-blur-lg">
        <div className="flex items-center gap-3 p-2 sm:p-3 rounded-xl hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base">
            JD
          </div>
          
          {(!collapsed || isMobile || mobileOpen) && (
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">John Doe</div>
              <div className="text-xs text-gray-400 truncate">Administrator</div>
            </div>
          )}
          
          <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex-shrink-0">
            <FiLogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  // If we're on mobile, show a single hamburger menu button
  if (isMobile) {
    return (
      <>
        {/* Mobile hamburger menu button - Only ONE button */}
        {!mobileOpen && (
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <FiMenu className="w-5 h-5" />
          </button>
        )}

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40">
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="absolute left-0 top-0 h-screen w-72 bg-[#0a0a1a]/95 backdrop-blur-2xl border-r border-white/10 z-40">
              <SidebarContent />
            </aside>
          </div>
        )}
      </>
    )
  }

  // Desktop sidebar - always visible
  return (
    <aside className={`fixed left-0 top-0 h-screen z-40 transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'} hidden md:flex flex-col bg-[#0a0a1a]/95 backdrop-blur-2xl border-r border-white/10`}>
      <SidebarContent />
    </aside>
  )
}

export default Sidebar
