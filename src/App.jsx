import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Analytics from './pages/Analytics'
import ECommerce from './pages/ECommerce'
import Settings from './pages/Settings'
import Notification from './components/Notification'
import Calendar from './pages/Calendar'
import Chat from './pages/Chat'
import Email from './pages/Email'
import Profile from './pages/Profile'
import Invoice from './pages/Invoice'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [theme, setTheme] = useState('dark')
  const [showNotification, setShowNotification] = useState(false)
  const [notificationData, setNotificationData] = useState({
    type: 'success',
    title: '',
    message: ''
  })
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Add loading state

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Auto-collapse sidebar on mobile
      if (mobile) {
        setSidebarCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const showToast = (type, title, message) => {
    setNotificationData({ type, title, message })
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 5000)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
    localStorage.setItem('quantumdash_sidebar', !sidebarCollapsed)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('quantumdash_theme', newTheme)
    showToast('info', 'Theme Changed', `Switched to ${newTheme} theme`)
  }

  const navigateTo = (page) => {
    setCurrentPage(page)
    localStorage.setItem('quantumdash_page', page)
    // Auto-close sidebar on mobile after navigation
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }

  useEffect(() => {
    // Load saved preferences
    const savedPage = localStorage.getItem('quantumdash_page') || 'dashboard'
    const savedSidebar = localStorage.getItem('quantumdash_sidebar') === 'true'
    const savedTheme = localStorage.getItem('quantumdash_theme') || 'dark'

    setCurrentPage(savedPage)
    setSidebarCollapsed(isMobile ? true : savedSidebar)
    setTheme(savedTheme)
    
    // Hide loading after a short delay
    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }, [isMobile])

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'users':
        return <Users showToast={showToast} />
      case 'analytics':
        return <Analytics />
      case 'ecommerce':
        return <ECommerce />
      case 'settings':
        return <Settings showToast={showToast} />
      case 'calendar':
        return <Calendar />
      case 'chat':
        return <Chat />
      case 'email':
        return <Email />
      case 'profile':
        return <Profile />
      case 'invoice':
        return <Invoice />
      default:
        return <Dashboard />
    }
  }

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center text-white font-bold text-2xl animate-pulse">
            Q
          </div>
          <h2 className="text-xl font-bold gradient-text">QuantumDash</h2>
          <p className="text-gray-400 mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex">
        <Sidebar
          collapsed={sidebarCollapsed}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onToggle={toggleSidebar}
          isMobile={isMobile}
        />
        
        <div className={`flex-1 w-full transition-all duration-300 ${
          sidebarCollapsed 
            ? isMobile ? 'ml-0' : 'ml-16 md:ml-20' 
            : isMobile ? 'ml-0' : 'ml-72 lg:ml-80'
        }`}>
          <Header
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={toggleSidebar}
            onToggleTheme={toggleTheme}
            theme={theme}
            isMobile={isMobile}
          />
          
          <main className="p-4 sm:p-6 md:p-8 w-full overflow-x-auto">
            <div className="min-w-[320px]"> {/* Ensure minimum width for mobile */}
              {renderPage()}
            </div>
          </main>
        </div>
      </div>

      {showNotification && (
        <Notification
          type={notificationData.type}
          title={notificationData.title}
          message={notificationData.message}
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Mobile overlay when sidebar is open */}
      {!sidebarCollapsed && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  )
}

export default App
