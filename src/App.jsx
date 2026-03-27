import { useEffect, useId, useMemo, useState } from "react";
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
      "If you want to make this easier, you can securely share your current insurance information below.",
    canopyReferral:
      "If you have their current insurance information, you can securely share it below so we can help faster.",
    canopyButton: "Share Current Insurance",
    simpleTitle: "Simple",
    simpleBody: "No long forms. Just the basics so we can get started.",
    helpfulTitle: "Helpful",
    helpfulBody: "We walk you through your options and help you find the right fit.",
    localTitle: "Local",
    localBody: "Real support from a team that cares about protecting what matters most.",
    careersEyebrow: "Job Opportunity",
    careersTitle: "Want to work with Oak & Compass?",
    careersBody:
      "We are looking for people who care about clients, communicate clearly, and want to do good work with good people.",
    careersPoints: ["People-first team", "Local relationships", "Growth-minded support"],
    applyNow: "Apply Now",
    canopyTitle: "Connect Your Insurance",
    canopyBody:
      "Securely share your current policy information so we can review your options with less back-and-forth.",
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
      "Si quieres hacerlo mas facil, puedes compartir de forma segura tu informacion actual de seguro aqui abajo.",
    canopyReferral:
      "Si tienes la informacion actual del seguro, puedes compartirla aqui abajo para ayudarnos a avanzar mas rapido.",
    canopyButton: "Compartir seguro actual",
    simpleTitle: "Simple",
    simpleBody: "Sin formularios largos. Solo lo básico para comenzar.",
    helpfulTitle: "Útil",
    helpfulBody: "Te guiamos por tus opciones y te ayudamos a encontrar la mejor.",
    localTitle: "Local",
    localBody: "Apoyo real de un equipo que se preocupa por proteger lo que más importa.",
    careersEyebrow: "Oportunidad laboral",
    careersTitle: "Quieres trabajar con Oak & Compass?",
    careersBody:
      "Estamos buscando personas que sepan tratar bien a los clientes, explicar con claridad y hacer buen trabajo con buena actitud.",
    careersPoints: ["Equipo humano", "Relaciones locales", "Espacio para crecer"],
    applyNow: "Aplica ahora",
    canopyTitle: "Conecta tu seguro",
    canopyBody:
      "Comparte de forma segura la informacion de tu poliza actual para revisar opciones con menos vueltas.",
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
const PAGE_RESOURCES = "resources";
const PAGE_CANOPY = "canopy";
const PAGE_PORTAL = "portal";

const NAV_COPY = {
  en: {
    home: "Home",
    team: "Meet the Team",
    collectibles: "Collectibles",
    resources: "Client Resources",
    quote: "Get a Quote",
    teamCta: "Get to Know the Team",
    collectiblesCta: "Protect Your Collection",
    resourcesCta: "Helpful Resources",
    teamBannerTitle: "Meet the people behind Oak & Compass",
    teamBannerBody:
      "Get a feel for how Oak & Compass shows up: clear, steady, and genuinely helpful.",
    collectiblesBannerTitle: "Insure the pieces that make your collection feel personal",
    collectiblesBannerBody:
      "Tell us what you collect and we will help you protect the pieces that matter most.",
    resourcesBannerTitle: "Helpful numbers, trusted people, and real next steps in one place",
    resourcesBannerBody:
      "A simple page clients can come back to when they need support, a recommendation, or the right number fast.",
  },
  es: {
    home: "Inicio",
    team: "Conoce al equipo",
    collectibles: "Coleccionables",
    resources: "Recursos",
    quote: "Obtener cotizacion",
    teamCta: "Conoce al equipo",
    collectiblesCta: "Protege tu coleccion",
    resourcesCta: "Ver recursos",
    teamBannerTitle: "Conoce a las personas detras de Oak & Compass",
    teamBannerBody:
      "Conoce como trabaja Oak & Compass: con claridad, calma y atencion real.",
    collectiblesBannerTitle: "Asegura las piezas que hacen especial tu coleccion",
    collectiblesBannerBody:
      "Dinos que coleccionas y te ayudamos a proteger lo que mas valor tiene para ti.",
    resourcesBannerTitle: "Numeros utiles, personas de confianza y pasos claros en un solo lugar",
    resourcesBannerBody:
      "Una pagina simple para volver cuando necesitas ayuda, una recomendacion o el numero correcto rapido.",
  },
};

