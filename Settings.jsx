import { useState } from 'react'
import { FiSave, FiRefreshCw } from 'react-icons/fi'

const Settings = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    appName: 'QuantumDash Pro',
    timezone: 'UTC-8',
    language: 'en-US',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12',
    theme: 'dark',
    sidebarStyle: 'expanded',
    twoFactorAuth: false,
    sessionTimeout: 30,
    emailNotifications: true,
    pushNotifications: true,
    emailMarketing: true,
    emailSecurity: true,
    emailUpdates: true,
    pushOrders: true,
    pushMessages: true,
    pushAlerts: true
  })

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'advanced', label: 'Advanced' }
  ]

  const handleSave = () => {
    localStorage.setItem('quantumdash_settings', JSON.stringify(settings))
    showToast('success', 'Settings Saved', 'Your settings have been saved successfully')
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
      sidebarStyle: 'expanded',
      twoFactorAuth: false,
      sessionTimeout: 30,
      emailNotifications: true,
      pushNotifications: true,
      emailMarketing: true,
      emailSecurity: true,
      emailUpdates: true,
      pushOrders: true,
      pushMessages: true,
      pushAlerts: true
    }
    setSettings(defaultSettings)
    showToast('info', 'Settings Reset', 'Settings have been reset to defaults')
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">System Settings</h1>
        <p className="text-gray-400">Configure your application preferences, security, and system integrations.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-t-xl font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white/10 text-white border-b-2 border-primary-blue'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="glass-card p-6">
        {activeTab === 'general' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Application Settings */}
              <div>
                <h3 className="text-lg font-bold mb-6">Application Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Application Name
                    </label>
                    <input
                      type="text"
                      value={settings.appName}
                      onChange={(e) => setSettings({...settings, appName: e.target.value})}
                      className="form-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Timezone
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                      className="form-input"
                    >
                      <option value="UTC-5">UTC-5 (Eastern Time)</option>
                      <option value="UTC-8">UTC-8 (Pacific Time)</option>
                      <option value="UTC+0">UTC+0 (GMT)</option>
                      <option value="UTC+1">UTC+1 (Central European)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({...settings, language: e.target.value})}
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
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Currency
                    </label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({...settings, currency: e.target.value})}
                      className="form-input"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="CAD">CAD (C$)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Display Settings */}
              <div>
                <h3 className="text-lg font-bold mb-6">Display Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Theme
                    </label>
                    <div className="flex gap-2">
                      {['dark', 'light', 'auto'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => setSettings({...settings, theme})}
                          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                            settings.theme === theme
                              ? 'bg-primary-blue text-white'
                              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Sidebar Style
                    </label>
                    <select
                      value={settings.sidebarStyle}
                      onChange={(e) => setSettings({...settings, sidebarStyle: e.target.value})}
                      className="form-input"
                    >
                      <option value="expanded">Expanded</option>
                      <option value="collapsed">Collapsed</option>
                      <option value="auto">Auto-hide</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Date Format
                    </label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
                      className="form-input"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Time Format
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={settings.timeFormat === '12'}
                          onChange={() => setSettings({...settings, timeFormat: '12'})}
                          className="w-4 h-4"
                        />
                        <span>12-hour</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={settings.timeFormat === '24'}
                          onChange={() => setSettings({...settings, timeFormat: '24'})}
                          className="w-4 h-4"
                        />
                        <span>24-hour</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h3 className="text-lg font-bold mb-6">Security Settings</h3>
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-400">
                      Add an extra layer of security to your account
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Session Timeout
                </label>
                <select
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                  className="form-input"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="0">Never timeout</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Login Notifications
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                      className="w-4 h-4 rounded bg-white/5 border border-white/10"
                    />
                    <span>Email me about new sign-ins</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})}
                      className="w-4 h-4 rounded bg-white/5 border border-white/10"
                    />
                    <span>Send push notifications for new devices</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <h3 className="text-lg font-bold mb-6">Notification Preferences</h3>
            <div className="space-y-8">
              <div>
                <h4 className="font-semibold mb-4">Email Notifications</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailMarketing}
                      onChange={(e) => setSettings({...settings, emailMarketing: e.target.checked})}
                      className="w-4 h-4 rounded bg-white/5 border border-white/10"
                    />
                    <span>Marketing and promotional emails</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailSecurity}
                      onChange={(e) => setSettings({...settings, emailSecurity: e.target.checked})}
                      className="w-4 h-4 rounded bg-white/5 border border-white/10"
                    />
                    <span>Security alerts</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailUpdates}
                      onChange={(e) => setSettings({...settings, emailUpdates: e.target.checked})}
                      className="w-4 h-4 rounded bg-white/5 border border-white/10"
                    />
                    <span>Product updates and news</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Push Notifications</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushOrders}
                      onChange={(e) => setSettings({...settings, pushOrders: e.target.checked})}
                      className="w-4 h-4 rounded bg-white/5 border border-white/10"
                    />
                    <span>New orders</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushMessages}
                      onChange={(e) => setSettings({...settings, pushMessages: e.target.checked})}
                      className="w-4 h-4 rounded bg-white/5 border border-white/10"
                    />
                    <span>Messages</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushAlerts}
                      onChange={(e) => setSettings({...settings, pushAlerts: e.target.checked})}
                      className="w-4 h-4 rounded bg-white/5 border border-white/10"
                    />
                    <span>System alerts</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Buttons */}
        <div className="pt-8 mt-8 border-t border-white/10 flex justify-end gap-4">
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center gap-2"
          >
            <FiRefreshCw className="w-4 h-4" />
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex items-center gap-2"
          >
            <FiSave className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings