/* ============================================================================
   LISTINGS PAGE — filters, grid, and map (shared by rentals.html & sales.html)
   The page sets <body data-listing-type="rental"> or "sale".
   ============================================================================ */
(function () {
  const TYPE = document.body.dataset.listingType;       // "rental" | "sale"
  if (!TYPE) return;

  const all = (window.LISTINGS || []).filter(l => l.type === TYPE && l.status === "available");
  const gridEl = document.querySelector("#results");
  const countEl = document.querySelector("#count");
  let map, markers = {}, view = "split"; // split | grid

  /* build neighborhood options from the data */
  const hoods = [...new Set(all.map(l => l.neighborhood))].sort();
  const hoodSel = document.querySelector("#f-hood");
  hoods.forEach(h => hoodSel.insertAdjacentHTML("beforeend", `<option value="${h}">${h}</option>`));

  const F = { hood: "", price: "", beds: "", noFee: false, doorman: false, pets: false };

  function read() {
    F.hood = hoodSel.value;
    F.price = document.querySelector("#f-price").value;
    F.beds = document.querySelector("#f-beds").value;
    F.noFee = document.querySelector("#f-nofee")?.checked || false;
    F.doorman = document.querySelector("#f-doorman").checked;
    F.pets = document.querySelector("#f-pets").checked;
  }

  function match(l) {
    if (F.hood && l.neighborhood !== F.hood) return false;
    if (F.beds !== "") {
      const b = +F.beds;
      if (b === 4) { if (l.beds < 4) return false; } else if (l.beds !== b) return false;
    }
    if (F.price) { const [lo, hi] = F.price.split("-").map(Number); if (l.price < lo || (hi && l.price > hi)) return false; }
    if (F.noFee && !l.noFee) return false;
    if (F.doorman && !l.doorman) return false;
    if (F.pets && (!l.pets || l.pets === "No")) return false;
    return true;
  }

  function render() {
    read();
    const list = all.filter(match);
    countEl.textContent = `${list.length} ${TYPE === "rental" ? "rental" : "home"}${list.length === 1 ? "" : "s"}`;
    gridEl.innerHTML = list.length
      ? list.map(cardHTML).join("")
      : `<div class="empty" style="grid-column:1/-1">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
           <p>No homes match these filters yet.<br>Try widening your search or <a class="link-arrow" href="saved.html">tell ${CONFIG.agentName.split(" ")[0]} what you're looking for</a>.</p></div>`;
    requestAnimationFrame(() => document.querySelectorAll("#results .reveal").forEach(e => e.classList.add("in")));
    if (map) drawMarkers(list);
  }

  /* ---------- map ---------- */
  function initMap() {
    if (typeof L === "undefined") return;
    map = L.map("map", { scrollWheelZoom: false, zoomControl: true }).setView([40.728, -73.972], 12);
    // CARTO Positron — clean grayscale tiles that fit the cold look
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: "abcd", maxZoom: 19
    }).addTo(map);
    drawMarkers(all);
  }

  function drawMarkers(list) {
    Object.values(markers).forEach(m => map.removeLayer(m)); markers = {};
    const bounds = [];
    list.forEach(l => {
      const icon = L.divIcon({ className: "", html: `<div class="map-pin">${money(l.price).replace(/,000$/,"k").replace("$","$")}</div>`, iconSize: [0,0] });
      const m = L.marker([l.lat, l.lng], { icon }).addTo(map);
      m.bindPopup(`<a class="popup-card" href="listing.html?id=${l.id}" style="display:block;color:inherit">
        <img src="${photoURL(l)}" alt="">
        <div class="pc-body"><div class="pc-price">${priceLabel(l)}</div>
        <div class="pc-title">${l.title}</div><div class="pc-loc">${l.neighborhood}</div></div></a>`);
      m.on("mouseover", () => highlight(l.id, true));
      m.on("mouseout", () => highlight(l.id, false));
      markers[l.id] = m; bounds.push([l.lat, l.lng]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
  }

  function highlight(id, on) {
    const pin = markers[id]?.getElement()?.querySelector(".map-pin");
    if (pin) pin.classList.toggle("active", on);
  }

  /* card hover -> map pin */
  gridEl.addEventListener("mouseover", e => { const c = e.target.closest(".card"); if (c) highlight(c.dataset.id, true); });
  gridEl.addEventListener("mouseout", e => { const c = e.target.closest(".card"); if (c) highlight(c.dataset.id, false); });

  /* ---------- view toggle (map / grid) ---------- */
  function setView(v) {
    view = v;
    const layout = document.querySelector(".map-layout");
    document.querySelectorAll(".view-toggle button").forEach(b => b.classList.toggle("active", b.dataset.view === v));
    if (v === "grid") {
      layout.style.gridTemplateColumns = "1fr";
      document.querySelector("#map").classList.add("hidden");
      document.querySelector(".grid-col").style.maxHeight = "none";
      document.querySelector("#results").style.gridTemplateColumns = "repeat(auto-fill,minmax(330px,1fr))";
    } else {
      layout.style.gridTemplateColumns = "";
      document.querySelector("#map").classList.remove("hidden");
      document.querySelector(".grid-col").style.maxHeight = "";
      document.querySelector("#results").style.gridTemplateColumns = "";
      if (map) setTimeout(() => map.invalidateSize(), 50);
    }
  }

  /* ---------- wire controls ---------- */
  document.querySelectorAll(".filterbar select, .filterbar input").forEach(el =>
    el.addEventListener("change", render));
  document.querySelectorAll(".toggle-pill input").forEach(cb =>
    cb.addEventListener("change", e => e.target.closest(".toggle-pill").classList.toggle("on", e.target.checked)));
  document.querySelector("#f-clear")?.addEventListener("click", () => {
    document.querySelectorAll(".filterbar select").forEach(s => s.value = "");
    document.querySelectorAll(".filterbar input[type=checkbox]").forEach(c => { c.checked = false; c.closest(".toggle-pill")?.classList.remove("on"); });
    render();
  });
  document.querySelectorAll(".view-toggle button").forEach(b => b.addEventListener("click", () => setView(b.dataset.view)));

  initMap();
  render();
})();
