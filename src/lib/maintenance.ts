// Maintenance Mode Configuration
export interface MaintenanceConfig {
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

// Default maintenance configuration
export const defaultMaintenanceConfig: MaintenanceConfig = {
  enabled: false,
  message: "We're upgrading our crypto ecosystem to serve you better. The future of digital payments is being enhanced!",
  bypassKey: "dslt_admin_2025",
  startTime: null,
  endTime: null,
  lastUpdated: null
}

// Fetch maintenance status from JSON file
export async function fetchMaintenanceStatus(): Promise<MaintenanceConfig> {
  try {
    const response = await fetch('/maintenance-status.json?t=' + Date.now(), {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    
    if (!response.ok) {
      console.warn('Failed to fetch maintenance status, using default')
      return defaultMaintenanceConfig
    }
    
    const config = await response.json()
    return { ...defaultMaintenanceConfig, ...config }
  } catch (error) {
    console.warn('Error fetching maintenance status:', error)
    return defaultMaintenanceConfig
  }
}

// Update maintenance status in JSON file (for client-side, this will be handled by admin)
export async function updateMaintenanceStatus(config: Partial<MaintenanceConfig>): Promise<boolean> {
  try {
    // In a real application, this would make an API call to update the server-side JSON
    // For now, we'll store in localStorage as backup and show instructions for manual update
    const currentConfig = await fetchMaintenanceStatus()
    const newConfig: MaintenanceConfig = {
      ...currentConfig,
      ...config,
      lastUpdated: new Date().toISOString()
    }
    
    // Store in localStorage for immediate client-side effect
    localStorage.setItem('dslt_maintenance_config', JSON.stringify(newConfig))
    
    return true
  } catch (error) {
    console.error('Error updating maintenance status:', error)
    return false
  }
}

// Check if maintenance mode is enabled
export async function isMaintenanceMode(): Promise<boolean> {
  try {
    // First check localStorage for immediate updates from admin
    const localConfig = localStorage.getItem('dslt_maintenance_config')
    if (localConfig) {
      const parsed: MaintenanceConfig = JSON.parse(localConfig)
      return parsed.enabled
    }
    
    // Fallback to JSON file
    const config = await fetchMaintenanceStatus()
    return config.enabled
  } catch (error) {
    console.error('Error checking maintenance mode:', error)
    return false
  }
}

// Synchronous version for immediate checks
export function isMaintenanceModeSync(): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    // Check localStorage first
    const localConfig = localStorage.getItem('dslt_maintenance_config')
    if (localConfig) {
      const parsed: MaintenanceConfig = JSON.parse(localConfig)
      return parsed.enabled
    }
    
    return false
  } catch (error) {
    return false
  }
}

// Enable maintenance mode
export async function enableMaintenanceMode(config?: Partial<MaintenanceConfig>): Promise<boolean> {
  const fullConfig: MaintenanceConfig = {
    ...defaultMaintenanceConfig,
    ...config,
    enabled: true,
    startTime: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  }
  
  return await updateMaintenanceStatus(fullConfig)
}

// Disable maintenance mode
export async function disableMaintenanceMode(): Promise<boolean> {
  const currentConfig = await fetchMaintenanceStatus()
  const updatedConfig: MaintenanceConfig = {
    ...currentConfig,
    enabled: false,
    endTime: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  }
  
  return await updateMaintenanceStatus(updatedConfig)
}

// Get current maintenance configuration
export async function getMaintenanceConfig(): Promise<MaintenanceConfig> {
  try {
    // Check localStorage first for recent admin changes
    const localConfig = localStorage.getItem('dslt_maintenance_config')
    if (localConfig) {
      const parsed: MaintenanceConfig = JSON.parse(localConfig)
      return { ...defaultMaintenanceConfig, ...parsed }
    }
    
    // Fallback to JSON file
    return await fetchMaintenanceStatus()
  } catch (error) {
    console.error('Error getting maintenance config:', error)
    return defaultMaintenanceConfig
  }
}

// Synchronous version for immediate access
export function getMaintenanceConfigSync(): MaintenanceConfig {
  if (typeof window === 'undefined') return defaultMaintenanceConfig
  
  try {
    const localConfig = localStorage.getItem('dslt_maintenance_config')
    if (localConfig) {
      const parsed: MaintenanceConfig = JSON.parse(localConfig)
      return { ...defaultMaintenanceConfig, ...parsed }
    }
    
    return defaultMaintenanceConfig
  } catch (error) {
    return defaultMaintenanceConfig
  }
}

// Check if current user can bypass maintenance mode
export function canBypassMaintenance(key?: string): boolean {
  const config = getMaintenanceConfigSync()
  
  // Check bypass key parameter
  if (key && config.bypassKey && key === config.bypassKey) {
    return true
  }
  
  // Check URL parameter
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const bypassParam = urlParams.get('bypass')
    if (bypassParam === config.bypassKey) {
      return true
    }
  }
  
  // Check bypass cookie
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';')
    const bypassCookie = cookies.find(cookie => 
      cookie.trim().startsWith('dslt_maintenance_bypass=')
    )
    if (bypassCookie && bypassCookie.includes('true')) {
      return true
    }
  }
  
  return false
}

// Set bypass cookie
export function setBypassCookie(): void {
  if (typeof document !== 'undefined') {
    const expires = new Date()
    expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)) // 24 hours
    document.cookie = `dslt_maintenance_bypass=true; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`
  }
}