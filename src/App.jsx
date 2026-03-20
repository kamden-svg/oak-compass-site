import { useEffect, useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

const INITIAL_FORM = {
  needsSpanish: "no",
  inquiryType: "quote",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  insuranceType: "",
  zipCode: "",
  notes: "",
};

const INQUIRY_OPTIONS = {
  en: [
    { value: "quote", label: "Get a Quote" },
    { value: "referral", label: "Refer Someone" },
  ],
  es: [
    { value: "quote", label: "Obtener cotización" },
    { value: "referral", label: "Referir a alguien" },
  ],
};

const INSURANCE_OPTIONS = {
  en: [
    "Auto Insurance",
    "Home Insurance",
    "Renters Insurance",
    "Landlord Insurance",
    "Life Insurance",
    "Business Insurance",
    "Pet Insurance",
    "Other",
  ],
  es: [
    "Seguro de auto",
    "Seguro de hogar",
    "Seguro para inquilinos",
    "Seguro para propietario",
    "Seguro de vida",
    "Seguro comercial",
    "Seguro para mascotas",
    "Otro",
  ],
};

const COPY = {
  en: {
    badge: "Oak & Compass Insurance",
    headline: "Get a fast insurance quote without the hassle",
    subheadline:
      "Tell us a few basics and we will help you compare options for auto, home, renters, landlord, life, pet, or business insurance.",
    fastResponse: "Fast response",
    simpleProcess: "Simple process",
    localGuidance: "Local guidance",
    referTitle: "Refer someone",
    quoteTitle: "Request a quote",
    intro: "Fill this out and we will reach out with next steps.",
    inquiryLabel: "What would you like to do?",
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone",
    email: "Email",
    spanishPreference: "Do you prefer a Spanish-speaking agent?",
    no: "No",
    yes: "Yes",
    insuranceTypeQuote: "What type of insurance are you looking for?",
    insuranceTypeReferral: "What type of insurance do they need?",
    selectOne: "Select one",
    zipCode: "ZIP code",
    notesQuote: "Anything else we should know?",
    notesReferral: "Anything we should know about the referral?",
    optional: "Optional",
    submitQuote: "Get My Quote",
    submitReferral: "Submit Referral",
    consent: "By submitting, you agree to be contacted about your request.",
    submittedQuote: "Thanks, your quote request has been submitted.",
    submittedReferral: "Thanks, your referral has been submitted.",
    canopyQuote:
      "Want to speed things up? You can securely connect your current insurance information below.",
    canopyReferral:
      "Want to speed things up? You can securely connect the current insurance information below if available.",
    canopyButton: "Connect My Current Insurance",
    simpleTitle: "Simple",
    simpleBody: "No long forms. Just the basics so we can get started.",
    helpfulTitle: "Helpful",
    helpfulBody: "We walk you through your options and help you find the right fit.",
    localTitle: "Local",
    localBody: "Real support from a team that cares about protecting what matters most.",
    canopyTitle: "Connect Your Insurance",
    canopyBody:
      "Securely connect your current policy information so we can review options faster.",
    viewLeads: "Oak & Compass Portal",
    passwordTitle: "Lead Dashboard",
    passwordIntro: "Enter the password to view submitted leads.",
    passwordLabel: "Password",
    passwordButton: "Unlock Leads",
    passwordPlaceholder: "Enter password",
    passwordError: "Incorrect password. Please try again.",
    leadsLoadError: "Could not load leads. Please try again.",
    leadsTitle: "Submitted Leads",
    leadCount: "Total leads",
    noLeads: "No leads have been submitted yet.",
    backToSite: "Back to Site",
    clearLeads: "Clear All Leads",
    exportLeads: "Export CSV",
    searchLeads: "Search leads",
    searchPlaceholder: "Search name, phone, email, ZIP, notes...",
    filterAll: "All inquiries",
    filterQuotes: "Quotes",
    filterReferrals: "Referrals",
    submittedAt: "Submitted",
    inquiryType: "Inquiry Type",
    spanishNeeded: "Spanish",
    notesLabel: "Notes",
    insuranceType: "Insurance Type",
  },
  es: {
    badge: "Oak & Compass Insurance",
    headline: "Obtén una cotización de seguro rápida y sin complicaciones",
    subheadline:
      "Cuéntanos algunos datos básicos y te ayudaremos a comparar opciones de seguro de auto, hogar, inquilinos, propietario, vida, mascotas o negocio.",
    fastResponse: "Respuesta rápida",
    simpleProcess: "Proceso simple",
    localGuidance: "Atención local",
    referTitle: "Referir a alguien",
    quoteTitle: "Solicitar una cotización",
    intro: "Completa este formulario y nos pondremos en contacto contigo con los siguientes pasos.",
    inquiryLabel: "¿Qué te gustaría hacer?",
    firstName: "Nombre",
    lastName: "Apellido",
    phone: "Teléfono",
    email: "Correo electrónico",
    spanishPreference: "¿Prefieres un agente que hable español?",
    no: "No",
    yes: "Sí",
    insuranceTypeQuote: "¿Qué tipo de seguro estás buscando?",
    insuranceTypeReferral: "¿Qué tipo de seguro necesita la persona referida?",
    selectOne: "Selecciona una opción",
    zipCode: "Código postal",
    notesQuote: "¿Hay algo más que debamos saber?",
    notesReferral: "¿Hay algo que debamos saber sobre la referencia?",
    optional: "Opcional",
    submitQuote: "Obtener mi cotización",
    submitReferral: "Enviar referencia",
    consent: "Al enviar este formulario, aceptas que nos comuniquemos contigo sobre tu solicitud.",
    submittedQuote: "Gracias, tu solicitud de cotización ha sido enviada.",
    submittedReferral: "Gracias, tu referencia ha sido enviada.",
    canopyQuote:
      "¿Quieres acelerar el proceso? Puedes conectar de forma segura tu información actual de seguro abajo.",
    canopyReferral:
      "¿Quieres acelerar el proceso? Puedes conectar de forma segura la información actual del seguro si está disponible.",
    canopyButton: "Conectar mi seguro actual",
    simpleTitle: "Simple",
    simpleBody: "Sin formularios largos. Solo lo básico para comenzar.",
    helpfulTitle: "Útil",
    helpfulBody: "Te guiamos por tus opciones y te ayudamos a encontrar la mejor.",
    localTitle: "Local",
    localBody: "Apoyo real de un equipo que se preocupa por proteger lo que más importa.",
    canopyTitle: "Conecta tu seguro",
    canopyBody:
      "Conecta de forma segura la información de tu póliza actual para que podamos revisar opciones más rápido.",
    viewLeads: "Portal Oak & Compass",
    passwordTitle: "Panel de prospectos",
    passwordIntro: "Ingresa la contraseña para ver los prospectos enviados.",
    passwordLabel: "Contraseña",
    passwordButton: "Abrir prospectos",
    passwordPlaceholder: "Ingresa la contraseña",
    passwordError: "Contraseña incorrecta. Inténtalo de nuevo.",
    leadsLoadError: "No se pudieron cargar los prospectos. Inténtalo de nuevo.",
    leadsTitle: "Prospectos enviados",
    leadCount: "Prospectos totales",
    noLeads: "Todavía no se han enviado prospectos.",
    backToSite: "Volver al sitio",
    clearLeads: "Borrar todos los prospectos",
    exportLeads: "Exportar CSV",
    searchLeads: "Buscar prospectos",
    searchPlaceholder: "Buscar nombre, teléfono, correo, código postal, notas...",
    filterAll: "Todas las solicitudes",
    filterQuotes: "Cotizaciones",
    filterReferrals: "Referencias",
    submittedAt: "Enviado",
    inquiryType: "Tipo de solicitud",
    spanishNeeded: "Español",
    notesLabel: "Notas",
    insuranceType: "Tipo de seguro",
  },
};

const PAGE_HOME = "home";
const PAGE_TEAM = "team";
const PAGE_PORTAL = "portal";

const NAV_COPY = {
  en: {
    home: "Home",
    team: "Meet the Team",
    quote: "Get a Quote",
    teamCta: "Get to Know the Team",
    teamBannerTitle: "Put faces, values, and style of service behind the quote form",
    teamBannerBody:
      "Explore the new team page to learn how Oak & Compass supports clients with calm, local, people-first guidance.",
  },
  es: {
    home: "Inicio",
    team: "Conoce al equipo",
    quote: "Obtener cotizacion",
    teamCta: "Conoce al equipo",
    teamBannerTitle: "Conoce a las personas y valores detras de la experiencia de Oak & Compass",
    teamBannerBody:
      "Explora la nueva pagina del equipo para ver como Oak & Compass acompana a cada cliente con cercania y claridad.",
  },
};

const TEAM_PAGE_COPY = {
  en: {
    badge: "The people behind Oak & Compass",
    headline: "Insurance guidance from a team that leads with clarity and care",
    subheadline:
      "When clients reach out, they are not getting pushed through a generic sales script. They are getting a thoughtful team that listens first and helps them make confident coverage decisions.",
    introLabel: "What makes the team different",
    introTitle: "Built for conversations that feel calm, human, and useful",
    introBody:
      "Oak & Compass is designed around practical guidance. The team focuses on reducing confusion, answering questions clearly, and helping families and businesses feel taken care of from the first call forward.",
    values: [
      {
        title: "Clear advice",
        body: "We break down options in plain language so coverage decisions feel manageable.",
      },
      {
        title: "Local support",
        body: "Clients work with people who understand the community and stay available when life changes.",
      },
      {
        title: "Real follow-through",
        body: "From first quote to policy updates, the team stays present and responsive.",
      },
    ],
    membersTitle: "How the team shows up",
    membersBody:
      "Every client conversation is a little different, but these are the roles and strengths that shape the experience.",
    members: [
      {
        name: "Coverage Guide",
        role: "Helps match people with the right protection",
        bio: "Turns complex policy choices into clear next steps, especially when clients are comparing multiple options.",
        highlights: ["Auto and home bundles", "Coverage tradeoffs", "Fast quote follow-up"],
      },
      {
        name: "Client Advocate",
        role: "Keeps service personal after the quote",
        bio: "Makes sure questions get answered quickly and that clients feel supported when they need updates or reassurance.",
        highlights: ["Policy changes", "Renewal check-ins", "Friendly communication"],
      },
      {
        name: "Bilingual Support",
        role: "Creates a more comfortable process for Spanish-speaking households",
        bio: "Helps families communicate clearly, understand their options, and move forward with confidence.",
        highlights: ["Spanish-speaking support", "Family-focused guidance", "Clear explanations"],
      },
    ],
    expectationsTitle: "What to expect when you work with Oak & Compass",
    expectations: [
      "A quick first conversation focused on what matters most to you.",
      "Coverage options explained without pressure or insurance jargon.",
      "A team that stays helpful after the form is submitted, not just before.",
    ],
    primaryCta: "Start a Quote",
    secondaryCta: "Back to Home",
  },
  es: {
    badge: "El equipo de Oak & Compass",
    headline: "Asesoria de seguros con claridad, cercania y apoyo real",
    subheadline:
      "Cuando alguien nos contacta, no recibe un guion generico. Recibe un equipo atento que escucha primero y ayuda a tomar decisiones con confianza.",
    introLabel: "Lo que hace diferente al equipo",
    introTitle: "Conversaciones claras, humanas y utiles",
    introBody:
      "Oak & Compass esta pensado para orientar con calma. El equipo busca reducir confusion, responder preguntas con claridad y acompanar a cada cliente desde el primer contacto.",
    values: [
      {
        title: "Consejo claro",
        body: "Explicamos opciones con lenguaje sencillo para que elegir cobertura sea mas facil.",
      },
      {
        title: "Apoyo local",
        body: "Las personas hablan con un equipo cercano que entiende la comunidad y sigue presente.",
      },
      {
        title: "Seguimiento real",
        body: "Desde la primera cotizacion hasta cambios en la poliza, el equipo responde y acompana.",
      },
    ],
    membersTitle: "Como se presenta el equipo",
    membersBody:
      "Cada conversacion es distinta, pero estas son las fortalezas que dan forma a la experiencia del cliente.",
    members: [
      {
        name: "Guia de cobertura",
        role: "Ayuda a encontrar la proteccion adecuada",
        bio: "Convierte decisiones complejas en pasos claros, sobre todo cuando hay varias opciones para comparar.",
        highlights: ["Paquetes de auto y hogar", "Comparacion de coberturas", "Respuesta rapida"],
      },
      {
        name: "Defensa del cliente",
        role: "Mantiene el servicio cercano despues de la cotizacion",
        bio: "Ayuda a resolver dudas con rapidez y hace que cada persona se sienta acompanada cuando necesita apoyo.",
        highlights: ["Cambios de poliza", "Revision de renovaciones", "Comunicacion amable"],
      },
      {
        name: "Apoyo bilingue",
        role: "Hace el proceso mas comodo para hogares de habla hispana",
        bio: "Ayuda a las familias a entender sus opciones con claridad y avanzar con seguridad.",
        highlights: ["Atencion en espanol", "Orientacion para familias", "Explicaciones claras"],
      },
    ],
    expectationsTitle: "Que puedes esperar al trabajar con Oak & Compass",
    expectations: [
      "Una primera conversacion rapida enfocada en lo que mas te importa.",
      "Opciones de cobertura explicadas sin presion ni lenguaje complicado.",
      "Un equipo que sigue ayudando despues de enviar el formulario.",
    ],
    primaryCta: "Comenzar cotizacion",
    secondaryCta: "Volver al inicio",
  },
};

function getPageFromHash(hash) {
  const value = hash.replace(/^#/, "").trim().toLowerCase();

  if (value === PAGE_TEAM) return PAGE_TEAM;
  if (value === PAGE_PORTAL) return PAGE_PORTAL;
  return PAGE_HOME;
}

function SiteHeader({ language, activePage, onNavigate }) {
  const nav = NAV_COPY[language];

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6">
      <button
        type="button"
        onClick={() => onNavigate(PAGE_HOME)}
        className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm transition hover:-translate-y-0.5"
      >
        <img
          src="/logo.png"
          alt="Oak & Compass Insurance logo"
          className="h-10 w-10 rounded-full object-contain"
        />
        <span>Oak & Compass Insurance</span>
      </button>

      <nav className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/80 p-1 shadow-sm backdrop-blur md:flex">
        <button
          type="button"
          onClick={() => onNavigate(PAGE_HOME)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            activePage === PAGE_HOME
              ? "bg-slate-900 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {nav.home}
        </button>
        <button
          type="button"
          onClick={() => onNavigate(PAGE_TEAM)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            activePage === PAGE_TEAM
              ? "bg-slate-900 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {nav.team}
        </button>
        <button
          type="button"
          onClick={() => onNavigate(PAGE_HOME)}
          className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          {nav.quote}
        </button>
      </nav>
    </header>
  );
}

function TeamPage({ language, onNavigate }) {
  const teamText = TEAM_PAGE_COPY[language];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" lang={language}>
      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.16),_transparent_32%),linear-gradient(180deg,_#f7fbf8_0%,_#ffffff_56%,_#f8fafc_100%)]" />

        <SiteHeader language={language} activePage={PAGE_TEAM} onNavigate={onNavigate} />

        <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-14 md:pt-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {teamText.badge}
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                {teamText.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                {teamText.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate(PAGE_HOME)}
                  className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                >
                  {teamText.primaryCta}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(PAGE_HOME)}
                  className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  {teamText.secondaryCta}
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {teamText.values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.4)]"
                >
                  <h2 className="text-lg font-semibold text-slate-900">{value.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{value.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              {teamText.introLabel}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">{teamText.introTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{teamText.introBody}</p>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              {teamText.expectationsTitle}
            </h2>
            <div className="mt-6 grid gap-4">
              {teamText.expectations.map((item, index) => (
                <div
                  key={item}
                  className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex max-w-3xl flex-col gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            {teamText.membersTitle}
          </h2>
          <p className="text-base leading-7 text-slate-600">{teamText.membersBody}</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {teamText.members.map((member, index) => (
            <article
              key={member.name}
              className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
                  <p className="mt-1 text-sm text-emerald-700">{member.role}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-amber-100 text-sm font-bold text-slate-900">
                  0{index + 1}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">{member.bio}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {member.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <Analytics />
    </div>
  );
}

function formatInquiryType(value, language) {
  const options = INQUIRY_OPTIONS[language] || INQUIRY_OPTIONS.en;
  const match = options.find((option) => option.value === value);
  return match ? match.label : value;
}

function downloadCsv(leads) {
  const headers = [
    "Submitted",
    "Inquiry Type",
    "First Name",
    "Last Name",
    "Phone",
    "Email",
    "Spanish",
    "Insurance Type",
    "ZIP Code",
    "Notes",
  ];

  const escapeCell = (value) => {
    const text = String(value ?? "").replace(/"/g, '""');
    return `"${text}"`;
  };

  const rows = leads.map((lead) => [
    lead.submittedAt,
    lead.inquiryTypeRaw || lead.inquiryType,
    lead.firstName,
    lead.lastName,
    lead.phone,
    lead.email,
    lead.needsSpanishRaw || lead.needsSpanish,
    lead.insuranceType,
    lead.zipCode,
    lead.notes,
  ]);

  const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "oak-compass-leads.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function LeadsDashboard({
  text,
  leads,
  filteredLeads,
  onBack,
  onClear,
  onExport,
  onDeleteLead,
  onSaveLeadNote,
  savingLeadId,
  searchTerm,
  setSearchTerm,
  inquiryFilter,
  setInquiryFilter,
  passwordInput,
  setPasswordInput,
  onUnlock,
  isAuthenticated,
  passwordError,
  isLoading,
  loadError,
}) {
  if (!isAuthenticated) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
          <h1 className="text-3xl font-bold tracking-tight">{text.passwordTitle}</h1>
          <p className="mt-3 text-slate-600">{text.passwordIntro}</p>
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="leadsPassword" className="mb-2 block text-sm font-medium">
                {text.passwordLabel}
              </label>
              <input
                id="leadsPassword"
                type="password"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                placeholder={text.passwordPlaceholder}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
              />
            </div>
            {passwordError ? <p className="text-sm text-red-600">{passwordError}</p> : null}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onUnlock}
                className="rounded-2xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >
                {text.passwordButton}
              </button>
              <button
                type="button"
                onClick={onBack}
                className="rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {text.backToSite}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{text.leadsTitle}</h1>
          <p className="mt-2 text-slate-600">
            {text.leadCount}: <span className="font-semibold text-slate-900">{leads.length}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onExport}
            className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {text.exportLeads}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {text.backToSite}
          </button>
          <button
            type="button"
            onClick={onClear}
            className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            {text.clearLeads}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:grid-cols-[1fr,220px]">
        <div>
          <label htmlFor="leadSearch" className="mb-2 block text-sm font-medium text-slate-700">
            {text.searchLeads}
          </label>
          <input
            id="leadSearch"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={text.searchPlaceholder}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="leadFilter" className="mb-2 block text-sm font-medium text-slate-700">
            {text.inquiryType}
          </label>
          <select
            id="leadFilter"
            value={inquiryFilter}
            onChange={(event) => setInquiryFilter(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
          >
            <option value="all">{text.filterAll}</option>
            <option value="quote">{text.filterQuotes}</option>
            <option value="referral">{text.filterReferrals}</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-8 rounded-3xl bg-white p-8 text-slate-600 shadow-sm ring-1 ring-slate-200">
          Loading...
        </div>
      ) : loadError ? (
        <div className="mt-8 rounded-3xl bg-white p-8 text-red-600 shadow-sm ring-1 ring-slate-200">
          {loadError}
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-white p-8 text-slate-600 shadow-sm ring-1 ring-slate-200">
          {text.noLeads}
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {lead.firstName} {lead.lastName}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {text.submittedAt}: {lead.submittedAt}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                    {lead.insuranceType || "-"}
                  </span>
                  <button
                    type="button"
                    onClick={() => onDeleteLead(lead.id)}
                    className="rounded-2xl border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.inquiryType}</p>
                  <p className="mt-1 text-slate-900">{lead.inquiryType}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.phone}</p>
                  <p className="mt-1 text-slate-900">{lead.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.email}</p>
                  <p className="mt-1 break-words text-slate-900">{lead.email || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.spanishNeeded}</p>
                  <p className="mt-1 text-slate-900">{lead.needsSpanish}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.zipCode}</p>
                  <p className="mt-1 text-slate-900">{lead.zipCode || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.insuranceType}</p>
                  <p className="mt-1 text-slate-900">{lead.insuranceType || "-"}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.notesLabel}</p>
                  <p className="mt-1 whitespace-pre-wrap text-slate-900">{lead.notes || "-"}</p>
                </div>
                <div>
                  <label htmlFor={`portal-note-${lead.id}`} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Portal Notes
                  </label>
                  <textarea
                    id={`portal-note-${lead.id}`}
                    rows={4}
                    defaultValue={lead.portalNotes || ""}
                    className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                    onBlur={(event) => onSaveLeadNote(lead.id, event.target.value)}
                    placeholder="Add private follow-up notes here"
                  />
                  {savingLeadId === lead.id ? (
                    <p className="mt-2 text-xs text-slate-500">Saving...</p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function OakCompassLandingPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [leads, setLeads] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCanopy, setShowCanopy] = useState(false);
  const [activePage, setActivePage] = useState(() => getPageFromHash(window.location.hash));
  const [isLeadsAuthenticated, setIsLeadsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loadError, setLoadError] = useState("");
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inquiryFilter, setInquiryFilter] = useState("all");
  const [savingLeadId, setSavingLeadId] = useState("");
  const language = form.needsSpanish === "yes" ? "es" : "en";
  const text = COPY[language];
  const inquiryOptions = INQUIRY_OPTIONS[language];
  const insuranceOptions = INSURANCE_OPTIONS[language];
  const nav = NAV_COPY[language];

  useEffect(() => {
    document.title =
      activePage === PAGE_TEAM ? "Meet the Team | Oak & Compass Insurance" : "Oak & Compass Insurance";

    const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    favicon.setAttribute("rel", "icon");
    favicon.setAttribute("href", "/logo.png");
    document.head.appendChild(favicon);
  }, [activePage]);

  useEffect(() => {
    const syncPage = () => {
      setActivePage(getPageFromHash(window.location.hash));
    };

    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  useEffect(() => {
    if (!showCanopy) return undefined;

    const existingScript = document.querySelector(
      'script[src="https://cdn.usecanopy.com/v2/embed.js"]'
    );

    if (existingScript) return undefined;

    const script = document.createElement("script");
    script.src = "https://cdn.usecanopy.com/v2/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [showCanopy]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const navigateToPage = (page) => {
    const nextHash = page === PAGE_HOME ? "" : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    } else {
      setActivePage(page);
    }

    if (page !== PAGE_PORTAL) {
      setIsLeadsAuthenticated(false);
      setPasswordInput("");
      setPasswordError("");
      setLoadError("");
      setSearchTerm("");
      setInquiryFilter("all");
    }

    if (page === PAGE_HOME) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isReferral = form.inquiryType === "referral";

  const localizedLeads = useMemo(() => {
    return leads.map((lead) => ({
      ...lead,
      inquiryTypeRaw: lead.inquiryType,
      needsSpanishRaw: lead.needsSpanish,
      inquiryType: formatInquiryType(lead.inquiryType, language),
      needsSpanish: lead.needsSpanish === "yes" ? text.yes : text.no,
    }));
  }, [leads, language, text.no, text.yes]);

  const filteredLeads = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();

    return localizedLeads.filter((lead) => {
      const matchesFilter = inquiryFilter === "all" ? true : lead.inquiryTypeRaw === inquiryFilter;
      if (!matchesFilter) return false;

      if (!needle) return true;

      const haystack = [
        lead.firstName,
        lead.lastName,
        lead.phone,
        lead.email,
        lead.zipCode,
        lead.notes,
        lead.insuranceType,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [localizedLeads, searchTerm, inquiryFilter]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const rawText = await response.text();
      let data = {};

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = { error: rawText || "Something went wrong. Please try again." };
      }

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setIsSubmitted(true);
      setShowCanopy(false);
      setForm(INITIAL_FORM);
    } catch (error) {
      window.alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenLeads = () => {
    navigateToPage(PAGE_PORTAL);
    setPasswordError("");
    setLoadError("");
  };

  const handleUnlockLeads = async () => {
    setPasswordError("");
    setLoadError("");
    setIsLoadingLeads(true);

    try {
      const response = await fetch("/api/leads", {
        method: "GET",
        headers: {
          "x-admin-password": passwordInput,
        },
      });

      const rawText = await response.text();
      let data = {};

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = { error: rawText || text.leadsLoadError };
      }

      if (!response.ok) {
        const message = response.status === 401 ? text.passwordError : data.error || text.leadsLoadError;
        throw new Error(message);
      }

      setLeads(Array.isArray(data.leads) ? data.leads : []);
      setIsLeadsAuthenticated(true);
      setPasswordError("");
    } catch (error) {
      if (error.message === text.passwordError) {
        setPasswordError(error.message);
      } else {
        setLoadError(error.message || text.leadsLoadError);
      }
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleBackToSite = () => {
    navigateToPage(PAGE_HOME);
    setIsLeadsAuthenticated(false);
    setPasswordInput("");
    setPasswordError("");
    setLoadError("");
    setSearchTerm("");
    setInquiryFilter("all");
  };

  const handleClearLeads = async () => {
    try {
      const response = await fetch("/api/leads", {
        method: "DELETE",
        headers: {
          "x-admin-password": passwordInput,
        },
      });

      if (!response.ok) {
        throw new Error(text.leadsLoadError);
      }

      setLeads([]);
    } catch (error) {
      setLoadError(error.message || text.leadsLoadError);
    }
  };

  const handleDeleteLead = async (leadId) => {
    try {
      const response = await fetch(`/api/leads?id=${encodeURIComponent(leadId)}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": passwordInput,
        },
      });

      if (!response.ok) {
        throw new Error(text.leadsLoadError);
      }

      setLeads((current) => current.filter((lead) => lead.id !== leadId));
    } catch (error) {
      setLoadError(error.message || text.leadsLoadError);
    }
  };

  const handleSaveLeadNote = async (leadId, portalNotes) => {
    setSavingLeadId(leadId);
    try {
      const response = await fetch("/api/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": passwordInput,
        },
        body: JSON.stringify({ id: leadId, portalNotes }),
      });

      if (!response.ok) {
        throw new Error(text.leadsLoadError);
      }

      setLeads((current) =>
        current.map((lead) => (lead.id === leadId ? { ...lead, portalNotes } : lead))
      );
    } catch (error) {
      setLoadError(error.message || text.leadsLoadError);
    } finally {
      setSavingLeadId("");
    }
  };

  if (activePage === PAGE_PORTAL) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900" lang={language}>
        <LeadsDashboard
          text={text}
          leads={localizedLeads}
          filteredLeads={filteredLeads}
          onBack={handleBackToSite}
          onClear={handleClearLeads}
          onExport={() => downloadCsv(filteredLeads)}
          onDeleteLead={handleDeleteLead}
          onSaveLeadNote={handleSaveLeadNote}
          savingLeadId={savingLeadId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          inquiryFilter={inquiryFilter}
          setInquiryFilter={setInquiryFilter}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          onUnlock={handleUnlockLeads}
          isAuthenticated={isLeadsAuthenticated}
          passwordError={passwordError}
          isLoading={isLoadingLeads}
          loadError={loadError}
        />
        <Analytics />
      </div>
    );
  }

  if (activePage === PAGE_TEAM) {
    return <TeamPage language={language} onNavigate={navigateToPage} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" lang={language}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />

        <SiteHeader language={language} activePage={PAGE_HOME} onNavigate={navigateToPage} />

        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
                <span>{text.badge}</span>
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                {text.headline}
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                {text.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
                <div className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
                  {text.fastResponse}
                </div>
                <div className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
                  {text.simpleProcess}
                </div>
                <div className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
                  {text.localGuidance}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigateToPage(PAGE_TEAM)}
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  {nav.teamCta}
                </button>
                <button
                  type="button"
                  onClick={() => navigateToPage(PAGE_HOME)}
                  className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                >
                  {nav.quote}
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 md:p-8">
              <h2 className="text-2xl font-semibold">
                {isReferral ? text.referTitle : text.quoteTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{text.intro}</p>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                

                <div>
                  <label htmlFor="inquiryType" className="mb-2 block text-sm font-medium">
                    {text.inquiryLabel}
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={form.inquiryType}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                  >
                    {inquiryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                      {text.firstName}
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder={text.firstName}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                      {text.lastName}
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder={text.lastName}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                      {text.phone}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={text.phone}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      {text.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={text.email}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="needsSpanish" className="mb-2 block text-sm font-medium">
                    {text.spanishPreference}
                  </label>
                  <select
                    id="needsSpanish"
                    name="needsSpanish"
                    value={form.needsSpanish}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                  >
                    <option value="no">{text.no}</option>
                    <option value="yes">{text.yes}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="insuranceType" className="mb-2 block text-sm font-medium">
                    {isReferral ? text.insuranceTypeReferral : text.insuranceTypeQuote}
                  </label>
                  <select
                    id="insuranceType"
                    name="insuranceType"
                    value={form.insuranceType}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                  >
                    <option value="">{text.selectOne}</option>
                    {insuranceOptions.map((option, index) => (
                      <option key={`${language}-${index}`} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="zipCode" className="mb-2 block text-sm font-medium">
                    {text.zipCode}
                  </label>
                  <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    value={form.zipCode}
                    onChange={handleChange}
                    placeholder={text.zipCode}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="mb-2 block text-sm font-medium">
                    {isReferral ? text.notesReferral : text.notesQuote}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={form.notes}
                    onChange={handleChange}
                    placeholder={text.optional}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-emerald-700 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? language === "es"
                      ? "Enviando..."
                      : "Submitting..."
                    : isReferral
                      ? text.submitReferral
                      : text.submitQuote}
                </button>

                <p className="text-center text-xs text-slate-500">{text.consent}</p>
              </form>

              {isSubmitted ? (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                  <p className="font-semibold">
                    {isReferral ? text.submittedReferral : text.submittedQuote}
                  </p>
                  <p className="mt-1 text-emerald-700">
                    {isReferral ? text.canopyReferral : text.canopyQuote}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowCanopy(true)}
                    className="mt-3 inline-flex rounded-2xl bg-emerald-700 px-4 py-2 font-semibold text-white transition hover:opacity-90"
                  >
                    {text.canopyButton}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-lg font-semibold">{text.simpleTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text.simpleBody}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-lg font-semibold">{text.helpfulTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text.helpfulBody}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-lg font-semibold">{text.localTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text.localBody}</p>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] bg-slate-900 px-6 py-8 text-white shadow-xl md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                {nav.team}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                {nav.teamBannerTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {nav.teamBannerBody}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigateToPage(PAGE_TEAM)}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              {nav.teamCta}
            </button>
          </div>
        </div>
      </section>

      {showCanopy ? (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-xl font-semibold">{text.canopyTitle}</h3>
            <p className="mt-2 text-sm text-slate-600">{text.canopyBody}</p>
            <div className="mt-6 flex justify-center">
              <div
                data-canopy-connect-public-alias="waddoups-insurance-agency-llc-kamden-young"
                style={{ width: "400px", height: "600px" }}
                className="canopy-connect-mount"
              ></div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleOpenLeads}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            {text.viewLeads}
          </button>
        </div>
      </section>

      <Analytics />
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function __oakCompassLandingPageChecks() {
  return {
    inquiryOptionCountEnglish: INQUIRY_OPTIONS.en.length,
    inquiryOptionCountSpanish: INQUIRY_OPTIONS.es.length,
    hasReferralOptionEnglish: INQUIRY_OPTIONS.en.some((option) => option.value === "referral"),
    hasReferralOptionSpanish: INQUIRY_OPTIONS.es.some((option) => option.value === "referral"),
    optionCountEnglish: INSURANCE_OPTIONS.en.length,
    optionCountSpanish: INSURANCE_OPTIONS.es.length,
    hasPetInsuranceEnglish: INSURANCE_OPTIONS.en.includes("Pet Insurance"),
    hasPetInsuranceSpanish: INSURANCE_OPTIONS.es.includes("Seguro para mascotas"),
    hasPortalButtonEnglish: COPY.en.viewLeads === "Oak & Compass Portal",
    hasPortalButtonSpanish: COPY.es.viewLeads === "Portal Oak & Compass",
    usesVercelAnalyticsReact: true,
    setsDocumentTitle: true,
    usesLogoAsFavicon: true,
    hasLeadSearch: true,
    hasLeadExport: true,
    hasLeadFilter: true,
    hasSingleLeadDelete: true,
    hasPortalNotes: true,
    postsToApi: true,
    canopyAlias: "waddoups-insurance-agency-llc-kamden-young",
  };
}
