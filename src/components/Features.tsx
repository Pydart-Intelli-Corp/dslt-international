'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  ShieldCheckIcon, 
  CogIcon, 
  ChartBarIcon,
  CreditCardIcon,
  CubeIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Safety & Security',
    description: 'Multi-signature wallets, HSM integration, and comprehensive security audits ensure your assets are protected.',
    color: 'accent-green'
  },
  {
    icon: CogIcon,
    title: 'Automation',
    description: 'Automatic multi-mining calculations, staking rewards, and smart contract execution for seamless operations.',
    color: 'accent-blue'
  },
  {
    icon: ChartBarIcon,
    title: 'Analytics',
    description: 'Real-time portfolio tracking, transaction analytics, and comprehensive reporting tools.',
    color: 'accent-purple'
  },
  {
    icon: CreditCardIcon,
    title: 'Debit Card Integration',
    description: 'Convert DSLT to fiat instantly with our international debit card for ATM withdrawals and POS payments.',
    color: 'accent-green'
  },
  {
    icon: CubeIcon,
    title: 'NFT Marketplace',
    description: 'Create, mint, and trade NFTs with integrated DSLT payments and creator royalty systems.',
    color: 'accent-blue'
  },
  {
    icon: ArrowTrendingUpIcon,
    title: 'Staking Rewards',
    description: 'Multiple staking tiers with competitive APY rates and compound interest mechanisms.',
    color: 'accent-purple'
  }
]

export default function Features() {
  const [ref, inView] = useInView({
    threshold: 0.1, // Reduced for mobile
    triggerOnce: true,
    rootMargin: '50px 0px', // Add margin for better mobile detection
  })

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Subtle section overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg-deeper/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary heading-with-accents mb-6">
            Our Features
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Whether you&apos;re a beginner or an experienced trader, our platform empowers you to
            make informed decisions and achieve your crypto success.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="feature-card-centure relative"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-10`} 
                     style={{
                       background: feature.color === 'accent-blue' ? 'linear-gradient(135deg, #00d4ff, #0099cc)' :
                                  feature.color === 'accent-purple' ? 'linear-gradient(135deg, #572c7c, #8231c7)' :
                                  'linear-gradient(135deg, #00ff88, #00cc6a)',
                       boxShadow: '0 8px 32px rgba(130, 49, 199, 0.3)'
                     }}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-white relative z-10">
                  {feature.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl text-lg btn-primary text-white"
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}