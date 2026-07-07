/* TV Inventory Directory — profile dataset (illustrative, June 2026).
   Ported from the Claude Design tvdir-data.js source. */

export interface TvProfile {
  name: string;
  mono: string;
  type: string;
  typeFull: string;
  owner: string;
  ownerName: string;
  markets: string[];
  site: string;
  reach: string;
  desc: string;
  caps: string[];
  ssps: string[];
  dsps: string[];
  regions: string[];
  content: string[];
  measurement: string[];
}

export const profiles: Record<string, TvProfile> = {
  itvx: {
    name: "ITVX", mono: "IT", type: "BVOD", typeFull: "Broadcaster Video On Demand", owner: "Broadcaster", ownerName: "ITV",
    markets: ["UK"], site: "itv.com/itvx", reach: "40M+ registered users",
    desc: "ITVX is ITV's streaming platform, providing live and on-demand access to premium broadcaster content across the UK.",
    caps: ["Audience Targeting", "Contextual Targeting", "Frequency Controls", "Household Measurement", "First Party Data", "Dynamic Creative", "Programmatic Guaranteed", "PMP", "Open Auction"],
    ssps: ["Magnite", "FreeWheel", "PubMatic", "OpenX"], dsps: ["DV360", "The Trade Desk", "Yahoo DSP", "Amazon DSP"],
    regions: ["United Kingdom", "Ireland"], content: ["Entertainment", "Drama", "Sport", "News", "Reality TV"],
    measurement: ["BARB", "Nielsen", "Samba TV", "VideoAmp"],
  },
  c4: {
    name: "Channel 4", mono: "C4", type: "BVOD", typeFull: "Broadcaster Video On Demand", owner: "Broadcaster", ownerName: "Channel 4",
    markets: ["UK"], site: "channel4.com", reach: "30M+ registered users",
    desc: "Channel 4's streaming service offers on-demand and live broadcaster content, known for its first-party data and contextual capabilities across the UK.",
    caps: ["Audience Targeting", "Contextual Targeting", "Frequency Controls", "First Party Data", "Dynamic Creative", "Programmatic Guaranteed", "PMP", "Open Auction"],
    ssps: ["Magnite", "FreeWheel", "Index Exchange"], dsps: ["DV360", "The Trade Desk", "Xandr"],
    regions: ["United Kingdom"], content: ["Entertainment", "Drama", "News", "Reality TV", "Documentary"],
    measurement: ["BARB", "Nielsen", "AudienceProject"],
  },
  my5: {
    name: "My5", mono: "M5", type: "BVOD", typeFull: "Broadcaster Video On Demand", owner: "Broadcaster", ownerName: "Channel 5 / Paramount",
    markets: ["UK"], site: "channel5.com", reach: "Public data not disclosed",
    desc: "My5 is Channel 5's on-demand streaming service, part of Paramount, offering broadcaster catch-up and box sets in the UK.",
    caps: ["Audience Targeting", "Contextual Targeting", "Frequency Controls", "Programmatic Guaranteed", "PMP", "Open Auction"],
    ssps: ["FreeWheel", "PubMatic", "Equativ"], dsps: ["DV360", "Yahoo DSP"],
    regions: ["United Kingdom"], content: ["Entertainment", "Drama", "Documentary", "Reality TV"],
    measurement: ["BARB", "Nielsen"],
  },
  sky: {
    name: "Sky", mono: "SK", type: "Broadcaster", typeFull: "Broadcaster & CTV platform", owner: "Platform", ownerName: "Sky / Comcast",
    markets: ["UK", "Europe"], site: "skymedia.co.uk", reach: "23M+ households",
    desc: "Sky provides addressable TV and streaming inventory across its platforms, combining broadcaster content with advanced household addressability.",
    caps: ["Audience Targeting", "Contextual Targeting", "Frequency Controls", "Household Measurement", "First Party Data", "Dynamic Creative", "Programmatic Guaranteed", "PMP"],
    ssps: ["Magnite", "FreeWheel", "PubMatic", "Index Exchange"], dsps: ["DV360", "The Trade Desk", "Yahoo DSP", "Xandr"],
    regions: ["United Kingdom", "Ireland", "Germany", "Italy"], content: ["Entertainment", "Sport", "Drama", "News", "Movies"],
    measurement: ["BARB", "Nielsen", "Samba TV", "VideoAmp"],
  },
  netflix: {
    name: "Netflix", mono: "NF", type: "Streaming", typeFull: "Subscription streaming (ad tier)", owner: "Platform", ownerName: "Netflix",
    markets: ["Global"], site: "netflix.com", reach: "Ad tier across 12 markets",
    desc: "Netflix's ad-supported tier offers premium streaming inventory with growing programmatic access and identity-based targeting.",
    caps: ["Audience Targeting", "Frequency Controls", "First Party Data", "Programmatic Guaranteed", "PMP"],
    ssps: ["Magnite", "FreeWheel", "Index Exchange"], dsps: ["DV360", "The Trade Desk", "Yahoo DSP"],
    regions: ["United Kingdom", "United States", "Germany", "France", "Spain", "Italy"], content: ["Entertainment", "Drama", "Movies", "Documentary", "Kids"],
    measurement: ["Nielsen", "VideoAmp", "Samba TV"],
  },
  disney: {
    name: "Disney+", mono: "D+", type: "Streaming", typeFull: "Subscription streaming (ad tier)", owner: "Platform", ownerName: "The Walt Disney Company",
    markets: ["Global"], site: "disneyplus.com", reach: "Ad tier across key markets",
    desc: "Disney+ offers premium ad-supported streaming inventory with strong first-party data and brand-safe entertainment content.",
    caps: ["Audience Targeting", "Contextual Targeting", "Frequency Controls", "First Party Data", "Dynamic Creative", "Programmatic Guaranteed", "PMP"],
    ssps: ["Magnite", "PubMatic", "OpenX"], dsps: ["DV360", "The Trade Desk", "Amazon DSP"],
    regions: ["United Kingdom", "United States", "Germany", "France", "Spain"], content: ["Entertainment", "Movies", "Kids", "Drama", "Sport"],
    measurement: ["Nielsen", "VideoAmp"],
  },
  pluto: {
    name: "Pluto TV", mono: "PL", type: "FAST", typeFull: "Free Ad-supported Streaming TV", owner: "Platform", ownerName: "Paramount",
    markets: ["UK", "US", "Europe"], site: "pluto.tv", reach: "80M+ monthly active users",
    desc: "Pluto TV is Paramount's free ad-supported streaming service, offering hundreds of linear-style FAST channels and on-demand content.",
    caps: ["Audience Targeting", "Contextual Targeting", "Frequency Controls", "Dynamic Creative", "Programmatic Guaranteed", "PMP", "Open Auction"],
    ssps: ["Magnite", "FreeWheel", "TripleLift"], dsps: ["DV360", "The Trade Desk", "Yahoo DSP"],
    regions: ["United Kingdom", "United States", "Germany", "France", "Spain", "Italy"], content: ["Entertainment", "Movies", "News", "Sport", "Reality TV"],
    measurement: ["Nielsen", "Samba TV", "iSpot"],
  },
  rakuten: {
    name: "Rakuten TV", mono: "RK", type: "AVOD", typeFull: "AVOD & FAST", owner: "Platform", ownerName: "Rakuten",
    markets: ["Europe"], site: "rakuten.tv", reach: "Across 40+ European markets",
    desc: "Rakuten TV is a European streaming service offering AVOD, FAST channels and transactional content, pre-installed on many smart TVs.",
    caps: ["Audience Targeting", "Contextual Targeting", "Frequency Controls", "Programmatic Guaranteed", "PMP", "Open Auction"],
    ssps: ["PubMatic", "Equativ", "OpenX"], dsps: ["DV360", "Yahoo DSP"],
    regions: ["United Kingdom", "Germany", "France", "Spain", "Italy"], content: ["Movies", "Entertainment", "Sport", "Documentary"],
    measurement: ["Nielsen", "AudienceProject"],
  },
  samsung: {
    name: "Samsung TV Plus", mono: "S+", type: "FAST", typeFull: "Free Ad-supported Streaming TV", owner: "Manufacturer", ownerName: "Samsung",
    markets: ["Global"], site: "samsung.com/tvplus", reach: "On 500M+ Samsung devices",
    desc: "Samsung TV Plus is the manufacturer's built-in FAST service, delivering free linear-style channels across Samsung smart TVs and devices.",
    caps: ["Audience Targeting", "Contextual Targeting", "Frequency Controls", "First Party Data", "Dynamic Creative", "Programmatic Guaranteed", "PMP", "Open Auction"],
    ssps: ["Magnite", "PubMatic", "Equativ", "TripleLift"], dsps: ["DV360", "The Trade Desk", "Yahoo DSP", "Amazon DSP"],
    regions: ["United Kingdom", "United States", "Germany", "France", "Spain", "Italy"], content: ["Entertainment", "News", "Sport", "Movies", "Reality TV"],
    measurement: ["Nielsen", "Samba TV", "VideoAmp"],
  },
  lg: {
    name: "LG Channels", mono: "LG", type: "FAST", typeFull: "Free Ad-supported Streaming TV", owner: "Manufacturer", ownerName: "LG",
    markets: ["Global"], site: "lg.com", reach: "On LG smart TVs worldwide",
    desc: "LG Channels is LG's built-in FAST platform, offering free streaming channels directly on LG smart TVs.",
    caps: ["Audience Targeting", "Contextual Targeting", "Frequency Controls", "Dynamic Creative", "Programmatic Guaranteed", "PMP", "Open Auction"],
    ssps: ["Magnite", "PubMatic", "OpenX"], dsps: ["DV360", "The Trade Desk", "Amazon DSP"],
    regions: ["United Kingdom", "United States", "Germany", "France"], content: ["Entertainment", "News", "Movies", "Sport"],
    measurement: ["Nielsen", "Samba TV"],
  },
  tubi: {
    name: "Tubi", mono: "TB", type: "AVOD", typeFull: "Ad-supported Video On Demand", owner: "Platform", ownerName: "Fox Corporation",
    markets: ["US", "UK"], site: "tubitv.com", reach: "80M+ monthly active users",
    desc: "Tubi is Fox's free ad-supported streaming service with a large on-demand library of films and TV, expanding internationally.",
    caps: ["Audience Targeting", "Contextual Targeting", "Frequency Controls", "First Party Data", "Dynamic Creative", "Programmatic Guaranteed", "PMP", "Open Auction"],
    ssps: ["Magnite", "FreeWheel", "Index Exchange"], dsps: ["DV360", "The Trade Desk", "Amazon DSP"],
    regions: ["United States", "United Kingdom"], content: ["Movies", "Entertainment", "Drama", "News", "Kids"],
    measurement: ["Nielsen", "iSpot", "VideoAmp"],
  },
  youtube: {
    name: "YouTube", mono: "YT", type: "Streaming", typeFull: "Online video & CTV", owner: "Platform", ownerName: "Google",
    markets: ["Global"], site: "youtube.com", reach: "Largest CTV reach in many markets",
    desc: "YouTube delivers online and connected-TV video at vast scale, with deep audience and contextual targeting through Google's stack.",
    caps: ["Audience Targeting", "Contextual Targeting", "Frequency Controls", "First Party Data", "Dynamic Creative", "Programmatic Guaranteed"],
    ssps: ["Google Ad Manager"], dsps: ["DV360"],
    regions: ["United Kingdom", "United States", "Germany", "France", "Spain", "Italy"], content: ["Entertainment", "Music", "Sport", "News", "Kids", "Creator"],
    measurement: ["Nielsen", "VideoAmp", "Samba TV"],
  },
  prime: {
    name: "Amazon Prime Video", mono: "PV", type: "Streaming", typeFull: "Subscription streaming (ads)", owner: "Platform", ownerName: "Amazon",
    markets: ["Global"], site: "amazon.com", reach: "Default ads across Prime markets",
    desc: "Prime Video's ad-supported experience offers premium streaming inventory with Amazon's first-party retail and audience signals.",
    caps: ["Audience Targeting", "Contextual Targeting", "Frequency Controls", "Household Measurement", "First Party Data", "Dynamic Creative", "Programmatic Guaranteed", "PMP"],
    ssps: ["Amazon Publisher Services"], dsps: ["Amazon DSP", "The Trade Desk"],
    regions: ["United Kingdom", "United States", "Germany", "France", "Spain", "Italy"], content: ["Movies", "Drama", "Sport", "Entertainment", "Documentary"],
    measurement: ["Nielsen", "VideoAmp"],
  },
  retail: {
    name: "Retail Media Video", mono: "RM", type: "Retail Media Video", typeFull: "Retail media video network", owner: "Publisher", ownerName: "Various retailers",
    markets: ["Global"], site: "", reach: "Retailer on-site & off-site video",
    desc: "Retail media video networks offer video inventory powered by retailer first-party purchase data, on-site and across the open web and CTV.",
    caps: ["Audience Targeting", "First Party Data", "Frequency Controls", "Dynamic Creative", "Programmatic Guaranteed", "PMP"],
    ssps: ["PubMatic", "Magnite"], dsps: ["The Trade Desk", "DV360", "Amazon DSP"],
    regions: ["United Kingdom", "United States", "Germany", "France"], content: ["Shopping", "Entertainment", "Lifestyle"],
    measurement: ["Nielsen", "Circana"],
  },
};

export const order: string[] = ["itvx", "c4", "my5", "sky", "netflix", "disney", "pluto", "rakuten", "samsung", "lg", "tubi", "youtube", "prime", "retail"];
export const popular: string[] = ["netflix", "itvx", "c4", "pluto", "rakuten", "samsung", "disney", "tubi"];
export const updated = "June 2026";
