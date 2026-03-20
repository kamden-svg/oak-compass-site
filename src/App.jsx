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
  desiredRole: "",
  yearsExperience: "",
  availability: "",
  resumeLink: "",
  notes: "",
};

const INQUIRY_OPTIONS = {
  en: [
    { value: "quote", label: "Get a Quote" },
    { value: "referral", label: "Refer Someone" },
    { value: "job", label: "Apply for a Job" },
  ],
  es: [
    { value: "quote", label: "Obtener cotización" },
    { value: "referral", label: "Referir a alguien" },
    { value: "job", label: "Solicitar trabajo" },
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

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61577039841358";

const INSURANCE_FACTS = {
  en: [
    "Bundling home and auto policies can sometimes lower total premium costs.",
    "A deductible is the amount you pay out of pocket before covered insurance benefits begin.",
    "Reviewing coverage after a move, marriage, or new vehicle helps keep protection up to date.",
  ],
  es: [
    "Combinar polizas de auto y hogar a veces puede reducir el costo total de la prima.",
    "El deducible es la cantidad que pagas antes de que comiencen los beneficios cubiertos.",
    "Revisar la cobertura despues de una mudanza o un auto nuevo ayuda a mantenerla al dia.",
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
    jobTitle: "Apply for a job opportunity",
    intro: "Fill this out and we will reach out with next steps.",
    jobIntro:
      "Tell us a little about your background and the kind of role you are interested in.",
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
    desiredRole: "Role you are interested in",
    yearsExperience: "Years of experience",
    availability: "When can you start?",
    resumeLink: "Resume link",
    resumeLinkPlaceholder: "LinkedIn, Google Drive, or resume URL",
    selectOne: "Select one",
    zipCode: "ZIP code",
    notesQuote: "Anything else we should know?",
    notesReferral: "Anything we should know about the referral?",
    notesJob: "Tell us about yourself and your experience",
    optional: "Optional",
    submitQuote: "Get My Quote",
    submitReferral: "Submit Referral",
    submitJob: "Submit Application",
    consent: "By submitting, you agree to be contacted about your request.",
    submittedQuote: "Thanks, your quote request has been submitted.",
    submittedReferral: "Thanks, your referral has been submitted.",
    submittedJob: "Thanks, your job application has been submitted.",
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
    careersEyebrow: "Job Opportunity",
    careersTitle: "Want to work with Oak & Compass?",
    careersBody:
      "We are opening the door for people who care about helping clients feel informed, comfortable, and supported.",
    careersPoints: ["People-first team", "Local relationships", "Growth-minded support"],
    applyNow: "Apply Now",
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
    filterJobs: "Job applications",
    submittedAt: "Submitted",
    inquiryType: "Inquiry Type",
    spanishNeeded: "Spanish",
    notesLabel: "Notes",
    insuranceType: "Insurance Type",
    desiredRoleLabel: "Desired Role",
    yearsExperienceLabel: "Experience",
    availabilityLabel: "Availability",
    resumeLinkLabel: "Resume Link",
    portalNotesLabel: "Portal Notes",
    portalNotesPlaceholder: "Add private follow-up notes here",
    deleteLead: "Delete",
    loading: "Loading...",
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
    jobTitle: "Solicitar una oportunidad de trabajo",
    quoteTitle: "Solicitar una cotización",
    intro: "Completa este formulario y nos pondremos en contacto contigo con los siguientes pasos.",
    jobIntro:
      "Cuentanos un poco sobre tu experiencia y el tipo de puesto que te interesa.",
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
    desiredRole: "Puesto que te interesa",
    yearsExperience: "Anos de experiencia",
    availability: "Cuando puedes comenzar",
    resumeLink: "Enlace a tu resume",
    resumeLinkPlaceholder: "LinkedIn, Google Drive o URL del resume",
    notesJob: "Cuentanos sobre ti y tu experiencia",
    submitReferral: "Enviar referencia",
    submitJob: "Enviar solicitud",
    consent: "Al enviar este formulario, aceptas que nos comuniquemos contigo sobre tu solicitud.",
    submittedJob: "Gracias, tu solicitud de trabajo ha sido enviada.",
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
    careersEyebrow: "Oportunidad laboral",
    careersTitle: "Quieres trabajar con Oak & Compass?",
    careersBody:
      "Estamos abriendo la puerta a personas que quieren ayudar a los clientes con claridad, calma y atencion humana.",
    careersPoints: ["Equipo humano", "Relaciones locales", "Espacio para crecer"],
    applyNow: "Aplica ahora",
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
    filterJobs: "Solicitudes de trabajo",
    submittedAt: "Enviado",
    inquiryType: "Tipo de solicitud",
    spanishNeeded: "Español",
    notesLabel: "Notas",
    insuranceType: "Tipo de seguro",
    desiredRoleLabel: "Puesto",
    yearsExperienceLabel: "Experiencia",
    availabilityLabel: "Disponibilidad",
    resumeLinkLabel: "Enlace del resume",
    portalNotesLabel: "Notas internas",
    portalNotesPlaceholder: "Agrega notas privadas de seguimiento",
    deleteLead: "Eliminar",
    loading: "Cargando...",
  },
};

const PAGE_HOME = "home";
const PAGE_TEAM = "team";
const PAGE_JOBS = "jobs";
const PAGE_CANOPY = "canopy";
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
    headline: "The kind of team you can actually feel comfortable talking to",
    subheadline:
      "Shopping for insurance can feel overwhelming fast. Oak & Compass is built to make that experience feel simpler, more personal, and a lot less intimidating.",
    introLabel: "Why people connect with the team",
    introTitle: "Helpful, down-to-earth guidance from real people",
    introBody:
      "The goal is not to rush people through a form or push a one-size-fits-all policy. It is to listen, explain things clearly, and help each person feel like they have someone in their corner.",
    values: [
      {
        title: "Easy to talk to",
        body: "Questions are welcome, and answers are given in plain language without making people feel behind.",
      },
      {
        title: "Local and personal",
        body: "The experience is meant to feel like talking with someone who knows the area and genuinely wants to help.",
      },
      {
        title: "Still there after the quote",
        body: "Support does not disappear once a form is submitted. The relationship keeps going when life changes.",
      },
    ],
    membersTitle: "What working with the team feels like",
    membersBody:
      "Every conversation is different, but these are the kinds of people and strengths clients can expect to run into along the way.",
    members: [
      {
        name: "The calm explainer",
        role: "Breaks things down without the insurance-speak",
        bio: "When coverage choices start sounding confusing, this is the kind of support that slows it down and makes it easier to understand what actually matters.",
        highlights: ["Clear answers", "No pressure", "Simple explanations"],
      },
      {
        name: "The follow-through person",
        role: "Keeps things moving and keeps people in the loop",
        bio: "Instead of wondering what happens next, clients get thoughtful follow-up, quick replies, and a smoother path from first contact to final decision.",
        highlights: ["Quick replies", "Friendly check-ins", "Reliable follow-up"],
      },
      {
        name: "The family-first helper",
        role: "Makes the process feel more comfortable and more human",
        bio: "Whether someone is asking for themselves, a spouse, or a parent, the focus stays on making sure people feel heard and supported.",
        highlights: ["Family-focused", "Spanish-speaking support", "Comfortable guidance"],
      },
    ],
    expectationsTitle: "What people can expect",
    expectations: [
      "A first conversation that feels straightforward instead of stressful.",
      "Coverage options explained clearly, with room to ask honest questions.",
      "A team that stays helpful before, during, and after the quote process.",
    ],
    primaryCta: "Start a Quote",
    secondaryCta: "Back to Home",
  },
  es: {
    badge: "El equipo de Oak & Compass",
    headline: "Un equipo con el que de verdad se siente comodo hablar",
    subheadline:
      "Buscar seguro puede sentirse abrumador muy rapido. Oak & Compass busca que ese proceso se sienta mas claro, personal y mucho menos pesado.",
    introLabel: "Por que la gente conecta con el equipo",
    introTitle: "Orientacion cercana, clara y humana",
    introBody:
      "La idea no es apresurar a nadie ni empujar una poliza generica. La idea es escuchar, explicar con calma y hacer que cada persona sienta que tiene apoyo real.",
    values: [
      {
        title: "Facil de hablar",
        body: "Las preguntas son bienvenidas y las respuestas se dan con palabras claras y sencillas.",
      },
      {
        title: "Cercano y local",
        body: "La experiencia busca sentirse como hablar con alguien que conoce la comunidad y quiere ayudar de verdad.",
      },
      {
        title: "Apoyo continuo",
        body: "La ayuda no termina cuando se envia el formulario. El acompanamiento sigue cuando la vida cambia.",
      },
    ],
    membersTitle: "Como se siente trabajar con el equipo",
    membersBody:
      "Cada conversacion es distinta, pero estas son las cualidades humanas que marcan la experiencia para los clientes.",
    members: [
      {
        name: "La persona que explica con calma",
        role: "Aclara opciones sin complicar las cosas",
        bio: "Cuando la cobertura empieza a sentirse confusa, este tipo de apoyo ayuda a bajar el ritmo y entender lo que de verdad importa.",
        highlights: ["Respuestas claras", "Sin presion", "Explicaciones simples"],
      },
      {
        name: "La persona que si da seguimiento",
        role: "Mantiene el proceso claro y en movimiento",
        bio: "En lugar de dejar dudas sobre el siguiente paso, los clientes reciben seguimiento atento, respuestas rapidas y una experiencia mas ordenada.",
        highlights: ["Respuestas rapidas", "Seguimiento amable", "Buena comunicacion"],
      },
      {
        name: "La persona que piensa en la familia",
        role: "Hace que el proceso se sienta mas comodo y humano",
        bio: "Ya sea para uno mismo, la pareja o un familiar, el enfoque sigue siendo escuchar bien y hacer que la persona se sienta acompanada.",
        highlights: ["Enfoque familiar", "Atencion en espanol", "Orientacion cercana"],
      },
    ],
    expectationsTitle: "Lo que la gente puede esperar",
    expectations: [
      "Una primera conversacion mas simple y menos estresante.",
      "Opciones explicadas con claridad y espacio para hacer preguntas reales.",
      "Un equipo que sigue ayudando antes, durante y despues de la cotizacion.",
    ],
    primaryCta: "Comenzar cotizacion",
    secondaryCta: "Volver al inicio",
  },
};

