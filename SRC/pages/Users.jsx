import { useState, useEffect } from 'react'
import { FiSearch, FiFilter, FiDownload, FiPlus, FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import Modal from '../components/Modal'

const Users = ({ showToast }) => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Initial mock data
  const initialUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      role: 'admin',
      status: 'active',
      lastActive: '2 hours ago',
      joinDate: '2024-01-15',
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      role: 'manager',
      status: 'active',
      lastActive: '1 day ago',
      joinDate: '2024-01-20',
      avatar: 'JS'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '+1 (555) 456-7890',
      role: 'editor',
      status: 'pending',
      lastActive: '3 days ago',
      joinDate: '2024-02-01',
      avatar: 'RJ'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+1 (555) 321-6547',
      role: 'viewer',
      status: 'inactive',
      lastActive: '1 week ago',
      joinDate: '2024-02-10',
      avatar: 'SW'
    }
  ]

  useEffect(() => {
    setUsers(initialUsers)
    setFilteredUsers(initialUsers)
  }, [])

  useEffect(() => {
    let result = users
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.toLowerCase().includes(searchLower)
      )
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter)
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter)
    }
    
    setFilteredUsers(result)
  }, [search, statusFilter, roleFilter, users])

  const handleAddUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      avatar: userData.name.split(' ').map(n => n[0]).join(''),
      lastActive: 'Just now',
      joinDate: new Date().toISOString().split('T')[0]
    }
    
    setUsers([newUser, ...users])
    setShowAddModal(false)
    showToast('success', 'User Added', `${userData.name} has been added successfully!`)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    showToast('info', 'Edit User', `Editing ${user.name} - Implement edit functionality`)
  }

  const handleDeleteUser = (user) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id))
    setShowDeleteModal(false)
    showToast('success', 'User Deleted', `${selectedUser.name} has been removed`)
    setSelectedUser(null)
  }

  const getStatusBadge = (status) => {
    const classes = {
      active: 'status-active',
      pending: 'status-pending',
      inactive: 'status-inactive'
    }
    return (
      <span className={`status-badge ${classes[status] || 'status-inactive'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getRoleBadge = (role) => {
    const colors = {
      admin: 'from-blue-500 to-cyan-500',
      manager: 'from-purple-500 to-pink-500',
      editor: 'from-green-500 to-emerald-500',
      viewer: 'from-gray-500 to-gray-700'
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${colors[role] || 'from-gray-500 to-gray-700'} text-white`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">User Management</h1>
        <p className="text-gray-400">Manage user accounts, roles, and permissions with full CRUD operations</p>
      </div>

      {/* Controls */}
      <div className="glass-card p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex-1 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="form-input"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => showToast('info', 'Export', 'Export functionality would be implemented')}
              className="btn-secondary flex items-center"
            >
              <FiDownload className="mr-2" />
              Export CSV
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center"
            >
              <FiPlus className="mr-2" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card p-6">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Status</th>
                <th>Activity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-400">Joined {user.joinDate}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="font-medium">{user.email}</div>
                      <div className="text-sm text-gray-400">{user.phone}</div>
                    </div>
                  </td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>
                    <div className="text-sm">
                      <div className="font-medium">Last Active</div>
                      <div className="text-gray-400">{user.lastActive}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        title="Edit"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors text-red-400"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    No users found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
          <div className="text-sm text-gray-400">
            Showing {filteredUsers.length} of {users.length} users
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              2
            </button>
            <button className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
      >
        <form onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target)
          const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            role: formData.get('role'),
            status: formData.get('status')
          }
          handleAddUser(userData)
          e.target.reset()
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                name="name"
                type="text"
                required
                className="form-input"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                name="email"
                type="email"
                required
                className="form-input"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                name="phone"
                type="tel"
                className="form-input"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <select name="role" className="form-input" required>
                  <option value="">Select Role</option>
                  <option value="admin">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select name="status" className="form-input">
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3">Permissions</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded bg-white/5 border-white/10" />
                  <span className="text-sm">Read Access</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded bg-white/5 border-white/10" />
                  <span className="text-sm">Write Access</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded bg-white/5 border-white/10" />
                  <span className="text-sm">Delete Access</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save User
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
        size="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
            <FiTrash2 className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Delete User</h3>
          <p className="text-gray-400 mb-6">
            Are you sure you want to delete <span className="font-semibold text-white">{selectedUser?.name}</span>? This action cannot be undone.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="btn-primary flex-1 bg-gradient-to-r from-red-500 to-pink-500"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Users
