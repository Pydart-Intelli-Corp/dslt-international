'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Memoize background elements to prevent re-creation
  const backgroundElements = useMemo(() => ({
    orbs: [...Array(3)].map((_, i) => ({
      id: i,
      style: {
        background: i === 0 
          ? 'radial-gradient(circle, rgba(87,44,124,0.3) 0%, transparent 70%)'
          : i === 1
          ? 'radial-gradient(circle, rgba(130,49,199,0.3) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)',
        left: `${20 + i * 30}%`,
        top: `${20 + i * 25}%`,
        width: '250px',
        height: '250px',
        animationDelay: `${i * 7}s`,
      }
    })),
    particles: [...Array(8)].map((_, i) => ({
      id: i,
      className: `particle particle-${(i % 3) + 1}`,
      style: {
        left: `${15 + i * 10}%`,
        top: `${25 + (i * 12) % 50}%`,
        animationDelay: `${i * 1.2}s`,
      }
    })),
    twinkles: [...Array(6)].map((_, i) => ({
      id: i,
      style: {
        background: i % 3 === 0 ? '#572c7c' : i % 3 === 1 ? '#8231c7' : '#00d4ff',
        left: `${20 + i * 12}%`,
        top: `${30 + i * 8}%`,
        animationDelay: `${i * 0.8}s`,
        animationDuration: '2.5s',
      }
    }))
  }), [])

  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pt-32 bg-dark-bg-deeper overflow-hidden"
        >
          {/* Optimized Crypto Mining Background Effects - Mobile Friendly */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Cyber Grid - reduced opacity on mobile */}
            <div className={`absolute inset-0 cyber-grid ${isMobile ? 'opacity-1' : 'opacity-3'}`}></div>
            
            {/* Mining Hash Indicators - Now visible on mobile */}
            {[...Array(isMobile ? 4 : 6)].map((_, i) => (
              <div
                key={`hash-indicator-${i}`}
                className="absolute text-xs font-mono opacity-20 animate-pulse"
                style={{
                  left: `${20 + i * (isMobile ? 18 : 12)}%`,
                  top: `${25 + (i * 10) % 50}%`,
                  color: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#572c7c' : '#00ff88',
                  animationDelay: `${i * 0.8}s`,
                }}
              >
                {i % 2 === 0 ? '⬡' : '#'}
              </div>
            ))}
            
            {/* Crypto Symbols - Mobile Optimized */}
            {[...Array(isMobile ? 3 : 5)].map((_, i) => (
              <div
                key={`crypto-symbol-${i}`}
                className="absolute text-sm opacity-30 animate-bounce"
                style={{
                  left: `${30 + i * (isMobile ? 20 : 15)}%`,
                  top: `${40 + i * 12}%`,
                  color: i % 4 === 0 ? '#f7931a' : i % 4 === 1 ? '#627eea' : i % 4 === 2 ? '#00d4ff' : '#00ff88',
                  animationDelay: `${i * 1.5}s`,
                  animationDuration: '3s',
                }}
              >
                {i % 4 === 0 ? '₿' : i % 4 === 1 ? 'Ξ' : i % 4 === 2 ? '⟐' : '◊'}
              </div>
            ))}
            
            {/* Reduced Large Gradient Orbs - smaller on mobile */}
            {backgroundElements.orbs.map((orb) => (
              <div
                key={orb.id}
                className={`absolute rounded-full blur-2xl opacity-20 animate-float-slow ${isMobile ? 'scale-50' : ''}`}
                style={orb.style}
              />
            ))}
            
            {/* Mining Status Indicators */}
            <div className="absolute top-20 left-8 opacity-40 hidden md:block">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-xs font-mono text-accent-green">MINING ACTIVE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <span className="text-xs font-mono text-accent-blue">SYNCING BLOCKS</span>
                </div>
              </div>
            </div>
            
            {/* Optimized Floating Particles */}
            {backgroundElements.particles.map((particle) => (
              <div
                key={particle.id}
                className={particle.className}
                style={particle.style}
              />
            ))}

            {/* Reduced Twinkling Dots */}
            {backgroundElements.twinkles.map((twinkle) => (
              <div
                key={twinkle.id}
                className="absolute w-1 h-1 rounded-full animate-pulse"
                style={twinkle.style}
              />
            ))}
          </div>

          {/* Loading Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-0"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src="/logo.png"
                  alt="DSLT Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative w-48 h-16 md:w-64 md:h-20">
                <Image
                  src="/international.png"
                  alt="DSLT International"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Three Loading Dots */}
            <div className="flex items-center space-x-3">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-4 h-4 rounded-full bg-gradient-purple"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 text-text-secondary text-sm tracking-wider"
            >
              Loading the future of crypto...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
