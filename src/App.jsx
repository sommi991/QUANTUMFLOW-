imporimport React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Notification from './components/Notification'

// 🔴 FIX: IMPORT DIRECTLY INSTEAD OF LAZY LOADING
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Analytics from './pages/Analytics'
import ECommerce from './pages/ECommerce'
import Settings from './pages/Settings'
import Calendar from './pages/Calendar'
import Chat from './pages/Chat'
import Email from './pages/Email'
import Profile from './pages/Profile'
import Invoice from './pages/Invoice'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState('ecommerce')
  const [theme, setTheme] = useState('dark')
  const [showNotification, setShowNotification] = useState(false)
  const [notificationData, setNotificationData] = useState({
    type: 'success',
    title: '',
    message: ''
  })
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
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
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    showToast('info', 'Theme Changed', `Switched to ${newTheme} theme`)
  }

  const navigateTo = (page) => {
    console.log('🔵 Navigating to:', page)
    setCurrentPage(page)
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }

  const renderPage = () => {
    console.log('🔵 Rendering page:', currentPage)
    
    try {
      switch(currentPage) {
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
          return <ECommerce />
      }
    } catch (error) {
      console.error('🔴 Error rendering page:', error)
      return (
        <div className="p-8 text-center">
          <div className="text-red-500 mb-4">Error loading page</div>
          <button 
            onClick={() => setCurrentPage('ecommerce')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Go to E-Commerce
          </button>
        </div>
      )
    }
  }

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex min-h-screen bg-[#0a0a1a] text-white">
        <Sidebar
          collapsed={sidebarCollapsed}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onToggle={toggleSidebar}
          isMobile={isMobile}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
        
        <div className={`flex-1 w-full transition-all duration-300 ${
          sidebarCollapsed 
            ? isMobile ? 'ml-0' : 'ml-20' 
            : isMobile ? 'ml-0' : 'ml-80'
        }`}>
          <Header
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={toggleSidebar}
            onToggleTheme={toggleTheme}
            theme={theme}
            isMobile={isMobile}
          />
          
          <main className="p-4 sm:p-6 md:p-8">
            {renderPage()}
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
    </div>
  )
}

export default App
