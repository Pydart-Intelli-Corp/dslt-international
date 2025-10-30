'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg-deeper text-text-primary relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Cyber Grid */}
        <div className="absolute inset-0 cyber-grid opacity-3"></div>
        
        {/* Large Gradient Orbs */}
        {[...Array(8)].map((_, i) => (
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
              width: `${200 + Math.random() * 300}px`,
              height: `${200 + Math.random() * 300}px`,
              animationDelay: `${Math.random() * 20}s`,
            }}
          />
        ))}
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`particle particle-${(i % 3) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Number */}
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-9xl md:text-[12rem] font-bold mb-6"
          >
            <span className="gradient-text">404</span>
          </motion.h1>

          {/* Error Message */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto"
          >
            The page you're looking for doesn't exist or has been moved to another location in the DSLT ecosystem.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="btn-outline px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 text-accent-purple-light"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Go Back</span>
            </motion.button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 glass-card rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'About', href: '/about' },
                { name: 'Tokenomics', href: '#tokenomics' },
                { name: 'Roadmap', href: '#roadmap' },
                { name: 'Whitepaper', href: '/whitepaper' },
              ].map((link) => (
                <Link key={link.name} href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="p-4 bg-dark-surface/50 rounded-lg border border-white/10 hover:border-accent-purple/30 transition-all duration-300"
                  >
                    <span className="text-text-secondary hover:text-accent-purple-light transition-colors">
                      {link.name}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
