'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  RocketLaunchIcon, 
  ShieldCheckIcon, 
  UsersIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const mission = [
  {
    icon: RocketLaunchIcon,
    title: 'Our Vision',
    description: 'Make DSLT a widely usable token that bridges blockchain utility and everyday commerce: payments, shopping, collectibles, and financial rewards.',
    color: 'accent-purple'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Security First',
    description: 'Multi-signature wallets, HSM integration, and comprehensive security audits ensure your assets are protected at every level.',
    color: 'accent-green'
  },
  {
    icon: UsersIcon,
    title: 'Community Driven',
    description: '48% of total supply allocated to community rewards, staking, and ecosystem development.',
    color: 'accent-blue'
  },
]

const values = [
  {
    icon: GlobeAltIcon,
    title: 'Global Accessibility',
    description: 'Building a worldwide crypto ecosystem accessible to everyone',
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Real Utility',
    description: 'Practical use cases from e-commerce to debit cards',
  },
  {
    icon: SparklesIcon,
    title: 'Innovation',
    description: 'Cutting-edge blockchain technology and user experience',
  },
]

export default function AboutPage() {
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
                About DSLT
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
                Dollar Secure Ledger Token (DSLT) is a comprehensive crypto ecosystem designed to bridge 
                blockchain utility with everyday commerce through a full-stack suite of innovative products.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            >
              {[
                { value: '2.5B', label: 'Total Supply' },
                { value: '48%', label: 'Community Allocation' },
                { value: '2025-2027', label: 'Development Timeline' },
                { value: '7+', label: 'Ecosystem Products' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="glass-card rounded-xl p-6 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section ref={ref} className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg-deeper/10 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mission.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="feature-card-centure"
                  >
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-6`}
                      style={{
                        background: item.color === 'accent-blue' ? 'linear-gradient(135deg, #00d4ff, #0099cc)' :
                                   item.color === 'accent-purple' ? 'linear-gradient(135deg, #572c7c, #8231c7)' :
                                   'linear-gradient(135deg, #00ff88, #00cc6a)',
                        boxShadow: '0 8px 32px rgba(130, 49, 199, 0.3)'
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      {item.title}
                    </h3>
                    
                    <p className="text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Product Ecosystem */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="heading-secondary heading-with-accents mb-6">
                Complete Ecosystem
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Seven integrated products working together to create a comprehensive crypto experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Core Token', desc: 'BNB Smart Chain token with multi-mining system', phase: 'Q4 2025' },
                { title: 'E-commerce Platform', desc: 'Token-based shopping with merchant integration', phase: 'Q1 2026' },
                { title: 'Debit Card', desc: 'Physical & virtual cards for global payments', phase: 'Q2 2026' },
                { title: 'NFT Marketplace', desc: 'Creator tools and digital collectibles', phase: 'Q3 2026' },
                { title: 'Staking Program', desc: 'Multi-tier rewards with competitive APY', phase: 'Q4 2026' },
                { title: 'Exchange & Wallet', desc: 'Native trading platform and secure storage', phase: '2027' },
                { title: 'Referral System', desc: '15% reward structure for community growth', phase: 'Ongoing' },
              ].map((product, index) => (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card rounded-xl p-6 relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple-light">
                      {product.phase}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 mt-8">
                    {product.title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm">
                    {product.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="heading-secondary heading-with-accents mb-6">
                Our Core Values
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-purple mb-6">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">
                      {value.title}
                    </h3>
                    
                    <p className="text-text-secondary">
                      {value.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