const CLIENT_RESOURCES_PAGE_COPY = {
  en: {
    badge: "Client Support",
    headline: "A place to come back to when you need help fast",
    subheadline:
      "If life gets busy, stressful, or unexpectedly messy, you can come here for quick help, important numbers, and people I trust.",
    heroPoints: ["Fast help", "Clear next steps", "Trusted referrals"],
    spotlightLabel: "Here when you need it",
    spotlightTitle: "Good help should be easy to find",
    spotlightBody:
      "Whether you are moving, dealing with damage, replacing documents, or just trying to figure out who to call next, the important stuff is all here.",
    quickLinksLabel: "Quick links",
    quickLinksTitle: "A few places people usually need first",
    quickLinksBody:
      "These links are here to save time when you need to start a quote, pull up a trusted resource, or get pointed in the right direction.",
    numbersLabel: "Important numbers",
    numbersTitle: "Helpful phone numbers worth saving",
    numbersBody:
      "These are solid numbers to keep handy when something urgent or stressful is happening.",
    carrierLookupLabel: "Carrier lookup",
    carrierLookupTitle: "Need your carrier directly?",
    carrierLookupBody:
      "If you cannot reach me right away, choose your insurance company below and call their customer support line directly.",
    carrierLookupSelect: "Choose a carrier",
    carrierLookupNumber: "Customer support",
    carrierLookupHint: "If you want another carrier added, I can add it.",
    momentsLabel: "Common moments",
    momentsTitle: "A few situations where this can really help",
    momentsBody:
      "When a lot is happening at once, it helps to know where to start.",
    prosLabel: "Trusted professionals",
    prosTitle: "People I recommend",
    prosBody:
      "These are the people and businesses I trust and feel good sending clients to.",
    groups: [
      {
        title: "Realtors",
        items: [
          {
            role: "Realtor",
            name: "Reed Mackley",
            tagline:
              "Reed is the kind of person who makes people feel settled quickly. He is steady, genuine, and really good at taking the stress out of a move.",
            phone: "435.720.8209",
            email: "MackleyProperty@gmail.com",
            website: "RE/MAX Ascent",
            note: "I recommend Reed because he is the real deal. He is easy to trust, he knows Northern Utah well, and he shows up like someone who actually cares about the people he is helping.",
            bestFor: "Especially great for Northern Utah clients, first responders, military families, and anyone who wants a calm guide through the process.",
            accent: "from-emerald-700 via-emerald-600 to-lime-500",
          },
          {
            role: "Realtor",
            name: "Eric Schmitz",
            tagline:
              "Eric brings a warm, welcoming energy that instantly puts people at ease. He feels like someone you can comfortably send good people to.",
            phone: "(385) 899-2489",
            email: "Eric@MarkHaaga.com",
            website: "MarkHaaga.com",
            note: "I love recommending Eric because he is genuinely kind, easy to talk to, and the kind of person who makes a stressful process feel a lot more manageable.",
            bestFor: "A great fit for Salt Lake area clients who want someone patient, personable, and easy to work with from start to finish.",
            accent: "from-sky-700 via-cyan-600 to-teal-500",
          },
        ],
      },
      {
        title: "Handyman & Contractor",
        items: [
          {
            role: "HVAC & Plumbing",
            name: "Canyon Plumbing & Heating",
            tagline:
              "Canyon feels like a dependable local crew you can call when something in the house really needs to get handled right.",
            phone: "(435) 881-6952",
            email: "contact@canyonph.net",
            website: "canyonph.net",
            note: "I like having Canyon on this list because they cover the kind of home issues people cannot afford to let sit. They come across as solid, capable, and built for real day-to-day homeowner needs.",
            bestFor: "A strong option for HVAC, plumbing, water heaters, boilers, AC work, and those home problems that need a reliable local company.",
            accent: "from-slate-900 via-sky-800 to-cyan-500",
          },
        ],
      },
      {
        title: "Health Insurance",
        items: [
          {
            role: "Health Insurance",
            name: "Kristen Gines",
            tagline:
              "Kristen is a great person to have in your corner when health insurance feels confusing and you just want somebody to walk you through it clearly.",
            phone: "801-691-9767",
            email: "kgines@legacyifs.com",
            website: "Legacy Insurance and Financial Services",
            note: "I recommend Kristen because health insurance can feel overwhelming fast, and she is the kind of person who can help bring clarity and direction to the conversation.",
            bestFor: "A strong fit for anyone who wants more personal guidance around health insurance options and next steps.",
            accent: "from-rose-700 via-rose-600 to-orange-400",
          },
        ],
      },
      {
        title: "Mortgage Lender",
        items: [
          {
            role: "Mortgage Originator",
            name: "Elayne Bair",
            tagline:
              "Elayne is someone I would feel good sending people to when they need a lender who can help them move forward with confidence.",
            phone: "435-713-1863",
            email: "ebair@usucu.org",
            website: "gwcu.org/originators/elayne-bair",
            note: "I like Elayne as a recommendation because buying or refinancing a home is a big deal, and she is connected to the kinds of loan conversations people need help understanding clearly.",
            bestFor: "A strong fit for home loans, refinances, construction loans, lot loans, and first-time buyers who want a lender they can talk through things with.",
            accent: "from-amber-700 via-orange-600 to-rose-500",
          },
        ],
      },
      {
        title: "Business Lending",
        items: [
          {
            role: "Business Banker | VP",
            name: "Joseph Redzich",
            tagline:
              "Joseph is a great contact for business owners who need somebody sharp, capable, and steady on the banking side.",
            phone: "435-792-1227",
            email: "Joseph.Redzich@zionsbank.com",
            website: "zionsbank.com/personal/directory/business-bankers/joseph-redzich/",
            note: "I like having Joseph here because business owners need real relationships too, especially when they are making big financial decisions and need someone who knows the space.",
            bestFor: "A strong fit for working capital, lines of credit, equipment financing, and commercial real estate conversations.",
            accent: "from-indigo-800 via-slate-800 to-blue-500",
          },
        ],
      },
      {
        title: "Other Services",
        items: [
          {
            role: "Dog Trainer",
            name: "Robert Barlow",
            tagline:
              "Robert is the kind of dog trainer people remember because he is all-in on helping both the dog and the owner succeed.",
            phone: "(385) 457-5699",
            email: "Robert@BHyvek9.com",
            website: "bhyvek9.com",
            note: "I recommend Robert because good dog training changes everyday life at home, and he offers the kind of hands-on help people really appreciate when they want better results with their dog.",
            bestFor: "A great fit for private training, group classes, daycare, boarding, grooming, and owners who want real support with their dog.",
            accent: "from-emerald-800 via-lime-700 to-amber-500",
          },
        ],
      },
    ],
    footerTitle: "Want a warm handoff?",
    footerBody:
      "If you want an introduction instead of reaching out cold, I am happy to help make that connection.",
    introBadge: "Warm introduction",
    introButton: "Request an introduction",
    introOpenTitle: "Tell me who you want to meet",
    introOpenBody:
      "Pick the person you want to talk to, send me your basic info, and I will follow up on the introduction.",
    introChoiceLabel: "Who would you like to be introduced to?",
    introChoicePlaceholder: "Choose a person",
    introNotesLabel: "Anything I should know before I connect you?",
    introSubmit: "Send intro request",
    introSuccess: "Thanks, your introduction request has been sent.",
    introError: "Something went wrong. Please try again.",
    quickLinks: [
      {
        title: "Start a fresh quote",
        body: "A good place to start if your coverage needs changed after a move, purchase, or renewal.",
        actionLabel: "Start here",
        page: PAGE_HOME,
        tone:
          "from-emerald-400/20 via-white to-amber-200/30 text-emerald-950 ring-emerald-200",
      },
      {
        title: "Connect current insurance",
        body: "Share your current policy details securely so I can review things faster.",
        actionLabel: "Share details",
        page: PAGE_CANOPY,
        tone: "from-sky-400/20 via-white to-cyan-200/30 text-slate-950 ring-sky-200",
      },
      {
        title: "Ready.gov checklists",
        body: "Helpful checklists for emergency kits, disaster prep, and recovery planning.",
        actionLabel: "See checklists",
        href: "https://www.ready.gov/",
        tone: "from-orange-300/25 via-white to-rose-200/30 text-slate-950 ring-orange-200",
      },
      {
        title: "Replace key documents",
        body: "Helpful if IDs, titles, or other important records were lost, stolen, or damaged.",
        actionLabel: "See guide",
        href: "https://www.usa.gov/replace-vital-documents",
        tone: "from-violet-300/20 via-white to-fuchsia-200/25 text-slate-950 ring-violet-200",
      },
      {
        title: "See who is behind the brand",
        body: "If you like knowing who you are working with, this is a good place to start.",
        actionLabel: "Meet Oak & Compass",
        page: PAGE_TEAM,
        tone: "from-slate-300/20 via-white to-slate-100 text-slate-950 ring-slate-200",
      },
      {
        title: "Follow on Facebook",
        body: "Keep up with updates, community posts, and what is happening at Oak & Compass.",
        actionLabel: "Follow along",
        href: FACEBOOK_URL,
        tone: "from-emerald-300/20 via-white to-lime-200/25 text-slate-950 ring-emerald-200",
      },
    ],
    numbers: [
      {
        title: "Emergency services",
        number: "911",
        dial: "911",
        body: "For immediate danger, medical emergencies, fires, or situations that cannot wait.",
      },
      {
        title: "Suicide and Crisis Lifeline",
        number: "988",
        dial: "988",
        body: "24/7 mental health crisis support for calls or texts.",
      },
      {
        title: "Poison Control",
        number: "1-800-222-1222",
        dial: "18002221222",
        body: "Fast expert guidance for poisoning questions and urgent exposure concerns.",
      },
      {
        title: "American Red Cross",
        number: "1-800-733-2767",
        dial: "18007332767",
        body: "Disaster relief support, shelter information, and recovery guidance.",
      },
      {
        title: "FEMA Helpline",
        number: "1-800-621-3362",
        dial: "18006213362",
        body: "Federal disaster assistance questions before, during, or after a declared event.",
      },
    ],
    carriers: [
      {
        name: "Progressive",
        phone: "1-888-671-4405",
        note: "Customer service",
      },
      {
        name: "Foremost",
        phone: "1-800-527-3905",
        note: "Policy service",
      },
      {
        name: "National General",
        phone: "1-888-293-5108",
        note: "Customer support",
      },
      {
        name: "American Modern",
        phone: "1-800-543-2644",
        note: "Customer service",
      },
      {
        name: "Homeowners of America",
        phone: "1-866-407-9896",
        note: "Policyholder services",
      },
      {
        name: "Farmers",
        phone: "1-888-327-6335",
        note: "Customer care",
      },
      {
        name: "Bristol West",
        phone: "1-888-888-0080",
        note: "Customer service",
      },
      {
        name: "Travelers",
        phone: "1-800-252-4633",
        note: "Customer service",
      },
      {
        name: "Safeco",
        phone: "1-800-332-3226",
        note: "Customer service",
      },
    ],
    moments: [
      {
        title: "After an accident",
        body: "Take a breath, make sure everyone is safe, document the scene, and start gathering what you need for the claim conversation.",
        points: ["Check for injuries first", "Take photos", "Collect names and policy details"],
      },
      {
        title: "After storm or water damage",
        body: "Protect the property from further damage if it is safe, save receipts, and begin documenting everything right away.",
        points: ["Photograph damage early", "Prevent further loss", "Keep a simple timeline"],
      },
      {
        title: "After a move or major life change",
        body: "Big changes usually mean it is time to review coverage and make sure everything still fits.",
        points: ["Update address and vehicles", "Review home and renters needs", "Recheck deductibles and limits"],
      },
    ],
  },
  es: {
    badge: "Centro de recursos",
    headline: "Un lugar para volver cuando necesitas ayuda rapido",
    subheadline:
      "Si la vida se pone pesada, estresante o complicada, aqui tienes ayuda rapida, numeros importantes y personas en las que confio.",
    heroPoints: ["Ayuda rapida", "Pasos claros", "Referencias confiables"],
    spotlightLabel: "Aqui cuando lo necesites",
    spotlightTitle: "La buena ayuda debe ser facil de encontrar",
    spotlightBody:
      "Si te estas mudando, lidiando con danos, reemplazando documentos o solo tratando de recordar a quien llamar, aqui tienes un buen punto de partida.",
    quickLinksLabel: "Accesos rapidos",
    quickLinksTitle: "Algunos lugares que la gente suele necesitar primero",
    quickLinksBody:
      "Estos enlaces estan aqui para ahorrarte tiempo cuando necesitas empezar una cotizacion, usar un recurso util o encontrar la direccion correcta.",
    numbersLabel: "Numeros importantes",
    numbersTitle: "Telefonos utiles para guardar",
    numbersBody:
      "Estos son buenos numeros para tener a la mano cuando algo urgente o estresante esta pasando.",
    carrierLookupLabel: "Buscar carrier",
    carrierLookupTitle: "Necesitas hablar directo con tu carrier?",
    carrierLookupBody:
      "Si no puedes comunicarte conmigo de inmediato, elige tu compania abajo y llama directo a su numero de servicio al cliente.",
    carrierLookupSelect: "Elige un carrier",
    carrierLookupNumber: "Servicio al cliente",
    carrierLookupHint: "Si quieres agregar otro carrier, lo puedo hacer.",
    momentsLabel: "Y ahora que?",
    momentsTitle: "Situaciones donde esta pagina realmente ayuda",
    momentsBody:
      "Cuando muchas cosas pasan al mismo tiempo, ayuda saber por donde empezar.",
    prosLabel: "Profesionales recomendados",
    prosTitle: "Personas que recomiendo",
    prosBody:
      "Estas son las personas y negocios que recomiendo con confianza.",
    groups: [
      {
        title: "Realtors",
        items: [
          {
            role: "Realtor",
            name: "Reed Mackley",
            tagline:
              "Reed es de esas personas que rapido hacen que la gente se sienta tranquila. Es firme, genuino y muy bueno para bajar el estres de una mudanza.",
            phone: "435.720.8209",
            email: "MackleyProperty@gmail.com",
            website: "RE/MAX Ascent",
            note: "Recomiendo a Reed con muchisima confianza. Es buena persona, conoce muy bien el norte de Utah y se nota que de verdad le importa la gente a la que ayuda.",
            bestFor: "Especialmente fuerte para clientes del norte de Utah, primeros respondedores, familias militares y personas que quieren una guia calmada.",
            accent: "from-emerald-700 via-emerald-600 to-lime-500",
          },
          {
            role: "Realtor",
            name: "Eric Schmitz",
            tagline:
              "Eric tiene una energia muy calida y cercana que ayuda a que la gente se sienta comoda desde el principio.",
            phone: "(385) 899-2489",
            email: "Eric@MarkHaaga.com",
            website: "MarkHaaga.com",
            note: "Me gusta recomendar a Eric porque es genuinamente amable, facil de tratar y de esas personas que hacen que un proceso pesado se sienta mucho mas llevadero.",
            bestFor: "Muy buena opcion para clientes del area de Salt Lake que quieren alguien paciente, amable y facil de trabajar.",
            accent: "from-sky-700 via-cyan-600 to-teal-500",
          },
        ],
      },
      {
        title: "Handyman & Contractor",
        items: [
          {
            role: "HVAC y plomeria",
            name: "Canyon Plumbing & Heating",
            tagline:
              "Canyon se siente como ese equipo local confiable al que puedes llamar cuando algo en la casa de verdad necesita resolverse bien.",
            phone: "(435) 881-6952",
            email: "contact@canyonph.net",
            website: "canyonph.net",
            note: "Me gusta tener a Canyon aqui porque cubren esos problemas de casa que no se pueden dejar para despues. Se sienten como una opcion seria, capaz y bien aterrizada para necesidades reales del hogar.",
            bestFor: "Muy buena opcion para HVAC, plomeria, calentadores de agua, boilers, aire acondicionado y problemas importantes en casa.",
            accent: "from-slate-900 via-sky-800 to-cyan-500",
          },
        ],
      },
      {
        title: "Health Insurance",
        items: [
          {
            role: "Seguro de salud",
            name: "Kristen Gines",
            tagline:
              "Kristen es una gran persona para tener de tu lado cuando el seguro de salud se siente confuso y solo quieres que alguien te lo explique bien.",
            phone: "801-691-9767",
            email: "kgines@legacyifs.com",
            website: "Legacy Insurance and Financial Services",
            note: "Recomiendo a Kristen porque el seguro de salud puede sentirse pesado muy rapido, y ella es el tipo de persona que puede traer claridad y direccion a la conversacion.",
            bestFor: "Muy buena opcion para quien quiere guia mas personal con sus opciones de seguro de salud y los siguientes pasos.",
            accent: "from-rose-700 via-rose-600 to-orange-400",
          },
        ],
      },
      {
        title: "Mortgage Lender",
        items: [
          {
            role: "Originadora hipotecaria",
            name: "Elayne Bair",
            tagline:
              "Elayne es alguien a quien si me sentiria comodo mandando gente cuando necesitan una lender que les ayude a avanzar con confianza.",
            phone: "435-713-1863",
            email: "ebair@usucu.org",
            website: "gwcu.org/originators/elayne-bair",
            note: "Me gusta Elayne como recomendacion porque comprar o refinanciar casa es algo grande, y ella esta conectada con las conversaciones de prestamos que la gente necesita entender con claridad.",
            bestFor: "Muy buena opcion para home loans, refinanciamientos, construction loans, lot loans y first-time buyers que quieren poder hablar bien sus opciones.",
            accent: "from-amber-700 via-orange-600 to-rose-500",
          },
        ],
      },
      {
        title: "Business Lending",
        items: [
          {
            role: "Business Banker | VP",
            name: "Joseph Redzich",
            tagline:
              "Joseph es un gran contacto para duenos de negocio que necesitan a alguien capaz, estable y fuerte del lado bancario.",
            phone: "435-792-1227",
            email: "Joseph.Redzich@zionsbank.com",
            website: "zionsbank.com/personal/directory/business-bankers/joseph-redzich/",
            note: "Me gusta tener a Joseph aqui porque los duenos de negocio tambien necesitan relaciones reales, sobre todo cuando estan tomando decisiones financieras grandes y quieren hablar con alguien que si conoce ese mundo.",
            bestFor: "Muy buena opcion para working capital, lineas de credito, financiamiento de equipo y conversaciones de commercial real estate.",
            accent: "from-indigo-800 via-slate-800 to-blue-500",
          },
        ],
      },
      {
        title: "Other Services",
        items: [
          {
            role: "Entrenador de perros",
            name: "Robert Barlow",
            tagline:
              "Robert es de esos entrenadores que la gente recuerda porque de verdad se mete a ayudar tanto al perro como al dueno.",
            phone: "(385) 457-5699",
            email: "Robert@BHyvek9.com",
            website: "bhyvek9.com",
            note: "Recomiendo a Robert porque un buen entrenamiento cambia la vida diaria en casa, y el ofrece esa ayuda practica que la gente agradece cuando quiere ver resultados reales con su perro.",
            bestFor: "Muy buena opcion para private training, group classes, daycare, boarding, grooming y duenos que quieren apoyo real con su perro.",
            accent: "from-emerald-800 via-lime-700 to-amber-500",
          },
        ],
      },
    ],
    footerTitle: "Necesitan una recomendacion directa?",
    footerBody:
      "Si prefieres una introduccion en vez de escribirles en frio, con gusto te ayudo a hacer esa conexion.",
    introBadge: "Introduccion",
    introButton: "Pedir introduccion",
    introOpenTitle: "Dime con quien te gustaria hablar",
    introOpenBody:
      "Elige a la persona con la que quieres hablar, mandame tus datos basicos y yo doy seguimiento a la introduccion.",
    introChoiceLabel: "A quien te gustaria que te presentara?",
    introChoicePlaceholder: "Elige una persona",
    introNotesLabel: "Hay algo que deba saber antes de conectarlos?",
    introSubmit: "Enviar solicitud",
    introSuccess: "Gracias, tu solicitud de introduccion fue enviada.",
    introError: "Algo salio mal. Intentalo otra vez.",
    quickLinks: [
      {
        title: "Empezar una cotizacion",
        body: "Un buen lugar para empezar si tu cobertura cambio despues de una mudanza, compra o renovacion.",
        actionLabel: "Empezar aqui",
        page: PAGE_HOME,
        tone:
          "from-emerald-400/20 via-white to-amber-200/30 text-emerald-950 ring-emerald-200",
      },
      {
        title: "Conectar seguro actual",
        body: "Comparte tus polizas actuales de forma segura para revisar todo mas rapido.",
        actionLabel: "Conectar ahora",
        page: PAGE_CANOPY,
        tone: "from-sky-400/20 via-white to-cyan-200/30 text-slate-950 ring-sky-200",
      },
      {
        title: "Listas de Ready.gov",
        body: "Listas utiles para kits de emergencia, preparacion y recuperacion.",
        actionLabel: "Abrir Ready.gov",
        href: "https://www.ready.gov/",
        tone: "from-orange-300/25 via-white to-rose-200/30 text-slate-950 ring-orange-200",
      },
      {
        title: "Reemplazar documentos",
        body: "Util si se perdieron, robaron o danaron identificaciones o documentos importantes.",
        actionLabel: "Ver guia",
        href: "https://www.usa.gov/replace-vital-documents",
        tone: "from-violet-300/20 via-white to-fuchsia-200/25 text-slate-950 ring-violet-200",
      },
      {
        title: "Conoce al equipo",
        body: "Si te gusta saber con quien estas trabajando, este es un buen lugar para empezar.",
        actionLabel: "Ver equipo",
        page: PAGE_TEAM,
        tone: "from-slate-300/20 via-white to-slate-100 text-slate-950 ring-slate-200",
      },
      {
        title: "Seguir en Facebook",
        body: "Sigue novedades, contenido de la comunidad y lo que esta pasando en Oak & Compass.",
        actionLabel: "Seguir pagina",
        href: FACEBOOK_URL,
        tone: "from-emerald-300/20 via-white to-lime-200/25 text-slate-950 ring-emerald-200",
      },
    ],
    numbers: [
      {
        title: "Emergencias",
        number: "911",
        dial: "911",
        body: "Para peligro inmediato, emergencias medicas, incendios o situaciones urgentes.",
      },
      {
        title: "Linea 988",
        number: "988",
        dial: "988",
        body: "Apoyo 24/7 para crisis de salud mental por llamada o texto.",
      },
      {
        title: "Poison Control",
        number: "1-800-222-1222",
        dial: "18002221222",
        body: "Ayuda rapida de expertos para intoxicaciones o exposiciones.",
      },
      {
        title: "American Red Cross",
        number: "1-800-733-2767",
        dial: "18007332767",
        body: "Apoyo por desastres, refugios y orientacion para recuperacion.",
      },
      {
        title: "FEMA",
        number: "1-800-621-3362",
        dial: "18006213362",
        body: "Preguntas sobre asistencia federal antes o despues de un desastre declarado.",
      },
    ],
    carriers: [
      {
        name: "Progressive",
        phone: "1-888-671-4405",
        note: "Servicio al cliente",
      },
      {
        name: "Foremost",
        phone: "1-800-527-3905",
        note: "Servicio de poliza",
      },
      {
        name: "National General",
        phone: "1-888-293-5108",
        note: "Soporte al cliente",
      },
      {
        name: "American Modern",
        phone: "1-800-543-2644",
        note: "Servicio al cliente",
      },
      {
        name: "Homeowners of America",
        phone: "1-866-407-9896",
        note: "Servicios para asegurados",
      },
      {
        name: "Farmers",
        phone: "1-888-327-6335",
        note: "Atencion al cliente",
      },
      {
        name: "Bristol West",
        phone: "1-888-888-0080",
        note: "Servicio al cliente",
      },
      {
        name: "Travelers",
        phone: "1-800-252-4633",
        note: "Servicio al cliente",
      },
      {
        name: "Safeco",
        phone: "1-800-332-3226",
        note: "Servicio al cliente",
      },
    ],
    moments: [
      {
        title: "Despues de un accidente",
        body: "Respira, confirma que todos esten bien, documenta la escena y reune la informacion importante.",
        points: ["Revisa lesiones primero", "Toma fotos", "Guarda nombres y datos del seguro"],
      },
      {
        title: "Despues de dano por tormenta o agua",
        body: "Protege la propiedad si es seguro, guarda recibos y documenta todo desde el inicio.",
        points: ["Toma fotos rapido", "Evita dano adicional", "Lleva una linea de tiempo simple"],
      },
      {
        title: "Despues de una mudanza o cambio grande",
        body: "Los cambios grandes casi siempre significan revisar cobertura y confirmar que todo siga bien acomodado.",
        points: ["Actualiza direccion y vehiculos", "Revisa hogar o renta", "Confirma deducibles y limites"],
      },
    ],
  },
};

