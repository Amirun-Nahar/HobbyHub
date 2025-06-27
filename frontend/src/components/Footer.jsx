import { Link } from 'react-router-dom'
import { FiUsers, FiHome, FiInfo, FiMail, FiHelpCircle, FiFacebook, FiLinkedin, FiTwitter, FiInstagram, FiGithub } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#E07A5F] rounded-lg flex items-center justify-center">
                <FiUsers className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#E07A5F]">HobbyHub</span>
            </div>
            <p className="text-gray-300 mb-4">
              Connect with people who share your passions. Join hobby communities and discover new interests.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E07A5F] transition-colors duration-200">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E07A5F] transition-colors duration-200">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E07A5F] transition-colors duration-200">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E07A5F] transition-colors duration-200">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E07A5F] transition-colors duration-200">
                <FiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E07A5F]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#E07A5F] transition-colors duration-200 flex items-center space-x-2">
                  <FiHome className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/groups" className="text-gray-300 hover:text-[#E07A5F] transition-colors duration-200 flex items-center space-x-2">
                  <FiUsers className="w-4 h-4" />
                  <span>All Groups</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#E07A5F] transition-colors duration-200 flex items-center space-x-2">
                  <FiInfo className="w-4 h-4" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#E07A5F] transition-colors duration-200 flex items-center space-x-2">
                  <FiMail className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-[#E07A5F] transition-colors duration-200 flex items-center space-x-2">
                  <FiHelpCircle className="w-4 h-4" />
                  <span>Support</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E07A5F]">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/groups?category=Art" className="text-gray-300 hover:text-[#E07A5F] transition-colors duration-200">
                  Art & Creativity
                </Link>
              </li>
              <li>
                <Link to="/groups?category=Music" className="text-gray-300 hover:text-[#E07A5F] transition-colors duration-200">
                  Music & Audio
                </Link>
              </li>
              <li>
                <Link to="/groups?category=Sports" className="text-gray-300 hover:text-[#E07A5F] transition-colors duration-200">
                  Sports & Fitness
                </Link>
              </li>
              <li>
                <Link to="/groups?category=Technology" className="text-gray-300 hover:text-[#E07A5F] transition-colors duration-200">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/groups?category=Books" className="text-gray-300 hover:text-[#E07A5F] transition-colors duration-200">
                  Books & Reading
                </Link>
              </li>
              <li>
                <Link to="/groups?category=Cooking" className="text-gray-300 hover:text-[#E07A5F] transition-colors duration-200">
                  Cooking & Food
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E07A5F]">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FiMail className="w-4 h-4 text-[#E07A5F]" />
                <span className="text-gray-300">info@hobbyhub.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMail className="w-4 h-4 text-[#E07A5F]" />
                <span className="text-gray-300">support@hobbyhub.com</span>
              </div>
              <p className="text-gray-300 text-sm">
                Join thousands of hobby enthusiasts and discover your next passion.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 HobbyHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-[#E07A5F] text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-[#E07A5F] text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-[#E07A5F] text-sm transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 