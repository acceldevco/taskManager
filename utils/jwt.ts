

// /utils/jwt.ts
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'

// تایپ مناسب برای payload
interface Payload {
  userId: string; // مثال برای داده‌های payload
  email: string;
}

const JWT_SECRET: string = process.env.JWT_SECRET || 'your_jwt_secret'
const JWT_ACCESS_EXPIRES_IN:any = process.env.JWT_ACCESS_EXPIRES_IN || '15m'
const JWT_REFRESH_EXPIRES_IN:any = process.env.JWT_REFRESH_EXPIRES_IN || '7d'

// توکن دسترسی (Access Token)
export function signAccessToken(payload: Payload): string {
  // The 'as jwt.Secret' cast is not strictly necessary here as JWT_SECRET is already typed as Secret,
  // and jwt.sign expects a Secret for the secretOrPrivateKey argument.
  // The error might stem from a subtle type inference issue or a specific version of the library.
  // Explicitly casting to 'string' can sometimes resolve such issues if 'Secret' is causing ambiguity.
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRES_IN });
}

// توکن تازه‌سازی (Refresh Token)
export function signRefreshToken(payload: Payload): string {
  // Similar to signAccessToken, casting JWT_SECRET to 'string' here.
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
}

// بررسی توکن
export function verifyToken(token: string): JwtPayload | string {
  try {
    // تایپ برگشتی هم مشخص می‌شود
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch (err) {
    // اضافه کردن جزئیات بیشتر برای خطا
    if (err instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired')
    } else if (err instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token')
    } else {
      throw new Error('An error occurred while verifying the token')
    }
  }
}
