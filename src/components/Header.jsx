import { useState } from 'react'
import { FiSearch, FiBell, FiMail, FiMoon, FiSun, FiMaximize2 } from 'react-icons/fi'

const Header = ({ sidebarCollapsed, onToggleSidebar, onToggleTheme, theme, isMobile }) => {
  const [search, setSearch] = useState('')
  const [isMobileSearch, setIsMobileSearch] = useState(false)

  return (
    <header className="glass-card sticky top-0 z-30 h-16 flex items-center justify-between px-4 md:px-6 mx-4 md:mx-6 mt-4 rounded-2xl">
      {/* Left Section - NO MOBILE MENU BUTTON HERE */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Desktop Search */}
        <div className="hidden md:block relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users, orders, products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-12 w-80"
          />
        </div>
        
        {/* Mobile Search Toggle (instead of menu button) */}
        <button
          onClick={() => setIsMobileSearch(true)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <FiSearch className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearch && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileSearch(false)}
          />
          <div className="absolute top-4 left-4 right-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-12 py-4 bg-dark-card border border-white/10 rounded-xl text-white focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setIsMobileSearch(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-1 md:gap-2">
        <button 
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative"
          aria-label="Notifications"
        >
          <FiBell className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-red-500 to-pink-500 text-xs text-white rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        <button 
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative"
          aria-label="Messages"
        >
          <FiMail className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-blue-500 to-purple-500 text-xs text-white rounded-full flex items-center justify-center">
            12
          </span>
        </button>

        <button
          onClick={onToggleTheme}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <FiSun className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <FiMoon className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>

        <button 
          className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          aria-label="Fullscreen"
        >
          <FiMaximize2 className="w-5 h-5" />
        </button>
        
        {/* User Avatar */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm md:text-base cursor-pointer ml-2">
          JD
        </div>
      </div>
    </header>
  )
}

export default Header
