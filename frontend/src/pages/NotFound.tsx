import { Link } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'
import { FiHome, FiArrowLeft, FiSearch, FiUsers } from 'react-icons/fi'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F2EBE3] to-[#E07A5F] dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <Fade>
          <div className="text-center max-w-2xl mx-auto">
            {/* 404 Animation */}
            <div className="mb-8">
              <div className="relative">
                <div className="text-9xl font-bold text-[#E07A5F] dark:text-[#E07A5F] opacity-20">404</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">🔍</div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-[#3D5A80] dark:text-white mb-6">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <Link 
                to="/"
                className="group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-[#E07A5F] text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiHome className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#3D5A80] dark:text-white mb-2">Go Home</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Return to the homepage</p>
              </Link>

              <Link 
                to="/groups"
                className="group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-[#3D5A80] text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiUsers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#3D5A80] dark:text-white mb-2">Browse Groups</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Explore hobby groups</p>
              </Link>

              <button 
                onClick={() => window.history.back()}
                className="group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-500 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiArrowLeft className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#3D5A80] dark:text-white mb-2">Go Back</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Return to previous page</p>
              </button>
            </div>

            {/* Search Suggestion */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-lg font-semibold text-[#3D5A80] dark:text-white mb-4">
                Looking for something specific?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search for groups..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F] dark:bg-gray-700 dark:text-white"
                />
                <Link 
                  to="/groups"
                  className="btn btn-primary flex items-center justify-center space-x-2"
                >
                  <FiSearch className="w-4 h-4" />
                  <span>Search</span>
                </Link>
              </div>
            </div>

            {/* Popular Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#3D5A80] dark:text-white">
                Popular Pages
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/about" 
                  className="text-[#E07A5F] hover:text-[#cc6952] font-medium transition-colors duration-200"
                >
                  About Us
                </Link>
                <Link 
                  to="/contact" 
                  className="text-[#E07A5F] hover:text-[#cc6952] font-medium transition-colors duration-200"
                >
                  Contact
                </Link>
                <Link 
                  to="/support" 
                  className="text-[#E07A5F] hover:text-[#cc6952] font-medium transition-colors duration-200"
                >
                  Support
                </Link>
                <Link 
                  to="/login" 
                  className="text-[#E07A5F] hover:text-[#cc6952] font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-[#E07A5F] hover:text-[#cc6952] font-medium transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Error Code */}
            <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Error Code: 404 | If you believe this is an error, please contact our support team.
              </p>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  )
}

export default NotFound 