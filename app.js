let lang = 'it';

/* ── Navigation ─────────────────────────── */
function showSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  // reset internal scroll for sections that scroll themselves
  el.scrollTop = 0;
  // horizontal snap navigation
  if (typeof mainEl.scrollTo === 'function') {
    mainEl.scrollTo({ left: el.offsetLeft, behavior: 'smooth' });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

const mainEl   = document.querySelector('main');
const sections = [...document.querySelectorAll('section')];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.nav-link').forEach((a) => {
          a.classList.toggle('active', a.id === `nav-${id}`);
        });
      }
    });
  },
  { root: mainEl, threshold: 0.5 }
);

sections.forEach((s) => observer.observe(s));

/* ── Swipe arrow on each page (except last) ── */
sections.forEach((s) => {
  if (s.id === 'rsvp') return; // last page — no next
  const arrow = document.createElement('div');
  arrow.className = 'swipe-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '\u203A'; // ›
  s.appendChild(arrow);
});

/* ── Language ───────────────────────────── */
function setLang(l) { lang = l; render(); }

/* ── Render ─────────────────────────────── */
function render() {
  const t = data[lang];

  // Nav labels
  document.getElementById('nav-home').innerText  = t.nav.home;
  document.getElementById('nav-rsvp').innerText  = t.nav.rsvp;
  document.getElementById('nav-info').innerText  = t.nav.info;
  document.getElementById('nav-stay').innerText  = t.nav.stay;
  document.getElementById('nav-gifts').innerText = t.nav.gifts;
  document.getElementById('nav-about').innerText = t.nav.about;

  // Hero — date, thin line, place
  const subtitleEl = document.getElementById('subtitle');
  if (t.subtitle && t.subtitle.includes('•')) {
    const parts = t.subtitle.split('•').map(s => s.trim());
    subtitleEl.innerHTML =
      `<span class="subtitle-date">${parts[0]}</span>` +
      `<span class="subtitle-line"></span>` +
      `<span class="subtitle-place">${parts.slice(1).join(' • ')}</span>`;
  } else {
    subtitleEl.innerText = t.subtitle || '';
  }

  // RSVP
  document.getElementById('rsvpEyebrow').innerText = t.rsvpEyebrow;
  document.getElementById('rsvpTitle').innerText   = t.rsvpTitle;
  document.getElementById('rsvpSub').innerText     = t.rsvpSub;
  document.getElementById('rsvpLink').innerText    = t.rsvpBtn;
  document.getElementById('rsvpLink').href         = t.rsvp;

  // Info
  document.getElementById('infoTitle').innerText   = t.infoTitle;
  document.getElementById('churchLabel').innerText = `💒 ${t.churchLabel}`;
  document.getElementById('churchInfo').innerText  = t.churchAddress;
  document.getElementById('churchTime').innerText  = t.churchTime;
  document.getElementById('churchMap').innerText   = t.mapLink;
  document.getElementById('churchMap').href        = data.churchMap;
  const note = document.getElementById('accessNote');
  note.innerHTML = t.accessNote.map(line => `<span class="access-line">${line}</span>`).join('');
  document.getElementById('venueLabel').innerText  = `🍷 ${t.venueLabel}`;
  document.getElementById('venueInfo').innerText   = t.venue;
  document.getElementById('venueMap').innerText    = t.mapLink;
  document.getElementById('venueMap').href         = data.venueMap;

  // Stay
  document.getElementById('howToGet').innerText    = t.howToGet;
  document.getElementById('stayTitle').innerText   = t.stayTitle;
  document.getElementById('trenordLink').innerText = t.trenord;
  renderTravel(t);
  renderHotels();

  // Gifts
  document.getElementById('giftsTitle').innerText = t.giftsTitle;
  document.getElementById('giftIntro').innerText = t.giftIntro;

  // About
  document.getElementById('aboutTitle').innerText = t.aboutTitle;
  document.getElementById('aboutSub').innerText   = t.aboutSub;
  document.getElementById('aboutText').innerText  = t.about;

  // Footer
  renderFooter(t);

  // Gifts grid re-render (button label is translated)
  renderGifts();
}

/* ── Footer ─────────────────────────────── */
function renderFooter(t) {
  document.getElementById('footerDate').innerText   = data.footerDate;
  document.getElementById('footerChurch').innerText = t.churchAddress;
  document.getElementById('footerVenue').innerText  = t.venue;
}

/* ── HotelCard component ────────────────── */
function HotelCard(h) {
  const el = document.createElement('a');
  el.className = 'hotel-card';
  el.href = h.website;
  el.target = '_blank';
  el.rel = 'noopener';
  el.innerHTML = `
    <span class="hotel-card__name">${h.icon} ${h.name}</span>
    <span class="hotel-card__location">${h.location}</span>
    <span class="hotel-card__price">da ${h.price} € / notte</span>
    <span class="hotel-card__links">
      <span class="hotel-card__link">${lang === 'fr' ? 'Site' : 'Sito'} →</span>
    </span>
  `;
  return el;
}

function renderHotels() {
  const c = document.getElementById('hotelGrid');
  if (!c) return;
  c.innerHTML = '';
  data.hotels.forEach((h) => c.appendChild(HotelCard(h)));
}

