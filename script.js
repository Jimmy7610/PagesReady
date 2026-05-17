// ============================================
// PagesReady — script.js (v1.1)
// Frågeflöde, beslutslogik och resultatvisning.
// ============================================

// ---- Frågor ----
// Varje fråga har en id och en text.
// "riskIf" anger vilket svar som ökar risken att projektet INTE passar GitHub Pages.
// "weight" anger hur tungt svaret väger i beslutslogiken.

// INSTÄLLNING - Lägg till, ta bort eller ändra frågor här
const questions = [
  {
    id: "static",
    text: "Består projektet bara av HTML, CSS, JavaScript, bilder och andra statiska filer?",
    riskIf: "nej", // "Nej" = inte statiskt = högre risk
    weight: 2,
  },
  {
    id: "server",
    text: "Behöver projektet en server som kör Node, Python, PHP, C# eller liknande?",
    riskIf: "ja", // "Ja" = behöver server = högre risk
    weight: 3,
  },
  {
    id: "database",
    text: "Behöver projektet en databas, till exempel Supabase, Firebase, MySQL eller PostgreSQL?",
    riskIf: "ja",
    weight: 3,
  },
  {
    id: "secrets",
    text: "Behöver projektet hemliga API-nycklar som inte får synas i webbläsaren?",
    riskIf: "ja",
    weight: 3,
  },
  {
    id: "users",
    text: "Behöver projektet logga in användare eller spara användardata?",
    riskIf: "ja",
    weight: 2,
  },
  {
    id: "local",
    text: "Behöver projektet köra lokala program som ffmpeg, Piper, Ollama, Stable Diffusion eller Python-script?",
    riskIf: "ja",
    weight: 3,
  },
  {
    id: "framework",
    text: "Är projektet byggt med React, Vue, Svelte, Next, Vite eller liknande?",
    riskIf: null, // Inte direkt en risk – beror på om det kan byggas statiskt
    weight: 0,
  },
  {
    id: "buildable",
    text: "Kan projektet exporteras eller byggas till en färdig statisk mapp, till exempel dist eller build?",
    riskIf: null,
    weight: 0,
  },
];

// ---- Resultat-definitioner ----
// INSTÄLLNING - Ändra texter, exempel och rekommendationer här
const results = {
  A: {
    title: "✅ Ja, ditt projekt passar troligen för GitHub Pages",
    explanation:
      "Projekt som bara består av statiska filer som HTML, CSS, JavaScript och bilder fungerar ofta bra på GitHub Pages.",
    meaning:
      "Ditt projekt verkar vara helt statiskt — det behöver ingen server, databas eller hemliga nycklar. Det kan troligen publiceras direkt.",
    examples: [
      "Portfolio-sida",
      "Enkel webbsida",
      "HTML/CSS/JS-spel",
      "Dokumentationssida",
      "Bildgalleri utan backend",
      "Interaktiv demo utan server",
    ],
    nextSteps: [
      "GitHub Pages — ladda upp till ett GitHub-repo och aktivera Pages under Settings",
      "Netlify Drop — dra och släpp din mapp på netlify.com/drop",
      "Cloudflare Pages — koppla ditt repo eller ladda upp filer direkt",
    ],
    nextStepsCopyText:
      "Publicera via GitHub Pages, Netlify Drop eller Cloudflare Pages.",
  },
  B: {
    title: "⚠️ Kanske, om projektet byggs eller exporteras statiskt",
    explanation:
      "GitHub Pages kan visa färdiga statiska filer, men kan inte köra en vanlig backendserver åt dig. Om projektet kan byggas till en dist- eller build-mapp kan det ofta fungera.",
    meaning:
      "Ditt projekt använder troligen ett ramverk som React, Vue eller Vite. Dessa kan ofta byggas till statiska filer som fungerar på GitHub Pages.",
    examples: [
      "React-app som byggs med npm run build",
      "Vite-projekt med statisk export",
      "Svelte-app kompilerad till HTML/JS",
      "Vue-app med dist-mapp",
    ],
    nextSteps: [
      "Kör ditt build-kommando (t.ex. npm run build) och kontrollera att det skapas en dist- eller build-mapp",
      "Publicera innehållet i den mappen på GitHub Pages, Netlify eller Cloudflare Pages",
      "React/Vite/Svelte kan ofta fungera om projektet exporteras till en statisk mapp",
    ],
    nextStepsCopyText:
      "Bygg projektet till en statisk mapp (dist/build) och publicera via GitHub Pages, Netlify eller Cloudflare Pages.",
  },
  C: {
    title: "❌ Nej, detta behöver troligen en annan lösning än GitHub Pages",
    explanation:
      "GitHub Pages är främst för statiska webbplatser. Om projektet behöver backend, databas, hemliga servernycklar eller lokala program behöver du troligen en annan lösning.",
    meaning:
      "Ditt projekt kräver troligen serverkod, en databas eller andra resurser som GitHub Pages inte kan tillhandahålla. GitHub Pages kan inte köra backend-kod.",
    examples: [
      "Webbapp med inloggning och databas",
      "API-server i Node.js eller Python",
      "App som använder hemliga nycklar på servern",
      "Projekt som kör lokala verktyg som ffmpeg eller Ollama",
    ],
    alternatives: [
      "Vercel — bra för Next.js och serverless-funktioner",
      "Netlify Functions — statisk sajt + enklare backend-funktioner",
      "Render — stödjer Node, Python, Docker med mera",
      "Railway — snabb deploy av backend-projekt",
      "Supabase — databas och autentisering som tjänst",
      "Egen server — full kontroll via VPS eller liknande",
      "Lokal körning — kör på din egen dator under utveckling",
    ],
    nextStepsCopyText:
      "Använd en tjänst som Vercel, Render, Railway eller Supabase beroende på behov.",
  },
};

