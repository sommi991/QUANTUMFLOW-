import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

const StatsCard = ({ title, value, change, icon: Icon, color, isCurrency = false }) => {
  const isPositive = change >= 0
  
  return (
    <div className="stat-card">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="text-2xl font-bold">
            {isCurrency ? '$' : ''}{value.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">{title}</div>
        </div>
        
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
          isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {isPositive ? (
            <FiTrendingUp className="w-4 h-4" />
          ) : (
            <FiTrendingDown className="w-4 h-4" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  )
}

export default StatsCard