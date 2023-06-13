import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export const APP_SECRET = process.env.APP_SECRET as string;

export const OTP_SECRET = process.env.OTP_SECRET as string;

export interface AuthTokenPayload {
  clerkUserId: string;
}

export interface OtpTokenPayload {
  email: string;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new Error('No token found');
  }

  return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}
