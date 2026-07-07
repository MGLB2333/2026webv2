"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { profiles, order, popular, updated } from "@/lib/tvdir-data";

const TYPES = ["Broadcaster", "BVOD", "AVOD", "FAST", "Streaming", "Retail Media Video"];
const MARKETS = ["UK", "US", "Europe", "Global"];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
);
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>
);
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg>
);
const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
);

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="det-row"><span className="k">{k}</span><span className="v">{v}</span></div>
);

/** Domain favicon (e.g. itv.com/itvx -> itv.com) rendered inside a .fav / .disc
    tile, falling back to the mono initials if there's no site or the icon fails
    to load. */
function Logo({ mono, site }: { mono: string; site: string }) {
  const [failed, setFailed] = useState(false);
  const domain = site ? site.split("/")[0] : "";
  if (domain && !failed) {
    return (
      <img
        src={`https://www.google.com/s2/favicons?sz=128&domain=${domain}`}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return <>{mono}</>;
}

export default function InventoryDirectory() {
  const [query, setQuery] = useState("");
  const [typeOn, setTypeOn] = useState<string[]>([]);
  const [marketOn, setMarketOn] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const scrollCol = useRef<HTMLDivElement>(null);

  // reset the content pane to the top whenever the view changes
  useEffect(() => {
    if (scrollCol.current) scrollCol.current.scrollTop = 0;
  }, [current]);

  const hasFilters = Boolean(query.trim()) || typeOn.length > 0 || marketOn.length > 0;

  const matches = (id: string) => {
    const p = profiles[id];
    const q = query.toLowerCase().trim();
    if (q && !p.name.toLowerCase().includes(q) && !p.ownerName.toLowerCase().includes(q) && !p.type.toLowerCase().includes(q)) return false;
    if (typeOn.length && !typeOn.includes(p.type)) return false;
    if (marketOn.length && !marketOn.some((m) => p.markets.includes(m))) return false;
    return true;
  };

  const visible = order.filter(matches);
  const show = hasFilters ? visible : popular.filter((id) => visible.includes(id));

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const reset = () => { setTypeOn([]); setMarketOn([]); setQuery(""); };

  const p = current ? profiles[current] : null;

  return (
    <div className="tvdir">
      <div className="topbar">
        <div className="tb-left">
          <img src="/images/logo-color.png" alt="LightBoxTV" />
          <div className="tb-div" />
          <div className="tb-title">
            <span className="t">TV Inventory Directory</span>
            <br />
            <span className="s">Explore the modern TV ecosystem</span>
          </div>
        </div>
        <span className="freshness"><span className="dot" /> Free preview · {updated}</span>
      </div>

      <div className="body">
        <div className="col sidebar">
          <div className="sec-title">Search</div>
          <div className="search">
            <SearchIcon />
            <input type="text" placeholder="Search inventory…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <div className="sec-title">Inventory type <button className="clearbtn" onClick={reset}>Reset</button></div>
          <div className="chips">
            {TYPES.map((v) => (
              <button key={v} className={`chip${typeOn.includes(v) ? " on" : ""}`} onClick={() => toggle(typeOn, setTypeOn, v)}>{v}</button>
            ))}
          </div>

          <div className="sec-title">Market</div>
          <div className="chips">
            {MARKETS.map((v) => (
              <button key={v} className={`chip${marketOn.includes(v) ? " on" : ""}`} onClick={() => toggle(marketOn, setMarketOn, v)}>{v}</button>
            ))}
          </div>
        </div>

        <div className="col" ref={scrollCol}>
          <div className="pad">
            {p === null ? (
              <>
                <div className="home-hero">
                  <div className="tag">Explore the modern TV ecosystem.</div>
                  <h1>TV Inventory Directory</h1>
                  <p>Search broadcasters, streamers, FAST channels and CTV platforms to understand who they are, where they operate and what they offer.</p>
                  <div className="disclaimer">
                    <InfoIcon />{" "}
                    <span>Profiles are compiled from each provider’s own public website and materials. Always confirm specifics with the provider before planning or buying.</span>
                  </div>
                </div>

                <div className="grid-label">
                  <h2>{hasFilters ? "Matching inventory" : "Popular inventory"}</h2>
                  <span>{visible.length} source{visible.length !== 1 ? "s" : ""}</span>
                </div>

                {show.length > 0 ? (
                  <div className="logogrid">
                    {show.map((id) => {
                      const c = profiles[id];
                      return (
                        <div className="logocard" key={id} onClick={() => setCurrent(id)}>
                          <div className="chead">
                            <div>
                              <div className="nm">{c.name}</div>
                              {c.site && <span className="site"><GlobeIcon />{c.site}</span>}
                            </div>
                            <span className="fav"><Logo mono={c.mono} site={c.site} /></span>
                          </div>
                          <span className="tybadge">{c.type}</span>
                          <div className="ds">{c.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="nomatch">No inventory matches your filters.</p>
                )}
              </>
            ) : (
              <>
                <div className="back" onClick={() => setCurrent(null)}><BackIcon /> Back to directory</div>
                <div className="phead">
                  <div className="disc"><Logo mono={p.mono} site={p.site} /></div>
                  <div>
                    <h1>{p.name}</h1>
                    <div className="tagpill">{p.typeFull}</div>
                  </div>
                </div>

                <div className="det-card">
                  <Row k="Inventory type" v={p.typeFull} />
                  <Row k="Owner" v={p.ownerName} />
                  <Row k="Owner type" v={p.owner} />
                  <Row k="Markets" v={p.markets.join(", ")} />
                  <Row k="Reach" v={p.reach} />
                  {p.site && (
                    <div className="det-row">
                      <span className="k">Website</span>
                      <span className="v">
                        <a className="sitelink" href={`https://${p.site}`} target="_blank" rel="noopener">
                          <GlobeIcon />{p.site}
                        </a>
                      </span>
                    </div>
                  )}
                </div>

                <div className="disclaimer" style={{ margin: "0 0 18px" }}>
                  <InfoIcon />{" "}
                  <span>This profile is compiled from {p.name}’s own public website and materials. Details may change — confirm with the provider before planning or buying.</span>
                </div>

                <div className="desc-card">
                  <h3>About</h3>
                  <p>{p.desc}</p>
                  <div className="tags">{p.content.map((c) => <span className="tg" key={c}>{c}</span>)}</div>
                </div>

                <div className="locked">
                  <div className="lk"><LockIcon /> Supply paths · Licensed</div>
                  <h3>See how {p.name} can be accessed</h3>
                  <p>Detailed supply paths are just the starting point. LightBoxTV allows teams to build and manage their own inventory universe, including commercial agreements, pricing, deal structures and planning rules.</p>
                  <div className="blur">
                    {p.ssps.slice(0, 3).map((s) => <span key={s}>{s}</span>)}
                    <span>+ DSP routes</span>
                  </div>
                  <Link className="btn" href="/contact?reason=demo">Contact LightBoxTV to learn more →</Link>
                  <div className="sub">Inventory management, commercial controls and planning workflows are available within the LightBoxTV platform.</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
