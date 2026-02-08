
import { useState, useEffect } from 'react'  // ADDED THIS IMPORT
import { FiFilter, FiRefreshCw, FiDownload, FiEye, FiTrendingUp, FiTrendingDown } from 'react-icons/fi'
import ChartCard from '../components/ChartCard'

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30')
  const [metric, setMetric] = useState('revenue')
  const [groupBy, setGroupBy] = useState('day')
  const [liveData, setLiveData] = useState({
    visitors: 1248,
    conversions: 42,
    revenue: 8245,
    orders: 156
  })

  // Revenue chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  // Traffic sources data
  const trafficData = {
    labels: ['Direct', 'Organic', 'Social', 'Email', 'Referral'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#f97316',
          '#f59e0b'
        ]
      }
    ]
  }

  // User acquisition data
  const userData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: '#3b82f6',
        borderWidth: 2
      }
    ]
  }

  // Geographic data
  const geoData = {
    labels: ['USA', 'UK', 'Canada', 'Germany', 'France', 'Japan'],
    datasets: [
      {
        label: 'Visitors',
        data: [1200, 800, 600, 400, 300, 200],
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
        borderColor: '#8b5cf6',
        borderWidth: 2
      }
    ]
  }

  // Device data
  const deviceData = {
    labels: ['Mobile', 'Desktop', 'Tablet'],
    datasets: [
      {
        data: [55, 35, 10],
        backgroundColor: [
          '#3b82f6',
          '#8b5cf6',
          '#ec4899'
        ]
      }
    ]
  }

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        visitors: prev.visitors + Math.floor(Math.random() * 10) - 5,
        conversions: prev.conversions + Math.floor(Math.random() * 3) - 1,
        revenue: prev.revenue + Math.floor(Math.random() * 100) - 50,
        orders: prev.orders + Math.floor(Math.random() * 5) - 2
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const performanceMetrics = [
    {
      label: 'Conversion Rate',
      value: '4.8%',
      target: '5%',
      progress: 78,
      trend: 'up',
      change: '+0.3%',
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Bounce Rate',
      value: '32.1%',
      target: '<30%',
      progress: 32,
      trend: 'down',
      change: '+1.2%',
      color: 'from-red-500 to-pink-500'
    },
    {
      label: 'Avg. Session',
      value: '4m 23s',
      target: '>5m',
      progress: 65,
      trend: 'up',
      change: '+12s',
      color: 'from-blue-500 to-cyan-500'
    }
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Advanced Analytics</h1>
        <p className="text-gray-400">Detailed insights and performance metrics with interactive charts</p>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date Range</label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="form-input"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Metric Type</label>
            <select 
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="form-input"
            >
              <option value="revenue">Revenue</option>
              <option value="users">Users</option>
              <option value="conversions">Conversions</option>
              <option value="sessions">Sessions</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Group By</label>
            <select 
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="form-input"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="quarter">Quarter</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="btn-primary w-full flex items-center justify-center">
              <FiFilter className="mr-2" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Performance Metrics</h3>
          <div className="space-y-6">
            {performanceMetrics.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className="text-sm font-semibold">Target: {item.target}</span>
                </div>
                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden mb-1">
                  <div 
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm font-semibold">{item.value}</span>
                  <span className={`text-sm flex items-center ${
                    item.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {item.trend === 'up' ? (
                      <FiTrendingUp className="mr-1" />
                    ) : (
                      <FiTrendingDown className="mr-1" />
                    )}
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Geographic Distribution</h3>
            <select className="form-input text-sm w-32">
              <option>Visitors</option>
              <option>Conversions</option>
              <option>Revenue</option>
            </select>
          </div>
          <div className="h-64">
            <ChartCard
              type="bar"
              data={geoData}
              options={{
                plugins: { legend: { display: false } }
              }}
            />
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Device Breakdown</h3>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <FiRefreshCw className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64">
            <ChartCard
              type="pie"
              data={deviceData}
            />
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Revenue Overview"
          type="line"
          data={revenueData}
          action="View Details"
        />
        
        <ChartCard
          title="Traffic Sources"
          type="doughnut"
          data={trafficData}
          action="Refresh"
        />
        
        <ChartCard
          title="User Acquisition"
          type="bar"
          data={userData}
          options={{
            plugins: { legend: { display: false } }
          }}
          action="Daily"
        />
        
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Custom Reports</h3>
            <button className="btn-primary text-sm">
              <FiDownload className="mr-2" />
              New Report
            </button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Monthly Revenue Report', updated: 'Today' },
              { title: 'User Growth Analysis', updated: '2 days ago' },
              { title: 'Product Performance', updated: '1 week ago' }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div>
                  <div className="font-semibold">{report.title}</div>
                  <div className="text-sm text-gray-400">Last updated: {report.updated}</div>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <FiDownload className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Analytics */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold">Real-time Analytics</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-400">Live data updating every 10 seconds</span>
            </div>
          </div>
          <button className="btn-secondary text-sm">
            <FiRefreshCw className="mr-2" />
            Refresh Now
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-3xl font-bold">{liveData.visitors.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Active Visitors</div>
          </div>
          
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-3xl font-bold">{liveData.conversions}</div>
            <div className="text-sm text-gray-400">Conversions (Last hour)</div>
          </div>
          
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-3xl font-bold">${liveData.revenue.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Revenue (Today)</div>
          </div>
          
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-3xl font-bold">{liveData.orders}</div>
            <div className="text-sm text-gray-400">Orders (Today)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
