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
  collectibleType: "",
  collectionValue: "",
  estimatedItems: "",
  storageMethod: "",
  collectibleCondition: "",
  notes: "",
};

const INQUIRY_OPTIONS = {
  en: [
    { value: "quote", label: "Get a Quote" },
    { value: "referral", label: "Refer Someone" },
    { value: "job", label: "Apply for a Job" },
    { value: "collectibles", label: "Insure Collectibles" },
  ],
  es: [
    { value: "quote", label: "Obtener cotización" },
    { value: "referral", label: "Referir a alguien" },
    { value: "job", label: "Solicitar trabajo" },
    { value: "collectibles", label: "Asegurar coleccionables" },
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

function getHomeInsuranceBackgroundVariant(insuranceType) {
  const value = (insuranceType || "").toLowerCase();

  if (!value) return "default";
  if (value.includes("auto")) return "auto";
  if (value.includes("hogar") || value.includes("home")) return "home";
  if (value.includes("renters") || value.includes("inquilinos")) return "renters";
  if (value.includes("landlord") || value.includes("propietario")) return "landlord";
  if (value.includes("life") || value.includes("vida")) return "life";
  if (value.includes("business") || value.includes("comercial")) return "business";
  if (value.includes("pet") || value.includes("mascotas")) return "pet";
  if (value.includes("other") || value.includes("otro")) return "other";

  return "default";
}

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
    filterCollectibles: "Collectibles",
    submittedAt: "Submitted",
    inquiryType: "Inquiry Type",
    spanishNeeded: "Spanish",
    notesLabel: "Notes",
    insuranceType: "Insurance Type",
    desiredRoleLabel: "Desired Role",
    yearsExperienceLabel: "Experience",
    availabilityLabel: "Availability",
    resumeLinkLabel: "Resume Link",
    collectibleTypePortalLabel: "Collectible Type",
    collectionValueLabel: "Collection Value",
    estimatedItemsLabel: "Estimated Items",
    storageMethodLabel: "Storage Method",
    conditionLabel: "Condition",
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
    filterCollectibles: "Coleccionables",
    submittedAt: "Enviado",
    inquiryType: "Tipo de solicitud",
    spanishNeeded: "Español",
    notesLabel: "Notas",
    insuranceType: "Tipo de seguro",
    desiredRoleLabel: "Puesto",
    yearsExperienceLabel: "Experiencia",
    availabilityLabel: "Disponibilidad",
    resumeLinkLabel: "Enlace del resume",
    collectibleTypePortalLabel: "Tipo de coleccion",
    collectionValueLabel: "Valor de la coleccion",
    estimatedItemsLabel: "Piezas estimadas",
    storageMethodLabel: "Metodo de almacenamiento",
    conditionLabel: "Condicion",
    portalNotesLabel: "Notas internas",
    portalNotesPlaceholder: "Agrega notas privadas de seguimiento",
    deleteLead: "Eliminar",
    loading: "Cargando...",
  },
};

const PAGE_HOME = "home";
const PAGE_TEAM = "team";
const PAGE_JOBS = "jobs";
const PAGE_COLLECTIBLES = "collectibles";
const PAGE_CANOPY = "canopy";
const PAGE_PORTAL = "portal";

const NAV_COPY = {
  en: {
    home: "Home",
    team: "Meet the Team",
    collectibles: "Collectibles",
    quote: "Get a Quote",
    teamCta: "Get to Know the Team",
    collectiblesCta: "Protect Your Collection",
    teamBannerTitle: "Put faces, values, and style of service behind the quote form",
    teamBannerBody:
      "Explore the new team page to learn how Oak & Compass supports clients with calm, local, people-first guidance.",
    collectiblesBannerTitle: "Insure the pieces that make your collection feel personal",
    collectiblesBannerBody:
      "Explore a themed collectibles page built for cards, books, firearms, comics, coins, and more.",
  },
  es: {
    home: "Inicio",
    team: "Conoce al equipo",
    collectibles: "Coleccionables",
    quote: "Obtener cotizacion",
    teamCta: "Conoce al equipo",
    collectiblesCta: "Protege tu coleccion",
    teamBannerTitle: "Conoce a las personas y valores detras de la experiencia de Oak & Compass",
    teamBannerBody:
      "Explora la nueva pagina del equipo para ver como Oak & Compass acompana a cada cliente con cercania y claridad.",
    collectiblesBannerTitle: "Asegura las piezas que hacen especial tu coleccion",
    collectiblesBannerBody:
      "Explora una pagina interactiva para tarjetas, libros, armas, comics, monedas y mas.",
  },
};

const TEAM_PAGE_COPY = {
  en: {
    badge: "Meet the owner",
    headline: "Insurance built by a real person, for real life",
    subheadline:
      "Oak & Compass was built for people who want great coverage and an experience that still feels human. The heart behind the company is simple: work hard, show up well, protect what matters, and make people feel taken care of from the start.",
    ownerLabel: "Owner-led",
    ownerTitle: "The same values behind the brand are the ones behind the work",
    ownerBody:
      "Behind Oak & Compass is someone who loves the outdoors, values family, and believes insurance should feel clear, personal, and steady. With 6 years of experience, the goal is not to push people through a script. It is to listen well, explain things clearly, and help people feel confident about protecting the life they have built.",
    snapshotTitle: "What matters here",
    snapshot: [
      { label: "Experience", value: "6 years helping people protect what matters" },
      { label: "Trail partner", value: "Deigo, a black lab mix with endless energy" },
      { label: "Style", value: "Clear advice, no pressure, real follow-through" },
    ],
    galleryLabel: "The life behind Oak & Compass",
    galleryTitle: "A business shaped by discipline, family, and the outdoors",
    galleryBody:
      "The story behind this company is not just office hours and paperwork. It is mountains, movement, loyalty, family, and a real life worth protecting. That energy is part of what makes the company feel grounded and trustworthy.",
    valuesLabel: "What clients feel",
    introTitle: "The experience should feel calm, clear, and personal",
    introBody:
      "People do not come looking for insurance because they want more confusion. They come because something in their life matters. Oak & Compass is built to meet that moment with honesty, clarity, and real follow-through.",
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
    teamLabel: "The people you work with matter",
    membersTitle: "A team people can feel good about working with",
    membersBody:
      "Right now that starts with an owner who genuinely cares, but the vision is bigger than one person. As Oak & Compass grows, the team will be built around the same kind of energy clients already feel here: dependable, approachable, thoughtful, and all-in on doing right by people.",
    hobbiesTitle: "A few things that make the brand feel real",
    hobbies: [
      "Climbing",
      "Hiking",
      "Camping",
      "Magic: The Gathering",
      "Running",
      "Reading fantasy",
      "Time outside with Deigo",
    ],
    expectationsTitle: "What it feels like to work together",
    expectations: [
      "A first conversation that feels straightforward instead of stressful.",
      "Coverage options explained clearly, with room to ask honest questions.",
      "A team that stays helpful before, during, and after the quote process.",
    ],
    primaryCta: "Start a Quote",
    secondaryCta: "Back to Home",
  },
  es: {
    badge: "Conoce al dueno",
    headline: "Seguro hecho por una persona real, para la vida real",
    subheadline:
      "Oak & Compass fue creado para personas que quieren buena cobertura y una experiencia que se siga sintiendo humana. La idea de fondo es simple: trabajar duro, responder bien, proteger lo importante y hacer que la gente se sienta cuidada desde el principio.",
    ownerLabel: "Dirigido por el dueno",
    ownerTitle: "Los valores detras de la marca son los mismos detras del trabajo",
    ownerBody:
      "Detras de Oak & Compass hay una persona que ama la naturaleza, valora a su familia y cree que el seguro debe sentirse claro, cercano y firme. Con 6 anos de experiencia, la meta no es empujar un guion. La meta es escuchar bien, explicar con claridad y ayudar a que la gente se sienta segura con lo que esta protegiendo.",
    snapshotTitle: "Lo que importa aqui",
    snapshot: [
      { label: "Experiencia", value: "6 anos ayudando a proteger lo importante" },
      { label: "Companero de sendero", value: "Deigo, un black lab mix con mucha energia" },
      { label: "Estilo", value: "Consejo claro, sin presion y con seguimiento real" },
    ],
    galleryLabel: "La vida detras de Oak & Compass",
    galleryTitle: "Un negocio formado por disciplina, familia y aire libre",
    galleryBody:
      "La historia de esta empresa no es solo oficina y papeles. Tambien son montanas, movimiento, lealtad, familia y una vida real que vale la pena proteger. Esa energia es parte de lo que hace que la marca se sienta firme y confiable.",
    valuesLabel: "Lo que siente la gente",
    introTitle: "La experiencia debe sentirse clara, tranquila y cercana",
    introBody:
      "La gente no busca seguro porque quiera mas confusion. Llega porque algo en su vida importa. Oak & Compass esta construido para responder a ese momento con honestidad, claridad y seguimiento real.",
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
    teamLabel: "Importa con quien trabajas",
    membersTitle: "Un equipo con el que la gente se puede sentir bien",
    membersBody:
      "Hoy empieza con un dueno que de verdad se preocupa, pero la vision va mas alla de una sola persona. Conforme Oak & Compass crezca, el equipo se va a formar con la misma energia que la gente ya siente aqui: personas confiables, cercanas, atentas y comprometidas con hacer bien las cosas.",
    hobbiesTitle: "Cosas que hacen que la marca se sienta real",
    hobbies: [
      "Escalada",
      "Caminatas",
      "Campamento",
      "Magic: The Gathering",
      "Correr",
      "Lectura de fantasia",
      "Tiempo afuera con Deigo",
    ],
    expectationsTitle: "Como se siente trabajar juntos",
    expectations: [
      "Una primera conversacion mas simple y menos estresante.",
      "Opciones explicadas con claridad y espacio para hacer preguntas reales.",
      "Un equipo que sigue ayudando antes, durante y despues de la cotizacion.",
    ],
    primaryCta: "Comenzar cotizacion",
    secondaryCta: "Volver al inicio",
  },
};

