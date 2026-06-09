import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { InvitationHero } from "@/components/InvitationHero";
import { OurStory } from "@/components/OurStory";
import { Countdown } from "@/components/Countdown";
import { Timeline } from "@/components/Timeline";
import { PhotoGallery } from "@/components/PhotoGallery";
import { InvitationFooter } from "@/components/InvitationFooter";
import { FloatingPetals } from "@/components/FloatingPetals";

export default async function InvitationPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <main className="relative">
      <FloatingPetals />
      <InvitationHero
        displayName={session.displayName}
        extraGuests={session.extraGuests}
        language={session.language}
      />
      <div className="relative z-10 bg-cream">
        <OurStory language={session.language} />
        <Countdown language={session.language} />
        <Timeline language={session.language} />
        <PhotoGallery language={session.language} />
        <InvitationFooter language={session.language} isAdmin={session.isAdmin} />
      </div>
    </main>
  );
}
