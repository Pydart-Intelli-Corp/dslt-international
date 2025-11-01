'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isMaintenanceMode, canBypassMaintenance, setBypassCookie } from '@/lib/maintenance'

interface MaintenanceCheckerProps {
  children: React.ReactNode
}

export default function MaintenanceChecker({ children }: MaintenanceCheckerProps) {
  const [isChecking, setIsChecking] = useState(true)
  const [inMaintenance, setInMaintenance] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkMaintenance = async () => {
      // Skip maintenance check for admin and maintenance pages
      if (pathname === '/admin' || pathname === '/maintenance') {
        setIsChecking(false)
        setInMaintenance(false)
        return
      }

      try {
        const maintenanceEnabled = await isMaintenanceMode()
        const canBypass = canBypassMaintenance()
        
        // Check for bypass in URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const bypassParam = urlParams.get('bypass')
        
        if (bypassParam === 'dslt_admin_2025') {
          setBypassCookie()
          // Redirect to clean URL without bypass parameter
          const cleanUrl = window.location.pathname
          router.replace(cleanUrl)
          setIsChecking(false)
          setInMaintenance(false)
          return
        }
        
        if (maintenanceEnabled && !canBypass) {
          setInMaintenance(true)
          // Force redirect to maintenance page
          window.location.href = '/maintenance'
          return
        } else {
          setInMaintenance(false)
        }
      } catch (error) {
        console.error('Error checking maintenance mode:', error)
        // On error, allow normal operation
        setInMaintenance(false)
      }
      
      setIsChecking(false)
    }

    checkMaintenance()
    
    // Check every 10 seconds for maintenance mode changes
    const interval = setInterval(() => {
      if (pathname !== '/admin' && pathname !== '/maintenance') {
        checkMaintenance()
      }
    }, 10000)
    
    return () => clearInterval(interval)
  }, [router, pathname])

  // Show loading spinner during maintenance check
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg-deeper via-dark-bg to-dark-bg-deeper flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-purple mx-auto mb-4"></div>
          <p className="text-text-secondary">Checking system status...</p>
        </div>
      </div>
    )
  }

  // If in maintenance mode, show nothing (redirect will happen)
  if (inMaintenance) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg-deeper via-dark-bg to-dark-bg-deeper flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-text-secondary">Redirecting to maintenance page...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}