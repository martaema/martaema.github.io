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