function getPageFromHash(hash) {
  const value = hash.replace(/^#/, "").trim().toLowerCase();

  if (value === PAGE_TEAM) return PAGE_TEAM;
  if (value === PAGE_JOBS) return PAGE_JOBS;
  if (value === PAGE_CANOPY) return PAGE_CANOPY;
  if (value === PAGE_PORTAL) return PAGE_PORTAL;
  return PAGE_HOME;
}

function SiteHeader({ language, activePage, onNavigate }) {
  const nav = NAV_COPY[language];
  const facts = INSURANCE_FACTS[language] || INSURANCE_FACTS.en;
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  const openBrandModal = () => {
    setFactIndex(Math.floor(Math.random() * facts.length));
    setIsBrandModalOpen(true);
  };

  return (
    <>
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6">
        <button
          type="button"
          onClick={openBrandModal}
          className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white/92 p-2 text-sm font-medium text-emerald-800 shadow-sm transition hover:-translate-y-0.5"
          aria-label="Open Oak & Compass brand details"
        >
          <img
            src="/logo.png"
            alt="Oak & Compass Insurance logo"
            className="h-24 w-24 rounded-full object-contain md:h-28 md:w-28"
          />
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
        </nav>

        <nav className="fixed inset-x-4 bottom-4 z-20 flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/95 p-2 shadow-lg backdrop-blur md:hidden">
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
        </nav>
      </header>

      {isBrandModalOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/55 px-4 py-6">
          <div className="relative w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200 md:p-8">
            <button
              type="button"
              onClick={() => setIsBrandModalOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Close
            </button>

            <div className="flex flex-col items-center text-center">
              <img
                src="/logo.png"
                alt="Oak & Compass Insurance logo"
                className="h-28 w-28 rounded-full object-contain"
              />
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Oak & Compass Insurance</h2>
              <p className="mt-2 max-w-md text-sm leading-7 text-slate-600">
                Follow along on Facebook and explore a quick insurance fact while you are here.
              </p>
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-emerald-50 p-5 ring-1 ring-emerald-100">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Insurance Fact
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{facts[factIndex]}</p>
              <button
                type="button"
                onClick={() => setFactIndex((current) => (current + 1) % facts.length)}
                className="mt-4 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                Show Another Fact
              </button>
            </div>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Visit Facebook
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ForestLandscapeBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden text-emerald-950/[0.09]"
    >
      <svg
        viewBox="0 0 1440 900"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path strokeWidth="3" d="M0 638C92 607 183 600 273 614C361 627 431 663 516 666C615 669 700 627 793 620C907 612 1000 653 1097 664C1204 676 1314 644 1440 601" />
          <path strokeWidth="2.5" d="M0 692C95 668 196 659 298 670C381 679 466 713 556 716C663 720 747 684 847 677C963 670 1058 708 1160 718C1255 728 1349 711 1440 684" />
          <path strokeWidth="2" d="M0 754C140 733 249 730 354 742C452 753 525 784 619 790C732 797 815 769 912 761C1012 753 1099 775 1188 790C1286 807 1364 803 1440 786" />

          <path strokeWidth="3.5" d="M170 744C170 657 172 587 177 526" />
          <path strokeWidth="3.5" d="M175 542C151 521 131 491 122 452" />
          <path strokeWidth="3.5" d="M177 531C204 511 228 482 242 444" />
          <path strokeWidth="3.5" d="M105 449C90 435 83 415 85 393C88 370 103 351 124 343C128 321 143 302 163 295C186 287 210 293 225 311C239 294 260 286 282 289C312 293 336 315 341 344C363 350 381 369 385 394C390 426 371 455 342 468" />

          <path strokeWidth="3" d="M395 748C396 668 400 602 408 542" />
          <path strokeWidth="3" d="M409 555C385 530 367 501 359 467" />
          <path strokeWidth="3" d="M411 546C440 524 463 496 477 462" />
          <path strokeWidth="3" d="M345 466C331 454 324 437 325 416C328 392 342 373 362 365C366 342 380 324 400 317C422 310 445 317 459 333C472 317 492 309 513 312C541 317 563 337 567 364C589 369 606 387 610 410C615 440 598 467 572 479" />

          <path strokeWidth="2.8" d="M697 751C696 688 699 634 707 587" />
          <path strokeWidth="2.8" d="M708 599C688 580 672 556 665 526" />
          <path strokeWidth="2.8" d="M710 593C734 574 755 550 768 520" />
          <path strokeWidth="2.8" d="M649 525C635 512 628 495 631 474C634 452 648 434 667 426C671 404 684 387 703 380C724 372 746 378 760 393C773 377 791 370 812 372C838 376 860 395 865 420C886 425 901 442 905 464C909 492 893 517 869 530" />

          <path strokeWidth="2.5" d="M970 755C970 703 973 662 978 623" />
          <path strokeWidth="2.5" d="M979 633C963 617 949 596 943 571" />
          <path strokeWidth="2.5" d="M980 628C999 613 1016 592 1027 566" />
          <path strokeWidth="2.5" d="M925 570C912 559 906 544 908 525C911 505 923 489 940 481C943 462 954 447 971 441C989 435 1009 440 1021 454C1032 440 1048 434 1066 436C1090 440 1108 456 1112 478C1131 483 1144 497 1148 516C1152 541 1138 561 1118 573" />

          <path strokeWidth="2.2" d="M1214 756C1214 714 1217 680 1221 648" />
          <path strokeWidth="2.2" d="M1221 657C1208 644 1198 628 1193 608" />
          <path strokeWidth="2.2" d="M1222 653C1237 641 1251 624 1260 603" />
          <path strokeWidth="2.2" d="M1176 607C1165 598 1160 585 1162 568C1164 551 1174 537 1188 530C1191 514 1201 501 1215 495C1231 489 1248 494 1258 506C1267 494 1281 489 1296 491C1317 494 1333 509 1337 527C1353 531 1366 543 1369 560C1373 581 1362 598 1344 609" />

          <path strokeWidth="2" d="M0 812C111 795 223 792 337 801C447 810 553 829 660 831C770 833 873 817 983 817C1110 816 1245 837 1440 828" />
        </g>
      </svg>
    </div>
  );
}


function TeamPage({ language, onNavigate }) {
  const teamText = TEAM_PAGE_COPY[language];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" lang={language}>
      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.16),_transparent_32%),linear-gradient(180deg,_#f7fbf8_0%,_#ffffff_56%,_#f8fafc_100%)]" />
        <ForestLandscapeBackground />

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

function JobApplicationPage({
  language,
  text,
  form,
  onChange,
  onSubmit,
  isSubmitting,
  isSubmitted,
  submittedIsJobApplication,
  onNavigate,
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" lang={language}>
      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.16),_transparent_32%),linear-gradient(180deg,_#f7fbf8_0%,_#ffffff_56%,_#f8fafc_100%)]" />
        <ForestLandscapeBackground />

        <SiteHeader language={language} activePage={PAGE_JOBS} onNavigate={onNavigate} />

        <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-14 md:pt-20">
          <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {text.careersEyebrow}
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                {text.careersTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                {text.careersBody}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
                {text.careersPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200"
                  >
                    {point}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-[2rem] bg-white/90 p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">{text.jobTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text.jobIntro}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 md:p-8">
              <h2 className="text-2xl font-semibold">{text.jobTitle}</h2>
              <p className="mt-2 text-sm text-slate-500">{text.jobIntro}</p>

              <form className="mt-6 space-y-4" onSubmit={onSubmit}>
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
                      onChange={onChange}
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
                      onChange={onChange}
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
                      onChange={onChange}
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
                      onChange={onChange}
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
                    onChange={onChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                  >
                    <option value="no">{text.no}</option>
                    <option value="yes">{text.yes}</option>
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="desiredRole" className="mb-2 block text-sm font-medium">
                      {text.desiredRole}
                    </label>
                    <input
                      id="desiredRole"
                      name="desiredRole"
                      type="text"
                      value={form.desiredRole}
                      onChange={onChange}
                      placeholder={text.desiredRole}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="yearsExperience" className="mb-2 block text-sm font-medium">
                      {text.yearsExperience}
                    </label>
                    <input
                      id="yearsExperience"
                      name="yearsExperience"
                      type="text"
                      value={form.yearsExperience}
                      onChange={onChange}
                      placeholder={text.yearsExperience}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="zipCode" className="mb-2 block text-sm font-medium">
                      {text.zipCode}
                    </label>
                    <input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      value={form.zipCode}
                      onChange={onChange}
                      placeholder={text.zipCode}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="availability" className="mb-2 block text-sm font-medium">
                      {text.availability}
                    </label>
                    <input
                      id="availability"
                      name="availability"
                      type="text"
                      value={form.availability}
                      onChange={onChange}
                      placeholder={text.availability}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="resumeLink" className="mb-2 block text-sm font-medium">
                    {text.resumeLink}
                  </label>
                  <input
                    id="resumeLink"
                    name="resumeLink"
                    type="url"
                    value={form.resumeLink}
                    onChange={onChange}
                    placeholder={text.resumeLinkPlaceholder}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="mb-2 block text-sm font-medium">
                    {text.notesJob}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={5}
                    value={form.notes}
                    onChange={onChange}
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
                    : text.submitJob}
                </button>

                <p className="text-center text-xs text-slate-500">{text.consent}</p>
              </form>

              {isSubmitted && submittedIsJobApplication ? (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                  <p className="font-semibold">{text.submittedJob}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <Analytics />
    </div>
  );
}

function InsuranceConnectPage({ language, onNavigate }) {
  const text = COPY[language];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" lang={language}>
      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.16),_transparent_32%),linear-gradient(180deg,_#f7fbf8_0%,_#ffffff_56%,_#f8fafc_100%)]" />
        <ForestLandscapeBackground />

        <SiteHeader language={language} activePage={PAGE_CANOPY} onNavigate={onNavigate} />

        <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-14 md:pt-20">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.4)] md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  Oak & Compass Insurance
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {text.canopyTitle}
                </h1>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text.canopyBody}</p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate(PAGE_HOME)}
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                {text.backToSite}
              </button>
            </div>

            <div className="mt-8 flex justify-center">
              <div
                data-canopy-connect-public-alias="waddoups-insurance-agency-llc-kamden-young"
                style={{ width: "400px", height: "600px" }}
                className="canopy-connect-mount max-w-full"
              ></div>
            </div>
          </div>
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
    "Desired Role",
    "Years of Experience",
    "Availability",
    "Resume Link",
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
    lead.desiredRole,
    lead.yearsExperience,
    lead.availability,
    lead.resumeLink,
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
            <option value="job">{text.filterJobs}</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-8 rounded-3xl bg-white p-8 text-slate-600 shadow-sm ring-1 ring-slate-200">
          {text.loading}
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
                    {lead.insuranceType || lead.desiredRole || "-"}
                  </span>
                  <button
                    type="button"
                    onClick={() => onDeleteLead(lead.id)}
                    className="rounded-2xl border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    {text.deleteLead}
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
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.desiredRoleLabel}</p>
                  <p className="mt-1 text-slate-900">{lead.desiredRole || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.yearsExperienceLabel}</p>
                  <p className="mt-1 text-slate-900">{lead.yearsExperience || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.availabilityLabel}</p>
                  <p className="mt-1 text-slate-900">{lead.availability || "-"}</p>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.resumeLinkLabel}</p>
                  <p className="mt-1 break-words text-slate-900">{lead.resumeLink || "-"}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.notesLabel}</p>
                  <p className="mt-1 whitespace-pre-wrap text-slate-900">{lead.notes || "-"}</p>
                </div>
                <div>
                  <label htmlFor={`portal-note-${lead.id}`} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {text.portalNotesLabel}
                  </label>
                  <textarea
                    id={`portal-note-${lead.id}`}
                    rows={4}
                    defaultValue={lead.portalNotes || ""}
                    className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                    onBlur={(event) => onSaveLeadNote(lead.id, event.target.value)}
                    placeholder={text.portalNotesPlaceholder}
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
  const [submittedInquiryType, setSubmittedInquiryType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const inquiryOptions = INQUIRY_OPTIONS[language].filter((option) => option.value !== "job");
  const insuranceOptions = INSURANCE_OPTIONS[language];
  const nav = NAV_COPY[language];

  useEffect(() => {
    document.title =
      activePage === PAGE_TEAM
        ? "Meet the Team | Oak & Compass Insurance"
        : activePage === PAGE_JOBS
          ? "Apply Now | Oak & Compass Insurance"
        : activePage === PAGE_CANOPY
          ? "Connect Your Insurance | Oak & Compass Insurance"
          : "Oak & Compass Insurance";
  }, [activePage]);

  useEffect(() => {
    const syncPage = () => {
      setActivePage(getPageFromHash(window.location.hash));
    };

    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  useEffect(() => {
    if (activePage !== PAGE_CANOPY) return undefined;

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
  }, [activePage]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (isSubmitted) {
      setIsSubmitted(false);
      setSubmittedInquiryType("");
    }
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

    if (page === PAGE_HOME && form.inquiryType === "job") {
      setForm((current) => ({ ...current, inquiryType: "quote" }));
    }

    if (page === PAGE_JOBS && form.inquiryType !== "job") {
      setForm((current) => ({ ...current, inquiryType: "job" }));
    }

    if (page === PAGE_HOME || page === PAGE_TEAM || page === PAGE_JOBS || page === PAGE_CANOPY) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isReferral = form.inquiryType === "referral";
  const submittedIsReferral = submittedInquiryType === "referral";
  const submittedIsJobApplication = submittedInquiryType === "job";

  const openJobApplication = () => {
    navigateToPage(PAGE_JOBS);
    setIsSubmitted(false);
    setSubmittedInquiryType("");
  };

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
        lead.desiredRole,
        lead.yearsExperience,
        lead.availability,
        lead.resumeLink,
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

      setSubmittedInquiryType(form.inquiryType);
      setIsSubmitted(true);
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

  if (activePage === PAGE_JOBS) {
    return (
      <JobApplicationPage
        language={language}
        text={text}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        submittedIsJobApplication={submittedIsJobApplication}
        onNavigate={navigateToPage}
      />
    );
  }

  if (activePage === PAGE_CANOPY) {
    return <InsuranceConnectPage language={language} onNavigate={navigateToPage} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" lang={language}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
        <ForestLandscapeBackground />

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
                    {submittedIsReferral
                        ? text.submittedReferral
                        : text.submittedQuote}
                  </p>
                  <p className="mt-1 text-emerald-700">
                    {submittedIsReferral ? text.canopyReferral : text.canopyQuote}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigateToPage(PAGE_CANOPY)}
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

        <div className="mt-8 rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-6 py-8 shadow-sm ring-1 ring-white/70 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {text.careersEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                {text.careersTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {text.careersBody}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                {text.careersPoints.map((point) => (
                  <span key={point} className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={openJobApplication}
              className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {text.applyNow}
            </button>
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
    hasJobOptionEnglish: INQUIRY_OPTIONS.en.some((option) => option.value === "job"),
    hasJobOptionSpanish: INQUIRY_OPTIONS.es.some((option) => option.value === "job"),
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
    hasJobApplicationFlow: true,
    hasSingleLeadDelete: true,
    hasPortalNotes: true,
    postsToApi: true,
    canopyAlias: "waddoups-insurance-agency-llc-kamden-young",
  };
}
