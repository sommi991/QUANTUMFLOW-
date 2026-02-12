import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Notification from './components/Notification'

// Import all pages
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

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setSidebarCollapsed(true)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load saved preferences
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage') || 'ecommerce'
    const savedSidebar = localStorage.getItem('sidebarCollapsed') === 'true'
    const savedTheme = localStorage.getItem('theme') || 'dark'
    
    setCurrentPage(savedPage)
    setSidebarCollapsed(isMobile ? true : savedSidebar)
    setTheme(savedTheme)
    
    // Apply theme to body
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [isMobile])

  const showToast = (type, title, message) => {
    setNotificationData({ type, title, message })
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 5000)
  }

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    localStorage.setItem('sidebarCollapsed', newState)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    showToast('success', 'Theme Updated', `Switched to ${newTheme} mode`)
  }

  const navigateTo = (page) => {
    setCurrentPage(page)
    localStorage.setItem('currentPage', page)
    if (isMobile) setSidebarCollapsed(true)
  }

  // Render current page
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard showToast={showToast} />
      case 'users':
        return <Users showToast={showToast} />
      case 'analytics':
        return <Analytics showToast={showToast} />
      case 'ecommerce':
        return <ECommerce />
      case 'settings':
        return <Settings showToast={showToast} />
      case 'calendar':
        return <Calendar showToast={showToast} />
      case 'chat':
        return <Chat showToast={showToast} />
      case 'email':
        return <Email showToast={showToast} />
      case 'profile':
        return <Profile showToast={showToast} />
      case 'invoice':
        return <Invoice showToast={showToast} />
      default:
        return <ECommerce />
    }
  }

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex min-h-screen bg-[#0a0a1a] text-white">
        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onToggle={toggleSidebar}
          isMobile={isMobile}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
        
        {/* Main Content */}
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
            userName="Admin User"
            userRole="Administrator"
            unreadNotifications={3}
            unreadMessages={2}
            onProfile={() => navigateTo('profile')}
            onSettings={() => navigateTo('settings')}
            onLogout={() => console.log('Logout')}
          />
          
          <main className="p-4 sm:p-6 md:p-8">
            {renderPage()}
          </main>
        </div>
      </div>

      {/* Notifications */}
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
