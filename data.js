const data = {
  date:        "2027-04-03T15:00:00",
  rsvp:        "#",
  footerDate:  "03.04.2027",

  churchMap: "https://maps.google.com/maps/search/?api=1&query=Basilica+di+Santa+Maria+in+Domnica+alla+Navicella+Roma",
  venueMap:  "https://maps.app.goo.gl/9WjNGVW2Fb3BCNNE6",
  // Incolla qui l'URL del Web App di Google Apps Script una volta pubblicato.
  giftContributionsEndpoint: "https://script.google.com/macros/s/AKfycbzim5BZ6aC2iGrQ31FZIalYR_nOuHcPghKsMgwA3dTFnmoogiqE3vIBKf1F-YmCGSpURQ/exec",

  // ── ITALIANO (default) ──────────────────
  it: {
    nav: {
      ceremony: "Cerimonia",
      reception: "Ricevimento",
      couple: "Noi",
      gift: "Lista nozze",
      lang: "Lingua",
    },

    heroDate: "03.04.2027",
    heroSwipeHint: "‹ scorri ›",

    ceremonyTitle: "Cerimonia",
    churchName: "Basilica di Santa Maria in Domnica alla Navicella, Roma",
    churchTime: "ore 14:30",
    receptionSub: "Ricevimento",
    receptionTitle: "Ricevimento",
    venueLabel: "Ricevimento",
    venueName: "Scuderie San Giorgio, Via di Baccanello, 20, Roma",
    viewMap: "Vedi sulla mappa",

    parkingItems: [
      "Piazza Celimontana — parcheggi a pagamento e gratuiti.",
      "Via della Navicella — parcheggi su strada, a pagamento e gratuiti.",
    ],
    transportItems: ["La fermata metro più vicina è Colosseo."],

    coupleSub: "Gli sposi",
    coupleTitle: "Gli sposi",
    coupleBody: "Ci siamo incontrati e da quel giorno la strada si è fatta più luminosa. Ecco come è iniziata la nostra storia.",
    couplePhoto1Alt: "Placeholder: foto del primo incontro",
    couplePhoto1Caption: "dove tutto è iniziato",
    couplePhoto2Alt: "Placeholder: foto della proposta",
    couplePhoto2Caption: "il sì è stato detto",

    giftTitle: "Lista nozze",
    giftIntro: "Qui puoi aiutarci a costruire la nostra famiglia.<br>Scegli il regalo a cui desideri contribuire, clicca su “Contribuisci” e indica il tuo nome e l’importo. Effettua poi separatamente il bonifico utilizzando l’IBAN riportato qui sotto.<br>Se preferisci contribuire al nostro viaggio di nozze in Oriente, puoi effettuare un bonifico indicando “Viaggio” nella causale.",
    swipeHint: "‹ swipe ›",

    rsvpSub: "RSVP",
    rsvpTitle: "Sarai dei nostri?",
    rsvpBody: "Facci sapere entro il 3 marzo 2027 se potrai camminare con noi in questo giorno.",
    rsvpBtn: "Conferma la presenza",

  },

  // ── FRANÇAIS ────────────────────────────
  fr: {
    nav: {
      ceremony: "Cérémonie",
      reception: "Réception",
      couple: "Nous",
      gift: "Liste de mariage",
      lang: "Langue",
    },

    heroDate: "03.04.2027",
    heroSwipeHint: "‹ balayer ›",

    ceremonyTitle: "Cérémonie",
    churchName: "Basilique Santa Maria in Domnica alla Navicella, Rome",
    churchTime: "15h00",
    receptionSub: "Réception",
    receptionTitle: "Réception",
    venueLabel: "Réception",
    venueName: "Placeholder : lieu de réception, Rome",
    viewMap: "Voir sur la carte",

    parkingItems: [
      "Piazza Celimontana — stationnement payant et gratuit.",
      "Via della Navicella — stationnement dans la rue, payant et gratuit.",
    ],
    transportItems: ["La station de métro la plus proche est Colosseo."],

    coupleSub: "Les mariés",
    coupleTitle: "Les mariés",
    coupleBody: "Nous nous sommes rencontrés et depuis ce jour le chemin est devenu plus lumineux. Voici comment notre histoire a commencé.",
    couplePhoto1Alt: "Placeholder : photo de la première rencontre",
    couplePhoto1Caption: "où tout a commencé",
    couplePhoto2Alt: "Placeholder : photo de la demande",
    couplePhoto2Caption: "le oui a été dit",

    giftTitle: "Liste de mariage",
    giftIntro: "Ici, vous pouvez nous aider à construire notre foyer.<br>Choisissez le cadeau auquel vous souhaitez contribuer, cliquez sur « Contribuer », puis indiquez votre nom et le montant. Effectuez ensuite le virement séparément en utilisant l’IBAN indiqué ci-dessous.<br>Si vous préférez contribuer à notre voyage de noces en Orient, vous pouvez effectuer un virement en indiquant « Voyage » comme motif.",
    swipeHint: "‹ swipe ›",

    rsvpSub: "RSVP",
    rsvpTitle: "Serez-vous là ?",
    rsvpBody: "Faites-nous savoir avant le 3 mars 2027 si vous pourrez marcher avec nous ce jour-là.",
    rsvpBtn: "Confirmer sa présence",

  },

  // ── ENGLISH ─────────────────────────────
  en: {
    nav: {
      ceremony: "Ceremony",
      reception: "Reception",
      couple: "Us",
      gift: "Gift list",
      lang: "Language",
    },

    heroDate: "03.04.2027",
    heroSwipeHint: "‹ swipe ›",

    ceremonyTitle: "Ceremony",
    churchName: "Basilica di Santa Maria in Domnica alla Navicella, Rome",
    churchTime: "3:00 pm",
    receptionSub: "Reception",
    receptionTitle: "Reception",
    venueLabel: "Reception",
    venueName: "Placeholder: reception venue, Rome",
    viewMap: "View on map",

    parkingItems: [
      "Piazza Celimontana — paid and free parking.",
      "Via della Navicella — paid and free on-street parking.",
    ],
    transportItems: ["The nearest metro station is Colosseo."],

    coupleSub: "The couple",
    coupleTitle: "The couple",
    coupleBody: "We met, and from that day the road has been brighter. Here is how our story began.",
    couplePhoto1Alt: "Placeholder: photo of our first meeting",
    couplePhoto1Caption: "where it all began",
    couplePhoto2Alt: "Placeholder: photo of the proposal",
    couplePhoto2Caption: "the yes was said",

    giftTitle: "Gift list",
    giftIntro: "Here you can help us build our home together.<br>Choose the gift you would like to contribute to, click “Contribute,” and enter your name and the amount. Then make a separate bank transfer using the IBAN below.<br>If you would rather contribute to our honeymoon in the Far East, you can make a bank transfer with “Honeymoon” as the reference.",
    swipeHint: "‹ swipe ›",

    rsvpSub: "RSVP",
    rsvpTitle: "Will you be there?",
    rsvpBody: "Let us know by March 3, 2027 if you'll walk with us on this day.",
    rsvpBtn: "Confirm attendance",

  },

};
