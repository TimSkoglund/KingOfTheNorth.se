import { TournamentPage } from "@/components/TournamentPage";
import { getRegistrations, getSiteContent } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [content, registrations] = await Promise.all([getSiteContent(), getRegistrations()]);
  return <TournamentPage content={content} registrations={registrations} />;
}
