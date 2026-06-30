import { promises as fs } from "fs";
import path from "path";
import { defaultContent } from "./defaultContent";
import type { Registration, RegistrationInput, RegistrationStatus, SiteContent } from "./types";

const dataDir = path.join(process.cwd(), "data");
const registrationsPath = path.join(dataDir, "registrations.json");
const contentPath = path.join(dataDir, "site-content.json");

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") throw error;
    await fs.writeFile(file, JSON.stringify(fallback, null, 2), "utf8");
    return fallback;
  }
}

async function writeJson<T>(file: string, value: T) {
  await ensureDataDir();
  await fs.writeFile(file, JSON.stringify(value, null, 2), "utf8");
}

export async function getSiteContent(): Promise<SiteContent> {
  return readJson<SiteContent>(contentPath, defaultContent);
}

export async function saveSiteContent(content: SiteContent) {
  await writeJson(contentPath, content);
}

export async function getRegistrations(): Promise<Registration[]> {
  return readJson<Registration[]>(registrationsPath, []);
}

export async function addRegistration(input: RegistrationInput): Promise<Registration> {
  const registrations = await getRegistrations();
  const registration: Registration = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "unpaid",
    isOddman: Boolean(input.isOddman),
    accommodationSpots: input.offersAccommodation ? Number(input.accommodationSpots || 0) : 0,
  };
  registrations.unshift(registration);
  await writeJson(registrationsPath, registrations);
  return registration;
}

export async function updateRegistration(id: string, input: Partial<RegistrationInput & { status: RegistrationStatus }>) {
  const registrations = await getRegistrations();
  const next = registrations.map((registration) => {
    if (registration.id !== id) return registration;
    const updated = {
      ...registration,
      ...input,
      isOddman: Boolean(input.isOddman ?? registration.isOddman),
      accommodationSpots: (input.offersAccommodation ?? registration.offersAccommodation) ? Number(input.accommodationSpots ?? registration.accommodationSpots ?? 0) : 0,
    };
    return updated;
  });
  await writeJson(registrationsPath, next);
  return next.find((registration) => registration.id === id) ?? null;
}

export async function updateRegistrationStatus(id: string, status: RegistrationStatus) {
  const registrations = await getRegistrations();
  const next = registrations.map((registration) =>
    registration.id === id ? { ...registration, status } : registration
  );
  await writeJson(registrationsPath, next);
  return next.find((registration) => registration.id === id) ?? null;
}

export async function deleteRegistration(id: string) {
  const registrations = await getRegistrations();
  const next = registrations.filter((registration) => registration.id !== id);
  await writeJson(registrationsPath, next);
  return { ok: next.length !== registrations.length };
}
