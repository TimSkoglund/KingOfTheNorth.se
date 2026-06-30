import { NextResponse } from "next/server";
import { addRegistration } from "@/lib/data";
import type { RegistrationInput } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<RegistrationInput>;

  if (!body.name || !body.email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const registration = await addRegistration({
    nafNick: String(body.nafNick ?? body.name ?? ""),
    nafNumber: String(body.nafNumber ?? ""),
    name: String(body.name),
    email: String(body.email),
    phone: String(body.phone ?? ""),
    location: String(body.location ?? ""),
    club: String(body.club ?? ""),
    comment: String(body.comment ?? ""),
    needsAccommodation: Boolean(body.needsAccommodation),
    offersAccommodation: Boolean(body.offersAccommodation),
    accommodationSpots: Number(body.accommodationSpots ?? 0),
    isOddman: false,
  });

  return NextResponse.json({ registration });
}
