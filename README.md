# PagesReady

**PagesReady** är ett litet, fristående verktyg som hjälper nybörjare att snabbt avgöra om deras projekt kan hostas på GitHub Pages.

Verktyget ställer 8 enkla frågor om projektet och ger sedan en tydlig rekommendation med förklaring och nästa steg.

> Just nu är PagesReady ett lokalt verktyg som körs direkt i webbläsaren. Publicering på GitHub Pages kan göras senare.

---

## Vad är GitHub Pages?

GitHub Pages är ett gratis sätt att visa en webbplats på internet direkt från ett GitHub-repo. Du behöver inte hyra en egen server för enkla webbsidor.

### Tänk så här

GitHub Pages är som en digital anslagstavla. Du lägger upp färdiga webbfiler — till exempel HTML, CSS, JavaScript och bilder — och GitHub visar sedan filerna som en riktig webbsida. Det enda GitHub gör är att visa filerna. Det kör ingen kod åt dig på servern.

Det viktiga att förstå är att GitHub Pages inte fungerar som en vanlig server. Det kan inte köra en Node-server, Python-app, PHP-backend eller C#-server. Det kan heller inte säkert gömma hemliga API-nycklar, eftersom all kod som körs i webbläsaren i princip kan ses av användaren.

### GitHub Pages passar bra för

- Portfolios
- Enkla webbsidor
- Dokumentation
- Små HTML/CSS/JavaScript-spel
- Demos och prototyper
- Statiska exports från till exempel Vite

### GitHub Pages passar sämre för

- Appar med egen backend
- Databaser med serverlogik
- Hemliga API-nycklar
- Inloggning som kräver säker serverkod
- Python, Node, PHP eller C# som ska köras på servern
- Lokala program som ffmpeg, Piper eller Ollama

**Kort sagt:**
GitHub Pages visar färdiga webbsidor. GitHub Pages kör inte en egen backend åt dig.

---

## Snabbregel

Om projektet bara består av färdiga webbfiler, till exempel HTML, CSS, JavaScript och bilder, kan GitHub Pages ofta fungera.

Om projektet behöver server, backend, databas, hemliga API-nycklar, säker serverkod eller lokala program behöver du oftast en annan lösning.

---

## Vad gör verktyget?

1. Du svarar på 8 ja/nej/vet inte-frågor om ditt projekt.
2. Verktyget beräknar en riskpoäng baserat på dina svar.
3. Du får ett av tre resultat med förklaring, exempel och rekommenderade nästa steg.
4. Du kan kopiera en sammanfattning av resultatet.
5. En ordlista med expanderbara förklaringar hjälper nybörjare att förstå viktiga begrepp som backend, databas, API-nyckel med mera.

---

## De tre resultaten

### ✅ Resultat A — Passar troligen
Projektet är statiskt och behöver ingen server, databas eller hemliga nycklar. Det kan publiceras direkt på GitHub Pages, Netlify Drop eller Cloudflare Pages.

### ⚠️ Resultat B — Kanske
Projektet använder ett ramverk (React, Vite, etc.) men kan eventuellt byggas till en statisk mapp. Om det kan exporteras till `dist` eller `build` kan det ofta fungera.

### ❌ Resultat C — Behöver annan lösning
Projektet kräver backend, databas, hemliga nycklar eller lokala program. Alternativ som Vercel, Render, Railway, Supabase eller en egen server rekommenderas.

---

## Öppna lokalt

Ingen installation behövs. Öppna bara `index.html` i din webbläsare:

1. Ladda ner eller klona mappen.
2. Dubbelklicka på `index.html`.
3. Klart — verktyget körs direkt i webbläsaren.

---

## Hur använder man det?

1. Läs frågan som visas.
2. Klicka på **Ja**, **Nej** eller **Vet inte**.
3. Svara på alla 8 frågor.
4. Läs resultatet med förklaring, exempel och rekommendation.
5. Klicka **Kopiera sammanfattning** för att spara resultatet.
6. Klicka **Börja om** för att testa igen.

---

## Filstruktur

```
pagesready/
├── index.html          Huvudsidan
├── style.css           All styling
├── script.js           Frågelogik och beslutsmotor
├── README.md           Den här filen
└── docs/
    └── beslutslogik.md Förklaring av beslutslogiken
```

---

## Kända begränsningar

- Verktyget ger en **förenklad** bedömning — inte en fullständig teknisk analys.
- Det hanterar inte edge-cases som hybrid-projekt (t.ex. statisk frontend + extern API).
- "Vet inte"-svar behandlas som osäkerhet och ökar risken något.
- Resultatet är en vägledning, inte ett definitivt svar.
- Kopiera-funktionen kräver att webbläsaren stödjer Clipboard API (fungerar inte alltid via `file://`-protokollet).

---

## Framtida idéer

- [ ] Publicera på GitHub Pages.
- [ ] Möjlighet att dela resultat via URL.
- [ ] Fler förklarande texter kopplade till varje fråga.
- [ ] Visuell sammanfattning av alla svar efter quizet.
- [ ] Stöd för flera språk (engelska, etc.).
- [ ] Mörkt/ljust tema-val.

---

## Licens

Öppen källkod. Fritt att använda, ändra och dela.
