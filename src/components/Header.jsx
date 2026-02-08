import { useState } from 'react'
import { FiSearch, FiBell, FiMail, FiMoon, FiSun, FiMaximize2 } from 'react-icons/fi'

const Header = ({ sidebarCollapsed, onToggleSidebar, onToggleTheme, theme, isMobile }) => {
  const [search, setSearch] = useState('')

  return (
    <header className={`glass-card sticky top-0 z-30 h-16 flex items-center justify-between ${
      isMobile ? 'mx-4 mt-4' : 'mx-6 mt-4'
    } rounded-2xl`}>
      <div className="flex items-center gap-3 sm:gap-4 pl-4 sm:pl-6">
        {!isMobile && (
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input pl-10 w-48 sm:w-64 md:w-80 text-sm"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 sm:gap-2 pr-4 sm:pr-6">
        {isMobile && (
          <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <FiSearch className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

        <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative">
          <FiBell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-pink-500 to-red-500 text-[10px] sm:text-xs text-white rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative">
          <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-[10px] sm:text-xs text-white rounded-full flex items-center justify-center">
            12
          </span>
        </button>

        <button
          onClick={onToggleTheme}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          {theme === 'dark' ? (
            <FiSun className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <FiMoon className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>

        {!isMobile && (
          <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <FiMaximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
