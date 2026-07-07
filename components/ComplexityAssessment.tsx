// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";

// Markup kept verbatim from the design (raw HTML), driven by the imperative
// logic in the effect below — same pattern as CtvExplorer / TagTester.
const MARKUP = `
<header class="topbar">
  <div class="brand">
    <img src="/images/logo-color.png" alt="LightBoxTV" />
    <span class="sep"></span>
    <span class="tool">Planning Complexity Assessment</span>
  </div>
  <div class="right">
    <a class="back" href="/">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
      Back to site
    </a>
    <a href="#cta" class="btn primary">Book a demo</a>
  </div>
</header>

<!-- HERO -->
<section class="hero">
  <div class="wrap nrw">
    <span class="eyebrow"><span class="pulse"></span> Diagnostic · 5 questions</span>
    <h1>How complex is your TV planning process?</h1>
  </div>
</section>

<!-- ASSESSMENT -->
<div class="assess" id="assessStage">
  <div class="wrap nrw">
    <div class="solo">
      <div>
        <div class="flow-top">
          <div class="ft-row">
            <span class="ft-step">Question <b id="qCur">1</b> of 5</span>
            <span class="ft-note" id="ftNote">Just 5 quick questions</span>
          </div>
          <div class="segbar" id="segbar"><span class="seg"></span><span class="seg"></span><span class="seg"></span><span class="seg"></span><span class="seg"></span></div>
        </div>
        <div class="qcard">
          <div class="qpanel" data-step="0">
            <div class="qhead"><h3>Which inventory types do you buy?</h3><p class="hint">Select all that apply.</p></div>
            <div class="pills" data-group="inventory">
            <button type="button" class="pill on" data-id="inv-linear"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Linear TV</button>
            <button type="button" class="pill on" data-id="inv-bvod"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>BVOD</button>
            <button type="button" class="pill on" data-id="inv-ctv"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>CTV</button>
            <button type="button" class="pill" data-id="inv-fast"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>FAST</button>
            <button type="button" class="pill on" data-id="inv-youtube"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>YouTube</button>
            <button type="button" class="pill" data-id="inv-onlinevideo"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Online Video</button>
            </div>
          </div>
          <div class="qpanel" data-step="1" hidden>
            <div class="qhead"><h3>How do you buy inventory?</h3><p class="hint">Select all that apply.</p></div>
            <div class="pills" data-group="buying">
            <button type="button" class="pill on" data-id="buy-direct"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Direct with broadcasters</button>
            <button type="button" class="pill on" data-id="buy-dsp"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>DSPs</button>
            <button type="button" class="pill" data-id="buy-managed"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Managed services</button>
            <button type="button" class="pill on" data-id="buy-trading"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Agency trading deals</button>
            </div>
          </div>
          <div class="qpanel" data-step="2" hidden>
            <div class="qhead"><h3>Which audience approaches do you use?</h3><p class="hint">Select all that apply.</p></div>
            <div class="pills" data-group="audience">
            <button type="button" class="pill on" data-id="aud-demo"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Demographics</button>
            <button type="button" class="pill on" data-id="aud-first" data-platform="1"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>First-party data</button>
            <button type="button" class="pill" data-id="aud-third" data-platform="1"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Third-party data</button>
            <button type="button" class="pill on" data-id="aud-geo"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Geographic targeting</button>
            <button type="button" class="pill" data-id="aud-context"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Contextual targeting</button>
            <button type="button" class="pill" data-id="aud-retail" data-platform="1"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Retail / shopper audiences</button>
            </div>
          </div>
          <div class="qpanel" data-step="3" hidden>
            <div class="qhead"><h3>Which measurement sources do you use?</h3><p class="hint">Select all that apply.</p></div>
            <div class="pills" data-group="measurement">
            <button type="button" class="pill on" data-id="me-barb"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>BARB</button>
            <button type="button" class="pill on" data-id="me-platform"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Platform reporting</button>
            <button type="button" class="pill" data-id="me-brand"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Brand lift</button>
            <button type="button" class="pill on" data-id="me-attr"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Attribution</button>
            <button type="button" class="pill" data-id="me-attention"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Attention</button>
            <button type="button" class="pill" data-id="me-footfall"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Footfall</button>
            <button type="button" class="pill" data-id="me-sales"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Sales measurement</button>
            </div>
          </div>
          <div class="qpanel" data-step="4" hidden>
            <div class="qhead"><h3>How do you currently manage campaigns?</h3><p class="hint">Select all that apply.</p></div>
            <div class="pills" data-group="workflow">
            <button type="button" class="pill on" data-id="wf-sheets"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Spreadsheets</button>
            <button type="button" class="pill on" data-id="wf-ppt"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>PowerPoint</button>
            <button type="button" class="pill on" data-id="wf-email"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Email</button>
            <button type="button" class="pill" data-id="wf-drives"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Shared drives</button>
            <button type="button" class="pill" data-id="wf-tools"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Planning tools</button>
            <button type="button" class="pill on" data-id="wf-portals"><span class="box"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7"/></svg></span>Multiple vendor portals</button>
            </div>
          </div>
          <div class="qnav">
            <button type="button" class="btn ghost" id="navBack" disabled><span class="arl">←</span> Back</button>
            <button type="button" class="btn blue" id="navNext">Next <span class="ar">→</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- RESULTS (revealed on completion) -->
<section class="res-stage" id="results" hidden>
  <div class="wrap nrw">
    <div class="res-head reveal"><span class="eyebrow">Your result</span><h2>Your planning complexity, mapped</h2><p>An estimate of what your team juggles inside a single campaign today.</p></div>
        <div class="rcard">
          <div class="score-top">
            <div class="cap">Complexity Score</div>
            <div class="gauge-wrap">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7C3AED"/><stop offset="1" stop-color="#4C1D95"/></linearGradient>
                </defs>
                <circle cx="100" cy="100" r="84" fill="none" stroke="#EEF1F6" stroke-width="16"/>
                <circle id="gaugeArc" cx="100" cy="100" r="84" fill="none" stroke="url(#gg)" stroke-width="16" stroke-linecap="round" stroke-dasharray="527.8" stroke-dashoffset="527.8"/>
              </svg>
              <div class="gauge-num"><span class="v" id="scoreVal">0</span><span class="d">out of 100</span></div>
            </div>
            <div class="band"><span class="chip" id="bandChip">—</span></div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="mi"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8"/></svg><span>Inventory types</span></div><div class="mv" id="mInventory">0</div></div>
            <div class="metric"><div class="mi"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v6a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v6"/><circle cx="6" cy="3" r="0"/><path d="M3 6l3-3 3 3M15 18l3 3 3-3"/></svg><span>Supply paths</span></div><div class="mv" id="mPaths">0</div></div>
            <div class="metric"><div class="mi"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg><span>Platforms managed</span></div><div class="mv" id="mPlatforms">0</div></div>
            <div class="metric"><div class="mi"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg><span>Measurement sources</span></div><div class="mv" id="mMeasure">0</div></div>
            <div class="metric wide"><div class="mi"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h12"/><circle cx="19" cy="18" r="2"/></svg><span>Manual workflow steps / campaign</span></div><div class="mv" id="mSteps">0</div></div>
            <div class="metric wide"><div class="mi"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16v12H4zM4 7l8 6 8-6"/></svg><span>Emails exchanged / campaign</span></div><div class="mv" id="mEmails">0</div></div>
          </div>

          <div class="breakdown">
            <div class="bh">Where the complexity lives</div>
            <div class="brow"><span class="bl">Inventory</span><span class="bt"><span data-bar="inventory"></span></span><span class="bn" data-bn="inventory">0</span></div>
            <div class="brow"><span class="bl">Buying</span><span class="bt"><span data-bar="buying"></span></span><span class="bn" data-bn="buying">0</span></div>
            <div class="brow"><span class="bl">Audience</span><span class="bt"><span data-bar="audience"></span></span><span class="bn" data-bn="audience">0</span></div>
            <div class="brow"><span class="bl">Measurement</span><span class="bt"><span data-bar="measurement"></span></span><span class="bn" data-bn="measurement">0</span></div>
            <div class="brow"><span class="bl">Workflow</span><span class="bt"><span data-bar="workflow"></span></span><span class="bn" data-bn="workflow">0</span></div>
          </div>

          <div class="rfoot">
            <p class="note">Estimates based on the systems, routes and sources you selected. Most agencies underestimate how many disconnected touchpoints sit inside a single campaign.</p>
          </div>
        </div>

    <div class="res-actions"><button type="button" class="btn ghost" id="editAnswers"><span class="arl">←</span> Edit answers</button><a href="#cta" class="btn blue">See what changes →</a></div>
  </div>
</section>

<div id="more" hidden>
<!-- HIDDEN COST -->
<section class="sec tint" id="cost">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow">The hidden cost of complexity</span>
      <h2>Every disconnected system adds friction.</h2>
      <p>Complexity rarely shows up as a single line item. It hides in the hours, the re-keying and the reporting risk that pile up across every campaign.</p>
    </div>
    <div class="cost-grid">
      <div class="cost-hero reveal">
        <div>
          <div class="big">8–15<span class="u">hrs / week</span></div>
          <div class="lbl">spent managing fragmented workflows, per planner.</div>
        </div>
        <div class="lbl" style="opacity:.7;font-size:15px;margin-top:30px;">That’s up to <b style="color:#fff">2 working months</b> a year, per person, lost to admin instead of strategy.</div>
      </div>
      <div class="cost-list">
        <div class="cost-item reveal"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M21 3l-9 9M8 21H3v-5M3 21l9-9"/></svg></div><div><h4>Re-entering data across systems</h4><p>The same plan is rebuilt in spreadsheets, decks, portals and reporting tools — by hand, every time.</p></div></div>
        <div class="cost-item reveal"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg></div><div><h4>Increased reporting risk</h4><p>Manual handoffs mean version errors, broken formulas and numbers that don’t reconcile across reports.</p></div></div>
        <div class="cost-item reveal"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg></div><div><h4>Limited visibility across the campaign</h4><p>No single view of audiences, delivery and performance across linear, BVOD, CTV and online video.</p></div></div>
      </div>
    </div>
  </div>
</section>

<!-- WHAT CHANGES -->
<section class="sec" id="impact">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow">What changes with LightBoxTV</span>
      <h2>From many systems to one workflow.</h2>
      <p>LightBoxTV connects audience planning, inventory discovery, campaign management and measurement into a single operating system for modern TV.</p>
    </div>

    <div class="compare reveal">
      <div class="chead">
        <div class="c cur">Current workflow</div>
        <div class="c mid"></div>
        <div class="c uni">With LightBoxTV</div>
      </div>
      <div class="crow">
        <div class="cell cur"><span class="dotx"></span>Multiple disconnected systems</div>
        <div class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
        <div class="cell uni"><span class="dotx"></span>One platform</div>
      </div>
      <div class="crow">
        <div class="cell cur"><span class="dotx"></span>Multiple, conflicting reports</div>
        <div class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
        <div class="cell uni"><span class="dotx"></span>Unified reporting</div>
      </div>
      <div class="crow">
        <div class="cell cur"><span class="dotx"></span>Disconnected audiences</div>
        <div class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
        <div class="cell uni"><span class="dotx"></span>Connected data marketplace</div>
      </div>
      <div class="crow">
        <div class="cell cur"><span class="dotx"></span>Manual, repetitive workflows</div>
        <div class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
        <div class="cell uni"><span class="dotx"></span>Automated workflows</div>
      </div>
    </div>
  </div>
</section>

<!-- ESTIMATED IMPACT -->
<section class="sec tint" id="estimate">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow">Estimated impact</span>
      <h2>What you get back.</h2>
    </div>
    <div class="impact">
      <div class="istat reveal">
        <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>
        <div class="big">10<span class="u">+ hrs</span></div>
        <p>saved per planner, every week — time back for performance and client value.</p>
      </div>
      <div class="istat reveal">
        <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M17 8h4v4"/></svg></div>
        <div class="big">up to 80<span class="u">%</span></div>
        <p>fewer manual workflow steps by automating planning and reporting.</p>
      </div>
      <div class="istat reveal">
        <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/></svg></div>
        <div class="big">1</div>
        <p>single source of truth across planning, trading and analytics.</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="sec" id="cta">
  <div class="wrap">
    <div class="cta reveal">
      <h2>See your workflow, unified.</h2>
      <p>Book a demo and we’ll map your current TV planning stack onto a single LightBoxTV workflow — and show you exactly where the hours come back.</p>
      <div class="row">
        <a href="/contact?reason=demo" class="btn lite">Book a demo <span class="ar">↗</span></a>
        <a href="/#platform" class="btn clear">Explore the platform</a>
      </div>
    </div>
  </div>
</section>

</div>

<footer>
  <div class="wrap">
    <img src="/images/logo-color.png" alt="LightBoxTV" />
    <span>© 2026 LightBoxTV · The operating system for modern TV advertising.</span>
  </div>
</footer>
`;

