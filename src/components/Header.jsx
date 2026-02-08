
import { useState } from 'react'
import { FiSearch, FiBell, FiMail, FiMoon, FiSun, FiMaximize2, FiMenu } from 'react-icons/fi'

const Header = ({ sidebarCollapsed, onToggleSidebar, onToggleTheme, theme }) => {
  const [search, setSearch] = useState('')
  const [isMobileSearch, setIsMobileSearch] = useState(false)

  return (
    <header className="glass-card sticky top-0 z-30 h-16 flex items-center justify-between px-4 md:px-6 mx-4 md:mx-6 mt-4 rounded-2xl">
      {/* Left Section */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <FiMenu className="w-5 h-5" />
        </button>
        
        {/* Mobile Search Toggle */}
        <button
          onClick={() => setIsMobileSearch(true)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <FiSearch className="w-5 h-5" />
        </button>
        
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
        <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative">
          <FiBell className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-red-500 to-pink-500 text-xs text-white rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative">
          <FiMail className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-primary-blue to-primary-purple text-xs text-white rounded-full flex items-center justify-center">
            12
          </span>
        </button>

        <button
          onClick={onToggleTheme}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          {theme === 'dark' ? (
            <FiSun className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <FiMoon className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>

        <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <FiMaximize2 className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}

export default Header
