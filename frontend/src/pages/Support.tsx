import { useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { FiHelpCircle, FiSearch, FiBook, FiMessageCircle, FiVideo, FiMail, FiChevronDown, FiChevronUp } from 'react-icons/fi'

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqs = [
    {
      question: "How do I create a new hobby group?",
      answer: "To create a new hobby group, click on 'Create Group' in the navigation menu. Fill out the required information including group name, description, category, location, and maximum members. You can also upload an image for your group. Once submitted, your group will be visible to other users."
    },
    {
      question: "How do I join an existing group?",
      answer: "Browse through the available groups on the 'All Groups' page. When you find a group you're interested in, click on it to view details. If the group is open for new members, you'll see a 'Join Group' button. Click it to request membership."
    },
    {
      question: "Can I leave a group after joining?",
      answer: "Yes, you can leave a group at any time. Go to your 'My Groups' page, find the group you want to leave, and click the 'Leave Group' button. You'll be removed from the group immediately."
    },
    {
      question: "How do I update my group information?",
      answer: "If you're the creator of a group, you can edit it by going to 'My Groups', finding your group, and clicking 'Edit Group'. You can update the name, description, image, and other details."
    },
    {
      question: "What if I can't find a group for my hobby?",
      answer: "If you can't find a group for your specific hobby, we encourage you to create one! This helps build the community and allows others with similar interests to find and join your group."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "If you encounter inappropriate content or behavior, please contact our support team immediately through the Contact page. Include as much detail as possible, and we'll investigate the issue promptly."
    }
  ]

  const helpCategories = [
    {
      icon: FiBook,
      title: "Getting Started Guide",
      description: "Learn the basics of using HobbyHub",
      link: "#getting-started"
    },
    {
      icon: FiMessageCircle,
      title: "Group Management",
      description: "How to create and manage your groups",
      link: "#group-management"
    },
    {
      icon: FiVideo,
      title: "Video Tutorials",
      description: "Watch step-by-step tutorials",
      link: "#tutorials"
    },
    {
      icon: FiMail,
      title: "Contact Support",
      description: "Get help from our support team",
      link: "/contact"
    }
  ]

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#E07A5F] to-[#3D5A80] text-white py-20">
        <div className="container">
          <Fade>
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <FiHelpCircle className="w-10 h-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Help & Support</h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-8">
                Find answers to your questions and get the help you need to make the most of HobbyHub.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for help articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container">
          <Fade>
            <h2 className="heading text-center text-[#3D5A80] dark:text-white mb-12">How can we help you?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {helpCategories.map((category, index) => (
                <a
                  key={index}
                  href={category.link}
                  className="group p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-[#E07A5F] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#E07A5F] group-hover:bg-white text-white group-hover:text-[#E07A5F] rounded-full flex items-center justify-center transition-colors duration-300">
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#3D5A80] dark:text-white group-hover:text-white mb-3 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
                    {category.description}
                  </p>
                </a>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container">
          <Fade>
            <h2 className="heading text-center text-[#3D5A80] dark:text-white mb-12">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-[#3D5A80] dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    {expandedFaq === index ? (
                      <FiChevronUp className="w-5 h-5 text-[#E07A5F] flex-shrink-0" />
                    ) : (
                      <FiChevronDown className="w-5 h-5 text-[#E07A5F] flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {filteredFaqs.length === 0 && searchTerm && (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  No results found for "{searchTerm}". Try searching with different keywords.
                </p>
              </div>
            )}
          </Fade>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-[#E07A5F] text-white">
        <div className="container">
          <Fade>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Still need help?</h2>
              <p className="text-xl mb-8 text-gray-100">
                Can't find what you're looking for? Our support team is here to help you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="btn bg-white text-[#E07A5F] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Contact Support
                </a>
                <a 
                  href="mailto:support@hobbyhub.com" 
                  className="btn bg-[#3D5A80] text-white hover:bg-[#2A4365] px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Email Us
                </a>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  )
}

export default Support 