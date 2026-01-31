export interface StoredComponent {
  id: string
  code: string
  timestamp: number
}

export interface ShareData {
  id: string
  code: string
}

const STORAGE_PREFIX = "devdeck-"
const MAX_SAVED_COMPONENTS = 10

export function saveComponent(componentId: string, code: string): void {
  try {
    const stored: StoredComponent = {
      id: componentId,
      code,
      timestamp: Date.now(),
    }
    localStorage.setItem(`${STORAGE_PREFIX}${componentId}`, JSON.stringify(stored))
  } catch (err) {
    console.error("Failed to save component:", err)
  }
}

export function loadComponent(componentId: string): StoredComponent | null {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${componentId}`)
    return item ? JSON.parse(item) : null
  } catch (err) {
    console.error("Failed to load component:", err)
    return null
  }
}

export function getAllSavedComponents(): StoredComponent[] {
  try {
    const items: StoredComponent[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(STORAGE_PREFIX)) {
        const item = localStorage.getItem(key)
        if (item) {
          items.push(JSON.parse(item))
        }
      }
    }
    return items.sort((a, b) => b.timestamp - a.timestamp).slice(0, MAX_SAVED_COMPONENTS)
  } catch (err) {
    console.error("Failed to get saved components:", err)
    return []
  }
}

export function deleteComponent(componentId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${componentId}`)
  } catch (err) {
    console.error("Failed to delete component:", err)
  }
}

export function encodeShareUrl(data: ShareData): string {
  try {
    return btoa(JSON.stringify(data))
  } catch (err) {
    console.error("Failed to encode share URL:", err)
    return ""
  }
}

export function decodeShareUrl(encoded: string): ShareData | null {
  try {
    return JSON.parse(atob(encoded))
  } catch (err) {
    console.error("Failed to decode share URL:", err)
    return null
  }
}