/* ── Travel component ───────────────────── */
function renderTravel(t) {
  const c = document.getElementById('travelRoutes');
  c.innerHTML = '';
  t.routes.forEach((route) => {
    const block = document.createElement('div');
    block.className = 'travel-block';
    block.innerHTML = `<p class="travel-block__from">${route.from}</p>`;
    route.options.forEach((opt) => {
      const row = document.createElement('div');
      row.className = 'travel-row';
      row.innerHTML = `
        <span class="travel-row__icon">${opt.icon}</span>
        <span class="travel-row__desc">${opt.desc}</span>
        <span class="travel-row__duration">${opt.duration}</span>
      `;
      block.appendChild(row);
    });
    c.appendChild(block);
  });
}

/* ── Gift card component ────────────────── */
function GiftCard(g) {
  const el  = document.createElement('div');
  el.className = 'gift-slide';
  el.innerHTML = `
    <div class="gift-slide__card">
      <span class="gift-card__icon">${g.icon}</span>
      <span class="gift-card__name">${lang === 'fr' && g.nameFr ? g.nameFr : g.name}</span>
      ${g.hidePrice ? '' : `<span class="gift-card__price">${g.price} €</span>`}
    </div>
    <div class="gift-slide__photo" style="background-image:url('${g.photo}')"></div>
  `;
  return el;
}

/* ── Gifts ──────────────────────────────── */
function renderGifts() {
  const c    = document.getElementById('giftList');
  const dots = document.getElementById('giftDots');
  c.innerHTML    = '';
  dots.innerHTML = '';

  data.gifts.forEach((g, i) => {
    c.appendChild(GiftCard(g));

    const dot = document.createElement('button');
    dot.className   = 'gift-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => {
      c.scrollTo({ left: i * c.offsetWidth, behavior: 'smooth' });
    });
    dots.appendChild(dot);
  });

  const prevBtn = document.getElementById('giftPrev');
  const nextBtn = document.getElementById('giftNext');

  prevBtn.onclick = () => {
    const current = Math.round(c.scrollLeft / c.offsetWidth);

    const target =
      current <= 0
        ? data.gifts.length - 1
        : current - 1;

    c.scrollTo({
      left: target * c.offsetWidth,
      behavior: 'smooth'
    });
  };

  nextBtn.onclick = () => {
    const current = Math.round(c.scrollLeft / c.offsetWidth);

    const target =
      current >= data.gifts.length - 1
        ? 0
        : current + 1;

    c.scrollTo({
      left: target * c.offsetWidth,
      behavior: 'smooth'
    });
  };

  // update active dot on scroll + hide swipe hint after first swipe
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

  const wrap = document.querySelector('.gift-carousel-wrap');
  c.querySelectorAll('.gift-slide__photo').forEach(photo => {
    photo.addEventListener('click', () => wrap.classList.toggle('arrows-hidden'));
  });
}

render();

const timeline = document.querySelector('.love-timeline');

const prev = document.getElementById('timelinePrev');
const next = document.getElementById('timelineNext');

if (timeline && prev && next) {
  prev.addEventListener('click', () => {
    timeline.scrollBy({
      left: -350,
      behavior: 'smooth'
    });
  });

  next.addEventListener('click', () => {
    const reachedEnd =
      timeline.scrollLeft + timeline.clientWidth
      >= timeline.scrollWidth - 20;

    if (reachedEnd) {
      timeline.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else {
      timeline.scrollBy({
        left: 350,
        behavior: 'smooth'
      });
    }
  });
}

/* ── Horizontal swipe page navigation ───── */
function getCurrentSectionIndex() {
  const active = document.querySelector('.nav-link.active');
  if (!active) return 0;
  const id = active.id.replace('nav-', '');
  const idx = sections.findIndex(s => s.id === id);
  return idx >= 0 ? idx : 0;
}

// Do not trigger page nav for horizontal scrollers inside a section
function shouldSkipPageNav(e) {
  return e.target.closest ? e.target.closest('.gift-carousel, .love-timeline') !== null : false;
}

// Touch — swipe left = next page, swipe right = previous page
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let touchMoved = false;
let touchSkipNav = false;
const swipeThreshold = 60;
const swipeMaxTime = 1000;

mainEl.addEventListener('touchstart', (e) => {
  if (e.touches.length > 1) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchStartTime = Date.now();
  touchMoved = false;
  touchSkipNav = shouldSkipPageNav(e);
  mainEl.classList.add('swiping');
}, { passive: true });

mainEl.addEventListener('touchmove', (e) => {
  if (e.touches.length > 1) return;
  const dx = e.touches[0].clientX - touchStartX;
  if (Math.abs(dx) > 10) touchMoved = true;
}, { passive: true });

mainEl.addEventListener('touchend', (e) => {
  mainEl.classList.remove('swiping');
  if (touchSkipNav || !touchMoved) return;
  const touch = e.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;
  const dt = Date.now() - touchStartTime;

  // horizontal dominant + past threshold + fast enough
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold && dt < swipeMaxTime) {
    const current = getCurrentSectionIndex();
    if (dx < 0) {
      // finger moved left → next page
      const next = Math.min(sections.length - 1, current + 1);
      if (next !== current) showSection(sections[next].id);
    } else {
      // finger moved right → previous page
      const prev = Math.max(0, current - 1);
      if (prev !== current) showSection(sections[prev].id);
    }
  }
}, { passive: true });

mainEl.addEventListener('touchcancel', () => {
  mainEl.classList.remove('swiping');
});

// Keyboard — arrow keys navigate horizontally
document.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  const current = getCurrentSectionIndex();
  const target = e.key === 'ArrowRight'
    ? Math.min(sections.length - 1, current + 1)
    : Math.max(0, current - 1);
  if (target !== current) {
    e.preventDefault();
    showSection(sections[target].id);
  }
});