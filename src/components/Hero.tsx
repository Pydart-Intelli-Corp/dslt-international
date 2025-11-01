'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState, useMemo } from 'react'
import CountUp from 'react-countup'
import { GiftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const stats = [
  { 
    value: 2500, 
    label: 'Million Total Supply',
    color: 'text-accent-purple',
    dotColor: 'bg-accent-purple'
  },
  {
    value: 1200,
    label: 'Million Community Tokens',
    color: 'text-accent-purple-light',
    dotColor: 'bg-accent-purple-light'
  },
  { 
    value: 375, 
    label: 'Million Referral Pool',
    color: 'text-accent-green',
    dotColor: 'bg-accent-green'
  },
  { 
    value: 15, 
    label: 'Main Mining Blocks',
    color: 'text-accent-blue',
    dotColor: 'bg-accent-blue'
  },
]

export default function Hero() {
  const [ref, inView] = useInView({
    threshold: 0.1, // Reduced threshold for mobile compatibility
    triggerOnce: true,
    rootMargin: '50px 0px', // Add margin to trigger earlier
  })

  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Memoize particles to prevent re-creation on every render
  const particles = useMemo(() => 
    [...Array(6)].map((_, i) => ({
      id: i,
      className: `particle particle-${(i % 3) + 1}`,
      style: {
        left: `${20 + i * 12}%`,
        top: `${30 + (i * 10) % 40}%`,
        animationDelay: `${i * 1.5}s`,
      }
    }))
  , [])

  useEffect(() => {
    setMounted(true)
    
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video Background - Same for both mobile and desktop */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          preload="metadata"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg-deeper/80 via-dark-bg-deeper/60 to-dark-bg-deeper/80"></div>
      </div>

      {/* Crypto Mining Background Effects - Mobile Minimal, Desktop Full */}
      <div className="absolute inset-0">
        {/* Mining Hash Rate Indicators - Reduced on mobile */}
        <div className={`absolute bottom-0 right-0 opacity-15 ${isMobile ? 'w-1/3 h-1/2' : 'w-2/3 h-4/5'}`}>
          {[...Array(isMobile ? 3 : 6)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 h-full w-px bg-gradient-to-t from-accent-purple/30 to-transparent"
              style={{
                right: `${isMobile ? 20 + i * 25 : 40 + i * 30}px`,
                height: `${60 + i * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Crypto Mining Particles - Minimal on mobile */}
        {[...Array(isMobile ? 4 : 12)].map((_, i) => (
          <div
            key={`crypto-${i}`}
            className="absolute animate-bounce"
            style={{
              left: `${15 + i * (isMobile ? 20 : 7)}%`,
              top: `${25 + (i * 12) % 50}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: '3s',
            }}
          >
            <div className={`${isMobile ? 'text-sm opacity-20' : 'text-lg opacity-30'} ${
              i % 4 === 0 ? 'text-accent-green' : 
              i % 4 === 1 ? 'text-accent-blue' : 
              i % 4 === 2 ? 'text-accent-purple' : 'text-yellow-400'
            }`}>
              {i % 4 === 0 ? '₿' : i % 4 === 1 ? 'Ξ' : i % 4 === 2 ? '⟐' : '◊'}
            </div>
          </div>
        ))}

        {/* Mining Hash Indicators - Minimal on mobile */}
        {[...Array(isMobile ? 3 : 8)].map((_, i) => (
          <div
            key={`hash-${i}`}
            className={`absolute text-xs font-mono animate-pulse ${isMobile ? 'opacity-10' : 'opacity-20'}`}
            style={{
              right: `${10 + i * (isMobile ? 25 : 12)}%`,
              top: `${20 + i * 8}%`,
              color: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#572c7c' : '#00ff88',
              animationDelay: `${i * 1.2}s`,
            }}
          >
            #
          </div>
        ))}

        {/* Blockchain Connection Lines - Hidden on mobile for cleaner look */}
        {!isMobile && [...Array(5)].map((_, i) => (
          <div
            key={`connection-${i}`}
            className="absolute opacity-15 animate-pulse"
            style={{
              left: `${25 + i * 15}%`,
              top: `${45 + i * 10}%`,
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
        
        {/* Crypto Mining Status Indicators - Hidden on mobile */}
        {!isMobile && (
          <div className="absolute top-20 left-10 opacity-30">
            <div className="flex flex-col space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    i === 0 ? 'bg-accent-green' : i === 1 ? 'bg-accent-blue' : 'bg-accent-purple'
                  }`} style={{ animationDelay: `${i * 0.5}s` }} />
                  <div className="text-xs font-mono text-text-secondary">
                    {i === 0 ? 'MINING' : i === 1 ? 'STAKING' : 'TRADING'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Blockchain Network Visual */}
        <div className="absolute top-1/3 right-10 opacity-20 hidden xl:block">
          <div className="relative">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full border-2 border-accent-blue animate-pulse"
                style={{
                  left: `${i * 15}px`,
                  top: `${Math.sin(i) * 20}px`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
            {/* Connection lines between nodes */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-px bg-accent-blue opacity-50 animate-pulse"
                style={{
                  left: `${3 + i * 15}px`,
                  top: `${6 + Math.sin(i) * 20}px`,
                  transform: `rotate(${Math.atan2(Math.sin(i + 1) - Math.sin(i), 15) * 180 / Math.PI}deg)`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Floating particles - Same for both platforms */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={particle.className}
            style={particle.style}
          />
        ))}

        {/* Mining Rig Visual Elements - Hidden on mobile */}
        {!isMobile && [...Array(5)].map((_, i) => (
          <div
            key={`rig-${i}`}
            className="absolute opacity-40"
            style={{
              left: `${30 + i * 12}%`,
              top: `${60 + i * 8}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <div className="flex space-x-1">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className={`w-1 h-4 rounded-sm animate-pulse ${
                    j === 0 ? 'bg-accent-green' : j === 1 ? 'bg-accent-blue' : 'bg-accent-purple'
                  }`}
                  style={{
                    animationDelay: `${(i * 3 + j) * 0.3}s`,
                    animationDuration: '2s',
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Additional overlay for depth - Reduced on mobile */}
        <div className={`absolute bottom-0 right-0 opacity-5 ${isMobile ? 'w-1/3 h-1/2' : 'w-2/3 h-4/5'}`}>
          {!isMobile && (
            <>
              <div className="absolute bottom-0 right-0 w-32 h-3/4 bg-gradient-to-t from-accent-purple/20 to-transparent"></div>
              <div className="absolute bottom-0 right-24 w-24 h-2/3 bg-gradient-to-t from-accent-purple-light/30 to-transparent"></div>
              <div className="absolute bottom-0 right-40 w-20 h-4/5 bg-gradient-to-t from-accent-blue/30 to-transparent"></div>
            </>
          )}
        </div>
      </div>

      {/* Main Content - Mobile Optimized Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen ${isMobile ? 'py-24' : 'py-20'}`}>
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Main Heading - Mobile Optimized */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`centure-heading font-bold leading-tight ${isMobile ? 'text-3xl mb-6' : 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8'}`}
            >
              <span className="block text-white">CRYPTO SECURE</span>
              <span className="block gradient-text">LEDGER TOKEN</span>
              <span className="block text-white">ECOSYSTEM</span>
            </motion.h1>

            {/* Subtitle - Mobile Optimized */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-text-secondary leading-relaxed max-w-lg mx-auto lg:mx-0 ${isMobile ? 'text-base mb-6' : 'text-lg md:text-xl mb-8'}`}
            >
              Building the future of crypto commerce through an integrated ecosystem of token utility, e-commerce, NFTs, staking, and digital payments.
            </motion.p>

            {/* Action Buttons - Small and in a row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-row gap-3 justify-center lg:justify-start"
            >
              <a href="https://app.dsltoken.com/login">
                <button className={`btn-primary rounded-xl font-semibold ${isMobile ? 'px-4 py-2 text-sm' : 'px-4 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-lg'}`}>
                  SIGN UP
                </button>
              </a>
              <a href="https://app.dsltoken.com/login">
                <button className={`btn-outline rounded-xl font-semibold text-accent-purple-light ${isMobile ? 'px-4 py-2 text-sm' : 'px-4 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-lg'}`}>
                  LOGIN
                </button>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Launch Airdrop Program - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`flex justify-center lg:justify-end ${isMobile ? 'mt-8' : ''}`}
          >
            <div className={`cyber-card relative overflow-hidden ${isMobile ? 'p-6 rounded-xl max-w-sm w-full mx-4' : 'p-8 rounded-2xl max-w-md w-full'}`}>
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 to-accent-purple-light/5 pointer-events-none"></div>
              
              {/* Header Section */}
              <div className="relative z-10">
                {/* Icon and Badge */}
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className={`rounded-2xl bg-gradient-purple flex items-center justify-center shadow-neon-purple ${isMobile ? 'w-16 h-16' : 'w-20 h-20'}`}>
                      <GiftIcon className={`text-white ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                    </div>
                    {/* Floating indicator */}
                    <div className={`absolute -top-2 -right-2 bg-accent-green rounded-full border-2 border-dark-bg-deeper flex items-center justify-center ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`}>
                      <span className={`font-bold text-white ${isMobile ? 'text-xs' : 'text-xs'}`}>!</span>
                    </div>
                  </div>
                </div>

                {/* Launch Airdrop Title */}
                <h3 className={`centure-heading font-bold text-white text-center mb-3 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                  Launch Airdrop
                </h3>

                {/* Launch Badge */}
                <div className="flex justify-center mb-4">
                  <span className={`px-4 py-1 bg-gradient-purple rounded-full font-semibold text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Early Adopter Program
                  </span>
                </div>
              </div>

              {/* Launch Airdrop Description */}
              <div className="relative z-10">
                <p className={`text-text-secondary text-center mb-4 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
                  Join DSLT ecosystem and participate in our{' '}
                  <span className="text-accent-purple-light font-bold bg-accent-purple/15 px-2 py-1 rounded">
                    36M Token Launch Airdrop
                  </span>{' '}
                  Strong incentives for early participation.
                </p>

                {/* Statistics Cards */}
                <div className={`grid grid-cols-2 gap-3 ${isMobile ? 'mb-4' : 'mb-6'}`}>
                  <div className={`glass-effect rounded-xl text-center ${isMobile ? 'p-2' : 'p-3'}`}>
                    <div className={`font-bold text-accent-purple-light ${isMobile ? 'text-base' : 'text-lg'}`}>36M</div>
                    <div className={`text-text-secondary ${isMobile ? 'text-xs' : 'text-xs'}`}>Launch Tokens</div>
                  </div>
                  <div className={`glass-effect rounded-xl text-center ${isMobile ? 'p-2' : 'p-3'}`}>
                    <div className={`font-bold text-accent-green ${isMobile ? 'text-base' : 'text-lg'}`}>15%</div>
                    <div className={`text-text-secondary ${isMobile ? 'text-xs' : 'text-xs'}`}>Referral Pool</div>
                  </div>
                </div>

                {/* Token Allocation Section */}
                <div className={isMobile ? 'mb-4' : 'mb-6'}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-text-secondary ${isMobile ? 'text-xs' : 'text-sm'}`}>Community Allocation</span>
                    <span className={`font-semibold text-accent-purple-light ${isMobile ? 'text-xs' : 'text-sm'}`}>48%</span>
                  </div>
                  <div className="relative">
                    <div className={`w-full bg-dark-surface/50 rounded-full overflow-hidden ${isMobile ? 'h-2' : 'h-3'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '48%' }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-full bg-gradient-purple rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className={`text-accent-purple-light font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      1,200M Tokens for Community
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="relative z-10">
                <a href="https://app.dsltoken.com/login">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`btn-primary w-full rounded-xl font-bold text-white relative overflow-hidden group ${isMobile ? 'py-3' : 'py-4'}`}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <GiftIcon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                      <span className={isMobile ? 'text-sm' : 'text-base'}>JOIN EARLY ADOPTERS</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-purple-light to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                </a>
                
                {/* Multi-Mining Info */}
                <p className={`text-center text-accent-purple-light mt-2 font-medium ${isMobile ? 'text-xs' : 'text-xs'}`}>
                  ⚡ Multi-Mining System Active - +10% per block completion
                </p>
                
                {/* Contract Address */}
                <div className={`mt-4 p-2 glass-effect rounded-lg border border-accent-purple/30`}>
                  <div className="text-center">
                    <p className={`text-text-secondary mb-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                      Contract Address:
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <code className={`text-accent-blue font-mono bg-dark-surface/50 px-1.5 py-0.5 rounded ${isMobile ? 'text-xs' : 'text-xs'} break-all`}>
                        0x6652b040dc603df11be01ceedcbf3ba0965fe8c1
                      </code>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          navigator.clipboard.writeText('0x6652b040dc603df11be01ceedcbf3ba0965fe8c1')
                          // You could add a toast notification here
                        }}
                        className="text-accent-purple-light hover:text-accent-blue transition-colors duration-200"
                        title="Copy to clipboard"
                      >
                        <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Statistics - Mobile Optimized Animations */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: isMobile ? 30 : 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 30 : 50 }}
          transition={{ duration: isMobile ? 0.6 : 0.8, delay: isMobile ? 0.3 : 0.6 }}
          className={isMobile ? 'mt-8 mb-8' : 'mt-12 sm:mt-16 mb-12 sm:mb-16'}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 20 : 30 }}
                transition={{ 
                  duration: isMobile ? 0.4 : 0.6, 
                  delay: isMobile ? 0.5 + index * 0.1 : 0.8 + index * 0.1 
                }}
                whileHover={isMobile ? {} : { y: -5, scale: 1.02 }}
                className="glass-card rounded-xl p-4 sm:p-5 text-center relative overflow-hidden group"
              >
                {/* Background gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: stat.color === 'text-accent-purple' 
                      ? 'radial-gradient(circle at center, rgba(87,44,124,0.15), transparent)'
                      : stat.color === 'text-accent-purple-light'
                      ? 'radial-gradient(circle at center, rgba(130,49,199,0.15), transparent)'
                      : stat.color === 'text-accent-green'
                      ? 'radial-gradient(circle at center, rgba(0,255,136,0.15), transparent)'
                      : 'radial-gradient(circle at center, rgba(0,212,255,0.15), transparent)'
                  }}
                ></div>

                {/* Icon/Dot indicator */}
                <div className="flex justify-center mb-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${stat.dotColor} animate-pulse`}></div>
                </div>
                
                {/* Stat Value */}
                <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${stat.color} mb-1.5 relative z-10`}>
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    delay={1.2 + index * 0.2}
                    separator=","
                  />
                </div>
                
                {/* Stat Label */}
                <div className="text-xs sm:text-sm text-text-secondary font-medium relative z-10">
                  {stat.label}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  style={{
                    color: stat.color === 'text-accent-purple' 
                      ? '#572c7c'
                      : stat.color === 'text-accent-purple-light'
                      ? '#8231c7'
                      : stat.color === 'text-accent-green'
                      ? '#00ff88'
                      : '#00d4ff'
                  }}
                ></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}