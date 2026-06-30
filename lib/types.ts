export type Locale = "sv" | "en";
export type LocalizedString = Record<Locale, string>;

export type ScheduleItem = {
  time: string;
  title: LocalizedString;
};

export type LinkItem = {
  label: LocalizedString;
  href: string;
  icon?: string;
};

export type SiteContent = {
  nav: Record<"home" | "tournament" | "schedule" | "rules" | "venue" | "contact", LocalizedString>;
  hero: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    subtitle: LocalizedString;
    primaryCta: LocalizedString;
    secondaryCta: LocalizedString;
  };
  facts: LocalizedString[];
  tournament: {
    title: LocalizedString;
    body: LocalizedString;
    format: LocalizedString[];
    details: { label: LocalizedString; value: LocalizedString; href?: string }[];
    maxCoaches: number;
    oddmanSlots: number;
    importantLinks: LinkItem[];
    eventRulesTitle: LocalizedString;
    eventRules: LocalizedString[];
    closing: LocalizedString;
  };
  schedule: {
    title: LocalizedString;
    saturday: ScheduleItem[];
    sunday: ScheduleItem[];
  };
  rules: {
    title: LocalizedString;
    body: LocalizedString;
    items: LocalizedString[];
  };
  registration: {
    title: LocalizedString;
    intro: LocalizedString;
    successTitle: LocalizedString;
    successBody: LocalizedString;
  };
  venue: {
    title: LocalizedString;
    name: LocalizedString;
    address: LocalizedString;
    body: LocalizedString;
  };
  contact: {
    title: LocalizedString;
    name: string;
    email: string;
    body: LocalizedString;
  };
  links: {
    title: LocalizedString;
    items: LinkItem[];
  };
  awards: {
    title: LocalizedString;
    items: { title: LocalizedString; description?: LocalizedString; image: string }[];
  };
  tiebreakers: {
    title: LocalizedString;
    body: LocalizedString;
  };
  sportsmanship: {
    title: LocalizedString;
    body: LocalizedString;
  };
};

export type RegistrationStatus = "unpaid" | "paid" | "confirmed";

export type Registration = {
  id: string;
  createdAt: string;
  nafNick: string;
  nafNumber: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  club: string;
  comment: string;
  needsAccommodation: boolean;
  offersAccommodation: boolean;
  accommodationSpots: number;
  isOddman: boolean;
  status: RegistrationStatus;
};

export type RegistrationInput = Omit<Registration, "id" | "createdAt" | "status">;

