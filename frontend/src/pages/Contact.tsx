import { useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email Us',
      details: ['info@hobbyhub.com', 'support@hobbyhub.com'],
      description: 'We typically respond within 24 hours'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Monday to Friday, 9 AM - 6 PM EST'
    },
    {
      icon: FiMapPin,
      title: 'Visit Us',
      details: ['123 Community Street', 'Hobby City, HC 12345'],
      description: 'Come say hello at our office'
    },
    {
      icon: FiClock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9 AM - 6 PM', 'Saturday: 10 AM - 4 PM'],
      description: 'Sunday: Closed'
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 2000)
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#E07A5F] to-[#3D5A80] text-white py-20">
        <div className="container">
          <Fade>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-8">
                Get in touch with our team for any questions or support.
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container">
          <Fade>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#E07A5F] text-white rounded-full flex items-center justify-center">
                  <FiMail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-[#3D5A80] dark:text-white mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">info@hobbyhub.com</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#E07A5F] text-white rounded-full flex items-center justify-center">
                  <FiPhone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-[#3D5A80] dark:text-white mb-2">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#E07A5F] text-white rounded-full flex items-center justify-center">
                  <FiMapPin className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-[#3D5A80] dark:text-white mb-2">Address</h3>
                <p className="text-gray-600 dark:text-gray-300">123 Community St, Hobby City</p>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Fade direction="left">
              <div>
                <h2 className="heading text-[#3D5A80] dark:text-white mb-6">Send us a Message</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Whether you have a question about our platform, need help with your account, or want to 
                  share feedback, we're here to help. Fill out the form and we'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#E07A5F] text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#3D5A80] dark:text-white">Email Support</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        For general inquiries and support questions
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#3D5A80] text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#3D5A80] dark:text-white">Phone Support</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        For urgent matters and immediate assistance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>

            <Fade direction="right">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input w-full"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input w-full"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="input w-full"
                        placeholder="What is this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="input w-full resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FiSend className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-500 text-white rounded-full flex items-center justify-center">
                      <FiCheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#3D5A80] dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn btn-primary"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container">
          <Fade>
            <h2 className="heading text-center text-[#3D5A80] dark:text-white mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#3D5A80] dark:text-white mb-2">
                    How do I join a hobby group?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Simply browse our groups, find one that interests you, and click the "Join Group" button. 
                    Some groups may require approval from the group creator.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#3D5A80] dark:text-white mb-2">
                    Can I create my own group?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes! Any registered user can create a new hobby group. Click on "Create Group" in the navigation 
                    and fill out the required information.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#3D5A80] dark:text-white mb-2">
                    Is HobbyHub free to use?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes, HobbyHub is completely free to use! You can join groups, create groups, and connect with 
                    other hobby enthusiasts at no cost.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#3D5A80] dark:text-white mb-2">
                    How do I report inappropriate content?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    If you encounter inappropriate content, please contact our support team immediately. 
                    We take all reports seriously and will investigate promptly.
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  )
}

export default Contact 