import { useState } from 'react'
import { FiHome, FiBarChart2, FiShoppingCart, FiUsers, FiBox, FiFileText, FiInbox, FiCalendar, FiFolder, FiSettings, FiHelpCircle, FiChevronLeft, FiChevronRight, FiLogOut, FiMenu, FiX } from 'react-icons/fi'

const Sidebar = ({ collapsed, currentPage, onNavigate, onToggle, isMobile }) => {
  const [user] = useState({
    name: 'John Doe',
    role: 'Administrator',
    avatar: 'JD'
  })

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
        { id: 'users', label: 'Users', icon: FiUsers, badge: 3 },
        { id: 'products', label: 'Products', icon: FiBox, badge: null },
        { id: 'orders', label: 'Orders', icon: FiFileText, badge: 12 },
        { id: 'inventory', label: 'Inventory', icon: FiInbox, badge: null },
      ]
    },
    {
      title: 'APPS',
      items: [
        { id: 'inbox', label: 'Inbox', icon: FiInbox, badge: 24 },
        { id: 'calendar', label: 'Calendar', icon: FiCalendar, badge: null },
        { id: 'files', label: 'File Manager', icon: FiFolder, badge: null },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'settings', label: 'Settings', icon: FiSettings, badge: null },
        { id: 'help', label: 'Help & Support', icon: FiHelpCircle, badge: null },
      ]
    }
  ]

  return (
    <>
      <aside className={`glass-sidebar fixed left-0 top-0 h-screen z-40 transition-all duration-300 ${
        collapsed 
          ? isMobile ? '-translate-x-full lg:translate-x-0 w-16 md:w-20' : 'w-16 md:w-20'
          : isMobile ? 'w-72 translate-x-0' : 'w-72 lg:w-80'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30">
                Q
              </div>
              {!collapsed && (
                <span className="text-xl font-bold gradient-text whitespace-nowrap">
                  QuantumDash
                </span>
              )}
            </button>
            
            {!isMobile && (
              <button
                onClick={onToggle}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                {collapsed ? (
                  <FiChevronRight className="w-5 h-5" />
                ) : (
                  <FiChevronLeft className="w-5 h-5" />
                )}
              </button>
            )}
            
            {isMobile && !collapsed && (
              <button
                onClick={onToggle}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {navItems.map((group) => (
              <div key={group.title} className="mb-6 sm:mb-8">
                {!collapsed && (
                  <div className="text-xs uppercase text-gray-500 font-semibold tracking-wider px-4 mb-3">
                    {group.title}
                  </div>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`nav-link w-full ${currentPage === item.id ? 'active' : ''}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left text-sm sm:text-base">{item.label}</span>
                          {item.badge && (
                            <span className="px-2 py-1 text-xs bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full">
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

          {/* User Profile */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {user.avatar}
              </div>
              
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{user.name}</div>
                  <div className="text-xs text-gray-400 truncate">{user.role}</div>
                </div>
              )}
              
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <FiLogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button when sidebar is collapsed */}
      {isMobile && collapsed && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-40 w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
        >
          <FiMenu className="w-5 h-5" />
        </button>
      )}
    </>
  )
}

export default Sidebar
