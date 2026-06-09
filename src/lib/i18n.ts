import type { Language } from "@/lib/types";

const translations = {
  es: {
    login: {
      title: "Bienvenido",
      subtitle: "Ingresa tu nombre de invitado para ver tu invitación personalizada",
      placeholder: "Tu nombre de usuario",
      submit: "Entrar",
      error: "Usuario no encontrado. Verifica con los novios.",
      loading: "Entrando...",
    },
    hero: {
      together: "Juntos para siempre",
      weddingTitle: "¡Nos casamos!",
      date: "17 de Octubre, 2026",
      dateLong: "Sábado 17 de octubre del 2026",
      location: "Palo Alto, Casa del Lago, Coatepeque, Santa Ana, El Salvador",
      rsvp: "RSVP",
    },
    rsvp: {
      title: "Confirma tu asistencia",
      subtitle:
        "Por favor reserva tu cupo para que podamos preparar todo con cariño. Puedes actualizar tu respuesta cuando lo necesites.",
      button: "Reservar cupo",
      updateButton: "Actualizar reserva",
      current: "Has confirmado {count} persona(s)",
      modalTitle: "Reservar cupo",
      modalSubtitle: "¿Cuántas personas asistirán? (máximo {max})",
      label: "Confirmados",
      hint: "Incluyéndote a ti. Puedes traer hasta {extras} acompañante(s) adicional(es).",
      submit: "Confirmar",
      cancel: "Cancelar",
      saving: "Guardando...",
      success: "¡Reserva guardada con éxito!",
      error: "No se pudo guardar tu confirmación",
    },
    story: {
      title: "¿Sabías que?",
      paragraphs: [
        "Nuestra historia comenzó en Alemania, en un pequeño pueblo llamado Heidelberg un 26 de Septiembre. Todo comenzó con una linda caminata bajo la lluvia, desde el momento que nos conocimos nuestro amor no ha dejado de crecer, convirtiéndose en la unión perfecta entre dos culturas.",
        "Juntos, no solo hemos impulsado nuestro crecimiento personal, sino también hemos recorrido lugares nuevos y creado recuerdos inolvidables.",
        "Finalmente el 10 de noviembre del 2025, nos dimos el Sí más hermoso e importante de nuestras vidas.",
      ],
      cta: "Acompáñanos a hacerlo oficial:",
      date: "17 de octubre del 2026",
      location: "Palo Alto, Casa del Lago, Coatepeque, Santa Ana, El Salvador",
    },
    greeting: {
      dear: "Querido/a",
      invited: "Estás cordialmente invitado/a a celebrar nuestra boda",
      extraZero: "Tu invitación es personal e intransferible.",
      extraOne: "Puedes traer 1 invitado adicional.",
      extraMany: "Puedes traer hasta {n} invitados adicionales.",
    },
    countdown: {
      title: "Faltan",
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
    },
    timeline: {
      title: "Itinerario",
      subtitle:
        "¡Queremos hacerte parte de todo! Por lo que te compartimos un estimado de los horarios y eventos que estaremos teniendo el día de nuestra boda.",
      cocktail: "Coctel de Bienvenida",
      cocktailTime: "4:00pm",
      ceremony: "Ceremonia",
      ceremonyTime: "5:00pm",
      photos: "Fotos",
      photosTime: "5:45-6:30pm",
      toast: "Brindis",
      toastTime: "7:00pm",
      dinner: "Cena",
      dinnerTime: "7:30pm",
      party: "Fiesta",
      partyTime: "8:00pm",
    },
    directions: {
      title: "Cómo llegar",
      subtitle: "Te esperamos en Palo Alto, Casa del Lago. Usa el mapa para llegar con facilidad.",
      address: "Palo Alto, Casa del Lago, Coatepeque, Santa Ana, El Salvador",
      mapTitle: "Ubicación de la boda",
      openInMaps: "Abrir en Google Maps",
      getDirections: "Obtener indicaciones",
    },
    gallery: {
      title: "Nuestros momentos",
    },
    loveStory: {
      title: "La historia de amor",
      paragraph:
        "Queremos unir lo más hermoso de nuestras dos culturas, la alemana y la salvadoreña, creando un espacio donde te sientas en casa junto a nosotros. Este es el inicio de la familia que soñamos formar, y esperamos de corazón poder contar con tu presencia.",
    },
    dressCode: {
      title: "Dress code",
      womenTitle: "Mujeres",
      women: ["Vestido de fiesta", "Largo o corto", "Evitar blanco o rojo"],
      menTitle: "Hombres",
      men: ["Vestimenta formal", "Saco o Blazer", "Evitar usar jeans o caqui"],
    },
    gifts: {
      label: "Mesa de regalos virtual",
      title: "¡Muchas gracias!",
      paragraph1:
        "Aunque nuestra vida hoy está en Alemania, nuestro corazón nos trajo de vuelta a la tierra de Melissa para celebrar este día con ustedes.",
      paragraph2:
        "Si desean acompañarnos con un detalle pueden hacerlo de manera digital como presencial en regalo de sobre, lo recibiremos con todo nuestro cariño.",
      internationalTitle: "Transferencias Internacionales",
      international: [
        { label: "Nombre de la institución", value: "Revolut Bank UAB" },
        { label: "BIC", value: "REVOLT21" },
        { label: "IBAN", value: "LT18 3250 0721 9645 3725" },
        { label: "Nombre de la cuenta", value: "Melissa Esmeralda Moreno Ramirez" },
      ],
      localTitle: "Transferencias Salvadoreñas",
      local: [
        { label: "Nombre de la institución", value: "Banco Agrícola" },
        { label: "Cuenta de ahorro", value: "3430553013" },
        { label: "Nombre de la cuenta", value: "Melissa Moreno" },
      ],
    },
    footer: {
      love: "Con amor,",
      names: "Melissa & Patrick",
      logout: "Salir",
      admin: "Panel de administración",
    },
    admin: {
      title: "Panel de invitados",
      subtitle: "Crea y personaliza las invitaciones de cada invitado",
      username: "Usuario (login)",
      displayName: "Nombre para mostrar",
      language: "Idioma",
      extraGuests: "Invitados adicionales",
      create: "Crear invitado",
      save: "Guardar",
      delete: "Eliminar",
      back: "Volver a la invitación",
      created: "Invitado creado",
      updated: "Cambios guardados",
      deleted: "Invitado eliminado",
      confirmDelete: "¿Eliminar este invitado?",
      spanish: "Español",
      german: "Alemán",
      adminBadge: "Admin",
      guests: "Invitados",
      noGuests: "Aún no hay invitados. Crea el primero arriba.",
      confirmationsLink: "Ver confirmaciones",
    },
    confirmations: {
      title: "Confirmaciones de asistencia",
      subtitle: "Resumen de invitados que han reservado su cupo",
      backGuests: "Gestionar invitados",
      backInvitation: "Ver invitación",
      logout: "Salir",
      loading: "Cargando...",
      empty: "No hay invitados registrados",
      totalGuests: "Invitados",
      totalResponded: "Han confirmado",
      totalAttendees: "Personas en total",
      guest: "Invitado",
      max: "Máximo",
      confirmed: "Confirmados",
      extras: "Extras (lleva / permitidos)",
      status: "Estado",
      updated: "Actualizado",
      statusConfirmed: "Confirmado",
      statusPending: "Pendiente",
    },
  },
  de: {
    login: {
      title: "Willkommen",
      subtitle:
        "Gib deinen Gästenamen ein, um deine personalisierte Einladung zu sehen",
      placeholder: "Dein Benutzername",
      submit: "Eintreten",
      error: "Benutzer nicht gefunden. Bitte bei den Brautleuten nachfragen.",
      loading: "Eintritt...",
    },
    hero: {
      together: "Für immer zusammen",
      weddingTitle: "Wir heiraten!",
      date: "17. Oktober 2026",
      dateLong: "Samstag, 17. Oktober 2026",
      location: "Palo Alto, Casa del Lago, Coatepeque, Santa Ana, El Salvador",
      rsvp: "RSVP",
    },
    rsvp: {
      title: "Bestätige deine Teilnahme",
      subtitle:
        "Bitte reserviere deinen Platz, damit wir alles liebevoll vorbereiten können. Du kannst deine Antwort jederzeit aktualisieren.",
      button: "Platz reservieren",
      updateButton: "Reservierung aktualisieren",
      current: "Du hast {count} Person(en) bestätigt",
      modalTitle: "Platz reservieren",
      modalSubtitle: "Wie viele Personen nehmen teil? (maximal {max})",
      label: "Bestätigte Personen",
      hint: "Einschließlich dir. Du darfst bis zu {extras} zusätzliche Begleitung(en) mitbringen.",
      submit: "Bestätigen",
      cancel: "Abbrechen",
      saving: "Speichern...",
      success: "Reservierung erfolgreich gespeichert!",
      error: "Bestätigung konnte nicht gespeichert werden",
    },
    story: {
      title: "Wusstest du schon?",
      paragraphs: [
        "Unsere Geschichte begann in Deutschland, in einem kleinen Ort namens Heidelberg, am 26. September. Alles startete mit einem schönen Spaziergang im Regen – seit dem Moment, in dem wir uns kennengelernt haben, ist unsere Liebe stetig gewachsen und wurde zur perfekten Verbindung zweier Kulturen.",
        "Gemeinsam haben wir nicht nur unser persönliches Wachstum gefördert, sondern auch neue Orte bereist und unvergessliche Erinnerungen geschaffen.",
        "Am 10. November 2025 haben wir uns das schönste und wichtigste Ja unseres Lebens gegeben.",
      ],
      cta: "Begleite uns, wenn wir es offiziell machen:",
      date: "17. Oktober 2026",
      location: "Palo Alto, Casa del Lago, Coatepeque, Santa Ana, El Salvador",
    },
    greeting: {
      dear: "Liebe/r",
      invited: "Du bist herzlich eingeladen, unsere Hochzeit zu feiern",
      extraZero: "Deine Einladung ist persönlich und nicht übertragbar.",
      extraOne: "Du darfst 1 zusätzlichen Gast mitbringen.",
      extraMany: "Du darfst bis zu {n} zusätzliche Gäste mitbringen.",
    },
    countdown: {
      title: "Noch",
      days: "Tage",
      hours: "Stunden",
      minutes: "Minuten",
      seconds: "Sekunden",
    },
    timeline: {
      title: "Itinerar",
      subtitle:
        "Wir möchten, dass du Teil von allem bist! Deshalb teilen wir mit dir einen Überblick über die Zeiten und Events an unserem Hochzeitstag.",
      cocktail: "Willkommenscocktail",
      cocktailTime: "16:00 Uhr",
      ceremony: "Zeremonie",
      ceremonyTime: "17:00 Uhr",
      photos: "Fotos",
      photosTime: "17:45–18:30 Uhr",
      toast: "Anstoßen",
      toastTime: "19:00 Uhr",
      dinner: "Abendessen",
      dinnerTime: "19:30 Uhr",
      party: "Feier",
      partyTime: "20:00 Uhr",
    },
    directions: {
      title: "Anfahrt",
      subtitle:
        "Wir erwarten dich in Palo Alto, Casa del Lago. Nutze die Karte, um bequem anzukommen.",
      address: "Palo Alto, Casa del Lago, Coatepeque, Santa Ana, El Salvador",
      mapTitle: "Hochzeitslocation",
      openInMaps: "In Google Maps öffnen",
      getDirections: "Route planen",
    },
    gallery: {
      title: "Unsere Momente",
    },
    loveStory: {
      title: "Die Liebesgeschichte",
      paragraph:
        "Wir möchten das Schönste unserer beiden Kulturen vereinen – die deutsche und die salvadorianische – und einen Ort schaffen, an dem du dich mit uns wie zu Hause fühlst. Dies ist der Beginn der Familie, von der wir träumen, und wir hoffen von Herzen, dass du dabei sein kannst.",
    },
    dressCode: {
      title: "Dress code",
      womenTitle: "Damen",
      women: ["Festliches Kleid", "Lang oder kurz", "Bitte kein Weiß oder Rot"],
      menTitle: "Herren",
      men: ["Formelle Kleidung", "Sakko oder Blazer", "Bitte keine Jeans oder Khaki"],
    },
    gifts: {
      label: "Virtueller Geschenktisch",
      title: "Vielen Dank!",
      paragraph1:
        "Obwohl unser Leben heute in Deutschland ist, hat uns unser Herz zurück in Melissas Heimat geführt, um diesen Tag mit euch zu feiern.",
      paragraph2:
        "Wenn ihr uns mit einer Geste begleiten möchtet, könnt ihr das digital oder persönlich in einem Umschlag tun – wir nehmen es mit ganzem Herzen entgegen.",
      internationalTitle: "Internationale Überweisungen",
      international: [
        { label: "Name der Bank", value: "Revolut Bank UAB" },
        { label: "BIC", value: "REVOLT21" },
        { label: "IBAN", value: "LT18 3250 0721 9645 3725" },
        { label: "Kontoinhaberin", value: "Melissa Esmeralda Moreno Ramirez" },
      ],
      localTitle: "Überweisungen in El Salvador",
      local: [
        { label: "Name der Bank", value: "Banco Agrícola" },
        { label: "Sparkonto", value: "3430553013" },
        { label: "Kontoinhaberin", value: "Melissa Moreno" },
      ],
    },
    footer: {
      love: "Mit Liebe,",
      names: "Melissa & Patrick",
      logout: "Abmelden",
      admin: "Administrationsbereich",
    },
    admin: {
      title: "Gästepanel",
      subtitle: "Erstelle und personalisiere die Einladungen für jeden Gast",
      username: "Benutzer (Login)",
      displayName: "Anzeigename",
      language: "Sprache",
      extraGuests: "Zusätzliche Gäste",
      create: "Gast erstellen",
      save: "Speichern",
      delete: "Löschen",
      back: "Zurück zur Einladung",
      created: "Gast erstellt",
      updated: "Änderungen gespeichert",
      deleted: "Gast gelöscht",
      confirmDelete: "Diesen Gast löschen?",
      spanish: "Spanisch",
      german: "Deutsch",
      adminBadge: "Admin",
      guests: "Gäste",
      noGuests: "Noch keine Gäste. Erstelle den ersten oben.",
      confirmationsLink: "Bestätigungen ansehen",
    },
    confirmations: {
      title: "Teilnahmebestätigungen",
      subtitle: "Übersicht der Gäste, die ihren Platz reserviert haben",
      backGuests: "Gäste verwalten",
      backInvitation: "Einladung ansehen",
      logout: "Abmelden",
      loading: "Laden...",
      empty: "Keine Gäste registriert",
      totalGuests: "Gäste",
      totalResponded: "Bestätigt",
      totalAttendees: "Personen gesamt",
      guest: "Gast",
      max: "Maximum",
      confirmed: "Bestätigt",
      extras: "Extras (mit / erlaubt)",
      status: "Status",
      updated: "Aktualisiert",
      statusConfirmed: "Bestätigt",
      statusPending: "Ausstehend",
    },
  },
} as const;

