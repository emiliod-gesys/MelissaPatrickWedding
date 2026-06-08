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
      date: "15 de Noviembre, 2026",
      location: "Ciudad de México",
    },
    greeting: {
      dear: "Querido/a",
      invited: "Estás cordialmente invitado/a a celebrar nuestra boda",
      extraZero: "Tu invitación es personal e intransferible.",
      extraOne: "Puedes traer 1 invitado adicional.",
      extraMany: (n: number) => `Puedes traer hasta ${n} invitados adicionales.`,
    },
    countdown: {
      title: "Faltan",
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
    },
    timeline: {
      title: "Programa del día",
      ceremony: "Ceremonia",
      ceremonyTime: "17:00",
      cocktail: "Cóctel",
      cocktailTime: "18:00",
      dinner: "Cena",
      dinnerTime: "20:00",
      party: "Fiesta",
      partyTime: "22:00",
      photos: "Sesión de fotos",
      photosTime: "16:30",
      toast: "Brindis",
      toastTime: "21:00",
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
      date: "15. November 2026",
      location: "Mexiko-Stadt",
    },
    greeting: {
      dear: "Liebe/r",
      invited: "Du bist herzlich eingeladen, unsere Hochzeit zu feiern",
      extraZero: "Deine Einladung ist persönlich und nicht übertragbar.",
      extraOne: "Du darfst 1 zusätzlichen Gast mitbringen.",
      extraMany: (n: number) => `Du darfst bis zu ${n} zusätzliche Gäste mitbringen.`,
    },
    countdown: {
      title: "Noch",
      days: "Tage",
      hours: "Stunden",
      minutes: "Minuten",
      seconds: "Sekunden",
    },
    timeline: {
      title: "Tagesablauf",
      ceremony: "Zeremonie",
      ceremonyTime: "17:00",
      cocktail: "Cocktail",
      cocktailTime: "18:00",
      dinner: "Abendessen",
      dinnerTime: "20:00",
      party: "Feier",
      partyTime: "22:00",
      photos: "Fotosession",
      photosTime: "16:30",
      toast: "Anstoßen",
      toastTime: "21:00",
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

export const WEDDING_DATE = new Date("2026-11-15T17:00:00-06:00");

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
