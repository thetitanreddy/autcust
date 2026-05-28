import { c as createComponent } from './astro-component_tHHC9fc_.mjs';
import 'piccolore';
import { u as renderTemplate, s as renderComponent, d as Fragment, t as renderHead, k as addAttribute } from './entrypoint_DhY-FsdM.mjs';
import { $ as $$SEO } from './SEO_CPeF2n8F.mjs';
/* empty css                 */
import { d as db } from './firebase_z1RDMC4D.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let headline = "AutcustDev";
  let description = "Managing apps like MileMint and TorrentX with a secure, maintenance-free infrastructure.";
  let policies = [];
  try {
    const homeDoc = await db.collection("site_content").doc("home").get();
    if (homeDoc.exists) {
      const data = homeDoc.data();
      if (data?.headline) headline = data.headline;
      if (data?.description) description = data.description;
    }
    const policiesSnapshot = await db.collection("policies").get();
    policies = policiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching data from Firestore:", e);
  }
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-j7pv25f6> <head>', '<!-- Analytics --><script defer src="/_vercel/insights/script.js"><\/script>', '</head> <body style="display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; position: relative;" data-astro-cid-j7pv25f6> <nav class="hamburger-menu" data-astro-cid-j7pv25f6> <input type="checkbox" id="menu-toggle" data-astro-cid-j7pv25f6> <label for="menu-toggle" class="menu-icon" data-astro-cid-j7pv25f6> <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-j7pv25f6> <line x1="3" y1="12" x2="21" y2="12" data-astro-cid-j7pv25f6></line> <line x1="3" y1="6" x2="21" y2="6" data-astro-cid-j7pv25f6></line> <line x1="3" y1="18" x2="21" y2="18" data-astro-cid-j7pv25f6></line> </svg> </label> <div class="menu-content" data-astro-cid-j7pv25f6> <div class="menu-label" data-astro-cid-j7pv25f6>Navigation</div> <a href="/" class="menu-link" data-astro-cid-j7pv25f6>Home</a> <div class="divider-small" data-astro-cid-j7pv25f6></div> <div class="menu-label" data-astro-cid-j7pv25f6>Apps</div> <a href="/torrentx-privacy" class="menu-link" data-astro-cid-j7pv25f6>TorrentX Privacy Policy</a> ', ' </div> </nav> <main class="container text-center" style="max-width: 650px; padding: 2rem;" data-astro-cid-j7pv25f6> <div class="glass-panel" data-astro-cid-j7pv25f6> <h1 style="font-size: 2.5rem; margin-bottom: 1rem;" data-astro-cid-j7pv25f6>', '</h1> <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 0;" data-astro-cid-j7pv25f6>', "</p> </div> </main> </body></html>"])), renderComponent($$result, "SEO", $$SEO, { "title": "AutcustDev", "description": "AutcustDev Portfolio and Policies", "data-astro-cid-j7pv25f6": true }), renderHead(), policies.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` <div class="divider-small" data-astro-cid-j7pv25f6></div> <div class="menu-label" data-astro-cid-j7pv25f6>Company Policies</div> ${policies.map((policy) => renderTemplate`<a${addAttribute(`/policies/${policy.slug}`, "href")} class="menu-link" data-astro-cid-j7pv25f6>${policy.title}</a>`)}` })}`, headline, description);
}, "C:/Users/bobby/Documents/ag-project/src/pages/index.astro", void 0);

const $$file = "C:/Users/bobby/Documents/ag-project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
