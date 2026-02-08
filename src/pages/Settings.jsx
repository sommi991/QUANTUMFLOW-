import { useState } from 'react'
import { FiSave, FiRefreshCw, FiMoon, FiSun, FiShield, FiGlobe, FiDatabase } from 'react-icons/fi'

const Settings = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    // General Settings
    appName: 'QuantumDash Pro',
    timezone: 'UTC-8',
    language: 'en-US',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12',
    theme: 'dark',
    
    // Security Settings
    twoFactor: false,
    sessionTimeout: '30',
    emailNotifications: true,
    pushNotifications: true,
    
    // Notification Settings
    emailMarketing: true,
    emailSecurity: true,
    emailUpdates: true,
    pushOrders: true,
    pushMessages: true,
    pushAlerts: true
  })

  const tabs = [
    { id: 'general', label: 'General', icon: FiGlobe },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'appearance', label: 'Appearance', icon: FiSun },
    { id: 'advanced', label: 'Advanced', icon: FiDatabase }
  ]

  const handleSave = () => {
    localStorage.setItem('quantumdash_settings', JSON.stringify(settings))
    showToast('success', 'Settings Saved', 'Your settings have been saved successfully!')
  }

  const handleReset = () => {
    const defaultSettings = {
      appName: 'QuantumDash Pro',
      timezone: 'UTC-8',
      language: 'en-US',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12',
      theme: 'dark',
      twoFactor: false,
      sessionTimeout: '30',
      emailNotifications: true,
      pushNotifications: true,
      emailMarketing: true,
      emailSecurity: true,
      emailUpdates: true,
      pushOrders: true,
      pushMessages: true,
      pushAlerts: true
    }
    
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings(defaultSettings)
      showToast('info', 'Settings Reset', 'All settings have been reset to default values')
    }
  }

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">System Settings</h1>
        <p className="text-gray-400">Configure your application preferences, security, and system integrations</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="glass-card p-4">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-l-4 border-blue-500' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* Save Buttons */}
            <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
              <button
                onClick={handleSave}
                className="w-full btn-primary flex items-center justify-center"
              >
                <FiSave className="mr-2" />
                Save Changes
              </button>
              <button
                onClick={handleReset}
                className="w-full btn-secondary flex items-center justify-center"
              >
                <FiRefreshCw className="mr-2" />
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-6">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Application Name</label>
                  <input
                    type="text"
                    value={settings.appName}
                    onChange={(e) => handleChange('appName', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                    className="form-input"
                  >
                    <option value="UTC-5">UTC-5 (Eastern Time)</option>
                    <option value="UTC-8">UTC-8 (Pacific Time)</option>
                    <option value="UTC+0">UTC+0 (GMT)</option>
                    <option value="UTC+1">UTC+1 (Central European)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="form-input"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                    className="form-input"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Date Format</label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => handleChange('dateFormat', e.target.value)}
                    className="form-input"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Time Format</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={settings.timeFormat === '12'}
                        onChange={() => handleChange('timeFormat', '12')}
                        className="w-4 h-4"
                      />
                      <span>12-hour</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={settings.timeFormat === '24'}
                        onChange={() => handleChange('timeFormat', '24')}
                        className="w-4 h-4"
                      />
                      <span>24-hour</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <div className="font-semibold">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-400">Add an extra layer of security to your account</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactor}
                      onChange={(e) => handleChange('twoFactor', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Session Timeout</label>
                  <select
                    value={settings.sessionTimeout}
                    onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                    className="form-input"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="0">Never timeout</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-6">Appearance Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleChange('theme', 'dark')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        settings.theme === 'dark'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <FiMoon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Dark</div>
                    </button>
                    
                    <button
                      onClick={() => handleChange('theme', 'light')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        settings.theme === 'light'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <FiSun className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Light</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Settings */}
          {activeTab === 'advanced' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-6">Advanced Settings</h3>
              <div className="space-y-6">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FiDatabase className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="font-semibold text-red-400">Danger Zone</div>
                      <div className="text-sm text-gray-400">These settings can affect system stability</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Cache Settings</label>
                  <select className="form-input">
                    <option>Default (Recommended)</option>
                    <option>Aggressive</option>
                    <option>Disabled</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">API Rate Limit</label>
                  <select className="form-input">
                    <option>100 requests/minute</option>
                    <option>500 requests/minute</option>
                    <option>1000 requests/minute</option>
                    <option>Unlimited</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
