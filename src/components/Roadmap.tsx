'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckIcon, RocketLaunchIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/solid'

const roadmapData = [
  {
    phase: 'Q2 2025',
    title: 'Foundation & Planning',
    status: 'current',
    items: [
      'Tokenomics finalization and legal framework',
      'Core team hiring and system architecture',
      'Smart contract development begins',
      'Community building initiation'
    ]
  },
  {
    phase: 'Q4 2025',
    title: 'Token Launch',
    status: 'upcoming',
    items: [
      'DSLT token deployment on BNB Smart Chain',
      'Multi-mining system activation',
      'Initial exchange listings (DEX & CEX)',
      'Community rewards program launch'
    ]
  },
  {
    phase: 'Q1 2026',
    title: 'E-commerce Platform',
    status: 'future',
    items: [
      'DSLT e-commerce platform launch',
      'Merchant onboarding system',
      'Token-based checkout integration',
      'Fiat settlement mechanisms'
    ]
  },
  {
    phase: 'Q2 2026',
    title: 'Debit Card & Marketing',
    status: 'future',
    items: [
      'International DSLT debit card launch',
      'Global marketing campaign',
      'Additional exchange listings',
      'Payment processor partnerships'
    ]
  },
  {
    phase: 'Q3-Q4 2026',
    title: 'NFT & Staking',
    status: 'future',
    items: [
      'NFT marketplace development',
      'Creator onboarding and tools',
      'Multi-tier staking program',
      'Daily reward distribution system'
    ]
  },
  {
    phase: '2027',
    title: 'Exchange & Wallet',
    status: 'future',
    items: [
      'Native DSLT exchange launch',
      'Multi-currency wallet system',
      'Advanced trading features',
      'Complete ecosystem integration'
    ]
  }
]

export default function Roadmap() {
  const [ref, inView] = useInView({
    threshold: 0.1, // Mobile optimized
    triggerOnce: true,
    rootMargin: '50px 0px', // Trigger earlier on mobile
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'accent-blue'
      case 'upcoming':
        return 'accent-green'
      default:
        return 'text-secondary'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return <RocketLaunchIcon className="w-4 h-4 text-white" />
      case 'upcoming':
        return <ClockIcon className="w-4 h-4 text-white" />
      default:
        return <EyeIcon className="w-4 h-4 text-white" />
    }
  }

  return (
    <section id="roadmap" className="py-20 relative overflow-hidden">
      {/* Subtle section overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary heading-with-accents mb-6">
            Roadmap
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Our comprehensive development timeline from project inception to full ecosystem launch,
            spanning strategic milestones from 2025 through 2027.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-purple to-accent-green transform md:-translate-x-px"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {roadmapData.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full transform md:-translate-x-1/2 flex items-center justify-center text-sm z-10 ${
                  item.status === 'current' 
                    ? 'bg-accent-blue' 
                    : item.status === 'upcoming'
                    ? 'bg-accent-green'
                    : 'bg-text-secondary'
                }`}>
                  {getStatusIcon(item.status)}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-dark-surface/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent-blue/30 transition-all duration-300"
                  >
                    {/* Phase Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        item.status === 'current' 
                          ? 'bg-accent-blue/20 text-accent-blue' 
                          : item.status === 'upcoming'
                          ? 'bg-accent-green/20 text-accent-green'
                          : 'bg-text-secondary/20 text-text-secondary'
                      }`}>
                        {item.phase}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'current' 
                          ? 'bg-accent-blue/20 text-accent-blue' 
                          : item.status === 'upcoming'
                          ? 'bg-accent-green/20 text-accent-green'
                          : 'bg-text-secondary/20 text-text-secondary'
                      }`}>
                        {item.status === 'current' ? 'In Progress' : item.status === 'upcoming' ? 'Next' : 'Planned'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-text-primary mb-4">
                      {item.title}
                    </h3>

                    {/* Features List */}
                    <ul className="space-y-3">
                      {item.items.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + featureIndex * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                            item.status === 'current' 
                              ? 'bg-accent-blue/20' 
                              : item.status === 'upcoming'
                              ? 'bg-accent-green/20'
                              : 'bg-text-secondary/20'
                          }`}>
                            {item.status === 'current' ? (
                              <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></div>
                            ) : (
                              <CheckIcon className={`w-3 h-3 ${
                                item.status === 'current' 
                                  ? 'text-accent-blue' 
                                  : item.status === 'upcoming'
                                  ? 'text-accent-green'
                                  : 'text-text-secondary'
                              }`} />
                            )}
                          </div>
                          <span className="text-text-secondary text-sm leading-relaxed">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Progress Bar for Current Phase */}
                    {item.status === 'current' && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-text-secondary">Progress</span>
                          <span className="text-xs text-accent-blue font-semibold">75%</span>
                        </div>
                        <div className="w-full bg-dark-surface rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: '75%' } : { width: 0 }}
                            transition={{ duration: 1.5, delay: 1 }}
                            className="bg-gradient-to-r from-accent-blue to-accent-purple h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl font-semibold text-lg btn-primary"
          >
            View Detailed Roadmap
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}