const TEAM_PAGE_COPY = {
  en: {
    badge: "Meet the team",
    headline: "Values first. People always. Coverage that serves real life.",
    subheadline:
      "Oak & Compass is built around a simple belief: insurance should feel human. We want people to feel understood, cared for, and confidently guided by a team that takes relationships seriously.",
    ownerLabel: "Why we do this",
    ownerTitle: "We want to help people feel steady in moments that can feel overwhelming",
    ownerBody:
      "Most people do not come looking for insurance because life feels simple. They come because they are protecting a home, a family, a car, a business, or a future they have worked hard to build. Oak & Compass exists to meet that responsibility with patience, honesty, and follow-through from a team that genuinely wants to help.",
    snapshotTitle: "What guides our team",
    snapshot: [
      { label: "People first", value: "We lead with care, clarity, and respect in every conversation." },
      { label: "No pressure", value: "Advice should feel helpful and honest, never pushy." },
      { label: "Real follow-through", value: "We stay present before, during, and after the quote." },
    ],
    galleryLabel: "The lives behind the work",
    galleryTitle: "The way we live shapes the way we serve people",
    galleryBody:
      "Oak & Compass is not just built from office hours and paperwork. It is shaped by family, time outdoors, discipline, community, and the kinds of everyday responsibilities that make protection matter. That real-life perspective is part of why our work stays grounded.",
    valuesLabel: "How that shows up",
    introTitle: "The team environment is meant to feel calm, supportive, and personal",
    introBody:
      "We want the experience of working with Oak & Compass to feel like being helped by good people who communicate clearly, care about getting it right, and treat your situation like it matters because it does.",
    values: [
      {
        title: "Clear and approachable",
        body: "Questions are welcome here. We explain things in plain language so people can make confident decisions without feeling rushed or talked down to.",
      },
      {
        title: "Grounded in real life",
        body: "We care about the day-to-day realities behind a policy because coverage is really about homes, families, routines, goals, and the people connected to them.",
      },
      {
        title: "Built on steady relationships",
        body: "Our goal is not to disappear after a form is submitted. We want to be the kind of team people feel good coming back to when life changes.",
      },
    ],
    teamLabel: "Our story",
    membersTitle: "Built around good people, shared values, and the way we want to serve",
    membersBody:
      "Oak & Compass was never meant to feel like one person at the center of everything. It is about building a team of good people who care about others, enjoy working together, and believe the best service comes from showing up with consistency, humility, and real heart.",
    hobbiesTitle: "The people behind Oak & Compass",
    hobbies: [
      "Family life",
      "Time outdoors",
      "Hiking and camping",
      "Running and discipline",
      "Games and shared interests",
      "Reading and curiosity",
      "Life with Deigo",
    ],
    expectationsTitle: "What it feels like to work together",
    expectations: [
      "A first conversation that feels straightforward, welcoming, and low-pressure.",
      "Coverage options explained clearly, with room for real questions and honest answers.",
      "A team that stays helpful and steady instead of disappearing once the paperwork starts.",
    ],
    primaryCta: "Start a Quote",
    secondaryCta: "Back to Home",
  },
  es: {
    badge: "Conoce al equipo",
    headline: "Valores primero. Personas siempre. Cobertura para la vida real.",
    subheadline:
      "Oak & Compass esta construido sobre una idea simple: el seguro debe sentirse humano. Queremos que las personas se sientan escuchadas, cuidadas y guiadas con confianza por un equipo que toma en serio las relaciones.",
    ownerLabel: "Por que hacemos esto",
    ownerTitle: "Queremos ayudar a la gente a sentirse mas tranquila en momentos que pueden ser pesados",
    ownerBody:
      "La mayoria de las personas no busca seguro porque la vida se sienta simple. Llegan porque estan protegiendo su hogar, su familia, su carro, su negocio o un futuro por el que han trabajado mucho. Oak & Compass existe para responder a esa responsabilidad con paciencia, honestidad y seguimiento real de parte de un equipo que de verdad quiere ayudar.",
    snapshotTitle: "Lo que guia a nuestro equipo",
    snapshot: [
      { label: "Personas primero", value: "Actuamos con cuidado, claridad y respeto en cada conversacion." },
      { label: "Sin presion", value: "La orientacion debe sentirse util y honesta, nunca forzada." },
      { label: "Seguimiento real", value: "Seguimos presentes antes, durante y despues de la cotizacion." },
    ],
    galleryLabel: "La vida detras del trabajo",
    galleryTitle: "La manera en que vivimos influye en la manera en que servimos",
    galleryBody:
      "Oak & Compass no esta hecho solo de oficina y papeles. Tambien esta formado por familia, tiempo afuera, disciplina, comunidad y las responsabilidades de todos los dias que hacen que la proteccion importe. Esa perspectiva real mantiene nuestro trabajo firme.",
    valuesLabel: "Como se nota",
    introTitle: "El ambiente del equipo debe sentirse tranquilo, cercano y atento",
    introBody:
      "Queremos que trabajar con Oak & Compass se sienta como recibir ayuda de buenas personas que explican bien, quieren hacer las cosas correctamente y tratan tu situacion como algo importante porque si lo es.",
    values: [
      {
        title: "Claro y facil de hablar",
        body: "Las preguntas son bienvenidas. Explicamos con palabras sencillas para que la gente pueda decidir con confianza y sin sentirse presionada.",
      },
      {
        title: "Con los pies en la vida real",
        body: "Nos importan las realidades diarias detras de una poliza porque la cobertura en verdad trata de hogares, familias, rutinas, metas y las personas conectadas a todo eso.",
      },
      {
        title: "Relaciones estables",
        body: "La meta no es desaparecer despues de enviar un formulario. Queremos ser el tipo de equipo al que la gente quiere volver cuando la vida cambia.",
      },
    ],
    teamLabel: "Nuestra historia",
    membersTitle: "Construido alrededor de buenas personas, valores compartidos y la forma en que queremos servir",
    membersBody:
      "Oak & Compass nunca fue pensado para sentirse como una sola persona en el centro de todo. Se trata de formar un equipo de buenas personas que de verdad se preocupan por los demas, disfrutan trabajar juntas y creen que el mejor servicio nace de responder con constancia, humildad y corazon.",
    hobbiesTitle: "Las personas detras de Oak & Compass",
    hobbies: [
      "Vida en familia",
      "Tiempo al aire libre",
      "Caminatas y campamento",
      "Correr y disciplina",
      "Juegos e intereses compartidos",
      "Lectura y curiosidad",
      "Tiempo con Deigo",
    ],
    expectationsTitle: "Como se siente trabajar juntos",
    expectations: [
      "Una primera conversacion mas simple, cercana y sin presion.",
      "Opciones explicadas con claridad y espacio para preguntas reales con respuestas honestas.",
      "Un equipo que sigue ayudando con firmeza en lugar de desaparecer cuando empieza el papeleo.",
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
];

const TEAM_MEMBERS = {
  en: [
    {
      name: "A people-first team",
      role: "Relationships matter here",
      bio: "We are building Oak & Compass around the idea that good service starts with genuinely caring about the person on the other side of the conversation.",
      highlights: ["Supportive", "Respectful", "Client-centered"],
    },
    {
      name: "A grounded culture",
      role: "Real lives shape our work",
      bio: "Family, community, the outdoors, discipline, and everyday responsibilities all shape how we show up: steady, practical, and aware that protection is personal.",
      highlights: ["Family-minded", "Grounded", "Thoughtful"],
    },
    {
      name: "A steady client experience",
      role: "How we want people to feel",
      bio: "Clear answers, honest help, and consistent follow-through are not extras to us. They are the standard for how a good team should work.",
      highlights: ["Clear communication", "Dependable", "Low-pressure"],
    },
  ],
  es: [
    {
      name: "Un equipo centrado en las personas",
      role: "Las relaciones importan aqui",
      bio: "Estamos formando Oak & Compass sobre la idea de que un buen servicio empieza al preocuparse de verdad por la persona que esta del otro lado de la conversacion.",
      highlights: ["Atentos", "Respetuosos", "Enfocados en el cliente"],
    },
    {
      name: "Una cultura con los pies en la tierra",
      role: "La vida real influye en nuestro trabajo",
      bio: "La familia, la comunidad, el aire libre, la disciplina y las responsabilidades diarias influyen en nuestra manera de responder: con calma, sentido practico y entendiendo que la proteccion es algo personal.",
      highlights: ["Familia", "Firmeza", "Buena atencion"],
    },
    {
      name: "Una experiencia estable para el cliente",
      role: "Como queremos que se sienta la gente",
      bio: "Respuestas claras, ayuda honesta y seguimiento constante no son extras para nosotros. Son la base de como debe trabajar un buen equipo.",
      highlights: ["Comunicacion clara", "Confiables", "Sin presion"],
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
  {
    id: "jewelry",
    key: "Jewelry",
    accent: "from-rose-300 via-pink-400 to-fuchsia-500",
    surface: "bg-[radial-gradient(circle_at_top_left,_rgba(253,164,175,0.30),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(217,70,239,0.26),_transparent_30%),linear-gradient(145deg,_#2a1020_0%,_#4a1838_44%,_#7a1f63_100%)]",
    chip: "from-rose-300/25 to-fuchsia-300/25",
    icon: "JW",
  },
  {
    id: "video-games",
    key: "Video Games",
    accent: "from-cyan-300 via-sky-400 to-indigo-500",
    surface: "bg-[radial-gradient(circle_at_top_left,_rgba(103,232,249,0.30),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.26),_transparent_28%),linear-gradient(145deg,_#071a2d_0%,_#12325d_44%,_#312e81_100%)]",
    chip: "from-cyan-300/25 to-indigo-300/25",
    icon: "VG",
  },
  {
    id: "records-music",
    key: "Records & Music",
    accent: "from-orange-300 via-amber-400 to-yellow-500",
    surface: "bg-[radial-gradient(circle_at_top_left,_rgba(253,186,116,0.30),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.24),_transparent_30%),linear-gradient(145deg,_#24140b_0%,_#4a250d_44%,_#7c4a12_100%)]",
    chip: "from-orange-300/25 to-yellow-300/25",
    icon: "RM",
  },
];

const COLLECTIBLES_PAGE_COPY = {
  en: {
    badge: "Collectibles Insurance",
    title: "Insurance for the collection you have spent real time building",
    body:
      "Choose what you collect and tell us a little about it. Whether it is cards, books, firearms, comics, coins, jewelry, video games, records, or personal memorabilia, we will use that to start a more thoughtful insurance conversation.",
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
      jewelry: {
        asset:
          "Rings, watches, necklaces, custom pieces, heirlooms, and fine jewelry where value can come from materials, craftsmanship, appraisals, and sentimental importance.",
        how:
          "Jewelry usually comes down to appraisals, documentation, and how specific pieces would be replaced if something happened, especially when the item is one of a kind.",
      },
      "video-games": {
        asset:
          "Retro games, sealed games, consoles, handhelds, collector editions, and complete-in-box pieces where condition and originality can change value quickly.",
        how:
          "For game collections, documentation, condition, storage, and whether pieces are sealed, complete, or especially rare all help shape a more realistic coverage conversation.",
      },
      "records-music": {
        asset:
          "Vinyl records, box sets, signed albums, rare pressings, audio collectibles, and music memorabilia where condition and pressing details can matter a lot.",
        how:
          "With records and music collectibles, the important part is understanding rarity, condition, documentation, and whether there are standout pieces that would be hard to replace.",
      },
    },
  },
  es: {
    badge: "Seguro para coleccionables",
    title: "Seguro para la coleccion que te ha tomado tiempo construir",
    body:
      "Elige lo que coleccionas y cuentanos un poco sobre ello. Ya sean tarjetas, libros, armas, comics, monedas, joyeria, videojuegos, discos o recuerdos personales, eso nos ayuda a empezar una conversacion mas util sobre como protegerlo.",
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
      jewelry: {
        asset:
          "Anillos, relojes, collares, piezas personalizadas, reliquias familiares y joyeria fina cuyo valor puede venir de los materiales, el trabajo, los avaluos y el valor sentimental.",
        how:
          "La joyeria casi siempre depende de avaluos, documentacion y de como se reemplazaria cada pieza si pasara algo, especialmente cuando el articulo es unico.",
      },
      "video-games": {
        asset:
          "Videojuegos retro, juegos sellados, consolas, handhelds, ediciones de coleccionista y piezas completas en caja donde la condicion y la originalidad cambian mucho el valor.",
        how:
          "En videojuegos, la documentacion, la condicion, el almacenamiento y si las piezas estan selladas, completas o son especialmente raras ayudan a tener una conversacion mas realista sobre cobertura.",
      },
      "records-music": {
        asset:
          "Discos de vinilo, box sets, albums firmados, ediciones raras, coleccionables de audio y memorabilia musical donde la condicion y el prensado importan mucho.",
        how:
          "Con discos y coleccionables musicales, lo importante es entender la rareza, la condicion, la documentacion y si hay piezas destacadas que serian dificiles de reemplazar.",
      },
    },
  },
};

function getPageFromHash(hash) {
  const value = hash.replace(/^#/, "").trim().toLowerCase();

  if (value === PAGE_TEAM) return PAGE_TEAM;
  if (value === PAGE_JOBS) return PAGE_JOBS;
  if (value === PAGE_COLLECTIBLES) return PAGE_COLLECTIBLES;
  if (value === PAGE_RESOURCES) return PAGE_RESOURCES;
  if (value === PAGE_CANOPY) return PAGE_CANOPY;
  if (value === PAGE_PORTAL) return PAGE_PORTAL;
  return PAGE_HOME;
}

function getPageShellClassName(easterMode, baseClassName = "bg-slate-50 text-slate-900") {
  return easterMode
    ? `min-h-screen !bg-[radial-gradient(circle_at_top_left,_rgba(253,224,71,0.45),_transparent_22%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.35),_transparent_24%),radial-gradient(circle_at_20%_80%,_rgba(96,165,250,0.28),_transparent_20%),radial-gradient(circle_at_80%_75%,_rgba(134,239,172,0.32),_transparent_24%),linear-gradient(180deg,_#fff7ed_0%,_#fff1f2_28%,_#f5f3ff_56%,_#ecfeff_78%,_#f0fdf4_100%)] !text-rose-950 ${baseClassName}`
    : `min-h-screen ${baseClassName}`;
}

function getEasterPanelClassName(easterMode, fallbackClassName) {
  return easterMode
    ? "border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(254,240,138,0.65),rgba(251,207,232,0.62),rgba(191,219,254,0.72))] text-rose-950 shadow-[0_28px_80px_-36px_rgba(236,72,153,0.45)] backdrop-blur"
    : fallbackClassName;
}

function getEasterSoftCardClassName(easterMode, fallbackClassName) {
  return easterMode
    ? "border border-pink-100 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(254,249,195,0.92),rgba(224,231,255,0.88))] text-rose-950 shadow-[0_18px_55px_-32px_rgba(59,130,246,0.35)]"
    : fallbackClassName;
}

function getEasterPrimaryButtonClassName(easterMode, fallbackClassName) {
  return easterMode
    ? "rounded-full bg-[linear-gradient(135deg,#f97316_0%,#ec4899_45%,#8b5cf6_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_-16px_rgba(236,72,153,0.65)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-18px_rgba(124,58,237,0.58)]"
    : fallbackClassName;
}

function getEasterSecondaryButtonClassName(easterMode, fallbackClassName) {
  return easterMode
    ? "rounded-full border border-pink-200 bg-white/90 px-6 py-3 text-sm font-semibold text-rose-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-pink-50"
    : fallbackClassName;
}

function getEasterPillClassName(easterMode, fallbackClassName) {
  return easterMode
    ? "rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-semibold text-rose-700 shadow-[0_10px_25px_-18px_rgba(236,72,153,0.5)] backdrop-blur"
    : fallbackClassName;
}

function getEasterInputClassName(easterMode, fallbackClassName) {
  return easterMode
    ? "w-full rounded-2xl border border-pink-200 bg-white/95 px-4 py-3 text-rose-950 outline-none transition focus:border-fuchsia-400 focus:ring-4 focus:ring-pink-100"
    : fallbackClassName;
}

function EasterDecor() {
  const fallingEggs = [
    { left: "6%", delay: "0s", duration: "11s", size: "text-3xl", rotate: "-8deg" },
    { left: "18%", delay: "1.4s", duration: "9.5s", size: "text-2xl", rotate: "12deg" },
    { left: "29%", delay: "3.1s", duration: "10.8s", size: "text-4xl", rotate: "-4deg" },
    { left: "43%", delay: "0.8s", duration: "8.9s", size: "text-2xl", rotate: "10deg" },
    { left: "58%", delay: "2.2s", duration: "11.4s", size: "text-3xl", rotate: "-10deg" },
    { left: "71%", delay: "4s", duration: "9.8s", size: "text-2xl", rotate: "8deg" },
    { left: "84%", delay: "1.9s", duration: "10.6s", size: "text-4xl", rotate: "-6deg" },
  ];
  const parade = [
    { icon: "🐰", delay: "0s" },
    { icon: "🥚", delay: "1.2s" },
    { icon: "🐇", delay: "2.4s" },
    { icon: "🐣", delay: "3.6s" },
    { icon: "🥕", delay: "4.8s" },
    { icon: "🌷", delay: "6s" },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes easter-fall {
          0% { transform: translate3d(0,-16vh,0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.95; }
          100% { transform: translate3d(2vw,118vh,0) rotate(220deg); opacity: 0; }
        }

        @keyframes easter-parade {
          0% { transform: translateX(-16vw) translateY(0); }
          20% { transform: translateX(8vw) translateY(-4px); }
          40% { transform: translateX(32vw) translateY(0); }
          60% { transform: translateX(56vw) translateY(-5px); }
          80% { transform: translateX(80vw) translateY(0); }
          100% { transform: translateX(108vw) translateY(-3px); }
        }

        @keyframes easter-wiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(6deg) scale(1.05); }
        }
      `}</style>

      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_72%)]" />
      <div className="absolute left-[4%] top-20 text-4xl opacity-80 animate-bounce">🐰</div>
      <div className="absolute left-[12%] top-36 h-20 w-14 rounded-[999px] bg-[linear-gradient(180deg,#f9a8d4_0%,#fef3c7_100%)] shadow-[inset_0_-12px_0_rgba(255,255,255,0.45)]" />
      <div className="absolute left-[12.75%] top-[9.8rem] h-2 w-8 rounded-full bg-white/70" />
      <div className="absolute left-[17%] top-56 text-3xl opacity-75">🥚</div>
      <div className="absolute left-[24%] top-24 text-2xl opacity-75">🌼</div>
      <div className="absolute right-[8%] top-24 text-5xl opacity-80 animate-bounce">🐇</div>
      <div className="absolute right-[18%] top-44 h-16 w-12 rounded-[999px] bg-[linear-gradient(180deg,#93c5fd_0%,#ddd6fe_100%)] shadow-[inset_0_-10px_0_rgba(255,255,255,0.45)]" />
      <div className="absolute right-[18.6%] top-[11.9rem] h-2 w-6 rounded-full bg-white/70" />
      <div className="absolute right-[28%] top-60 text-3xl opacity-75">🥕</div>
      <div className="absolute bottom-28 left-[8%] text-4xl opacity-75">🐣</div>
      <div className="absolute bottom-24 left-[16%] h-16 w-11 rounded-[999px] bg-[linear-gradient(180deg,#fde68a_0%,#fdba74_100%)] shadow-[inset_0_-10px_0_rgba(255,255,255,0.45)]" />
      <div className="absolute bottom-[7.4rem] left-[16.5%] h-2 w-6 rounded-full bg-white/70" />
      <div className="absolute bottom-20 right-[12%] h-20 w-14 rounded-[999px] bg-[linear-gradient(180deg,#86efac_0%,#bfdbfe_100%)] shadow-[inset_0_-12px_0_rgba(255,255,255,0.45)]" />
      <div className="absolute bottom-[6.2rem] right-[12.8%] h-2 w-8 rounded-full bg-white/70" />
      <div className="absolute bottom-28 right-[24%] text-4xl opacity-80">🐰</div>
      <div className="absolute bottom-14 left-[28%] text-2xl opacity-70">🌷</div>
      <div className="absolute bottom-12 right-[34%] text-2xl opacity-70">🌸</div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(134,239,172,0.4),_transparent_62%)]" />

      {fallingEggs.map((egg) => (
        <div
          key={`${egg.left}-${egg.delay}`}
          className={`absolute top-0 ${egg.size} opacity-90`}
          style={{
            left: egg.left,
            transform: `rotate(${egg.rotate})`,
            animation: `easter-fall ${egg.duration} linear infinite`,
            animationDelay: egg.delay,
          }}
        >
          🥚
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-3 h-20 overflow-hidden">
        {parade.map((item, index) => (
          <div
            key={`${item.icon}-${index}`}
            className="absolute bottom-0 text-4xl"
            style={{
              left: "-18vw",
              animation: "easter-parade 14s linear infinite",
              animationDelay: item.delay,
            }}
          >
            <span
              className="inline-block"
              style={{
                animation: "easter-wiggle 1.4s ease-in-out infinite",
                animationDelay: item.delay,
              }}
            >
              {item.icon}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SiteHeader({
  language,
  activePage,
  onNavigate,
  onLanguageChange,
  easterMode,
  onToggleEaster,
}) {
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
          className={easterMode
            ? "inline-flex items-center justify-center rounded-full border border-pink-100 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(254,249,195,0.88),rgba(251,207,232,0.82))] p-2 text-sm font-medium text-rose-700 shadow-[0_18px_35px_-18px_rgba(236,72,153,0.5)] transition hover:-translate-y-0.5"
            : "inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white/92 p-2 text-sm font-medium text-emerald-800 shadow-sm transition hover:-translate-y-0.5"}
          aria-label="Open Oak & Compass brand details"
        >
          <img
            src="/logo.png"
            alt="Oak & Compass Insurance logo"
            className="h-24 w-24 rounded-full object-contain md:h-28 md:w-28"
          />
        </button>

        <div className="hidden items-center gap-3 md:flex">
          <nav className={easterMode
            ? "items-center gap-2 rounded-full border border-pink-100 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(254,249,195,0.8),rgba(224,231,255,0.85))] p-1 shadow-[0_16px_35px_-20px_rgba(236,72,153,0.45)] backdrop-blur md:flex"
            : "items-center gap-2 rounded-full border border-white/70 bg-white/80 p-1 shadow-sm backdrop-blur md:flex"}>
            <button
              type="button"
              onClick={() => onNavigate(PAGE_HOME)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activePage === PAGE_HOME
                  ? easterMode
                    ? "bg-[linear-gradient(135deg,#fb7185_0%,#a855f7_100%)] text-white"
                    : "bg-slate-900 text-white"
                  : easterMode
                    ? "text-rose-700 hover:bg-white/70"
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
                  ? easterMode
                    ? "bg-[linear-gradient(135deg,#fb7185_0%,#a855f7_100%)] text-white"
                    : "bg-slate-900 text-white"
                  : easterMode
                    ? "text-rose-700 hover:bg-white/70"
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
                  ? easterMode
                    ? "bg-[linear-gradient(135deg,#fb7185_0%,#a855f7_100%)] text-white"
                    : "bg-slate-900 text-white"
                  : easterMode
                    ? "text-rose-700 hover:bg-white/70"
                    : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {nav.collectibles}
            </button>
            <button
              type="button"
              onClick={() => onNavigate(PAGE_RESOURCES)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activePage === PAGE_RESOURCES
                  ? easterMode
                    ? "bg-[linear-gradient(135deg,#fb7185_0%,#a855f7_100%)] text-white"
                    : "bg-slate-900 text-white"
                  : easterMode
                    ? "text-rose-700 hover:bg-white/70"
                    : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {nav.resources}
            </button>
          </nav>

          <div className={easterMode
            ? "flex items-center gap-1 rounded-full border border-pink-100 bg-white/85 p-1 shadow-[0_16px_35px_-20px_rgba(236,72,153,0.45)] backdrop-blur"
            : "flex items-center gap-1 rounded-full border border-white/70 bg-white/80 p-1 shadow-sm backdrop-blur"}>
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                language === "en"
                  ? easterMode
                    ? "bg-[linear-gradient(135deg,#fb7185_0%,#a855f7_100%)] text-white"
                    : "bg-slate-900 text-white"
                  : easterMode
                    ? "text-rose-700 hover:bg-pink-50"
                    : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("es")}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                language === "es"
                  ? easterMode
                    ? "bg-[linear-gradient(135deg,#fb7185_0%,#a855f7_100%)] text-white"
                    : "bg-slate-900 text-white"
                  : easterMode
                    ? "text-rose-700 hover:bg-pink-50"
                    : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              ES
            </button>
          </div>
        </div>

        <nav className={easterMode
          ? "fixed inset-x-4 bottom-4 z-20 flex flex-wrap items-center justify-center gap-2 rounded-full border border-pink-100 bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(254,249,195,0.9),rgba(224,231,255,0.88))] p-2 shadow-[0_18px_40px_-18px_rgba(236,72,153,0.45)] backdrop-blur md:hidden"
          : "fixed inset-x-4 bottom-4 z-20 flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/70 bg-white/95 p-2 shadow-lg backdrop-blur md:hidden"}>
          <button
            type="button"
            onClick={() => onNavigate(PAGE_HOME)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activePage === PAGE_HOME
                ? easterMode
                  ? "bg-[linear-gradient(135deg,#fb7185_0%,#a855f7_100%)] text-white"
                  : "bg-slate-900 text-white"
                : easterMode
                  ? "text-rose-700 hover:bg-white/70"
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
                ? easterMode
                  ? "bg-[linear-gradient(135deg,#fb7185_0%,#a855f7_100%)] text-white"
                  : "bg-slate-900 text-white"
                : easterMode
                  ? "text-rose-700 hover:bg-white/70"
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
                ? easterMode
                  ? "bg-[linear-gradient(135deg,#fb7185_0%,#a855f7_100%)] text-white"
                  : "bg-slate-900 text-white"
                : easterMode
                  ? "text-rose-700 hover:bg-white/70"
                  : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {nav.collectibles}
          </button>
          <button
            type="button"
            onClick={() => onNavigate(PAGE_RESOURCES)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activePage === PAGE_RESOURCES
                ? easterMode
                  ? "bg-[linear-gradient(135deg,#fb7185_0%,#a855f7_100%)] text-white"
                  : "bg-slate-900 text-white"
                : easterMode
                  ? "text-rose-700 hover:bg-white/70"
                  : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {nav.resources}
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange(language === "en" ? "es" : "en")}
            className={easterMode
              ? "rounded-full border border-pink-200 bg-white/90 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-pink-50"
              : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"}
          >
            {language === "en" ? "ES" : "EN"}
          </button>
        </nav>
      </header>

      <button
        type="button"
        onClick={onToggleEaster}
        className={`fixed bottom-24 right-4 z-30 flex h-16 w-12 items-center justify-center rounded-[55%_55%_50%_50%/62%_62%_42%_42%] border shadow-[0_18px_40px_-20px_rgba(15,23,42,0.45)] transition hover:-translate-y-1 hover:rotate-3 md:bottom-6 md:right-6 ${
          easterMode
            ? "border-pink-100 bg-[linear-gradient(180deg,#fef3c7_0%,#f9a8d4_45%,#c4b5fd_100%)] text-pink-700"
            : "border-amber-100 bg-[linear-gradient(180deg,#fffef7_0%,#fde68a_100%)] text-amber-700"
        }`}
        aria-label="Toggle Easter theme"
        title="A little spring surprise"
      >
        <span className="pointer-events-none relative block h-10 w-7 rounded-[55%_55%_50%_50%/62%_62%_42%_42%] bg-white/30">
          <span className="absolute left-1.5 top-2 h-1.5 w-1.5 rounded-full bg-pink-300/80" />
          <span className="absolute right-1.5 top-4 h-1.5 w-1.5 rounded-full bg-sky-300/80" />
          <span className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
        </span>
      </button>

      {isBrandModalOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/55 px-4 py-6">
          <div className={easterMode
            ? "relative w-full max-w-lg rounded-[2rem] border border-pink-100 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(254,249,195,0.92),rgba(251,207,232,0.86),rgba(224,231,255,0.9))] p-6 shadow-2xl ring-1 ring-pink-100 md:p-8"
            : "relative w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200 md:p-8"}>
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
                Follow along on Facebook and pick up a quick insurance tip while you are here.
              </p>
            </div>

            <div className={easterMode
              ? "mt-6 rounded-[1.5rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(254,240,138,0.55),rgba(191,219,254,0.55))] p-5 ring-1 ring-pink-100"
              : "mt-6 rounded-[1.5rem] bg-emerald-50 p-5 ring-1 ring-emerald-100"}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Insurance Fact
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{facts[factIndex]}</p>
              <button
                type="button"
                onClick={() => setFactIndex((current) => (current + 1) % facts.length)}
                className={easterMode
                  ? "mt-4 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-pink-50"
                  : "mt-4 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"}
              >
                Another quick fact
              </button>
            </div>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className={easterMode
                ? "mt-6 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#f97316_0%,#ec4899_45%,#8b5cf6_100%)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                : "mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"}
            >
              Follow on Facebook
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

  if (themeId === "jewelry") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden text-white/[0.26]"
      >
        <svg viewBox="0 0 1440 900" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path strokeWidth="2.8" d="M324 60H1116L1214 158V742L1116 840H324L226 742V158L324 60Z" />
            <path strokeWidth="2.2" d="M369 103H1071L1169 201V699L1071 797H369L271 699V201L369 103Z" />
            <path strokeWidth="4.2" d="M720 190L845 314L720 438L595 314L720 190Z" />
            <path strokeWidth="3" d="M720 190V438" />
            <path strokeWidth="3" d="M595 314H845" />
            <path strokeWidth="2.8" d="M532 621C532 550 617 492 720 492C822 492 908 550 908 621" />
            <path strokeWidth="2.2" d="M577 621C577 571 641 531 720 531C798 531 863 571 863 621" />
            <path strokeWidth="2.4" d="M463 734C538 776 623 797 720 797C816 797 902 776 976 734" />
            <path strokeWidth="2.4" d="M498 184C560 142 633 120 720 120C806 120 882 142 942 184" />
          </g>
        </svg>
      </div>
    );
  }

  if (themeId === "video-games") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden text-white/[0.26]"
      >
        <svg viewBox="0 0 1440 900" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path strokeWidth="2.8" d="M324 60H1116L1214 158V742L1116 840H324L226 742V158L324 60Z" />
            <path strokeWidth="2.2" d="M369 103H1071L1169 201V699L1071 797H369L271 699V201L369 103Z" />
            <path strokeWidth="4.2" d="M507 551C507 489 556 439 617 439H823C884 439 933 489 933 551C933 609 886 656 829 656H611C554 656 507 609 507 551Z" />
            <path strokeWidth="2.6" d="M608 548H667" />
            <path strokeWidth="2.6" d="M637 519V577" />
            <circle cx="782" cy="530" r="14" strokeWidth="2.4" />
            <circle cx="836" cy="566" r="14" strokeWidth="2.4" />
            <path strokeWidth="2.4" d="M547 634C601 685 659 711 720 711C780 711 842 685 896 634" />
            <path strokeWidth="2.4" d="M488 224C557 168 634 141 720 141C805 141 886 168 952 224" />
          </g>
        </svg>
      </div>
    );
  }

  if (themeId === "records-music") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden text-white/[0.26]"
      >
        <svg viewBox="0 0 1440 900" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path strokeWidth="2.8" d="M324 60H1116L1214 158V742L1116 840H324L226 742V158L324 60Z" />
            <path strokeWidth="2.2" d="M369 103H1071L1169 201V699L1071 797H369L271 699V201L369 103Z" />
            <path strokeWidth="4.2" d="M720 530C720 419 810 329 921 329C1032 329 1122 419 1122 530C1122 641 1032 731 921 731C810 731 720 641 720 530Z" />
            <path strokeWidth="2.8" d="M786 530C786 456 847 395 921 395C995 395 1056 456 1056 530C1056 604 995 665 921 665C847 665 786 604 786 530Z" />
            <path strokeWidth="2.6" d="M921 329V213" />
            <path strokeWidth="2.6" d="M921 213H997" />
            <path strokeWidth="2.6" d="M998 213V426" />
            <path strokeWidth="2.4" d="M523 681C591 739 657 768 720 768" />
            <path strokeWidth="2.4" d="M494 224C560 168 634 141 720 141" />
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

function CollectibleThemeTileArt({ themeId }) {
  if (themeId === "trading-cards") {
    return (
      <div className="relative h-11 w-14 text-white/95 transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[3deg] group-hover:scale-105">
        <div className="absolute left-1 top-2 h-7 w-9 rounded-lg border border-white/75 bg-white/10 transition duration-300 group-hover:-translate-x-1 group-hover:-rotate-6" />
        <div className="absolute right-1 top-1 h-8 w-10 rounded-lg border border-white bg-white/15 transition duration-300 group-hover:translate-x-1 group-hover:rotate-6" />
        <div className="absolute left-5 top-4 h-2.5 w-2.5 rounded-full border border-white/85" />
      </div>
    );
  }

  if (themeId === "books") {
    return (
      <div className="relative h-11 w-14 text-white/95 transition duration-300 group-hover:scale-105">
        <div className="absolute left-2 top-2 h-8 w-4 rounded-l-md border border-white bg-white/10 transition duration-300 group-hover:-translate-x-1.5 group-hover:-rotate-6" />
        <div className="absolute right-2 top-2 h-8 w-4 rounded-r-md border border-white bg-white/14 transition duration-300 group-hover:translate-x-1.5 group-hover:rotate-6" />
        <div className="absolute left-1/2 top-2 h-8 w-px -translate-x-1/2 bg-white/70" />
      </div>
    );
  }

  if (themeId === "firearms") {
    return (
      <div className="relative h-11 w-14 text-white/95 transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
        <div className="absolute inset-x-1 bottom-2 h-4 rounded-md border border-white bg-white/10" />
        <div className="absolute left-4 top-3 h-3 w-6 rounded-sm border border-white bg-white/12" />
        <div className="absolute left-9 top-4 h-1 w-4 rounded-full bg-white/85 transition duration-300 group-hover:w-5" />
        <div className="absolute left-3 bottom-0 h-5 w-5 rounded-full border border-white" />
        <div className="absolute right-3 bottom-0 h-5 w-5 rounded-full border border-white" />
      </div>
    );
  }

  if (themeId === "comics") {
    return (
      <div className="relative h-11 w-14 text-white/95 transition duration-300 group-hover:scale-105 group-hover:rotate-[2deg]">
        <div className="absolute left-2 top-2 h-7 w-10 rounded-[1rem] border border-white bg-white/12 transition duration-300 group-hover:-translate-y-1" />
        <div className="absolute left-5 top-8 h-3 w-3 rotate-45 border-b border-r border-white bg-white/12 transition duration-300 group-hover:translate-y-0.5" />
        <div className="absolute left-5 top-4 h-1 w-4 rounded-full bg-white/85" />
        <div className="absolute left-5 top-6 h-1 w-6 rounded-full bg-white/65" />
      </div>
    );
  }

  if (themeId === "coins") {
    return (
      <div className="relative h-11 w-14 text-white/95 transition duration-300 group-hover:scale-105">
        <div className="absolute left-2 top-4 h-5 w-5 rounded-full border border-white bg-white/10 transition duration-300 group-hover:-translate-y-1" />
        <div className="absolute left-6 top-2 h-6 w-6 rounded-full border border-white bg-white/16 transition duration-300 group-hover:-translate-y-0.5" />
        <div className="absolute right-2 top-5 h-4.5 w-4.5 rounded-full border border-white bg-white/10 transition duration-300 group-hover:-translate-y-1.5" />
      </div>
    );
  }

  if (themeId === "memorabilia") {
    return (
      <div className="relative h-11 w-14 text-white/95 transition duration-300 group-hover:scale-105 group-hover:-translate-y-0.5">
        <div className="absolute left-4 top-2 h-4 w-6 rounded-b-full border border-white bg-white/12" />
        <div className="absolute left-[1.35rem] top-6 h-2.5 w-7 border-x border-white" />
        <div className="absolute left-5 top-[2.1rem] h-2 w-5 rounded-sm border border-white bg-white/10" />
        <div className="absolute left-4.5 bottom-1 h-1.5 w-6 rounded-full bg-white/75" />
      </div>
    );
  }

  if (themeId === "jewelry") {
    return (
      <div className="relative h-11 w-14 text-white/95 transition duration-300 group-hover:scale-110">
        <div className="absolute left-1/2 top-1 h-7 w-7 -translate-x-1/2 rotate-45 rounded-sm border border-white bg-white/10 transition duration-300 group-hover:-translate-y-1" />
        <div className="absolute left-1/2 top-8 h-2.5 w-8 -translate-x-1/2 rounded-full border border-white bg-white/8 transition duration-300 group-hover:scale-110" />
      </div>
    );
  }

  if (themeId === "video-games") {
    return (
      <div className="relative h-11 w-14 text-white/95 transition duration-300 group-hover:scale-105">
        <div className="absolute inset-x-2 top-3 h-6 rounded-[999px] border border-white bg-white/10 transition duration-300 group-hover:-translate-y-0.5" />
        <div className="absolute left-5 top-[1.35rem] h-3 w-3 rounded-sm border border-white/80">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/80" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/80" />
        </div>
        <div className="absolute right-5 top-[1.55rem] h-1.5 w-1.5 rounded-full bg-white/90" />
        <div className="absolute right-3 top-[1.35rem] h-1.5 w-1.5 rounded-full bg-white/70" />
      </div>
    );
  }

  if (themeId === "records-music") {
    return (
      <div className="relative h-11 w-14 text-white/95 transition duration-300 group-hover:scale-105 group-hover:rotate-[8deg]">
        <div className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white/10" />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white/20" />
        <div className="absolute right-1 top-2 h-6 w-px bg-white/80 transition duration-300 group-hover:h-7" />
        <div className="absolute right-1 top-2 h-1.5 w-3 rounded-full border border-white/80 bg-white/10" />
      </div>
    );
  }

  return (
    <div className="relative h-11 w-14 text-white/95 transition duration-300 group-hover:scale-105">
      <div className="absolute inset-x-2 top-2 h-7 rounded-2xl border border-white bg-white/10" />
    </div>
  );
}


function TeamPage({ language, onNavigate, onLanguageChange, easterMode, onToggleEaster }) {
  const teamText = TEAM_PAGE_COPY[language];
  const teamMembers = TEAM_MEMBERS[language] || TEAM_MEMBERS.en;

  return (
    <div className={getPageShellClassName(easterMode, "text-slate-900")} lang={language}>
      <section className="relative overflow-hidden pb-16">
        <div className={easterMode
          ? "absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(253,224,71,0.4),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.32),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(96,165,250,0.24),_transparent_28%),linear-gradient(180deg,_#fff7ed_0%,_#fff1f2_40%,_#ecfeff_100%)]"
          : "absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.16),_transparent_32%),linear-gradient(180deg,_#f7fbf8_0%,_#ffffff_56%,_#f8fafc_100%)]"} />
        {easterMode ? <EasterDecor /> : null}
        <ForestLandscapeBackground />

        <SiteHeader
          language={language}
          activePage={PAGE_TEAM}
          onNavigate={onNavigate}
          onLanguageChange={onLanguageChange}
          easterMode={easterMode}
          onToggleEaster={onToggleEaster}
        />

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
                className={getEasterPrimaryButtonClassName(easterMode, "rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90")}
                >
                  {teamText.primaryCta}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(PAGE_HOME)}
                className={getEasterSecondaryButtonClassName(easterMode, "rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50")}
                >
                  {teamText.secondaryCta}
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              <div className={`rounded-[2rem] p-6 ${getEasterPanelClassName(easterMode, "border border-white/70 bg-white/90 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.4)]")}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {teamText.snapshotTitle}
                </p>
                <div className="mt-5 grid gap-3">
                  {teamText.snapshot.map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-3xl px-4 py-4 ${getEasterSoftCardClassName(easterMode, "bg-slate-50 ring-1 ring-slate-200")}`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-[2rem] p-6 ${getEasterPanelClassName(easterMode, "border border-white/70 bg-white/90 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.4)]")}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {teamText.valuesLabel}
                </p>
                <div className="mt-5 grid gap-4">
                  {teamText.values.map((value) => (
                    <div
                      key={value.title}
                      className={`rounded-3xl p-5 ${getEasterSoftCardClassName(easterMode, "bg-slate-50 ring-1 ring-slate-200")}`}
                    >
                      <h2 className="text-lg font-semibold text-slate-900">{value.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{value.body}</p>
                    </div>
                  ))}
                </div>
              </div>
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

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
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
  onLanguageChange,
  easterMode,
  onToggleEaster,
}) {
  const pageText = COLLECTIBLES_PAGE_COPY[language] || COLLECTIBLES_PAGE_COPY.en;
  const activeTheme =
    COLLECTIBLE_THEMES.find((theme) => theme.key === form.collectibleType) || COLLECTIBLE_THEMES[0];
  const activeThemeDetails =
    pageText.themeDetails?.[activeTheme.id] || COLLECTIBLES_PAGE_COPY.en.themeDetails[activeTheme.id];
  const submittedCollectibles = isSubmitted && submittedInquiryType === "collectibles";
  const dragonSurface = "bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(248,113,113,0.24),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.18),_transparent_26%),linear-gradient(145deg,_#14060a_0%,_#3f0a16_42%,_#7c2d12_100%)]";

  return (
    <div
      className={`min-h-screen ${easterMode ? "bg-[linear-gradient(180deg,_#fff7ed_0%,_#fff1f2_48%,_#f0fdf4_100%)] text-rose-950" : `text-white ${submittedCollectibles ? dragonSurface : activeTheme.surface}`}`}
      lang={language}
    >
      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_28%)]" />
        {easterMode ? <EasterDecor /> : null}
        {submittedCollectibles ? (
          <CollectiblesDragonSuccessBackground />
        ) : (
          <CollectiblesSceneBackground themeId={activeTheme.id} />
        )}

        <div className="relative">
          <SiteHeader
            language={language}
            activePage={PAGE_COLLECTIBLES}
            onNavigate={onNavigate}
            onLanguageChange={onLanguageChange}
            easterMode={easterMode}
            onToggleEaster={onToggleEaster}
          />

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
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {COLLECTIBLE_THEMES.map((theme) => {
                      const selected = form.collectibleType === theme.key;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => onChange({ target: { name: "collectibleType", value: theme.key } })}
                          className={`group rounded-[1.35rem] border p-3.5 text-left transition ${
                            selected
                              ? "border-white/40 bg-white/18 shadow-[0_20px_60px_-28px_rgba(255,255,255,0.4)]"
                              : "border-white/10 bg-white/8 hover:-translate-y-1 hover:border-white/25 hover:bg-white/12"
                          }`}
                        >
                          <div className={`inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-br ${theme.accent} shadow-lg`}>
                            <CollectibleThemeTileArt themeId={theme.id} />
                          </div>
                          <h2 className="mt-3 text-sm font-semibold leading-5 sm:text-base">{theme.key}</h2>
                          <div className={`mt-3 h-1.5 rounded-full bg-gradient-to-r ${theme.accent} opacity-90 transition duration-300 group-hover:opacity-100`} />
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
  onLanguageChange,
  easterMode,
  onToggleEaster,
}) {
  return (
    <div className={getPageShellClassName(easterMode, "text-slate-900")} lang={language}>
      <section className="relative overflow-hidden pb-16">
        <div className={easterMode
          ? "absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(253,224,71,0.42),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.32),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.24),_transparent_30%),linear-gradient(180deg,_#fff7ed_0%,_#fff1f2_44%,_#ecfeff_100%)]"
          : "absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.16),_transparent_32%),linear-gradient(180deg,_#f7fbf8_0%,_#ffffff_56%,_#f8fafc_100%)]"} />
        {easterMode ? <EasterDecor /> : null}
        <ForestLandscapeBackground />

        <SiteHeader
          language={language}
          activePage={PAGE_JOBS}
          onNavigate={onNavigate}
          onLanguageChange={onLanguageChange}
          easterMode={easterMode}
          onToggleEaster={onToggleEaster}
        />

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
                    className={getEasterPillClassName(easterMode, "rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200")}
                  >
                    {point}
                  </span>
                ))}
              </div>

              <div className={`mt-8 rounded-[2rem] p-6 ${getEasterPanelClassName(easterMode, "bg-white/90 shadow-sm ring-1 ring-slate-200")}`}>
                <h2 className="text-xl font-semibold text-slate-900">{text.jobTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text.jobIntro}</p>
              </div>
            </div>

            <div className={`rounded-3xl p-6 md:p-8 ${getEasterPanelClassName(easterMode, "bg-white shadow-xl ring-1 ring-slate-200")}`}>
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
                      className={getEasterInputClassName(easterMode, "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500")}
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
                      className={getEasterInputClassName(easterMode, "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500")}
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
                      className={getEasterInputClassName(easterMode, "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500")}
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
                      className={getEasterInputClassName(easterMode, "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500")}
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
                    className={getEasterInputClassName(easterMode, "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500")}
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

function InsuranceConnectPage({
  language,
  onNavigate,
  onLanguageChange,
  easterMode,
  onToggleEaster,
}) {
  const text = COPY[language];

  return (
    <div className={getPageShellClassName(easterMode, "text-slate-900")} lang={language}>
      <section className="relative overflow-hidden pb-16">
        <div className={easterMode
          ? "absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(253,224,71,0.42),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.32),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.24),_transparent_30%),linear-gradient(180deg,_#fff7ed_0%,_#fff1f2_44%,_#ecfeff_100%)]"
          : "absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.16),_transparent_32%),linear-gradient(180deg,_#f7fbf8_0%,_#ffffff_56%,_#f8fafc_100%)]"} />
        {easterMode ? <EasterDecor /> : null}
        <ForestLandscapeBackground />

        <SiteHeader
          language={language}
          activePage={PAGE_CANOPY}
          onNavigate={onNavigate}
          onLanguageChange={onLanguageChange}
          easterMode={easterMode}
          onToggleEaster={onToggleEaster}
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-14 md:pt-20">
          <div className={`mx-auto max-w-4xl rounded-[2rem] p-6 md:p-10 ${getEasterPanelClassName(easterMode, "border border-white/70 bg-white/90 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.4)]")}`}>
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
                className={getEasterSecondaryButtonClassName(easterMode, "rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50")}
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

function ClientResourcesPage({
  language,
  onNavigate,
  onLanguageChange,
  easterMode,
  onToggleEaster,
}) {
  const pageText = CLIENT_RESOURCES_PAGE_COPY[language] || CLIENT_RESOURCES_PAGE_COPY.en;
  const sharedText = COPY[language] || COPY.en;
  const carrierSelectId = useId();
  const introSelectId = useId();
  const quickMoveLabel = language === "es" ? "Acceso rapido" : "Quick move";
  const bestUseLabel = language === "es" ? "Mejor uso" : "Best use";
  const easyWinLabel = language === "es" ? "Por que sirve" : "Why it helps";
  const bestUseBody =
    language === "es"
      ? "Reclamos, mudanzas, renovaciones y cambios de vida"
      : "Claims, moves, renewals, and life changes";
  const easyWinBody =
    language === "es"
      ? "Todo esta reunido aqui para que no tengas que buscar entre mensajes, correos y notas"
      : "Everything is gathered here so you do not have to dig through texts, emails, and notes";
  const callNowLabel = language === "es" ? "Llamar ahora" : "Call now";
  const contactCardLabel = language === "es" ? "Contacto directo" : "Direct contact";
  const phoneLabel = language === "es" ? "Telefono" : "Phone";
  const whyRecommendLabel = language === "es" ? "Por que lo recomiendo" : "Why I recommend them";
  const greatFitLabel = language === "es" ? "Ideal para" : "Great fit for";
  const [selectedCarrierName, setSelectedCarrierName] = useState(
    () => pageText.carriers?.[0]?.name || ""
  );
  const introductionOptions = useMemo(
    () =>
      pageText.groups.flatMap((group) =>
        group.items.map((professional) => ({
          id: `${group.title}-${professional.name}`,
          label: `${professional.name} | ${group.title}`,
          groupTitle: group.title,
          ...professional,
        }))
      ),
    [pageText.groups]
  );
  const [isIntroFormOpen, setIsIntroFormOpen] = useState(false);
  const [isIntroSubmitting, setIsIntroSubmitting] = useState(false);
  const [introSubmitError, setIntroSubmitError] = useState("");
  const [introSubmitted, setIntroSubmitted] = useState(false);
  const [introForm, setIntroForm] = useState({
    selectedProfessionalId: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: "",
  });
  const selectedCarrier =
    pageText.carriers.find((carrier) => carrier.name === selectedCarrierName) || pageText.carriers[0];
  const selectedIntroductionProfessional =
    introductionOptions.find((professional) => professional.id === introForm.selectedProfessionalId) ||
    introductionOptions[0];

  useEffect(() => {
    if (!introductionOptions.length) return;

    setIntroForm((current) => {
      if (
        current.selectedProfessionalId &&
        introductionOptions.some((professional) => professional.id === current.selectedProfessionalId)
      ) {
        return current;
      }

      return {
        ...current,
        selectedProfessionalId: introductionOptions[0].id,
      };
    });
  }, [introductionOptions]);

  const handleIntroChange = (event) => {
    const { name, value } = event.target;
    setIntroForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleIntroSubmit = async (event) => {
    event.preventDefault();
    if (!selectedIntroductionProfessional) return;

    setIsIntroSubmitting(true);
    setIntroSubmitError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inquiryType: "referral",
          needsSpanish: "no",
          firstName: introForm.firstName,
          lastName: introForm.lastName,
          phone: introForm.phone,
          email: introForm.email,
          insuranceType: `Introduction request: ${selectedIntroductionProfessional.name}`,
          zipCode: "",
          notes: [
            `Requested introduction to ${selectedIntroductionProfessional.name}`,
            `${selectedIntroductionProfessional.role} | ${selectedIntroductionProfessional.groupTitle}`,
            introForm.notes ? `Client note: ${introForm.notes}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      const rawText = await response.text();
      let data = {};

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = { error: rawText || pageText.introError };
      }

      if (!response.ok) {
        throw new Error(data.error || pageText.introError);
      }

      setIntroSubmitted(true);
      setIsIntroFormOpen(false);
      setIntroForm({
        selectedProfessionalId: introductionOptions[0]?.id || "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        notes: "",
      });
    } catch (error) {
      setIntroSubmitError(error.message || pageText.introError);
    } finally {
      setIsIntroSubmitting(false);
    }
  };

  const renderQuickLink = (item) => {
    const classes = `group rounded-[1.8rem] border bg-gradient-to-br p-6 shadow-[0_22px_60px_-34px_rgba(15,23,42,0.35)] ring-1 ${item.tone}`;

    if (item.href) {
      return (
        <a
          key={item.title}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className={classes}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">{quickMoveLabel}</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
          <div className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition group-hover:translate-x-1">
            {item.actionLabel}
          </div>
        </a>
      );
    }

    return (
      <button
        key={item.title}
        type="button"
        onClick={() => onNavigate(item.page)}
        className={`${classes} text-left`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">{quickMoveLabel}</p>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
        <div className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition group-hover:translate-x-1">
          {item.actionLabel}
        </div>
      </button>
    );
  };

  return (
    <div className={getPageShellClassName(easterMode, "bg-[#f7f7f2] text-slate-900")} lang={language}>
      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(245,158,11,0.18),_transparent_28%),linear-gradient(180deg,_#f4fbf7_0%,_#fcfaf4_56%,_#f8fafc_100%)]" />
        <div className="absolute inset-x-0 top-20 h-72 bg-[linear-gradient(90deg,rgba(15,23,42,0.02)_0%,rgba(15,23,42,0.08)_50%,rgba(15,23,42,0.02)_100%)] blur-3xl" />
        {easterMode ? <EasterDecor /> : null}

        <SiteHeader
          language={language}
          activePage={PAGE_RESOURCES}
          onNavigate={onNavigate}
          onLanguageChange={onLanguageChange}
          easterMode={easterMode}
          onToggleEaster={onToggleEaster}
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-14 md:pt-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
                {pageText.badge}
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                {pageText.headline}
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                {pageText.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {pageText.heroPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-full border border-white/80 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 p-7 text-white shadow-[0_28px_80px_-36px_rgba(15,23,42,0.75)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(52,211,153,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.18),_transparent_34%)]" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                  {pageText.spotlightLabel}
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                  {pageText.spotlightTitle}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">{pageText.spotlightBody}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                      {bestUseLabel}
                    </p>
                    <p className="mt-3 text-lg font-semibold">{bestUseBody}</p>
                  </div>
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                      {easyWinLabel}
                    </p>
                    <p className="mt-3 text-lg font-semibold">{easyWinBody}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-700">
            {pageText.quickLinksLabel}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {pageText.quickLinksTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{pageText.quickLinksBody}</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {pageText.quickLinks.map((item) => renderQuickLink(item))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_-40px_rgba(15,23,42,0.35)]">
          <div className="bg-[linear-gradient(135deg,#0f172a_0%,#164e63_48%,#14532d_100%)] px-6 py-8 text-white md:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-200">
              {pageText.numbersLabel}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">{pageText.numbersTitle}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200">{pageText.numbersBody}</p>
          </div>

          <div className="border-b border-slate-200 bg-slate-50/90 p-6 md:p-8">
            <div className="grid gap-5 lg:grid-cols-[0.95fr,1.05fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {pageText.carrierLookupLabel}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {pageText.carrierLookupTitle}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                  {pageText.carrierLookupBody}
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-sm">
                <label
                  htmlFor={carrierSelectId}
                  className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500"
                >
                  {pageText.carrierLookupSelect}
                </label>
                <select
                  id={carrierSelectId}
                  value={selectedCarrierName}
                  onChange={(event) => setSelectedCarrierName(event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-500"
                >
                  {pageText.carriers.map((carrier) => (
                    <option key={carrier.name} value={carrier.name}>
                      {carrier.name}
                    </option>
                  ))}
                </select>

                {selectedCarrier ? (
                  <div className="mt-4 rounded-[1.3rem] border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                      {pageText.carrierLookupNumber}
                    </p>
                    <a
                      href={`tel:${selectedCarrier.phone.replace(/[^0-9]/g, "")}`}
                      className="mt-2 block text-2xl font-black tracking-tight text-emerald-950"
                    >
                      {selectedCarrier.phone}
                    </a>
                    <p className="mt-2 text-sm text-emerald-900">{selectedCarrier.note}</p>
                  </div>
                ) : null}

                <p className="mt-3 text-xs text-slate-500">{pageText.carrierLookupHint}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-6 md:grid-cols-2 md:p-8 xl:grid-cols-5">
            {pageText.numbers.map((item) => (
              <a
                key={item.title}
                href={`tel:${item.dial}`}
                className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {item.title}
                </p>
                <p className="mt-4 text-3xl font-black tracking-tight text-slate-950">{item.number}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
                <div className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                  {callNowLabel}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-700">
            {pageText.momentsLabel}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {pageText.momentsTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{pageText.momentsBody}</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {pageText.moments.map((moment) => (
            <div
              key={moment.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.45)]"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{moment.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{moment.body}</p>
              <div className="mt-6 space-y-3">
                {moment.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm font-medium text-emerald-900"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-700">
            {pageText.prosLabel}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {pageText.prosTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{pageText.prosBody}</p>
        </div>

        <div className="mt-8 space-y-5">
          {pageText.groups.map((group, index) => (
            <details
              key={group.title}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)]"
              open={index === 0}
            >
              <summary className="cursor-pointer list-none px-6 py-5 text-lg font-semibold text-slate-950 marker:content-none md:px-8">
                <div className="flex items-center justify-between gap-4">
                  <span>{group.title}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                    {group.items.length}
                  </span>
                </div>
              </summary>

              <div className="grid gap-5 border-t border-slate-200 p-6 md:p-8 lg:grid-cols-2">
                {group.items.map((professional) => (
                  <div
                    key={`${group.title}-${professional.name}`}
                    className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,0.55)]"
                  >
                    <div className={`bg-gradient-to-r ${professional.accent} px-6 py-6 text-white`}>
                      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/75">
                        {professional.role}
                      </p>
                      <h3 className="mt-3 text-3xl font-semibold tracking-tight">{professional.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/90">{professional.tagline}</p>
                    </div>

                    <div className="space-y-5 p-6">
                      <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          {contactCardLabel}
                        </p>
                        <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                              {phoneLabel}
                            </p>
                            <p className="mt-1 font-medium text-slate-950">{professional.phone}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                              Email
                            </p>
                            <p className="mt-1 break-words font-medium text-slate-950">{professional.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-[1.4rem] border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                            {whyRecommendLabel}
                          </p>
                          <p className="mt-3">{professional.note}</p>
                        </div>

                        <div className="rounded-[1.4rem] border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-950">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                            {greatFitLabel}
                          </p>
                          <p className="mt-3">{professional.bestFor}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#052e2b_0%,#0f172a_50%,#1d4ed8_100%)] px-6 py-8 text-white shadow-[0_32px_80px_-44px_rgba(15,23,42,0.7)] md:px-8">
          <div className="flex flex-col gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">
                {pageText.introBadge}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight">{pageText.footerTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-200">{pageText.footerBody}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsIntroFormOpen((current) => !current);
                  setIntroSubmitError("");
                  setIntroSubmitted(false);
                }}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                {pageText.introButton}
              </button>
            </div>

            {introSubmitted ? (
              <div className="rounded-[1.6rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-950">
                {pageText.introSuccess}
              </div>
            ) : null}

            {isIntroFormOpen ? (
              <div className="rounded-[1.8rem] border border-white/15 bg-white/10 p-5 backdrop-blur md:p-6">
                <h3 className="text-2xl font-semibold tracking-tight">{pageText.introOpenTitle}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">{pageText.introOpenBody}</p>

                <form className="mt-6 space-y-4" onSubmit={handleIntroSubmit}>
                  <div>
                    <label
                      htmlFor={introSelectId}
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      {pageText.introChoiceLabel}
                    </label>
                    <select
                      id={introSelectId}
                      name="selectedProfessionalId"
                      value={introForm.selectedProfessionalId}
                      onChange={handleIntroChange}
                      className="w-full rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-400"
                    >
                      {!selectedIntroductionProfessional ? (
                        <option value="">{pageText.introChoicePlaceholder}</option>
                      ) : null}
                      {introductionOptions.map((professional) => (
                        <option key={professional.id} value={professional.id}>
                          {professional.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white" htmlFor="introFirstName">
                        {sharedText.firstName}
                      </label>
                      <input
                        id="introFirstName"
                        name="firstName"
                        type="text"
                        value={introForm.firstName}
                        onChange={handleIntroChange}
                        required
                        className="w-full rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white" htmlFor="introLastName">
                        {sharedText.lastName}
                      </label>
                      <input
                        id="introLastName"
                        name="lastName"
                        type="text"
                        value={introForm.lastName}
                        onChange={handleIntroChange}
                        required
                        className="w-full rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white" htmlFor="introPhone">
                        {sharedText.phone}
                      </label>
                      <input
                        id="introPhone"
                        name="phone"
                        type="tel"
                        value={introForm.phone}
                        onChange={handleIntroChange}
                        required
                        className="w-full rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white" htmlFor="introEmail">
                        {sharedText.email}
                      </label>
                      <input
                        id="introEmail"
                        name="email"
                        type="email"
                        value={introForm.email}
                        onChange={handleIntroChange}
                        required
                        className="w-full rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white" htmlFor="introNotes">
                      {pageText.introNotesLabel}
                    </label>
                    <textarea
                      id="introNotes"
                      name="notes"
                      rows={4}
                      value={introForm.notes}
                      onChange={handleIntroChange}
                      className="w-full rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-400"
                    />
                  </div>

                  {selectedIntroductionProfessional ? (
                    <div className="rounded-[1.4rem] border border-cyan-200/25 bg-slate-950/20 px-4 py-3 text-sm text-cyan-50">
                      <span className="font-semibold">{selectedIntroductionProfessional.name}</span>
                      {` | ${selectedIntroductionProfessional.role} | ${selectedIntroductionProfessional.groupTitle}`}
                    </div>
                  ) : null}

                  {introSubmitError ? (
                    <p className="text-sm font-medium text-rose-200">{introSubmitError}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isIntroSubmitting || !selectedIntroductionProfessional}
                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isIntroSubmitting
                      ? language === "es"
                        ? "Enviando..."
                        : "Submitting..."
                      : pageText.introSubmit}
                  </button>
                </form>
              </div>
            ) : null}
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

const LIFE_BONUS_CAP = 1400;
const COMMERCIAL_BONUS_CAP = 3500;
const SUB_BONUS_COMMISSION_RATE = 0.1;
const QUARTER_LABELS = ["Q1", "Q2", "Q3", "Q4"];
const MONTH_LABELS = [
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
];
const DEFAULT_RETAIL_CALCULATOR = {
  revenue: {
    pnc: ["60000", "60000", "60000", "60000"],
    life: ["500", "1000", "1000", "1000"],
    commercial: ["1000", "1000", "1000", "1000"],
    pncRate: "0.1",
    lifeRate: "0.3",
    commercialRate: "0.15",
    subBasePayMonthly: "3000",
  },
  expenses: {
    rentMonthly: "0",
    rentQuarterly: "0",
    rentAnnual: "0",
    eoMonthly: "120",
    leadsMonthly: "600",
    technologyMonthly: "400",
    officeMonthly: "50",
    otherInsuranceMonthly: "75",
    mvrMonthly: "50",
    managerMonthly: "1000",
    oneTime: ["0", "0", "0", "0"],
    taxRate: "0.1",
    bufferRate: "0.1",
    apr: "0.04",
    takeHomeMonthly: "8800",
  },
  bonuses: {
    signing: ["5000", "0", "0", "0"],
    grad: ["4000", "0", "0", "0"],
  },
  producers: [
    {
      name: "Producer 1 (Matt)",
      baseMonthly: "500",
      nbLife: "0",
      nbCommercial: "500",
      nbPersonal: "7500",
      rateLife: "0.2",
      rateCommercial: "0.125",
      ratePersonal: "0.1",
      bonusLow: "0",
      bonusMid: "500",
      bonusHigh: "800",
      bonusTop: "1000",
      thresholdMid: "10000",
      thresholdHigh: "15000",
      thresholdTop: "20000",
    },
    {
      name: "Producer 2 (Kilee)",
      baseMonthly: "500",
      nbLife: "0",
      nbCommercial: "0",
      nbPersonal: "5000",
      rateLife: "0.2",
      rateCommercial: "0.125",
      ratePersonal: "0.1",
      bonusLow: "0",
      bonusMid: "250",
      bonusHigh: "500",
      bonusTop: "1000",
      thresholdMid: "7500",
      thresholdHigh: "12500",
      thresholdTop: "20000",
    },
    {
      name: "Producer 3 (P/T)",
      baseMonthly: "0",
      nbLife: "0",
      nbCommercial: "0",
      nbPersonal: "5000",
      rateLife: "0.2",
      rateCommercial: "0.125",
      ratePersonal: "0.1",
      bonusLow: "200",
      bonusMid: "300",
      bonusHigh: "700",
      bonusTop: "1000",
      thresholdMid: "7500",
      thresholdHigh: "12500",
      thresholdTop: "20000",
    },
  ],
};

const currency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

const toNumber = (value) => {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

function calculateProducerComp(producer) {
  const baseMonthly = toNumber(producer.baseMonthly);
  const nbLife = toNumber(producer.nbLife);
  const nbCommercial = toNumber(producer.nbCommercial);
  const nbPersonal = toNumber(producer.nbPersonal);
  const commissionMonthly =
    nbLife * toNumber(producer.rateLife) +
    nbCommercial * toNumber(producer.rateCommercial) +
    nbPersonal * toNumber(producer.ratePersonal);
  const nbTotal = nbLife + nbCommercial + nbPersonal;
  const thresholdMid = toNumber(producer.thresholdMid);
  const thresholdHigh = toNumber(producer.thresholdHigh);
  const thresholdTop = toNumber(producer.thresholdTop);

  let bonusMonthly = toNumber(producer.bonusLow);
  if (nbTotal >= thresholdTop) {
    bonusMonthly = toNumber(producer.bonusTop);
  } else if (nbTotal >= thresholdHigh) {
    bonusMonthly = toNumber(producer.bonusHigh);
  } else if (nbTotal >= thresholdMid) {
    bonusMonthly = toNumber(producer.bonusMid);
  }

  return {
    baseMonthly,
    nbLife,
    nbCommercial,
    nbPersonal,
    nbTotal,
    commissionMonthly,
    bonusMonthly,
  };
}

function getRetailBonusRate(quarterIndex, commissionBase) {
  if (quarterIndex === 0) return 3;
  const thresholds = [
    { high: 9450, mid: 6750 },
    { high: 9900, mid: 7200 },
    { high: 10350, mid: 7650 },
  ];
  const quarterThresholds = thresholds[quarterIndex - 1];
  if (!quarterThresholds) return 2.4;
  if (commissionBase >= quarterThresholds.high) return 3;
  if (commissionBase >= quarterThresholds.mid) return 2.7;
  return 2.4;
}

function calculateRetailCompModel(data) {
  const producerSummaries = data.producers.map(calculateProducerComp);
  const payrollMonthly =
    toNumber(data.expenses.managerMonthly) +
    producerSummaries.reduce((sum, producer) => sum + producer.baseMonthly, 0);
  const subProducerCommissionMonthly = producerSummaries.reduce(
    (sum, producer) => sum + producer.commissionMonthly,
    0
  );
  const subProducerBonusMonthly = producerSummaries.reduce(
    (sum, producer) => sum + producer.bonusMonthly,
    0
  );
  const recurringMonthly =
    toNumber(data.expenses.rentMonthly) +
    toNumber(data.expenses.eoMonthly) +
    toNumber(data.expenses.leadsMonthly) +
    toNumber(data.expenses.technologyMonthly) +
    toNumber(data.expenses.officeMonthly) +
    toNumber(data.expenses.otherInsuranceMonthly) +
    toNumber(data.expenses.mvrMonthly) +
    payrollMonthly;
  const recurringQuarterly = toNumber(data.expenses.rentQuarterly);
  const recurringAnnual = toNumber(data.expenses.rentAnnual);
  const baseQuarterExpenses =
    recurringMonthly * 3 +
    recurringQuarterly +
    recurringAnnual / 4 +
    (subProducerCommissionMonthly + subProducerBonusMonthly) * 3;
  const annualExpenses =
    recurringMonthly * 12 +
    recurringQuarterly * 4 +
    recurringAnnual +
    (subProducerCommissionMonthly + subProducerBonusMonthly) * 12 +
    data.expenses.oneTime.reduce((sum, value) => sum + toNumber(value), 0);
  const quarterResults = QUARTER_LABELS.map((label, index) => {
    const pncCommission = toNumber(data.revenue.pnc[index]) * toNumber(data.revenue.pncRate);
    const lifeCommission = toNumber(data.revenue.life[index]) * toNumber(data.revenue.lifeRate);
    const commercialCommission =
      toNumber(data.revenue.commercial[index]) * toNumber(data.revenue.commercialRate);
    const totalRevenueCommission = pncCommission + lifeCommission + commercialCommission;
    const revenueEarned =
      totalRevenueCommission +
      subProducerCommissionMonthly * 3 +
      toNumber(data.revenue.subBasePayMonthly) * 3;
    const commissionBase = totalRevenueCommission + subProducerCommissionMonthly * 3;
    const retailBonusRate = getRetailBonusRate(index, commissionBase);
    const retailBonus = commissionBase * retailBonusRate;
    const otherBonus =
      toNumber(data.bonuses.signing[index]) + toNumber(data.bonuses.grad[index]);
    const totalBonus = retailBonus + otherBonus;
    const bufferedExpenses =
      (baseQuarterExpenses + toNumber(data.expenses.oneTime[index])) *
      (1 + toNumber(data.expenses.bufferRate));
    const profitBeforeTax = revenueEarned + totalBonus - bufferedExpenses;
    const taxes =
      (revenueEarned + totalBonus - annualExpenses / 4) * toNumber(data.expenses.taxRate);
    const netProfit = profitBeforeTax - taxes;

    return {
      label,
      revenueEarned,
      totalRevenueCommission,
      retailBonusRate,
      retailBonus,
      otherBonus,
      totalBonus,
      bufferedExpenses,
      profitBeforeTax,
      taxes,
      netProfit,
    };
  });
  const monthlyApprox = quarterResults.flatMap((quarter) =>
    Array.from({ length: 3 }, () => quarter.netProfit / 3)
  );
  const monthlyBreakdown = MONTH_LABELS.map((month, index) => {
    const approx = monthlyApprox[index] || 0;
    const takeHome = toNumber(data.expenses.takeHomeMonthly);
    const businessSavings = approx - takeHome;
    const priorSavings = monthlyApprox
      .slice(0, index + 1)
      .reduce((sum, value) => sum + value - takeHome, 0);
    const interest = priorSavings * (toNumber(data.expenses.apr) / 12);
    return {
      month,
      approx,
      takeHome,
      businessSavings,
      interest,
    };
  });

  return {
    producerSummaries,
    payrollMonthly,
    subProducerCommissionMonthly,
    subProducerBonusMonthly,
    recurringMonthly,
    annualExpenses,
    quarterResults,
    monthlyBreakdown,
    totals: {
      revenueEarned: quarterResults.reduce((sum, quarter) => sum + quarter.revenueEarned, 0),
      bonuses: quarterResults.reduce((sum, quarter) => sum + quarter.totalBonus, 0),
      expenses: quarterResults.reduce((sum, quarter) => sum + quarter.bufferedExpenses, 0),
      netProfit: quarterResults.reduce((sum, quarter) => sum + quarter.netProfit, 0),
      taxes: quarterResults.reduce((sum, quarter) => sum + quarter.taxes, 0),
      savings: monthlyBreakdown.reduce((sum, month) => sum + month.businessSavings, 0),
      interest: monthlyBreakdown.reduce((sum, month) => sum + month.interest, 0),
    },
  };
}

function Field({ label, value, onChange, type = "number", step = "0.01", hint }) {
  return (
    <div className="rounded-2xl border bg-white p-3 shadow-sm">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
        {label}
      </label>
      <input
        type={type}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
      />
      {hint ? <p className="mt-2 text-xs text-gray-500">{hint}</p> : null}
    </div>
  );
}

function SelectField({ label, value, onChange, options, hint }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <label className="mb-1 block text-sm font-semibold text-gray-800">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-black"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <p className="mt-2 text-xs text-gray-500">{hint}</p> : null}
    </div>
  );
}

function StatCard({ label, value, subtext, tone = "default" }) {
  const toneClass =
    tone === "positive"
      ? "border-green-200 bg-green-50"
      : tone === "negative"
        ? "border-red-200 bg-red-50"
        : "border-gray-200 bg-white";

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${toneClass}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      {subtext ? <p className="mt-2 text-xs text-gray-500">{subtext}</p> : null}
    </div>
  );
}

function BreakdownRow({ label, value, muted = false }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 text-sm">
      <span className={muted ? "text-gray-500" : "text-gray-700"}>{label}</span>
      <span className={muted ? "text-right text-gray-500" : "text-right font-semibold text-gray-900"}>
        {value}
      </span>
    </div>
  );
}

function calculateSubProducerPay({ plan, nbPremium }) {
  const details = {
    basePay: 0,
    commissionPay: 0,
    bonusPay: 0,
    effectiveRateLabel: "",
    thresholdLabel: "",
    totalPay: 0,
  };

  if (plan === "plan1") {
    details.basePay = 500;

    if (nbPremium >= 20000) {
      details.commissionPay = nbPremium * 0.17;
      details.effectiveRateLabel = "17%";
      details.thresholdLabel = "Tier hit: $20,000+ NB";
    } else if (nbPremium >= 10000) {
      details.commissionPay = nbPremium * 0.125;
      details.effectiveRateLabel = "12.5%";
      details.thresholdLabel = "Tier hit: $10,000+ NB";
    } else if (nbPremium >= 5000) {
      details.commissionPay = nbPremium * 0.1;
      details.effectiveRateLabel = "10%";
      details.thresholdLabel = "Tier hit: $5,000+ NB";
    } else {
      details.effectiveRateLabel = "0%";
      details.thresholdLabel = "Below $5,000 NB";
    }
  }

  if (plan === "plan2") {
    details.commissionPay = nbPremium * 0.1;
    details.effectiveRateLabel = "10% flat";
    details.thresholdLabel = "Flat commission plan";

    if (nbPremium >= 25000) {
      details.bonusPay = 2000;
    } else if (nbPremium >= 20000) {
      details.bonusPay = 1000;
    } else if (nbPremium >= 10000) {
      details.bonusPay = 750;
    } else if (nbPremium >= 7500) {
      details.bonusPay = 500;
    }
  }

  if (plan === "plan3") {
    details.basePay = 250;

    if (nbPremium >= 25000) {
      details.commissionPay = nbPremium * 0.2;
      details.effectiveRateLabel = "20%";
      details.thresholdLabel = "Tier hit: $25,000+ NB";
    } else if (nbPremium >= 12500) {
      details.commissionPay = nbPremium * 0.15;
      details.effectiveRateLabel = "15%";
      details.thresholdLabel = "Tier hit: $12,500+ NB";
    } else if (nbPremium >= 5000) {
      details.commissionPay = nbPremium * 0.12;
      details.effectiveRateLabel = "12%";
      details.thresholdLabel = "Tier hit: $5,000+ NB";
    } else {
      details.commissionPay = nbPremium * 0.08;
      details.effectiveRateLabel = "8%";
      details.thresholdLabel = "Starter tier";
    }

    if (nbPremium >= 20000) {
      details.bonusPay = 1000;
    } else if (nbPremium >= 15000) {
      details.bonusPay = 500;
    } else if (nbPremium >= 10000) {
      details.bonusPay = 250;
    }
  }

  details.totalPay = details.basePay + details.commissionPay + details.bonusPay;
  return details;
}

function RetailCompExpenseCalculator({
  data,
  onChange,
  onSave,
  isSaving,
  isLoading,
  error,
}) {
  const model = useMemo(() => calculateRetailCompModel(data), [data]);

  const updateValue = (path, value) => onChange(path, value);

  if (isLoading) {
    return (
      <div className="mt-10 rounded-3xl bg-white p-8 text-slate-600 shadow-sm ring-1 ring-slate-200">
        Loading calculator...
      </div>
    );
  }

  return (
    <section className="mt-10 space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Admin Calculator
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Retail Comp & Expense Calculator
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Update your assumptions, check the numbers that matter most, and save your changes
              without digging through a giant spreadsheet.
            </p>
          </div>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Calculator"}
          </button>
        </div>

        {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Revenue earned" value={currency(model.totals.revenueEarned)} />
        <StatCard label="Total bonus" value={currency(model.totals.bonuses)} />
        <StatCard label="Buffered expenses" value={currency(model.totals.expenses)} tone="negative" />
        <StatCard label="Taxes" value={currency(model.totals.taxes)} tone="negative" />
        <StatCard label="Net after taxes" value={currency(model.totals.netProfit)} tone={model.totals.netProfit >= 0 ? "positive" : "negative"} />
        <StatCard label="Business savings" value={currency(model.totals.savings)} tone={model.totals.savings >= 0 ? "positive" : "negative"} subtext={`Interest estimate: ${currency(model.totals.interest)}`} />
      </div>

      <details className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200" open>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-950">Revenue Assumptions</h3>
            <p className="mt-1 text-sm text-slate-500">Quarterly production and commission rates.</p>
          </div>
          <span className="text-sm font-semibold text-emerald-700 group-open:hidden">Open</span>
          <span className="hidden text-sm font-semibold text-emerald-700 group-open:inline">Close</span>
        </summary>
        <div className="mt-5 space-y-5">
          <div className="grid gap-4 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <h4 className="text-sm font-semibold text-slate-900">P&C Written</h4>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {QUARTER_LABELS.map((label, index) => (
                  <Field
                    key={`pnc-${label}`}
                    label={label}
                    value={data.revenue.pnc[index]}
                    onChange={(value) => updateValue(["revenue", "pnc", index], value)}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <h4 className="text-sm font-semibold text-slate-900">Life Written</h4>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {QUARTER_LABELS.map((label, index) => (
                  <Field
                    key={`life-${label}`}
                    label={label}
                    value={data.revenue.life[index]}
                    onChange={(value) => updateValue(["revenue", "life", index], value)}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <h4 className="text-sm font-semibold text-slate-900">Commercial Written</h4>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {QUARTER_LABELS.map((label, index) => (
                  <Field
                    key={`commercial-${label}`}
                    label={label}
                    value={data.revenue.commercial[index]}
                    onChange={(value) => updateValue(["revenue", "commercial", index], value)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <Field
              label="P&C Rate"
              value={data.revenue.pncRate}
              onChange={(value) => updateValue(["revenue", "pncRate"], value)}
            />
            <Field
              label="Life Rate"
              value={data.revenue.lifeRate}
              onChange={(value) => updateValue(["revenue", "lifeRate"], value)}
            />
            <Field
              label="Commercial Rate"
              value={data.revenue.commercialRate}
              onChange={(value) => updateValue(["revenue", "commercialRate"], value)}
            />
            <Field
              label="Sub Producer Base Pay"
              value={data.revenue.subBasePayMonthly}
              onChange={(value) => updateValue(["revenue", "subBasePayMonthly"], value)}
              hint="Monthly amount."
            />
          </div>
        </div>
      </details>

      <details className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-950">Expenses & Settings</h3>
            <p className="mt-1 text-sm text-slate-500">Recurring costs, tax settings, and one-time expenses.</p>
          </div>
          <span className="text-sm font-semibold text-emerald-700 group-open:hidden">Open</span>
          <span className="hidden text-sm font-semibold text-emerald-700 group-open:inline">Close</span>
        </summary>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Rent Monthly" value={data.expenses.rentMonthly} onChange={(value) => updateValue(["expenses", "rentMonthly"], value)} />
          <Field label="Rent Quarterly" value={data.expenses.rentQuarterly} onChange={(value) => updateValue(["expenses", "rentQuarterly"], value)} />
          <Field label="Rent Annual" value={data.expenses.rentAnnual} onChange={(value) => updateValue(["expenses", "rentAnnual"], value)} />
          <Field label="E&O Monthly" value={data.expenses.eoMonthly} onChange={(value) => updateValue(["expenses", "eoMonthly"], value)} />
          <Field label="Leads Monthly" value={data.expenses.leadsMonthly} onChange={(value) => updateValue(["expenses", "leadsMonthly"], value)} />
          <Field label="Technology Monthly" value={data.expenses.technologyMonthly} onChange={(value) => updateValue(["expenses", "technologyMonthly"], value)} />
          <Field label="Office Monthly" value={data.expenses.officeMonthly} onChange={(value) => updateValue(["expenses", "officeMonthly"], value)} />
          <Field label="Other Insurance" value={data.expenses.otherInsuranceMonthly} onChange={(value) => updateValue(["expenses", "otherInsuranceMonthly"], value)} />
          <Field label="MVR Monthly" value={data.expenses.mvrMonthly} onChange={(value) => updateValue(["expenses", "mvrMonthly"], value)} />
          <Field label="Manager Monthly" value={data.expenses.managerMonthly} onChange={(value) => updateValue(["expenses", "managerMonthly"], value)} />
          <Field label="Tax Rate" value={data.expenses.taxRate} onChange={(value) => updateValue(["expenses", "taxRate"], value)} />
          <Field label="Buffer Rate" value={data.expenses.bufferRate} onChange={(value) => updateValue(["expenses", "bufferRate"], value)} />
          <Field label="APR" value={data.expenses.apr} onChange={(value) => updateValue(["expenses", "apr"], value)} />
          <Field label="Monthly Take Home" value={data.expenses.takeHomeMonthly} onChange={(value) => updateValue(["expenses", "takeHomeMonthly"], value)} />
          {QUARTER_LABELS.map((label, index) => (
            <Field
              key={`one-time-${label}`}
              label={`One-Time ${label}`}
              value={data.expenses.oneTime[index]}
              onChange={(value) => updateValue(["expenses", "oneTime", index], value)}
            />
          ))}
        </div>
      </details>

      <details className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-950">Bonus Inputs</h3>
            <p className="mt-1 text-sm text-slate-500">Quarter-specific signing and graduation bonuses.</p>
          </div>
          <span className="text-sm font-semibold text-emerald-700 group-open:hidden">Open</span>
          <span className="hidden text-sm font-semibold text-emerald-700 group-open:inline">Close</span>
        </summary>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {QUARTER_LABELS.map((label, index) => (
            <Field
              key={`signing-${label}`}
              label={`Signing ${label}`}
              value={data.bonuses.signing[index]}
              onChange={(value) => updateValue(["bonuses", "signing", index], value)}
            />
          ))}
          {QUARTER_LABELS.map((label, index) => (
            <Field
              key={`grad-${label}`}
              label={`Grad ${label}`}
              value={data.bonuses.grad[index]}
              onChange={(value) => updateValue(["bonuses", "grad", index], value)}
            />
          ))}
        </div>
      </details>

      <div className="space-y-4">
        {data.producers.map((producer, index) => (
          <details key={producer.name} className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-950">{producer.name}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  NB total {currency(model.producerSummaries[index].nbTotal)} | Commission{" "}
                  {currency(model.producerSummaries[index].commissionMonthly)} | Bonus{" "}
                  {currency(model.producerSummaries[index].bonusMonthly)}
                </p>
              </div>
              <span className="text-sm font-semibold text-emerald-700 group-open:hidden">Edit</span>
              <span className="hidden text-sm font-semibold text-emerald-700 group-open:inline">Close</span>
            </summary>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Field label="Base Monthly" value={producer.baseMonthly} onChange={(value) => updateValue(["producers", index, "baseMonthly"], value)} />
              <Field label="NB Life" value={producer.nbLife} onChange={(value) => updateValue(["producers", index, "nbLife"], value)} />
              <Field label="NB Commercial" value={producer.nbCommercial} onChange={(value) => updateValue(["producers", index, "nbCommercial"], value)} />
              <Field label="NB Personal" value={producer.nbPersonal} onChange={(value) => updateValue(["producers", index, "nbPersonal"], value)} />
              <Field label="Life Rate" value={producer.rateLife} onChange={(value) => updateValue(["producers", index, "rateLife"], value)} />
              <Field label="Commercial Rate" value={producer.rateCommercial} onChange={(value) => updateValue(["producers", index, "rateCommercial"], value)} />
              <Field label="Personal Rate" value={producer.ratePersonal} onChange={(value) => updateValue(["producers", index, "ratePersonal"], value)} />
              <Field label="Bonus Low" value={producer.bonusLow} onChange={(value) => updateValue(["producers", index, "bonusLow"], value)} />
              <Field label="Bonus Tier 1" value={producer.bonusMid} onChange={(value) => updateValue(["producers", index, "bonusMid"], value)} />
              <Field label="Bonus Tier 2" value={producer.bonusHigh} onChange={(value) => updateValue(["producers", index, "bonusHigh"], value)} />
              <Field label="Bonus Tier 3" value={producer.bonusTop} onChange={(value) => updateValue(["producers", index, "bonusTop"], value)} />
              <Field label="Threshold 1" value={producer.thresholdMid} onChange={(value) => updateValue(["producers", index, "thresholdMid"], value)} />
              <Field label="Threshold 2" value={producer.thresholdHigh} onChange={(value) => updateValue(["producers", index, "thresholdHigh"], value)} />
              <Field label="Threshold 3" value={producer.thresholdTop} onChange={(value) => updateValue(["producers", index, "thresholdTop"], value)} />
            </div>
          </details>
        ))}
      </div>

      <details className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200" open>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-950">Quarterly Summary</h3>
            <p className="mt-1 text-sm text-slate-500">The fast view for revenue, bonuses, expenses, taxes, and net.</p>
          </div>
          <span className="text-sm font-semibold text-emerald-700 group-open:hidden">Open</span>
          <span className="hidden text-sm font-semibold text-emerald-700 group-open:inline">Close</span>
        </summary>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-3 pr-4">Quarter</th>
                <th className="py-3 pr-4">Revenue Earned</th>
                <th className="py-3 pr-4">Bonus</th>
                <th className="py-3 pr-4">Expenses</th>
                <th className="py-3 pr-4">Taxes</th>
                <th className="py-3 pr-4">Net</th>
              </tr>
            </thead>
            <tbody>
              {model.quarterResults.map((quarter) => (
                <tr key={quarter.label} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-semibold text-slate-900">{quarter.label}</td>
                  <td className="py-3 pr-4 text-slate-700">{currency(quarter.revenueEarned)}</td>
                  <td className="py-3 pr-4 text-slate-700">
                    {currency(quarter.totalBonus)}
                    <div className="text-xs text-slate-500">
                      Retail rate: {(quarter.retailBonusRate * 100).toFixed(0)}%
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-slate-700">{currency(quarter.bufferedExpenses)}</td>
                  <td className="py-3 pr-4 text-slate-700">{currency(quarter.taxes)}</td>
                  <td className={`py-3 pr-4 font-semibold ${quarter.netProfit >= 0 ? "text-emerald-700" : "text-red-600"}`}>
                    {currency(quarter.netProfit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <details className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-950">Monthly Breakdown</h3>
            <p className="mt-1 text-sm text-slate-500">Open when you want the month-by-month view.</p>
          </div>
          <span className="text-sm font-semibold text-emerald-700 group-open:hidden">Open</span>
          <span className="hidden text-sm font-semibold text-emerald-700 group-open:inline">Close</span>
        </summary>
        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {model.monthlyBreakdown.map((month) => (
            <div key={month.month} className="rounded-2xl border border-slate-100 px-4 py-3">
              <BreakdownRow label={`${month.month} approx.`} value={currency(month.approx)} />
              <BreakdownRow label="Take home" value={currency(month.takeHome)} muted />
              <BreakdownRow label="Business savings" value={currency(month.businessSavings)} />
              <BreakdownRow label="Interest estimate" value={currency(month.interest)} muted />
            </div>
          ))}
        </div>
      </details>
    </section>
  );
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
  retailCalculator,
  onRetailCalculatorChange,
  onSaveRetailCalculator,
  isSavingRetailCalculator,
  isLoadingRetailCalculator,
  retailCalculatorError,
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

      <>
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
        <RetailCompExpenseCalculator
          data={retailCalculator}
          onChange={onRetailCalculatorChange}
          onSave={onSaveRetailCalculator}
          isSaving={isSavingRetailCalculator}
          isLoading={isLoadingRetailCalculator}
          error={retailCalculatorError}
        />
        </>
    </section>
  );
}

export default function OakCompassLandingPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [siteLanguage, setSiteLanguage] = useState(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("oak-compass-language") === "es" ? "es" : "en";
  });
  const [easterMode, setEasterMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("oak-compass-easter-mode") === "on";
  });
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
  const [retailCalculator, setRetailCalculator] = useState(DEFAULT_RETAIL_CALCULATOR);
  const [isLoadingRetailCalculator, setIsLoadingRetailCalculator] = useState(false);
  const [isSavingRetailCalculator, setIsSavingRetailCalculator] = useState(false);
  const [retailCalculatorError, setRetailCalculatorError] = useState("");
  const language = siteLanguage;
  const text = COPY[language];
  const inquiryOptions = INQUIRY_OPTIONS[language].filter(
    (option) => option.value !== "job" && option.value !== "collectibles"
  );
  const insuranceOptions = INSURANCE_OPTIONS[language];
  const nav = NAV_COPY[language];

  useEffect(() => {
    window.localStorage.setItem("oak-compass-language", siteLanguage);
  }, [siteLanguage]);

  useEffect(() => {
    window.localStorage.setItem("oak-compass-easter-mode", easterMode ? "on" : "off");
  }, [easterMode]);

  useEffect(() => {
    document.title =
      activePage === PAGE_TEAM
        ? "Meet the Team | Oak & Compass Insurance"
        : activePage === PAGE_JOBS
          ? "Apply Now | Oak & Compass Insurance"
        : activePage === PAGE_COLLECTIBLES
          ? "Collectibles Insurance | Oak & Compass Insurance"
        : activePage === PAGE_RESOURCES
          ? "Client Resources | Oak & Compass Insurance"
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
    if (
      activePage === PAGE_HOME &&
      form.inquiryType !== "quote" &&
      form.inquiryType !== "referral"
    ) {
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

    if (
      page === PAGE_HOME &&
      (activePage !== PAGE_HOME ||
        (form.inquiryType !== "quote" && form.inquiryType !== "referral"))
    ) {
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
    setRetailCalculatorError("");
    setIsLoadingLeads(true);
    setIsLoadingRetailCalculator(true);

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

      try {
        const calculatorResponse = await fetch("/api/retail-calculator", {
          method: "GET",
          headers: {
            "x-admin-password": passwordInput,
          },
        });

        const calculatorRawText = await calculatorResponse.text();
        let calculatorData = {};

        try {
          calculatorData = calculatorRawText ? JSON.parse(calculatorRawText) : {};
        } catch {
          calculatorData = { error: calculatorRawText || "Unable to load calculator data." };
        }

        if (!calculatorResponse.ok) {
          throw new Error(calculatorData.error || "Unable to load calculator data.");
        }

        if (calculatorData.calculator) {
          setRetailCalculator(calculatorData.calculator);
        } else {
          setRetailCalculator(DEFAULT_RETAIL_CALCULATOR);
        }
      } catch (calculatorError) {
        setRetailCalculator(DEFAULT_RETAIL_CALCULATOR);
        setRetailCalculatorError(
          calculatorError.message || "Unable to load calculator data."
        );
      }
    } catch (error) {
      if (error.message === text.passwordError) {
        setPasswordError(error.message);
      } else {
        setLoadError(error.message || text.leadsLoadError);
      }
    } finally {
      setIsLoadingLeads(false);
      setIsLoadingRetailCalculator(false);
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
    setRetailCalculatorError("");
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

  const handleRetailCalculatorChange = (path, value) => {
    setRetailCalculator((current) => {
      const next = structuredClone(current);
      let target = next;

      for (let index = 0; index < path.length - 1; index += 1) {
        target = target[path[index]];
      }

      target[path[path.length - 1]] = value;
      return next;
    });
  };

  const handleSaveRetailCalculator = async () => {
    setIsSavingRetailCalculator(true);
    setRetailCalculatorError("");

    try {
      const response = await fetch("/api/retail-calculator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": passwordInput,
        },
        body: JSON.stringify({ calculator: retailCalculator }),
      });

      const rawText = await response.text();
      let data = {};

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = { error: rawText || "Unable to save calculator data." };
      }

      if (!response.ok) {
        throw new Error(data.error || "Unable to save calculator data.");
      }
    } catch (error) {
      setRetailCalculatorError(error.message || "Unable to save calculator data.");
    } finally {
      setIsSavingRetailCalculator(false);
    }
  };

  if (activePage === PAGE_PORTAL) {
    return (
      <div className={getPageShellClassName(easterMode, "bg-slate-50 text-slate-900")} lang={language}>
        <div className="relative">
          {easterMode ? <EasterDecor /> : null}
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
            retailCalculator={retailCalculator}
            onRetailCalculatorChange={handleRetailCalculatorChange}
            onSaveRetailCalculator={handleSaveRetailCalculator}
            isSavingRetailCalculator={isSavingRetailCalculator}
            isLoadingRetailCalculator={isLoadingRetailCalculator}
            retailCalculatorError={retailCalculatorError}
          />
        </div>
        <Analytics />
      </div>
    );
  }

  if (activePage === PAGE_TEAM) {
    return (
      <TeamPage
        language={language}
        onNavigate={navigateToPage}
        onLanguageChange={setSiteLanguage}
        easterMode={easterMode}
        onToggleEaster={() => setEasterMode((current) => !current)}
      />
    );
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
        onLanguageChange={setSiteLanguage}
        easterMode={easterMode}
        onToggleEaster={() => setEasterMode((current) => !current)}
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
        onLanguageChange={setSiteLanguage}
        easterMode={easterMode}
        onToggleEaster={() => setEasterMode((current) => !current)}
      />
    );
  }

  if (activePage === PAGE_RESOURCES) {
    return (
      <ClientResourcesPage
        language={language}
        onNavigate={navigateToPage}
        onLanguageChange={setSiteLanguage}
        easterMode={easterMode}
        onToggleEaster={() => setEasterMode((current) => !current)}
      />
    );
  }

  if (activePage === PAGE_CANOPY) {
    return (
      <InsuranceConnectPage
        language={language}
        onNavigate={navigateToPage}
        onLanguageChange={setSiteLanguage}
        easterMode={easterMode}
        onToggleEaster={() => setEasterMode((current) => !current)}
      />
    );
  }

  return (
    <div className={getPageShellClassName(easterMode, "bg-slate-50 text-slate-900")} lang={language}>
      <section className="relative overflow-hidden">
        <div className={easterMode
          ? "absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(253,224,71,0.42),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.34),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(96,165,250,0.24),_transparent_30%),linear-gradient(180deg,_#fff7ed_0%,_#fff1f2_34%,_#f5f3ff_62%,_#ecfeff_100%)]"
          : "absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50"} />
        {easterMode ? <EasterDecor /> : null}
        <ForestLandscapeBackground variant={homeBackgroundVariant} />

        <SiteHeader
          language={language}
          activePage={PAGE_HOME}
          onNavigate={navigateToPage}
          onLanguageChange={setSiteLanguage}
          easterMode={easterMode}
          onToggleEaster={() => setEasterMode((current) => !current)}
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className={getEasterPillClassName(easterMode, "inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm")}>
                <span>{text.badge}</span>
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                {text.headline}
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                {text.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
                <div className={getEasterPillClassName(easterMode, "rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200")}>
                  {text.fastResponse}
                </div>
                <div className={getEasterPillClassName(easterMode, "rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200")}>
                  {text.simpleProcess}
                </div>
                <div className={getEasterPillClassName(easterMode, "rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200")}>
                  {text.localGuidance}
                </div>
              </div>

            </div>

            <div className={`rounded-3xl p-6 md:p-8 ${getEasterPanelClassName(easterMode, "bg-white shadow-xl ring-1 ring-slate-200")}`}>
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
                    className={getEasterInputClassName(easterMode, "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500")}
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
                      className={getEasterInputClassName(easterMode, "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500")}
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
                      className={getEasterInputClassName(easterMode, "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500")}
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
                      className={getEasterInputClassName(easterMode, "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500")}
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
                    className={getEasterInputClassName(easterMode, "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500")}
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
                    className={getEasterInputClassName(easterMode, "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500")}
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
                    className={getEasterInputClassName(easterMode, "w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500")}
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
                  className={easterMode
                    ? "w-full rounded-2xl bg-[linear-gradient(135deg,#f97316_0%,#ec4899_45%,#8b5cf6_100%)] px-5 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-20px_rgba(236,72,153,0.65)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    : "w-full rounded-2xl bg-emerald-700 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"}
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

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-emerald-200 bg-[linear-gradient(135deg,#f0fdf4_0%,#ffffff_45%,#eff6ff_100%)] px-6 py-8 shadow-sm ring-1 ring-white/70 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {nav.resources}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                {nav.resourcesBannerTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {nav.resourcesBannerBody}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigateToPage(PAGE_RESOURCES)}
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {nav.resourcesCta}
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
    hasResourcesPage: true,
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
