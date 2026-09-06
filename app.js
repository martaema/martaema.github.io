/* ── "THE ROAD" — journey-map wedding website ── */

let lang = 'it';

data.gifts = [
  { id: 'regalo-1', name: 'Viaggio di nozze in Oriente', nameFr: 'Voyage de noces en Orient', nameEn: 'Honeymoon in the Far East', price: 3500, photo: '' },
  { id: 'regalo-2', name: 'Aspiratore Dyson', nameFr: 'Aspirateur Dyson', nameEn: 'Dyson vacuum cleaner', price: 500, photo: '' },
  { id: 'regalo-3', name: 'Cocotte', nameFr: 'Cocotte', nameEn: 'Dutch oven', price: 300, photo: '' },
  { id: 'regalo-4', name: 'Divano componibile', nameFr: 'Canapé modulable', nameEn: 'Modular sofa', price: 2000, photo: '' }
];

data.gifts.forEach((gift, index) => {
  gift.id ||= `regalo-${index + 1}`;
});

const giftPlaceholders = [
  'assets/images/placeholder-gift-honeymoon.svg',
  'assets/images/placeholder-gift-vinyl.svg',
  'assets/images/placeholder-gift-projector.svg',
  'assets/images/placeholder-gift-coffee.svg'
];

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
  document.getElementById('navHome').innerText = t.nav.home || 'Marta & Emanuele';
  document.getElementById('navCeremony').innerText = t.nav.ceremony;
  document.getElementById('navReception').innerText = t.nav.reception;
  document.getElementById('navCouple').innerText = t.nav.couple;
  document.getElementById('navGift').innerText = t.nav.gift;
  document.getElementById('navRsvp').innerText = t.nav.rsvp || t.rsvpTitle;
  document.getElementById('langLabel').innerText = t.nav.lang;

  // Hero
  document.getElementById('heroDate').innerText = t.heroDate;
  document.getElementById('heroSwipeHint').innerText = t.heroSwipeHint;

  // Dove e quando
  document.getElementById('ceremonyTitle').innerText = t.ceremonyTitle;
  document.getElementById('churchName').innerText = t.churchName;
  document.getElementById('churchTime').innerText = t.churchTime;
  document.getElementById('churchMap').innerText = t.viewMap;
  document.getElementById('churchMap').href = data.churchMap;
  renderPracticalList('parkingBody', t.parkingItems);
  renderPracticalList('transportBody', t.transportItems);

  // Ricevimento
  document.getElementById('receptionTitle').innerText = t.receptionTitle;
  document.getElementById('venueName').innerText = t.venueName;
  document.getElementById('venueMap').innerText = t.viewMap;
  document.getElementById('venueMap').href = data.venueMap;

  // Gli sposi
  document.getElementById('coupleTitle').innerText = t.coupleTitle;
  document.getElementById('coupleBody').innerText = lang === 'it' ? 'placeholder frase' : t.coupleBody;
  renderCoupleGallery();

  // Lista nozze
  document.getElementById('giftTitle').innerText = t.giftTitle;
  document.getElementById('giftIntro').innerHTML = lang === 'it'
    ? 'Qui puoi aiutarci a costruire la nostra famiglia.<br>Seleziona l’oggetto che vuoi regalarci o a cui vuoi contribuire, inserisci l’ammontare ed effettua un bonifico.<br>Per contribuire al nostro viaggio di nozze in Oriente, invia semplicemente un bonifico con causale “viaggio”.'
    : t.giftIntro;

  // RSVP
  document.getElementById('rsvpTitle').innerText = t.rsvpTitle;
  document.getElementById('rsvpBody').innerText = lang === 'it' ? 'placeholder frase' : t.rsvpBody;
  document.getElementById('rsvpBtn').innerText = t.rsvpBtn;

  renderGifts();
}

function renderPracticalList(id, items) {
  const list = document.getElementById(id);
  list.replaceChildren(...items.map((item) => {
    const entry = document.createElement('li');
    entry.innerText = item;
    return entry;
  }));
}

