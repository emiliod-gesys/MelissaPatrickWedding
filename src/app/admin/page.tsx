import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AdminPanel } from "@/components/AdminPanel";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.isAdmin) redirect("/invitation");

  return <AdminPanel language={session.language} />;
}
