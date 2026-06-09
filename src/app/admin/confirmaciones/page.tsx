import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AdminConfirmations } from "@/components/AdminConfirmations";

export default async function AdminConfirmacionesPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.isAdmin) redirect("/invitation");

  return <AdminConfirmations language={session.language} />;
}