const TEAM_GALLERY = [
  {
    src: "/IMG_2087.JPEG",
    alt: "Owner outdoors in a candid portrait",
    className: "lg:col-span-2 lg:row-span-2",
    imageClassName: "object-center",
  },
  {
    src: "/20220429_083453.jpg",
    alt: "Owner with family by the water",
    className: "lg:col-span-1 lg:row-span-1",
    imageClassName: "object-center",
  },
  {
    src: "/22D369D7-7A6F-4D17-811A-2392AF24C1B0.jpg",
    alt: "Deigo running on a snowy trail",
    className: "lg:col-span-1 lg:row-span-1",
    imageClassName: "object-center",
  },
  {
    src: "/F8C773C4-7E55-4474-B200-06C7FDD76891.jpg",
    alt: "Climbing silhouette between canyon walls",
    className: "lg:col-span-2 lg:row-span-1",
    imageClassName: "object-contain object-center bg-slate-950",
  },
];

const TEAM_MEMBERS = {
  en: [
    {
      name: "Owner & Founder",
      role: "The steady hand behind Oak & Compass",
      bio: "The business is built around showing up well for people, keeping things clear, and making sure clients feel taken care of instead of sold to.",
      highlights: ["6 years of experience", "Outdoorsy", "Client-first"],
    },
    {
      name: "Growing Team",
      role: "Future advisors who match the same standard",
      bio: "As the company grows, new team members can be added here with the same focus on clarity, care, and being the kind of people others genuinely want to work with.",
      highlights: ["Approachable", "Dependable", "Built to grow"],
    },
  ],
  es: [
    {
      name: "Dueno y fundador",
      role: "La persona firme detras de Oak & Compass",
      bio: "El negocio esta construido para atender bien, explicar con claridad y hacer que cada cliente se sienta cuidado en lugar de sentirse vendido.",
      highlights: ["6 anos de experiencia", "Amor por el aire libre", "Enfoque en el cliente"],
    },
    {
      name: "Equipo en crecimiento",
      role: "Futuros asesores con el mismo nivel humano",
      bio: "Conforme la empresa crezca, aqui se pueden sumar nuevas personas con la misma energia de claridad, atencion y confianza que ya define la marca.",
      highlights: ["Cercanos", "Confiables", "Listo para crecer"],
    },
  ],
};

const COLLECTIBLE_THEMES = [
  {
    id: "trading-cards",
    key: "Trading Cards",
    accent: "from-fuchsia-500 via-violet-500 to-sky-500",
    surface: "bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.35),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.35),_transparent_30%),linear-gradient(145deg,_#140a2d_0%,_#24104d_42%,_#0f2747_100%)]",
    chip: "from-fuchsia-400/25 to-sky-400/25",
    icon: "TC",
  },
  {
    id: "books",
    key: "Books",
    accent: "from-amber-500 via-orange-500 to-rose-500",
    surface: "bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.34),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.26),_transparent_32%),linear-gradient(145deg,_#2a170c_0%,_#4a2814_44%,_#7c3d12_100%)]",
    chip: "from-amber-400/25 to-orange-400/25",
    icon: "BK",
  },
  {
    id: "firearms",
    key: "Guns",
    accent: "from-slate-400 via-zinc-500 to-stone-600",
    surface: "bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.28),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(120,113,108,0.28),_transparent_28%),linear-gradient(145deg,_#111827_0%,_#1f2937_46%,_#3f3f46_100%)]",
    chip: "from-slate-300/20 to-stone-300/20",
    icon: "GN",
  },
  {
    id: "comics",
    key: "Comics",
    accent: "from-yellow-400 via-rose-500 to-red-600",
    surface: "bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.32),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(244,63,94,0.30),_transparent_28%),linear-gradient(145deg,_#28110c_0%,_#5b1220_42%,_#7f1d1d_100%)]",
    chip: "from-yellow-300/25 to-rose-400/25",
    icon: "CM",
  },
  {
    id: "coins",
    key: "Coins",
    accent: "from-yellow-300 via-amber-400 to-yellow-600",
    surface: "bg-[radial-gradient(circle_at_top_left,_rgba(253,224,71,0.35),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.28),_transparent_28%),linear-gradient(145deg,_#2d2404_0%,_#57420f_44%,_#8a5a14_100%)]",
    chip: "from-yellow-300/25 to-amber-300/25",
    icon: "CN",
  },
  {
    id: "memorabilia",
    key: "Memorabilia",
    accent: "from-emerald-400 via-teal-500 to-cyan-500",
    surface: "bg-[radial-gradient(circle_at_top_left,_rgba(52,211,153,0.32),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.28),_transparent_30%),linear-gradient(145deg,_#09231f_0%,_#0f3b36_44%,_#155e75_100%)]",
    chip: "from-emerald-300/25 to-cyan-300/25",
    icon: "MB",
  },
];

