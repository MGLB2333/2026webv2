// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";

// Markup is injected as raw HTML (kept verbatim from the design) and driven by
// the imperative logic in the effect below — the same pattern as CtvExplorer.
const MARKUP = `
<header class="app-header">
  <div class="brand">
    <img src="/images/logo-color.png" alt="LightBoxTV" />
    <span class="sep"></span>
    <span class="tool">VAST Tag Tester <span class="tag">Beta</span></span>
  </div>
  <a class="back" href="/">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
    Back to site
  </a>
</header>

<div class="wrap">

  <!-- INPUT -->
  <section class="card" id="inputCard">
    <div class="card-h">
      <span class="step">1</span>
      <h2>Load a VAST tag</h2>
      <span class="sub">Paste the XML or point to a tag URL</span>
      <span class="spacer"></span>
      <div class="tabs" id="ipTabs">
        <button data-pane="xml" class="on">Paste XML</button>
        <button data-pane="url">Tag URL</button>
      </div>
    </div>
    <div class="ip-body">
      <div class="pane on" id="paneXml">
        <textarea id="xmlInput" spellcheck="false" placeholder="Paste a VAST 2.0 / 3.0 / 4.x document here…"></textarea>
      </div>
      <div class="pane" id="paneUrl">
        <div class="url-row">
          <input id="urlInput" type="text" placeholder="https://adserver.example.com/vast?…" />
        </div>
        <div class="url-note">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
          Fetching a URL needs the ad server to allow cross-origin requests (CORS). If it’s blocked, paste the XML instead.
        </div>
      </div>

      <div class="ip-actions">
        <button class="btn primary" id="btnTest">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-14 9V3z"/></svg>
          Test tag
        </button>
        <button class="linkbtn" id="btnSample">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>
          Load sample tag
        </button>
        <button class="linkbtn" id="btnVpaid">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>
          Load VPAID example
        </button>
        <span class="spacer"></span>
        <label class="toggle" title="When on, tracking pixels are actually requested from your browser">
          <input type="checkbox" id="fireToggle" />
          <span class="tk"></span>
          <span>Fire real <b>tracking pixels</b></span>
        </label>
      </div>

      <div class="err" id="loadError">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
        <span id="loadErrorMsg"></span>
      </div>
    </div>

    <div class="loaded-bar" id="loadedBar">
      <span class="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Tag parsed</span>
      <span class="meta" id="loadedMeta"></span>
      <span class="warn-pill" id="vpaidPill" style="display:none"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg> VPAID</span>
      <span class="spacer"></span>
      <span class="meta" id="fireMode"></span>
    </div>

    <div class="vpaid-alert" id="vpaidAlert">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>
      <div><b>VPAID detected.</b> <span id="vpaidDetail"></span> VPAID ads run JavaScript in the player, which most CTV / OTT and server-side ad-stitched environments don’t support — this creative may fail to render or be dropped there. For CTV, prefer a simple linear MP4 (or a VAST 4 SIMID interactive file with a video fallback).</div>
    </div>
  </section>

  <!-- PLAYER + FEED -->
  <div class="main">
    <div>
      <div class="player-wrap">
        <video id="adVideo" playsinline preload="metadata"></video>
        <div class="ad-badge" id="adBadge"><span class="dot"></span><span id="adBadgeTitle">Ad</span><span class="skip" id="adBadgeSkip"></span></div>
        <div class="p-empty" id="pEmpty">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><polygon points="10 8 15 11 10 14 10 8" fill="currentColor" stroke="none"/></svg>
          <p>Load a VAST tag to preview the ad and watch its tracking events fire.</p>
        </div>
        <button class="p-big hide" id="pBig" aria-label="Play"><span class="circle"><svg viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg></span></button>
      </div>
      <div class="controls">
        <div class="track" id="track">
          <div class="rail"></div>
          <div class="fill" id="trackFill"></div>
          <div class="qmark" style="left:25%"></div>
          <div class="qmark" style="left:50%"></div>
          <div class="qmark" style="left:75%"></div>
          <div class="pip dot-imp" id="pip-impression" style="left:0%"></div>
          <div class="pip" id="pip-firstQuartile" style="left:25%"></div>
          <div class="pip" id="pip-midpoint" style="left:50%"></div>
          <div class="pip" id="pip-thirdQuartile" style="left:75%"></div>
          <div class="pip" id="pip-complete" style="left:100%"></div>
          <div class="head" id="trackHead" style="left:0%"></div>
        </div>
        <div class="ctrl-row">
          <button class="iconbtn" id="ctrlPlay" aria-label="Play/Pause">
            <svg id="iconPlay" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>
            <svg id="iconPause" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M7 4h4v16H7zM13 4h4v16h-4z"/></svg>
          </button>
          <button class="iconbtn" id="ctrlMute" aria-label="Mute">
            <svg id="iconVol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            <svg id="iconMute" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M23 9l-6 6M17 9l6 6"/></svg>
          </button>
          <span class="time"><b id="curTime">0:00</b> / <span id="durTime">0:00</span></span>
          <span class="spacer"></span>
          <div class="legend">
            <i class="imp">Impression</i><i class="qt">Quartile</i><i class="ix">Interaction</i><i class="ck">Click</i>
          </div>
          <button class="iconbtn" id="ctrlFs" aria-label="Fullscreen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- FEED -->
    <div class="card feed-card">
      <div class="feed-h">
        <h2>Event feed</h2>
        <span class="live"><span class="d"></span> Live</span>
        <span class="spacer"></span>
        <span class="count"><b id="firedCount">0</b> fired</span>
        <button class="clear" id="btnClear">Clear</button>
      </div>
      <div class="feed" id="feed">
        <div class="feed-empty" id="feedEmpty">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
          <p>Tracking events will appear here as the ad plays.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- DETAILS -->
  <section class="card details">
    <div class="det-tabs" id="detTabs">
      <button data-pane="overview" class="on">Overview</button>
      <button data-pane="media">Media files <span class="n" id="nMedia">0</span></button>
      <button data-pane="tracking">Tracking events <span class="n" id="nTrack">0</span></button>
      <button data-pane="raw">Raw XML</button>
    </div>
    <div class="det-body">
      <div class="det-pane on" id="paneOverview"><div class="det-empty">No tag loaded yet.</div></div>
      <div class="det-pane" id="paneMedia"><div class="det-empty">No tag loaded yet.</div></div>
      <div class="det-pane" id="paneTracking"><div class="det-empty">No tag loaded yet.</div></div>
      <div class="det-pane" id="paneRaw"><div class="det-empty">No tag loaded yet.</div></div>
    </div>
  </section>

  <p class="foot">VAST Tag Tester · Supports VAST 2.0–4.x inline &amp; wrapper linear ads · Tracking pixels are simulated unless “Fire real tracking pixels” is enabled.</p>
</div>
`;

