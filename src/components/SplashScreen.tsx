'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    return () => clearTimeout(timer)
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
          {/* Animated Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
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

            {/* Twinkling Dots */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`twinkle-${i}`}
                className="absolute w-1 h-1 rounded-full animate-pulse"
                style={{
                  background: i % 3 === 0 ? '#572c7c' : i % 3 === 1 ? '#8231c7' : '#00d4ff',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
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
