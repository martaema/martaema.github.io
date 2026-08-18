let lang = 'it';

function showSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollTop = 0;
  el.scrollIntoView({ behavior: 'smooth' });
}

const mainEl = document.querySelector('main');
const sections = [...document.querySelectorAll('section')];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      document.querySelectorAll('.nav-link').forEach((a) => {
        a.classList.toggle('active', a.id === `nav-${id}`);
      });
    }
  });
}, { root: mainEl, threshold: 0.5 });

sections.forEach((s) => observer.observe(s));

function setLang(l) { lang = l; render(); }

function render() {
  const t = data[lang];
  document.getElementById('nav-home').innerText = t.nav.home;
  document.getElementById('nav-rsvp').innerText = t.nav.rsvp;
  document.getElementById('nav-info').innerText = t.nav.info;
  document.getElementById('nav-stay').innerText = t.nav.stay;
  document.getElementById('nav-gifts').innerText = t.nav.gifts;
  document.getElementById('nav-about').innerText = t.nav.about;

  // Put date and place on separate lines if subtitle contains the • separator
  const subtitleEl = document.getElementById('subtitle');
  if (t.subtitle && t.subtitle.includes('•')) {
    const parts = t.subtitle.split('•').map(s => s.trim());
    subtitleEl.innerHTML = `<span class="subtitle-date">${parts[0]}</span><br><span class="subtitle-place">${parts.slice(1).join(' • ')}</span>`;
  } else {
    subtitleEl.innerText = t.subtitle || '';
  }

  document.getElementById('rsvpEyebrow').innerText = t.rsvpEyebrow;
  document.getElementById('rsvpTitle').innerText = t.rsvpTitle;
  document.getElementById('rsvpSub').innerText = t.rsvpSub;
  document.getElementById('rsvpLink').innerText = t.rsvpBtn;
  document.getElementById('rsvpLink').href = data.rsvp;

  document.getElementById('infoTitle').innerText = t.infoTitle;
  document.getElementById('churchLabel').innerText = `💒 ${t.churchLabel}`;
  document.getElementById('churchInfo').innerText = t.churchAddress;
  document.getElementById('churchTime').innerText = t.churchTime;
  document.getElementById('churchMap').innerText = t.mapLink || 'Vedi su Maps →';
  document.getElementById('churchMap').href = data.churchMap;
  const note = document.getElementById('accessNote');
  note.innerHTML = (t.accessNote || []).map(line => `<span class="access-line">${line}</span>`).join('');

  document.getElementById('venueLabel').innerText = `🍷 ${t.venueLabel}`;
  document.getElementById('venueInfo').innerText = t.venue;
  document.getElementById('venueMap').innerText = t.mapLink || 'Vedi su Maps →';
  document.getElementById('venueMap').href = data.venueMap;

  renderFooter(t);
}

function renderFooter(t) {
  document.getElementById('footerDate').innerText = data.footerDate;
  document.getElementById('footerChurch').innerText = t.churchAddress;
  document.getElementById('footerVenue').innerText = t.venue;
}

render();

// Touch swipe: detect horizontal swipes on `main` to navigate sections (left = next, right = prev)
(() => {
  let touchStartX = 0, touchStartY = 0, touchStartTime = 0, touchMoved = false;
  const swipeThreshold = 50; // px
  const swipeMaxTime = 1000; // ms

  mainEl.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
    touchMoved = false;
  }, {passive: true});

  mainEl.addEventListener('touchmove', (e) => {
    touchMoved = true;
  }, {passive: true});

  mainEl.addEventListener('touchend', (e) => {
    if (!touchMoved) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    const dt = Date.now() - touchStartTime;

    // horizontal swipe (more horizontal than vertical, passes threshold, not too slow)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold && dt < swipeMaxTime) {
      const currentIndex = sections.findIndex(s => document.getElementById(`nav-${s.id}`).classList.contains('active'));
      if (dx < 0) {
        // swipe left -> next section
        const next = Math.min(sections.length - 1, currentIndex + 1);
        if (next !== currentIndex) showSection(sections[next].id);
      } else {
        // swipe right -> previous section
        const prev = Math.max(0, currentIndex - 1);
        if (prev !== currentIndex) showSection(sections[prev].id);
      }
    }
  }, {passive: true});
})();
