const data = {
  date:        "2027-04-03T15:00:00",
  rsvp:       "#",
  footerDate: "03 aprile 2027",

  churchMap: "https://maps.google.com/maps/search/?api=1&query=Basilica+di+Santa+Maria+in+Domnica+alla+Navicella+Roma",
  venueMap:  "https://maps.google.com/maps/search/?api=1&query=Roma",

  fr: {
    nav: { home: "Home", rsvp: "RSVP", info: "Info", stay: "Séjour", gifts: "Liste", about: "Nous" },
    mapLink: "Voir sur Maps →",

    subtitle:   "03 avril 2027 • Basilica di Santa Maria in Domnica alla Navicella",

    rsvp: "#",
    rsvpEyebrow: "Répondre",
    rsvpTitle:   "Serez-vous là ?",
    rsvpSub:     "Faites-nous savoir avant le 3 mars 2027.",
    rsvpBtn:     "Confirmer",

    infoTitle:   "Informations",
    churchLabel:   "Cérémonie",
    churchAddress: "Basilica di Santa Maria in Domnica alla Navicella, Roma",
    churchTime:    "15h00",
    accessNote: [
      "🅿️ Placeholder: note d'accès à l'église",
      "🛗 Placeholder: ascenseur et accessibilité",
      "🚗 Placeholder: parking et navettes",
    ],
    venueLabel:  "Réception",
    venue:       "Placeholder: Lieu de la réception, Roma",

    stayLabel:   "Hébergement",
    stayTitle:   "Où dormir",

    howToGet: "Comment arriver à Rome",
    trenord: "Acheter les billets sur Trenitalia →",
    routes: [
      {
        from: "✈️ Aéroport Fiumicino",
        options: [
          { icon: "🚆", desc: "Train direct Leonardo → Roma Termini", duration: "~32 min" },
          { icon: "🚌", desc: "Bus direct → Roma Termini", duration: "~50 min" },
        ],
      },
      {
        from: "🏙️ Milan",
        options: [
          { icon: "🚆", desc: "Train à grande vitesse → Roma Termini", duration: "~3h" },
          { icon: "🚘", desc: "En voiture → Roma", duration: "~6h" },
        ],
      },
    ],

    giftsTitle:  "Liste de mariage",
    giftIntro: "Si vous souhaitez nous aider à commencer ce nouveau chapitre de notre famille, vous pouvez nous offrir l'un des objets ci-dessous ou contribuer à notre voyage de noces au Japon ❤️",

    aboutTitle:  "Les mariés",
    aboutSub:    "Clique sur les photos pour une surprise",
    about:       "On a hâte de pouvoir fêter notre mariage avec toi !",
  },

  it: {
    nav: { home: "Home", rsvp: "RSVP", info: "Info", stay: "Arrivo", gifts: "Lista", about: "Noi" },
    mapLink: "Vedi su Maps →",

    subtitle:   "03 aprile 2027 • Basilica di Santa Maria in Domnica alla Navicella",

    rsvp: "#",
    rsvpEyebrow: "Rispondere",
    rsvpTitle:   "Ci sarai?",
    rsvpSub:     "Facci sapere entro il 3 marzo 2027.",
    rsvpBtn:     "Confermare",

    infoTitle:   "Informazioni",
    churchLabel:   "Celebrazione",
    churchAddress: "Basilica di Santa Maria in Domnica alla Navicella, Roma",
    churchTime:    "ore 15:00",
    accessNote: [
      "🅿️ Placeholder: nota accesso chiesa",
      "🛗 Placeholder: ascensore e accessibilità",
      "🚗 Placeholder: parcheggio e navette",
    ],
    venueLabel:  "Ricevimento",
    venue:       "Placeholder: Luogo del ricevimento, Roma",

    stayLabel:   "Pernottamento",
    stayTitle:   "Dove dormire",

    howToGet: "Come raggiungere Roma",
    trenord: "Acquista i biglietti su Trenitalia →",
    routes: [
      {
        from: "✈️ Aeroporto Fiumicino",
        options: [
          { icon: "🚆", desc: "Treno diretto Leonardo → Roma Termini", duration: "~32 min" },
          { icon: "🚌", desc: "Bus diretto → Roma Termini", duration: "~50 min" },
        ],
      },
      {
        from: "🏙️ Milano",
        options: [
          { icon: "🚆", desc: "Treno ad alta velocità → Roma Termini", duration: "~3h" },
          { icon: "🚘", desc: "In auto → Roma", duration: "~6h" },
        ],
      },
    ],

    giftsTitle:  "Lista nozze",
    giftIntro: "Se desiderate aiutarci a iniziare questo nuovo capitolo della nostra famiglia, potete regalarci uno degli oggetti qui sotto oppure contribuire al nostro viaggio di nozze in Giappone ❤️",

    aboutTitle:  "Gli sposi",
    aboutSub:    "Clicca sulle foto per una sorpresa",
    about:       "Non vediamo l'ora di festeggiare il nostro matrimonio con te!",
  },

  gifts: [
    { name: "Viaggio di nozze in Giappone",                             nameFr: "Voyage de noces au Japon",                          price: 1200, icon: "✈️", photo: "assets/images/placeholder-gift-voyage.svg",     hidePrice: true },
    { name: "Giradischi e vinili — Placeholder",                        nameFr: "Tourne-disque et vinyles — Placeholder",           price: 300,  icon: "🎵", photo: "assets/images/placeholder-gift-vinile.svg",   },
    { name: "Proiettore — Placeholder",                                 nameFr: "Projecteur — Placeholder",                        price: 600,  icon: "🎬", photo: "assets/images/placeholder-gift-proiettore.svg" },
    { name: "Macchina da caffè — Placeholder",                          nameFr: "Machine à café — Placeholder",                    price: 200,  icon: "☕", photo: "assets/images/placeholder-gift-caffe.svg",     },
    { name: "Set di pentole — Placeholder",                             nameFr: "Set de casseroles — Placeholder",                 price: 250,  icon: "🍳", photo: "assets/images/placeholder-gift-pentole.svg",   },
  ],

  hotels: [
    {
      icon:     "🏨",
      name:     "Placeholder: Hotel 1",
      location: "Roma",
      price:    150,
      website:  "https://example.com",
      map:      "https://maps.google.com",
    },
    {
      icon:     "🛏️",
      name:     "Placeholder: B&B 1",
      location: "Roma",
      price:    90,
      website:  "https://example.com",
      map:      "https://maps.google.com",
    },
    {
      icon:     "🏡",
      name:     "Placeholder: Affitto 1",
      location: "Roma",
      price:    120,
      website:  "https://example.com",
      map:      "https://maps.google.com",
    },
    {
      icon:     "🌿",
      name:     "Placeholder: Agriturismo",
      location: "Roma",
      price:    110,
      website:  "https://example.com",
      map:      "https://maps.google.com",
    },
  ],
};