/* ── Gifts ──────────────────────────────── */
/* Gallery and gift contributions */
const couplePhotos = [
  'e9eb1e1e-ff96-4abc-a23e-1dc9f1534d68.jpg', '28cac987-4653-4349-8488-0eff29ea32ab.jpg',
  'def91121-15f3-4c37-9efc-8861c69693cf.jpg', 'cb567018-6dd1-4330-b35f-76bbac568b30.jpg',
  'c75dede6-7bab-46ac-870b-f59a5039bda5.jpg', 'c0004890-33ef-4baa-a200-3b09a9779f49.jpg',
  'ba2bc65e-9783-47a9-b91a-97542604c81f.jpg', 'b841bb43-c7ea-4a46-bd21-5d5facedd13b.jpg',
  'ac78ef07-b937-4dcb-9dbf-006deba50854.jpg', 'IMG_0146.JPG',
  '62fc91d2-00de-47a4-be61-b9edf108d9d4.jpg', '43b8938b-7553-44bc-bc57-a1f9b06b306.jpg',
  '40e7fd5e-bf31-490a-bfea-da90e146732a.jpg', '21abd1f6-c746-4629-a75b-153b14382003.jpg',
  '3d96e8ef-e162-4b21-b83b-456544be38b6.jpg', '1b562035-3de0-4c6e-bb71-f24d5936bb8b.jpg',
  '15d3839f-e357-490d-b029-5bc9dcd6b28d.jpg', '09a72597-4a8a-409f-b2b5-d199232d0d86.jpg',
  '998ba812-974e-45cd-aaf6-78abf67b4d23.jpg', '06dd7a69-a2f0-464f-adf7-c4a7a661e604.jpg',
  '6fb8c41b-81b5-4572-8ef2-27a842175b6c.jpg', '9a34ee90-1957-4709-802e-639a4692e04a.jpg',
  'a4e517b8-875d-480c-9e65-d4e4e9cb6981.jpg', 'IMG_9786.PNG'
];

const contributionDialog = document.getElementById('contributionDialog');
const contributionForm = document.getElementById('contributionForm');
const contributionStatus = document.getElementById('contributionStatus');
const localContributionKey = 'martaemanuele-gift-contributions';
let contributionTotals = JSON.parse(localStorage.getItem(localContributionKey) || '{}');

async function loadContributionTotals() {
  if (!data.giftContributionsEndpoint) return;
  try {
    const response = await fetch(`${data.giftContributionsEndpoint}?action=totals`);
    const remote = await response.json();
    if (Array.isArray(remote.gifts) && remote.gifts.length) {
      data.gifts = remote.gifts.map((gift, index) => ({
        id: String(gift.id || `regalo-${index + 1}`),
        name: gift.name || '',
        nameFr: gift.nameFr || gift.name || '',
        nameEn: gift.nameEn || gift.name || '',
        price: Number(gift.price) || 0,
        photo: gift.photo || ''
      }));
    }
    if (remote.totals && typeof remote.totals === 'object') {
      contributionTotals = remote.totals;
    }
    renderGifts();
  } catch {
    // The local display remains usable if the spreadsheet is temporarily unavailable.
  }
}

function giftName(gift) {
  return lang === 'fr' ? (gift.nameFr || gift.name) : lang === 'en' ? (gift.nameEn || gift.name) : gift.name;
}

