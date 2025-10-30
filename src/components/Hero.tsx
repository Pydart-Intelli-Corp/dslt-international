'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { GiftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const stats = [
  { 
    value: 1839, 
    label: 'Days on the market',
    color: 'text-accent-purple',
    dotColor: 'bg-accent-purple'
  },
  {
    value: 5812,
    label: 'Members',
    color: 'text-accent-purple-light',
    dotColor: 'bg-accent-purple-light'
  },
  { 
    value: 374103, 
    label: 'Arbitrage pools',
    prefix: '$',
    color: 'text-accent-green',
    dotColor: 'bg-accent-green'
  },
  { 
    value: 100812, 
    label: 'Total paid',
    prefix: '$',
    color: 'text-accent-blue',
    dotColor: 'bg-accent-blue'
  },
]

export default function Hero() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg-deeper/80 via-dark-bg-deeper/60 to-dark-bg-deeper/80"></div>
      </div>

      {/* Additional overlay for depth */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlay */}
        <div className="absolute bottom-0 right-0 w-2/3 h-4/5 opacity-5">
          <div className="absolute bottom-0 right-0 w-32 h-3/4 bg-gradient-to-t from-accent-purple/20 to-transparent"></div>
          <div className="absolute bottom-0 right-24 w-24 h-2/3 bg-gradient-to-t from-accent-purple-light/30 to-transparent"></div>
          <div className="absolute bottom-0 right-40 w-20 h-4/5 bg-gradient-to-t from-accent-blue/30 to-transparent"></div>
          <div className="absolute bottom-0 right-56 w-28 h-1/2 bg-gradient-to-t from-accent-purple/35 to-transparent"></div>
          <div className="absolute bottom-0 right-72 w-16 h-3/5 bg-gradient-to-t from-accent-blue/25 to-transparent"></div>
          <div className="absolute bottom-0 right-80 w-36 h-5/6 bg-gradient-to-t from-accent-purple-light/40 to-transparent"></div>
          
          {/* Vertical accent lines */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 h-full w-px bg-gradient-to-t from-accent-purple/30 via-accent-purple/10 to-transparent"
              style={{
                right: `${60 + i * 40}px`,
                height: `${60 + Math.random() * 40}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
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

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="centure-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8"
            >
              <span className="block text-white">CRYPTO SECURE</span>
              <span className="block gradient-text">LEDGER TOKEN</span>
              <span className="block text-white">ECOSYSTEM</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Building the future of crypto commerce through an integrated ecosystem of token utility, e-commerce, NFTs, staking, and digital payments.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link href="/about">
                <button className="btn-primary px-4 py-2.5 sm:px-8 sm:py-4 rounded-2xl font-semibold text-sm sm:text-lg">
                  GET STARTED
                </button>
              </Link>
              <Link href="/whitepaper">
                <button className="btn-outline px-4 py-2.5 sm:px-8 sm:py-4 rounded-2xl font-semibold text-sm sm:text-lg text-accent-purple-light">
                  LEARN MORE
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Registration Bonus */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="cyber-card p-8 rounded-2xl max-w-md w-full relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/8 to-accent-purple-light/5 pointer-events-none"></div>
              
              {/* Header Section */}
              <div className="relative z-10">
                {/* Icon and Badge */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-purple flex items-center justify-center shadow-neon-purple">
                      <GiftIcon className="w-8 h-8 text-white" />
                    </div>
                    {/* Floating indicator */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-green rounded-full border-2 border-dark-bg-deeper flex items-center justify-center">
                      <span className="text-xs font-bold text-white">!</span>
                    </div>
                  </div>
                </div>

                {/* Registration Bonus Title */}
                <h3 className="centure-heading text-2xl font-bold text-white text-center mb-3">
                  Registration bonus
                </h3>

                {/* Bonus Badge */}
                <div className="flex justify-center mb-4">
                  <span className="px-4 py-1 bg-gradient-purple rounded-full text-sm font-semibold text-white">
                    Limited Time Offer
                  </span>
                </div>
              </div>

              {/* Registration Description */}
              <div className="relative z-10">
                <p className="text-text-secondary text-center mb-6 leading-relaxed">
                  Join DSLT ecosystem and get exclusive access to{' '}
                  <span className="text-accent-purple-light font-bold bg-accent-purple/15 px-2 py-1 rounded">
                    $500 Token Bonus
                  </span>{' '}
                  Limited early adopter spots available.
                </p>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="glass-effect p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-accent-purple-light">$500</div>
                    <div className="text-xs text-text-secondary">Bonus Value</div>
                  </div>
                  <div className="glass-effect p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-accent-green">25</div>
                    <div className="text-xs text-text-secondary">Spots Left</div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-text-secondary">Early Adopters</span>
                    <span className="text-sm font-semibold text-accent-purple-light">75/100</span>
                  </div>
                  <div className="relative">
                    <div className="w-full h-3 bg-dark-surface/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-full bg-gradient-purple rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="relative z-10">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full py-4 rounded-xl font-bold text-white relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <GiftIcon className="w-5 h-5" />
                    <span>CLAIM BONUS NOW</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-purple-light to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
                
                {/* Urgency Text */}
                <p className="text-center text-xs text-accent-purple-light mt-2 font-medium">
                  ⚡ Limited time offer - 25 spots remaining
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Statistics */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 mb-12 sm:mb-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
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
                  {stat.prefix && <span className="text-lg sm:text-xl">{stat.prefix}</span>}
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