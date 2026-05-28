import { c as createComponent } from './astro-component_tHHC9fc_.mjs';
import 'piccolore';
import { u as renderTemplate, y as unescapeHTML, t as renderHead, s as renderComponent } from './entrypoint_DhY-FsdM.mjs';
import { marked } from 'marked';
import { $ as $$SEO } from './SEO_CPeF2n8F.mjs';
/* empty css                 */
import { d as db } from './firebase_z1RDMC4D.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/404");
  }
  let policy = null;
  try {
    const doc = await db.collection("policies").doc(slug).get();
    if (doc.exists) {
      policy = doc.data();
    }
  } catch (e) {
    console.error("Error fetching policy:", e);
  }
  if (!policy) {
    return Astro2.redirect("/404");
  }
  const htmlContent = await marked.parse(policy.content);
  const updatedDate = new Date(policy.date).toDateString();
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head>', '<!-- Analytics --><script defer src="/_vercel/insights/script.js"><\/script>', '</head> <body> <main class="container"> <div class="glass-panel mb-4"> <a href="/" class="mb-4" style="display: inline-block;">&larr; Back to Home</a> <h1>', '</h1> <p class="text-sm">Last updated: ', '</p> <hr class="divider"> <div class="markdown-content">', "</div> </div> </main> </body></html>"])), renderComponent($$result, "SEO", $$SEO, { "title": `${policy.title} | AutcustDev`, "description": `Read the ${policy.title} for AutcustDev.`, "type": "article" }), renderHead(), policy.title, updatedDate, unescapeHTML(htmlContent));
}, "C:/Users/bobby/Documents/ag-project/src/pages/policies/[slug].astro", void 0);

const $$file = "C:/Users/bobby/Documents/ag-project/src/pages/policies/[slug].astro";
const $$url = "/policies/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$slug,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