function giftPhoto(gift) {
  const value = String(gift.photo || '').trim();
  if (!value) return giftPlaceholders[data.gifts.indexOf(gift) % giftPlaceholders.length];
  const driveId = value.match(/\/d\/([^/?]+)/)?.[1] || value.match(/[?&]id=([^&]+)/)?.[1];
  return driveId
    ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(driveId)}&sz=w1200`
    : value;
}

function money(value) {
  return new Intl.NumberFormat(lang === 'it' ? 'it-IT' : lang, { style: 'currency', currency: 'EUR' }).format(value);
}

function renderCoupleGallery() {
  const gallery = document.getElementById('coupleGallery');
  gallery.replaceChildren(...couplePhotos.map((file, index) => {
    const figure = document.createElement('figure');
    figure.className = 'couple-gallery__item';
    const image = document.createElement('img');
    image.src = `assets/foto_sposi/${file}`;
    image.alt = `Marta e Emanuele, foto ${index + 1}`;
    image.loading = 'lazy';
    figure.append(image);
    return figure;
  }));
}

function GiftGridCard(gift) {
  const total = Math.min(Number(contributionTotals[gift.id]) || 0, gift.price);
  const el = document.createElement('article');
  el.className = 'gift-card';
  el.innerHTML = `
    <div class="gift-card__photo" style="background-image:url('${giftPhoto(gift)}')"></div>
    <h3 class="gift-card__name">${giftName(gift)}</h3>
    <p class="gift-card__price">Costo totale: ${money(gift.price)}</p>
    <progress class="gift-card__progress" value="${total}" max="${gift.price}"></progress>
    <p class="gift-card__progress-label">${money(total)} di ${money(gift.price)}</p>
    <button class="btn" type="button">Contribuisci</button>`;
  el.querySelector('button').addEventListener('click', () => openContributionDialog(gift));
  return el;
}

function renderGifts() {
  document.getElementById('giftList').replaceChildren(...data.gifts.map(GiftGridCard));
}

/* ── Polaroid lightbox ──────────────────── */
function openContributionDialog(gift) {
  contributionForm.reset();
  contributionStatus.textContent = '';
  document.getElementById('contributionGiftId').value = gift.id;
  document.getElementById('contributionItemName').textContent = giftName(gift);
  contributionDialog.showModal();
  document.getElementById('contributionName').focus();
}

document.getElementById('contributionClose').addEventListener('click', () => contributionDialog.close());

contributionForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(contributionForm);
  const gift = data.gifts.find((item) => item.id === form.get('giftId'));
  const amount = Number(form.get('amount'));
  if (!gift || !Number.isFinite(amount) || amount <= 0) return;

  const contribution = { type: 'contribution', giftId: gift.id, name: form.get('name').trim(), amount, message: form.get('message').trim() };
  contributionStatus.textContent = 'Invio in corso…';
  try {
    if (data.giftContributionsEndpoint) {
      await fetch(data.giftContributionsEndpoint, {
        method: 'POST', mode: 'no-cors', body: JSON.stringify(contribution),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });
    }
    contributionTotals[gift.id] = (Number(contributionTotals[gift.id]) || 0) + amount;
    localStorage.setItem(localContributionKey, JSON.stringify(contributionTotals));
    renderGifts();
    contributionStatus.textContent = data.giftContributionsEndpoint
      ? 'Grazie! Il tuo contributo è stato registrato.'
      : 'Grazie! Ora effettua il bonifico indicato.';
    setTimeout(() => contributionDialog.close(), 1400);
  } catch {
    contributionStatus.textContent = 'Non è stato possibile inviare il contributo. Riprova più tardi.';
  }
});

const rsvpDialog = document.getElementById('rsvpDialog');
const rsvpForm = document.getElementById('rsvpForm');
const rsvpOrigin = document.getElementById('rsvpOrigin');
const rsvpTransport = document.getElementById('rsvpTransport');
const rsvpTransportGroup = document.getElementById('rsvpTransportGroup');
const rsvpTransferGroup = document.getElementById('rsvpTransferGroup');
const rsvpStatus = document.getElementById('rsvpStatus');

function updateRsvpTravelFields() {
  const needsTransport = ['Milano', 'Parigi'].includes(rsvpOrigin.value);
  rsvpTransportGroup.hidden = !needsTransport;
  rsvpTransport.required = needsTransport;
  if (!needsTransport) {
    rsvpTransport.value = '';
    rsvpTransferGroup.hidden = true;
    rsvpForm.querySelectorAll('[name="transfer"]').forEach((input) => { input.checked = false; input.required = false; });
  }
  updateRsvpTransferFields();
}

function updateRsvpTransferFields() {
  const needsTransfer = ['Treno', 'Aereo'].includes(rsvpTransport.value) && !rsvpTransportGroup.hidden;
  rsvpTransferGroup.hidden = !needsTransfer;
  rsvpForm.querySelectorAll('[name="transfer"]').forEach((input) => { input.required = needsTransfer; });
  if (!needsTransfer) rsvpForm.querySelectorAll('[name="transfer"]').forEach((input) => { input.checked = false; });
}

document.getElementById('rsvpBtn').addEventListener('click', () => {
  rsvpForm.reset();
  rsvpStatus.textContent = '';
  updateRsvpTravelFields();
  rsvpDialog.showModal();
  rsvpForm.elements.fullName.focus();
});

document.getElementById('rsvpClose').addEventListener('click', () => rsvpDialog.close());
rsvpOrigin.addEventListener('change', updateRsvpTravelFields);
rsvpTransport.addEventListener('change', updateRsvpTransferFields);

rsvpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(rsvpForm);
  const payload = {
    type: 'rsvp',
    fullName: form.get('fullName').trim(),
    attendance: form.get('attendance'),
    children: Number(form.get('children')) || 0,
    origin: form.get('origin'),
    transport: form.get('transport') || '',
    transfer: form.get('transfer') || '',
    allergies: form.get('allergies').trim(),
    song: form.get('song').trim(),
    message: form.get('message').trim()
  };
  rsvpStatus.textContent = 'Invio in corso…';
  try {
    await fetch(data.rsvpEndpoint || data.giftContributionsEndpoint, {
      method: 'POST', mode: 'no-cors', body: JSON.stringify(payload),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    });
    rsvpStatus.textContent = 'Grazie, la tua risposta è stata registrata.';
    setTimeout(() => rsvpDialog.close(), 1400);
  } catch {
    rsvpStatus.textContent = 'Non è stato possibile inviare la risposta. Riprova più tardi.';
  }
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.addEventListener('click', (event) => {
  const img = event.target.closest('.couple-gallery__item img, .polaroid img');
  if (!img) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '';
  lightbox.hidden = false;
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
loadContributionTotals();
