"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Locale, Registration, SiteContent } from "@/lib/types";

const asset = {
  arena: "/assets/images/hero-fight-arena.png",
  skull: "/assets/images/branding/north-skull-emblem.png",
  sportsmanship: "/assets/images/branding/sportsmanship-lockup.png",
  north: "/assets/images/branding/welcome-to-the-north-lockup.png",
  football: "/assets/images/football-bones.png",
  pennant: "/assets/images/schedule-pennant-wide.png",
};

const contactEmail = "timskoglund@hotmail.com";
const contactPhone = "0702613853";

export function TournamentPage({ content, registrations }: { content: SiteContent; registrations: Registration[] }) {
  const [locale, setLocale] = useState<Locale>("sv");
  const t = (value: { sv: string; en: string }) => value[locale];

  const labels = useMemo(
    () => ({
      daySat: locale === "sv" ? "Lördag" : "Saturday",
      daySun: locale === "sv" ? "Söndag" : "Sunday",
      contact: locale === "sv" ? "Kontakt" : "Contact",
      contactBody: locale === "sv" ? "Har du frågor om turneringen? Skicka ett kort meddelande direkt till arrangören." : "Questions about the tournament? Send a short message directly to the organiser.",
      name: locale === "sv" ? "Namn" : "Name",
      email: locale === "sv" ? "E-post" : "Email",
      message: locale === "sv" ? "Meddelande" : "Message",
      namePlaceholder: locale === "sv" ? "Ditt namn" : "Your name",
      emailPlaceholder: locale === "sv" ? "Ex. namn@example.com" : "E.g. name@example.com",
      messagePlaceholder: locale === "sv" ? "Skriv din fråga här..." : "Write your question here...",
      questions: locale === "sv" ? "Frågor" : "Questions",
      registeredCoaches: locale === "sv" ? "Registrerade coacher" : "Registered coaches",
      spots: locale === "sv" ? "Platser" : "Spots",
      spotsLeft: locale === "sv" ? "platser kvar" : "spots left",
      oddman: "Oddman",
      nafNick: "NAF nick",
      nafNumber: locale === "sv" ? "NAF nr" : "NAF no.",
      status: "Status",
      statusLabels: {
        unpaid: locale === "sv" ? "Ej betald" : "Unpaid",
        paid: locale === "sv" ? "Betald" : "Paid",
        confirmed: locale === "sv" ? "Bekräftad" : "Confirmed",
      },
      sleepingPlace: locale === "sv" ? "Sovplats" : "Sleeping place",
      needsSleepingPlace: locale === "sv" ? "Behöver" : "Needs",
      offersSleepingPlace: locale === "sv" ? "Erbjuder" : "Offers",
      noCoaches: locale === "sv" ? "Inga registrerade coacher ännu." : "No registered coaches yet.",
      yes: locale === "sv" ? "Ja" : "Yes",
      no: locale === "sv" ? "Nej" : "No",
      send: locale === "sv" ? "Skicka mail" : "Send email",
      admin: "Admin",
    }),
    [locale]
  );

  function onContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");
    const subject = encodeURIComponent("King of the North kontakt");
    const body = encodeURIComponent(`Namn: ${name}\nE-post: ${email}\n\n${message}`);

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  const maxCoaches = content.tournament.maxCoaches ?? 12;
  const oddmanSlots = content.tournament.oddmanSlots ?? 0;
  const regularRegistrations = registrations.filter((registration) => !registration.isOddman);
  const oddmanRegistrations = registrations.filter((registration) => registration.isOddman);
  const regularLeft = Math.max(maxCoaches - regularRegistrations.length, 0);
  const oddmanLeft = Math.max(oddmanSlots - oddmanRegistrations.length, 0);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="King of the North home">
          <img src={asset.skull} alt="" />
          <span>King of the North</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#tournament">{t(content.nav.tournament)}</a>
          <a href="#schedule">{t(content.nav.schedule)}</a>
          <a href="#coaches">{labels.registeredCoaches}</a>
          <a href="#contact">{labels.contact}</a>
        </nav>
        <div className="language-switcher" aria-label="Language switcher">
          <button className={locale === "sv" ? "active" : ""} onClick={() => setLocale("sv")}>Svenska</button>
          <button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")}>English</button>
        </div>
      </header>

      <section id="home" className="hero">
        <img className="hero-bg" src={asset.arena} alt="" />
        <div className="hero-vignette" />
        <div className="hero-content hero-content-clean">
          <h1 className="hero-title" aria-label={t(content.hero.title)}>
            <span>KING</span>
            <small>OF THE</small>
            <span>NORTH</span>
          </h1>
          <p className="hero-subtitle hero-subtitle-compact">{t(content.hero.subtitle)}</p>
          <div className="hero-actions">
            <a className="button primary" href="https://tourplay.net/en/blood-bowl/king-of-the-north" target="_blank" rel="noreferrer">{t(content.hero.primaryCta)}</a>
          </div>
        </div>
      </section>
      <div className="hero-divider" aria-hidden="true" />

      <section className="section tournament-section" id="tournament">
        <div className="tournament-heading">
          <h2>{t(content.tournament.title)}</h2>
          <p>{t(content.tournament.body)}</p>
        </div>
        <div className="tournament-links" aria-label={locale === "sv" ? "Viktiga turneringslänkar" : "Important tournament links"}>
          {content.tournament.importantLinks.map((link) => (
            <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
              <span>{t(link.label)}</span>
            </a>
          ))}
        </div>
        <div className="tournament-info-layout">
          <div className="tournament-details">
            {content.tournament.details.map((item) => (
              <div className="tournament-detail" key={t(item.label)}>
                <span>{t(item.label)}</span>
                {item.href ? <a href={item.href} target="_blank" rel="noreferrer">{t(item.value)}</a> : <strong>{t(item.value)}</strong>}
              </div>
            ))}
          </div>
        </div>
        <div className="event-rules">
          <h3>{t(content.tournament.eventRulesTitle)}</h3>
          <ul>
            {content.tournament.eventRules.map((rule) => <li key={t(rule)}>{t(rule)}</li>)}
          </ul>
        </div>
      </section>

      <section className="section awards-section awards-section-wide">
        <div className="section-heading awards-heading">
          <h2 className="section-divider-title">{t(content.awards.title)}</h2>
        </div>
        <div className="awards-grid">
          {content.awards.items.map((award) => (
            <article className="award-card" key={t(award.title)}>
              <img src={award.image} alt="" />
              <h3>{t(award.title)}</h3>
              {award.description && <p>{t(award.description)}</p>}
            </article>
          ))}
        </div>
      </section>

      <div className="section-flow-divider" aria-hidden="true" />

      <section className="section schedule-section" id="schedule">
        <div className="section-heading schedule-heading">
          <h2 className="schedule-title">{t(content.schedule.title)}</h2>
        </div>
        <div className="schedule-pennants">
          <ScheduleCard title={labels.daySat} items={content.schedule.saturday} t={t} />
          <ScheduleCard title={labels.daySun} items={content.schedule.sunday} t={t} />
        </div>
        <p className="schedule-note">
          {t({
            sv: "Dryck och tilltugg finns på plats. Till lunch siktar vi på Biteline-pizza, och under helgen kör vi ett nördquiz.",
            en: "Drinks and snacks will be available on site. For lunch we plan to order Biteline pizza, and we will run a nerd quiz during the weekend.",
          })}
        </p>
      </section>
      <div className="section-flow-divider schedule-bottom-divider" aria-hidden="true" />

      <section className="registered-coaches-section" id="coaches">
        <h2>{labels.registeredCoaches}</h2>
        <div className="coach-capacity">
          <strong>{regularRegistrations.length}/{maxCoaches}</strong>
          <em>{regularLeft} {labels.spotsLeft}</em>
        </div>
        <div className="registered-coaches-table-wrap">
          <table className="registered-coaches-table">
            <thead>
              <tr>
                <th>{labels.nafNick}</th>
                <th>{labels.nafNumber}</th>
                <th>{labels.email}</th>
                <th>{labels.status}</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration) => (
                <tr key={registration.id}>
                  <td>{registration.nafNick || registration.name}</td>
                  <td>{registration.nafNumber || "-"}</td>
                  <td>{registration.email || "-"}</td>
                  <td>{labels.statusLabels[registration.status]}</td>
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr>
                  <td colSpan={4}>{labels.noCoaches}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <div className="section-flow-divider coaches-bottom-divider" aria-hidden="true" />

      <section className="contact-mail-section" id="contact">
        <h2>{labels.contact}</h2>
        <div className="contact-mail-copy">
          <h3 className="mini-divider-title">{labels.questions}</h3>
          <p>{labels.contactBody}</p>
          <div className="contact-copy-divider" aria-hidden="true" />
          <dl>
            <div>
              <dt>Mail:</dt>
              <dd><a href={`mailto:${contactEmail}`}>{contactEmail}</a></dd>
            </div>
            <div>
              <dt>Telefon:</dt>
              <dd><a href={`tel:${contactPhone}`}>{contactPhone}</a></dd>
            </div>
          </dl>
        </div>
        <form className="contact-mail-form" onSubmit={onContactSubmit}>
          <label className="field-label">
            {labels.name}
            <input name="name" type="text" placeholder={labels.namePlaceholder} required />
          </label>
          <label className="field-label">
            {labels.email}
            <input name="email" type="email" placeholder={labels.emailPlaceholder} required />
          </label>
          <label className="field-label full-span">
            {labels.message}
            <textarea name="message" placeholder={labels.messagePlaceholder} required />
          </label>
          <button className="button primary full-span" type="submit">{labels.send}</button>
        </form>
      </section>

      <section className="partner-links" aria-label={locale === "sv" ? "Viktiga länkar" : "Important links"}>
        <a href="https://tourplay.net/en/blood-bowl/king-of-the-north" target="_blank" rel="noreferrer" aria-label="TourPlay">
          <img src="/assets/images/partners/tourplay_logo_512.png" alt="" />
        </a>
        <a href="https://www.timskoglund.com/" target="_blank" rel="noreferrer" aria-label="Tim Skoglund">
          <img src="/assets/images/partners/ts-icon.svg" alt="" />
        </a>
        <a href="https://www.eurobowl.eu/entrance-options/" target="_blank" rel="noreferrer" aria-label="EuroBowl Poland 2026">
          <img src="/assets/images/partners/EB2026_logo_white.webp" alt="" />
        </a>
        <a href="https://member.thenaf.net/index.php?module=NAF&type=tournaments&func=view&id=11881" target="_blank" rel="noreferrer" aria-label="NAF">
          <img src="/assets/images/partners/NAF_logo.png" alt="" />
        </a>
      </section>

      <footer className="footer">
        <img src={asset.skull} alt="" />
        <span>King of the North</span>
        <a href="/admin">{labels.admin}</a>
      </footer>
    </main>
  );
}

function ScheduleCard({ title, items, t }: { title: string; items: SiteContent["schedule"]["saturday"]; t: (value: { sv: string; en: string }) => string }) {
  return (
    <article className="schedule-card schedule-pennant-card">
      <img className="schedule-pennant-bg" src={asset.pennant} alt="" />
      <div className="schedule-pennant-content">
        <h3>{title}</h3>
        {items.map((item) => (
          <div className="schedule-row" key={`${title}-${item.time}-${t(item.title)}`}>
            <time>{item.time}</time>
            <span>{t(item.title)}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