const COLLECTIBLES_PAGE_COPY = {
  en: {
    badge: "Collectibles Insurance",
    title: "Insurance for the collection you have spent real time building",
    body:
      "Choose what you collect and tell us a little about it. Whether it is cards, books, firearms, comics, coins, or personal memorabilia, we will use that to start a more thoughtful insurance conversation.",
    selectorLabel: "What do you collect?",
    formTitle: "Tell us about your collection",
    formBody:
      "Share a quick snapshot of what you own, about what it is worth, and how you keep it stored. That gives us a better starting point for helping you protect it.",
    collectibleTypeLabel: "Collection type",
    collectionValueLabel: "About what is the collection worth?",
    estimatedItemsLabel: "About how many pieces do you have?",
    storageMethodLabel: "How are you storing it right now?",
    conditionLabel: "Condition or grading",
    notesCollectibles: "Anything special, rare, or sentimental we should know?",
    submitCollectibles: "Get My Collectibles Quote Started",
    submittedCollectibles: "Thanks. Your collectibles request is in.",
    themesTitle: "What we are helping you protect",
    themesAssetTitle: "What you are protecting",
    themesHowTitle: "Why these details matter",
    storageOptions: ["Display room", "Safe or vault", "Climate-controlled storage", "Mixed storage"],
    conditionOptions: ["Raw / ungraded", "Partially graded", "Mostly graded / documented", "High-value curated collection"],
    themeDetails: {
      "trading-cards": {
        asset:
          "The cards themselves, including graded singles, sealed product, binders, full sets, and the value that comes from rarity, condition, and good documentation.",
        how:
          "For cards, the big things are value, grading, storage, and how well the collection is documented so it is not treated like ordinary stuff sitting around the house.",
      },
      books: {
        asset:
          "Special editions, signed copies, rare printings, boxed sets, and shelves where edition, condition, and provenance all change what the collection is really worth.",
        how:
          "With books, the main question is not just replacing a copy. It is protecting items that may be hard to replace at all, especially when condition or edition makes them valuable.",
      },
      firearms: {
        asset:
          "The collection itself, including individual firearms, custom pieces, older models, safes, accessories, and any collector value tied to rarity, condition, or history.",
        how:
          "What matters most here is knowing what you have, where it is stored, and how it is secured so the coverage conversation reflects the collection you actually own.",
      },
      comics: {
        asset:
          "Key issues, graded slabs, signed books, full runs, preserved raw books, and the value tied to condition on scarce or high-demand issues.",
        how:
          "For comics, grading, storage, and documentation matter a lot because one issue can be worth something completely different depending on condition.",
      },
      coins: {
        asset:
          "Individual coins, graded pieces, sets, albums, and collectible coins whose value may come from metal content, rarity, strike, mint history, and condition.",
        how:
          "Coins usually need a clear inventory, strong documentation, and a realistic sense of value so high-end pieces do not get lumped in with everything else.",
      },
      memorabilia: {
        asset:
          "Signed items, jerseys, display pieces, ticket stubs, keepsakes, sports collectibles, and one-of-a-kind items that may be difficult to value or replace.",
        how:
          "For memorabilia, authenticity, provenance, and replacement difficulty matter just as much as price, especially when the piece is personal or truly unique.",
      },
    },
  },
  es: {
    badge: "Seguro para coleccionables",
    title: "Seguro para la coleccion que te ha tomado tiempo construir",
    body:
      "Elige lo que coleccionas y cuentanos un poco sobre ello. Ya sean tarjetas, libros, armas, comics, monedas o recuerdos personales, eso nos ayuda a empezar una conversacion mas util sobre como protegerlo.",
    selectorLabel: "Que coleccionas?",
    formTitle: "Cuentanos sobre tu coleccion",
    formBody:
      "Comparte un resumen rapido de lo que tienes, cuanto vale aproximadamente y como lo guardas. Eso nos da un mejor punto de partida para ayudarte a protegerlo.",
    collectibleTypeLabel: "Tipo de coleccion",
    collectionValueLabel: "Cuanto vale aproximadamente la coleccion?",
    estimatedItemsLabel: "Aproximadamente cuantas piezas tienes?",
    storageMethodLabel: "Como la guardas actualmente?",
    conditionLabel: "Condicion o graduacion",
    notesCollectibles: "Hay algo especial, raro o sentimental que debamos saber?",
    submitCollectibles: "Comenzar mi cotizacion para coleccionables",
    submittedCollectibles: "Gracias. Ya recibimos tu solicitud.",
    themesTitle: "Lo que te estamos ayudando a proteger",
    themesAssetTitle: "Lo que estas protegiendo",
    themesHowTitle: "Por que importan estos detalles",
    storageOptions: ["Cuarto de exhibicion", "Caja fuerte o vault", "Almacenamiento con clima controlado", "Almacenamiento mixto"],
    conditionOptions: ["Sin graduar", "Parcialmente graduado", "Mayormente graduado / documentado", "Coleccion curada de alto valor"],
    themeDetails: {
      "trading-cards": {
        asset:
          "Las tarjetas mismas, incluyendo cartas graduadas, producto sellado, binders, sets y el valor que viene de la rareza, la condicion y una buena documentacion.",
        how:
          "En tarjetas, lo importante suele ser el valor, la graduacion, el almacenamiento y que la coleccion este bien documentada para que no se trate como simples objetos comunes.",
      },
      books: {
        asset:
          "Ediciones especiales, copias firmadas, impresiones raras, colecciones completas y libreros donde la edicion, la condicion y la procedencia cambian mucho el valor.",
        how:
          "Con libros, la pregunta no es solo cuanto cuesta otra copia. Muchas veces se trata de proteger piezas que son dificiles de reemplazar, sobre todo cuando la edicion o la condicion importan.",
      },
      firearms: {
        asset:
          "La coleccion misma, incluyendo armas individuales, piezas personalizadas, modelos antiguos, cajas fuertes, accesorios y valor ligado a rareza, condicion o historia.",
        how:
          "Aqui importa tener claro que tienes, donde se guarda y como se asegura para que la conversacion de cobertura refleje la coleccion real.",
      },
      comics: {
        asset:
          "Numeros clave, comics graduados, libros firmados, corridas completas, ejemplares bien preservados y el valor que cambia mucho segun la condicion.",
        how:
          "En comics, la graduacion, el almacenamiento y la documentacion importan mucho porque una misma pieza puede valer algo muy distinto segun su estado.",
      },
      coins: {
        asset:
          "Monedas individuales, piezas graduadas, sets, albums y monedas cuyo valor puede venir del metal, la rareza, la acuñacion, la historia de la casa de moneda y la condicion.",
        how:
          "Las monedas suelen requerir un inventario claro, buena documentacion y una idea realista del valor para que las piezas importantes no se mezclen con todo lo demas.",
      },
      memorabilia: {
        asset:
          "Articulos firmados, jerseys, piezas de exhibicion, boletos, recuerdos, coleccionables deportivos y objetos unicos que pueden ser dificiles de valorar o reemplazar.",
        how:
          "En memorabilia, la autenticidad, la procedencia y lo dificil que seria reemplazar una pieza importan tanto como el precio, sobre todo cuando tiene valor personal.",
      },
    },
  },
};

