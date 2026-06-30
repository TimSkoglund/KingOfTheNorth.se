import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { addRegistration, deleteRegistration, getRegistrations, getSiteContent, saveSiteContent, updateRegistration, updateRegistrationStatus } from "@/lib/data";
import type { Registration, RegistrationInput, RegistrationStatus, SiteContent } from "@/lib/types";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();
  const [content, registrations] = await Promise.all([getSiteContent(), getRegistrations()]);
  return NextResponse.json({ content, registrations });
}

export async function PUT(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();
  const body = (await request.json()) as { content?: SiteContent };
  if (!body.content) {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }
  await saveSiteContent(body.content);
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();
  const body = (await request.json()) as Partial<RegistrationInput>;
  if (!body.nafNick || !body.nafNumber) {
    return NextResponse.json({ error: "Missing NAF nick or NAF number" }, { status: 400 });
  }
  const registration = await addRegistration({
    nafNick: String(body.nafNick),
    nafNumber: String(body.nafNumber),
    name: String(body.name ?? body.nafNick),
    email: String(body.email ?? ""),
    phone: String(body.phone ?? ""),
    location: String(body.location ?? ""),
    club: String(body.club ?? ""),
    comment: String(body.comment ?? ""),
    needsAccommodation: Boolean(body.needsAccommodation),
    offersAccommodation: Boolean(body.offersAccommodation),
    accommodationSpots: Number(body.accommodationSpots ?? 0),
    isOddman: Boolean(body.isOddman),
  });
  return NextResponse.json({ registration });
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();
  const body = (await request.json()) as { id?: string; status?: RegistrationStatus; registration?: Partial<Registration> };
  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const registration = body.registration
    ? await updateRegistration(body.id, body.registration)
    : body.status
      ? await updateRegistrationStatus(body.id, body.status)
      : null;
  if (!registration) return NextResponse.json({ error: "Registration not found or missing update" }, { status: 404 });
  return NextResponse.json({ registration });
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const result = await deleteRegistration(id);
  return NextResponse.json(result);
}
