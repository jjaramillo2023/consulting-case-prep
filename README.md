# Case Interview Prep

An interactive practice tool for management consulting case interviews (McKinsey, BCG, Bain, and beyond). Pick a firm, pick a case, work through it the way a real first-round interview runs: read the brief, ask for the exhibits you need, structure a response, and get feedback.

**Live status:** MVP in progress. The home screen and a text-based practice mode are built; voice interaction and AI-generated feedback are the next milestones (see [Roadmap](#roadmap)).

## What it does

- **Browse cases by firm.** McKinsey currently ships two fully worked cases — a profitability case and a market entry case. BCG and Bain are wired into the UI as "coming soon" and ready to receive cases.
- **Work a case like a real interview.** Each case opens with context and an initial question. You can ask for additional information in plain language ("Can I see the cost breakdown?") and the app matches your request against a set of pre-authored exhibits for that case — nothing is invented on the fly.
- **Write your response.** A workspace panel captures your structure, hypotheses, and math, ready to be sent for feedback.

## Roadmap

- [ ] Voice mode: read the case aloud with the Web Speech API (`speechSynthesis`) and answer by speaking (`SpeechRecognition`), with a text fallback
- [ ] AI feedback on responses via the Claude API — what was strong, what was missing (structure, hypotheses, math), and a concrete suggestion
- [ ] A sidebar "coach" chatbot for general framework questions, available at any point
- [ ] More firms and cases in `src/data/cases.json`

## Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/) — no router or state library; the app is small enough for local component state
- Plain CSS (no framework), design tokens in [`src/index.css`](src/index.css)
- Case content lives in a single JSON file, not hardcoded into components — see [Project structure](#project-structure)
- [Claude API](https://docs.anthropic.com/) (planned) for feedback generation and the coach chatbot

## Running locally

Requires Node 18+.

```bash
git clone https://github.com/jjaramillo2023/consulting-case-prep.git
cd consulting-case-prep
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

Once the Claude API integration lands, you'll also need:

```bash
cp .env.example .env
# then set VITE_ANTHROPIC_API_KEY in .env — get a key at https://console.anthropic.com/
```

`.env` is git-ignored; your key never gets committed.

## Project structure

```
src/
  components/   UI components (Home, CompanySection, CaseCard, PracticeMode, Exhibit)
  data/         cases.json — all case content: context, questions, exhibits
  hooks/        custom hooks (e.g. useExhibitRequests, the exhibit-matching logic)
  services/     API integrations (Claude API client, once added)
```

### Adding a new case

Cases live in [`src/data/cases.json`](src/data/cases.json) under a company's `cases` array. Each case needs:

- `prompt.context` and `prompt.initialQuestion` — what the candidate reads/hears first
- `exhibits[]` — each with `triggerKeywords` (phrases that surface it when the candidate asks) and a `type: "table"` payload of pre-built data

No code changes are needed to add a case — the UI renders whatever's in the JSON.