function getPageFromHash(hash) {
  const value = hash.replace(/^#/, "").trim().toLowerCase();

  if (value === PAGE_TEAM) return PAGE_TEAM;
  if (value === PAGE_JOBS) return PAGE_JOBS;
  if (value === PAGE_COLLECTIBLES) return PAGE_COLLECTIBLES;
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
          <button
            type="button"
            onClick={() => onNavigate(PAGE_COLLECTIBLES)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activePage === PAGE_COLLECTIBLES
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {nav.collectibles}
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
          <button
            type="button"
            onClick={() => onNavigate(PAGE_COLLECTIBLES)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activePage === PAGE_COLLECTIBLES
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {nav.collectibles}
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

function ForestLandscapeBackground({
  variant = "default",
  className = "absolute inset-0",
  preserve = "xMidYMid slice",
}) {
  let overlay = null;

  if (variant === "auto") {
    overlay = (
      <>
        <path strokeWidth="2.4" d="M906 505H1114L1162 553H1197L1222 604H862L906 505Z" />
        <path strokeWidth="2" d="M933 505L974 451H1079L1132 505" />
        <circle cx="935" cy="608" r="28" strokeWidth="2.8" />
        <circle cx="1119" cy="608" r="28" strokeWidth="2.8" />
        <path strokeWidth="1.8" d="M966 542H1088" />
        <path strokeWidth="1.8" d="M862 604H1222" />
      </>
    );
  } else if (variant === "home") {
    overlay = (
      <>
        <path strokeWidth="2.6" d="M901 610V501L1010 418L1122 501V610" />
        <path strokeWidth="2.2" d="M876 505L1010 394L1147 505" />
        <path strokeWidth="2.2" d="M954 610V536H1008V610" />
        <path strokeWidth="2" d="M935 524H972" />
        <path strokeWidth="2" d="M1046 524H1086" />
        <path strokeWidth="2" d="M1046 551H1086" />
      </>
    );
  } else if (variant === "renters") {
    overlay = (
      <>
        <path strokeWidth="2.6" d="M908 610V468H1118V610" />
        <path strokeWidth="2.2" d="M892 468H1134" />
        <path strokeWidth="2.2" d="M951 610V520H1076V610" />
        <path strokeWidth="2" d="M974 444C986 425 1004 415 1028 415C1050 415 1068 424 1080 444" />
        <path strokeWidth="2" d="M972 391H1082" />
        <path strokeWidth="2" d="M1026 391V444" />
      </>
    );
  } else if (variant === "landlord") {
    overlay = (
      <>
        <path strokeWidth="2.6" d="M892 610V458H1133V610" />
        <path strokeWidth="2.2" d="M872 458L1013 386L1152 458" />
        <path strokeWidth="2.2" d="M960 610V522H1011V610" />
        <path strokeWidth="2" d="M1044 514H1089" />
        <path strokeWidth="2" d="M1044 542H1089" />
        <path strokeWidth="2" d="M1168 507C1193 493 1218 492 1243 503C1258 510 1269 522 1278 539" />
        <path strokeWidth="2" d="M1225 537V589" />
        <path strokeWidth="2" d="M1198 563L1225 590L1270 543" />
      </>
    );
  } else if (variant === "life") {
    overlay = (
      <>
        <path strokeWidth="2.6" d="M1009 620C939 620 878 599 828 559C779 520 754 472 754 417C754 374 768 339 796 313C822 287 854 274 892 274C942 274 981 295 1009 336C1037 295 1076 274 1126 274C1163 274 1195 287 1222 313C1250 339 1264 374 1264 417C1264 472 1238 520 1189 559C1139 599 1079 620 1009 620Z" />
        <path strokeWidth="2" d="M934 432H981L1008 390L1036 470L1061 432H1111" />
      </>
    );
  } else if (variant === "business") {
    overlay = (
      <>
        <path strokeWidth="2.6" d="M906 610V451H1119V610" />
        <path strokeWidth="2.2" d="M962 610V519H1060V610" />
        <path strokeWidth="2" d="M937 485H969M937 521H969M937 557H969" />
        <path strokeWidth="2" d="M988 485H1020M988 521H1020M988 557H1020" />
        <path strokeWidth="2" d="M1038 485H1070M1038 521H1070M1038 557H1070" />
        <path strokeWidth="2" d="M1089 485H1119M1089 521H1119M1089 557H1119" />
        <path strokeWidth="2.2" d="M956 427H1070" />
      </>
    );
  } else if (variant === "pet") {
    overlay = (
      <>
        <path strokeWidth="2.8" d="M955 610C913 610 879 581 879 540C879 512 895 489 919 477C924 448 942 425 969 418C998 411 1026 422 1043 446C1060 422 1088 411 1117 418C1145 425 1163 448 1168 477C1192 489 1208 512 1208 540C1208 581 1174 610 1132 610H955Z" />
        <circle cx="970" cy="455" r="22" strokeWidth="2.2" />
        <circle cx="1117" cy="455" r="22" strokeWidth="2.2" />
        <path strokeWidth="2" d="M1001 557C1018 568 1036 573 1055 573C1074 573 1093 568 1110 557" />
      </>
    );
  } else if (variant === "other") {
    overlay = (
      <>
        <circle cx="1013" cy="512" r="92" strokeWidth="2.6" />
        <circle cx="1013" cy="512" r="54" strokeWidth="2" />
        <path strokeWidth="2.4" d="M1013 436V512L1060 547" />
        <path strokeWidth="2.2" d="M1013 391V431" />
        <path strokeWidth="2.2" d="M1133 512H1093" />
        <path strokeWidth="2.2" d="M1013 633V593" />
        <path strokeWidth="2.2" d="M893 512H933" />
      </>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden text-emerald-950/[0.09] ${className}`}
    >
      <svg
        viewBox="0 0 1440 900"
        className="h-full w-full"
        preserveAspectRatio={preserve}
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
          {overlay}
        </g>
      </svg>
    </div>
  );
}

function CollectiblesSceneBackground({ themeId }) {
  if (themeId === "trading-cards") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden text-white/[0.28]"
      >
        <svg viewBox="0 0 1440 900" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path strokeWidth="2.8" d="M324 60H1116L1214 158V742L1116 840H324L226 742V158L324 60Z" />
            <path strokeWidth="2.2" d="M369 103H1071L1169 201V699L1071 797H369L271 699V201L369 103Z" />
            <path strokeWidth="1.8" d="M511 149C571 122 641 108 720 108C798 108 870 122 931 149" />
            <path strokeWidth="1.8" d="M463 742C533 776 619 793 720 793C820 793 908 776 978 742" />
            <path strokeWidth="3.8" d="M577 282L688 190L834 214L801 372L891 493L744 489L648 608L590 463L453 406L577 282Z" />
            <path strokeWidth="3.2" d="M636 251L667 328L747 342L688 400L708 480L637 441L570 487L586 408L527 351L605 337L636 251Z" />
            <path strokeWidth="3.2" d="M826 266L919 311L906 412L809 449L730 385L741 293L826 266Z" />
            <path strokeWidth="2.6" d="M858 240C930 255 988 294 1034 357" />
            <path strokeWidth="2.6" d="M505 256C449 292 408 340 382 401" />
            <path strokeWidth="2.2" d="M364 625C432 583 516 561 618 561" />
            <path strokeWidth="2.2" d="M823 561C923 561 1008 583 1076 625" />
            <path strokeWidth="2.4" d="M566 671L649 626L720 661L792 626L874 671" />
          </g>
        </svg>
      </div>
    );
  }

  if (themeId === "books") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden text-white/[0.28]"
      >
        <svg viewBox="0 0 1440 900" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path strokeWidth="2.8" d="M324 60H1116L1214 158V742L1116 840H324L226 742V158L324 60Z" />
            <path strokeWidth="2.2" d="M369 103H1071L1169 201V699L1071 797H369L271 699V201L369 103Z" />
            <path strokeWidth="3.8" d="M470 655V280H575V655" />
            <path strokeWidth="3.8" d="M601 655V231H721V655" />
            <path strokeWidth="3.8" d="M748 655V255H853V655" />
            <path strokeWidth="3.8" d="M878 655V203H974V655" />
            <path strokeWidth="2.3" d="M499 310V627M627 261V627M775 286V627M905 236V627" />
            <path strokeWidth="3.4" d="M396 704H1046" />
            <path strokeWidth="3.2" d="M552 174C601 128 658 104 721 104C783 104 839 128 888 174" />
            <path strokeWidth="2.8" d="M617 147C649 122 683 110 721 110C759 110 794 122 825 147" />
            <path strokeWidth="2.8" d="M325 688C398 628 489 593 600 583" />
            <path strokeWidth="2.8" d="M840 583C952 593 1043 628 1116 688" />
            <path strokeWidth="2.4" d="M417 210C458 185 503 172 553 172" />
            <path strokeWidth="2.4" d="M887 172C938 172 984 185 1024 210" />
            <path strokeWidth="2.4" d="M560 744C610 770 663 783 721 783C778 783 833 770 882 744" />
          </g>
        </svg>
      </div>
    );
  }

  if (themeId === "firearms") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden text-white/[0.26]"
      >
        <svg viewBox="0 0 1440 900" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path strokeWidth="2.8" d="M324 60H1116L1214 158V742L1116 840H324L226 742V158L324 60Z" />
            <path strokeWidth="2.2" d="M369 103H1071L1169 201V699L1071 797H369L271 699V201L369 103Z" />
            <path strokeWidth="4.2" d="M430 623H680L778 525H973L1062 595H1125" />
            <path strokeWidth="3.4" d="M651 525L730 440H887L952 525" />
            <path strokeWidth="3" d="M816 470H1024" />
            <circle cx="523" cy="661" r="58" strokeWidth="4.2" />
            <circle cx="678" cy="661" r="58" strokeWidth="4.2" />
            <circle cx="864" cy="640" r="64" strokeWidth="4.2" />
            <circle cx="1040" cy="640" r="64" strokeWidth="4.2" />
            <path strokeWidth="3.2" d="M527 293C588 231 656 199 731 199C807 199 877 231 944 293" />
            <path strokeWidth="3.2" d="M737 199V145" />
            <path strokeWidth="3.2" d="M882 230L921 116" />
            <path strokeWidth="3.2" d="M582 230L531 118" />
            <path strokeWidth="2.6" d="M342 694C434 626 543 592 668 592" />
            <path strokeWidth="2.6" d="M842 592C963 592 1068 623 1158 686" />
            <path strokeWidth="2.2" d="M446 760C538 786 629 799 721 799C812 799 905 786 996 760" />
          </g>
        </svg>
      </div>
    );
  }

  if (themeId === "comics") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden text-white/[0.26]"
      >
        <svg viewBox="0 0 1440 900" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path strokeWidth="2.8" d="M324 60H1116L1214 158V742L1116 840H324L226 742V158L324 60Z" />
            <path strokeWidth="2.2" d="M369 103H1071L1169 201V699L1071 797H369L271 699V201L369 103Z" />
            <path strokeWidth="4.2" d="M389 681L475 554L655 521L592 682H389Z" />
            <path strokeWidth="4.2" d="M1051 681L965 554L785 521L848 682H1051Z" />
            <path strokeWidth="4.4" d="M566 623L638 452H801L874 623L721 710L566 623Z" />
            <path strokeWidth="3" d="M636 452L598 352L660 271H783L845 352L806 452" />
            <path strokeWidth="2.6" d="M508 293C560 235 623 205 696 201" />
            <path strokeWidth="2.6" d="M744 201C817 205 881 235 933 293" />
            <path strokeWidth="2.2" d="M371 752C468 784 585 800 721 800C856 800 974 784 1071 752" />
            <path strokeWidth="2.4" d="M451 177C531 133 621 111 721 111C819 111 912 133 993 177" />
            <path strokeWidth="2.2" d="M464 617C527 584 598 567 676 567" />
            <path strokeWidth="2.2" d="M767 567C844 567 916 584 979 617" />
          </g>
        </svg>
      </div>
    );
  }

  if (themeId === "coins") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden text-white/[0.26]"
      >
        <svg viewBox="0 0 1440 900" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path strokeWidth="2.8" d="M324 60H1116L1214 158V742L1116 840H324L226 742V158L324 60Z" />
            <path strokeWidth="2.2" d="M369 103H1071L1169 201V699L1071 797H369L271 699V201L369 103Z" />
            <path strokeWidth="4.4" d="M478 607C478 480 586 377 720 377C853 377 962 480 962 607" />
            <path strokeWidth="3.2" d="M522 607C522 504 610 420 720 420C830 420 918 504 918 607" />
            <path strokeWidth="4.2" d="M602 300C602 231 655 175 720 175C784 175 838 231 838 300C838 369 784 425 720 425C655 425 602 369 602 300Z" />
            <path strokeWidth="3" d="M638 300C638 252 675 213 720 213C764 213 801 252 801 300C801 348 764 387 720 387C675 387 638 348 638 300Z" />
            <path strokeWidth="2.8" d="M720 233V367" />
            <path strokeWidth="2.8" d="M652 300H788" />
            <path strokeWidth="2.6" d="M437 691C530 760 624 795 720 795C815 795 910 760 1003 691" />
            <path strokeWidth="2.4" d="M459 177C532 132 620 109 720 109C819 109 909 132 982 177" />
            <path strokeWidth="2.2" d="M523 640C582 671 647 687 720 687C792 687 858 671 917 640" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden text-white/[0.26]"
    >
      <svg viewBox="0 0 1440 900" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path strokeWidth="2.8" d="M324 60H1116L1214 158V742L1116 840H324L226 742V158L324 60Z" />
          <path strokeWidth="2.2" d="M369 103H1071L1169 201V699L1071 797H369L271 699V201L369 103Z" />
          <path strokeWidth="4.2" d="M474 657V387H966V657" />
          <path strokeWidth="3.4" d="M552 387V265H888V387" />
          <path strokeWidth="3.2" d="M610 265L720 178L830 265" />
          <path strokeWidth="2.8" d="M529 614H910" />
          <path strokeWidth="2.8" d="M559 562H882" />
          <path strokeWidth="2.8" d="M591 511H849" />
          <path strokeWidth="2.8" d="M426 710C521 772 619 803 720 803C820 803 918 772 1014 710" />
          <path strokeWidth="2.4" d="M460 182C532 135 620 111 720 111C819 111 908 135 980 182" />
          <path strokeWidth="2.2" d="M356 608C409 565 471 537 542 525" />
          <path strokeWidth="2.2" d="M899 525C969 537 1032 565 1084 608" />
        </g>
      </svg>
    </div>
  );
}

function CollectiblesDragonSuccessBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_20%,rgba(251,191,36,0.22),transparent_18%),radial-gradient(circle_at_72%_38%,rgba(249,115,22,0.22),transparent_22%),radial-gradient(circle_at_26%_56%,rgba(239,68,68,0.18),transparent_24%)]" />
      <svg viewBox="0 0 1440 900" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dragonStroke" x1="260" y1="120" x2="1140" y2="760" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fef3c7" />
            <stop offset="0.45" stopColor="#fb923c" />
            <stop offset="1" stopColor="#f87171" />
          </linearGradient>
          <linearGradient id="dragonFire" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fef08a" />
            <stop offset="0.45" stopColor="#fb923c" />
            <stop offset="1" stopColor="#dc262600" />
          </linearGradient>
          <filter id="dragonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g opacity="0.28">
          <path d="M0 808C164 786 329 783 495 793C669 804 833 828 1007 831C1174 834 1320 814 1440 790" fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="3" strokeLinecap="round" />
          <path d="M0 852C192 840 386 841 582 852C756 862 930 872 1105 867C1239 863 1351 849 1440 832" fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="2" strokeLinecap="round" />
        </g>

        <g filter="url(#dragonGlow)" stroke="url(#dragonStroke)" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <g opacity="0.78">
            <path d="M620 360C539 279 438 229 318 214C394 293 452 372 495 455C528 518 548 580 558 636" strokeWidth="5" />
            <animateTransform attributeName="transform" type="rotate" values="-4 558 520; 6 558 520; -4 558 520" dur="3.4s" repeatCount="indefinite" />
          </g>

          <g opacity="0.78">
            <path d="M1119 363C1199 279 1302 229 1420 214C1344 293 1286 372 1243 455C1210 518 1190 580 1180 636" strokeWidth="5" />
            <animateTransform attributeName="transform" type="rotate" values="4 1180 520; -6 1180 520; 4 1180 520" dur="3.1s" repeatCount="indefinite" />
          </g>

          <g>
            <path d="M595 628C573 545 583 465 625 389C668 310 735 253 826 219C895 192 965 187 1035 204C1120 224 1181 269 1216 340C1250 410 1249 483 1211 558C1174 631 1104 685 1001 719C890 756 778 766 665 748" strokeWidth="6" />
            <animateTransform attributeName="transform" type="translate" values="0 0; 0 -8; 0 0; 0 5; 0 0" dur="4.2s" repeatCount="indefinite" />
          </g>

          <g opacity="0.92">
            <path d="M642 598C688 559 742 538 805 532C878 525 940 545 991 590C948 569 901 562 850 567C789 573 733 596 680 636" strokeWidth="5" />
            <animateTransform attributeName="transform" type="translate" values="0 0; 6 -2; 0 0" dur="2.5s" repeatCount="indefinite" />
          </g>

          <g>
            <path d="M804 310C845 273 892 251 944 246C1006 241 1060 258 1104 294C1149 329 1178 378 1190 440" strokeWidth="5" />
            <path d="M860 242C871 199 897 162 939 131" strokeWidth="4" />
            <path d="M935 133L1001 80L1028 166" strokeWidth="4" />
            <path d="M842 339C868 327 894 326 920 336" strokeWidth="4" />
            <path d="M857 373C887 390 918 396 952 389" strokeWidth="4" />
            <circle cx="977" cy="318" r="7" fill="#fff7d6" stroke="none">
              <animate attributeName="opacity" values="1;0.45;1" dur="1.1s" repeatCount="indefinite" />
            </circle>
            <animateTransform attributeName="transform" type="rotate" values="-2 962 340; 3 962 340; -2 962 340" dur="2.7s" repeatCount="indefinite" />
          </g>

          <g opacity="0.95">
            <path d="M1118 397C1163 408 1201 432 1231 470C1258 504 1277 544 1288 591" strokeWidth="4.6" />
            <path d="M1124 434C1174 448 1215 477 1246 521" strokeWidth="4.2" />
            <path d="M1127 473C1168 491 1203 518 1229 554" strokeWidth="4" />
            <animateTransform attributeName="transform" type="translate" values="0 0; 12 4; 0 0" dur="2.1s" repeatCount="indefinite" />
          </g>
        </g>

        <g opacity="0.95">
          <path d="M1234 449C1290 470 1333 505 1362 555C1324 541 1290 539 1260 548C1283 571 1296 600 1298 635C1246 606 1184 591 1112 591C1155 554 1196 507 1234 449Z" fill="url(#dragonFire)">
            <animateTransform attributeName="transform" type="translate" values="0 0; 20 -8; -4 6; 0 0" dur="1.3s" repeatCount="indefinite" />
          </path>
          <path d="M1249 478C1290 494 1322 520 1346 557C1319 549 1295 550 1273 559C1289 576 1297 598 1296 626C1255 604 1206 594 1148 594C1182 566 1216 527 1249 478Z" fill="#fef08ab8">
            <animateTransform attributeName="transform" type="translate" values="0 0; 16 -10; -2 3; 0 0" dur="1.05s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    </div>
  );
}


function TeamPage({ language, onNavigate }) {
  const teamText = TEAM_PAGE_COPY[language];
  const teamMembers = TEAM_MEMBERS[language] || TEAM_MEMBERS.en;

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
              <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.4)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {teamText.snapshotTitle}
                </p>
                <div className="mt-5 grid gap-3">
                  {teamText.snapshot.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-3xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

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
              {teamText.ownerLabel}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">{teamText.ownerTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{teamText.ownerBody}</p>
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                {teamText.hobbiesTitle}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {teamText.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {teamText.valuesLabel}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              {teamText.introTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{teamText.introBody}</p>
            <div className="mt-6 grid gap-4">
              {teamText.expectations.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200"
                >
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {teamText.galleryLabel}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
              {teamText.galleryTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{teamText.galleryBody}</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-3">
            {TEAM_GALLERY.map((photo) => (
              <figure
                key={photo.src}
                className={`group relative overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-sm ring-1 ring-slate-200 ${photo.className}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${photo.imageClassName || "object-center"}`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/10 to-transparent" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex max-w-3xl flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            {teamText.teamLabel}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            {teamText.membersTitle}
          </h2>
          <p className="text-base leading-7 text-slate-600">{teamText.membersBody}</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-sm text-emerald-700">{member.role}</p>
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

function CollectiblesPage({
  language,
  form,
  onChange,
  onSubmit,
  isSubmitting,
  isSubmitted,
  submittedInquiryType,
  onNavigate,
}) {
  const pageText = COLLECTIBLES_PAGE_COPY[language] || COLLECTIBLES_PAGE_COPY.en;
  const activeTheme =
    COLLECTIBLE_THEMES.find((theme) => theme.key === form.collectibleType) || COLLECTIBLE_THEMES[0];
  const activeThemeDetails =
    pageText.themeDetails?.[activeTheme.id] || COLLECTIBLES_PAGE_COPY.en.themeDetails[activeTheme.id];
  const submittedCollectibles = isSubmitted && submittedInquiryType === "collectibles";
  const dragonSurface = "bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(248,113,113,0.24),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.18),_transparent_26%),linear-gradient(145deg,_#14060a_0%,_#3f0a16_42%,_#7c2d12_100%)]";

  return (
    <div className={`min-h-screen text-white ${submittedCollectibles ? dragonSurface : activeTheme.surface}`} lang={language}>
      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_28%)]" />
        {submittedCollectibles ? (
          <CollectiblesDragonSuccessBackground />
        ) : (
          <CollectiblesSceneBackground themeId={activeTheme.id} />
        )}

        <div className="relative">
          <SiteHeader language={language} activePage={PAGE_COLLECTIBLES} onNavigate={onNavigate} />

          <div className="mx-auto max-w-6xl px-6 pb-8 pt-12 md:pt-20">
            <div className="grid gap-10 lg:grid-cols-[1fr,0.95fr] lg:items-start">
              <div>
                <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                  {submittedCollectibles ? (language === "es" ? "Tu solicitud esta en marcha" : "Your request is in") : pageText.badge}
                </div>

                <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                  {submittedCollectibles
                    ? language === "es"
                      ? "Ya recibimos tu coleccion"
                      : "We got your collection request"
                    : pageText.title}
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  {submittedCollectibles
                    ? language === "es"
                      ? "Gracias por enviarnos los detalles. Mientras el equipo revisa tu informacion, la pagina cambia para celebrar tu coleccion."
                      : "Thanks for sending the details over. While the team reviews everything, we’ll take a look at what you shared."
                    : pageText.body}
                </p>

                {submittedCollectibles ? (
                  <div className="mt-8 rounded-[2rem] border border-white/15 bg-black/20 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">
                      {language === "es" ? "Todo listo" : "All set"}
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-white/10 p-4">
                        <p className="text-sm font-semibold text-white/80">
                          {language === "es" ? "Coleccion" : "Collection"}
                        </p>
                        <p className="mt-2 text-2xl font-bold">{activeTheme.key}</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-4">
                        <p className="text-sm font-semibold text-white/80">
                          {language === "es" ? "Que sigue" : "What happens next"}
                        </p>
                        <p className="mt-2 text-base leading-7 text-white/90">
                          {language === "es"
                            ? "Vamos a revisar el valor, como la guardas y cualquier detalle importante para ayudarte a encontrar la mejor manera de protegerla."
                            : "We will review the value, how it is stored, and anything that makes it stand out so we can help you look at the right protection for it."}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                      {pageText.selectorLabel}
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {COLLECTIBLE_THEMES.map((theme) => {
                        const selected = form.collectibleType === theme.key;
                        return (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() => onChange({ target: { name: "collectibleType", value: theme.key } })}
                            className={`group rounded-[1.75rem] border p-5 text-left transition ${
                              selected
                                ? "border-white/40 bg-white/18 shadow-[0_20px_60px_-28px_rgba(255,255,255,0.4)]"
                                : "border-white/10 bg-white/8 hover:-translate-y-1 hover:border-white/25 hover:bg-white/12"
                            }`}
                          >
                            <div
                              className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.accent} text-lg font-black text-white shadow-lg`}
                            >
                              {theme.icon}
                            </div>
                            <h2 className="mt-4 text-2xl font-bold">{theme.key}</h2>
                            <div className={`mt-4 h-2 rounded-full bg-gradient-to-r ${theme.accent} opacity-90`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className={`mt-8 rounded-[2rem] border border-white/12 bg-gradient-to-br ${activeTheme.chip} p-6 backdrop-blur`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
                    {submittedCollectibles
                      ? language === "es"
                        ? "Lo que estamos ayudando a proteger"
                        : "What we are helping protect"
                      : pageText.themesTitle}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-black/20 p-4">
                      <p className="text-sm font-semibold text-white/80">{pageText.themesAssetTitle}</p>
                      <p className="mt-2 text-base leading-7 text-white/90">
                        {activeThemeDetails.asset}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-black/20 p-4">
                      <p className="text-sm font-semibold text-white/80">{pageText.themesHowTitle}</p>
                      <p className="mt-2 text-base leading-7 text-white/90">
                        {activeThemeDetails.how}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/12 bg-white/10 p-6 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.65)] backdrop-blur-xl md:p-8">
                <h2 className="text-3xl font-black tracking-tight">
                  {submittedCollectibles
                    ? language === "es"
                      ? "Ya lo tenemos"
                      : "You are all set"
                    : pageText.formTitle}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  {submittedCollectibles
                    ? language === "es"
                      ? "Tu informacion ya fue enviada. Ahora puedes relajarte mientras revisamos lo que compartiste."
                      : "Your info has already been sent. Now you can relax while we take a look at what you shared."
                    : pageText.formBody}
                </p>

                {submittedCollectibles ? (
                  <div className="mt-6 rounded-[2rem] border border-amber-200/20 bg-black/25 p-6">
                    <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-amber-400/15 via-orange-500/10 to-red-500/15 p-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200/80">
                        {language === "es" ? "Solicitud recibida" : "Request received"}
                      </p>
                      <p className="mt-4 text-3xl font-black tracking-tight">
                        {pageText.submittedCollectibles}
                      </p>
                      <p className="mt-4 text-base leading-7 text-white/85">
                        {language === "es"
                          ? "El dragon puede quedarse con el show, pero lo importante es esto: ya tenemos tus detalles y daremos seguimiento con lo que nos enviaste."
                          : "The dragon gets the spotlight, but the important part is this: we have your details and we will follow up using what you sent over."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-white/85">
                        {COLLECTIBLES_PAGE_COPY[language] ? COPY[language].firstName : COPY.en.firstName}
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={onChange}
                        placeholder={COPY[language]?.firstName || COPY.en.firstName}
                        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-white/85">
                        {COPY[language]?.lastName || COPY.en.lastName}
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={onChange}
                        placeholder={COPY[language]?.lastName || COPY.en.lastName}
                        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/85">
                        {COPY[language]?.phone || COPY.en.phone}
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={onChange}
                        placeholder={COPY[language]?.phone || COPY.en.phone}
                        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/85">
                        {COPY[language]?.email || COPY.en.email}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder={COPY[language]?.email || COPY.en.email}
                        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="collectibleType" className="mb-2 block text-sm font-medium text-white/85">
                        {pageText.collectibleTypeLabel}
                      </label>
                      <select
                        id="collectibleType"
                        name="collectibleType"
                        value={form.collectibleType}
                        onChange={onChange}
                        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/40"
                      >
                        <option value="">{pageText.collectibleTypeLabel}</option>
                        {COLLECTIBLE_THEMES.map((theme) => (
                          <option key={theme.id} value={theme.key} className="text-slate-900">
                            {theme.key}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="collectionValue" className="mb-2 block text-sm font-medium text-white/85">
                        {pageText.collectionValueLabel}
                      </label>
                      <input
                        id="collectionValue"
                        name="collectionValue"
                        type="text"
                        value={form.collectionValue}
                        onChange={onChange}
                        placeholder="$25,000"
                        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="estimatedItems" className="mb-2 block text-sm font-medium text-white/85">
                        {pageText.estimatedItemsLabel}
                      </label>
                      <input
                        id="estimatedItems"
                        name="estimatedItems"
                        type="text"
                        value={form.estimatedItems}
                        onChange={onChange}
                        placeholder="240"
                        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="mb-2 block text-sm font-medium text-white/85">
                        {COPY[language]?.zipCode || COPY.en.zipCode}
                      </label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        value={form.zipCode}
                        onChange={onChange}
                        placeholder={COPY[language]?.zipCode || COPY.en.zipCode}
                        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="storageMethod" className="mb-2 block text-sm font-medium text-white/85">
                        {pageText.storageMethodLabel}
                      </label>
                      <select
                        id="storageMethod"
                        name="storageMethod"
                        value={form.storageMethod}
                        onChange={onChange}
                        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/40"
                      >
                        <option value="">{pageText.storageMethodLabel}</option>
                        {pageText.storageOptions.map((option) => (
                          <option key={option} value={option} className="text-slate-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="collectibleCondition" className="mb-2 block text-sm font-medium text-white/85">
                        {pageText.conditionLabel}
                      </label>
                      <select
                        id="collectibleCondition"
                        name="collectibleCondition"
                        value={form.collectibleCondition}
                        onChange={onChange}
                        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/40"
                      >
                        <option value="">{pageText.conditionLabel}</option>
                        {pageText.conditionOptions.map((option) => (
                          <option key={option} value={option} className="text-slate-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="mb-2 block text-sm font-medium text-white/85">
                      {pageText.notesCollectibles}
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={5}
                      value={form.notes}
                      onChange={onChange}
                      placeholder={pageText.notesCollectibles}
                      className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/40"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full rounded-2xl bg-gradient-to-r ${activeTheme.accent} px-5 py-4 text-base font-black text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    {isSubmitting
                      ? language === "es"
                        ? "Enviando..."
                        : "Submitting..."
                      : pageText.submitCollectibles}
                  </button>
                  </form>
                )}
              </div>
            </div>
          </div>
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
    "Collectible Type",
    "Collection Value",
    "Estimated Items",
    "Storage Method",
    "Condition",
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
    lead.collectibleType,
    lead.collectionValue,
    lead.estimatedItems,
    lead.storageMethod,
    lead.collectibleCondition,
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
            <option value="collectibles">{text.filterCollectibles}</option>
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
                    {lead.insuranceType || lead.desiredRole || lead.collectibleType || "-"}
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
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.collectibleTypePortalLabel}</p>
                  <p className="mt-1 text-slate-900">{lead.collectibleType || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.collectionValueLabel}</p>
                  <p className="mt-1 text-slate-900">{lead.collectionValue || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.estimatedItemsLabel}</p>
                  <p className="mt-1 text-slate-900">{lead.estimatedItems || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.storageMethodLabel}</p>
                  <p className="mt-1 text-slate-900">{lead.storageMethod || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{text.conditionLabel}</p>
                  <p className="mt-1 text-slate-900">{lead.collectibleCondition || "-"}</p>
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
  const inquiryOptions = INQUIRY_OPTIONS[language].filter(
    (option) => option.value !== "job" && option.value !== "collectibles"
  );
  const insuranceOptions = INSURANCE_OPTIONS[language];
  const nav = NAV_COPY[language];

  useEffect(() => {
    document.title =
      activePage === PAGE_TEAM
        ? "Meet the Team | Oak & Compass Insurance"
        : activePage === PAGE_JOBS
          ? "Apply Now | Oak & Compass Insurance"
        : activePage === PAGE_COLLECTIBLES
          ? "Collectibles Insurance | Oak & Compass Insurance"
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
    if (activePage === PAGE_HOME && form.inquiryType !== "quote") {
      setForm((current) => ({
        ...current,
        inquiryType: "quote",
        desiredRole: "",
        yearsExperience: "",
        availability: "",
        resumeLink: "",
        collectibleType: "",
        collectionValue: "",
        estimatedItems: "",
        storageMethod: "",
        collectibleCondition: "",
      }));
    }

    if (activePage === PAGE_JOBS && form.inquiryType !== "job") {
      setForm((current) => ({
        ...current,
        inquiryType: "job",
        insuranceType: "",
        collectibleType: "",
        collectionValue: "",
        estimatedItems: "",
        storageMethod: "",
        collectibleCondition: "",
      }));
    }

    if (activePage === PAGE_COLLECTIBLES && form.inquiryType !== "collectibles") {
      setForm((current) => ({
        ...current,
        inquiryType: "collectibles",
        insuranceType: "",
        desiredRole: "",
        yearsExperience: "",
        availability: "",
        resumeLink: "",
        collectibleType: current.collectibleType || COLLECTIBLE_THEMES[0].key,
      }));
    }
  }, [activePage, form.inquiryType]);

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

    if (page === PAGE_HOME && (activePage !== PAGE_HOME || form.inquiryType !== "quote")) {
      setForm((current) => ({
        ...current,
        inquiryType: "quote",
        desiredRole: "",
        yearsExperience: "",
        availability: "",
        resumeLink: "",
        collectibleType: "",
        collectionValue: "",
        estimatedItems: "",
        storageMethod: "",
        collectibleCondition: "",
      }));
    }

    if (page === PAGE_JOBS && form.inquiryType !== "job") {
      setForm((current) => ({
        ...current,
        inquiryType: "job",
        insuranceType: "",
        collectibleType: "",
        collectionValue: "",
        estimatedItems: "",
        storageMethod: "",
        collectibleCondition: "",
      }));
    }

    if (page === PAGE_COLLECTIBLES && form.inquiryType !== "collectibles") {
      setForm((current) => ({
        ...current,
        inquiryType: "collectibles",
        insuranceType: "",
        desiredRole: "",
        yearsExperience: "",
        availability: "",
        resumeLink: "",
        collectibleType: current.collectibleType || COLLECTIBLE_THEMES[0].key,
      }));
    }

    if (
      page === PAGE_HOME ||
      page === PAGE_TEAM ||
      page === PAGE_JOBS ||
      page === PAGE_COLLECTIBLES ||
      page === PAGE_CANOPY
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isReferral = form.inquiryType === "referral";
  const submittedIsReferral = submittedInquiryType === "referral";
  const submittedIsJobApplication = submittedInquiryType === "job";
  const homeBackgroundVariant = getHomeInsuranceBackgroundVariant(form.insuranceType);

  const openJobApplication = () => {
    navigateToPage(PAGE_JOBS);
    setIsSubmitted(false);
    setSubmittedInquiryType("");
  };

  const openCollectiblesPage = () => {
    navigateToPage(PAGE_COLLECTIBLES);
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
        lead.collectibleType,
        lead.collectionValue,
        lead.estimatedItems,
        lead.storageMethod,
        lead.collectibleCondition,
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

  if (activePage === PAGE_COLLECTIBLES) {
    return (
      <CollectiblesPage
        language={language}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        submittedInquiryType={submittedInquiryType}
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
        <ForestLandscapeBackground variant={homeBackgroundVariant} />

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

        <div className="mt-8 rounded-[2rem] bg-gradient-to-br from-slate-950 via-violet-950 to-cyan-950 px-6 py-8 text-white shadow-xl md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                {nav.collectibles}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                {nav.collectiblesBannerTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {nav.collectiblesBannerBody}
              </p>
            </div>

            <button
              type="button"
              onClick={openCollectiblesPage}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              {nav.collectiblesCta}
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
    hasCollectiblesOptionEnglish: INQUIRY_OPTIONS.en.some((option) => option.value === "collectibles"),
    hasCollectiblesOptionSpanish: INQUIRY_OPTIONS.es.some((option) => option.value === "collectibles"),
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
    hasCollectiblesPage: true,
    hasSingleLeadDelete: true,
    hasPortalNotes: true,
    postsToApi: true,
    canopyAlias: "waddoups-insurance-agency-llc-kamden-young",
  };
}
