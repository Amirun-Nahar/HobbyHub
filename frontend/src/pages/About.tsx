import { Fade } from 'react-awesome-reveal'
import { FiUsers, FiHeart, FiGlobe, FiAward, FiTarget, FiShield } from 'react-icons/fi'

const About = () => {
  const stats = [
    { icon: FiUsers, number: '10,000+', label: 'Active Members' },
    { icon: FiHeart, number: '500+', label: 'Hobby Groups' },
    { icon: FiGlobe, number: '50+', label: 'Cities Covered' },
    { icon: FiAward, number: '95%', label: 'Satisfaction Rate' }
  ]

  const values = [
    {
      icon: FiUsers,
      title: 'Community First',
      description: 'We believe in the power of community and bringing people together through shared interests.'
    },
    {
      icon: FiHeart,
      title: 'Passion Driven',
      description: 'Every hobby matters. We celebrate all forms of creativity, learning, and personal growth.'
    },
    {
      icon: FiGlobe,
      title: 'Inclusive',
      description: 'Our platform welcomes everyone, regardless of background, experience level, or location.'
    },
    {
      icon: FiShield,
      title: 'Safe & Secure',
      description: 'We prioritize the safety and privacy of our community members above all else.'
    }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Passionate about building communities and connecting people through shared interests.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Technology',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Tech enthusiast who loves creating seamless user experiences for hobby communities.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Dedicated to fostering meaningful connections and supporting group organizers.'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#E07A5F] to-[#3D5A80] text-white py-20">
        <div className="container">
          <Fade>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About HobbyHub</h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-8">
                Connecting passionate people through shared interests and creating meaningful communities.
              </p>
              <div className="flex justify-center">
                <FiTarget className="w-12 h-12 text-yellow-300" />
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container">
          <Fade>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading text-[#3D5A80] dark:text-white mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  At HobbyHub, we believe that everyone deserves to find their tribe. Whether you're into painting, 
                  coding, hiking, or cooking, there's a community waiting for you. Our mission is to make it easier 
                  than ever to discover, join, and create hobby groups that bring people together.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  We started with a simple idea: the internet should help us connect in real life, not just online. 
                  That's why we built HobbyHub - a platform that bridges the gap between digital discovery and 
                  real-world community building.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#E07A5F] rounded-full flex items-center justify-center">
                    <FiHeart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#3D5A80] dark:text-white">Building Connections</h3>
                    <p className="text-gray-600 dark:text-gray-300">One hobby at a time</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop" 
                  alt="Community gathering" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-[#E07A5F] text-white p-4 rounded-lg">
                  <p className="text-sm font-medium">Since 2024</p>
                  <p className="text-lg font-bold">Building Communities</p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container">
          <Fade>
            <h2 className="heading text-center text-[#3D5A80] dark:text-white mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#E07A5F] text-white rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-[#3D5A80] dark:text-white mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container">
          <Fade>
            <h2 className="heading text-center text-[#3D5A80] dark:text-white mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#E07A5F] text-white rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#3D5A80] dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container">
          <Fade>
            <h2 className="heading text-center text-[#3D5A80] dark:text-white mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
                  />
                  <h3 className="text-xl font-semibold text-[#3D5A80] dark:text-white mb-2">{member.name}</h3>
                  <p className="text-[#E07A5F] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#E07A5F] text-white">
        <div className="container">
          <Fade>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
              <p className="text-xl mb-8 text-gray-100">
                Start your journey today and discover amazing hobby groups in your area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/groups" className="btn bg-white text-[#E07A5F] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Explore Groups
                </a>
                <a href="/register" className="btn bg-[#3D5A80] text-white hover:bg-[#2A4365] px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Get Started
                </a>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  )
}

export default About 