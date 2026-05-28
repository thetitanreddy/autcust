import { v as verifyAdminSession } from './auth_C5Pa_vmD.mjs';
import { d as db } from './firebase_z1RDMC4D.mjs';

const POST = async ({ request, cookies }) => {
  const isAuthenticated = await verifyAdminSession(cookies);
  if (!isAuthenticated) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const { slug, title, content } = await request.json();
    if (!slug || !title || !content) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }
    await db.collection("policies").doc(slug).set({
      slug,
      title,
      content,
      date: (/* @__PURE__ */ new Date()).toISOString()
    }, { merge: true });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating policy:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
