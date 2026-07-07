"use client";

import Link from "next/link";
import { useRef, useState } from "react";

interface Opt {
  v: string;
  label: string;
}
interface Q {
  q: string;
  multi: boolean;
  title: string;
  hint: string;
  options: Opt[];
}

const same = (arr: string[]): Opt[] => arr.map((v) => ({ v, label: v }));

const QUESTIONS: Q[] = [
  {
    q: "q1",
    multi: true,
    title: "What types of TV do you plan or buy?",
    hint: "Select all that apply",
    options: same(["Linear", "BVOD", "CTV", "FAST", "YouTube", "Other digital video"]),
  },
  {
    q: "q2",
    multi: true,
    title: "Where does most of the work happen today?",
    hint: "Select all that apply",
    options: [
      { v: "Spreadsheets", label: "Spreadsheets" },
      { v: "Portals", label: "Broadcaster portals" },
      { v: "Email", label: "Email" },
      { v: "Internal tools", label: "Internal tools" },
      { v: "Agency platform", label: "Agency platform" },
      { v: "Mixed", label: "A mix of everything" },
    ],
  },
  {
    q: "q3",
    multi: true,
    title: "Which parts take the most time?",
    hint: "Select all that apply",
    options: same(["Planning", "Pricing & deals", "Approvals", "Booking", "Reporting", "Reconciliation"]),
  },
  {
    q: "q4",
    multi: true,
    title: "Which teams are involved?",
    hint: "Select all that apply",
    options: [
      { v: "Planning", label: "Planning" },
      { v: "Trading", label: "Trading" },
      { v: "Ops", label: "Operations" },
      { v: "Data", label: "Data" },
      { v: "Reporting", label: "Reporting" },
      { v: "Leadership", label: "Leadership" },
      { v: "Clients", label: "Clients" },
    ],
  },
  {
    q: "q5",
    multi: false,
    title: "How many campaigns do you run per month?",
    hint: "Pick one",
    options: same(["1–10", "11–50", "51–100", "100+"]),
  },
  {
    q: "q6",
    multi: false,
    title: "How manual is the workflow today?",
    hint: "Pick one",
    options: same(["Mostly automated", "Partly manual", "Mostly manual"]),
  },
];

const TOTAL = QUESTIONS.length;

type Answers = Record<string, string[]>;
const EMPTY: Answers = { q1: [], q2: [], q3: [], q4: [], q5: [], q6: [] };

interface Result {
  primary: string;
  primaryDesc: string;
  modules: string[];
  helps: string[];
  band: string;
}

/** Derive the recommendation, mirroring the design's scoring exactly. */
function score(a: Answers): Result {
  const has = (q: string, v: string) => (a[q] || []).includes(v);
  const any = (q: string, vals: string[]) => (a[q] || []).some((x) => vals.includes(x));
  const tv = a.q1 || [];

  const modules: string[] = [];
  const add = (m: string) => {
    if (!modules.includes(m)) modules.push(m);
  };

  if (has("q1", "Linear") || has("q3", "Booking")) {
    add("Linear Planning");
    add("Campaign Delivery");
  }
  if (any("q1", ["BVOD", "CTV", "FAST", "YouTube", "Other digital video"]) || has("q3", "Planning")) {
    add("CTV Planning");
    add("Audience Builder");
  }
  if (any("q3", ["Pricing & deals", "Approvals"])) add("Trading Workspace");
  if (any("q3", ["Reporting", "Reconciliation"])) add("Unified Reporting");
  if (!modules.length) {
    add("CTV Planning");
    add("Unified Reporting");
  }

  const manyTypes = tv.length >= 3;
  const bigVol = any("q5", ["51–100", "100+"]);
  const complete = manyTypes || bigVol;

  const primary = complete ? "Complete Platform" : modules[0];
  const primaryDesc = complete
    ? "You run TV across several routes and at volume — the full connected workflow keeps planning, trading, delivery and reporting in one place."
    : "Start where the friction is greatest, then switch on more modules as you grow. Every module you add makes the next one stronger.";

  const helps: string[] = [];
  if (has("q2", "Spreadsheets") || has("q3", "Planning")) helps.push("Replace spreadsheet planning");
  if (has("q3", "Booking")) helps.push("Reduce re-keying into connected systems");
  if (any("q3", ["Pricing & deals", "Approvals"])) helps.push("Apply trading rules consistently");
  if (has("q3", "Reporting")) helps.push("Create one live campaign view");
  if (has("q3", "Reconciliation")) helps.push("Reduce manual reporting");
  if (any("q2", ["Portals", "Email", "Mixed"])) helps.push("Bring fragmented tools into one workflow");
  if (!helps.length) helps.push("Bring planning, trading and reporting into one workflow");

  const manual = (a.q6 || [])[0];
  let lo = 6,
    hi = 10;
  if (manual === "Mostly automated") {
    lo = 3;
    hi = 5;
  } else if (manual === "Mostly manual") {
    lo = 10;
    hi = 15;
  }
  let plus = manual === "Mostly manual";
  if (manyTypes || bigVol) {
    lo += 2;
    hi += 3;
    plus = true;
  }
  const band = `${lo}–${hi}${plus ? "+" : ""}`;

  return { primary, primaryDesc, modules, helps, band };
}

