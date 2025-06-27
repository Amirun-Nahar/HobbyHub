import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUsers, FiCalendar, FiMapPin, FiSearch, FiFilter, FiArrowUp, FiArrowDown, FiGrid, FiList } from 'react-icons/fi';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';
import { auth } from '../config/firebase.config';

// Create axios instance with base URL and auth interceptor
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Add request interceptor to add token
api.interceptors.request.use(async (config) => {
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken(true);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const categories = [
  'All',
  'Art',
  'Music',
  'Sports',
  'Technology',
  'Books',
  'Gaming',
  'Cooking',
  'Fitness',
  'Photography',
  'Other'
];

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [retryCount, setRetryCount] = useState(0);
  const groupsListRef = useRef(null);

  useEffect(() => {
    const delay = retryCount === 0 ? 0 : Math.min(1000 * Math.pow(2, retryCount), 10000);
    const timeoutId = setTimeout(fetchGroups, delay);
    return () => clearTimeout(timeoutId);
  }, [retryCount]);

  const fetchGroups = async () => {
    try {
      const { data } = await api.get('/api/groups');
      setGroups(data || []);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error('Error fetching groups:', error);
      if (error.response?.status === 401) {
        // If unauthorized, try to refresh the token and retry
        try {
          const user = auth.currentUser;
          if (user) {
            await user.getIdToken(true); // Force token refresh
            setRetryCount(prev => prev + 1);
            return;
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
        }
      }
      if (error.response?.status !== 404) {
        toast.error('Error fetching groups. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredGroups = groups
    .filter((group) => {
      const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || group.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'newest') {
        comparison = new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'members') {
        comparison = b.members.length - a.members.length;
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'location') {
        comparison = a.location.localeCompare(b.location);
      }
      
      return sortOrder === 'desc' ? comparison : -comparison;
    });

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E07A5F]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Fade>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-[#3D5A80] to-[#E07A5F] py-20 mb-12">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-white font-['Playfair_Display'] mb-6">
                Discover Your Perfect Hobby Group
              </h1>
              <p className="text-xl text-white/90 mb-8 font-light leading-relaxed">
                Join a community of passionate individuals, learn new skills, and make lasting connections. 
                From art to technology, find your tribe and pursue your interests together.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search groups by name, description, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="container mb-12">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="heading text-center mb-8">Explore Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-4 rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    selectedCategory === category 
                      ? 'bg-[#E07A5F] text-white shadow-lg' 
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#E07A5F] hover:text-white'
                  }`}
                >
                  <div className="text-2xl mb-2">
                    {category === 'All' && '🌟'}
                    {category === 'Art' && '🎨'}
                    {category === 'Music' && '🎵'}
                    {category === 'Sports' && '⚽'}
                    {category === 'Technology' && '💻'}
                    {category === 'Books' && '📚'}
                    {category === 'Gaming' && '🎮'}
                    {category === 'Cooking' && '🍳'}
                    {category === 'Fitness' && '💪'}
                    {category === 'Photography' && '📸'}
                    {category === 'Other' && '✨'}
                  </div>
                  <div className="font-medium text-sm">{category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Groups Section */}
        <section className="container mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-[#3D5A80] dark:text-white">
                  {filteredGroups.length} Groups Found
                </h2>
                {selectedCategory !== 'All' && (
                  <span className="px-3 py-1 bg-[#E07A5F] text-white rounded-full text-sm">
                    {selectedCategory}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-[#E07A5F] text-white' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-[#E07A5F]'
                    }`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-[#E07A5F] text-white' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-[#E07A5F]'
                    }`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [newSortBy, newSortOrder] = e.target.value.split('-');
                      setSortBy(newSortBy);
                      setSortOrder(newSortOrder);
                    }}
                    className="input w-auto text-sm"
                  >
                    <option value="newest-desc">Newest First</option>
                    <option value="newest-asc">Oldest First</option>
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                    <option value="members-desc">Most Members</option>
                    <option value="members-asc">Least Members</option>
                    <option value="location-asc">Location A-Z</option>
                    <option value="location-desc">Location Z-A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Groups Grid/List */}
            {filteredGroups.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-[#3D5A80] dark:text-white mb-2">No Groups Found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search terms or category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
              }>
                {filteredGroups.map((group) => (
                  <Link 
                    key={group._id} 
                    to={`/groups/${group._id}`}
                    className={`group block transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      viewMode === 'list' 
                        ? 'bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center space-x-4'
                        : 'bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg'
                    }`}
                  >
                    <img
                      src={group.imageURL}
                      alt={group.name}
                      className={`object-cover ${
                        viewMode === 'list' 
                          ? 'w-20 h-20 rounded-lg' 
                          : 'w-full h-48'
                      }`}
                    />
                    <div className={viewMode === 'list' ? 'flex-1' : 'p-6'}>
                      <h3 className={`font-bold text-[#3D5A80] dark:text-white mb-2 group-hover:text-[#E07A5F] transition-colors ${
                        viewMode === 'list' ? 'text-lg' : 'text-xl'
                      }`}>
                        {group.name}
                      </h3>
                      <p className={`text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 ${
                        viewMode === 'list' ? 'text-sm' : ''
                      }`}>
                        {group.description}
                      </p>
                      <div className={`flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400`}>
                        <span className="flex items-center text-[#E07A5F]">
                          <FiUsers className="mr-2 w-4 h-4" />
                          <span>Members: {group.members.length}/{group.maxMembers}</span>
                        </span>
                        <span className="flex items-center text-[#E07A5F]">
                          <FiMapPin className="mr-2 w-4 h-4" />
                          <span>Location: {group.location}</span>
                        </span>
                        <span className="flex items-center text-[#E07A5F]">
                          <FiCalendar className="mr-2 w-4 h-4" />
                          <span>Start Date: {new Date(group.startDate).toLocaleDateString()}</span>
                        </span>
                        <span className="inline-block mt-2">
                          <span className="px-3 py-1 bg-[#E07A5F] text-white text-xs rounded-full">
                            {group.category}
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </Fade>
    </div>
  );
};

export default Groups; 