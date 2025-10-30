'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  DocumentTextIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CogIcon,
  GlobeAltIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'

const sections = [
  { id: 'executive-summary', title: 'Executive Summary', icon: DocumentTextIcon },
  { id: 'tokenomics', title: 'Tokenomics', icon: ChartBarIcon },
  { id: 'technology', title: 'Technology Stack', icon: CogIcon },
  { id: 'security', title: 'Security & Compliance', icon: ShieldCheckIcon },
  { id: 'ecosystem', title: 'Ecosystem Products', icon: GlobeAltIcon },
  { id: 'governance', title: 'Governance Model', icon: LockClosedIcon },
]

export default function WhitepaperPage() {
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
                DSLT Whitepaper
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
                Technical documentation for the Dollar Secure Ledger Token ecosystem
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-8 py-4 rounded-xl font-semibold text-lg"
                >
                  Download PDF
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline px-8 py-4 rounded-xl font-semibold text-lg text-accent-purple-light"
                >
                  View on GitHub
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg-deeper/10 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Quick Navigation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sections.map((section, index) => {
                  const IconComponent = section.icon
                  return (
                    <motion.a
                      key={section.id}
                      href={`#${section.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="flex items-center space-x-3 p-4 bg-dark-surface/50 rounded-lg border border-white/10 hover:border-accent-purple/30 transition-all duration-300"
                    >
                      <IconComponent className="w-6 h-6 text-accent-purple-light" />
                      <span className="text-text-secondary hover:text-white transition-colors">
                        {section.title}
                      </span>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Executive Summary */}
        <section id="executive-summary" ref={ref} className="py-20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Executive Summary</h2>
              <div className="glass-card rounded-2xl p-8 space-y-6">
                <p className="text-text-secondary leading-relaxed">
                  <span className="text-accent-purple-light font-semibold">DSLT (Dollar Secure Ledger Token)</span> is a comprehensive crypto ecosystem designed to bridge blockchain utility with everyday commerce through a full-stack suite of products including token launch, e-commerce integration, debit card, NFT marketplace, staking rewards, and a dedicated exchange + wallet.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Project Timeline</h3>
                    <p className="text-text-secondary">June 2025 - 2027</p>
                    <p className="text-sm text-text-muted mt-2">30-month staged development roadmap</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Total Supply</h3>
                    <p className="text-accent-purple-light font-bold text-2xl">2,500,000,000 DSLT</p>
                    <p className="text-sm text-text-muted mt-2">2.5 billion tokens on BNB Smart Chain</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tokenomics */}
        <section id="tokenomics" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Tokenomics</h2>
              <div className="glass-card rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-4">Token Distribution</h3>
                
                <div className="space-y-4">
                  {[
                    { category: 'Community Allocation', percentage: 48, amount: '1.2B', color: 'bg-accent-blue' },
                    { category: 'Company Holdings', percentage: 10, amount: '250M', color: 'bg-accent-purple' },
                    { category: 'Project Development', percentage: 25, amount: '625M', color: 'bg-accent-green' },
                    { category: 'Development Team', percentage: 7, amount: '175M', color: 'bg-accent-blue' },
                    { category: 'Liquidity & Listings', percentage: 8, amount: '200M', color: 'bg-pink-500' },
                    { category: 'Others', percentage: 2, amount: '50M', color: 'bg-yellow-500' },
                  ].map((item) => (
                    <div key={item.category} className="flex items-center justify-between p-4 bg-dark-surface/30 rounded-lg">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-white font-medium">{item.category}</span>
                      </div>
                      <div className="flex items-center space-x-6">
                        <span className="text-accent-purple-light font-bold">{item.percentage}%</span>
                        <span className="text-text-secondary w-20 text-right">{item.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-4">Multi-Mining System</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-dark-surface/30 rounded-lg text-center">
                      <div className="text-2xl font-bold text-accent-purple mb-1">15</div>
                      <div className="text-sm text-text-secondary">Main Blocks</div>
                    </div>
                    <div className="p-4 bg-dark-surface/30 rounded-lg text-center">
                      <div className="text-2xl font-bold text-accent-purple-light mb-1">25</div>
                      <div className="text-sm text-text-secondary">Mini Blocks/Main</div>
                    </div>
                    <div className="p-4 bg-dark-surface/30 rounded-lg text-center">
                      <div className="text-2xl font-bold text-accent-green mb-1">+10%</div>
                      <div className="text-sm text-text-secondary">Price Increase</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technology Stack */}
        <section id="technology" className="py-20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Technology Stack</h2>
              <div className="glass-card rounded-2xl p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Blockchain Infrastructure</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-accent-purple-light mt-1">▸</span>
                      <span className="text-text-secondary">
                        <span className="text-white font-semibold">Primary Chain:</span> BNB Smart Chain (BSC)
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-accent-purple-light mt-1">▸</span>
                      <span className="text-text-secondary">
                        <span className="text-white font-semibold">Token Standard:</span> BEP-20 compliant
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-accent-purple-light mt-1">▸</span>
                      <span className="text-text-secondary">
                        <span className="text-white font-semibold">Smart Contracts:</span> Solidity-based with comprehensive audits
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Backend Architecture</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-accent-blue mt-1">▸</span>
                      <span className="text-text-secondary">Microservices architecture for scalability</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-accent-blue mt-1">▸</span>
                      <span className="text-text-secondary">API Gateway with rate limiting and authentication</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-accent-blue mt-1">▸</span>
                      <span className="text-text-secondary">Multi-signature custody and HSM integration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section id="security" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Security & Compliance</h2>
              <div className="glass-card rounded-2xl p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-dark-surface/30 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-3">Security Measures</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>✓ Multi-signature wallets</li>
                      <li>✓ HSM integration</li>
                      <li>✓ Smart contract audits</li>
                      <li>✓ Penetration testing</li>
                      <li>✓ Bug bounty program</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-dark-surface/30 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-3">Compliance</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>✓ KYC/AML procedures</li>
                      <li>✓ Geographic compliance</li>
                      <li>✓ GDPR compliance</li>
                      <li>✓ Data encryption</li>
                      <li>✓ Legal framework</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="glass-card rounded-2xl p-12 text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Want the Complete Whitepaper?</h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Download the full technical documentation to learn more about DSLT's architecture, tokenomics, and roadmap.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-10 py-4 rounded-xl font-semibold text-lg"
              >
                Download Full Whitepaper (PDF)
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
