# Beslutslogik — PagesReady

Det här dokumentet förklarar hur PagesReady avgör om ett projekt passar för GitHub Pages.

---

## Översikt

Verktyget ställer 8 frågor. Varje fråga har tre svarsalternativ: **Ja**, **Nej** och **Vet inte**.

Baserat på svaren beräknas en **riskpoäng**. Ju högre riskpoäng, desto mer troligt att projektet behöver en annan lösning än GitHub Pages.

---

## Riskbedömning per fråga

| # | Fråga | Svar som ökar risk | Vikt | Risknivå |
|---|-------|-------------------|------|----------|
| 1 | Statiska filer? | Nej | 2 | Medel |
| 2 | Behöver server? | Ja | 3 | Hög |
| 3 | Behöver databas? | Ja | 3 | Hög |
| 4 | Hemliga API-nycklar? | Ja | 3 | Hög |
| 5 | Inloggning/användardata? | Ja | 2 | Medel |
| 6 | Lokala program? | Ja | 3 | Hög |
| 7 | Ramverk (React etc.)? | — | 0 | Ingen direkt |
| 8 | Kan byggas statiskt? | — | 0 | Ingen direkt |

### Så beräknas poängen

- Om svaret **matchar risksvar**: full vikt adderas.
- Om svaret är **"Vet inte"**: halva vikten adderas (osäkerhet).
- Om svaret **inte matchar risksvar**: ingen poäng.

### Exempel

- Svar "Ja" på "Behöver server?" → +3 riskpoäng.
- Svar "Vet inte" på "Behöver databas?" → +1.5 riskpoäng.
- Svar "Nej" på "Behöver server?" → +0 riskpoäng.

---

## Resultatnivåer

### Resultat A — Låg risk (riskpoäng ≤ 2)
Projektet passar troligen för GitHub Pages. Det verkar vara helt statiskt utan serverbehov.

### Resultat B — Medel risk
Projektet kan kanske fungera, men det finns osäkerhet. Till exempel:
- Ett ramverk används men kan byggas till statiska filer.
- Riskpoängen ligger mellan tröskelvärdena.

### Resultat C — Hög risk (riskpoäng ≥ 5)
Projektet behöver troligen en annan lösning. Det kräver backend, databas, hemliga nycklar eller lokala program.

---

## Ramverksfrågor (specialfall)

Frågorna om ramverk (React, Vue, etc.) och statisk export hanteras separat:

- Om ramverk **används** och det **kan byggas statiskt** → Resultat B (kanske).
- Om ramverk **används** men **inte kan byggas statiskt** → Resultat B (osäkert).
- Ramverksfrågorna ger aldrig riskpoäng direkt.

---

## Varför är verktyget medvetet enkelt?

1. **Målgrupp**: Nybörjare som ännu inte har full koll på hosting.
2. **Snabb vägledning**: Bättre med ett ungefärligt svar på 30 sekunder än inget svar alls.
3. **Inga edge-cases**: Hybrida projekt (t.ex. statisk frontend + extern API) täcks inte.
4. **Ingen teknisk skuld**: Enkelheten gör koden lätt att underhålla och vidareutveckla.

> Verktyget ersätter inte kunskap — det ger en startpunkt.

---

## Avancerade projekt kan behöva manuell granskning

Verktygets logik är medvetet förenklad. Vissa projekt faller mellan kategorierna, till exempel:

- En statisk frontend som anropar ett externt API (kan fungera på GitHub Pages trots API-användning).
- Ett Next.js-projekt med statisk export men även serverless-funktioner.
- Projekt som använder Supabase enbart via klient-SDK (ingen egen backend).

I dessa fall rekommenderas en manuell bedömning utöver verktygets resultat.

---

## Tröskelvärden

Dessa kan justeras i `script.js` (markerade med `INSTÄLLNING`):

| Inställning | Värde | Beskrivning |
|------------|-------|-------------|
| `LOW_THRESHOLD` | 2 | Under denna gräns → Resultat A |
| `HIGH_THRESHOLD` | 5 | Över denna gräns → Resultat C |
| Vet inte-faktor | 0.5 | Andel av vikten som adderas vid osäkerhet |