export type Translations = (typeof translations)[Language];

export function getTranslations(language: Language): Translations {
  return translations[language];
}

export function getExtraGuestsMessage(language: Language, count: number): string {
  const { greeting } = translations[language];
  if (count === 0) return greeting.extraZero;
  if (count === 1) return greeting.extraOne;
  return greeting.extraMany.replace("{n}", String(count));
}

export const WEDDING_DATE = new Date("2026-10-17T17:00:00-06:00");

/** 13°53'25.7"N 89°31'55.4"W — Palo Alto, Casa del Lago */
export const VENUE_COORDS = {
  lat: 13.890472,
  lng: -89.532056,
} as const;

export const HERO_PHOTOS = {
  beach: "/media/fotos/IMG_0572.jpeg",
  rings: "/media/fotos/IMG_0425.jpeg",
} as const;

export const DIRECTIONS_BG = "/media/fotos/directions-bg.png";

export const STORY_PHOTO = "/media/fotos/IMG_5984.jpeg";

export const GIFT_PHOTOS = {
  topLeft: "/media/fotos/5f54611f-c562-4d1c-9f0f-0599f5596e87.jpeg",
  bottomRight: "/media/fotos/311ce86a-9d4a-42d1-82dd-dca60bcfb390.jpeg",
} as const;

