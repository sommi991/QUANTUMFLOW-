import { useState, useEffect } from 'react'
import { 
  FiHome, FiBarChart2, FiShoppingCart, FiUsers, FiBox, FiFileText, 
  FiInbox, FiCalendar, FiFolder, FiSettings, FiHelpCircle, FiChevronLeft, 
  FiChevronRight, FiLogOut, FiMenu, FiX, FiMessageCircle, FiMail, 
  FiCreditCard, FiUser 
} from 'react-icons/fi'

const Sidebar = ({ collapsed, currentPage, onNavigate, onToggle }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user] = useState({
    name: 'John Doe',
    role: 'Administrator',
    avatar: 'JD'
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  const handleNavigation = (page) => {
    onNavigate(page)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <button
          onClick={() => handleNavigation('dashboard')}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center text-white font-bold text-lg">
            Q
          </div>
          {(!collapsed || isMobile) && (
            <span className="text-xl font-bold gradient-text">
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
        
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {navItems.map((group) => (
          <div key={group.title} className="mb-8">
            {(!collapsed || isMobile) && (
              <div className="text-xs uppercase text-gray-500 font-semibold tracking-wider px-4 mb-3">
                {group.title}
              </div>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`nav-link w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 hover:translate-x-1 ${
                    currentPage === item.id ? 'active bg-primary-blue/10 text-primary-blue border-l-4 border-primary-blue' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {(!collapsed || isMobile) && (
                    <span className="flex-1 text-left">{item.label}</span>
                  )}
                  {item.badge && (!collapsed || isMobile) && (
                    <span className="px-2 py-1 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full">
                      {item.badge}
                    </span>
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
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center text-white font-bold">
            {user.avatar}
          </div>
          
          {(!collapsed || isMobile) && (
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
    </>
  )

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        {mobileOpen && (
          <div className="fixed inset-0 z-40">
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="absolute left-0 top-0 h-screen w-72 bg-dark-sidebar backdrop-blur-2xl border-r border-white/10 z-40">
              <SidebarContent />
            </aside>
          </div>
        )}
      </>
    )
  }

  return (
    <aside className={`glass-sidebar fixed left-0 top-0 h-screen z-40 transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
      <SidebarContent />
    </aside>
  )
}

export default Sidebar
