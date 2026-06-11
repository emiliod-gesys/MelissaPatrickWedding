import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { InvitationHero } from "@/components/InvitationHero";
import { RsvpSection } from "@/components/RsvpSection";
import { OurStory } from "@/components/OurStory";
import { Countdown } from "@/components/Countdown";
import { Timeline } from "@/components/Timeline";
import { Directions } from "@/components/Directions";
import { LoveStory } from "@/components/LoveStory";
import { DressCode } from "@/components/DressCode";
import { PhotoGallery } from "@/components/PhotoGallery";
import { GiftRegistry } from "@/components/GiftRegistry";
import { ContactSection } from "@/components/ContactSection";
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
        isConyugal={session.isConyugal}
        language={session.language}
      />
      <div className="relative z-10 bg-cream">
        <RsvpSection
          language={session.language}
          extraGuests={session.extraGuests}
          isConyugal={session.isConyugal}
        />
        <OurStory language={session.language} />
        <Countdown language={session.language} />
        <Timeline language={session.language} />
        <Directions language={session.language} />
        <LoveStory language={session.language} />
        <DressCode language={session.language} />
        <PhotoGallery language={session.language} />
        <GiftRegistry language={session.language} />
        <ContactSection language={session.language} />
        <InvitationFooter language={session.language} isAdmin={session.isAdmin} />
      </div>
    </main>
  );
}
