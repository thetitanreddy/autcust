import { c as createComponent } from './astro-component_tHHC9fc_.mjs';
import 'piccolore';
import { s as renderComponent, t as renderHead, k as addAttribute, u as renderTemplate } from './entrypoint_DhY-FsdM.mjs';
import { r as renderScript } from './script_BRpOLtTc.mjs';
import { jwtVerify } from 'jose';
import { $ as $$SEO } from './SEO_CPeF2n8F.mjs';
/* empty css                 */
import { d as db } from './firebase_z1RDMC4D.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const sessionCookie = Astro2.cookies.get("admin_session");
  if (!sessionCookie) {
    return Astro2.redirect("/admin/login");
  }
  try {
    const jwtSecret = undefined                           || "fallback_secret_for_dev_only";
    const secret = new TextEncoder().encode(jwtSecret);
    await jwtVerify(sessionCookie.value, secret);
  } catch (err) {
    Astro2.cookies.delete("admin_session", { path: "/" });
    return Astro2.redirect("/admin/login");
  }
  let headline = "";
  let description = "";
  try {
    const doc = await db.collection("site_content").doc("home").get();
    if (doc.exists) {
      const data = doc.data();
      headline = data?.headline || "";
      description = data?.description || "";
    }
  } catch (e) {
    console.error("Error fetching home content:", e);
  }
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "SEO", $$SEO, { "title": "Dashboard | AutcustDev", "description": "Admin Dashboard", "noindex": true })}${renderHead()}</head> <body> <main class="container admin-layout"> <aside class="glass-panel" style="padding: 1.5rem;"> <h2 style="font-size: 1.5rem; margin-bottom: 2rem;">Admin Panel</h2> <nav class="admin-sidebar"> <a href="/admin" class="admin-nav-link active">Dashboard</a> <a href="/admin/policies" class="admin-nav-link">Manage Policies</a> <a href="/admin/settings" class="admin-nav-link">Settings</a> </nav> <div style="margin-top: auto; padding-top: 2rem;"> <form action="/api/auth/logout" method="POST"> <button type="submit" class="admin-nav-link" style="width: 100%; text-align: left; background: none; border: none; cursor: pointer; color: #ffffff;">Logout</button> </form> </div> </aside> <div class="content"> <div class="glass-panel mb-4"> <h1 style="font-size: 2rem; margin-bottom: 0;">Welcome Back</h1> <p style="margin-bottom: 0;">Here you can manage your website's main content.</p> </div> <div class="glass-panel" style="text-align: left;"> <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Edit Home Screen Content</h2> <form id="home-form"> <div class="form-group"> <label class="form-label" for="headline">Headline</label> <input type="text" id="headline" class="form-input mb-2"${addAttribute(headline, "value")} required> </div> <div class="form-group mt-4"> <label class="form-label" for="description">Description</label> <textarea id="description" class="form-input mb-2" rows="4" required>${description}</textarea> </div> <button type="submit" class="btn mt-4">Save Changes</button> <div id="home-msg" class="text-sm mt-2" style="display: none;"></div> </form> </div> </div> </main> ${renderScript($$result, "C:/Users/bobby/Documents/ag-project/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/bobby/Documents/ag-project/src/pages/admin/index.astro", void 0);
const $$file = "C:/Users/bobby/Documents/ag-project/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
