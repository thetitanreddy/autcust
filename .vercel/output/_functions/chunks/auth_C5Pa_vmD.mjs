import { jwtVerify } from 'jose';

async function verifyAdminSession(cookies) {
  const sessionCookie = cookies.get("admin_session");
  if (!sessionCookie) return false;
  try {
    const jwtSecret = undefined                           || "fallback_secret_for_dev_only";
    const secret = new TextEncoder().encode(jwtSecret);
    await jwtVerify(sessionCookie.value, secret);
    return true;
  } catch (err) {
    return false;
  }
}

export { verifyAdminSession as v };
