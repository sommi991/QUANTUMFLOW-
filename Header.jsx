import { FiSearch, FiBell, FiMail, FiMoon, FiSun, FiMaximize2, FiMenu } from 'react-icons/fi'

const Header = ({ sidebarCollapsed, onToggleSidebar, onToggleTheme, theme }) => {
  const [search, setSearch] = useState('')

  return (
    <header className="glass-card sticky top-0 z-30 h-16 flex items-center justify-between px-6 mx-6 mt-4 rounded-2xl">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <FiMenu className="w-5 h-5" />
        </button>
        
        <div className="relative">
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

      <div className="flex items-center gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative">
          <FiBell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-xs text-white rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative">
          <FiMail className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary-blue to-primary-purple text-xs text-white rounded-full flex items-center justify-center">
            12
          </span>
        </button>

        <button
          onClick={onToggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          {theme === 'dark' ? (
            <FiSun className="w-5 h-5" />
          ) : (
            <FiMoon className="w-5 h-5" />
          )}
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <FiMaximize2 className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}

export default Header
