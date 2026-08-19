/* ── "THE ROAD" — journey-map wedding website ── */

let lang = 'it';

const mainEl = document.getElementById('road');
const waypoints = [...document.querySelectorAll('.waypoint')];

/* ── Navigation ─────────────────────────── */
function showWaypoint(id) {
  const w = document.getElementById(id);
  if (!w) return;
  w.scrollTop = 0;
  if (typeof mainEl.scrollTo === 'function') {
    mainEl.scrollTo({ left: w.offsetLeft, behavior: 'smooth' });
  } else {
    w.scrollIntoView({ behavior: 'smooth' });
  }
  closeMenu();
}

/* ── Active waypoint tracking ───────────── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.waypoint-link').forEach((b) => {
          b.classList.toggle('active', b.dataset.target === id);
        });
      }
    });
  },
  { root: mainEl, threshold: 0.5 }
);
waypoints.forEach((w) => observer.observe(w));

/* ── Compass menu (FAB) ─────────────────── */
const fab = document.getElementById('compassFab');
const menu = document.getElementById('waypointMenu');

function closeMenu() {
  menu.hidden = true;
  fab.classList.remove('open');
  fab.setAttribute('aria-expanded', 'false');
}

fab.addEventListener('click', () => {
  const isOpen = !menu.hidden;
  menu.hidden = isOpen;
  fab.classList.toggle('open', !isOpen);
  fab.setAttribute('aria-expanded', String(!isOpen));
});

document.querySelectorAll('.waypoint-link').forEach((btn) => {
  btn.addEventListener('click', () => showWaypoint(btn.dataset.target));
});

/* ── Language ───────────────────────────── */
function setLang(l) {
  lang = l;
  render();
  closeMenu();
}

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

/* ── Render ─────────────────────────────── */
function render() {
  const t = data[lang];

  // Language buttons active state
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Menu labels
  document.getElementById('navHome').innerText = t.nav.home;
  document.getElementById('navWhen').innerText = t.nav.when;
  document.getElementById('navTravel').innerText = t.nav.travel;
  document.getElementById('navCouple').innerText = t.nav.couple;
  document.getElementById('navGift').innerText = t.nav.gift;
  document.getElementById('navRsvp').innerText = t.nav.rsvp;
  document.getElementById('langLabel').innerText = t.nav.lang;

  // Hero
  document.getElementById('heroDate').innerText = t.heroDate;
  document.getElementById('heroPlace').innerText = t.heroPlace;
  document.getElementById('heroSwipeHint').innerText = t.heroSwipeHint;

  // Dove e quando
  document.getElementById('whenSub').innerText = t.whenSub;
  document.getElementById('whenTitle').innerText = t.whenTitle;
  document.getElementById('churchLabel').innerText = t.churchLabel;
  document.getElementById('churchName').innerText = t.churchName;
  document.getElementById('churchTime').innerText = t.churchTime;
  document.getElementById('churchMap').innerText = t.viewMap;
  document.getElementById('churchMap').href = data.churchMap;
  document.getElementById('venueLabel').innerText = t.venueLabel;
  document.getElementById('venueName').innerText = t.venueName;
  document.getElementById('venueMap').innerText = t.viewMap;
  document.getElementById('venueMap').href = data.venueMap;

  // Raggiungerci
  document.getElementById('travelSub').innerText = t.travelSub;
  document.getElementById('travelTitle').innerText = t.travelTitle;
  document.getElementById('fromFiumicino').innerText = t.fromFiumicino;
  document.getElementById('fromMilan').innerText = t.fromMilan;
  document.getElementById('optTrainDirect').innerText = t.optTrainDirect;
  document.getElementById('duration32').innerText = t.duration32;
  document.getElementById('optBusDirect').innerText = t.optBusDirect;
  document.getElementById('duration50').innerText = t.duration50;
  document.getElementById('optTav').innerText = t.optTav;
  document.getElementById('duration3h').innerText = t.duration3h;
  document.getElementById('optCar').innerText = t.optCar;
  document.getElementById('duration6h').innerText = t.duration6h;
  document.getElementById('trenordLink').innerText = t.trenordLink;
  document.getElementById('trenordLink').href = data.trenord;
  document.getElementById('hotelsTitle').innerText = t.hotelsTitle;

  // Gli sposi
  document.getElementById('coupleSub').innerText = t.coupleSub;
  document.getElementById('coupleTitle').innerText = t.coupleTitle;
  document.getElementById('coupleBody').innerText = t.coupleBody;
  document.getElementById('couplePhoto1Alt').alt = t.couplePhoto1Alt;
  document.getElementById('couplePhoto1Alt').setAttribute('aria-label', t.couplePhoto1Alt);
  document.getElementById('couplePhoto2Alt').alt = t.couplePhoto2Alt;
  document.getElementById('couplePhoto2Alt').setAttribute('aria-label', t.couplePhoto2Alt);
  document.getElementById('couplePhoto1Caption').innerText = t.couplePhoto1Caption;
  document.getElementById('couplePhoto2Caption').innerText = t.couplePhoto2Caption;

  // Lista nozze
  document.getElementById('giftTitle').innerText = t.giftTitle;
  document.getElementById('giftIntro').innerText = t.giftIntro;
  document.getElementById('swipeHint').innerText = t.swipeHint;

  // RSVP
  document.getElementById('rsvpSub').innerText = t.rsvpSub;
  document.getElementById('rsvpTitle').innerText = t.rsvpTitle;
  document.getElementById('rsvpBody').innerText = t.rsvpBody;
  document.getElementById('rsvpBtn').innerText = t.rsvpBtn;
  document.getElementById('rsvpBtn').href = data.rsvp;

  renderHotels();
  renderGifts();
}

