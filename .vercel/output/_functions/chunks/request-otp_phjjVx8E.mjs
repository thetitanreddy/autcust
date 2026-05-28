import { SignJWT } from 'jose';
import nodemailer from 'nodemailer';

const prerender = false;
const POST = async ({ cookies }) => {
  try {
    const adminEmail = undefined                           ;
    const jwtSecret = undefined                           || "fallback_secret_for_dev_only";
    if (!adminEmail) {
      console.warn("ADMIN_EMAIL is not set in environment variables.");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const otp = Math.floor(1e3 + Math.random() * 9e3).toString();
    const smtpHost = undefined                         ;
    if (smtpHost) ; else {
      console.log("====================================");
      console.log(`DEVELOPMENT MODE - OTP for ${adminEmail}: ${otp}`);
      console.log("====================================");
    }
    const secret = new TextEncoder().encode(jwtSecret);
    const jwt = await new SignJWT({ otp }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("5m").sign(secret);
    cookies.set("otp_pending", jwt, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 5
      // 5 minutes
    });
    return new Response(JSON.stringify({ success: true, message: "OTP sent" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Request OTP Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
