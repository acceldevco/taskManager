// /utils/rateLimiter.ts

interface RateLimit {
  count: number;
  lastRequestTime: number;
}

// نرخ محدودکننده ساده In-Memory
const rateLimitStore: { [key: string]: RateLimit } = {}

export async function isRateLimited(key: string, windowMs: number = 60000, maxRequests: number = 60) {
  const currentTime = Date.now()

  // بررسی اینکه آیا برای این کلید زمان پنجره (window) تمام شده است یا خیر
  const windowStart = currentTime - windowMs
  if (!rateLimitStore[key]) {
    rateLimitStore[key] = { count: 0, lastRequestTime: currentTime }
  }

  const userRateLimit = rateLimitStore[key]

  // اگر درخواست قبلی مربوط به پنجره زمانی قبلی باشد
  if (userRateLimit.lastRequestTime < windowStart) {
    userRateLimit.count = 0
    userRateLimit.lastRequestTime = currentTime
  }

  userRateLimit.count += 1

  // اگر تعداد درخواست‌ها بیشتر از حداکثر مجاز باشد
  if (userRateLimit.count > maxRequests) {
    return true
  }

  return false
}
