import { useState, useRef, useEffect } from 'react'
import { FiSend, FiSearch, FiVideo, FiPhone, FiMoreVertical, FiImage, FiPaperclip } from 'react-icons/fi'

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi there! How can I help you today?', sender: 'ai', time: '10:00 AM' },
    { id: 2, text: 'I need help with the new dashboard setup', sender: 'user', time: '10:02 AM' },
    { id: 3, text: 'Sure! I can help you with that. What specific issues are you facing?', sender: 'ai', time: '10:03 AM' },
    { id: 4, text: 'The charts are not loading properly', sender: 'user', time: '10:05 AM' },
    { id: 5, text: 'Let me check that for you. Can you share a screenshot?', sender: 'ai', time: '10:06 AM' }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [contacts] = useState([
    { id: 1, name: 'John Doe', avatar: 'JD', status: 'online', lastSeen: 'Just now', unread: 3 },
    { id: 2, name: 'Sarah Smith', avatar: 'SS', status: 'online', lastSeen: '5 min ago', unread: 0 },
    { id: 3, name: 'Mike Johnson', avatar: 'MJ', status: 'offline', lastSeen: '2 hours ago', unread: 1 },
    { id: 4, name: 'Emma Wilson', avatar: 'EW', status: 'online', lastSeen: '30 min ago', unread: 0 }
  ])
  const [activeContact, setActiveContact] = useState(contacts[0])
  
  const messagesEndRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return
    
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages([...messages, newMsg])
    setNewMessage('')
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: 'Thanks for your message! I\'ll get back to you shortly.',
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="h-[calc(100vh-120px)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold gradient-text mb-2">Chat</h1>
        <p className="text-gray-400">Connect and collaborate with your team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100%-80px)]">
        {/* Contacts Sidebar */}
        <div className="lg:col-span-1 glass-card overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="form-input pl-10"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-80px)]">
            <div className="p-2">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setActiveContact(contact)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors ${
                    activeContact.id === contact.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {contact.avatar}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      contact.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{contact.name}</div>
                    <div className="text-sm text-gray-400">
                      {contact.status === 'online' ? 'Online' : `Last seen ${contact.lastSeen}`}
                    </div>
                  </div>
                  
                  {contact.unread > 0 && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-xs text-white flex items-center justify-center">
                      {contact.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col glass-card overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {activeContact.avatar}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  activeContact.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                }`} />
              </div>
              <div>
                <div className="font-semibold">{activeContact.name}</div>
                <div className="text-sm text-gray-400">
                  {activeContact.status === 'online' ? 'Online' : `Last seen ${activeContact.lastSeen}`}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <FiVideo className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <FiPhone className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <FiMoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-none'
                      : 'bg-white/5 text-white rounded-tl-none'
                  }`}>
                    <div className="text-sm mb-1 opacity-90">{message.text}</div>
                    <div className="text-xs opacity-70 text-right">{message.time}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-3">
              <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <FiImage className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <FiPaperclip className="w-5 h-5" />
                </button>
              </div>
              
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="form-input flex-1"
              />
              
              <button
                onClick={sendMessage}
                className="btn-primary flex items-center"
              >
                <FiSend className="mr-2" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
