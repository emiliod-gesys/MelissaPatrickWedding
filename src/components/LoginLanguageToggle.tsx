import type { Language } from "@/lib/types";

interface LoginLanguageToggleProps {
  language: Language;
  onChange: (language: Language) => void;
}

function FlagElSalvador({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden>
      <rect width="30" height="20" fill="#0047AB" />
      <rect y="6.67" width="30" height="6.66" fill="#fff" />
    </svg>
  );
}

function FlagGermany({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden>
      <rect width="30" height="6.67" fill="#000" />
      <rect y="6.67" width="30" height="6.66" fill="#D00" />
      <rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
    </svg>
  );
}

export function LoginLanguageToggle({ language, onChange }: LoginLanguageToggleProps) {
  const base =
    "overflow-hidden rounded-md border-2 shadow-sm transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50";
  const active = "border-gold opacity-100";
  const inactive = "border-transparent opacity-50 hover:opacity-80";

  return (
    <div className="mb-6 flex justify-center gap-3">
      <button
        type="button"
        onClick={() => onChange("es")}
        aria-label="Español"
        aria-pressed={language === "es"}
        className={`${base} ${language === "es" ? active : inactive}`}
      >
        <FlagElSalvador className="h-5 w-8" />
      </button>
      <button
        type="button"
        onClick={() => onChange("de")}
        aria-label="Deutsch"
        aria-pressed={language === "de"}
        className={`${base} ${language === "de" ? active : inactive}`}
      >
        <FlagGermany className="h-5 w-8" />
      </button>
    </div>
  );
}