export const LOVE_STORY_PHOTOS = {
  topLeft: "/media/fotos/IMG_5658.jpeg",
  bottomLeft: "/media/fotos/IMG_0560.jpeg",
  topRight: "/media/fotos/IMG_5686.jpeg",
  bottomRightLeft: "/media/fotos/IMG_1381.jpeg",
  bottomRightRight: "/media/fotos/IMG_0572.jpeg",
} as const;

export const PHOTOS = [
  "/media/fotos/IMG_1471.jpeg",
  "/media/fotos/IMG_5686.jpeg",
  "/media/fotos/IMG_1381.jpeg",
  "/media/fotos/IMG_5658.jpeg",
  "/media/fotos/IMG_0425.jpeg",
  "/media/fotos/IMG_7743.jpeg",
  "/media/fotos/IMG_5984.jpeg",
  "/media/fotos/IMG_0560.jpeg",
  "/media/fotos/IMG_0582.jpeg",
  "/media/fotos/IMG_0572.jpeg",
  "/media/fotos/311ce86a-9d4a-42d1-82dd-dca60bcfb390.jpeg",
  "/media/fotos/5f54611f-c562-4d1c-9f0f-0599f5596e87.jpeg",
];

export const TIMELINE_ICONS = {
  photos: "/media/iconos/Fotos.png",
  ceremony: "/media/iconos/Ceremonia.png",
  cocktail: "/media/iconos/Coctel.png",
  dinner: "/media/iconos/Cena.png",
  toast: "/media/iconos/Brindis.png",
  party: "/media/iconos/Fiesta.png",
} as const;
