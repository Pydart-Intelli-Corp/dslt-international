'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  ChatBubbleLeftRightIcon, 
  DevicePhoneMobileIcon, 
  BoltIcon,
  XMarkIcon 
} from '@heroicons/react/24/solid'

export default function Footer() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About DSLT', href: '#about' },
        { name: 'Our Mission', href: '#mission' },
        { name: 'Whitepaper', href: '#whitepaper' },
        { name: 'Contacts', href: '#contact' }
      ]
    },
    {
      title: 'Ecosystem',
      links: [
        { name: 'Multi-Mining', href: '#mining' },
        { name: 'E-commerce', href: '#ecommerce' },
        { name: 'NFT Marketplace', href: '#nft' },
        { name: 'Staking Pools', href: '#staking' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Debit Card', href: '#card' },
        { name: 'Exchange', href: '#exchange' },
        { name: 'Wallet', href: '#wallet' },
        { name: 'Analytics', href: '#analytics' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#help' },
        { name: 'How it Works', href: '#how' },
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms & Conditions', href: '#terms' }
      ]
    }
  ]

  return (
    <footer className="border-t border-accent-purple/20 relative overflow-hidden z-10">
      {/* Subtle section overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg-deeper/20 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-3xl font-bold gradient-text">DSLT</span>
            </div>
            
            <p className="text-text-secondary mb-6 leading-relaxed">
              Building the future of crypto commerce through an integrated ecosystem 
              of token utility, e-commerce, NFTs, staking, and digital payments.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { name: 'Twitter', icon: XMarkIcon },
                { name: 'Telegram', icon: DevicePhoneMobileIcon },
                { name: 'Discord', icon: ChatBubbleLeftRightIcon },
                { name: 'GitHub', icon: BoltIcon }
              ].map((social) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className="w-10 h-10 bg-dark-surface/50 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-purple-light hover:bg-accent-purple/10 transition-all duration-300 border border-white/10 hover:border-accent-purple/30"
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
            >
              <h3 className="font-semibold text-text-primary mb-4 text-lg">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.5, delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="text-text-secondary hover:text-accent-blue transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 rounded-xl p-8 border border-accent-blue/20 mb-12"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Stay Updated with DSLT
            </h3>
            <p className="text-text-secondary">
              Get the latest updates on token launches, ecosystem developments, and exclusive opportunities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-dark-surface/50 border border-white/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors duration-300"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg font-semibold whitespace-nowrap btn-primary"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-text-secondary text-sm">
              © 2025 DSLT (Dollar Secure Ledger Token). All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-text-secondary hover:text-accent-blue transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#terms" className="text-text-secondary hover:text-accent-blue transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#cookies" className="text-text-secondary hover:text-accent-blue transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-dark-surface/30 rounded-lg border border-yellow-500/20">
            <p className="text-xs text-text-secondary leading-relaxed">
              <span className="text-yellow-500 font-semibold">Disclaimer:</span> DSLT tokens are utility tokens for the DSLT ecosystem. 
              Cryptocurrency investments carry risk. Please conduct your own research and consult financial advisors before participating. 
              This website does not constitute financial advice.
            </p>
          </div>
        </motion.div>
      </div>


    </footer>
  )
}