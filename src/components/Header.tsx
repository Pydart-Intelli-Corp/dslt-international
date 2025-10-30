'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Tokenomics', href: '/#tokenomics' },
  { name: 'Roadmap', href: '/#roadmap' },
  { name: 'Whitepaper', href: '/whitepaper' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Memoize the scroll handler to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
  }, [])

  // Memoize the mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  // Memoize the header class to prevent recalculation
  const headerClass = useMemo(() => 
    `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-card border-b border-accent-purple/20' 
        : 'bg-transparent'
    }`, [isScrolled]
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={headerClass}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer space-x-3"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/logo.png"
                  alt="DSLT Icon"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="relative w-28 h-10 md:w-36 md:h-12">
                <Image
                  src="/dslt.png"
                  alt="DSLT Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-text-secondary hover:text-accent-purple-light transition-colors duration-300 relative group cursor-pointer inline-block"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-purple transition-all duration-300 group-hover:w-full"></span>
                </motion.span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/whitepaper">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline px-4 py-2 text-accent-purple-light rounded-lg"
              >
                Whitepaper
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-6 py-2 rounded-lg font-semibold"
            >
              Launch App
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="text-text-primary hover:text-accent-purple-light transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card rounded-lg mt-2 p-4"
          >
            {navigation.map((item, index) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-text-secondary hover:text-accent-purple-light transition-colors duration-300 cursor-pointer"
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link href="/whitepaper">
                <button className="btn-outline w-full px-4 py-2 text-accent-purple-light rounded-lg">
                  Whitepaper
                </button>
              </Link>
              <button className="btn-primary w-full px-6 py-2 rounded-lg font-semibold">
                Launch App
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}