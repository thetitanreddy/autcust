import { c as createComponent } from './astro-component_tHHC9fc_.mjs';
import 'piccolore';
import { u as renderTemplate, k as addAttribute, t as renderHead, s as renderComponent } from './entrypoint_DhY-FsdM.mjs';
import { jwtVerify } from 'jose';
import { $ as $$SEO } from './SEO_CPeF2n8F.mjs';
/* empty css                 */
import { d as db } from './firebase_z1RDMC4D.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Policies = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Policies;
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
  let policies = [];
  try {
    const snapshot = await db.collection("policies").get();
    policies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching policies:", e);
  }
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head>', "", '</head> <body> <main class="container admin-layout"> <aside class="glass-panel" style="padding: 1.5rem;"> <h2 style="font-size: 1.5rem; margin-bottom: 2rem;">Admin Panel</h2> <nav class="admin-sidebar"> <a href="/admin" class="admin-nav-link">Dashboard</a> <a href="/admin/policies" class="admin-nav-link active">Manage Policies</a> <a href="/admin/settings" class="admin-nav-link">Settings</a> </nav> <div style="margin-top: auto; padding-top: 2rem;"> <form action="/api/auth/logout" method="POST"> <button type="submit" class="admin-nav-link" style="width: 100%; text-align: left; background: none; border: none; cursor: pointer; color: #ffffff;">Logout</button> </form> </div> </aside> <div class="content"> <div class="glass-panel mb-4" style="display: flex; justify-content: space-between; align-items: center;"> <div> <h1 style="font-size: 2rem; margin-bottom: 0;">Manage Policies</h1> <p style="margin-bottom: 0;">Add, edit, or delete policy pages.</p> </div> <button class="btn" onclick="openEditor()">+ Add New Policy</button> </div> <!-- Policies List --> <div id="policies-list" class="glass-panel"> ', ` </div> <!-- Editor Form (Hidden by default) --> <div id="policy-editor" class="glass-panel" style="display: none; text-align: left;"> <h2 id="editor-title" style="font-size: 1.5rem; margin-bottom: 1rem;">Add New Policy</h2> <form id="policy-form"> <div class="form-group mb-2"> <label class="form-label" for="slug">URL Slug</label> <input type="text" id="slug" class="form-input" placeholder="e.g. privacy-policy" required> </div> <div class="form-group mb-2"> <label class="form-label" for="title">Title</label> <input type="text" id="title" class="form-input" placeholder="e.g. Privacy Policy" required> </div> <div class="form-group mb-4"> <label class="form-label" for="content">Markdown Content</label> <textarea id="content" class="form-input" rows="15" placeholder="Write policy content here in Markdown format..." required style="font-family: monospace;"></textarea> </div> <div style="display: flex; gap: 1rem;"> <button type="submit" class="btn">Save Policy</button> <button type="button" class="btn btn-secondary" onclick="closeEditor()">Cancel</button> </div> <div id="editor-msg" class="text-sm mt-2" style="display: none;"></div> </form> </div> </div> </main> <script>
			function openEditor() {
				document.getElementById('policies-list').style.display = 'none';
				document.getElementById('policy-editor').style.display = 'block';
				document.getElementById('editor-title').innerText = 'Add New Policy';
				document.getElementById('slug').value = '';
				document.getElementById('title').value = '';
				document.getElementById('content').value = '';
				document.getElementById('slug').readOnly = false;
				document.getElementById('editor-msg').style.display = 'none';
			}

			function editPolicy(slug, title, content) {
				document.getElementById('policies-list').style.display = 'none';
				document.getElementById('policy-editor').style.display = 'block';
				document.getElementById('editor-title').innerText = 'Edit Policy';
				document.getElementById('slug').value = slug;
				document.getElementById('title').value = title;
				document.getElementById('content').value = content;
				document.getElementById('slug').readOnly = true;
				document.getElementById('editor-msg').style.display = 'none';
			}

			function closeEditor() {
				document.getElementById('policy-editor').style.display = 'none';
				document.getElementById('policies-list').style.display = 'block';
			}

			async function deletePolicy(slug) {
				if (!confirm(\`Are you sure you want to delete the policy "\${slug}"?\`)) return;
				
				try {
					const res = await fetch('/api/admin/delete-policy', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ slug })
					});

					if (res.ok) {
						window.location.reload();
					} else {
						alert('Failed to delete policy.');
					}
				} catch (err) {
					alert('Network error.');
				}
			}

			const policyForm = document.getElementById('policy-form');
			const editorMsg = document.getElementById('editor-msg');

			policyForm?.addEventListener('submit', async (e) => {
				e.preventDefault();
				const slug = document.getElementById('slug').value;
				const title = document.getElementById('title').value;
				const content = document.getElementById('content').value;
				
				const btn = policyForm.querySelector('button[type="submit"]');
				const ogText = btn.innerText;
				btn.innerText = 'Saving...';
				btn.disabled = true;

				try {
					const res = await fetch('/api/admin/update-policy', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ slug, title, content })
					});

					if (res.ok) {
						window.location.reload();
					} else {
						editorMsg.innerText = 'Failed to save policy.';
						editorMsg.style.color = '#e53e3e';
						editorMsg.style.display = 'block';
					}
				} catch (err) {
					editorMsg.innerText = 'Network error.';
					editorMsg.style.color = '#e53e3e';
					editorMsg.style.display = 'block';
				} finally {
					btn.innerText = ogText;
					btn.disabled = false;
				}
			});
		</script> </body> </html>`], ['<html lang="en"> <head>', "", '</head> <body> <main class="container admin-layout"> <aside class="glass-panel" style="padding: 1.5rem;"> <h2 style="font-size: 1.5rem; margin-bottom: 2rem;">Admin Panel</h2> <nav class="admin-sidebar"> <a href="/admin" class="admin-nav-link">Dashboard</a> <a href="/admin/policies" class="admin-nav-link active">Manage Policies</a> <a href="/admin/settings" class="admin-nav-link">Settings</a> </nav> <div style="margin-top: auto; padding-top: 2rem;"> <form action="/api/auth/logout" method="POST"> <button type="submit" class="admin-nav-link" style="width: 100%; text-align: left; background: none; border: none; cursor: pointer; color: #ffffff;">Logout</button> </form> </div> </aside> <div class="content"> <div class="glass-panel mb-4" style="display: flex; justify-content: space-between; align-items: center;"> <div> <h1 style="font-size: 2rem; margin-bottom: 0;">Manage Policies</h1> <p style="margin-bottom: 0;">Add, edit, or delete policy pages.</p> </div> <button class="btn" onclick="openEditor()">+ Add New Policy</button> </div> <!-- Policies List --> <div id="policies-list" class="glass-panel"> ', ` </div> <!-- Editor Form (Hidden by default) --> <div id="policy-editor" class="glass-panel" style="display: none; text-align: left;"> <h2 id="editor-title" style="font-size: 1.5rem; margin-bottom: 1rem;">Add New Policy</h2> <form id="policy-form"> <div class="form-group mb-2"> <label class="form-label" for="slug">URL Slug</label> <input type="text" id="slug" class="form-input" placeholder="e.g. privacy-policy" required> </div> <div class="form-group mb-2"> <label class="form-label" for="title">Title</label> <input type="text" id="title" class="form-input" placeholder="e.g. Privacy Policy" required> </div> <div class="form-group mb-4"> <label class="form-label" for="content">Markdown Content</label> <textarea id="content" class="form-input" rows="15" placeholder="Write policy content here in Markdown format..." required style="font-family: monospace;"></textarea> </div> <div style="display: flex; gap: 1rem;"> <button type="submit" class="btn">Save Policy</button> <button type="button" class="btn btn-secondary" onclick="closeEditor()">Cancel</button> </div> <div id="editor-msg" class="text-sm mt-2" style="display: none;"></div> </form> </div> </div> </main> <script>
			function openEditor() {
				document.getElementById('policies-list').style.display = 'none';
				document.getElementById('policy-editor').style.display = 'block';
				document.getElementById('editor-title').innerText = 'Add New Policy';
				document.getElementById('slug').value = '';
				document.getElementById('title').value = '';
				document.getElementById('content').value = '';
				document.getElementById('slug').readOnly = false;
				document.getElementById('editor-msg').style.display = 'none';
			}

			function editPolicy(slug, title, content) {
				document.getElementById('policies-list').style.display = 'none';
				document.getElementById('policy-editor').style.display = 'block';
				document.getElementById('editor-title').innerText = 'Edit Policy';
				document.getElementById('slug').value = slug;
				document.getElementById('title').value = title;
				document.getElementById('content').value = content;
				document.getElementById('slug').readOnly = true;
				document.getElementById('editor-msg').style.display = 'none';
			}

			function closeEditor() {
				document.getElementById('policy-editor').style.display = 'none';
				document.getElementById('policies-list').style.display = 'block';
			}

			async function deletePolicy(slug) {
				if (!confirm(\\\`Are you sure you want to delete the policy "\\\${slug}"?\\\`)) return;
				
				try {
					const res = await fetch('/api/admin/delete-policy', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ slug })
					});

					if (res.ok) {
						window.location.reload();
					} else {
						alert('Failed to delete policy.');
					}
				} catch (err) {
					alert('Network error.');
				}
			}

			const policyForm = document.getElementById('policy-form');
			const editorMsg = document.getElementById('editor-msg');

			policyForm?.addEventListener('submit', async (e) => {
				e.preventDefault();
				const slug = document.getElementById('slug').value;
				const title = document.getElementById('title').value;
				const content = document.getElementById('content').value;
				
				const btn = policyForm.querySelector('button[type="submit"]');
				const ogText = btn.innerText;
				btn.innerText = 'Saving...';
				btn.disabled = true;

				try {
					const res = await fetch('/api/admin/update-policy', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ slug, title, content })
					});

					if (res.ok) {
						window.location.reload();
					} else {
						editorMsg.innerText = 'Failed to save policy.';
						editorMsg.style.color = '#e53e3e';
						editorMsg.style.display = 'block';
					}
				} catch (err) {
					editorMsg.innerText = 'Network error.';
					editorMsg.style.color = '#e53e3e';
					editorMsg.style.display = 'block';
				} finally {
					btn.innerText = ogText;
					btn.disabled = false;
				}
			});
		</script> </body> </html>`])), renderComponent($$result, "SEO", $$SEO, { "title": "Manage Policies | AutcustDev", "description": "Admin Dashboard", "noindex": true }), renderHead(), policies.length === 0 ? renderTemplate`<p>No policies found.</p>` : renderTemplate`<ul style="list-style: none; padding: 0; margin: 0;"> ${policies.map((policy) => renderTemplate`<li style="padding: 1rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;"> <div> <h3 style="margin: 0; font-size: 1.2rem;">${policy.title}</h3> <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Slug: ${policy.slug}</p> </div> <div style="display: flex; gap: 0.5rem;"> <button class="btn btn-secondary text-sm"${addAttribute(`editPolicy('${policy.slug}', '${policy.title.replace(/'/g, "\\'")}', \`${policy.content.replace(/`/g, "\\`")}\`)`, "onclick")}>Edit</button> <button class="btn btn-secondary text-sm" style="color: #e53e3e; border-color: rgba(229, 62, 62, 0.3);"${addAttribute(`deletePolicy('${policy.slug}')`, "onclick")}>Delete</button> </div> </li>`)} </ul>`);
}, "C:/Users/bobby/Documents/ag-project/src/pages/admin/policies.astro", void 0);
const $$file = "C:/Users/bobby/Documents/ag-project/src/pages/admin/policies.astro";
const $$url = "/admin/policies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Policies,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
