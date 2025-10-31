'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Wrench, Clock, Mail, Twitter, MessageCircle } from 'lucide-react'

interface MaintenanceStatus {
  enabled: boolean
  message?: string
  customMessage?: string
  bypassKey?: string
  startTime?: string | null
  endTime?: string | null
  scheduledStart?: string | null
  scheduledEnd?: string | null
  autoScheduled?: boolean
  lastUpdated?: string | null
}

export default function MaintenancePage() {
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceStatus | null>(null)
  const [countdown, setCountdown] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Load maintenance data
  useEffect(() => {
    const loadMaintenanceData = async () => {
      try {
        // First check localStorage for recent admin changes
        const localConfig = localStorage.getItem('dslt_maintenance_config')
        if (localConfig) {
          const parsed = JSON.parse(localConfig)
          console.log('Loaded from localStorage:', parsed)
          setMaintenanceData(parsed)
          return
        }

        // Fallback to JSON file with cache busting
        const timestamp = Date.now()
        const response = await fetch(`/maintenance-status.json?t=${timestamp}`)
        const data = await response.json()
        console.log('Loaded from JSON file:', data)
        setMaintenanceData(data)
      } catch (error) {
        console.error('Failed to load maintenance data:', error)
      }
    }

    loadMaintenanceData()
    // Reload every 2 seconds to check for updates more frequently
    const interval = setInterval(loadMaintenanceData, 2000)
    return () => clearInterval(interval)
  }, [])

  // Calculate countdown display
  useEffect(() => {
    if (!maintenanceData) return

    const getCountdownDisplay = (): string => {
      // Prioritize the most appropriate end time
      let endTime = null
      
      // Use scheduledEnd if it exists and is in the future, otherwise use endTime
      if (maintenanceData.scheduledEnd) {
        const scheduledEndDate = new Date(maintenanceData.scheduledEnd)
        if (scheduledEndDate.getTime() > currentTime.getTime()) {
          endTime = maintenanceData.scheduledEnd
        }
      }
      
      // Fallback to endTime if scheduledEnd is not valid or in the past
      if (!endTime && maintenanceData.endTime) {
        const endTimeDate = new Date(maintenanceData.endTime)
        if (endTimeDate.getTime() > currentTime.getTime()) {
          endTime = maintenanceData.endTime
        }
      }
      
      console.log('Maintenance data for countdown:', maintenanceData)
      console.log('scheduledEnd:', maintenanceData.scheduledEnd)
      console.log('endTime:', maintenanceData.endTime)
      console.log('Selected end time:', endTime)
      
      if (!endTime) {
        return 'No valid end time scheduled'
      }

      const target = new Date(endTime)
      const now = currentTime
      const diff = target.getTime() - now.getTime()

      console.log('Time difference (ms):', diff)
      console.log('Target date:', target.toLocaleString())
      console.log('Current date:', now.toLocaleString())

      if (diff <= 0) {
        return 'Maintenance period has ended'
      }

      // Calculate time components more precisely
      const totalSeconds = Math.floor(diff / 1000)
      const totalMinutes = Math.floor(totalSeconds / 60)
      const totalHours = Math.floor(totalMinutes / 60)
      const days = Math.floor(totalHours / 24)
      
      const hours = totalHours % 24
      const minutes = totalMinutes % 60
      const seconds = totalSeconds % 60

      const parts = []
      
      if (days > 0) {
        parts.push(`${days} day${days !== 1 ? 's' : ''}`)
      }
      
      if (hours > 0) {
        parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`)
      }
      
      if (minutes > 0 && days === 0) {
        parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`)
      }
      
      if (seconds > 0 && days === 0 && hours === 0) {
        parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`)
      }

      if (parts.length === 0) {
        return 'Less than 1 second remaining'
      }

      return parts.join(', ')
    }

    setCountdown(getCountdownDisplay())
  }, [maintenanceData, currentTime])

  // Parse countdown for display components
  const getDisplayComponents = () => {
    if (!maintenanceData) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    // Use the same logic as getCountdownDisplay to select the appropriate end time
    let endTime = null
    
    if (maintenanceData.scheduledEnd) {
      const scheduledEndDate = new Date(maintenanceData.scheduledEnd)
      if (scheduledEndDate.getTime() > currentTime.getTime()) {
        endTime = maintenanceData.scheduledEnd
      }
    }
    
    if (!endTime && maintenanceData.endTime) {
      const endTimeDate = new Date(maintenanceData.endTime)
      if (endTimeDate.getTime() > currentTime.getTime()) {
        endTime = maintenanceData.endTime
      }
    }
    
    if (!endTime) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const target = new Date(endTime)
    const diff = target.getTime() - currentTime.getTime()

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const totalSeconds = Math.floor(diff / 1000)
    const totalMinutes = Math.floor(totalSeconds / 60)
    const totalHours = Math.floor(totalMinutes / 60)
    const days = Math.floor(totalHours / 24)
    
    return {
      days: days,
      hours: totalHours % 24,
      minutes: totalMinutes % 60,
      seconds: totalSeconds % 60
    }
  }

  const displayTime = getDisplayComponents()

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg-deeper via-dark-bg to-dark-bg-deeper relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(87,44,124,0.3)_0%,_rgba(0,0,0,0)_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(0,212,255,0.2)_0%,_rgba(0,0,0,0)_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(0,255,136,0.1)_0%,_rgba(0,0,0,0)_50%)]"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-purple-light/20 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Logo Section */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center space-x-4 mb-8"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image
                src="/logo.png"
                alt="DSLT Icon"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="relative w-40 h-16 md:w-48 md:h-20">
              <Image
                src="/dslt.png"
                alt="DSLT Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Maintenance Icon */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex justify-center mb-8"
          >
            <div className="p-6 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 rounded-full border border-accent-purple/30 backdrop-blur-sm">
              <Wrench className="w-16 h-16 text-accent-purple-light" />
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 bg-gradient-to-r from-accent-purple-light to-accent-blue bg-clip-text text-transparent">
              Under Maintenance
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed">
              {maintenanceData?.customMessage || maintenanceData?.message || 
               "We're upgrading our crypto ecosystem to serve you better. The future of digital payments is being enhanced!"}
            </p>

            {/* Countdown Timer */}
            <div className="bg-dark-surface/50 backdrop-blur-sm rounded-xl p-6 border border-accent-purple/30 mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-accent-blue" />
                <span className="text-text-secondary font-semibold">
                  {maintenanceData?.scheduledEnd ? 'Scheduled End Time' : 'Estimated Return Time'}
                </span>
              </div>
              
              {/* Full countdown text */}
              <div className="text-lg md:text-xl text-accent-purple-light font-semibold mb-4 text-center">
                {countdown || 'Loading...'}
              </div>
              
              {/* Visual countdown blocks */}
              <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                {[
                  { label: 'Days', value: displayTime.days },
                  { label: 'Hours', value: displayTime.hours },
                  { label: 'Minutes', value: displayTime.minutes },
                  { label: 'Seconds', value: displayTime.seconds }
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 rounded-lg p-3 border border-accent-purple/30">
                      <div className="text-xl md:text-2xl font-bold text-accent-purple-light">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-text-secondary uppercase tracking-wider">
                        {label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show scheduled times if available */}
              {maintenanceData && (
                <div className="mt-4 text-center text-sm text-text-secondary">
                  {(() => {
                    // Determine which end time is being used
                    let activeEndTime = null
                    let timeSource = ''
                    
                    if (maintenanceData.scheduledEnd) {
                      const scheduledEndDate = new Date(maintenanceData.scheduledEnd)
                      if (scheduledEndDate.getTime() > currentTime.getTime()) {
                        activeEndTime = maintenanceData.scheduledEnd
                        timeSource = 'Scheduled'
                      }
                    }
                    
                    if (!activeEndTime && maintenanceData.endTime) {
                      const endTimeDate = new Date(maintenanceData.endTime)
                      if (endTimeDate.getTime() > currentTime.getTime()) {
                        activeEndTime = maintenanceData.endTime
                        timeSource = 'Estimated'
                      }
                    }
                    
                    if (activeEndTime) {
                      return (
                        <>
                          <div>{timeSource} end time: {new Date(activeEndTime).toLocaleString()}</div>
                          {(maintenanceData.scheduledStart || maintenanceData.startTime) && (
                            <div>Started: {new Date(maintenanceData.scheduledStart || maintenanceData.startTime!).toLocaleString()}</div>
                          )}
                        </>
                      )
                    }
                    return <div>No valid end time found</div>
                  })()}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark-surface/30 backdrop-blur-sm rounded-lg p-4 border border-accent-blue/20"
              >
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-accent-blue" />
                  <div>
                    <div className="text-sm text-text-secondary">Contact Us</div>
                    <a 
                      href="mailto:dsltokenuk@gmail.com"
                      className="text-accent-blue hover:text-accent-purple-light transition-colors"
                    >
                      dsltokenuk@gmail.com
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark-surface/30 backdrop-blur-sm rounded-lg p-4 border border-accent-purple/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm text-text-secondary">Status</div>
                    <div className="text-accent-green font-semibold">System Upgrade in Progress</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4">
              {[
                { icon: Twitter, name: 'Twitter' },
                { icon: MessageCircle, name: 'Telegram' },
                { icon: Mail, name: 'Discord' }
              ].map((social) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className="w-12 h-12 bg-dark-surface/50 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-purple-light hover:bg-accent-purple/10 transition-all duration-300 border border-white/10 hover:border-accent-purple/30"
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Progress Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12"
          >
            <div className="text-sm text-text-secondary mb-2">Upgrade Progress</div>
            <div className="w-full bg-dark-surface/50 rounded-full h-2 border border-accent-purple/30">
              <motion.div
                className="bg-gradient-to-r from-accent-purple to-accent-blue h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 2, delay: 1 }}
              />
            </div>
            <div className="text-xs text-accent-purple-light mt-1">75% Complete</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}