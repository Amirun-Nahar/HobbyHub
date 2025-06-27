import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FiMenu, FiX, FiSun, FiMoon, FiHome, FiUsers, FiInfo, FiMail, FiHelpCircle, FiBarChart } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    } else {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    }
    setIsDark(!isDark)
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      toast.error('Failed to log out')
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-white dark:bg-gray-800 shadow-md'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#E07A5F] rounded-lg flex items-center justify-center">
                <FiUsers className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#E07A5F] dark:text-[#E07A5F]">HobbyHub</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="nav-link flex items-center space-x-1">
                <FiHome className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link to="/groups" className="nav-link flex items-center space-x-1 whitespace-nowrap">
                <FiUsers className="w-4 h-4" />
                <span>All Groups</span>
              </Link>
              <Link to="/about" className="nav-link flex items-center space-x-1 whitespace-nowrap">
                <FiInfo className="w-4 h-4" />
                <span>About Us</span>
              </Link>
              <Link to="/contact" className="nav-link flex items-center space-x-1">
                <FiMail className="w-4 h-4" />
                <span>Contact</span>
              </Link>
              <Link to="/support" className="nav-link flex items-center space-x-1">
                <FiHelpCircle className="w-4 h-4" />
                <span>Support</span>
              </Link>
              
              {user && (
                <>
                  <Link to="/dashboard" className="nav-link flex items-center space-x-1">
                    <FiBarChart className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/create-group" className="nav-link">Create Group</Link>
                  <Link to="/my-groups" className="nav-link">My Groups</Link>
                </>
              )}
              
              {!user ? (
                <>
                  <Link to="/login" className="btn btn-primary">Login</Link>
                  <Link to="/register" className="btn btn-secondary">Register</Link>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="relative group">
                      <img 
                        src={user.photoURL || ''} 
                        alt={user.displayName || 'User'} 
                        className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-[#E07A5F] transition-all duration-200" 
                      />
                      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        {user.displayName || 'User'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary flex items-center space-x-2"
                  >
                    Logout
                  </button>
                </>
              )}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute w-full bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="mobile-nav-link flex items-center space-x-2">
              <FiHome className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/groups" className="mobile-nav-link flex items-center space-x-2">
              <FiUsers className="w-4 h-4" />
              <span>All Groups</span>
            </Link>
            <Link to="/about" className="mobile-nav-link flex items-center space-x-2">
              <FiInfo className="w-4 h-4" />
              <span>About Us</span>
            </Link>
            <Link to="/contact" className="mobile-nav-link flex items-center space-x-2">
              <FiMail className="w-4 h-4" />
              <span>Contact</span>
            </Link>
            <Link to="/support" className="mobile-nav-link flex items-center space-x-2">
              <FiHelpCircle className="w-4 h-4" />
              <span>Support</span>
            </Link>
            
            {user && (
              <>
                <Link to="/dashboard" className="mobile-nav-link flex items-center space-x-2">
                  <FiBarChart className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/create-group" className="mobile-nav-link">Create Group</Link>
                <Link to="/my-groups" className="mobile-nav-link">My Groups</Link>
              </>
            )}
            
            {!user ? (
              <>
                <Link to="/login" className="mobile-nav-link">Login</Link>
                <Link to="/register" className="mobile-nav-link">Register</Link>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 px-3 py-2">
                  <img 
                    src={user.photoURL || ''} 
                    alt={user.displayName || 'User'} 
                    className="w-8 h-8 rounded-full" 
                  />
                  <span className="text-gray-800 dark:text-gray-200">
                    {user.displayName || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="mobile-nav-link text-red-600 dark:text-red-400"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 