/*
 * Google Apps Script per la lista nozze.
 * 1. Crea un Google Sheet con un foglio chiamato "Contributi".
 * 2. Incolla questo file in script.google.com e pubblicalo come Web App.
 * 3. Imposta l'accesso su "Chiunque" e copia l'URL in data.js,
 *    alla voce giftContributionsEndpoint.
 */
const SHEET_NAME = 'Contributi';
const GIFTS_SHEET_NAME = 'Regali';
const RSVP_SHEET_NAME = 'RSVP';
const NOTIFICATION_RECIPIENTS = ['marta.emanuele.27@gmail.com'];
const GIFT_HEADERS = ['ID', 'Titolo IT', 'Titolo FR', 'Titolo EN', 'Prezzo', 'Foto'];
const DEFAULT_GIFTS = [
  ['regalo-1', 'Viaggio di nozze in Oriente', 'Voyage de noces en Orient', 'Honeymoon in the Far East', 3500, ''],
  ['regalo-2', 'Aspiratore Dyson', 'Aspirateur Dyson', 'Dyson vacuum cleaner', 500, ''],
  ['regalo-3', 'Cocotte', 'Cocotte', 'Dutch oven', 300, ''],
  ['regalo-4', 'Divano componibile', 'Canapé modulable', 'Modular sofa', 2000, ''],
];

// Prevent user-provided text from being interpreted as a Sheets formula.
function safeText_(value) {
  const text = value == null ? '' : String(value);
  return /^[\s]*[=+\-@]/.test(text) ? `'${text}` : text;
}

function notificationValue_(value) {
  return value == null || value === '' ? '—' : String(value);
}

function sendNotification_(subject, lines) {
  if (!NOTIFICATION_RECIPIENTS.length) return;
  MailApp.sendEmail({
    to: NOTIFICATION_RECIPIENTS.join(','),
    subject,
    body: lines.join('\n'),
    name: 'Marta & Emanuele — sito nozze',
  });
}

function getContributionsSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Data', 'Regalo', 'Nome', 'Importo', 'Messaggio']);
  }
  return sheet;
}

function getGiftsSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(GIFTS_SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(GIFTS_SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(GIFT_HEADERS);
    sheet.getRange(2, 1, DEFAULT_GIFTS.length, GIFT_HEADERS.length).setValues(DEFAULT_GIFTS);
  }
  return sheet;
}

function getRsvpSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(RSVP_SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(RSVP_SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Data', 'Nome e cognome', 'Presenza', 'Bambini', 'Provenienza',
      'Trasporto', 'Spostamenti', 'Allergie o intolleranze', 'Canzone', 'Messaggio'
    ]);
  }
  return sheet;
}

function getGifts_() {
  const sheet = getGiftsSheet_();
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, GIFT_HEADERS.length).getValues()
    .filter((row) => row[0] && row[1])
    .map((row) => ({
      id: String(row[0]),
      name: String(row[1]),
      nameFr: String(row[2] || row[1]),
      nameEn: String(row[3] || row[1]),
      price: Number(row[4]) || 0,
      photo: String(row[5] || ''),
    }));
}

function doGet() {
  const sheet = getContributionsSheet_();
  const values = sheet.getLastRow() > 1
    ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues()
    : [];
  const totals = values.reduce((result, row) => {
    const giftId = row[1];
    const amount = Number(row[3]) || 0;
    result[giftId] = (result[giftId] || 0) + amount;
    return result;
  }, {});
  return ContentService
    .createTextOutput(JSON.stringify({ totals, gifts: getGifts_() }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {
  const payload = JSON.parse(event.postData.contents || '{}');
  if (payload.type === 'rsvp') {
    const sheet = getRsvpSheet_();
    sheet.appendRow([
      new Date(), safeText_(payload.fullName), safeText_(payload.attendance), Number(payload.children) || 0,
      safeText_(payload.origin), safeText_(payload.transport), safeText_(payload.transfer),
      safeText_(payload.allergies), safeText_(payload.song), safeText_(payload.message)
    ]);
    sendNotification_('Nuova risposta RSVP', [
      'È stata inviata una nuova risposta RSVP.',
      '',
      `Nome: ${notificationValue_(payload.fullName)}`,
      `Presenza: ${notificationValue_(payload.attendance)}`,
      `Bambini: ${Number(payload.children) || 0}`,
      `Provenienza: ${notificationValue_(payload.origin)}`,
      `Trasporto: ${notificationValue_(payload.transport)}`,
      `Spostamento: ${notificationValue_(payload.transfer)}`,
      `Allergie o intolleranze: ${notificationValue_(payload.allergies)}`,
      `Canzone: ${notificationValue_(payload.song)}`,
      `Messaggio: ${notificationValue_(payload.message)}`,
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  const sheet = getContributionsSheet_();
  sheet.appendRow([
    new Date(), safeText_(payload.giftId), safeText_(payload.name),
    Number(payload.amount) || 0, safeText_(payload.message)
  ]);
  const gift = getGifts_().find((item) => item.id === String(payload.giftId));
  sendNotification_('Nuovo contributo alla lista nozze', [
    'È stato registrato un nuovo contributo sul sito.',
    '',
    `Regalo: ${notificationValue_(gift ? gift.name : payload.giftId)}`,
    `Nome: ${notificationValue_(payload.name)}`,
    `Importo indicato: € ${Number(payload.amount) || 0}`,
    `Messaggio: ${notificationValue_(payload.message)}`,
    '',
    'Nota: verifica separatamente l’effettivo arrivo del bonifico.',
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
