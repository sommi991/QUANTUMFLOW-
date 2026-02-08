import { useState } from 'react'
import { FiSearch, FiInbox, FiStar, FiSend, FiTrash2, FiMail, FiClock } from 'react-icons/fi'

const Email = () => {
  const [emails] = useState([
    { 
      id: 1, 
      sender: 'GitHub', 
      subject: 'Your repository was starred!', 
      preview: 'John Doe starred your repository quantumdash-pro', 
      time: '2 min ago', 
      unread: true, 
      starred: true 
    },
    { 
      id: 2, 
      sender: 'Netlify', 
      subject: 'Deploy successful', 
      preview: 'Your site quantumdash-pro.netlify.app has been deployed', 
      time: '1 hour ago', 
      unread: true, 
      starred: false 
    },
    { 
      id: 3, 
      sender: 'Stripe', 
      subject: 'Receipt for your payment', 
      preview: 'Thanks for your purchase. Here is your receipt...', 
      time: '3 hours ago', 
      unread: false, 
      starred: true 
    }
  ])
  
  const [folders] = useState([
    { id: 'inbox', label: 'Inbox', icon: FiInbox, count: 24 },
    { id: 'starred', label: 'Starred', icon: FiStar, count: 12 },
    { id: 'sent', label: 'Sent', icon: FiSend, count: 48 },
    { id: 'drafts', label: 'Drafts', icon: FiClock, count: 3 },
    { id: 'trash', label: 'Trash', icon: FiTrash2, count: 0 }
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Email</h1>
        <p className="text-gray-400">Manage your emails and communications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 glass-card p-4">
          <button className="w-full mb-6 btn-primary">
            <FiMail className="mr-2" />
            Compose
          </button>
          
          <div className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder.id}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <folder.icon className="w-5 h-5" />
                  <span>{folder.label}</span>
                </div>
                {folder.count > 0 && (
                  <span className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                    {folder.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Email List */}
        <div className="lg:col-span-3 glass-card p-0 overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search emails..."
                className="form-input pl-10"
              />
            </div>
          </div>
          
          {/* Emails */}
          <div className="divide-y divide-white/10">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${
                  email.unread ? 'bg-white/[0.02]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {email.sender.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold truncate">{email.sender}</div>
                      <div className="text-sm text-gray-400">{email.time}</div>
                    </div>
                    
                    <div className="font-medium mb-1">{email.subject}</div>
                    <div className="text-sm text-gray-400 truncate">{email.preview}</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
                      <FiStar className={`w-4 h-4 ${email.starred ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-gray-400">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Email
