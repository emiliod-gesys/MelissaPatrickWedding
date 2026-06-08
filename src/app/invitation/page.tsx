import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getTranslations } from "@/lib/i18n";
import { InvitationHero } from "@/components/InvitationHero";
import { Countdown } from "@/components/Countdown";
import { Timeline } from "@/components/Timeline";
import { PhotoGallery } from "@/components/PhotoGallery";
import { InvitationFooter } from "@/components/InvitationFooter";
import { FloatingPetals } from "@/components/FloatingPetals";

export default async function InvitationPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const t = getTranslations(session.language);

  return (
    <main className="relative">
      <FloatingPetals />
      <InvitationHero
        displayName={session.displayName}
        extraGuests={session.extraGuests}
        language={session.language}
      />
      <div className="relative z-10 bg-cream">
        <Countdown t={t.countdown} />
        <Timeline t={t.timeline} />
        <PhotoGallery t={t.gallery} />
        <InvitationFooter t={t.footer} isAdmin={session.isAdmin} />
      </div>
    </main>
  );
}
