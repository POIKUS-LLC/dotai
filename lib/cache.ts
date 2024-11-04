type CacheEntry = {
  data: any
  timestamp: number
}

const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds
const cache = new Map<string, CacheEntry>()

export function getCachedData(key: string) {
  const entry = cache.get(key)
  if (!entry) return null

  const isExpired = Date.now() - entry.timestamp > CACHE_DURATION
  if (isExpired) {
    cache.delete(key)
    return null
  }

  return entry.data
}

export function setCachedData(key: string, data: any) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
}