export default function ComplexityAssessment() {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    var LS_KEY = 'lbx-complexity-v1';
    var GROUPS = ['inventory', 'buying', 'audience', 'measurement', 'workflow'];
    var MAX = { inventory: 6, buying: 4, audience: 6, measurement: 7, workflow: 6 };
    var WEIGHT = { inventory: 1.0, buying: 1.3, audience: 0.9, measurement: 1.1, workflow: 1.4 };
    var CIRC = 527.79; // 2π·84

    function $(s, c) { return (c || document).querySelector(s); }
    function $all(s, c) { return [].slice.call((c || document).querySelectorAll(s)); }

    /* ---- persistence ---- */
    function save() {
      var on = $all('.pill.on').map(function (p) { return p.dataset.id; });
      try { localStorage.setItem(LS_KEY, JSON.stringify(on)); } catch (e) {}
    }
    function restore() {
      var raw;
      try { raw = localStorage.getItem(LS_KEY); } catch (e) { return; }
      if (!raw) return; // keep markup defaults
      var on;
      try { on = JSON.parse(raw); } catch (e) { return; }
      if (!Array.isArray(on)) return;
      $all('.pill').forEach(function (p) { p.classList.toggle('on', on.indexOf(p.dataset.id) !== -1); });
    }

    /* ---- counts ---- */
    function counts() {
      var c = {};
      GROUPS.forEach(function (g) { c[g] = $all('.pills[data-group="' + g + '"] .pill.on').length; });
      c.dataPlat = $all('.pills[data-group="audience"] .pill.on[data-platform]').length;
      return c;
    }

    /* ---- derived metrics ---- */
    function metrics(c) {
      var inv = c.inventory, buy = c.buying, aud = c.audience, meas = c.measurement, wf = c.workflow;
      var supplyPaths = inv * buy;
      var platforms = buy + wf + c.dataPlat;
      var totalSel = inv + buy + aud + meas + wf;
      var steps = totalSel * 2;
      var emails = Math.round(steps * 1.6);
      var sw = WEIGHT.inventory + WEIGHT.buying + WEIGHT.audience + WEIGHT.measurement + WEIGHT.workflow;
      var s = (inv / MAX.inventory) * WEIGHT.inventory + (buy / MAX.buying) * WEIGHT.buying +
              (aud / MAX.audience) * WEIGHT.audience + (meas / MAX.measurement) * WEIGHT.measurement +
              (wf / MAX.workflow) * WEIGHT.workflow;
      var score = Math.round((s / sw) * 100);
      return { inventory: inv, supplyPaths: supplyPaths, platforms: platforms, measurement: meas, steps: steps, emails: emails, score: score };
    }

    function band(score) {
      if (score >= 76) return { t: 'Very high complexity', c: '#4C1D95', bg: 'rgba(124,58,237,.12)' };
      if (score >= 55) return { t: 'High complexity', c: '#7C3AED', bg: 'rgba(124,58,237,.14)' };
      if (score >= 30) return { t: 'Moderate complexity', c: '#7C3AED', bg: 'rgba(124,58,237,.12)' };
      if (score > 0) return { t: 'Low complexity', c: '#0E9F6E', bg: 'rgba(14,159,110,.12)' };
      return { t: 'Select to begin', c: '#8B95A4', bg: '#EFF4F9' };
    }

    /* ---- animated number ---- */
    function animateNum(el, to, fmt) {
      if (el._raf) { cancelAnimationFrame(el._raf); el._raf = null; }
      if (el._timer) { clearTimeout(el._timer); el._timer = null; }
      var from = parseFloat(el.dataset.cur || '0');
      el.dataset.cur = to;
      var setFinal = function () { el.textContent = fmt ? fmt(to) : to; };
      if (from === to || document.hidden) { setFinal(); return; }
      var dur = 480, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var e = 1 - Math.pow(1 - p, 3);
        var v = Math.round(from + (to - from) * e);
        el.textContent = fmt ? fmt(v) : v;
        if (p < 1) el._raf = requestAnimationFrame(step);
        else { setFinal(); el._raf = null; }
      }
      el._raf = requestAnimationFrame(step);
      el._timer = setTimeout(function () { if (el._raf) { cancelAnimationFrame(el._raf); el._raf = null; } setFinal(); }, dur + 260);
    }
    var emailFmt = function (v) { return v >= 50 ? '50+' : String(v); };

    /* ---- render ---- */
    function update(animate) {
      var c = counts();
      var m = metrics(c);

      setGauge(m.score, animate);
      animateNum($('#scoreVal'), m.score);
      var b = band(m.score);
      var chip = $('#bandChip');
      chip.textContent = b.t; chip.style.color = b.c; chip.style.background = b.bg;

      animateNum($('#mInventory'), m.inventory);
      animateNum($('#mPaths'), m.supplyPaths);
      animateNum($('#mPlatforms'), m.platforms);
      animateNum($('#mMeasure'), m.measurement);
      animateNum($('#mSteps'), m.steps);
      animateNum($('#mEmails'), m.emails, emailFmt);

      GROUPS.forEach(function (g) {
        var pct = MAX[g] ? (c[g] / MAX[g]) * 100 : 0;
        var bar = $('[data-bar="' + g + '"]'); if (bar) bar.style.width = pct + '%';
        var bn = $('[data-bn="' + g + '"]'); if (bn) animateNum(bn, c[g]);
      });

      save();
    }

    function setGauge(score, animate) {
      var arc = $('#gaugeArc');
      var off = CIRC * (1 - Math.max(0, Math.min(100, score)) / 100);
      if (!animate) arc.style.transition = 'none';
      else arc.style.transition = 'stroke-dashoffset .7s cubic-bezier(.4,0,.2,1)';
      arc.style.strokeDashoffset = off;
    }

    /* ---- step navigation ---- */
    var STEP = 0, NSTEP = 5;
    var NOTES = ['Just 5 quick questions', 'Quick — under a minute', 'You’re halfway there', 'Nearly done', 'Last question'];
    function showStep(n) {
      STEP = Math.max(0, Math.min(NSTEP - 1, n));
      $all('.qpanel').forEach(function (p) { p.hidden = (+p.dataset.step !== STEP); });
      var cur = $('#qCur'); if (cur) cur.textContent = STEP + 1;
      var note = $('#ftNote'); if (note) note.textContent = NOTES[STEP] || '';
      $all('#segbar .seg').forEach(function (s, i) { s.classList.toggle('on', i <= STEP); });
      $('#navBack').disabled = STEP === 0;
      $('#navNext').innerHTML = (STEP === NSTEP - 1)
        ? 'See my results <span class="ar">→</span>'
        : 'Next <span class="ar">→</span>';
    }

    /* ---- reveal results ---- */
    var _io;
    function observeReveals() {
      if (!_io) {
        _io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); _io.unobserve(e.target); } });
        }, { threshold: 0.12 });
      }
      $all('.reveal').forEach(function (el) { if (!el.classList.contains('in')) _io.observe(el); });
    }
    function resetDisplay() {
      ['#scoreVal', '#mInventory', '#mPaths', '#mPlatforms', '#mMeasure', '#mSteps', '#mEmails'].forEach(function (id) {
        var el = $(id); if (!el) return;
        if (el._raf) { cancelAnimationFrame(el._raf); el._raf = null; }
        if (el._timer) { clearTimeout(el._timer); el._timer = null; }
        el.dataset.cur = 0; el.textContent = '0';
      });
      $all('[data-bn]').forEach(function (el) { el.dataset.cur = 0; el.textContent = '0'; });
      $all('[data-bar]').forEach(function (el) { el.style.width = '0%'; });
      setGauge(0, false);
    }
    function revealResults() {
      $('#assessStage').hidden = true;
      $('#results').hidden = false;
      $('#more').hidden = false;
      resetDisplay();
      observeReveals();
      requestAnimationFrame(function () {
        var y = $('#results').getBoundingClientRect().top + window.scrollY - 16;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        requestAnimationFrame(function () { update(true); });
      });
    }
    function editAnswers() {
      $('#results').hidden = true;
      $('#more').hidden = true;
      $('#assessStage').hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showStep(STEP);
    }

    /* ---- init ---- */
    restore();
    $all('.pill').forEach(function (p) {
      p.addEventListener('click', function () { p.classList.toggle('on'); update(true); });
    });

    $('#navBack').addEventListener('click', function () { showStep(STEP - 1); });
    $('#navNext').addEventListener('click', function () {
      if (STEP === NSTEP - 1) revealResults();
      else showStep(STEP + 1);
    });
    var ea = $('#editAnswers'); if (ea) ea.addEventListener('click', editAnswers);
    showStep(0);

    update(false);
    observeReveals();
  }, []);

  return <div className="lcx" dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
