// /middleware/authRateLimitMiddleware.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '../utils/jwt'
import { isRateLimited } from '../utils/rateLimiter'

const prisma = new PrismaClient()

export async function authRateLimitMiddleware(req: NextApiRequest, res: NextApiResponse, next: Function) {
  // گرفتن IP کاربر و URL درخواست
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const route = req.url || 'unknown'

  const key = `${ip}:${route}`

  // مرحله اول: بررسی محدودیت درخواست‌ها (Rate Limiting)
  const isLimited = await isRateLimited(key)

  if (isLimited) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  // مرحله دوم: بررسی توکن JWT (احراز هویت)
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' })
  }

  try {
    const decoded = verifyToken(token)

    // استفاده از Prisma برای بررسی اطلاعات کاربر در پایگاه داده
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId
      }
    })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    req.user = user // ذخیره اطلاعات کاربر در درخواست برای استفاده در API
    next() // ادامه پردازش درخواست
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
