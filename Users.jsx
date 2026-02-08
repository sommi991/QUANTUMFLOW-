import { useState } from 'react'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import { FiSearch, FiFilter } from 'react-icons/fi'

const Users = ({ showToast }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      role: 'admin',
      status: 'active',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      role: 'manager',
      status: 'active',
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '+1 (555) 456-7890',
      role: 'editor',
      status: 'pending',
      lastActive: '3 days ago'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+1 (555) 321-6547',
      role: 'viewer',
      status: 'inactive',
      lastActive: '1 week ago'
    }
  ])

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active'
  })

  const filteredUsers = users.filter(user => {
    const matchesSearch = search === '' || 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    
    return matchesSearch && matchesStatus && matchesRole
  })

  const userColumns = [
    {
      key: 'name',
      title: 'User',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center text-white text-xs font-bold">
            {row.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-semibold">{value}</div>
            <div className="text-xs text-gray-400">{row.phone}</div>
          </div>
        </div>
      )
    },
    { key: 'email', title: 'Email' },
    { 
      key: 'role', 
      title: 'Role',
      render: (value) => (
        <span className="status-badge bg-blue-500/10 text-blue-400">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (value) => (
        <span className={`status-badge ${
          value === 'active' ? 'status-active' :
          value === 'pending' ? 'status-pending' :
          'status-inactive'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    { key: 'lastActive', title: 'Last Active' }
  ]

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      showToast('error', 'Validation Error', 'Please fill in all required fields')
      return
    }

    const newUserObj = {
      ...newUser,
      id: users.length + 1,
      lastActive: 'Just now'
    }

    setUsers([newUserObj, ...users])
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'user',
      status: 'active'
    })
    setShowAddModal(false)
    showToast('success', 'User Added', `${newUser.name} has been added successfully`)
  }

  const handleDeleteUser = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id))
    setShowDeleteModal(false)
    setSelectedUser(null)
    showToast('success', 'User Deleted', 'User has been deleted successfully')
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">User Management</h1>
        <p className="text-gray-400">Manage user accounts, roles, and permissions with full CRUD operations.</p>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-10 w-64"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input w-32"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="form-input w-32"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          
          <div className="flex gap-3">
            <button className="btn-secondary">
              Export CSV
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <DataTable
        columns={userColumns}
        data={filteredUsers}
        onView={(user) => {
          setSelectedUser(user)
          showToast('info', 'View User', `Viewing ${user.name}'s details`)
        }}
        onEdit={(user) => {
          setSelectedUser(user)
          showToast('info', 'Edit User', `Editing ${user.name}`)
        }}
        onDelete={(user) => {
          setSelectedUser(user)
          setShowDeleteModal(true)
        }}
      />

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              className="form-input"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="form-input"
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={newUser.phone}
              onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
              className="form-input"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className="form-input"
              >
                <option value="admin">Administrator</option>
                <option value="manager">Manager</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
                <option value="user">User</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status
              </label>
              <select
                value={newUser.status}
                onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                className="form-input"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3">
            <button
              onClick={() => setShowAddModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleAddUser}
              className="btn-primary"
            >
              Add User
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedUser(null)
        }}
        title="Confirm Delete"
        size="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <FiAlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          
          <h4 className="text-lg font-semibold mb-2">Delete User</h4>
          <p className="text-gray-400 mb-6">
            Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
          </p>
          
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setShowDeleteModal(false)
                setSelectedUser(null)
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteUser}
              className="btn-primary bg-gradient-to-r from-red-500 to-pink-500"
            >
              Delete User
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Users