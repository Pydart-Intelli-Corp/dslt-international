'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function ContactPage() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <div className="min-h-screen bg-dark-bg-deeper text-text-primary relative overflow-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 cyber-grid opacity-3"></div>
        
        {[...Array(12)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl opacity-30 animate-float-slow"
            style={{
              background: i % 3 === 0 
                ? 'radial-gradient(circle, rgba(87,44,124,0.4) 0%, rgba(87,44,124,0.1) 50%, transparent 100%)'
                : i % 3 === 1
                ? 'radial-gradient(circle, rgba(130,49,199,0.4) 0%, rgba(130,49,199,0.1) 50%, transparent 100%)'
                : 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, rgba(0,212,255,0.1) 50%, transparent 100%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${150 + Math.random() * 250}px`,
              height: `${150 + Math.random() * 250}px`,
              animationDelay: `${Math.random() * 20}s`,
            }}
          />
        ))}
        
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`particle particle-${(i % 3) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
            }}
          />
        ))}
      </div>

      <Header />
      
      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="heading-secondary heading-with-accents mb-6">
                Get In Touch
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Have questions about DSLT? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section ref={ref} className="py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8 }}
                className="glass-card rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-text-secondary mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-3 bg-dark-surface/50 border border-white/10 rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent-purple/50 transition-colors"
                        placeholder="John"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-text-secondary mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-3 bg-dark-surface/50 border border-white/10 rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent-purple/50 transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-dark-surface/50 border border-white/10 rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent-purple/50 transition-colors"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 bg-dark-surface/50 border border-white/10 rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent-purple/50 transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 bg-dark-surface/50 border border-white/10 rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent-purple/50 transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary px-8 py-4 rounded-xl font-semibold text-lg"
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="glass-card rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-purple-light rounded-lg flex items-center justify-center">
                        <EnvelopeIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                        <p className="text-text-secondary">support@dslt.io</p>
                        <p className="text-text-secondary">partnerships@dslt.io</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-cyan rounded-lg flex items-center justify-center">
                        <MapPinIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                        <p className="text-text-secondary">Global Operations</p>
                        <p className="text-text-secondary">Decentralized Team</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-green to-accent-green/70 rounded-lg flex items-center justify-center">
                        <ClockIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Business Hours</h3>
                        <p className="text-text-secondary">24/7 Community Support</p>
                        <p className="text-text-secondary">Mon-Fri: 9AM-6PM UTC</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Join Our Community</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Telegram', icon: '✈', color: 'from-blue-500 to-blue-600' },
                      { name: 'Discord', icon: '💬', color: 'from-indigo-500 to-indigo-600' },
                      { name: 'Twitter', icon: '🐦', color: 'from-sky-500 to-sky-600' },
                      { name: 'GitHub', icon: '⚡', color: 'from-gray-700 to-gray-800' },
                    ].map((social) => (
                      <motion.button
                        key={social.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 bg-gradient-to-br ${social.color} rounded-lg text-center`}
                      >
                        <div className="text-2xl mb-2">{social.icon}</div>
                        <div className="text-white font-semibold text-sm">{social.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {[
                  {
                    question: 'What is DSLT?',
                    answer: 'DSLT is a comprehensive cryptocurrency ecosystem built on BNB Smart Chain, featuring a 2.5 billion token supply with multiple utility products including e-commerce, debit cards, NFT marketplace, and more.'
                  },
                  {
                    question: 'How can I purchase DSLT tokens?',
                    answer: 'DSLT tokens will be available through our multi-mining system launching in June 2025. You can participate in the initial mining blocks or purchase through our exchange once launched.'
                  },
                  {
                    question: 'When will the ecosystem products launch?',
                    answer: 'Our roadmap spans from June 2025 to 2027. The core token and mining system launch in Q2 2025, followed by staged releases of e-commerce, debit card, NFT marketplace, and other products.'
                  },
                  {
                    question: 'Is DSLT available globally?',
                    answer: 'Yes, DSLT is designed for global accessibility. However, availability may vary based on local regulations. Please check your jurisdiction\'s crypto policies.'
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-card rounded-xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
