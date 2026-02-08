import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi'

const Notification = ({ type, title, message, onClose }) => {
  const icons = {
    success: <FiCheckCircle className="w-6 h-6" />,
    error: <FiAlertCircle className="w-6 h-6" />,
    warning: <FiAlertCircle className="w-6 h-6" />,
    info: <FiInfo className="w-6 h-6" />
  }

  const colors = {
    success: 'bg-green-500/20 border-green-500/30 text-green-400',
    error: 'bg-red-500/20 border-red-500/30 text-red-400',
    warning: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
    info: 'bg-blue-500/20 border-blue-500/30 text-blue-400'
  }

  return (
    <div className={`fixed bottom-6 right-6 glass-card border ${colors[type]} p-4 max-w-md z-50 animate-slide-up`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {icons[type]}
        </div>
        
        <div className="flex-1">
          <div className="font-semibold">{title}</div>
          <div className="text-sm opacity-90 mt-1">{message}</div>
        </div>
        
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Notification