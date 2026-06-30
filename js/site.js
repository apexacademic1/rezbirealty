/* ============================================================================
   REZBIREALTY — SHARED SITE SCRIPT
   ----------------------------------------------------------------------------
   EDIT YOUR DETAILS HERE  (name, email, phone, and the form endpoint).
   Everything else below runs the site — you normally won't need to change it.
   ============================================================================ */

const CONFIG = {
  agentName: "Rezbi Tanjil",
  agentInitials: "RT",
  email: "Rezbitanjil@gmail.com",          // inquiries are emailed here
  phone: "",                                // optional, e.g. "(212) 555-0114". Leave "" to hide.

  // To receive pre-qualification forms straight to your inbox, create a free
  // form at https://formspree.io  (it takes 2 minutes), then paste the endpoint
  // it gives you below, e.g. "https://formspree.io/f/abcdwxyz".
  // Until you do, the form falls back to opening the visitor's email app.
  formEndpoint: ""                          // <-- paste your Formspree URL here
};

/* ---------- tiny helpers ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const money = (n) => "$" + Number(n).toLocaleString("en-US");
const priceLabel = (l) => l.type === "rental" ? money(l.price) + " /mo" : money(l.price);
const bedLabel = (b) => b === 0 ? "Studio" : b + " bd";
const getParam = (k) => new URLSearchParams(location.search).get(k);
const byId = (id) => (window.LISTINGS || []).find(l => l.id === id);

/* ---------- placeholder image (used until real photos are added) ---------- */
function placeholder(seed = "RZB") {
  const a = "%23E9EDF1", b = "%23D2D9E1", ink = "%236C7682";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
    <stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs>
    <rect width='800' height='600' fill='url(%23g)'/>
    <g fill='none' stroke='${ink}' stroke-width='3' opacity='0.5'>
    <rect x='320' y='250' width='160' height='200'/><line x1='400' y1='250' x2='400' y2='450'/>
    <line x1='320' y1='320' x2='480' y2='320'/><line x1='320' y1='390' x2='480' y2='390'/>
    <path d='M310 250 L400 190 L490 250'/></g>
    <text x='400' y='520' text-anchor='middle' fill='${ink}' font-family='monospace' font-size='22' letter-spacing='3'>REZBIREALTY</text>
  </svg>`;
  return "data:image/svg+xml;charset=UTF-8," + svg;
}
function photoURL(listing, i = 0) {
  if (listing.photos && listing.photos[i]) return "images/listings/" + listing.photos[i];
  return placeholder(listing.id);
}

/* ---------- favorites (the heart) ---------- */
const Favs = {
  key: "rezbi:favs",
  get() { try { return JSON.parse(localStorage.getItem(this.key)) || []; } catch { return []; } },
  has(id) { return this.get().includes(id); },
  toggle(id) {
    const s = new Set(this.get());
    s.has(id) ? s.delete(id) : s.add(id);
    localStorage.setItem(this.key, JSON.stringify([...s]));
    updateCounts(); return s.has(id);
  }
};

/* ---------- inquiry cart ("add to inquiry") ---------- */
const Cart = {
  key: "rezbi:cart",
  get() { try { return JSON.parse(localStorage.getItem(this.key)) || []; } catch { return []; } },
  has(id) { return this.get().includes(id); },
  toggle(id) {
    const s = new Set(this.get());
    s.has(id) ? s.delete(id) : s.add(id);
    localStorage.setItem(this.key, JSON.stringify([...s]));
    updateCounts(); return s.has(id);
  },
  remove(id) { const s = new Set(this.get()); s.delete(id); localStorage.setItem(this.key, JSON.stringify([...s])); updateCounts(); },
  clear() { localStorage.removeItem(this.key); updateCounts(); }
};

function updateCounts() {
  const c = Cart.get().length, f = Favs.get().length;
  $$("[data-cart-count]").forEach(el => { el.textContent = c; el.style.display = c ? "grid" : "none"; });
  $$("[data-fav-count]").forEach(el => { el.textContent = f; el.style.display = f ? "grid" : "none"; });
}

/* ---------- icons ---------- */
const ICON = {
  heart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s-7.5-4.7-9.7-9.2C.9 8.7 2.3 5.5 5.4 5.1c1.9-.2 3.6.8 4.6 2.3 1-1.5 2.7-2.5 4.6-2.3 3.1.4 4.5 3.6 3.1 6.7C19.5 16.3 12 21 12 21z"/></svg>`,
  cart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6"/><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/></svg>`,
  plus: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>`,
  check: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 6l12 12M18 6L6 18"/></svg>`
};

