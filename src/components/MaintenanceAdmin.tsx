'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Settings, 
  Power, 
  PowerOff, 
  Clock, 
  Shield, 
  Eye, 
  Save,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  FileText
} from 'lucide-react'
import { 
  isMaintenanceMode, 
  enableMaintenanceMode, 
  disableMaintenanceMode,
  getMaintenanceConfig,
  type MaintenanceConfig 
} from '@/lib/maintenance'

export default function MaintenanceAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false)
  const [config, setConfig] = useState<MaintenanceConfig>({
    enabled: false,
    message: "We're upgrading our crypto ecosystem to serve you better.",
    bypassKey: "dslt_admin_2025"
  })
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null)
  const [customDuration, setCustomDuration] = useState({ hours: 0, days: 0, months: 0 })
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const currentConfig = await getMaintenanceConfig()
        setConfig(currentConfig)
        const enabled = await isMaintenanceMode()
        setMaintenanceEnabled(enabled)
      } catch (error) {
        console.error('Failed to load maintenance config:', error)
        setNotification({ type: 'error', message: 'Failed to load configuration' })
      }
    }
    
    loadConfig()
  }, [])

  const authenticate = () => {
    if (password === 'dslt2025admin') {
      setIsAuthenticated(true)
      setNotification({ type: 'success', message: 'Authentication successful' })
    } else {
      setNotification({ type: 'error', message: 'Invalid password' })
    }
  }

  const toggleMaintenance = async () => {
    try {
      const newEnabled = !maintenanceEnabled
      setMaintenanceEnabled(newEnabled)
      
      // Update config with new enabled state
      await updateConfig({ 
        enabled: newEnabled,
        startTime: newEnabled ? new Date().toISOString() : config.startTime,
        endTime: newEnabled ? null : new Date().toISOString()
      })
      
      setNotification({ 
        type: 'success', 
        message: `Maintenance mode ${newEnabled ? 'enabled' : 'disabled'} successfully!` 
      })
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to update maintenance mode' })
    }
  }

  const updateConfig = async (updates: Partial<MaintenanceConfig>) => {
    const newConfig = { ...config, ...updates, lastUpdated: new Date().toISOString() }
    setConfig(newConfig)
    
    try {
      // Always save to localStorage for immediate updates
      localStorage.setItem('dslt_maintenance_config', JSON.stringify(newConfig))
      
      // Also try to update the JSON file
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig)
      })

      if (response.ok) {
        setNotification({ type: 'success', message: 'Configuration updated successfully!' })
      } else {
        setNotification({ type: 'success', message: 'Configuration updated locally. JSON file update may be needed for persistence.' })
      }
    } catch (error) {
      // Still save to localStorage even if API fails
      localStorage.setItem('dslt_maintenance_config', JSON.stringify(newConfig))
      setNotification({ type: 'success', message: 'Configuration updated locally. JSON file update may be needed for persistence.' })
    }
  }

  const refresh = async () => {
    try {
      const currentConfig = await getMaintenanceConfig()
      setConfig(currentConfig)
      const enabled = await isMaintenanceMode()
      setMaintenanceEnabled(enabled)
      setNotification({ type: 'success', message: 'Status refreshed' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to refresh status' })
    }
  }

  const updateCustomDuration = (type: 'hours' | 'days' | 'months', value: number) => {
    const newCustomDuration = { ...customDuration, [type]: value }
    setCustomDuration(newCustomDuration)
    
    // Auto-calculate and update schedule if any duration is set
    if (newCustomDuration.hours > 0 || newCustomDuration.days > 0 || newCustomDuration.months > 0) {
      const startTime = new Date()
      const endTime = new Date(startTime)
      
      // Add the custom duration to end time
      endTime.setHours(endTime.getHours() + newCustomDuration.hours)
      endTime.setDate(endTime.getDate() + newCustomDuration.days)
      endTime.setMonth(endTime.getMonth() + newCustomDuration.months)

      updateConfig({ 
        scheduledStart: startTime.toISOString(),
        scheduledEnd: endTime.toISOString(),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString()
      })
      
      // Generate human-readable duration string for display
      const parts = []
      if (newCustomDuration.months > 0) parts.push(`${newCustomDuration.months} month${newCustomDuration.months > 1 ? 's' : ''}`)
      if (newCustomDuration.days > 0) parts.push(`${newCustomDuration.days} day${newCustomDuration.days > 1 ? 's' : ''}`)
      if (newCustomDuration.hours > 0) parts.push(`${newCustomDuration.hours} hour${newCustomDuration.hours > 1 ? 's' : ''}`)
      
      const durationString = parts.length > 0 ? parts.join(', ') : '0 hours'
      setNotification({ 
        type: 'success', 
        message: `Schedule updated: ${durationString} from now (${endTime.toLocaleString()})` 
      })
    } else {
      // Clear schedule if all values are 0
      updateConfig({ 
        scheduledStart: null,
        scheduledEnd: null,
        startTime: null,
        endTime: null
      })
    }
  }

  const scheduleMaintenanceStart = () => {
    const { hours, days, months } = customDuration
    
    if (hours === 0 && days === 0 && months === 0) {
      setNotification({ type: 'error', message: 'Please set a duration before scheduling' })
      return
    }

    const startTime = new Date()
    const endTime = new Date(startTime)
    
    // Add the custom duration to end time
    endTime.setHours(endTime.getHours() + hours)
    endTime.setDate(endTime.getDate() + days)
    endTime.setMonth(endTime.getMonth() + months)

    updateConfig({ 
      scheduledStart: startTime.toISOString(),
      scheduledEnd: endTime.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    })

    setNotification({ 
      type: 'success', 
      message: `Scheduled maintenance from ${startTime.toLocaleString()} to ${endTime.toLocaleString()}` 
    })
  }

  const clearSchedule = () => {
    setCustomDuration({ hours: 0, days: 0, months: 0 })
    updateConfig({ 
      startTime: null,
      endTime: null
    })
    
    setNotification({ type: 'success', message: 'Schedule cleared' })
  }

  const getCountdownDisplay = (targetTime: string): string => {
    const target = new Date(targetTime)
    const now = currentTime
    const diff = target.getTime() - now.getTime()

    if (diff <= 0) {
      return 'Time Reached / Started'
    }

    // Calculate time components more accurately
    const totalSeconds = Math.floor(diff / 1000)
    const totalMinutes = Math.floor(totalSeconds / 60)
    const totalHours = Math.floor(totalMinutes / 60)
    const days = Math.floor(totalHours / 24)
    
    const hours = totalHours % 24
    const minutes = totalMinutes % 60
    const seconds = totalSeconds % 60

    const parts = []
    
    // Always show days if > 0
    if (days > 0) {
      parts.push(`${days} day${days !== 1 ? 's' : ''}`)
    }
    
    // Show hours if days > 0 or hours > 0
    if (days > 0 || hours > 0) {
      parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`)
    }
    
    // Show minutes if less than 1 day remaining or if minutes > 0
    if (days === 0 && (hours > 0 || minutes > 0)) {
      parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`)
    }
    
    // Show seconds only if less than 1 hour remaining
    if (days === 0 && hours === 0) {
      parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`)
    }

    // If no parts, show "Less than 1 second"
    if (parts.length === 0) {
      return 'Less than 1 second'
    }

    return parts.join(', ')
  }

  const toggleAutoSchedule = async () => {
    const now = new Date()
    const startTime = config.startTime ? new Date(config.startTime) : null
    const endTime = config.endTime ? new Date(config.endTime) : null

    let shouldEnable = false
    let message = ''

    if (startTime && endTime) {
      if (now >= startTime && now <= endTime) {
        shouldEnable = true
        message = 'Auto-enabled maintenance (within scheduled time)'
      } else if (now < startTime) {
        message = `Maintenance will auto-start at ${startTime.toLocaleString()}`
      } else {
        message = 'Scheduled maintenance period has ended'
      }
    } else if (startTime && !endTime) {
      if (now >= startTime) {
        shouldEnable = true
        message = 'Auto-enabled maintenance (start time reached)'
      } else {
        message = `Maintenance will auto-start at ${startTime.toLocaleString()}`
      }
    } else {
      message = 'Please set start/end times for auto-scheduling'
      setNotification({ type: 'error', message })
      return
    }

    try {
      if (shouldEnable && !maintenanceEnabled) {
        await enableMaintenanceMode(config)
        setMaintenanceEnabled(true)
      } else if (!shouldEnable && maintenanceEnabled) {
        await disableMaintenanceMode()
        setMaintenanceEnabled(false)
      }
      
      setNotification({ type: 'success', message })
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to auto-schedule maintenance' })
    }
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Live clock update
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(clockTimer)
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg-deeper via-dark-bg to-dark-bg-deeper flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-dark-surface/50 backdrop-blur-sm rounded-xl p-8 border border-accent-purple/30">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="DSLT" fill className="object-contain" />
              </div>
              <div className="relative w-28 h-10">
                <Image src="/dslt.png" alt="DSLT" fill className="object-contain" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-text-primary mb-2">
              Admin Access
            </h1>
            <p className="text-text-secondary text-center mb-6">
              Enter admin password to manage maintenance mode
            </p>
            
            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && authenticate()}
                  className="w-full px-4 py-3 bg-dark-surface/50 border border-white/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={authenticate}
                className="w-full py-3 bg-gradient-to-r from-accent-purple to-accent-blue rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300"
              >
                <Shield className="w-5 h-5 inline mr-2" />
                Authenticate
              </motion.button>
            </div>
            
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg border ${
                  notification.type === 'success' 
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}
              >
                {notification.message}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg-deeper via-dark-bg to-dark-bg-deeper px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="DSLT" fill className="object-contain" />
            </div>
            <div className="relative w-32 h-12">
              <Image src="/dslt.png" alt="DSLT" fill className="object-contain" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Maintenance Control Panel
          </h1>
          <p className="text-text-secondary mb-4">
            Manage website maintenance mode and configuration
          </p>
          
          {/* Live Clock */}
          <div className="inline-flex items-center space-x-2 bg-dark-surface/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-accent-blue/20">
            <Clock className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-accent-blue font-mono">
              {currentTime.toLocaleString()}
            </span>
          </div>
        </motion.div>

        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg border flex items-center space-x-2 ${
              notification.type === 'success' 
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            <span>{notification.message}</span>
          </motion.div>
        )}

        {/* JSON File Update Helper */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-surface/50 backdrop-blur-sm rounded-xl p-6 border border-accent-green/30 mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-6 h-6 text-accent-green" />
            <h2 className="text-xl font-semibold text-text-primary">JSON File Update Required</h2>
          </div>
          <p className="text-sm text-text-secondary mb-4">
            Since this is a static site, changes are saved to localStorage but won't persist after page refresh. 
            Copy the content below and paste it into <code className="bg-dark-surface/50 px-2 py-1 rounded text-accent-green">public/maintenance-status.json</code>:
          </p>
          <div className="bg-dark-bg/50 p-4 rounded-lg border border-white/10 mb-4">
            <pre className="text-xs text-text-primary overflow-auto max-h-40 whitespace-pre-wrap font-mono">
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(config, null, 2))
                setNotification({ type: 'success', message: 'JSON content copied to clipboard!' })
              }}
              className="px-4 py-2 bg-accent-green/20 border border-accent-green/30 rounded-lg text-accent-green hover:bg-accent-green/30 transition-colors text-sm flex items-center space-x-2"
            >
              <span>📋</span>
              <span>Copy JSON</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const jsonWindow = window.open('', '_blank')
                if (jsonWindow) {
                  jsonWindow.document.write(`
                    <html>
                      <head><title>Maintenance Status JSON</title></head>
                      <body style="font-family: 'Courier New', monospace; padding: 20px; background: #1a1a1a; color: #fff; line-height: 1.5;">
                        <h2 style="color: #00ff88;">Copy this content to public/maintenance-status.json:</h2>
                        <pre style="background: #2a2a2a; padding: 15px; border-radius: 8px; overflow: auto; border: 1px solid #444;">${JSON.stringify(config, null, 2)}</pre>
                        <p style="margin-top: 20px; color: #888; font-size: 14px;">
                          After updating the JSON file, refresh the maintenance page to see changes.
                        </p>
                      </body>
                    </html>
                  `)
                  jsonWindow.document.close()
                }
              }}
              className="px-4 py-2 bg-accent-blue/20 border border-accent-blue/30 rounded-lg text-accent-blue hover:bg-accent-blue/30 transition-colors text-sm flex items-center space-x-2"
            >
              <span>🔗</span>
              <span>Open in New Tab</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Status & Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-surface/50 backdrop-blur-sm rounded-xl p-6 border border-accent-purple/30"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-accent-purple-light" />
              <h2 className="text-xl font-semibold text-text-primary">Status & Controls</h2>
            </div>

            {/* Current Status */}
            <div className="mb-6 p-4 bg-dark-surface/30 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-text-secondary">Maintenance Mode:</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${maintenanceEnabled ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <span className={`font-semibold ${maintenanceEnabled ? 'text-red-400' : 'text-green-400'}`}>
                    {maintenanceEnabled ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
              </div>
              
              {/* Schedule Information */}
              {(config.startTime || config.endTime) && (
                <div className="space-y-2 pt-3 border-t border-white/10">
                  <div className="text-xs text-text-secondary">Schedule:</div>
                  {config.startTime && (
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Start:</span>
                      <span className="text-accent-blue">{new Date(config.startTime).toLocaleString()}</span>
                    </div>
                  )}
                  {config.endTime && (
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">End:</span>
                      <span className="text-accent-purple-light">{new Date(config.endTime).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}
              

              
              {/* Live Countdown */}
              {config.startTime && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="text-xs text-text-secondary mb-2">Time Until Start:</div>
                  <div className="text-sm font-mono text-accent-purple-light">
                    {getCountdownDisplay(config.startTime)}
                  </div>
                </div>
              )}
            </div>

            {/* Main Toggle */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleMaintenance}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
                  maintenanceEnabled
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gradient-to-r from-accent-purple to-accent-blue text-white'
                }`}
              >
                {maintenanceEnabled ? <PowerOff className="w-5 h-5" /> : <Power className="w-5 h-5" />}
                <span>{maintenanceEnabled ? 'Disable Maintenance' : 'Enable Maintenance'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={refresh}
                className="w-full py-2 bg-dark-surface/50 border border-white/20 rounded-lg text-text-secondary hover:text-accent-blue transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Status</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  try {
                    // Clear localStorage to force reload from JSON file
                    localStorage.removeItem('dslt_maintenance_config')
                    
                    // Reload from JSON file
                    const response = await fetch('/maintenance-status.json?t=' + Date.now())
                    const data = await response.json()
                    setConfig(data)
                    setMaintenanceEnabled(data.enabled)
                    
                    setNotification({ type: 'success', message: 'Synced with JSON file successfully!' })
                  } catch (error) {
                    setNotification({ type: 'error', message: 'Failed to sync with JSON file' })
                  }
                }}
                className="w-full py-2 bg-accent-green/20 border border-accent-green/30 rounded-lg text-accent-green hover:bg-accent-green/30 transition-colors flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Sync from JSON File</span>
              </motion.button>

              {/* Auto-Schedule Toggle */}
              {(config.startTime || config.endTime) && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleAutoSchedule}
                  className="w-full py-2 bg-gradient-to-r from-accent-green/20 to-accent-blue/20 border border-accent-green/30 rounded-lg text-accent-green hover:bg-gradient-to-r hover:from-accent-green/30 hover:to-accent-blue/30 transition-all duration-300 text-sm flex items-center justify-center space-x-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>Enable Auto-Schedule</span>
                </motion.button>
              )}
            </div>

            {/* Bypass Info */}
            <div className="mt-6 p-3 bg-accent-blue/10 rounded-lg border border-accent-blue/30">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="w-4 h-4 text-accent-blue" />
                <span className="text-sm font-semibold text-accent-blue">Bypass Access</span>
              </div>
              <p className="text-xs text-text-secondary">
                Add <code className="bg-dark-surface/50 px-1 rounded">?bypass={config.bypassKey}</code> to any URL to bypass maintenance mode.
              </p>
            </div>
          </motion.div>

          {/* Configuration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-surface/50 backdrop-blur-sm rounded-xl p-6 border border-accent-blue/30"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="w-6 h-6 text-accent-blue" />
              <h2 className="text-xl font-semibold text-text-primary">Configuration</h2>
            </div>

            <div className="space-y-4">
              {/* Maintenance Message */}
              <div>
                <label className="block text-sm text-text-secondary mb-2">Maintenance Message</label>
                <textarea
                  value={config.message || ''}
                  onChange={(e) => updateConfig({ message: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-dark-surface/50 border border-white/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors resize-none"
                />
              </div>



              {/* Bypass Key */}
              <div>
                <label className="block text-sm text-text-secondary mb-2">Bypass Key</label>
                <input
                  type="text"
                  value={config.bypassKey || ''}
                  onChange={(e) => updateConfig({ bypassKey: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-surface/50 border border-white/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors font-mono text-sm"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Time-based Maintenance Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-accent-purple-light" />
            <span>Scheduled Maintenance</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Quick Duration Presets */}
            <div className="bg-dark-surface/50 backdrop-blur-sm rounded-xl p-6 border border-accent-purple/30">
              <h4 className="text-md font-semibold text-text-primary mb-4">Quick Presets</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '30 Minutes', hours: 0.5, days: 0, months: 0 },
                  { label: '1 Hour', hours: 1, days: 0, months: 0 },
                  { label: '2 Hours', hours: 2, days: 0, months: 0 },
                  { label: '4 Hours', hours: 4, days: 0, months: 0 },
                  { label: '8 Hours', hours: 8, days: 0, months: 0 },
                  { label: '12 Hours', hours: 12, days: 0, months: 0 },
                  { label: '1 Day', hours: 0, days: 1, months: 0 },
                  { label: '2 Days', hours: 0, days: 2, months: 0 }
                ].map((preset) => (
                  <motion.button
                    key={preset.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // Set custom duration
                      setCustomDuration({ hours: preset.hours, days: preset.days, months: preset.months })
                      
                      // Automatically schedule with this duration
                      const startTime = new Date()
                      const endTime = new Date(startTime)
                      
                      // Add the preset duration to end time
                      endTime.setHours(endTime.getHours() + preset.hours)
                      endTime.setDate(endTime.getDate() + preset.days)
                      endTime.setMonth(endTime.getMonth() + preset.months)

                      updateConfig({ 
                        scheduledStart: startTime.toISOString(),
                        scheduledEnd: endTime.toISOString(),
                        startTime: startTime.toISOString(),
                        endTime: endTime.toISOString()
                      })
                    }}
                    className="p-3 bg-dark-surface/30 border border-white/10 rounded-lg text-text-secondary hover:text-accent-purple-light hover:border-accent-purple/30 transition-all duration-300 text-sm"
                  >
                    {preset.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Time Settings */}
            <div className="bg-dark-surface/50 backdrop-blur-sm rounded-xl p-6 border border-accent-blue/30">
              <h4 className="text-md font-semibold text-text-primary mb-4">Custom Duration</h4>
              <div className="space-y-4">
                {/* Time Input Fields */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Hours</label>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      placeholder="0"
                      value={customDuration.hours || ''}
                      className="w-full px-2 py-2 bg-dark-surface/50 border border-white/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors text-center"
                      onChange={(e) => updateCustomDuration('hours', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Days</label>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      placeholder="0"
                      value={customDuration.days || ''}
                      className="w-full px-2 py-2 bg-dark-surface/50 border border-white/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors text-center"
                      onChange={(e) => updateCustomDuration('days', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">Months</label>
                    <input
                      type="number"
                      min="0"
                      max="12"
                      placeholder="0"
                      value={customDuration.months || ''}
                      className="w-full px-2 py-2 bg-dark-surface/50 border border-white/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors text-center"
                      onChange={(e) => updateCustomDuration('months', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                {/* Duration Preview */}
                {(customDuration.hours > 0 || customDuration.days > 0 || customDuration.months > 0) && (
                  <div className="p-3 bg-dark-bg/50 rounded-lg border border-accent-blue/20">
                    <div className="text-xs text-text-secondary mb-1">Calculated Duration:</div>
                    <div className="text-sm text-accent-blue">
                      {(() => {
                        const parts = []
                        if (customDuration.months > 0) parts.push(`${customDuration.months} month${customDuration.months > 1 ? 's' : ''}`)
                        if (customDuration.days > 0) parts.push(`${customDuration.days} day${customDuration.days > 1 ? 's' : ''}`)
                        if (customDuration.hours > 0) parts.push(`${customDuration.hours} hour${customDuration.hours > 1 ? 's' : ''}`)
                        return parts.join(', ') || '0 hours'
                      })()}
                    </div>
                    {config.scheduledEnd && (
                      <div className="text-xs text-accent-purple-light mt-1">
                        Ends: {new Date(config.scheduledEnd).toLocaleString()}
                      </div>
                    )}
                  </div>
                )}

                {/* Clear Duration Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCustomDuration({ hours: 0, days: 0, months: 0 })
                    updateConfig({ 
                      scheduledStart: null,
                      scheduledEnd: null,
                      startTime: null,
                      endTime: null
                    })
                    setNotification({ type: 'success', message: 'Custom duration cleared' })
                  }}
                  className="w-full py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors text-sm"
                >
                  Clear Duration
                </motion.button>

                {/* Scheduled Start/End Times */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 bg-dark-surface/50 border border-white/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors"
                      onChange={(e) => updateConfig({ startTime: e.target.value ? new Date(e.target.value).toISOString() : null })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">End Date & Time</label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 bg-dark-surface/50 border border-white/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors"
                      onChange={(e) => updateConfig({ endTime: e.target.value ? new Date(e.target.value).toISOString() : null })}
                    />
                  </div>
                </div>

                {/* Schedule Actions */}
                <div className="flex space-x-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scheduleMaintenanceStart()}
                    className="flex-1 py-2 bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 border border-accent-purple/30 rounded-lg text-accent-purple-light hover:bg-gradient-to-r hover:from-accent-purple/30 hover:to-accent-blue/30 transition-all duration-300 text-sm flex items-center justify-center space-x-1"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Schedule Start</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => clearSchedule()}
                    className="px-4 py-2 bg-dark-surface/30 border border-white/20 rounded-lg text-text-secondary hover:text-red-400 hover:border-red-500/30 transition-all duration-300 text-sm"
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}