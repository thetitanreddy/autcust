export const prerender = false;

import type { APIRoute } from 'astro';
import { jwtVerify, SignJWT } from 'jose';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data = await request.json();
    const providedOtp = data.otp;

    const otpPendingCookie = cookies.get('otp_pending');
    if (!otpPendingCookie) {
      return new Response(JSON.stringify({ error: 'OTP expired or missing' }), { status: 400 });
    }

    const jwtSecret = import.meta.env.JWT_SECRET || 'fallback_secret_for_dev_only';
    const secret = new TextEncoder().encode(jwtSecret);

    try {
      const { payload } = await jwtVerify(otpPendingCookie.value, secret);
      
      if (payload.otp !== providedOtp) {
        return new Response(JSON.stringify({ error: 'Invalid OTP' }), { status: 400 });
      }

      // OTP is valid. Clear pending cookie and set session cookie.
      cookies.delete('otp_pending', { path: '/' });

      // Create session JWT
      const sessionJwt = await new SignJWT({ admin: true })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(secret);

      cookies.set('admin_session', sessionJwt, {
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return new Response(JSON.stringify({ success: true, message: 'Logged in successfully' }), { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid or expired OTP token' }), { status: 400 });
    }
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
