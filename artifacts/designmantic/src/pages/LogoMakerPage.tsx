import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { modalEvents } from "@/lib/modalEvents";

type Logo = {
  id: number;
  name: string;
  industry: string;
  tags: string[];
  style: string;
  colorKey: string;
  color: string;
  svgType: string;
};

const COLORS: Record<string, string> = {
  crimson:  "#c61e53",
  navy:     "#1e3a8a",
  forest:   "#16a34a",
  orange:   "#ea580c",
  purple:   "#7c3aed",
  teal:     "#0891b2",
  pink:     "#db2777",
  gold:     "#ca8a04",
  slate:    "#334155",
  ruby:     "#b91c1c",
  violet:   "#6d28d9",
  sky:      "#0369a1",
  lime:     "#65a30d",
  rust:     "#c2410c",
  jade:     "#0f766e",
};

const ALL_LOGOS: Logo[] = [
  // ── RESTAURANT ──
  { id:0,  name:"Bistro Bliss",        industry:"restaurant", tags:["food","dining","bistro","cafe","eat","restaurant"], style:"modern",    colorKey:"crimson", color:COLORS.crimson, svgType:"fork-knife" },
  { id:1,  name:"Chef's Table",        industry:"restaurant", tags:["food","chef","gourmet","dining","restaurant"],      style:"elegant",   colorKey:"orange",  color:COLORS.orange,  svgType:"fork-knife" },
  { id:2,  name:"The Flame Kitchen",   industry:"restaurant", tags:["food","grill","bbq","fire","restaurant","cook"],    style:"bold",      colorKey:"rust",    color:COLORS.rust,    svgType:"flame" },
  { id:3,  name:"Garden Plate",        industry:"restaurant", tags:["food","organic","vegan","restaurant","healthy"],    style:"minimalist",colorKey:"forest",  color:COLORS.forest,  svgType:"leaf" },
  { id:4,  name:"Spice Route",         industry:"restaurant", tags:["food","spice","indian","asian","restaurant"],       style:"classic",   colorKey:"gold",    color:COLORS.gold,    svgType:"star-badge" },
  { id:5,  name:"Urban Bites",         industry:"restaurant", tags:["food","fast","cafe","restaurant","urban"],          style:"playful",   colorKey:"teal",    color:COLORS.teal,    svgType:"fork-knife" },
  // ── TECHNOLOGY ──
  { id:6,  name:"TechForge",           industry:"technology", tags:["tech","software","startup","app","digital","it"],   style:"modern",    colorKey:"navy",    color:COLORS.navy,    svgType:"circuit" },
  { id:7,  name:"CloudSync",           industry:"technology", tags:["tech","cloud","saas","software","digital"],         style:"minimalist",colorKey:"sky",     color:COLORS.sky,     svgType:"circuit" },
  { id:8,  name:"DataPulse",           industry:"technology", tags:["tech","data","analytics","software","ai","ml"],     style:"bold",      colorKey:"violet",  color:COLORS.violet,  svgType:"circuit" },
  { id:9,  name:"NexaCore",            industry:"technology", tags:["tech","startup","app","software","digital"],        style:"geometric", colorKey:"teal",    color:COLORS.teal,    svgType:"hexagon" },
  { id:10, name:"PixelDrift",          industry:"technology", tags:["tech","design","ui","software","startup"],          style:"modern",    colorKey:"purple",  color:COLORS.purple,  svgType:"hexagon" },
  { id:11, name:"SwiftByte",           industry:"technology", tags:["tech","mobile","app","software","fast","startup"],  style:"playful",   colorKey:"crimson", color:COLORS.crimson, svgType:"lightning" },
  // ── REAL ESTATE ──
  { id:12, name:"Apex Properties",     industry:"real-estate",tags:["real estate","property","home","house","realty"],   style:"classic",   colorKey:"navy",    color:COLORS.navy,    svgType:"house" },
  { id:13, name:"Urban Nest",          industry:"real-estate",tags:["real estate","apartment","condo","home","realty"],  style:"modern",    colorKey:"teal",    color:COLORS.teal,    svgType:"house" },
  { id:14, name:"Prime Realty",        industry:"real-estate",tags:["real estate","luxury","home","property","buy"],     style:"elegant",   colorKey:"gold",    color:COLORS.gold,    svgType:"building" },
  { id:15, name:"KeyStone Homes",      industry:"real-estate",tags:["real estate","home","family","property","sell"],    style:"classic",   colorKey:"forest",  color:COLORS.forest,  svgType:"house" },
  { id:16, name:"Horizon Estates",     industry:"real-estate",tags:["real estate","commercial","property","invest"],     style:"bold",      colorKey:"slate",   color:COLORS.slate,   svgType:"building" },
  // ── FITNESS ──
  { id:17, name:"IronEdge Gym",        industry:"fitness",    tags:["fitness","gym","bodybuilding","workout","sport"],   style:"bold",      colorKey:"ruby",    color:COLORS.ruby,    svgType:"dumbbell" },
  { id:18, name:"ZenFlow Yoga",        industry:"fitness",    tags:["fitness","yoga","wellness","health","meditation"],  style:"minimalist",colorKey:"teal",    color:COLORS.teal,    svgType:"leaf" },
  { id:19, name:"SprintX",            industry:"fitness",    tags:["fitness","running","cardio","sport","training"],    style:"modern",    colorKey:"orange",  color:COLORS.orange,  svgType:"lightning" },
  { id:20, name:"PowerHouse",          industry:"fitness",    tags:["fitness","gym","strength","workout","muscle"],      style:"bold",      colorKey:"slate",   color:COLORS.slate,   svgType:"dumbbell" },
  { id:21, name:"VitalPeak",           industry:"fitness",    tags:["fitness","health","nutrition","wellness","gym"],    style:"geometric", colorKey:"forest",  color:COLORS.forest,  svgType:"mountain" },
  // ── BEAUTY ──
  { id:22, name:"Lumière Salon",       industry:"beauty",     tags:["beauty","salon","hair","spa","skincare","cosmetic"],style:"elegant",   colorKey:"pink",    color:COLORS.pink,    svgType:"flower" },
  { id:23, name:"Glow Studio",         industry:"beauty",     tags:["beauty","skin","glow","makeup","cosmetic","spa"],   style:"minimalist",colorKey:"gold",    color:COLORS.gold,    svgType:"flower" },
  { id:24, name:"Velvet Beauty",       industry:"beauty",     tags:["beauty","salon","luxury","makeup","cosmetic"],      style:"classic",   colorKey:"violet",  color:COLORS.violet,  svgType:"diamond" },
  { id:25, name:"Pure Radiance",       industry:"beauty",     tags:["beauty","skincare","natural","organic","spa"],      style:"minimalist",colorKey:"teal",    color:COLORS.teal,    svgType:"flower" },
  { id:26, name:"Bliss Aesthetics",    industry:"beauty",     tags:["beauty","clinic","medical","skincare","botox"],     style:"modern",    colorKey:"crimson", color:COLORS.crimson, svgType:"diamond" },
  // ── MUSIC ──
  { id:27, name:"BeatWave Studios",    industry:"music",      tags:["music","studio","recording","band","audio","sound"],style:"bold",      colorKey:"purple",  color:COLORS.purple,  svgType:"music-note" },
  { id:28, name:"Harmony Records",     industry:"music",      tags:["music","record","label","artist","sound"],          style:"classic",   colorKey:"gold",    color:COLORS.gold,    svgType:"music-note" },
  { id:29, name:"SoundForge",          industry:"music",      tags:["music","production","audio","studio","dj","sound"], style:"modern",    colorKey:"navy",    color:COLORS.navy,    svgType:"headphones" },
  { id:30, name:"VibeSync",            industry:"music",      tags:["music","dj","festival","sound","event","audio"],    style:"playful",   colorKey:"crimson", color:COLORS.crimson, svgType:"headphones" },
  // ── PHOTOGRAPHY ──
  { id:31, name:"Aperture Films",      industry:"photography",tags:["photography","film","camera","video","studio"],     style:"minimalist",colorKey:"slate",   color:COLORS.slate,   svgType:"camera" },
  { id:32, name:"Golden Hour Studio",  industry:"photography",tags:["photography","wedding","portrait","camera","studio"],style:"elegant",  colorKey:"gold",    color:COLORS.gold,    svgType:"camera" },
  { id:33, name:"Shutter & Soul",      industry:"photography",tags:["photography","portrait","event","camera","art"],    style:"classic",   colorKey:"navy",    color:COLORS.navy,    svgType:"camera" },
  { id:34, name:"PixelFrame",          industry:"photography",tags:["photography","digital","camera","stock","photo"],   style:"modern",    colorKey:"teal",    color:COLORS.teal,    svgType:"camera" },
  // ── MEDICAL ──
  { id:35, name:"MedCore Clinic",      industry:"medical",    tags:["medical","clinic","health","doctor","hospital"],    style:"modern",    colorKey:"sky",     color:COLORS.sky,     svgType:"medical-cross" },
  { id:36, name:"VitaCare",            industry:"medical",    tags:["medical","pharmacy","health","medicine","care"],    style:"minimalist",colorKey:"forest",  color:COLORS.forest,  svgType:"medical-cross" },
  { id:37, name:"Pulse Health",        industry:"medical",    tags:["medical","health","heart","cardiology","care"],     style:"bold",      colorKey:"crimson", color:COLORS.crimson, svgType:"heart" },
  { id:38, name:"ClearMind Therapy",   industry:"medical",    tags:["medical","mental","therapy","psychology","health"], style:"minimalist",colorKey:"violet",  color:COLORS.violet,  svgType:"heart" },
  // ── FINANCE ──
  { id:39, name:"Apex Capital",        industry:"finance",    tags:["finance","investment","bank","money","wealth"],     style:"classic",   colorKey:"navy",    color:COLORS.navy,    svgType:"dollar" },
  { id:40, name:"GrowthVault",         industry:"finance",    tags:["finance","invest","fund","crypto","money","bank"],  style:"modern",    colorKey:"forest",  color:COLORS.forest,  svgType:"dollar" },
  { id:41, name:"NexusFund",           industry:"finance",    tags:["finance","hedge fund","wealth","invest","stock"],   style:"bold",      colorKey:"gold",    color:COLORS.gold,    svgType:"chart" },
  { id:42, name:"TrustBridge",         industry:"finance",    tags:["finance","insurance","bank","secure","trust"],      style:"classic",   colorKey:"slate",   color:COLORS.slate,   svgType:"shield" },
  // ── EDUCATION ──
  { id:43, name:"EduPath Academy",     industry:"education",  tags:["education","school","learn","course","academy"],    style:"classic",   colorKey:"navy",    color:COLORS.navy,    svgType:"book" },
  { id:44, name:"BrightMinds",         industry:"education",  tags:["education","kids","learning","school","tutor"],     style:"playful",   colorKey:"orange",  color:COLORS.orange,  svgType:"star-badge" },
  { id:45, name:"Summit Institute",    industry:"education",  tags:["education","university","college","research","grad"],style:"elegant",   colorKey:"gold",    color:COLORS.gold,    svgType:"book" },
  { id:46, name:"LearnWave",           industry:"education",  tags:["education","online","e-learning","course","digital"],style:"modern",   colorKey:"teal",    color:COLORS.teal,    svgType:"book" },
  // ── FASHION ──
  { id:47, name:"Couture Label",       industry:"fashion",    tags:["fashion","clothing","luxury","brand","style"],      style:"elegant",   colorKey:"slate",   color:COLORS.slate,   svgType:"hanger" },
  { id:48, name:"StreetThread",        industry:"fashion",    tags:["fashion","streetwear","urban","clothing","brand"],  style:"bold",      colorKey:"ruby",    color:COLORS.ruby,    svgType:"hanger" },
  { id:49, name:"VogueStudio",         industry:"fashion",    tags:["fashion","design","clothing","luxury","model"],     style:"minimalist",colorKey:"pink",    color:COLORS.pink,    svgType:"scissors" },
  { id:50, name:"ThreadWorks",         industry:"fashion",    tags:["fashion","tailoring","bespoke","clothing","sew"],   style:"classic",   colorKey:"violet",  color:COLORS.violet,  svgType:"scissors" },
  // ── CONSTRUCTION ──
  { id:51, name:"BuildRight Co",       industry:"construction",tags:["construction","build","contractor","home","remodel"],style:"bold",    colorKey:"orange",  color:COLORS.orange,  svgType:"hammer" },
  { id:52, name:"SteelPath",           industry:"construction",tags:["construction","steel","industrial","build","civil"],style:"classic",  colorKey:"slate",   color:COLORS.slate,   svgType:"hammer" },
  { id:53, name:"Foundation Pro",      industry:"construction",tags:["construction","concrete","residential","build","foundation"],style:"modern",colorKey:"rust",color:COLORS.rust,svgType:"hammer" },
  // ── LEGAL ──
  { id:54, name:"JusticePath LLP",     industry:"legal",      tags:["legal","law","attorney","justice","court"],         style:"classic",   colorKey:"navy",    color:COLORS.navy,    svgType:"scales" },
  { id:55, name:"Meridian Law",        industry:"legal",      tags:["legal","lawyer","firm","law","counsel"],            style:"elegant",   colorKey:"gold",    color:COLORS.gold,    svgType:"scales" },
  { id:56, name:"TrueDefense",         industry:"legal",      tags:["legal","criminal","defense","law","attorney"],      style:"bold",      colorKey:"slate",   color:COLORS.slate,   svgType:"shield" },
  // ── GAMING ──
  { id:57, name:"PixelArena",          industry:"gaming",     tags:["gaming","game","esports","play","arcade","video"],  style:"bold",      colorKey:"purple",  color:COLORS.purple,  svgType:"gamepad" },
  { id:58, name:"NightFall Games",     industry:"gaming",     tags:["gaming","game","studio","rpg","video","develop"],   style:"modern",    colorKey:"navy",    color:COLORS.navy,    svgType:"gamepad" },
  { id:59, name:"ZeroGravity",         industry:"gaming",     tags:["gaming","esports","fps","play","online","game"],    style:"geometric", colorKey:"crimson", color:COLORS.crimson, svgType:"lightning" },
  // ── AUTOMOTIVE ──
  { id:60, name:"Velocity Motors",     industry:"automotive", tags:["automotive","car","auto","dealer","speed"],         style:"bold",      colorKey:"ruby",    color:COLORS.ruby,    svgType:"car" },
  { id:61, name:"GearShift Auto",      industry:"automotive", tags:["automotive","mechanic","repair","auto","service"],  style:"classic",   colorKey:"slate",   color:COLORS.slate,   svgType:"car" },
  { id:62, name:"PrimeRide",           industry:"automotive", tags:["automotive","car","luxury","auto","rental"],        style:"elegant",   colorKey:"gold",    color:COLORS.gold,    svgType:"car" },
  // ── SECURITY ──
  { id:63, name:"GuardPro",            industry:"security",   tags:["security","guard","protect","surveillance","cyber"],style:"bold",      colorKey:"navy",    color:COLORS.navy,    svgType:"shield" },
  { id:64, name:"SafeWatch",           industry:"security",   tags:["security","alarm","protect","system","cyber"],      style:"modern",    colorKey:"slate",   color:COLORS.slate,   svgType:"shield" },
  // ── JEWELRY ──
  { id:65, name:"Lumière Gems",        industry:"jewelry",    tags:["jewelry","diamond","ring","luxury","gold","gem"],   style:"elegant",   colorKey:"gold",    color:COLORS.gold,    svgType:"diamond" },
  { id:66, name:"Sterling House",      industry:"jewelry",    tags:["jewelry","silver","ring","bracelet","luxury","gem"],style:"classic",   colorKey:"slate",   color:COLORS.slate,   svgType:"diamond" },
  // ── AGRICULTURE ──
  { id:67, name:"GreenHarvest",        industry:"agriculture",tags:["agriculture","farm","organic","food","crop","green"],style:"classic",  colorKey:"forest",  color:COLORS.forest,  svgType:"leaf" },
];

