export const prerender = false;

import type { APIRoute } from 'astro';
import { SignJWT } from 'jose';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data = await request.json();
    const email = data.email;

    const adminEmail = import.meta.env.ADMIN_EMAIL;
    const jwtSecret = import.meta.env.JWT_SECRET || 'fallback_secret_for_dev_only';
    
    if (!adminEmail) {
      console.warn("ADMIN_EMAIL is not set in environment variables.");
    }

    // Only allow the specific admin email
    if (email !== adminEmail) {
      return new Response(JSON.stringify({ error: 'Unauthorized email' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // In a real production scenario with SMTP configured:
    const smtpHost = import.meta.env.SMTP_HOST;
    if (smtpHost) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(import.meta.env.SMTP_PORT || '587'),
        secure: import.meta.env.SMTP_PORT === '465',
        auth: {
          user: import.meta.env.SMTP_USER,
          pass: import.meta.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Admin Dashboard" <${import.meta.env.SMTP_USER}>`,
        to: email,
        subject: 'Your Admin Dashboard OTP',
        text: `Your one-time password is: ${otp}. It will expire in 5 minutes.`,
        html: `<p>Your one-time password is: <strong>${otp}</strong></p><p>It will expire in 5 minutes.</p>`,
      });
    } else {
      // Fallback for development/testing if SMTP is not configured
      console.log('====================================');
      console.log(`DEVELOPMENT MODE - OTP for ${email}: ${otp}`);
      console.log('====================================');
    }

    // Sign the OTP into a JWT
    const secret = new TextEncoder().encode(jwtSecret);
    const jwt = await new SignJWT({ otp })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('5m')
      .sign(secret);

    // Set cookie
    cookies.set('otp_pending', jwt, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 60 * 5, // 5 minutes
    });

    return new Response(JSON.stringify({ success: true, message: 'OTP sent' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Request OTP Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