/* ---------- header + footer (injected on every page) ---------- */
function buildChrome() {
  const path = location.pathname.split("/").pop() || "index.html";
  const link = (href, label) => `<a href="${href}" class="${path === href ? "active" : ""}">${label}</a>`;
  const navItems = [
    ["rentals.html", "Rentals"], ["sales.html", "For Sale"],
    ["guide.html", "How Renting Works"], ["owners.html", "List With Me"], ["about.html", "About"]
  ];

  const header = `
  <header class="site-header">
    <div class="wrap-wide nav">
      <a class="brand" href="index.html"><b>Rezbi</b><span>.</span>Realty</a>
      <nav class="nav-links">${navItems.map(i => link(i[0], i[1])).join("")}</nav>
      <div class="nav-right">
        <a class="icon-btn" href="saved.html" aria-label="Saved homes">${ICON.heart}<span class="count" data-fav-count style="display:none">0</span></a>
        <a class="icon-btn" href="saved.html" aria-label="Inquiry list">${ICON.cart}<span class="count" data-cart-count style="display:none">0</span></a>
        <button class="nav-toggle" aria-label="Menu" aria-expanded="false">${ICON.menu}</button>
      </div>
    </div>
    <div class="mobile-menu"><ul>${navItems.map(i => `<li><a href="${i[0]}">${i[1]}</a></li>`).join("")}
      <li><a href="saved.html">Saved &amp; Inquiry list</a></li></ul></div>
  </header>`;

  const phoneLi = CONFIG.phone ? `<li><a href="tel:${CONFIG.phone.replace(/[^0-9+]/g,"")}">${CONFIG.phone}</a></li>` : "";
  const footer = `
  <footer class="site-footer">
    <div class="wrap-wide">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="brand"><b>Rezbi</b>.Realty</div>
          <p>Helping first-time renters and buyers move through New York City with clarity, not pressure.</p>
        </div>
        <div><h4>Find a home</h4><ul><li><a href="rentals.html">Rentals</a></li><li><a href="sales.html">For sale</a></li><li><a href="saved.html">Saved homes</a></li></ul></div>
        <div><h4>Learn</h4><ul><li><a href="guide.html">How renting works</a></li><li><a href="owners.html">List your property</a></li><li><a href="about.html">About ${CONFIG.agentName.split(" ")[0]}</a></li></ul></div>
        <div><h4>Contact</h4><ul><li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li>${phoneLi}</ul></div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} RezbiRealty</span>
        <span>New York City · Licensed Real Estate Salesperson</span>
      </div>
    </div>
  </footer>`;

  const h = document.createElement("div"); h.innerHTML = header;
  document.body.prepend(h.firstElementChild);
  const f = document.createElement("div"); f.innerHTML = footer;
  document.body.append(f.firstElementChild);

  // mobile menu
  const toggle = $(".nav-toggle"), menu = $(".mobile-menu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.innerHTML = open ? ICON.close : ICON.menu;
    toggle.setAttribute("aria-expanded", open);
  });
}

/* ---------- shared listing card ---------- */
function cardHTML(l) {
  const inCart = Cart.has(l.id), faved = Favs.has(l.id);
  const tags = [];
  if (l.type === "rental" && l.noFee) tags.push(`<span class="tag green">No fee</span>`);
  if (l.doorman) tags.push(`<span class="tag">Doorman</span>`);
  if (l.pets && l.pets !== "No") tags.push(`<span class="tag">Pets ok</span>`);
  const sqft = l.sqft ? l.sqft.toLocaleString() : "—";
  return `
  <article class="card reveal" data-id="${l.id}">
    <div class="card-media">
      <span class="card-badge ${l.type === "sale" ? "alt" : ""}">${l.type === "sale" ? "For sale" : "For rent"}</span>
      <button class="card-fav ${faved ? "is-on" : ""}" data-fav="${l.id}" aria-label="Save home">${ICON.heart}</button>
      <a href="listing.html?id=${l.id}"><img src="${photoURL(l)}" alt="${l.title}" loading="lazy"></a>
    </div>
    <div class="card-body">
      <a href="listing.html?id=${l.id}">
        <div class="card-price">${money(l.price)}${l.type === "rental" ? `<span class="per"> /mo</span>` : ""}</div>
        <h3 class="card-title">${l.title}</h3>
        <div class="card-loc">${l.neighborhood} · ${l.borough}</div>
        <div class="spec-strip">
          <div class="spec"><span class="v">${bedLabel(l.beds)}</span><span class="k">Beds</span></div>
          <div class="spec"><span class="v">${l.baths} ba</span><span class="k">Baths</span></div>
          <div class="spec"><span class="v">${sqft}</span><span class="k">Sq ft</span></div>
        </div>
      </a>
      ${tags.length ? `<div class="card-tags">${tags.join("")}</div>` : ""}
      <button class="card-cart ${inCart ? "in-cart" : ""}" data-cart="${l.id}">
        ${inCart ? ICON.check + " Added to inquiry" : ICON.plus + " Add to inquiry"}
      </button>
    </div>
  </article>`;
}

/* delegate fav + cart clicks for any card grid */
function wireCards(root = document) {
  root.addEventListener("click", (e) => {
    const fav = e.target.closest("[data-fav]");
    if (fav) { const on = Favs.toggle(fav.dataset.fav); fav.classList.toggle("is-on", on); return; }
    const cart = e.target.closest("[data-cart]");
    if (cart) {
      const on = Cart.toggle(cart.dataset.cart);
      cart.classList.toggle("in-cart", on);
      cart.innerHTML = on ? ICON.check + " Added to inquiry" : ICON.plus + " Add to inquiry";
    }
  });
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver((ents) => {
    ents.forEach((en, i) => { if (en.isIntersecting) { en.target.style.transitionDelay = (i % 4) * 40 + "ms"; en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach(e => io.observe(e));
  // safety net: never let content stay hidden if the observer misses anything
  setTimeout(() => $$(".reveal:not(.in)").forEach(e => e.classList.add("in")), 2600);
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildChrome();
  updateCounts();
  wireCards(document);
  initReveal();
});
