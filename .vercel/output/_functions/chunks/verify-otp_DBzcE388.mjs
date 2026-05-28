import { jwtVerify, SignJWT } from 'jose';

const prerender = false;
const POST = async ({ request, cookies }) => {
  try {
    const data = await request.json();
    const providedOtp = data.otp;
    const otpPendingCookie = cookies.get("otp_pending");
    if (!otpPendingCookie) {
      return new Response(JSON.stringify({ error: "OTP expired or missing" }), { status: 400 });
    }
    const jwtSecret = undefined                           || "fallback_secret_for_dev_only";
    const secret = new TextEncoder().encode(jwtSecret);
    try {
      const { payload } = await jwtVerify(otpPendingCookie.value, secret);
      if (payload.otp !== providedOtp) {
        return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 400 });
      }
      cookies.delete("otp_pending", { path: "/" });
      const sessionJwt = await new SignJWT({ admin: true }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("24h").sign(secret);
      cookies.set("admin_session", sessionJwt, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24
        // 24 hours
      });
      return new Response(JSON.stringify({ success: true, message: "Logged in successfully" }), { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid or expired OTP token" }), { status: 400 });
    }
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
