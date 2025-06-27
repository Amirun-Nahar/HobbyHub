import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Typewriter } from 'react-simple-typewriter'
import { Fade } from 'react-awesome-reveal'
import { FiUsers, FiCalendar, FiMapPin, FiHeart, FiGlobe, FiArrowRight, FiStar, FiTrendingUp, FiBookOpen, FiMail } from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

interface Group {
  _id: string
  name: string
  description: string
  imageURL: string
  members: { _id: string; name: string; photoURL?: string }[]
  maxMembers: number
  startDate: string
  location: string
  category: string
}

const bannerSlides = [
  {
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18',
    title: 'Find Your Hobby Community',
    description: 'Connect with people who share your interests'
  },
  {
    image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa',
    title: 'Join Local Groups',
    description: 'Discover and join hobby groups in your area'
  },
  {
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad',
    title: 'Create Your Own Group',
    description: 'Start a community around your favorite hobby'
  }
]

const categories = [
  { name: 'Art & Creativity', icon: '🎨', color: 'bg-purple-500' },
  { name: 'Music & Audio', icon: '🎵', color: 'bg-blue-500' },
  { name: 'Sports & Fitness', icon: '⚽', color: 'bg-green-500' },
  { name: 'Technology', icon: '💻', color: 'bg-indigo-500' },
  { name: 'Books & Reading', icon: '📚', color: 'bg-yellow-500' },
  { name: 'Cooking & Food', icon: '🍳', color: 'bg-red-500' },
  { name: 'Gaming', icon: '🎮', color: 'bg-pink-500' },
  { name: 'Photography', icon: '📸', color: 'bg-teal-500' }
]

const blogPosts = [
  {
    title: 'How to Start Your First Hobby Group',
    excerpt: 'Learn the essential steps to create a successful hobby community that brings people together.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop',
    date: '2024-01-15',
    readTime: '5 min read'
  },
  {
    title: 'Building Meaningful Connections Through Shared Interests',
    excerpt: 'Discover how joining hobby groups can lead to lasting friendships and personal growth.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=250&fit=crop',
    date: '2024-01-10',
    readTime: '4 min read'
  },
  {
    title: 'The Benefits of Community-Based Learning',
    excerpt: 'Explore how learning in a group setting can enhance your skills and motivation.',
    image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=400&h=250&fit=crop',
    date: '2024-01-05',
    readTime: '6 min read'
  }
]

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [featuredGroups, setFeaturedGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchFeaturedGroups = async (retryCount = 0) => {
      try {
        setLoading(true)
        // Add a small delay before making the request
        await new Promise(resolve => setTimeout(resolve, 1000))
        const { data } = await axios.get<Group[]>(`${import.meta.env.VITE_API_URL}/api/groups`)
        setFeaturedGroups(data.slice(0, 8))
      } catch (error) {
        console.error('Error fetching featured groups:', error)
        if (retryCount < 3) {
          // Wait for 2 seconds before retrying
          await new Promise(resolve => setTimeout(resolve, 2000))
          console.log(`Retrying... Attempt ${retryCount + 1}`)
          return fetchFeaturedGroups(retryCount + 1)
        }
        // If all retries failed, log detailed error
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error('Response data:', error.response.data)
            console.error('Response status:', error.response.status)
          } else if (error.request) {
            console.error('No response received:', error.request)
          } else {
            console.error('Error setting up request:', error.message)
          }
        }
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedGroups()
  }, [])

  const handleGetStarted = () => {
    navigate('/login')
  }

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.success('Thank you for subscribing to our newsletter!')
    setEmail('')
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[65vh] overflow-hidden">
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
              <div className="max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={handleGetStarted}
                    className="btn bg-[#E07A5F] text-white hover:bg-[#cc6952] px-8 py-3 text-lg font-semibold"
                  >
                    Get Started
                  </button>
                  <Link 
                    to="/groups" 
                    className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#E07A5F] px-8 py-3 text-lg font-semibold"
                  >
                    Explore Groups
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container">
          <Fade>
            <h2 className="heading text-center mb-12">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link 
                  key={index} 
                  to={`/groups?category=${category.name.split(' ')[0]}`}
                  className="group p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-center hover:bg-[#E07A5F] hover:text-white transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-[#3D5A80] dark:text-white group-hover:text-white mb-2">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* Featured Groups Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container">
          <Fade>
            <h2 className="heading text-center mb-8 dark:text-white">
              <Typewriter
                words={['Featured Groups', 'Join a Community', 'Find Your Passion']}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h2>
            {loading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E07A5F]"></div>
              </div>
            ) : featuredGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredGroups.map((group) => (
                  <Link key={group._id} to={`/groups/${group._id}`} 
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <img
                      src={group.imageURL}
                      alt={group.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{group.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {group.description}
                      </p>
                      <div className="mt-auto space-y-1.5">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <FiMapPin className="w-4 h-4 mr-1.5 text-[#E07A5F]" />
                          {group.location}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <FiCalendar className="w-4 h-4 mr-1.5 text-[#E07A5F]" />
                          {new Date(group.startDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <FiUsers className="w-4 h-4 mr-1.5 text-[#E07A5F]" />
                          {group.members.length}/{group.maxMembers} members
                        </div>
                      </div>
                      <button className="mt-3 w-full btn btn-primary text-sm flex items-center justify-center space-x-1">
                        <span>View Details</span>
                        <FiArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No featured groups available at the moment.</p>
              </div>
            )}
          </Fade>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#E07A5F] text-white">
        <div className="container">
          <Fade>
            <h2 className="heading text-center mb-12 text-white">Our Community Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-lg">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-lg">Hobby Groups</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-lg">Satisfaction Rate</div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container">
          <Fade>
            <h2 className="heading text-center mb-12">Latest from Our Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#3D5A80] dark:text-white mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    <Link 
                      to="/blog" 
                      className="text-[#E07A5F] hover:text-[#cc6952] font-medium flex items-center space-x-2"
                    >
                      <span>Read More</span>
                      <FiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container">
          <Fade>
            <h2 className="heading text-center mb-12 dark:text-white">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#E07A5F] text-white rounded-full flex items-center justify-center text-2xl font-bold">1</div>
                <h3 className="subheading dark:text-white">Find a Group</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Browse through various hobby groups in your area
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#E07A5F] text-white rounded-full flex items-center justify-center text-2xl font-bold">2</div>
                <h3 className="subheading dark:text-white">Join & Connect</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Join groups that match your interests and connect with members
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#E07A5F] text-white rounded-full flex items-center justify-center text-2xl font-bold">3</div>
                <h3 className="subheading dark:text-white">Participate</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Attend meetings, share experiences, and enjoy your hobbies together
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#3D5A80] text-white">
        <div className="container">
          <Fade>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
              <p className="text-xl mb-8 text-gray-100">
                Get the latest updates about new groups, events, and community news delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                  required
                />
                <button type="submit" className="btn bg-[#E07A5F] text-white hover:bg-[#cc6952] px-6 py-3 rounded-lg font-semibold">
                  Subscribe
                </button>
              </form>
            </div>
          </Fade>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container text-center">
            <Fade>
              <h2 className="heading mb-6">Ready to Start?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Join HobbyHub today and connect with people who share your interests
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleGetStarted}
                  className="btn btn-primary text-lg px-8 py-3"
                >
                  Get Started
                </button>
                <Link 
                  to="/groups" 
                  className="btn btn-secondary text-lg px-8 py-3"
                >
                  Explore Groups
                </Link>
              </div>
            </Fade>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home 