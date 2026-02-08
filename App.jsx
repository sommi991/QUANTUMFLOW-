import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Analytics from './pages/Analytics'
import ECommerce from './pages/ECommerce'
import Settings from './pages/Settings'
import Notification from './components/Notification'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [theme, setTheme] = useState('dark')
  const [notifications, setNotifications] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [notificationData, setNotificationData] = useState({
    type: 'success',
    title: '',
    message: ''
  })

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
  }

  useEffect(() => {
    // Load saved preferences
    const savedPage = localStorage.getItem('quantumdash_page') || 'dashboard'
    const savedSidebar = localStorage.getItem('quantumdash_sidebar') === 'true'
    const savedTheme = localStorage.getItem('quantumdash_theme') || 'dark'

    setCurrentPage(savedPage)
    setSidebarCollapsed(savedSidebar)
    setTheme(savedTheme)
  }, [])

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
      default:
        return <Dashboard />
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex">
        <Sidebar
          collapsed={sidebarCollapsed}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onToggle={toggleSidebar}
        />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
          <Header
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={toggleSidebar}
            onToggleTheme={toggleTheme}
            theme={theme}
          />
          
          <main className="p-6">
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