export default function TagTester() {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    /* ---------- sample tag ---------- */
    var SAMPLE = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<VAST version="3.0">',
      '  <Ad id="lbx-demo-001">',
      '    <InLine>',
      '      <AdSystem version="2.0">LightBoxTV Demo</AdSystem>',
      '      <AdTitle>Sintel Trailer — Demo Spot</AdTitle>',
      '      <Description>Sample inline linear ad for testing the VAST tester.</Description>',
      '      <Advertiser>LightBoxTV</Advertiser>',
      '      <Error><![CDATA[https://example.com/vast/error?code=[ERRORCODE]&cb=[CACHEBUSTING]]]></Error>',
      '      <Impression><![CDATA[https://example.com/vast/impression?cb=[CACHEBUSTING]]]></Impression>',
      '      <Impression id="lbx"><![CDATA[https://metrics.lightboxtv.com/imp?cb=[CACHEBUSTING]]]></Impression>',
      '      <Creatives>',
      '        <Creative id="1" sequence="1">',
      '          <Linear skipoffset="00:00:05">',
      '            <Duration>00:00:52</Duration>',
      '            <TrackingEvents>',
      '              <Tracking event="start"><![CDATA[https://example.com/vast/start]]></Tracking>',
      '              <Tracking event="firstQuartile"><![CDATA[https://example.com/vast/q1]]></Tracking>',
      '              <Tracking event="midpoint"><![CDATA[https://example.com/vast/q2]]></Tracking>',
      '              <Tracking event="thirdQuartile"><![CDATA[https://example.com/vast/q3]]></Tracking>',
      '              <Tracking event="complete"><![CDATA[https://example.com/vast/complete]]></Tracking>',
      '              <Tracking event="pause"><![CDATA[https://example.com/vast/pause]]></Tracking>',
      '              <Tracking event="resume"><![CDATA[https://example.com/vast/resume]]></Tracking>',
      '              <Tracking event="mute"><![CDATA[https://example.com/vast/mute]]></Tracking>',
      '              <Tracking event="unmute"><![CDATA[https://example.com/vast/unmute]]></Tracking>',
      '              <Tracking event="fullscreen"><![CDATA[https://example.com/vast/fullscreen]]></Tracking>',
      '              <Tracking event="skip"><![CDATA[https://example.com/vast/skip]]></Tracking>',
      '            </TrackingEvents>',
      '            <VideoClicks>',
      '              <ClickThrough><![CDATA[https://lightboxtv.com]]></ClickThrough>',
      '              <ClickTracking><![CDATA[https://example.com/vast/click?cb=[CACHEBUSTING]]]></ClickTracking>',
      '            </VideoClicks>',
      '            <MediaFiles>',
      '              <MediaFile delivery="progressive" type="video/mp4" width="854" height="480" bitrate="1200"><![CDATA[https://media.w3.org/2010/05/sintel/trailer.mp4]]></MediaFile>',
      '              <MediaFile delivery="progressive" type="video/mp4" width="480" height="270" bitrate="600"><![CDATA[https://media.w3.org/2010/05/sintel/trailer.mp4]]></MediaFile>',
      '            </MediaFiles>',
      '          </Linear>',
      '        </Creative>',
      '      </Creatives>',
      '    </InLine>',
      '  </Ad>',
      '</VAST>'
    ].join('\n');

    /* sample VPAID tag (flags the CTV warning; keeps an MP4 fallback so it still previews) */
    var SAMPLE_VPAID = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<VAST version="3.0">',
      '  <Ad id="lbx-vpaid-001">',
      '    <InLine>',
      '      <AdSystem>LightBoxTV Demo</AdSystem>',
      '      <AdTitle>VPAID Interactive — Demo Spot</AdTitle>',
      '      <Impression><![CDATA[https://example.com/vast/impression]]></Impression>',
      '      <Creatives>',
      '        <Creative id="1" sequence="1" apiFramework="VPAID">',
      '          <Linear>',
      '            <Duration>00:00:30</Duration>',
      '            <TrackingEvents>',
      '              <Tracking event="start"><![CDATA[https://example.com/vast/start]]></Tracking>',
      '              <Tracking event="firstQuartile"><![CDATA[https://example.com/vast/q1]]></Tracking>',
      '              <Tracking event="midpoint"><![CDATA[https://example.com/vast/q2]]></Tracking>',
      '              <Tracking event="thirdQuartile"><![CDATA[https://example.com/vast/q3]]></Tracking>',
      '              <Tracking event="complete"><![CDATA[https://example.com/vast/complete]]></Tracking>',
      '            </TrackingEvents>',
      '            <VideoClicks>',
      '              <ClickThrough><![CDATA[https://lightboxtv.com]]></ClickThrough>',
      '            </VideoClicks>',
      '            <MediaFiles>',
      '              <MediaFile delivery="progressive" type="application/javascript" apiFramework="VPAID" width="640" height="480"><![CDATA[https://example.com/vpaid/interactive-ad.js]]></MediaFile>',
      '              <MediaFile delivery="progressive" type="video/mp4" width="854" height="480" bitrate="1200"><![CDATA[https://media.w3.org/2010/05/sintel/trailer.mp4]]></MediaFile>',
      '            </MediaFiles>',
      '          </Linear>',
      '        </Creative>',
      '      </Creatives>',
      '    </InLine>',
      '  </Ad>',
      '</VAST>'
    ].join('\n');

    /* ---------- helpers ---------- */
    var $ = function (id) { return document.getElementById(id); };
    function txt(node) { return node ? (node.textContent || '').trim() : ''; }
    function hms(sec) {
      if (!isFinite(sec) || sec < 0) sec = 0;
      var m = Math.floor(sec / 60), s = Math.floor(sec % 60);
      return m + ':' + (s < 10 ? '0' : '') + s;
    }
    function parseDur(d) {
      if (!d) return 0;
      var p = d.split(':').map(parseFloat);
      if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
      if (p.length === 2) return p[0] * 60 + p[1];
      return parseFloat(d) || 0;
    }
    function macros(url, extra) {
      var rep = Object.assign({
        '[CACHEBUSTING]': Math.floor(Math.random() * 1e8),
        '[TIMESTAMP]': new Date().toISOString(),
        '[ERRORCODE]': '0',
        '[CONTENTPLAYHEAD]': extra && extra.playhead || '00:00:00',
        '[ASSETURI]': '', '[ADPLAYHEAD]': extra && extra.playhead || '00:00:00'
      }, extra || {});
      var out = url;
      Object.keys(rep).forEach(function (k) {
        out = out.split(k).join(encodeURIComponent ? rep[k] : rep[k]);
      });
      return out;
    }
    function ph(sec) {
      var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = Math.floor(sec % 60);
      var p = function (n) { return (n < 10 ? '0' : '') + n; };
      return p(h) + ':' + p(m) + ':' + p(s);
    }

    /* ---------- VAST parser ---------- */
    function parseVAST(str) {
      var doc = new DOMParser().parseFromString(str, 'text/xml');
      if (doc.querySelector('parsererror')) throw new Error('The document is not valid XML. Check that the full VAST was pasted.');
      var vast = doc.querySelector('VAST');
      if (!vast) throw new Error('No <VAST> root element found.');
      var version = vast.getAttribute('version') || '?';
      var adEl = doc.querySelector('Ad');
      if (!adEl) throw new Error('No <Ad> element found in this VAST.');

      var inline = adEl.querySelector('InLine');
      var wrapper = adEl.querySelector('Wrapper');
      var src = inline || wrapper;
      if (!src) throw new Error('<Ad> contains neither <InLine> nor <Wrapper>.');

      var out = {
        version: version,
        type: inline ? 'InLine' : 'Wrapper',
        adId: adEl.getAttribute('id') || '',
        adSystem: txt(src.querySelector('AdSystem')),
        adTitle: txt(src.querySelector('AdTitle')),
        description: txt(src.querySelector('Description')),
        advertiser: txt(src.querySelector('Advertiser')),
        wrapperUri: txt(src.querySelector('VASTAdTagURI')),
        errors: [], impressions: [],
        mediaFiles: [], tracking: {}, clickThrough: '', clickTracking: [],
        duration: 0, skipoffset: '', vpaid: false, vpaidWhere: [], apiFrameworks: []
      };
      [].forEach.call(src.querySelectorAll('Error'), function (n) { if (txt(n)) out.errors.push(txt(n)); });
      [].forEach.call(src.querySelectorAll('Impression'), function (n) { if (txt(n)) out.impressions.push(txt(n)); });

      var linear = src.querySelector('Linear');
      if (linear) {
        out.duration = parseDur(txt(linear.querySelector('Duration')));
        out.skipoffset = linear.getAttribute('skipoffset') || '';
        [].forEach.call(linear.querySelectorAll('MediaFiles > MediaFile'), function (m) {
          var url = txt(m);
          if (!url) return;
          out.mediaFiles.push({
            url: url,
            type: m.getAttribute('type') || '',
            delivery: m.getAttribute('delivery') || '',
            width: +m.getAttribute('width') || 0,
            height: +m.getAttribute('height') || 0,
            bitrate: +m.getAttribute('bitrate') || 0,
            apiFramework: m.getAttribute('apiFramework') || ''
          });
        });
        [].forEach.call(linear.querySelectorAll('TrackingEvents > Tracking'), function (t) {
          var ev = t.getAttribute('event'); if (!ev) return;
          (out.tracking[ev] = out.tracking[ev] || []).push(txt(t));
        });
        out.clickThrough = txt(linear.querySelector('VideoClicks > ClickThrough'));
        [].forEach.call(linear.querySelectorAll('VideoClicks > ClickTracking'), function (c) { if (txt(c)) out.clickTracking.push(txt(c)); });
      }

      // VPAID / interactivity detection — apiFramework anywhere in the ad,
      // plus VAST 4 InteractiveCreativeFile and JS/Flash media types.
      [].forEach.call(src.querySelectorAll('[apiFramework]'), function (el) {
        var a = (el.getAttribute('apiFramework') || '').trim();
        if (!a) return;
        if (out.apiFrameworks.indexOf(a) === -1) out.apiFrameworks.push(a);
        if (/vpaid/i.test(a)) {
          out.vpaid = true;
          var tagn = el.tagName.replace(/^.*:/, '');
          if (out.vpaidWhere.indexOf(tagn) === -1) out.vpaidWhere.push(tagn);
        }
      });
      if (src.querySelector('InteractiveCreativeFile') && out.vpaidWhere.indexOf('InteractiveCreativeFile') === -1) {
        out.mediaFiles.forEach(function () {});
      }
      out.mediaFiles.forEach(function (m) {
        if (/application\/(x-)?javascript|x-shockwave-flash/i.test(m.type) && !out.vpaid) {
          out.vpaid = true;
          if (out.vpaidWhere.indexOf('MediaFile') === -1) out.vpaidWhere.push('MediaFile');
        }
      });
      return out;
    }

    function pickMedia(files) {
      var v = $('adVideo');
      var playable = files.filter(function (f) {
        if (!/mp4|webm|ogg/i.test(f.type) && !/\.(mp4|webm|ogv)/i.test(f.url)) return false;
        if (f.type && v.canPlayType && v.canPlayType(f.type) === '') return false;
        return true;
      });
      if (!playable.length) playable = files.slice();
      playable.sort(function (a, b) { return (b.bitrate || b.width) - (a.bitrate || a.width); });
      return playable[0] || null;
    }

    /* ---------- state ---------- */
    var TAG = null, MEDIA = null, fired = {}, firedCount = 0, started = false, lastMuted = false;
    var CAT = {
      impression: 'imp', start: 'imp',
      firstQuartile: 'qt', midpoint: 'qt', thirdQuartile: 'qt', complete: 'qt',
      pause: 'ix', resume: 'ix', mute: 'ix', unmute: 'ix', fullscreen: 'ix', exitFullscreen: 'ix', skip: 'ix', rewind: 'ix',
      clickthrough: 'ck', clicktracking: 'ck', error: 'err'
    };
    var CATLABEL = { imp: 'Impression', qt: 'Quartile', ix: 'Interaction', ck: 'Click', err: 'Error' };

    /* ---------- event firing ---------- */
    function fire(name, urls, opts) {
      opts = opts || {};
      var cat = CAT[name.toLowerCase()] || 'ix';
      var v = $('adVideo');
      var playhead = ph(v.currentTime || 0);
      urls = (urls || []).filter(Boolean);
      var doSend = $('fireToggle').checked && !opts.noSend;
      var resolved = urls.map(function (u) { return macros(u, { playhead: playhead }); });

      if (doSend) {
        resolved.forEach(function (u) { try { var img = new Image(); img.src = u; } catch (e) {} });
      }
      addRow({
        name: opts.label || name,
        cat: cat,
        t: v.currentTime || 0,
        urls: resolved,
        status: urls.length ? (doSend ? 'sent' : 'logged') : 'no pixel'
      });
      firedCount++;
      $('firedCount').textContent = firedCount;
      var pip = $('pip-' + name);
      if (pip) pip.classList.add('on');
    }

    function addRow(e) {
      $('feedEmpty').style.display = 'none';
      var row = document.createElement('div');
      row.className = 'ev';
      var urlsHtml = e.urls.length
        ? e.urls.map(function (u) { return '<div class="ev-url"><span class="b">›</span><span>' + esc(u) + '</span></div>'; }).join('')
        : '<div class="ev-none">No tracking URL defined for this event in the tag.</div>';
      var stCls = e.status === 'sent' ? 'sent' : '';
      row.innerHTML =
        '<div class="ev-top">' +
          '<span class="dotcol dot-' + e.cat + '"></span>' +
          '<span class="ev-t">' + fmtT(e.t) + '</span>' +
          '<span class="ev-name">' + esc(e.name) + '</span>' +
          '<span class="ev-cat cat-' + e.cat + '">' + CATLABEL[e.cat] + '</span>' +
          '<span class="ev-status ' + stCls + '">' + e.status + '</span>' +
        '</div>' +
        '<div class="ev-urls">' + urlsHtml + '</div>';
      row.addEventListener('click', function () { row.classList.toggle('open'); });
      var feed = $('feed');
      feed.appendChild(row);
      feed.scrollTop = feed.scrollHeight;
    }
    function fmtT(sec) { var m = Math.floor(sec / 60), s = (sec % 60).toFixed(1); return m + ':' + (s < 10 ? '0' : '') + s; }
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

    /* ---------- player wiring ---------- */
    function loadTag(tag) {
      TAG = tag;
      MEDIA = pickMedia(tag.mediaFiles);
      resetPlayback();
      renderLoaded(); renderDetails();

      var v = $('adVideo');
      if (MEDIA) {
        v.src = MEDIA.url;
        v.load();
        $('pEmpty').classList.add('hide');
        $('pBig').classList.remove('hide');
        $('adBadge').classList.add('show');
        $('adBadgeTitle').textContent = tag.adTitle || 'Ad';
        $('adBadgeSkip').textContent = tag.skipoffset ? '· skip ' + hms(parseDur(tag.skipoffset)) : '';
      } else {
        $('pEmpty').classList.remove('hide');
        $('pEmpty').querySelector('p').textContent = 'Tag parsed, but no playable MP4/WebM media file was found. See the Media files tab.';
        $('pBig').classList.add('hide');
      }
    }

    function resetPlayback() {
      fired = {}; firedCount = 0; started = false;
      $('firedCount').textContent = '0';
      $('feed').querySelectorAll('.ev').forEach(function (n) { n.remove(); });
      $('feedEmpty').style.display = '';
      ['impression', 'firstQuartile', 'midpoint', 'thirdQuartile', 'complete'].forEach(function (k) {
        var p = $('pip-' + k); if (p) p.classList.remove('on');
      });
    }

    function setupPlayer() {
      var v = $('adVideo');

      function tick() {
        var d = v.duration || TAG && TAG.duration || 0;
        var pct = d ? (v.currentTime / d) * 100 : 0;
        $('trackFill').style.width = pct + '%';
        $('trackHead').style.left = pct + '%';
        $('curTime').textContent = hms(v.currentTime);
        if (d) $('durTime').textContent = hms(d);

        if (!TAG) return;
        if (!started && v.currentTime > 0.05) {
          started = true;
          fire('impression', TAG.impressions);
          fire('start', TAG.tracking.start);
        }
        var f = v.currentTime / d;
        if (started && d) {
          if (f >= 0.25) once('firstQuartile', function () { fire('firstQuartile', TAG.tracking.firstQuartile); });
          if (f >= 0.50) once('midpoint', function () { fire('midpoint', TAG.tracking.midpoint); });
          if (f >= 0.75) once('thirdQuartile', function () { fire('thirdQuartile', TAG.tracking.thirdQuartile); });
        }
      }
      function once(key, fn) { if (!fired[key]) { fired[key] = true; fn(); } }

      v.addEventListener('timeupdate', tick);
      v.addEventListener('loadedmetadata', function () { $('durTime').textContent = hms(v.duration); });
      v.addEventListener('play', function () {
        swapPlay(true);
        $('pBig').classList.add('hide');
        if (started) fire('resume', TAG.tracking.resume);
      });
      v.addEventListener('pause', function () {
        swapPlay(false);
        if (started && !v.ended) fire('pause', TAG.tracking.pause);
      });
      v.addEventListener('ended', function () {
        once('complete', function () { fire('complete', TAG.tracking.complete); });
        swapPlay(false);
        $('pBig').classList.remove('hide');
      });
      v.addEventListener('volumechange', function () {
        if (!started || !TAG) { lastMuted = v.muted; return; }
        if (v.muted && !lastMuted) fire('mute', TAG.tracking.mute);
        if (!v.muted && lastMuted) fire('unmute', TAG.tracking.unmute);
        lastMuted = v.muted;
        swapMute(v.muted);
      });
      v.addEventListener('click', doClick);
      document.addEventListener('fullscreenchange', function () {
        if (!started || !TAG) return;
        if (document.fullscreenElement) fire('fullscreen', TAG.tracking.fullscreen);
        else fire('exitFullscreen', TAG.tracking.exitFullscreen, { label: 'exitFullscreen' });
      });

      // controls
      $('pBig').addEventListener('click', function () { v.play(); });
      $('ctrlPlay').addEventListener('click', function () { v.paused ? v.play() : v.pause(); });
      $('ctrlMute').addEventListener('click', function () { v.muted = !v.muted; });
      $('ctrlFs').addEventListener('click', function () {
        var w = $('adVideo').closest('.player-wrap');
        if (document.fullscreenElement) document.exitFullscreen();
        else if (w.requestFullscreen) w.requestFullscreen();
      });

      // seek
      var track = $('track'), dragging = false;
      function seek(clientX) {
        var r = track.getBoundingClientRect();
        var p = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
        var d = v.duration || 0;
        if (d) v.currentTime = p * d;
      }
      track.addEventListener('pointerdown', function (e) { dragging = true; track.setPointerCapture(e.pointerId); seek(e.clientX); });
      track.addEventListener('pointermove', function (e) { if (dragging) seek(e.clientX); });
      track.addEventListener('pointerup', function () { dragging = false; });
    }

    function doClick() {
      if (!TAG || !started) return;
      fire('clickTracking', TAG.clickTracking, { label: 'clickThrough' });
      if (TAG.clickThrough) {
        addRow({ name: 'open clickThrough', cat: 'ck', t: $('adVideo').currentTime, urls: [TAG.clickThrough], status: 'opened' });
        window.open(TAG.clickThrough, '_blank', 'noopener');
      }
    }
    function swapPlay(playing) {
      $('iconPlay').style.display = playing ? 'none' : '';
      $('iconPause').style.display = playing ? '' : 'none';
    }
    function swapMute(muted) {
      $('iconVol').style.display = muted ? 'none' : '';
      $('iconMute').style.display = muted ? '' : 'none';
    }

    /* ---------- rendering ---------- */
    function renderLoaded() {
      $('loadedBar').classList.add('show');
      var bits = [];
      bits.push('<b>VAST ' + esc(TAG.version) + '</b> ' + TAG.type);
      if (TAG.adTitle) bits.push('“' + esc(TAG.adTitle) + '”');
      if (MEDIA) bits.push(MEDIA.width + '×' + MEDIA.height + ' ' + (MEDIA.type || 'video'));
      bits.push(Object.keys(TAG.tracking).length + ' tracking events');
      $('loadedMeta').innerHTML = bits.join(' &nbsp;·&nbsp; ');
      var vp = $('vpaidPill'), al = $('vpaidAlert');
      if (TAG.vpaid) {
        vp.style.display = '';
        al.classList.add('show');
        $('vpaidDetail').textContent = 'Detected in ' + (TAG.vpaidWhere.join(', ') || 'this tag') + '.';
      } else { vp.style.display = 'none'; al.classList.remove('show'); }
      updateFireMode();
    }
    function updateFireMode() {
      var on = $('fireToggle').checked;
      $('fireMode').innerHTML = on
        ? '<b style="color:var(--red)">● Firing real pixels</b>'
        : '● Simulating (pixels logged only)';
    }

    function renderDetails() {
      // overview
      var ov = [];
      function item(k, v, mono) { if (!v && v !== 0) v = '—'; ov.push('<div class="ov-item"><div class="k">' + k + '</div><div class="v' + (mono ? ' mono' : '') + '">' + v + '</div></div>'); }
      item('VAST version', esc(TAG.version));
      item('Ad type', TAG.type);
      item('Ad ID', esc(TAG.adId), true);
      item('Ad system', esc(TAG.adSystem));
      item('Ad title', esc(TAG.adTitle));
      item('Advertiser', esc(TAG.advertiser));
      item('Declared duration', TAG.duration ? hms(TAG.duration) : '—');
      item('Skip offset', TAG.skipoffset ? esc(TAG.skipoffset) : 'Not skippable');
      item('Interactivity / VPAID', TAG.vpaid
        ? '<span style="color:#B45309;font-weight:700">⚠ VPAID — limited CTV support</span>'
        : (TAG.apiFrameworks.length ? esc(TAG.apiFrameworks.join(', ')) : '<span style="color:var(--green)">None — simple linear</span>'));
      item('Impressions', TAG.impressions.length);
      item('Click-through', TAG.clickThrough ? '<a href="' + esc(TAG.clickThrough) + '" target="_blank" rel="noopener">' + esc(TAG.clickThrough) + '</a>' : '—');
      if (TAG.type === 'Wrapper' && TAG.wrapperUri) item('Wrapper redirects to', esc(TAG.wrapperUri), true);
      $('paneOverview').innerHTML = '<div class="ov-grid">' + ov.join('') + '</div>';

      // media
      $('nMedia').textContent = TAG.mediaFiles.length;
      if (TAG.mediaFiles.length) {
        var rows = TAG.mediaFiles.map(function (m) {
          var best = MEDIA && m.url === MEDIA.url && m.width === MEDIA.width;
          var isVpaid = /vpaid/i.test(m.apiFramework);
          var apiCell = isVpaid ? '<span class="pill warn">VPAID</span>'
            : (m.apiFramework ? '<span class="pill">' + esc(m.apiFramework) + '</span>' : '<span style="color:var(--faint)">—</span>');
          return '<tr><td>' + (best ? '<span class="pill best">▶ playing</span>' : '<span class="pill">' + esc(m.delivery || '—') + '</span>') + '</td>' +
            '<td class="mono">' + esc(m.type || '—') + '</td>' +
            '<td>' + apiCell + '</td>' +
            '<td class="mono">' + (m.width && m.height ? m.width + '×' + m.height : '—') + '</td>' +
            '<td class="mono">' + (m.bitrate ? m.bitrate + 'k' : '—') + '</td>' +
            '<td class="mono">' + esc(m.url) + '</td></tr>';
        }).join('');
        $('paneMedia').innerHTML = '<table class="dt"><thead><tr><th>Delivery</th><th>Type</th><th>API</th><th>Size</th><th>Bitrate</th><th>URL</th></tr></thead><tbody>' + rows + '</tbody></table>';
      } else $('paneMedia').innerHTML = '<div class="det-empty">No media files in this tag.</div>';

      // tracking
      var evNames = Object.keys(TAG.tracking);
      var trackingRows = [];
      var order = ['start', 'firstQuartile', 'midpoint', 'thirdQuartile', 'complete', 'pause', 'resume', 'mute', 'unmute', 'fullscreen', 'exitFullscreen', 'skip'];
      trackingRows.push(trkRow('impression', TAG.impressions));
      order.forEach(function (e) { if (TAG.tracking[e]) trackingRows.push(trkRow(e, TAG.tracking[e])); });
      evNames.forEach(function (e) { if (order.indexOf(e) === -1) trackingRows.push(trkRow(e, TAG.tracking[e])); });
      if (TAG.clickThrough || TAG.clickTracking.length) trackingRows.push(trkRow('clickThrough', TAG.clickTracking.concat(TAG.clickThrough ? [TAG.clickThrough] : [])));
      if (TAG.errors.length) trackingRows.push(trkRow('error', TAG.errors));
      $('nTrack').textContent = evNames.length;
      $('paneTracking').innerHTML = '<table class="dt"><thead><tr><th>Event</th><th>Fires at</th><th>URLs</th></tr></thead><tbody>' + trackingRows.join('') + '</tbody></table>';

      // raw
      $('paneRaw').innerHTML = '<pre class="raw">' + highlight(TAG._raw) + '</pre>';
    }

    function trkRow(name, urls) {
      urls = (urls || []).filter(Boolean);
      var when = {
        impression: 'ad start', start: '0%', firstQuartile: '25%', midpoint: '50%', thirdQuartile: '75%', complete: '100%',
        clickThrough: 'on click', error: 'on error'
      }[name] || 'on ' + name;
      var urlsHtml = urls.length ? urls.map(function (u) { return '<div>' + esc(u) + '</div>'; }).join('') : '<span style="color:var(--faint)">—</span>';
      return '<tr><td><span class="ev-tag">' + esc(name) + '</span></td><td class="mono">' + when + '</td><td class="mono">' + urlsHtml + '</td></tr>';
    }

    function highlight(xml) {
      return esc(xml)
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="cm">$1</span>')
        .replace(/(&lt;!\[CDATA\[)([\s\S]*?)(\]\]&gt;)/g, '<span class="cd">$1$2$3</span>')
        .replace(/(&lt;\/?)([\w:.-]+)/g, '$1<span class="tg">$2</span>')
        .replace(/([\w:.-]+)=(&quot;[^&]*?&quot;)/g, '<span class="at">$1</span>=<span class="av">$2</span>');
    }

    /* ---------- load flows ---------- */
    function showError(msg) {
      $('loadErrorMsg').textContent = msg;
      $('loadError').classList.add('show');
    }
    function clearError() { $('loadError').classList.remove('show'); }

    function doTest() {
      clearError();
      var activePane = document.querySelector('#ipTabs button.on').dataset.pane;
      if (activePane === 'url') {
        var url = $('urlInput').value.trim();
        if (!url) { showError('Enter a VAST tag URL, or switch to “Paste XML”.'); return; }
        fetchUrl(url);
      } else {
        var str = $('xmlInput').value.trim();
        if (!str) { showError('Paste a VAST document first, or click “Load sample tag”.'); return; }
        tryParse(str);
      }
    }

    function tryParse(str) {
      try {
        var tag = parseVAST(str);
        tag._raw = str;
        if (tag.type === 'Wrapper') {
          if (tag.wrapperUri) {
            loadTag(tag);
            showWrapperNotice(tag.wrapperUri);
            return;
          }
        }
        if (!tag.mediaFiles.length && tag.type === 'InLine') {
          loadTag(tag);
          showError('Parsed OK, but this inline ad has no <MediaFile>. Nothing to play.');
          return;
        }
        loadTag(tag);
      } catch (e) {
        showError(e.message || 'Could not parse this VAST document.');
      }
    }

    function showWrapperNotice(uri) {
      $('loadErrorMsg').innerHTML = 'This is a <b>Wrapper</b> tag. The real ad lives at the redirect URL — click below to follow it (needs CORS).';
      $('loadError').classList.add('show');
      var b = document.createElement('button');
      b.className = 'btn ghost'; b.style.marginTop = '4px'; b.textContent = 'Follow wrapper →';
      b.addEventListener('click', function () { clearError(); fetchUrl(uri, true); });
      $('loadErrorMsg').appendChild(document.createElement('br'));
      $('loadErrorMsg').appendChild(b);
    }

    function fetchUrl(url, fromWrapper) {
      clearError();
      $('btnTest').disabled = true;
      fetch(url, { credentials: 'omit' })
        .then(function (r) { if (!r.ok) throw new Error('Server returned HTTP ' + r.status); return r.text(); })
        .then(function (str) { tryParse(str); })
        .catch(function (e) {
          showError('Could not fetch the tag' + (fromWrapper ? ' (wrapper redirect)' : '') + ': ' + e.message +
            '. Most ad servers block cross-origin requests — paste the XML response instead.');
        })
        .finally(function () { $('btnTest').disabled = false; });
    }

    /* ---------- tab + button wiring ---------- */
    function initTabs(containerId, btnSel, paneFn) {
      var c = $(containerId);
      c.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        [].forEach.call(c.querySelectorAll('button'), function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        paneFn(b.dataset.pane);
      });
    }

    // init (runs now — the markup is already mounted)
    setupPlayer();

    initTabs('ipTabs', null, function (p) {
      $('paneXml').classList.toggle('on', p === 'xml');
      $('paneUrl').classList.toggle('on', p === 'url');
    });
    initTabs('detTabs', null, function (p) {
      ['overview', 'media', 'tracking', 'raw'].forEach(function (k) {
        $('pane' + k.charAt(0).toUpperCase() + k.slice(1)).classList.toggle('on', k === p);
      });
    });

    $('btnTest').addEventListener('click', doTest);
    $('btnSample').addEventListener('click', function () {
      document.querySelector('#ipTabs button[data-pane="xml"]').click();
      $('xmlInput').value = SAMPLE;
      clearError();
      tryParse(SAMPLE);
    });
    $('btnVpaid').addEventListener('click', function () {
      document.querySelector('#ipTabs button[data-pane="xml"]').click();
      $('xmlInput').value = SAMPLE_VPAID;
      clearError();
      tryParse(SAMPLE_VPAID);
    });
    $('btnClear').addEventListener('click', function () {
      $('feed').querySelectorAll('.ev').forEach(function (n) { n.remove(); });
      $('feedEmpty').style.display = '';
      firedCount = 0; $('firedCount').textContent = '0';
    });
    $('fireToggle').addEventListener('change', function () { if (TAG) updateFireMode(); });

    $('xmlInput').addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); doTest(); }
    });
  }, []);

  return <div className="vtt" dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
