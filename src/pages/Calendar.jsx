import { useState } from 'react'
import { FiCalendar, FiPlus, FiChevronLeft, FiChevronRight, FiFilter, FiDownload } from 'react-icons/fi'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('month')
  
  const events = [
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(2024, 2, 15, 10, 0),
      duration: 60,
      type: 'meeting',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Client Demo',
      date: new Date(2024, 2, 16, 14, 30),
      duration: 90,
      type: 'demo',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      title: 'Product Launch',
      date: new Date(2024, 2, 18, 9, 0),
      duration: 120,
      type: 'event',
      color: 'bg-green-500'
    }
  ]

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Calendar</h1>
        <p className="text-gray-400">Manage your schedule, meetings, and events</p>
      </div>

      <div className="glass-card p-6">
        {/* Calendar Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-white/5 rounded-lg p-1">
              {['day', 'week', 'month'].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    view === v
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
            
            <button className="btn-primary flex items-center">
              <FiPlus className="mr-2" />
              New Event
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="py-3 text-center font-semibold text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 42 }).map((_, index) => {
                const day = index - firstDayOfMonth + 1
                const isCurrentMonth = day > 0 && day <= daysInMonth
                const isToday = isCurrentMonth && 
                  new Date().getDate() === day &&
                  new Date().getMonth() === currentDate.getMonth()
                
                const dayEvents = events.filter(event => 
                  event.date.getDate() === day &&
                  event.date.getMonth() === currentDate.getMonth()
                )

                return (
                  <div
                    key={index}
                    className={`min-h-32 p-2 border border-white/5 rounded-lg ${
                      isCurrentMonth ? 'bg-white/5' : 'bg-white/[0.02] opacity-50'
                    } ${isToday ? 'ring-2 ring-blue-500/50' : ''}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm font-medium ${
                        isToday ? 'text-blue-400' : 'text-gray-400'
                      }`}>
                        {isCurrentMonth ? day : ''}
                      </span>
                      {isToday && (
                        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                          Today
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs px-2 py-1 rounded ${event.color} text-white truncate`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-400">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className={`w-3 h-12 rounded ${event.color}`} />
                <div className="flex-1">
                  <div className="font-semibold">{event.title}</div>
                  <div className="text-sm text-gray-400">
                    {event.date.toLocaleDateString()} • 
                    {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                    {new Date(event.date.getTime() + event.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="text-xs px-3 py-1 bg-white/10 rounded-full capitalize">
                  {event.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