function LogoIcon({ svgType, color }: { svgType: string; color: string }) {
  const p: React.SVGProps<SVGPathElement> = { fill: color, stroke: color };
  switch (svgType) {
    case "fork-knife":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <line x1="20" y1="8" x2="20" y2="56" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="15" y1="8" x2="15" y2="24" stroke={color} strokeWidth="3" strokeLinecap="round"/>
          <line x1="25" y1="8" x2="25" y2="24" stroke={color} strokeWidth="3" strokeLinecap="round"/>
          <path d="M15 24 Q20 30 25 24" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
          <line x1="44" y1="8" x2="44" y2="56" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M44 8 Q54 20 44 32" stroke={color} strokeWidth="3" fill={color + "30"} strokeLinecap="round"/>
        </svg>
      );
    case "flame":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <path d="M32 8 C32 8 20 20 20 34 C20 44 26 52 32 56 C38 52 44 44 44 34 C44 20 32 8 32 8Z" fill={color} opacity="0.9"/>
          <path d="M32 28 C32 28 25 34 25 40 C25 46 28 50 32 52 C36 50 39 46 39 40 C39 34 32 28 32 28Z" fill="white" opacity="0.5"/>
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <path d="M32 56 C32 56 10 40 12 22 C14 10 24 8 32 8 C40 8 50 10 52 22 C54 40 32 56 32 56Z" fill={color} opacity="0.9"/>
          <line x1="32" y1="56" x2="32" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
          <path d="M32 35 Q42 30 48 22" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
          <path d="M32 42 Q22 38 16 30" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
        </svg>
      );
    case "circuit":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <rect x="20" y="20" width="24" height="24" rx="2" fill="none" stroke={color} strokeWidth="3"/>
          <circle cx="27" cy="27" r="2" fill={color}/>
          <circle cx="37" cy="27" r="2" fill={color}/>
          <circle cx="27" cy="37" r="2" fill={color}/>
          <circle cx="37" cy="37" r="2" fill={color}/>
          <line x1="20" y1="27" x2="12" y2="27" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="20" y1="37" x2="12" y2="37" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="44" y1="27" x2="52" y2="27" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="44" y1="37" x2="52" y2="37" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="27" y1="20" x2="27" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="37" y1="20" x2="37" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="27" y1="44" x2="27" y2="52" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="37" y1="44" x2="37" y2="52" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );
    case "hexagon":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <polygon points="32,8 54,20 54,44 32,56 10,44 10,20" fill="none" stroke={color} strokeWidth="3"/>
          <polygon points="32,18 46,26 46,42 32,50 18,42 18,26" fill={color} opacity="0.2"/>
          <text x="32" y="36" textAnchor="middle" fontSize="14" fontWeight="bold" fill={color} fontFamily="sans-serif">N</text>
        </svg>
      );
    case "house":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <polygon points="32,8 56,30 52,30 52,56 12,56 12,30 8,30" fill={color} opacity="0.15" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
          <rect x="24" y="40" width="16" height="16" rx="1" fill={color} opacity="0.7"/>
          <rect x="36" y="28" width="9" height="9" rx="1" fill="none" stroke={color} strokeWidth="2"/>
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <rect x="14" y="16" width="36" height="44" rx="2" fill="none" stroke={color} strokeWidth="2.5"/>
          <rect x="20" y="22" width="7" height="7" rx="1" fill={color} opacity="0.5"/>
          <rect x="33" y="22" width="7" height="7" rx="1" fill={color} opacity="0.5"/>
          <rect x="20" y="33" width="7" height="7" rx="1" fill={color} opacity="0.5"/>
          <rect x="33" y="33" width="7" height="7" rx="1" fill={color} opacity="0.5"/>
          <rect x="25" y="46" width="14" height="14" rx="1" fill={color} opacity="0.7"/>
          <line x1="28" y1="16" x2="28" y2="8" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="36" y1="16" x2="36" y2="8" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );
    case "dumbbell":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <line x1="16" y1="32" x2="48" y2="32" stroke={color} strokeWidth="4" strokeLinecap="round"/>
          <rect x="8"  y="24" width="10" height="16" rx="3" fill={color}/>
          <rect x="10" y="20" width="6"  height="24" rx="2" fill={color}/>
          <rect x="46" y="24" width="10" height="16" rx="3" fill={color}/>
          <rect x="48" y="20" width="6"  height="24" rx="2" fill={color}/>
        </svg>
      );
    case "mountain":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <polygon points="32,8 56,56 8,56" fill={color} opacity="0.2" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
          <polygon points="44,26 58,56 30,56" fill={color} opacity="0.5" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
          <polyline points="24,56 32,8 40,26" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
        </svg>
      );
    case "lightning":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <polygon points="38,8 22,34 32,34 26,56 44,30 34,30" fill={color}/>
        </svg>
      );
    case "flower":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <circle cx="32" cy="32" r="8" fill={color}/>
          <ellipse cx="32" cy="15" rx="7" ry="10" fill={color} opacity="0.6"/>
          <ellipse cx="32" cy="49" rx="7" ry="10" fill={color} opacity="0.6"/>
          <ellipse cx="15" cy="32" rx="10" ry="7" fill={color} opacity="0.6"/>
          <ellipse cx="49" cy="32" rx="10" ry="7" fill={color} opacity="0.6"/>
          <ellipse cx="20" cy="20" rx="7" ry="10" fill={color} opacity="0.4" transform="rotate(-45 20 20)"/>
          <ellipse cx="44" cy="20" rx="7" ry="10" fill={color} opacity="0.4" transform="rotate(45 44 20)"/>
          <ellipse cx="20" cy="44" rx="7" ry="10" fill={color} opacity="0.4" transform="rotate(45 20 44)"/>
          <ellipse cx="44" cy="44" rx="7" ry="10" fill={color} opacity="0.4" transform="rotate(-45 44 44)"/>
          <circle cx="32" cy="32" r="6" fill="white" opacity="0.7"/>
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <polygon points="32,8 56,28 32,56 8,28" fill={color} opacity="0.15" stroke={color} strokeWidth="2.5"/>
          <polygon points="32,8 56,28 44,28 32,12" fill={color} opacity="0.5"/>
          <polygon points="8,28 20,28 32,56" fill={color} opacity="0.3"/>
          <line x1="8" y1="28" x2="56" y2="28" stroke={color} strokeWidth="1.5" opacity="0.5"/>
        </svg>
      );
    case "music-note":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <path d="M28 44 L28 18 L50 14 L50 38" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
          <circle cx="24" cy="44" r="7" fill={color}/>
          <circle cx="46" cy="38" r="7" fill={color}/>
        </svg>
      );
    case "headphones":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <path d="M16 36 C16 20 24 10 32 10 C40 10 48 20 48 36" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
          <rect x="10" y="34" width="12" height="18" rx="6" fill={color}/>
          <rect x="42" y="34" width="12" height="18" rx="6" fill={color}/>
        </svg>
      );
    case "camera":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <rect x="8" y="20" width="48" height="34" rx="4" fill="none" stroke={color} strokeWidth="2.5"/>
          <path d="M22 20 L26 12 L38 12 L42 20" stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
          <circle cx="32" cy="37" r="10" fill="none" stroke={color} strokeWidth="2.5"/>
          <circle cx="32" cy="37" r="5" fill={color} opacity="0.3"/>
          <circle cx="46" cy="26" r="3" fill={color} opacity="0.4"/>
        </svg>
      );
    case "medical-cross":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <rect x="24" y="8" width="16" height="48" rx="4" fill={color}/>
          <rect x="8" y="24" width="48" height="16" rx="4" fill={color}/>
          <rect x="26" y="10" width="12" height="44" rx="3" fill="white" opacity="0.2"/>
          <rect x="10" y="26" width="44" height="12" rx="3" fill="white" opacity="0.2"/>
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <path d="M32 52 C32 52 8 38 8 22 C8 14 14 8 22 8 C26 8 30 10 32 14 C34 10 38 8 42 8 C50 8 56 14 56 22 C56 38 32 52 32 52Z" fill={color}/>
          <path d="M18 20 C18 16 22 13 26 15" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
        </svg>
      );
    case "dollar":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <circle cx="32" cy="32" r="24" fill="none" stroke={color} strokeWidth="2.5"/>
          <line x1="32" y1="12" x2="32" y2="52" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M22 22 C22 22 24 18 32 18 C40 18 42 22 42 26 C42 30 38 32 32 32 C26 32 22 34 22 38 C22 42 24 46 32 46 C40 46 42 42 42 42" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <polyline points="8,50 20,36 30,42 42,22 56,14" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="56" cy="14" r="4" fill={color}/>
          <circle cx="42" cy="22" r="3" fill={color} opacity="0.6"/>
          <circle cx="30" cy="42" r="3" fill={color} opacity="0.6"/>
          <line x1="8" y1="50" x2="56" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
          <line x1="8" y1="10" x2="8" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <path d="M32 8 L52 16 L52 34 C52 44 44 52 32 56 C20 52 12 44 12 34 L12 16 Z" fill={color} opacity="0.15" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M24 32 L30 38 L42 26" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <path d="M12 12 C12 12 22 10 32 14 L32 54 C32 54 22 50 12 52 Z" fill={color} opacity="0.6"/>
          <path d="M52 12 C52 12 42 10 32 14 L32 54 C32 54 42 50 52 52 Z" fill={color} opacity="0.9"/>
          <line x1="32" y1="14" x2="32" y2="54" stroke="white" strokeWidth="1.5" opacity="0.5"/>
          <line x1="38" y1="20" x2="48" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <line x1="38" y1="26" x2="48" y2="26" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <line x1="38" y1="32" x2="48" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      );
    case "star-badge":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <circle cx="32" cy="32" r="24" fill={color} opacity="0.1" stroke={color} strokeWidth="2"/>
          <polygon points="32,14 36,26 50,26 39,34 43,46 32,38 21,46 25,34 14,26 28,26" fill={color}/>
        </svg>
      );
    case "hanger":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <circle cx="32" cy="14" r="5" fill="none" stroke={color} strokeWidth="2.5"/>
          <path d="M32 19 L32 24 L8 44 L56 44" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="8" y1="44" x2="8" y2="50" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="56" y1="44" x2="56" y2="50" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );
    case "scissors":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <line x1="32" y1="32" x2="56" y2="8" stroke={color} strokeWidth="3" strokeLinecap="round"/>
          <line x1="32" y1="32" x2="56" y2="56" stroke={color} strokeWidth="3" strokeLinecap="round"/>
          <circle cx="20" cy="20" r="9" fill="none" stroke={color} strokeWidth="2.5"/>
          <circle cx="20" cy="44" r="9" fill="none" stroke={color} strokeWidth="2.5"/>
          <circle cx="20" cy="20" r="3" fill={color} opacity="0.4"/>
          <circle cx="20" cy="44" r="3" fill={color} opacity="0.4"/>
        </svg>
      );
    case "hammer":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <rect x="30" y="28" width="8" height="28" rx="3" fill={color} transform="rotate(-45 34 42)" />
          <rect x="16" y="10" width="26" height="18" rx="4" fill={color}/>
          <rect x="18" y="12" width="22" height="8" rx="2" fill="white" opacity="0.2"/>
        </svg>
      );
    case "scales":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <line x1="32" y1="10" x2="32" y2="54" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="16" y1="54" x2="48" y2="54" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="32" y1="20" x2="14" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="32" y1="20" x2="50" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M8 20 L14 20 L14 32 C14 38 8 38 8 32 Z" fill={color} opacity="0.7"/>
          <path d="M50 20 L56 20 L56 28 C56 34 50 34 50 28 Z" fill={color} opacity="0.7"/>
          <circle cx="32" cy="13" r="4" fill={color}/>
        </svg>
      );
    case "gamepad":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <rect x="8" y="20" width="48" height="28" rx="14" fill="none" stroke={color} strokeWidth="2.5"/>
          <line x1="22" y1="30" x2="22" y2="38" stroke={color} strokeWidth="3" strokeLinecap="round"/>
          <line x1="18" y1="34" x2="26" y2="34" stroke={color} strokeWidth="3" strokeLinecap="round"/>
          <circle cx="44" cy="30" r="3" fill={color} opacity="0.5"/>
          <circle cx="50" cy="34" r="3" fill={color} opacity="0.5"/>
          <circle cx="44" cy="38" r="3" fill={color}/>
          <circle cx="38" cy="34" r="3" fill={color} opacity="0.5"/>
          <circle cx="32" cy="24" r="3" fill={color} opacity="0.3"/>
        </svg>
      );
    case "car":
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <path d="M8 38 L16 22 L48 22 L56 38 L56 46 L8 46 Z" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M20 22 L24 14 L40 14 L44 22" stroke={color} strokeWidth="2.5" fill={color} opacity="0.2" strokeLinejoin="round"/>
          <circle cx="18" cy="46" r="6" fill={color}/>
          <circle cx="46" cy="46" r="6" fill={color}/>
          <circle cx="18" cy="46" r="3" fill="white" opacity="0.5"/>
          <circle cx="46" cy="46" r="3" fill="white" opacity="0.5"/>
          <line x1="8" y1="38" x2="56" y2="38" stroke={color} strokeWidth="1.5" opacity="0.4"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" className="w-16 h-16">
          <polygon points="32,8 56,56 8,56" fill={color}/>
        </svg>
      );
  }
}

