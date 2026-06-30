"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Registration, RegistrationStatus, SiteContent } from "@/lib/types";

const statuses: RegistrationStatus[] = ["unpaid", "paid", "confirmed"];
const emptyCoachForm = {
  nafNick: "",
  nafNumber: "",
  email: "",
  phone: "",
  needsAccommodation: false,
  offersAccommodation: false,
  accommodationSpots: 0,
  isOddman: false,
};

export function AdminPage() {
  const [password, setPassword] = useState("");
  const [contentText, setContentText] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [coachForm, setCoachForm] = useState(emptyCoachForm);
  const [capacityForm, setCapacityForm] = useState({ maxCoaches: 12, oddmanSlots: 2 });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Registration | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    const response = await fetch("/api/admin/data");
    if (!response.ok) return;
    const data = (await response.json()) as { content: SiteContent; registrations: Registration[] };
    setContentText(JSON.stringify(data.content, null, 2));
    setRegistrations(data.registrations);
    setCapacityForm({
      maxCoaches: data.content.tournament.maxCoaches ?? 12,
      oddmanSlots: data.content.tournament.oddmanSlots ?? 2,
    });
    setAuthenticated(true);
  }

  useEffect(() => { load(); }, []);

  async function login(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (response.ok) {
      setMessage("");
      await load();
    } else {
      setMessage("Fel lösenord / Invalid password");
    }
  }

  async function saveContent() {
    try {
      const content = JSON.parse(contentText) as SiteContent;
      const response = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      setMessage(response.ok ? "Innehåll sparat / Content saved" : "Kunde inte spara / Could not save");
    } catch {
      setMessage("JSON är inte giltig / Invalid JSON");
    }
  }

  async function addCoach(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...coachForm,
        name: coachForm.nafNick,
      }),
    });
    if (response.ok) {
      const data = (await response.json()) as { registration: Registration };
      setRegistrations((items) => [data.registration, ...items]);
      setCoachForm(emptyCoachForm);
      setMessage("Coach tillagd / Coach added");
    } else {
      setMessage("Kunde inte lägga till coach / Could not add coach");
    }
  }

  async function saveCapacity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const content = JSON.parse(contentText) as SiteContent;
      content.tournament.maxCoaches = Number(capacityForm.maxCoaches || 0);
      content.tournament.oddmanSlots = Number(capacityForm.oddmanSlots || 0);
      const response = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (response.ok) {
        setContentText(JSON.stringify(content, null, 2));
        setMessage("Platser sparade / Capacity saved");
      } else {
        setMessage("Kunde inte spara platser / Could not save capacity");
      }
    } catch {
      setMessage("JSON är inte giltig / Invalid JSON");
    }
  }

  function startEdit(registration: Registration) {
    setEditingId(registration.id);
    setEditForm({ ...registration, nafNick: registration.nafNick || registration.name, nafNumber: registration.nafNumber || "", isOddman: Boolean(registration.isOddman) });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(null);
  }

  async function saveRegistration(id: string) {
    if (!editForm) return;
    const response = await fetch("/api/admin/data", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, registration: editForm }),
    });
    if (response.ok) {
      const data = (await response.json()) as { registration: Registration };
      setRegistrations((items) => items.map((item) => item.id === id ? data.registration : item));
      cancelEdit();
      setMessage("Coach sparad / Coach saved");
    } else {
      setMessage("Kunde inte spara coach / Could not save coach");
    }
  }

  async function deleteCoach(id: string) {
    const confirmed = window.confirm("Ta bort coachen?");
    if (!confirmed) return;
    const response = await fetch(`/api/admin/data?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (response.ok) {
      setRegistrations((items) => items.filter((item) => item.id !== id));
      setMessage("Coach borttagen / Coach deleted");
    } else {
      setMessage("Kunde inte ta bort coach / Could not delete coach");
    }
  }

  async function updateStatus(id: string, status: RegistrationStatus) {
    const response = await fetch("/api/admin/data", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) {
      setRegistrations((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    }
  }

  if (!authenticated) {
    return (
      <main className="admin-shell login-shell">
        <form className="admin-login" onSubmit={login}>
          <h1>King of the North Admin</h1>
          <p>Logga in med admin-lösenord.</p>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
          <button>Logga in</button>
          {message && <span>{message}</span>}
        </form>
      </main>
    );
  }

  const needsHousing = registrations.filter((item) => item.needsAccommodation);
  const offersHousing = registrations.filter((item) => item.offersAccommodation);
  const regularCoaches = registrations.filter((item) => !item.isOddman);
  const oddmanCoaches = registrations.filter((item) => item.isOddman);

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <p>Backoffice</p>
          <h1>King of the North Admin</h1>
        </div>
        <a href="/">Till publika sidan</a>
      </header>

      <section className="admin-stats">
        <article><strong>{regularCoaches.length}/{capacityForm.maxCoaches}</strong><span>Ordinarie platser</span></article>
        <article><strong>{oddmanCoaches.length}/{capacityForm.oddmanSlots}</strong><span>Oddman</span></article>
        <article><strong>{needsHousing.length}</strong><span>Behöver boende</span></article>
        <article><strong>{offersHousing.reduce((sum, item) => sum + item.accommodationSpots, 0)}</strong><span>Erbjudna platser</span></article>
      </section>

      {message && <div className="admin-message">{message}</div>}

      <section className="admin-panel coach-admin-panel">
        <div>
          <h2>Platser</h2>
          <p>Ordinarie platser visas publikt som registrerade/max. Oddman räknas utöver ordinarie max.</p>
        </div>
        <form className="capacity-admin-form" onSubmit={saveCapacity}>
          <label>
            Max ordinarie coacher
            <input type="number" min="0" value={capacityForm.maxCoaches} onChange={(event) => setCapacityForm((form) => ({ ...form, maxCoaches: Number(event.target.value) }))} />
          </label>
          <label>
            Extra oddman-platser
            <input type="number" min="0" value={capacityForm.oddmanSlots} onChange={(event) => setCapacityForm((form) => ({ ...form, oddmanSlots: Number(event.target.value) }))} />
          </label>
          <button type="submit">Spara platser</button>
        </form>
      </section>

      <section className="admin-panel coach-admin-panel">
        <div>
          <h2>Lägg till registrerad coach</h2>
          <p>Fyll i coachens NAF-uppgifter och boendestatus. Listan visas på publika sidan.</p>
        </div>
        <form className="coach-admin-form" onSubmit={addCoach}>
          <label>
            NAF nick
            <input value={coachForm.nafNick} onChange={(event) => setCoachForm((form) => ({ ...form, nafNick: event.target.value }))} required />
          </label>
          <label>
            NAF nr
            <input value={coachForm.nafNumber} onChange={(event) => setCoachForm((form) => ({ ...form, nafNumber: event.target.value }))} required />
          </label>
          <label>
            E-post
            <input type="email" value={coachForm.email} onChange={(event) => setCoachForm((form) => ({ ...form, email: event.target.value }))} />
          </label>
          <label>
            Telefon
            <input value={coachForm.phone} onChange={(event) => setCoachForm((form) => ({ ...form, phone: event.target.value }))} />
          </label>
          <fieldset>
            <legend>Sovplats</legend>
            <label>
              <input type="checkbox" checked={coachForm.needsAccommodation} onChange={(event) => setCoachForm((form) => ({ ...form, needsAccommodation: event.target.checked }))} />
              Behöver sovplats
            </label>
            <label>
              <input type="checkbox" checked={coachForm.offersAccommodation} onChange={(event) => setCoachForm((form) => ({ ...form, offersAccommodation: event.target.checked, accommodationSpots: event.target.checked ? form.accommodationSpots : 0 }))} />
              Erbjuder sovplats
            </label>
          </fieldset>
          <label className="checkbox-admin-label">
            <input type="checkbox" checked={coachForm.isOddman} onChange={(event) => setCoachForm((form) => ({ ...form, isOddman: event.target.checked }))} />
            Oddman
          </label>
          <label>
            Antal platser
            <input type="number" min="0" value={coachForm.accommodationSpots} disabled={!coachForm.offersAccommodation} onChange={(event) => setCoachForm((form) => ({ ...form, accommodationSpots: Number(event.target.value) }))} />
          </label>
          <button type="submit">Lägg till coach</button>
        </form>
      </section>

      <section className="admin-panel">
        <h2>Registreringar</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>NAF nick</th><th>NAF nr</th><th>E-post</th><th>Telefon</th><th>Boende</th><th>Erbjuder</th><th>Oddman</th><th>Status</th><th>Åtgärd</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration) => {
                const isEditing = editingId === registration.id && editForm;
                return (
                  <tr key={registration.id}>
                    <td>{isEditing ? <input value={editForm.nafNick} onChange={(event) => setEditForm({ ...editForm, nafNick: event.target.value, name: event.target.value })} /> : (registration.nafNick || registration.name)}</td>
                    <td>{isEditing ? <input value={editForm.nafNumber} onChange={(event) => setEditForm({ ...editForm, nafNumber: event.target.value })} /> : (registration.nafNumber || "-")}</td>
                    <td>{isEditing ? <input type="email" value={editForm.email} onChange={(event) => setEditForm({ ...editForm, email: event.target.value })} /> : registration.email}</td>
                    <td>{isEditing ? <input value={editForm.phone} onChange={(event) => setEditForm({ ...editForm, phone: event.target.value })} /> : registration.phone}</td>
                    <td>{isEditing ? <input type="checkbox" checked={editForm.needsAccommodation} onChange={(event) => setEditForm({ ...editForm, needsAccommodation: event.target.checked })} /> : (registration.needsAccommodation ? "Ja" : "Nej")}</td>
                    <td>{isEditing ? (
                      <span className="admin-inline-fields">
                        <input type="checkbox" checked={editForm.offersAccommodation} onChange={(event) => setEditForm({ ...editForm, offersAccommodation: event.target.checked, accommodationSpots: event.target.checked ? editForm.accommodationSpots : 0 })} />
                        <input type="number" min="0" value={editForm.accommodationSpots} disabled={!editForm.offersAccommodation} onChange={(event) => setEditForm({ ...editForm, accommodationSpots: Number(event.target.value) })} />
                      </span>
                    ) : (registration.offersAccommodation ? `${registration.accommodationSpots} platser` : "Nej")}</td>
                    <td>{isEditing ? <input type="checkbox" checked={editForm.isOddman} onChange={(event) => setEditForm({ ...editForm, isOddman: event.target.checked })} /> : (registration.isOddman ? "Ja" : "Nej")}</td>
                    <td>
                      <select value={isEditing ? editForm.status : registration.status} onChange={(event) => isEditing ? setEditForm({ ...editForm, status: event.target.value as RegistrationStatus }) : updateStatus(registration.id, event.target.value as RegistrationStatus)}>
                        {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                      </select>
                    </td>
                    <td>
                      <div className="admin-actions">
                        {isEditing ? (
                          <>
                            <button type="button" onClick={() => saveRegistration(registration.id)}>Spara</button>
                            <button type="button" onClick={cancelEdit}>Avbryt</button>
                          </>
                        ) : (
                          <>
                            <button type="button" onClick={() => startEdit(registration)}>Redigera</button>
                            <button type="button" className="danger" onClick={() => deleteCoach(registration.id)}>Ta bort</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {registrations.length === 0 && <tr><td colSpan={9}>Inga registreringar ännu.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-panel editor-panel">
        <div>
          <h2>Publikt innehåll</h2>
          <p>Redigera svensk och engelsk text direkt i JSON. Spara och ladda om publika sidan.</p>
        </div>
        <textarea value={contentText} onChange={(event) => setContentText(event.target.value)} spellCheck={false} />
        <button onClick={saveContent}>Spara innehåll</button>
      </section>
    </main>
  );
}
