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
      date: "17 de Octubre, 2026",
      location: "Palo Alto, Casa del Lago, Coatepeque, Santa Ana, El Salvador",
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
    gallery: {
      title: "Nuestros momentos",
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
      date: "17. Oktober 2026",
      location: "Palo Alto, Casa del Lago, Coatepeque, Santa Ana, El Salvador",
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
    gallery: {
      title: "Unsere Momente",
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

export const STORY_PHOTO = "/media/fotos/IMG_5984.jpeg";

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
