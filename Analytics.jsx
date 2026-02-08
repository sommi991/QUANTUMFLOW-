import { useState, useEffect } from 'react'
import ChartCard from '../components/ChartCard'
import { FiRefreshCw, FiDownload, FiEye } from 'react-icons/fi'

const Analytics = () => {
  const [liveData, setLiveData] = useState({
    visitors: 1248,
    conversions: 42,
    revenue: 8245,
    orders: 156
  })

  const performanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Conversion Rate',
        data: [3.2, 4.1, 4.8, 4.5, 5.2, 4.9, 5.5],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true
      }
    ]
  }

  const geoData = {
    labels: ['USA', 'UK', 'Canada', 'Germany', 'France', 'Japan'],
    datasets: [
      {
        label: 'Visitors',
        data: [1200, 800, 600, 400, 300, 200],
        backgroundColor: 'rgba(59, 130, 246, 0.7)'
      }
    ]
  }

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

  const reports = [
    { id: 1, title: 'Monthly Revenue Report', updated: 'Today' },
    { id: 2, title: 'User Growth Analysis', updated: '2 days ago' },
    { id: 3, title: 'Product Performance', updated: '1 week ago' }
  ]

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

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Advanced Analytics</h1>
        <p className="text-gray-400">Detailed insights and performance metrics with interactive charts and real-time data.</p>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Date Range
            </label>
            <select className="form-input">
              <option>Last 7 Days</option>
              <option selected>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Metric Type
            </label>
            <select className="form-input">
              <option>Revenue</option>
              <option>Users</option>
              <option>Conversions</option>
              <option>Sessions</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Group By
            </label>
            <select className="form-input">
              <option>Day</option>
              <option>Week</option>
              <option>Month</option>
              <option>Quarter</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="btn-primary w-full">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Performance Metrics"
          type="line"
          data={performanceData}
          action={<FiRefreshCw className="w-4 h-4" />}
        />
        
        <ChartCard
          title="Geographic Distribution"
          type="bar"
          data={geoData}
        />
        
        <ChartCard
          title="Device Breakdown"
          type="pie"
          data={deviceData}
        />
        
        {/* Custom Reports */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Custom Reports</h3>
            <button className="btn-primary text-sm">
              New Report
            </button>
          </div>
          
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{report.title}</div>
                    <div className="text-sm text-gray-400">
                      Last updated: {report.updated}
                    </div>
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Analytics */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Real-time Analytics</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-gray-400">Live data updating every 10 seconds</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{liveData.visitors.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Active Visitors</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold">{liveData.conversions}</div>
            <div className="text-sm text-gray-400">Conversions (Last hour)</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold">${liveData.revenue.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Revenue (Today)</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold">{liveData.orders}</div>
            <div className="text-sm text-gray-400">Orders (Today)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics