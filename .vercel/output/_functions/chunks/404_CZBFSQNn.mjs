import { c as createComponent } from './astro-component_tHHC9fc_.mjs';
import 'piccolore';
import { u as renderTemplate, t as renderHead } from './entrypoint_DhY-FsdM.mjs';
import 'clsx';
/* empty css                 */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="viewport" content="width=device-width"><title>404: Page Not Found | AutcustDev</title><meta name="robots" content="noindex"><!-- Analytics --><script defer src="/_vercel/insights/script.js"><\/script>', `</head> <body> <main class="container text-center"> <div class="glass-panel" style="margin-top: 4rem;"> <h1 style="font-size: 6rem; line-height: 1;">404</h1> <h2>Page Not Found</h2> <p>The page you are looking for doesn't exist or has been moved.</p> <a href="/" class="btn mt-4">Return Home</a> </div> </main> </body></html>`])), renderHead());
}, "C:/Users/bobby/Documents/ag-project/src/pages/404.astro", void 0);

const $$file = "C:/Users/bobby/Documents/ag-project/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
