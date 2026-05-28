import { jwtVerify } from 'jose';
import type { AstroCookies } from 'astro';

export async function verifyAdminSession(cookies: AstroCookies): Promise<boolean> {
  const sessionCookie = cookies.get('admin_session');
  if (!sessionCookie) return false;

  try {
    const jwtSecret = import.meta.env.JWT_SECRET || 'fallback_secret_for_dev_only';
    const secret = new TextEncoder().encode(jwtSecret);
    await jwtVerify(sessionCookie.value, secret);
    return true;
  } catch (err) {
    return false;
  }
}
