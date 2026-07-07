// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import { CTV_DATA } from "@/lib/ctv-data";

export default function CtvExplorer() {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    const D = CTV_DATA;
    var state = { inv: {}, ssp: {}, dsp: {}, mode: "explore", lastInv: null, sel: null };

    var invById = {}, sspById = {}, dspById = {};
    D.inventory.forEach(function (n) { invById[n.id] = n; });
    D.ssps.forEach(function (n) { sspById[n.id] = n; });
    D.dsps.forEach(function (n) { dspById[n.id] = n; });
    function sspsFor(invId) { return D.invSsp.filter(function (e) { return e[0] === invId; }); }
    function dspsFor(sspId) { return D.sspDsp.filter(function (e) { return e[0] === sspId; }).map(function (e) { return e[1]; }); }

    // ---- pills ----
    function pill(node, cat) {
      var b = document.createElement("button");
      b.className = "pill " + cat; b.dataset.id = node.id; b.dataset.cat = cat;
      b.innerHTML = '<span class="mono">' + node.mono + "</span>" + node.name;
      b.addEventListener("click", function () { toggle(cat, node.id); });
      return b;
    }
    var invWrap = document.getElementById("invPills"), sspWrap = document.getElementById("sspPills"), dspWrap = document.getElementById("dspPills");
    D.inventory.forEach(function (n) { invWrap.appendChild(pill(n, "inv")); });
    D.ssps.forEach(function (n) { sspWrap.appendChild(pill(n, "ssp")); });
    D.dsps.forEach(function (n) { dspWrap.appendChild(pill(n, "dsp")); });

    document.getElementById("searchInv").addEventListener("input", function (e) {
      var q = e.target.value.toLowerCase();
      [].forEach.call(invWrap.children, function (p) {
        var n = invById[p.dataset.id];
        p.classList.toggle("hidden", q && n.name.toLowerCase().indexOf(q) < 0 && n.kind.toLowerCase().indexOf(q) < 0);
      });
    });
    document.getElementById("clearInv").addEventListener("click", function () { state.inv = {}; state.lastInv = null; state.sel = null; syncPills(); rebuild(); });

    function toggle(cat, id) {
      state[cat][id] = !state[cat][id]; if (!state[cat][id]) delete state[cat][id];
      if (cat === "inv" && state.inv[id]) state.lastInv = id;
      if (cat === "inv" && !state.inv[id] && state.lastInv === id) { var k = Object.keys(state.inv); state.lastInv = k.length ? k[k.length - 1] : null; }
      syncPills(); rebuild();
      if (cat !== "inv") { /* keep */ }
      else { state.sel = { cat: "inv", id: id }; if (state.inv[id]) showDetail(id, "inv"); }
    }
    function syncPills() {
      [["inv", invWrap], ["ssp", sspWrap], ["dsp", dspWrap]].forEach(function (p) {
        [].forEach.call(p[1].children, function (el) { el.classList.toggle("on", !!state[p[0]][el.dataset.id]); });
      });
    }

    // ---- active paths ----
    function activePaths() {
      var sspF = Object.keys(state.ssp), dspF = Object.keys(state.dsp), out = [];
      Object.keys(state.inv).forEach(function (invId) {
        sspsFor(invId).forEach(function (e) {
          var sspId = e[1]; if (sspF.length && !state.ssp[sspId]) return;
          dspsFor(sspId).forEach(function (dspId) {
            if (dspF.length && !state.dsp[dspId]) return;
            out.push({ inv: invId, ssp: sspId, dsp: dspId, badge: e[2] });
          });
        });
      });
      return out;
    }

    // ---- adjacency for highlight ----
    var adj = {};
    function key(cat, id) { return cat + ":" + id; }
    function buildAdj(paths) {
      adj = {};
      function link(a, b) { (adj[a] = adj[a] || {})[b] = 1; (adj[b] = adj[b] || {})[a] = 1; }
      paths.forEach(function (p) { link(key("inv", p.inv), key("ssp", p.ssp)); link(key("ssp", p.ssp), key("dsp", p.dsp)); });
    }

    // ---- render flow ----
    var colInv = document.getElementById("colInv"), colSsp = document.getElementById("colSsp"), colDsp = document.getElementById("colDsp");
    var svg = document.getElementById("flowSvg"), flowWrap = document.getElementById("flowWrap"), emptyEl = document.getElementById("emptyState");
    var nodeEls = {}; var edgeList = [];

    function fnode(cat, node, extra) {
      var d = document.createElement("div"); d.className = "fnode " + cat; d.dataset.key = key(cat, node.id); d.dataset.id = node.id; d.dataset.cat = cat;
      var right = extra && extra.badge ? '<span class="badge-mini badge ' + extra.badge + '">' + extra.badge + "</span>" : "";
      var sub = extra && extra.sub ? '<div class="sub">' + extra.sub + "</div>" : "";
      d.innerHTML = '<span class="mono">' + node.mono + '</span><div><div class="nm">' + node.name + "</div>" + sub + "</div>" + right;
      d.addEventListener("mouseenter", function () { highlight(d.dataset.key); });
      d.addEventListener("mouseleave", function () { clearHighlight(); });
      d.addEventListener("click", function () { state.sel = { cat: cat, id: node.id }; setSel(d.dataset.key); showDetail(node.id, cat); });
      return d;
    }

    function rebuild() {
      var paths = activePaths();
      var hasInv = Object.keys(state.inv).length > 0;
      emptyEl.style.display = hasInv ? "none" : "flex";
      buildAdj(paths);
      [colInv, colSsp, colDsp].forEach(function (c) { [].slice.call(c.querySelectorAll(".fnode")).forEach(function (n) { n.remove(); }); });
      nodeEls = {};
      var invIds = Object.keys(state.inv);
      var sspSet = {}, dspSet = {};
      paths.forEach(function (p) { sspSet[p.ssp] = 1; dspSet[p.dsp] = 1; });

      invIds.forEach(function (id) {
        var sl = sspsFor(id).filter(function (e) { return sspSet[e[1]]; });
        var dd = {}; sl.forEach(function (e) { dspsFor(e[1]).forEach(function (d) { if (dspSet[d]) dd[d] = 1; }); });
        var el = fnode("inv", invById[id], { sub: invById[id].kind + " · " + sl.length + " SSP · " + Object.keys(dd).length + " DSP" });
        colInv.appendChild(el); nodeEls[key("inv", id)] = el;
      });
      D.ssps.forEach(function (s) { if (sspSet[s.id]) { var el = fnode("ssp", s, {}); colSsp.appendChild(el); nodeEls[key("ssp", s.id)] = el; } });
      D.dsps.forEach(function (d) { if (dspSet[d.id]) { var el = fnode("dsp", d, {}); colDsp.appendChild(el); nodeEls[key("dsp", d.id)] = el; } });

      document.getElementById("ctInv").textContent = invIds.length || "";
      document.getElementById("ctSsp").textContent = Object.keys(sspSet).length || "";
      document.getElementById("ctDsp").textContent = Object.keys(dspSet).length || "";

      edgeList = [];
      paths.forEach(function (p) {
        edgeList.push({ s: key("inv", p.inv), t: key("ssp", p.ssp), badge: p.badge });
        edgeList.push({ s: key("ssp", p.ssp), t: key("dsp", p.dsp), badge: null });
      });
      var seen = {}; edgeList = edgeList.filter(function (e) { var k = e.s + ">" + e.t; if (seen[k]) return false; seen[k] = 1; return true; });

      requestAnimationFrame(drawEdges);
      renderInsights();
      if (state.sel) setSel(key(state.sel.cat, state.sel.id));
      if (state.mode === "compare") renderCompare();
    }

    var BADGE_COLOR = { Direct: "#C2F042", Curated: "#A78BFA", Resold: "rgba(255,255,255,.35)", Exclusive: "#f5b15c" };
    function drawEdges() {
      var wrapRect = flowWrap.getBoundingClientRect();
      var w = flowWrap.scrollWidth, h = flowWrap.scrollHeight;
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      svg.setAttribute("width", w); svg.setAttribute("height", h);
      var ns = "http://www.w3.org/2000/svg"; svg.innerHTML = "";
      edgeList.forEach(function (e) {
        var a = nodeEls[e.s], b = nodeEls[e.t]; if (!a || !b) return;
        var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        var x1 = ra.right - wrapRect.left + flowWrap.scrollLeft, y1 = ra.top - wrapRect.top + flowWrap.scrollTop + ra.height / 2;
        var x2 = rb.left - wrapRect.left + flowWrap.scrollLeft, y2 = rb.top - wrapRect.top + flowWrap.scrollTop + rb.height / 2;
        var mx = (x1 + x2) / 2;
        var path = document.createElementNS(ns, "path");
        path.setAttribute("d", "M " + x1 + " " + y1 + " C " + mx + " " + y1 + ", " + mx + " " + y2 + ", " + x2 + " " + y2);
        path.setAttribute("class", "flow-path");
        path.setAttribute("stroke", e.badge ? BADGE_COLOR[e.badge] : "rgba(139,124,240,.5)");
        path.dataset.s = e.s; path.dataset.t = e.t;
        svg.appendChild(path);
      });
    }
    window.addEventListener("resize", function () { drawEdges(); });
    flowWrap.addEventListener("scroll", function () { drawEdges(); });

    // ---- highlight ----
    function neighbours(k) {
      var set = {}; set[k] = 1;
      (function walk(n) { Object.keys(adj[n] || {}).forEach(function (m) { if (!set[m]) { set[m] = 1; walk(m); } }); })(k);
      return set;
    }
    function highlight(k) {
      var set = neighbours(k);
      Object.keys(nodeEls).forEach(function (nk) {
        var el = nodeEls[nk]; el.classList.toggle("dim", !set[nk]); el.classList.toggle("hot", !!set[nk] && nk !== k);
      });
      if (nodeEls[k]) nodeEls[k].classList.add("hot");
      [].forEach.call(svg.children, function (p) {
        var on = set[p.dataset.s] && set[p.dataset.t];
        p.classList.toggle("dimmed", !on); p.classList.toggle("hot", on); p.classList.toggle("flowing", on);
      });
    }
    function clearHighlight() {
      Object.keys(nodeEls).forEach(function (nk) { nodeEls[nk].classList.remove("dim", "hot"); });
      [].forEach.call(svg.children, function (p) { p.classList.remove("dimmed", "hot", "flowing"); });
    }
    function setSel(k) {
      Object.keys(nodeEls).forEach(function (nk) { nodeEls[nk].classList.toggle("sel", nk === k); });
    }

    // ---- details ----
    function catLabel(cat) { return cat === "inv" ? "Inventory" : (cat === "ssp" ? "SSP · Supply-side" : "DSP · Demand-side"); }
    function showDetail(id, cat) {
      document.getElementById("detailDefault").style.display = "none";
      document.getElementById("compareBody").style.display = "none";
      var body = document.getElementById("detailBody"); body.style.display = "block";
      var node = cat === "inv" ? invById[id] : (cat === "ssp" ? sspById[id] : dspById[id]);
      var color = cat === "inv" ? "#C2F042" : (cat === "ssp" ? "#A78BFA" : "#f5b15c");
      var bdg = null, deals = [], direct = "", notes = "", routesHtml = "";

      if (cat === "inv") {
        var sl = sspsFor(id); var dd = {}; sl.forEach(function (e) { dspsFor(e[1]).forEach(function (d) { dd[d] = 1; }); });
        var hasDirect = sl.some(function (e) { return e[2] === "Direct" || e[2] === "Exclusive"; });
        direct = hasDirect ? "Direct & indirect" : "Indirect";
        deals = ["Programmatic Guaranteed", "Preferred Deal", "Curated PMP", "Open Auction"];
        var excl = sl.filter(function (e) { return e[2] === "Exclusive"; }).map(function (e) { return sspById[e[1]].name; });
        notes = node.kind + " inventory, accessible through " + sl.length + " SSP" + (sl.length !== 1 ? "s" : "") + " and " + Object.keys(dd).length + " DSP" + (Object.keys(dd).length !== 1 ? "s" : "") + "." + (excl.length ? " Exclusive access via " + excl.join(", ") + "." : "");
        bdg = hasDirect ? "Direct" : "Curated";
        var rs = [];
        sl.forEach(function (e) { dspsFor(e[1]).forEach(function (dId) { rs.push({ ssp: sspById[e[1]].name, dsp: dspById[dId].name, badge: e[2] }); }); });
        routesHtml = '<div class="sec-title" style="margin:18px 0 10px">Available routes <span style="color:var(--cyan);font-family:var(--mono);font-weight:400">' + rs.length + "</span></div><div class=\"routes\">" +
          rs.slice(0, 14).map(function (r) { return '<div class="route"><span class="step inv">' + node.name + '</span><span class="arr">→</span><span class="step ssp">' + r.ssp + '</span><span class="arr">→</span><span class="step dsp">' + r.dsp + '</span><span class="badge-mini badge ' + r.badge + '" style="margin-left:auto">' + r.badge + "</span></div>"; }).join("") + "</div>";
      } else if (cat === "ssp") {
        var ds = dspsFor(id);
        var feeders = D.invSsp.filter(function (e) { return e[1] === id && (Object.keys(state.inv).length ? state.inv[e[0]] : true); });
        var anyBadge = feeders.length ? feeders[0][2] : "Curated"; bdg = anyBadge;
        direct = (anyBadge === "Direct" || anyBadge === "Exclusive") ? "Direct" : "Resold / curated";
        deals = D.dealsFor(anyBadge);
        var fn = feeders.map(function (e) { return invById[e[0]].name; });
        notes = "Supply-side platform connecting " + (fn.length ? fn.join(", ") : "inventory") + " to " + ds.length + " DSP" + (ds.length !== 1 ? "s" : "") + ".";
        routesHtml = '<div class="sec-title" style="margin:18px 0 10px">Connects to</div><div class="routes">' + ds.map(function (dId) { return '<div class="route"><span class="step ssp">' + node.name + '</span><span class="arr">→</span><span class="step dsp">' + dspById[dId].name + "</span></div>"; }).join("") + "</div>";
      } else {
        var via = D.sspDsp.filter(function (e) { return e[1] === id; }).map(function (e) { return e[0]; });
        bdg = "Direct"; direct = "Demand endpoint"; deals = ["Programmatic Guaranteed", "Private Auction (PMP)", "Open Auction"];
        notes = "Demand-side platform, reachable via " + via.length + " SSP" + (via.length !== 1 ? "s" : "") + ".";
        routesHtml = '<div class="sec-title" style="margin:18px 0 10px">Reachable via</div><div class="routes">' + via.map(function (sId) { return '<div class="route"><span class="step ssp">' + sspById[sId].name + '</span><span class="arr">→</span><span class="step dsp">' + node.name + "</span></div>"; }).join("") + "</div>";
      }

      var html = '<div class="det-head"><div class="det-disc" style="border-color:' + color + ";color:" + color + '">' + node.mono + "</div>" +
        "<div><h2>" + node.name + '</h2><div class="det-cat">' + catLabel(cat) + "</div></div></div>";
      if (bdg) html += '<span class="badge ' + bdg + '">' + bdg + "</span>";
      html += routesHtml;
      html += '<div class="det-row"><span class="k">Path</span><span class="v">' + direct + "</span></div>";
      html += '<div class="det-row"><span class="k">PMPs available</span><span class="v yes">Yes</span></div>';
      html += '<div class="det-row"><span class="k">Open auction</span><span class="v yes">Available</span></div>';
      html += '<div class="det-row"><span class="k">Deal types</span><span class="v"><span class="chips">' + deals.map(function (d) { return '<span class="chip">' + d + "</span>"; }).join("") + "</span></span></div>";
      html += '<div class="det-notes">' + notes + "</div>";
      html += '<div class="det-foot"><span>Last updated: ' + D.updated + '</span><a href="/contact">Suggest a correction →</a></div>';
      body.innerHTML = html;
    }

    // ---- insights ----
    function renderInsights() {
      var box = document.getElementById("insights"); box.innerHTML = "";
      var focus = state.lastInv; if (!focus) return;
      var sl = sspsFor(focus); var dd = {}, routes = {};
      sl.forEach(function (e) { dspsFor(e[1]).forEach(function (d) { dd[d] = 1; routes[d] = (routes[d] || 0) + 1; }); });
      var topDsp = null, topN = -1; Object.keys(routes).forEach(function (d) { if (routes[d] > topN) { topN = routes[d]; topDsp = d; } });
      var excl = sl.filter(function (e) { return e[2] === "Exclusive"; });
      var name = invById[focus].name, items = [];
      items.push("<b>" + name + "</b> is accessible through <b>" + sl.length + " SSP" + (sl.length !== 1 ? "s" : "") + "</b> and <b>" + Object.keys(dd).length + " DSP" + (Object.keys(dd).length !== 1 ? "s" : "") + "</b>.");
      if (topDsp) items.push("<b>" + dspById[topDsp].name + "</b> offers the most routes to " + name + " (" + topN + " paths).");
      if (excl.length) items.push("<b>" + sspById[excl[0][1]].name + "</b> provides exclusive access to " + name + " inventory.");
      else items.push("Most routes to " + name + " run through curated and resold supply.");
      var icon = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7v5l3 2"/></svg>';
      items.slice(0, 3).forEach(function (t) { var el = document.createElement("div"); el.className = "insight"; el.innerHTML = '<div class="ic">' + icon + "</div><p>" + t + "</p>"; box.appendChild(el); });
    }

    // ---- compare ----
    var segBtns = document.querySelectorAll("#modeSeg button");
    segBtns.forEach(function (b) { b.addEventListener("click", function () { segBtns.forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); state.mode = b.dataset.mode; if (state.mode === "compare") enterCompare(); else exitCompare(); }); });
    function enterCompare() {
      document.getElementById("detailDefault").style.display = "none";
      document.getElementById("detailBody").style.display = "none";
      var cb = document.getElementById("compareBody"); cb.style.display = "block";
      var picked = Object.keys(state.inv); var a = picked[0] || "itvx", b = picked[1] || "disney";
      var opts = D.inventory.map(function (n) { return '<option value="' + n.id + '">' + n.name + "</option>"; }).join("");
      cb.innerHTML = '<div class="sec-title" style="margin-top:0">Compare supply paths</div><div class="cmp-pick"><select id="cmpA">' + opts + '</select><select id="cmpB">' + opts + '</select></div><div id="cmpResult"></div>';
      document.getElementById("cmpA").value = a; document.getElementById("cmpB").value = b;
      document.getElementById("cmpA").addEventListener("change", applyCompareSel);
      document.getElementById("cmpB").addEventListener("change", applyCompareSel);
      applyCompareSel();
    }
    function applyCompareSel() {
      var a = document.getElementById("cmpA").value, b = document.getElementById("cmpB").value;
      state.inv = {}; state.inv[a] = 1; state.inv[b] = 1; state.lastInv = a; syncPills(); rebuild(); renderCompare();
    }
    function exitCompare() { document.getElementById("compareBody").style.display = "none"; document.getElementById("detailDefault").style.display = "block"; }
    function renderCompare() {
      var res = document.getElementById("cmpResult"); if (!res) return;
      var a = document.getElementById("cmpA").value, b = document.getElementById("cmpB").value;
      var aS = sspsFor(a).map(function (e) { return e[1]; }), bS = sspsFor(b).map(function (e) { return e[1]; });
      var shared = aS.filter(function (x) { return bS.indexOf(x) >= 0; });
      var aU = aS.filter(function (x) { return bS.indexOf(x) < 0; }), bU = bS.filter(function (x) { return aS.indexOf(x) < 0; });
      function dsps(list) { var s = {}; list.forEach(function (id) { dspsFor(id).forEach(function (d) { s[d] = 1; }); }); return s; }
      var aD = dsps(aS), bD = dsps(bS); var dOverlap = Object.keys(aD).filter(function (x) { return bD[x]; }).length;
      var aExcl = sspsFor(a).filter(function (e) { return e[2] === "Exclusive"; }).map(function (e) { return sspById[e[1]].name; });
      var bExcl = sspsFor(b).filter(function (e) { return e[2] === "Exclusive"; }).map(function (e) { return sspById[e[1]].name; });
      function tags(list, cls) { return list.length ? list.map(function (id) { return '<span class="cmp-tag ' + cls + '">' + sspById[id].name + "</span>"; }).join("") : '<span class="cmp-tag ' + cls + '" style="opacity:.5">None</span>'; }
      var html = "";
      html += '<div class="cmp-block"><div class="h">Shared SSPs (' + shared.length + ')</div><div class="cmp-tags">' + tags(shared, "shared") + "</div></div>";
      html += '<div class="cmp-block"><div class="h">Unique to ' + invById[a].name + '</div><div class="cmp-tags">' + tags(aU, "a") + "</div></div>";
      html += '<div class="cmp-block"><div class="h">Unique to ' + invById[b].name + '</div><div class="cmp-tags">' + tags(bU, "b") + "</div></div>";
      html += '<div class="cmp-stat"><span class="n">' + dOverlap + '</span><span class="d">DSPs can reach <b style="color:#fff">both</b> sources</span></div>';
      var exTxt = (aExcl.concat(bExcl)).length ? (aExcl.concat(bExcl)).join(", ") : "No exclusive access points";
      html += '<div class="cmp-stat"><span class="n" style="font-size:14px">⚡</span><span class="d">Exclusive: ' + exTxt + "</span></div>";
      res.innerHTML = html;
    }

    // ---- seed default ----
    state.inv["disney"] = 1; state.lastInv = "disney"; state.sel = { cat: "inv", id: "disney" }; syncPills(); rebuild(); showDetail("disney", "inv");
  }, []);

  return (
    <div className="ctv">
      <div className="app">
        {/* TOP BAR */}
        <div className="topbar">
          <div className="tb-left">
            <img src="/images/logo-white.png" alt="LightBoxTV" />
            <div className="tb-div"></div>
            <div className="tb-title">
              <span className="t">CTV Supply Path Explorer</span>
              <br />
              <span className="s">Trace the routes from inventory to demand</span>
            </div>
          </div>
          <div className="tb-right">
            <div className="seg" id="modeSeg">
              <button className="on" data-mode="explore">Explore</button>
              <button data-mode="compare">Compare</button>
            </div>
            <span className="freshness"><span className="dot"></span> Last updated: June 2026</span>
          </div>
        </div>

        <div className="body">
          {/* LEFT */}
          <div className="col left">
            <div className="sec-title">Inventory <button className="clearbtn" id="clearInv">Clear</button></div>
            <div className="search">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              <input id="searchInv" type="text" placeholder="Search broadcasters, streaming, FAST…" />
            </div>
            <div className="pills" id="invPills"></div>
            <div className="hint-filter">Pick inventory to map its routes left-to-right. Click any node to see its details and deal types.</div>

            <div className="sec-title">SSP filter</div>
            <div className="pills" id="sspPills"></div>

            <div className="sec-title">DSP filter</div>
            <div className="pills" id="dspPills"></div>
            <div className="hint-filter">SSP and DSP filters narrow the routes to only those passing through your selection.</div>
          </div>

          {/* CENTRE */}
          <div className="stage">
            <div className="flow-wrap" id="flowWrap">
              <svg className="flow-svg" id="flowSvg"></svg>
              <div className="flow" id="flow">
                <div className="fcol" id="colInv"><div className="fcol-head"><span className="dotc" style={{ background: "#C2F042" }}></span> Inventory <span className="ct" id="ctInv"></span></div></div>
                <div className="fcol" id="colSsp"><div className="fcol-head"><span className="dotc" style={{ background: "#A78BFA" }}></span> Supply (SSP) <span className="ct" id="ctSsp"></span></div></div>
                <div className="fcol" id="colDsp"><div className="fcol-head"><span className="dotc" style={{ background: "#f5b15c" }}></span> Demand (DSP) <span className="ct" id="ctDsp"></span></div></div>
              </div>
              <div className="empty" id="emptyState">
                <div className="ring"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h5l3 6 3-6h5M3 18h5l3-6" /></svg></div>
                <h2>Trace a supply path</h2>
                <p>Select one or more inventory sources on the left to map the SSPs and DSPs that connect them to demand.</p>
              </div>
            </div>
            <div className="insights" id="insights"></div>
          </div>

          {/* RIGHT */}
          <div className="col right" id="rightCol">
            <div id="detailDefault" className="empty-r">
              <div className="sec-title" style={{ marginTop: 0 }}>Details</div>
              Hover a node to highlight its routes. Click any node to see platform details, available routes, deal types and access here.
            </div>
            <div id="detailBody" style={{ display: "none" }}></div>
            <div id="compareBody" style={{ display: "none" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