/* ── Hotels ─────────────────────────────── */
function HotelCard(h) {
  const el = document.createElement('div');
  el.className = 'hotel-card';
  el.innerHTML = `
    <span class="hotel-card__name">${h.icon} ${h.name}</span>
    <span class="hotel-card__location">${h.location}</span>
    <span class="hotel-card__price">${data[lang].fromPrice.replace('{price}', h.price)}</span>
    <span class="hotel-card__links">
      <a href="${h.website}" target="_blank" rel="noopener">${data[lang].siteLink} →</a>
      <a href="${h.map}" target="_blank" rel="noopener">${data[lang].mapLink} →</a>
    </span>
  `;
  return el;
}

function renderHotels() {
  const c = document.getElementById('hotelGrid');
  c.innerHTML = '';
  data.hotels.forEach((h) => c.appendChild(HotelCard(h)));
}

/* ── Gifts ──────────────────────────────── */
function GiftCard(g) {
  const el = document.createElement('div');
  el.className = 'gift-slide';
  const name = lang === 'fr' ? (g.nameFr || g.name)
    : lang === 'en' ? (g.nameEn || g.name)
    : g.name;
  el.innerHTML = `
    <div class="gift-slide__card">
      <span class="gift-card__icon">${g.icon}</span>
      <span class="gift-card__name">${name}</span>
      ${g.hidePrice ? '' : `<span class="gift-card__price">${g.price} €</span>`}
    </div>
    <div class="gift-slide__photo" style="background-image:url('${g.photo}')"></div>
  `;
  return el;
}

function renderGifts() {
  const c = document.getElementById('giftList');
  const dots = document.getElementById('giftDots');
  c.innerHTML = '';
  dots.innerHTML = '';

  data.gifts.forEach((g, i) => {
    c.appendChild(GiftCard(g));
    const dot = document.createElement('button');
    dot.className = 'gift-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => {
      c.scrollTo({ left: i * c.offsetWidth, behavior: 'smooth' });
    });
    dots.appendChild(dot);
  });

  document.getElementById('giftPrev').onclick = () => {
    const current = Math.round(c.scrollLeft / c.offsetWidth);
    const target = current <= 0 ? data.gifts.length - 1 : current - 1;
    c.scrollTo({ left: target * c.offsetWidth, behavior: 'smooth' });
  };

  document.getElementById('giftNext').onclick = () => {
    const current = Math.round(c.scrollLeft / c.offsetWidth);
    const target = current >= data.gifts.length - 1 ? 0 : current + 1;
    c.scrollTo({ left: target * c.offsetWidth, behavior: 'smooth' });
  };

  let hinted = false;
  c.addEventListener('scroll', () => {
    if (!hinted) {
      hinted = true;
      document.getElementById('swipeHint')?.classList.add('hidden');
    }
    const idx = Math.round(c.scrollLeft / c.offsetWidth);
    dots.querySelectorAll('.gift-dot').forEach((d, i) =>
      d.classList.toggle('active', i === idx)
    );
  }, { passive: true });
}

/* ── Polaroid lightbox ──────────────────── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.polaroid img').forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.hidden = false;
  });
});

document.getElementById('lightboxClose').addEventListener('click', () => {
  lightbox.hidden = true;
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.hidden = true;
});

/* ── Horizontal swipe page navigation ───── */
function getCurrentSectionIndex() {
  const activeId = document.querySelector('.waypoint-link.active')?.dataset.target;
  const idx = waypoints.findIndex((w) => w.id === activeId);
  return idx >= 0 ? idx : 0;
}

/* ── Swipe arrow — show while scrolling, hide when idle ── */
let arrowTimer = null;

mainEl.addEventListener('scroll', () => {
  document.body.classList.add('swiping');
  clearTimeout(arrowTimer);
  arrowTimer = setTimeout(() => {
    document.body.classList.remove('swiping');
  }, 150);
}, { passive: true });

/* ── Keyboard navigation ────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  const current = getCurrentSectionIndex();
  const target = e.key === 'ArrowRight'
    ? Math.min(waypoints.length - 1, current + 1)
    : Math.max(0, current - 1);
  if (target !== current) {
    e.preventDefault();
    showWaypoint(waypoints[target].id);
  }
});

/* ── Road progress line + pin ───────────── */
const roadPin = document.querySelector('.road-pin');

function updateProgress() {
  const scrollLeft = mainEl.scrollLeft;
  const maxLeft = mainEl.scrollWidth - mainEl.clientWidth;
  const pct = maxLeft > 0 ? scrollLeft / maxLeft : 0;
  const width = mainEl.clientWidth - 40; // minus road-progress padding (20px each side)
  roadPin.style.left = `${20 + pct * width}px`;
}

mainEl.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

/* ── Init ───────────────────────────────── */
updateProgress();
render();
