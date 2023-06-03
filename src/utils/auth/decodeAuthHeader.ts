import * as jwt from 'jsonwebtoken';
import { APP_SECRET } from '../constant';

export interface AuthTokenPayload {
  userId: string;
}

export interface OtpTokenPayload {
  email: string;
}

/**
 * @deprecated
 */
export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new Error('No token found');
  }

  return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}

export function decodeAuthHeaderWithClerk(authHeader: String): string {
  const clerkUserId = authHeader.replace('Bearer ', '');

  if (!clerkUserId) {
    throw new Error('No clerkUserId found');
  }

  return clerkUserId;
}
