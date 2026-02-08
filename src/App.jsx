import { useState, useEffect, Suspense, lazy } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Notification from './components/Notification'

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Users = lazy(() => import('./pages/Users'))
const Analytics = lazy(() => import('./pages/Analytics'))
const ECommerce = lazy(() => import('./pages/ECommerce'))
const Settings = lazy(() => import('./pages/Settings'))
const Calendar = lazy(() => import('./pages/Calendar'))
const Chat = lazy(() => import('./pages/Chat'))
const Email = lazy(() => import('./pages/Email'))
const Profile = lazy(() => import('./pages/Profile'))
const Invoice = lazy(() => import('./pages/Invoice'))

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
  const [isLoading, setIsLoading] = useState(true)

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
    
    // Hide loading after components are ready
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
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
  }, [isMobile])

  const renderPage = () => {
    const LoadingFallback = () => (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )

    return (
      <Suspense fallback={<LoadingFallback />}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'users' && <Users showToast={showToast} />}
        {currentPage === 'analytics' && <Analytics />}
        {currentPage === 'ecommerce' && <ECommerce />}
        {currentPage === 'settings' && <Settings showToast={showToast} />}
        {currentPage === 'calendar' && <Calendar />}
        {currentPage === 'chat' && <Chat />}
        {currentPage === 'email' && <Email />}
        {currentPage === 'profile' && <Profile />}
        {currentPage === 'invoice' && <Invoice />}
      </Suspense>
    )
  }

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl animate-pulse">
            Q
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">QuantumDash</h2>
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
          
          <main className="p-4 sm:p-6 md:p-8 w-full overflow-x-hidden">
            <div className="min-w-0"> {/* Prevent horizontal overflow */}
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
    </div>
  )
}

export default App
