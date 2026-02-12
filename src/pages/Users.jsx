
import React, { useState } from 'react'
import {
  FiUsers, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar,
  FiShoppingBag, FiDollarSign, FiStar, FiSearch, FiPlus,
  FiEdit, FiTrash2, FiEye, FiFilter, FiDownload, FiMoreVertical,
  FiCheckCircle, FiXCircle, FiShield, FiLock, FiUnlock,
  FiAward, FiMessageCircle, FiTag, FiClock
} from 'react-icons/fi'

const Users = ({ showToast }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [users, setUsers] = useState([
    {
      id: 'USR-001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 555-0123',
      role: 'admin',
      status: 'active',
      avatar: null,
      lastActive: '2024-03-15 14:23',
      joined: '2023-06-15',
      orders: 45,
      spent: 12450.75,
      permissions: ['all'],
      twoFactor: true,
      department: 'Management'
    },
    {
      id: 'USR-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 555-0456',
      role: 'manager',
      status: 'active',
      avatar: null,
      lastActive: '2024-03-15 11:42',
      joined: '2023-08-22',
      orders: 28,
      spent: 8345.50,
      permissions: ['orders', 'products', 'customers'],
      twoFactor: true,
      department: 'Sales'
    },
    {
      id: 'USR-003',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+1 555-0789',
      role: 'editor',
      status: 'active',
      avatar: null,
      lastActive: '2024-03-14 09:15',
      joined: '2023-11-10',
      orders: 12,
      spent: 2345.25,
      permissions: ['products'],
      twoFactor: false,
      department: 'Content'
    },
    {
      id: 'USR-004',
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      phone: '+1 555-0987',
      role: 'customer',
      status: 'inactive',
      avatar: null,
      lastActive: '2024-03-01 16:30',
      joined: '2024-01-05',
      orders: 3,
      spent: 450.00,
      permissions: [],
      twoFactor: false,
      department: null
    },
    {
      id: 'USR-005',
      name: 'David Lee',
      email: 'david.lee@example.com',
      phone: '+1 555-0654',
      role: 'customer',
      status: 'active',
      avatar: null,
      lastActive: '2024-03-15 10:05',
      joined: '2024-02-18',
      orders: 5,
      spent: 890.50,
      permissions: [],
      twoFactor: false,
      department: null
    }
  ])

  const roles = [
    { id: 'admin', name: 'Administrator', color: 'text-red-400', bg: 'bg-red-500/10' },
    { id: 'manager', name: 'Manager', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { id: 'editor', name: 'Editor', color: 'text-green-400', bg: 'bg-green-500/10' },
    { id: 'customer', name: 'Customer', color: 'text-gray-400', bg: 'bg-gray-500/10' }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddUser = (userData) => {
    const newUser = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      ...userData,
      joined: new Date().toISOString().split('T')[0],
      orders: 0,
      spent: 0,
      lastActive: new Date().toLocaleString()
    }
    setUsers([newUser, ...users])
    setShowUserModal(false)
    showToast?.('✅ User added successfully!', 'success')
  }

  const handleUpdateUser = (userData) => {
    setUsers(users.map(u => u.id === userData.id ? { ...u, ...userData } : u))
    setShowUserModal(false)
    setSelectedUser(null)
    showToast?.('✅ User updated successfully!', 'success')
  }

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId))
    setShowDeleteModal(false)
    showToast?.('✅ User deleted successfully!', 'success')
  }

  const handleToggleStatus = (userId) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ))
    showToast?.('✅ User status updated!', 'success')
  }

  const handleToggleTwoFactor = (userId) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, twoFactor: !u.twoFactor }
        : u
    ))
    showToast?.('✅ Two-factor authentication updated!', 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">User Management</h1>
          <p className="text-gray-400">Manage your team members and customers</p>
        </div>
        
        <button
          onClick={() => {
            setSelectedUser(null)
            setShowUserModal(true)
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-all flex items-center gap-2 self-start"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <FiPlus className="w-5 h-5" />
          Add New User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold">{users.length}</div>
              <div className="text-sm text-gray-400">Total Users</div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {users.filter(u => u.status === 'active').length}
              </div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <FiShield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {users.filter(u => u.role === 'admin' || u.role === 'manager').length}
              </div>
              <div className="text-sm text-gray-400">Administrators</div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <FiShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {users.reduce((sum, u) => sum + u.orders, 0)}
              </div>
              <div className="text-sm text-gray-400">Total Orders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none transition-colors"
              style={{ pointerEvents: 'auto' }}
            />
          </div>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none transition-colors"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}s</option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none transition-colors"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-left text-sm font-semibold text-gray-400">User</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-400">Role</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-400">Contact</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-400">2FA</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-400">Orders</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-400">Spent</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-400">Last Active</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      roles.find(r => r.id === user.role)?.bg || 'bg-gray-500/10'
                    } ${roles.find(r => r.id === user.role)?.color || 'text-gray-400'}`}>
                      {roles.find(r => r.id === user.role)?.name || user.role}
                    </span>
                    {user.department && (
                      <div className="text-xs text-gray-500 mt-1">{user.department}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="text-sm">{user.email}</div>
                    <div className="text-xs text-gray-400">{user.phone}</div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        user.status === 'active' 
                          ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                          : 'bg-gray-500/10 text-gray-400 hover:bg-gray-500/20'
                      }`}
                      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                    >
                      {user.status === 'active' ? <FiCheckCircle className="w-3 h-3" /> : <FiXCircle className="w-3 h-3" />}
                      {user.status}
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleTwoFactor(user.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        user.twoFactor 
                          ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                          : 'bg-gray-500/10 text-gray-400 hover:bg-gray-500/20'
                      }`}
                      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                    >
                      {user.twoFactor ? <FiLock className="w-3 h-3" /> : <FiUnlock className="w-3 h-3" />}
                      {user.twoFactor ? 'Enabled' : 'Disabled'}
                    </button>
                  </td>
                  <td className="p-4 font-semibold">{user.orders}</td>
                  <td className="p-4 font-semibold text-blue-400">${user.spent.toFixed(2)}</td>
                  <td className="p-4 text-sm text-gray-400">{user.lastActive}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setShowUserModal(true)
                        }}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setShowDeleteModal(true)
                        }}
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <UserModal
          user={selectedUser}
          roles={roles}
          onSave={selectedUser ? handleUpdateUser : handleAddUser}
          onClose={() => {
            setShowUserModal(false)
            setSelectedUser(null)
          }}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedUser && (
        <DeleteModal
          userName={selectedUser.name}
          onConfirm={() => handleDeleteUser(selectedUser.id)}
          onCancel={() => {
            setShowDeleteModal(false)
            setSelectedUser(null)
          }}
        />
      )}
    </div>
  )
}

const UserModal = ({ user, roles, onSave, onClose }) => {
  const [formData, setFormData] = useState(user || {
    name: '',
    email: '',
    phone: '',
    role: 'customer',
    status: 'active',
    department: '',
    twoFactor: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FiUser className="w-5 h-5" />
              {user ? 'Edit User' : 'Add New User'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  required
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  required
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                  required
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="form-input"
                  required
                  style={{ pointerEvents: 'auto' }}
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-input"
                  style={{ pointerEvents: 'auto' }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Department</label>
                <input
                  type="text"
                  value={formData.department || ''}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Sales, Marketing"
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="twoFactor"
                  checked={formData.twoFactor}
                  onChange={(e) => setFormData({ ...formData, twoFactor: e.target.checked })}
                  className="w-5 h-5 rounded border-white/10 bg-white/5"
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                />
                <label htmlFor="twoFactor" className="text-sm text-gray-400">
                  Enable Two-Factor Authentication
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                <FiSave className="inline w-4 h-4 mr-2" />
                {user ? 'Update User' : 'Add User'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const DeleteModal = ({ userName, onConfirm, onCancel }) => (
  <div className="modal-overlay" onClick={onCancel}>
    <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
      <div className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
          <FiTrash2 className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Delete User</h3>
        <p className="text-gray-400 mb-6">
          Are you sure you want to delete <span className="font-semibold text-white">{userName}</span>? 
          This action cannot be undone.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
)

import { FiX, FiSave } from 'react-icons/fi'
export default Users
