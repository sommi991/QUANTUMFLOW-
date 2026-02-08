import { useState } from 'react'
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit, FiSave, FiUpload, FiCreditCard, FiClock, FiSettings } from 'react-icons/fi'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@quantumdash.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    role: 'Administrator',
    joinDate: '2024-01-15',
    avatar: 'JD',
    bio: 'Senior administrator with expertise in system management and data analytics. Passionate about creating efficient workflows and optimizing business processes.'
  })

  const recentActivity = [
    { id: 1, action: 'Updated profile settings', time: '10 minutes ago', icon: FiSettings },
    { id: 2, action: 'Created new dashboard', time: '2 hours ago', icon: FiUser },
    { id: 3, action: 'Added new user account', time: 'Yesterday', icon: FiUser },
    { id: 4, action: 'Generated monthly report', time: '2 days ago', icon: FiClock }
  ]

  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', default: true },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '08/24', default: false }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">User Profile</h1>
        <p className="text-gray-400">Manage your personal information and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold mx-auto">
                  {user.avatar}
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/90 text-gray-800 flex items-center justify-center hover:bg-white transition-colors">
                  <FiUpload className="w-5 h-5" />
                </button>
              </div>
              
              <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
              <div className="text-gray-400 mb-3">{user.role}</div>
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full inline-block">
                <span className="text-sm font-semibold">Premium User</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <FiMail className="w-5 h-5" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FiPhone className="w-5 h-5" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FiMapPin className="w-5 h-5" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FiCalendar className="w-5 h-5" />
                <span>Joined {user.joinDate}</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full mt-6 btn-primary flex items-center justify-center"
            >
              {isEditing ? (
                <>
                  <FiSave className="mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <FiEdit className="mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        {/* Middle Column - Bio & Activity */}
        <div className="lg:col-span-2">
          {/* Bio Section */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">About</h3>
              {isEditing && (
                <button className="text-sm text-primary-blue hover:text-primary-purple transition-colors">
                  Edit Bio
                </button>
              )}
            </div>
            
            <p className="text-gray-300 leading-relaxed">{user.bio}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-primary-blue">24</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-primary-purple">128</div>
                <div className="text-sm text-gray-400">Connections</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-green-400">89%</div>
                <div className="text-sm text-gray-400">Completion</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-yellow-400">A+</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <activity.icon className="w-5 h-5 text-primary-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{activity.action}</div>
                    <div className="text-sm text-gray-400">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="glass-card p-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Payment Methods</h3>
          <button className="text-sm btn-secondary">
            <FiCreditCard className="mr-2" />
            Add New Card
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className={`p-4 rounded-xl border-2 transition-all ${
              method.default 
                ? 'border-primary-blue bg-primary-blue/5' 
                : 'border-white/10 bg-white/5'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center">
                    <span className="font-bold text-sm">{method.type}</span>
                  </div>
                  <div>
                    <div className="font-semibold">•••• {method.last4}</div>
                    <div className="text-sm text-gray-400">Expires {method.expiry}</div>
                  </div>
                </div>
                {method.default && (
                  <span className="px-3 py-1 bg-primary-blue/10 text-primary-blue rounded-full text-sm">
                    Default
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 py-2 text-sm bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  Edit
                </button>
                {!method.default && (
                  <button className="flex-1 py-2 text-sm bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    Set Default
                  </button>
                )}
                <button className="flex-1 py-2 text-sm bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