export default function FindYourFit() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [result, setResult] = useState<Result | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const pick = (q: string, v: string, multi: boolean) => {
    setAnswers((a) => {
      if (!multi) return { ...a, [q]: [v] };
      const arr = a[q].slice();
      const i = arr.indexOf(v);
      if (i >= 0) arr.splice(i, 1);
      else arr.push(v);
      return { ...a, [q]: arr };
    });
  };

  const next = () => {
    if (step < TOTAL - 1) setStep(step + 1);
    else {
      setResult(score(answers));
      requestAnimationFrame(() =>
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  };
  const back = () => step > 0 && setStep(step - 1);
  const restart = () => {
    setAnswers(EMPTY);
    setResult(null);
    setStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pct = Math.round(((step + 1) / TOTAL) * 100);

  return (
    <>
      <section className="fyf-wrap">
        <div className="fyf-card">
          <div className="fyf-prog">
            <div className="row">
              <span className="step-lbl">
                Question {step + 1} of {TOTAL}
              </span>
              <span className="pct">{pct}%</span>
            </div>
            <div className="track">
              <div className="bar" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="fyf-steps">
            {QUESTIONS.map((qq, i) =>
              i === step ? (
                <div className="fyf-step" key={qq.q}>
                  <h2>{qq.title}</h2>
                  <div className="fyf-hint">{qq.hint}</div>
                  <div className="fyf-opts">
                    {qq.options.map((o) => {
                      const on = answers[qq.q].includes(o.v);
                      return (
                        <button
                          key={o.v}
                          className={`fyf-opt${on ? " on" : ""}`}
                          onClick={() => pick(qq.q, o.v, qq.multi)}
                          aria-pressed={on}
                        >
                          <span className={`fyf-check${qq.multi ? "" : " round"}`}>✓</span>
                          <span>{o.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null
            )}
          </div>

          <div className="fyf-navrow">
            <button className={`fyf-back${step === 0 ? " hide" : ""}`} onClick={back}>
              <span>←</span> Back
            </button>
            <button className="fyf-next" onClick={next}>
              {step === TOTAL - 1 ? "See my fit" : "Next"} <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {result && (
        <section className="fyf-results" ref={resultsRef}>
          <div className="in">
            <span className="eyebrow">Your result</span>
            <h2>
              Your recommended <span className="hl sm">setup.</span>
            </h2>

            <div className="fyf-res-grid">
              <div className="fyf-res-card">
                <div className="fyf-lbl">Primary recommendation</div>
                <div className="fyf-primary">{result.primary}</div>
                <p className="fyf-primary-desc">{result.primaryDesc}</p>
                <div className="fyf-lbl" style={{ margin: "26px 0 14px" }}>
                  Modules recommended
                </div>
                <div className="fyf-modules">
                  {result.modules.map((m) => (
                    <span className="fyf-mod" key={m}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div className="fyf-res-green">
                <div className="fyf-lbl" style={{ color: "rgba(22,21,27,.6)", marginBottom: 10 }}>
                  Estimated time saved
                </div>
                <div className="fyf-band-row">
                  <span className="fyf-band">{result.band}</span>
                  <span className="fyf-band-unit">hrs</span>
                </div>
                <div className="fyf-green-sub">per planner, every week</div>
                <p className="fyf-green-note">
                  Estimated from typical manual planning, reporting, re-keying and reconciliation
                  workflows. Actual savings depend on workflow complexity and deployment scope.
                </p>
              </div>
            </div>

            <div className="fyf-helps-card">
              <div className="fyf-lbl">Where LightBoxTV helps most</div>
              <div className="fyf-helps">
                {result.helps.map((t) => (
                  <div className="fyf-help" key={t}>
                    <span className="tick">✓</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fyf-restart-row">
              <button className="fyf-restart" onClick={restart}>
                ↻ Start over
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="fyf-cta">
        <div className="box">
          <div>
            <h3>Want the full workflow assessment?</h3>
            <p>
              Book a 20-minute walkthrough and we&apos;ll map your current TV process against the
              LightBoxTV platform.
            </p>
          </div>
          <Link href="/contact?reason=demo" className="btn primary">
            Book a walkthrough <span className="ar">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
