importimport { useState } from 'react'
import { FiSearch, FiBell, FiMail, FiMoon, FiSun, FiMaximize2, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Header = ({ sidebarCollapsed, onToggleSidebar, onToggleTheme, theme, isMobile }) => {
  const [search, setSearch] = useState('')
  const [isMobileSearch, setIsMobileSearch] = useState(false)

  return (
    <header className="glass-card sticky top-0 z-30 h-16 flex items-center justify-between px-4 md:px-6 mx-4 md:mx-6 mt-4 rounded-2xl">
      {/* Left Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Desktop sidebar toggle button - only show on desktop */}
        {!isMobile && (
          <button
            onClick={onToggleSidebar}
            className="w-10 h-10 hidden md:flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <FiChevronRight className="w-5 h-5" />
            ) : (
              <FiChevronLeft className="w-5 h-5" />
            )}
          </button>
        )}
        
        {/* Page Title - Shows current page */}
        <h1 className="text-lg md:text-xl font-bold ml-0 md:ml-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Dashboard
        </h1>
        
        {/* Mobile Search Toggle Button */}
        {isMobile && (
          <button
            onClick={() => setIsMobileSearch(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors md:hidden"
            aria-label="Search"
          >
            <FiSearch className="w-5 h-5" />
          </button>
        )}
        
        {/* Desktop Search - hidden on mobile */}
        <div className="hidden md:block relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users, orders, products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-12 w-64 lg:w-80 bg-white/5 border-white/10 focus:border-blue-500/50"
          />
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearch && isMobile && (
        <div className="fixed inset-0 z-50">
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
                className="w-full px-12 py-4 bg-[#0a0a1a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <button
                onClick={() => setIsMobileSearch(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
                aria-label="Close search"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        <button 
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative group"
          aria-label="Notifications"
        >
          <FiBell className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-red-500 to-pink-500 text-xs text-white rounded-full flex items-center justify-center">
            5
          </span>
          <div className="absolute -bottom-12 right-0 hidden group-hover:block bg-[#0a0a1a] border border-white/10 rounded-lg p-2 shadow-lg z-50">
            <p className="text-xs whitespace-nowrap">5 new notifications</p>
          </div>
        </button>

        <button 
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative group"
          aria-label="Messages"
        >
          <FiMail className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-blue-500 to-purple-500 text-xs text-white rounded-full flex items-center justify-center">
            12
          </span>
          <div className="absolute -bottom-12 right-0 hidden group-hover:block bg-[#0a0a1a] border border-white/10 rounded-lg p-2 shadow-lg z-50">
            <p className="text-xs whitespace-nowrap">12 unread messages</p>
          </div>
        </button>

        <button
          onClick={onToggleTheme}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
          aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === 'dark' ? (
            <FiSun className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <FiMoon className="w-4 h-4 md:w-5 md:h-5" />
          )}
          <div className="absolute -bottom-12 right-0 hidden group-hover:block bg-[#0a0a1a] border border-white/10 rounded-lg p-2 shadow-lg z-50">
            <p className="text-xs whitespace-nowrap">
              {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
            </p>
          </div>
        </button>

        <button 
          className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
          aria-label="Fullscreen"
        >
          <FiMaximize2 className="w-5 h-5" />
          <div className="absolute -bottom-12 right-0 hidden group-hover:block bg-[#0a0a1a] border border-white/10 rounded-lg p-2 shadow-lg z-50">
            <p className="text-xs whitespace-nowrap">Enter fullscreen</p>
          </div>
        </button>
      </div>
    </header>
  )
}

export default Header
