import { v as verifyAdminSession } from './auth_C5Pa_vmD.mjs';
import { d as db } from './firebase_z1RDMC4D.mjs';

const POST = async ({ request, cookies }) => {
  const isAuthenticated = await verifyAdminSession(cookies);
  if (!isAuthenticated) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const { headline, description } = await request.json();
    await db.collection("site_content").doc("home").set({
      headline,
      description
    }, { merge: true });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating home content:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