// ---- Tillstånd (state) ----
let currentIndex = 0; // Vilken fråga vi visar just nu
let userAnswers = []; // Sparar användarens svar
let currentResultKey = null; // Spara vilket resultat som visades

// ---- DOM-element ----
const introEl = document.getElementById("intro");
const progressEl = document.getElementById("progress");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");
const questionCard = document.getElementById("question-card");
const questionText = document.getElementById("question-text");
const resultCard = document.getElementById("result-card");
const resultTitle = document.getElementById("result-title");
const resultExplanation = document.getElementById("result-explanation");
const resultExtra = document.getElementById("result-extra");
const btnRestart = document.getElementById("btn-restart");
const btnCopy = document.getElementById("btn-copy");

// ---- Starta quizet ----
function init() {
  currentIndex = 0;
  userAnswers = [];
  currentResultKey = null;
  resultCard.classList.add("hidden");
  questionCard.classList.remove("hidden");
  progressEl.classList.remove("hidden");
  introEl.classList.remove("hidden");
  showQuestion();
}

// ---- Visa aktuell fråga ----
function showQuestion() {
  const q = questions[currentIndex];
  questionText.textContent = q.text;

  // Uppdatera progress
  const progress = (currentIndex / questions.length) * 100;
  progressFill.style.width = progress + "%";
  progressLabel.textContent = `Fråga ${currentIndex + 1} av ${questions.length}`;
  progressEl.setAttribute("aria-valuenow", Math.round(progress));

  // Enkel fade-animation: ta bort och lägg tillbaka card-klassen
  questionCard.style.animation = "none";
  // Tvinga reflow för att starta om animationen
  void questionCard.offsetHeight;
  questionCard.style.animation = "";
}

// ---- Hantera svar ----
// Anropas av onclick på knapparna i HTML.
function answer(value) {
  // Spara svaret (ja / nej / vetinte)
  userAnswers.push({ id: questions[currentIndex].id, value });

  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    // Alla frågor besvarade — visa resultat
    showResult();
  }
}

// ---- Beslutslogik ----
// Beräkna riskpoäng baserat på svaren.
// Ju högre poäng desto mer troligt att projektet INTE passar GitHub Pages.
function calculateResult() {
  let riskScore = 0;

  for (const a of userAnswers) {
    const q = questions.find((question) => question.id === a.id);
    if (!q || !q.riskIf) continue;

    if (a.value === q.riskIf) {
      // Svaret matchar risksvaret → öka risken
      riskScore += q.weight;
    } else if (a.value === "vetinte") {
      // "Vet inte" ger halva riskvikten (osäkerhet)
      // INSTÄLLNING - Ändra denna faktor för att justera hur "Vet inte" påverkar resultatet
      riskScore += q.weight * 0.5;
    }
  }

  // Kolla om det är ett framework-projekt som kan byggas statiskt
  const usesFramework =
    userAnswers.find((a) => a.id === "framework")?.value === "ja";
  const canBuild =
    userAnswers.find((a) => a.id === "buildable")?.value === "ja";

  // INSTÄLLNING - Tröskel för resultat A (låg risk) och C (hög risk)
  const LOW_THRESHOLD = 2;
  const HIGH_THRESHOLD = 5;

  // Om risken är hög → Resultat C
  if (riskScore >= HIGH_THRESHOLD) {
    return "C";
  }

  // Om ramverk används men det kan byggas statiskt, och risken inte är hög → Resultat B
  if (usesFramework && canBuild && riskScore < HIGH_THRESHOLD) {
    return "B";
  }

  // Om ramverk används men kan INTE byggas statiskt → Resultat B (osäkert)
  if (usesFramework && !canBuild) {
    return "B";
  }

  // Låg risk och inget ramverk → Resultat A
  if (riskScore <= LOW_THRESHOLD) {
    return "A";
  }

  // Mellanläge → Resultat B
  return "B";
}

// ---- Hjälpfunktion: Skapa en rubrik + lista i resultat-kortet ----
function addResultSection(parent, headingText, items) {
  const heading = document.createElement("h3");
  heading.className = "result__section-heading";
  heading.textContent = headingText;
  parent.appendChild(heading);

  const list = document.createElement("ul");
  list.className = "result__list";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }
  parent.appendChild(list);
}

// ---- Visa resultat ----
function showResult() {
  currentResultKey = calculateResult();
  const r = results[currentResultKey];

  // Dölj frågekortet, visa resultatkortet
  questionCard.classList.add("hidden");
  introEl.classList.add("hidden");
  resultCard.classList.remove("hidden");

  // Uppdatera progress till 100 %
  progressFill.style.width = "100%";
  progressLabel.textContent = "Klar!";
  progressEl.setAttribute("aria-valuenow", 100);

  resultTitle.textContent = r.title;
  resultExplanation.textContent = r.explanation;

  // Bygg extra-innehåll
  resultExtra.innerHTML = "";

  // "Vad betyder detta?"
  if (r.meaning) {
    const meaningHeading = document.createElement("h3");
    meaningHeading.className = "result__section-heading";
    meaningHeading.textContent = "Vad betyder detta?";
    resultExtra.appendChild(meaningHeading);

    const meaningText = document.createElement("p");
    meaningText.className = "result__meaning-text";
    meaningText.textContent = r.meaning;
    resultExtra.appendChild(meaningText);
  }

  // Exempel
  if (r.examples) {
    addResultSection(resultExtra, "Exempel på projekt", r.examples);
  }

  // Rekommenderade nästa steg (Resultat A och B)
  if (r.nextSteps) {
    addResultSection(
      resultExtra,
      "Rekommenderad nästa väg",
      r.nextSteps
    );
  }

  // Alternativ (Resultat C)
  if (r.alternatives) {
    addResultSection(resultExtra, "Alternativ att överväga", r.alternatives);
  }

  // Scrolla resultatkortet till synligt läge
  resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ---- Kopiera sammanfattning till urklipp ----
function copyResult() {
  if (!currentResultKey) return;
  const r = results[currentResultKey];

  // Bygg kopierad text med titel, förklaring, nästa steg och signatur
  let text = r.title + "\n\n";
  text += r.explanation + "\n\n";

  if (r.nextStepsCopyText) {
    text += "Nästa steg: " + r.nextStepsCopyText + "\n\n";
  }

  text += "Skapat med PagesReady";

  navigator.clipboard
    .writeText(text)
    .then(() => {
      btnCopy.textContent = "Kopierat! ✓";
      // INSTÄLLNING - Tid i millisekunder innan knappen återställs
      setTimeout(() => {
        btnCopy.textContent = "Kopiera sammanfattning";
      }, 2000);
    })
    .catch(() => {
      // Fallback om clipboard-API inte stöds (t.ex. file://-protokoll i vissa webbläsare)
      btnCopy.textContent = "Kunde inte kopiera";
      setTimeout(() => {
        btnCopy.textContent = "Kopiera sammanfattning";
      }, 2000);
    });
}

// ---- Event-lyssnare ----
btnRestart.addEventListener("click", init);
btnCopy.addEventListener("click", copyResult);

// ---- Starta när sidan laddas ----
init();