const STYLE_OPTIONS = ["modern","classic","minimalist","bold","playful","elegant","vintage","abstract","geometric"];
const COLOR_OPTIONS = [
  { label: "Red",    key: "ruby"   },
  { label: "Blue",   key: "navy"   },
  { label: "Green",  key: "forest" },
  { label: "Orange", key: "orange" },
  { label: "Purple", key: "purple" },
  { label: "Pink",   key: "pink"   },
  { label: "Gold",   key: "gold"   },
  { label: "Teal",   key: "teal"   },
  { label: "Slate",  key: "slate"  },
];

export default function LogoMakerPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm]   = useState(searchParams.get("q") || "");
  const [industry,   setIndustry]     = useState(searchParams.get("industry") || "");
  const [style,      setStyle]        = useState(searchParams.get("style") || "");
  const [colorKey,   setColorKey]     = useState(searchParams.get("color") || "");
  const [favorites,  setFavorites]    = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return ALL_LOGOS.filter(logo => {
      if (industry && logo.industry !== industry) return false;
      if (style     && logo.style !== style)       return false;
      if (colorKey  && logo.colorKey !== colorKey) return false;
      if (!q) return true;
      return (
        logo.name.toLowerCase().includes(q) ||
        logo.industry.includes(q) ||
        logo.tags.some(t => t.includes(q))
      );
    });
  }, [searchTerm, industry, style, colorKey]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (searchTerm) p.set("q", searchTerm);
    if (industry)   p.set("industry", industry);
    if (style)      p.set("style", style);
    if (colorKey)   p.set("color", colorKey);
    setSearchParams(p);
  };

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* ── Hero / Search ── */}
      <section className="bg-white border-b py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#222] mb-3">
          Free Logo Maker with 10,000+ Creative Logos
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          Our AI-logo creator helps you build an impactful brand in minutes.
        </p>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            id="logo-search"
            name="q"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            data-testid="logo-search-input"
            placeholder="Search logos by industry e.g. restaurant, tech, fitness…"
            className="flex-1 border-2 border-gray-200 focus:border-[#c61e53] rounded-lg px-5 py-3 outline-none text-base shadow-sm transition-colors"
            autoComplete="off"
          />
          <button
            type="submit"
            data-testid="logo-search-btn"
            className="bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white px-8 py-3 rounded-lg font-bold text-base shadow-sm whitespace-nowrap"
          >
            Get a Logo
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-3">Free Download. No credit card required.</p>

        {/* Live keyword pills */}
        {!searchTerm && (
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {["restaurant","technology","fitness","beauty","real estate","music","medical","finance"].map(kw => (
              <button
                key={kw}
                onClick={() => setSearchTerm(kw)}
                className="text-xs border border-gray-200 hover:border-[#c61e53] hover:text-[#c61e53] px-3 py-1 rounded-full capitalize transition-colors"
              >
                {kw}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ── Filter Bar ── */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <select
              id="industry-filter"
              name="industry"
              data-testid="industry-select"
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#c61e53] min-w-[140px]"
            >
              <option value="">All Industries</option>
              <option value="restaurant">Restaurant</option>
              <option value="technology">Technology</option>
              <option value="real-estate">Real Estate</option>
              <option value="fitness">Fitness</option>
              <option value="beauty">Beauty</option>
              <option value="music">Music</option>
              <option value="photography">Photography</option>
              <option value="medical">Medical</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
              <option value="fashion">Fashion</option>
              <option value="construction">Construction</option>
              <option value="legal">Legal</option>
              <option value="gaming">Gaming</option>
              <option value="automotive">Automotive</option>
              <option value="security">Security</option>
              <option value="jewelry">Jewelry</option>
              <option value="agriculture">Agriculture</option>
            </select>

            <select
              id="style-filter"
              name="style"
              data-testid="style-select"
              value={style}
              onChange={e => setStyle(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#c61e53] min-w-[130px] hidden sm:block"
            >
              <option value="">All Styles</option>
              {STYLE_OPTIONS.map(s => (
                <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase()+s.slice(1)}</option>
              ))}
            </select>

            <select
              id="color-filter"
              name="color"
              data-testid="color-select"
              value={colorKey}
              onChange={e => setColorKey(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#c61e53] min-w-[120px] hidden sm:block"
            >
              <option value="">All Colors</option>
              {COLOR_OPTIONS.map(c => (
                <option key={c.key} value={c.key}>{c.label}</option>
              ))}
            </select>

            {(searchTerm || industry || style || colorKey) && (
              <button
                onClick={() => { setSearchTerm(""); setIndustry(""); setStyle(""); setColorKey(""); setSearchParams(new URLSearchParams()); }}
                className="text-sm text-gray-400 hover:text-[#c61e53] transition-colors px-2 py-2"
                data-testid="clear-filters-btn"
              >
                ✕ Clear
              </button>
            )}
          </div>

          <span className="text-sm text-gray-500 font-medium hidden lg:block" data-testid="logo-count">
            Showing {filtered.length} logo{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="container mx-auto px-4 py-8 max-w-6xl">

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">No logos found for "{searchTerm}"</h2>
            <p className="text-gray-500 mb-6">Try a different keyword like "restaurant", "tech" or "fitness"</p>
            <button
              onClick={() => { setSearchTerm(""); setIndustry(""); setStyle(""); setColorKey(""); }}
              className="bg-[#c61e53] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#a01843] transition-colors"
            >
              Show All Logos
            </button>
          </div>
        ) : (
          <>
            {searchTerm && (
              <p className="text-sm text-gray-500 mb-6">
                Showing <strong>{filtered.length}</strong> result{filtered.length !== 1 ? "s" : ""} for <strong>"{searchTerm}"</strong>
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((logo) => (
                <div
                  key={logo.id}
                  data-testid={`logo-card-${logo.id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden group transition-shadow"
                >
                  {/* Preview area */}
                  <div
                    className="h-44 flex items-center justify-center relative"
                    style={{ backgroundColor: logo.color + "12" }}
                  >
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      <LogoIcon svgType={logo.svgType} color={logo.color} />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                      <button
                        data-testid={`logo-customize-${logo.id}`}
                        onClick={() => modalEvents.open("logoEditor", { logoName: logo.name })}
                        className="w-full bg-[#c61e53] hover:bg-[#a01843] text-white py-2 rounded-lg font-bold text-sm shadow transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                      >
                        Customize
                      </button>
                      <button
                        data-testid={`logo-download-${logo.id}`}
                        onClick={() => modalEvents.open("logoEditor", { logoName: logo.name })}
                        className="w-full bg-white hover:bg-gray-100 text-gray-800 py-2 rounded-lg font-bold text-sm shadow transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75"
                      >
                        Download Free
                      </button>
                    </div>

                    {/* Favorite */}
                    <button
                      data-testid={`logo-fav-${logo.id}`}
                      onClick={e => toggleFavorite(e, logo.id)}
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow transition-all ${
                        favorites.has(logo.id)
                          ? "bg-[#c61e53] text-white opacity-100"
                          : "bg-white text-gray-400 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <svg className="w-4 h-4" fill={favorites.has(logo.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </button>
                  </div>

                  {/* Card footer */}
                  <div className="p-3 border-t border-gray-100">
                    <p className="font-semibold text-gray-800 text-sm truncate">{logo.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{logo.industry.replace("-"," ")} · {logo.style}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
