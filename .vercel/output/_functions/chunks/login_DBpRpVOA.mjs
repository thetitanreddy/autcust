import { c as createComponent } from './astro-component_tHHC9fc_.mjs';
import 'piccolore';
import { s as renderComponent, t as renderHead, u as renderTemplate } from './entrypoint_DhY-FsdM.mjs';
import { r as renderScript } from './script_BRpOLtTc.mjs';
import { $ as $$SEO } from './SEO_CPeF2n8F.mjs';
/* empty css                 */

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const sessionCookie = Astro2.cookies.get("admin_session");
  if (sessionCookie) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "SEO", $$SEO, { "title": "Admin Login | AutcustDev", "description": "Secure Admin Login", "noindex": true })}${renderHead()}</head> <body style="display: flex; align-items: center; justify-content: center; min-height: 100vh;"> <main class="container" style="max-width: 450px; padding-top: 10vh;"> <div class="glass-panel text-center"> <h1 style="font-size: 2rem;">Admin Login</h1> <p>Restricted access area.</p> <!-- Step 1: Email --> <div id="step-email"> <form id="email-form" class="form-group mt-4"> <p class="mb-4 text-sm" style="color: #a0aec0;">Click below to send a verification code to the registered admin email.</p> <button type="submit" id="send-otp-btn" class="btn" style="width: 100%;">Send OTP</button> <div id="email-error" class="error-msg"></div> </form> </div> <!-- Step 2: OTP --> <div id="step-otp" style="display: none;"> <p class="text-sm mt-4">Enter the 4-digit code sent to the admin email.</p> <form id="otp-form"> <div class="otp-container"> <input type="text" class="otp-input" maxlength="1" pattern="[0-9]" inputmode="numeric" required> <input type="text" class="otp-input" maxlength="1" pattern="[0-9]" inputmode="numeric" required> <input type="text" class="otp-input" maxlength="1" pattern="[0-9]" inputmode="numeric" required> <input type="text" class="otp-input" maxlength="1" pattern="[0-9]" inputmode="numeric" required> </div> <button type="submit" class="btn" style="width: 100%; margin-bottom: 1rem;">Verify & Login</button> <div id="otp-error" class="error-msg"></div> </form> <button type="button" id="resend-otp-btn" class="btn" style="width: 100%; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff;" disabled>Resend OTP (30s)</button> </div> </div> </main> ${renderScript($$result, "C:/Users/bobby/Documents/ag-project/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/bobby/Documents/ag-project/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/bobby/Documents/ag-project/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Login,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
