import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'
import { FiUsers, FiPlus, FiList, FiBarChart, FiCalendar, FiMapPin } from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'

interface Group {
  _id: string
  name: string
  description: string
  imageURL: string
  members: string[]
  maxMembers: number
  startDate: string
  location: string
  category: string
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [myGroups, setMyGroups] = useState<Group[]>([])
  const [allGroups, setAllGroups] = useState<Group[]>([])
  const [stats, setStats] = useState({
    totalGroups: 0,
    myGroups: 0,
    totalMembers: 0,
    upcomingEvents: 0
  })
  const { user } = useAuth()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Always fetch all groups (public)
      const groupsRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/groups`)
      setAllGroups(groupsRes.data)

      // Only fetch protected endpoints if user is present
      if (user) {
        const token = await user.getIdToken();
        const [createdRes, joinedRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/groups/user/created`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/groups/user/joined`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])
        // Merge created and joined groups, removing duplicates by _id
        const mergedGroups = [
          ...createdRes.data,
          ...joinedRes.data.filter((jg: Group) => !createdRes.data.some((cg: Group) => cg._id === jg._id))
        ]
        setMyGroups(mergedGroups)
        setStats((prev) => ({
          ...prev,
          myGroups: mergedGroups.length
        }))
      } else {
        setMyGroups([])
        setStats((prev) => ({
          ...prev,
          myGroups: 0
        }))
      }

      // Calculate stats
      const totalMembers = groupsRes.data.reduce((acc: number, group: Group) => acc + group.members.length, 0)
      const upcomingEvents = groupsRes.data.filter((group: Group) => 
        new Date(group.startDate) > new Date()
      ).length

      setStats((prev) => ({
        ...prev,
        totalGroups: groupsRes.data.length,
        totalMembers,
        upcomingEvents
      }))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  const statsCards = [
    {
      icon: FiUsers,
      title: 'Total Groups',
      value: stats.totalGroups,
      color: 'bg-blue-500',
      description: 'All available groups'
    },
    {
      icon: FiList,
      title: 'My Groups',
      value: stats.myGroups,
      color: 'bg-green-500',
      description: 'Groups you\'ve joined'
    },
    {
      icon: FiBarChart,
      title: 'Total Members',
      value: stats.totalMembers,
      color: 'bg-purple-500',
      description: 'Active community members'
    },
    {
      icon: FiCalendar,
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      color: 'bg-orange-500',
      description: 'Events starting soon'
    }
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FiBarChart },
    { id: 'all-groups', name: 'All Groups', icon: FiList },
    { id: 'my-groups', name: 'My Groups', icon: FiUsers },
    { id: 'add-group', name: 'Add Group', icon: FiPlus }
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#E07A5F] to-[#3D5A80] text-white p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.displayName || 'User'}!</h2>
        <p className="text-xl opacity-90">Here's what's happening in your hobby communities.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-[#3D5A80] dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-[#3D5A80] dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {myGroups.slice(0, 3).map((group) => (
            <div key={group._id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <img src={group.imageURL} alt={group.name} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1">
                <h4 className="font-medium text-[#3D5A80] dark:text-white">{group.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{group.members.length} members</p>
              </div>
              <Link 
                to={`/groups/${group._id}`}
                className="text-[#E07A5F] hover:text-[#cc6952] text-sm font-medium"
              >
                View →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAllGroups = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#3D5A80] dark:text-white">All Groups</h2>
        <div className="flex space-x-2">
          <select className="input w-auto">
            <option>All Categories</option>
            <option>Art</option>
            <option>Music</option>
            <option>Sports</option>
            <option>Technology</option>
          </select>
          <select className="input w-auto">
            <option>Sort by</option>
            <option>Name A-Z</option>
            <option>Name Z-A</option>
            <option>Most Members</option>
            <option>Newest</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allGroups.map((group) => (
          <div key={group._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src={group.imageURL} alt={group.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#3D5A80] dark:text-white mb-2">{group.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{group.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center">
                  <FiUsers className="mr-1" />
                  {group.members.length}/{group.maxMembers}
                </span>
                <span className="flex items-center">
                  <FiMapPin className="mr-1" />
                  {group.location}
                </span>
              </div>
              <Link 
                to={`/groups/${group._id}`}
                className="btn btn-primary w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMyGroups = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#3D5A80] dark:text-white">My Groups</h2>
        <Link to="/create-group" className="btn btn-primary">
          <FiPlus className="w-4 h-4 mr-2" />
          Create New Group
        </Link>
      </div>
      
      {myGroups.length === 0 ? (
        <div className="text-center py-12">
          <FiUsers className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-[#3D5A80] dark:text-white mb-2">No Groups Yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Start by joining some groups or create your own!</p>
          <div className="flex space-x-4 justify-center">
            <Link to="/groups" className="btn btn-primary">
              Browse Groups
            </Link>
            <Link to="/create-group" className="btn btn-secondary">
              Create Group
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myGroups.map((group) => (
            <div key={group._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src={group.imageURL} alt={group.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#3D5A80] dark:text-white mb-2">{group.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{group.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center">
                    <FiUsers className="mr-1" />
                    {group.members.length}/{group.maxMembers}
                  </span>
                  <span className="flex items-center">
                    <FiMapPin className="mr-1" />
                    {group.location}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    to={`/groups/${group._id}`}
                    className="btn btn-primary flex-1"
                  >
                    View
                  </Link>
                  <Link 
                    to={`/update-group/${group._id}`}
                    className="btn btn-secondary flex-1"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderAddGroup = () => (
    <div className="text-center py-12">
      <FiPlus className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-[#3D5A80] dark:text-white mb-2">Create a New Group</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Start your own hobby community and bring people together!</p>
      <Link to="/create-group" className="btn btn-primary text-lg px-8 py-3">
        <FiPlus className="w-5 h-5 mr-2" />
        Create New Group
      </Link>
    </div>
  )

  return (
    <div className="pt-16">
      <div className="container">
        <Fade>
          {/* Tab Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 whitespace-nowrap border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#E07A5F] text-[#E07A5F]'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-[#E07A5F]'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'all-groups' && renderAllGroups()}
            {activeTab === 'my-groups' && renderMyGroups()}
            {activeTab === 'add-group' && renderAddGroup()}
          </div>
        </Fade>
      </div>
    </div>
  )
}

export default Dashboard 