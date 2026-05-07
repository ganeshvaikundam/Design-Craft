import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { modalEvents } from "@/lib/modalEvents";

type Template = {
  id: number;
  name: string;
  category: string;
  tags: string[];
  style: string;
  price: string;
  priceNum: number;
  gradient: string;
  accent: string;
  layout: string;
  description: string;
  pages: number;
  popular?: boolean;
  isNew?: boolean;
};

const ALL_TEMPLATES: Template[] = [
  // ── BUSINESS / CORPORATE ──
  { id:0,  name:"Business Pro",        category:"business",    tags:["business","corporate","professional","company","agency","office"],   style:"modern",    price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#1e3a8a,#3b82f6)",  accent:"#3b82f6", layout:"split-hero",   description:"Clean corporate template for established businesses.",   pages:8,  popular:true },
  { id:1,  name:"Executive Suite",     category:"business",    tags:["business","corporate","consulting","executive","enterprise"],        style:"corporate", price:"$69", priceNum:69,  gradient:"linear-gradient(135deg,#0f172a,#334155)",  accent:"#94a3b8", layout:"nav-hero",     description:"Premium dark template for executive-level brands.",       pages:10, popular:true },
  { id:2,  name:"Agency Masthead",     category:"business",    tags:["business","agency","marketing","creative","services"],               style:"bold",      price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#c61e53,#9f1239)",  accent:"#c61e53", layout:"bold-hero",    description:"High-impact design for marketing and creative agencies.", pages:7  },
  { id:3,  name:"Consulting Hub",      category:"business",    tags:["business","consulting","finance","strategy","professional"],         style:"classic",   price:"$59", priceNum:59,  gradient:"linear-gradient(135deg,#1c4966,#2d7dd2)",  accent:"#2d7dd2", layout:"split-hero",   description:"Trustworthy and structured for consulting firms.",        pages:9  },
  { id:4,  name:"B2B Connect",         category:"business",    tags:["business","b2b","saas","software","enterprise","professional"],      style:"modern",    price:"$59", priceNum:59,  gradient:"linear-gradient(135deg,#1e293b,#475569)",  accent:"#64748b", layout:"feature-grid", description:"Lead-generation focused template for B2B companies.",     pages:6  },
  { id:5,  name:"Startup Landing",     category:"business",    tags:["business","startup","launch","product","saas"],                     style:"modern",    price:"Free",priceNum:0,   gradient:"linear-gradient(135deg,#7c3aed,#6d28d9)",  accent:"#7c3aed", layout:"centered-hero",description:"One-page landing for startup product launches.",         pages:1, isNew:true },
  // ── RESTAURANT / FOOD ──
  { id:6,  name:"Restaurant Deluxe",   category:"restaurant",  tags:["restaurant","food","dining","cafe","menu","eat"],                   style:"elegant",   price:"$39", priceNum:39,  gradient:"linear-gradient(135deg,#7f1d1d,#ef4444)",  accent:"#ef4444", layout:"hero-overlay", description:"Warm, inviting design for full-service restaurants.",     pages:6,  popular:true },
  { id:7,  name:"Bistro & Bar",        category:"restaurant",  tags:["restaurant","bar","bistro","drinks","food","nightlife"],            style:"modern",    price:"$39", priceNum:39,  gradient:"linear-gradient(135deg,#451a03,#d97706)",  accent:"#d97706", layout:"menu-grid",    description:"Stylish template for bars and casual dining.",            pages:5  },
  { id:8,  name:"Bakery Fresh",        category:"restaurant",  tags:["restaurant","bakery","cafe","coffee","pastry","food"],              style:"playful",   price:"Free",priceNum:0,   gradient:"linear-gradient(135deg,#92400e,#fbbf24)",  accent:"#fbbf24", layout:"centered-hero",description:"Warm, welcoming template for bakeries and cafes.",        pages:4  },
  { id:9,  name:"Fine Dining",         category:"restaurant",  tags:["restaurant","fine dining","gourmet","luxury","food","chef"],        style:"elegant",   price:"$59", priceNum:59,  gradient:"linear-gradient(135deg,#0f0f0f,#3d2b1f)",  accent:"#c9a84c", layout:"hero-overlay", description:"Sophisticated dark template for upscale restaurants.",    pages:7  },
  { id:10, name:"Food Truck",          category:"restaurant",  tags:["restaurant","food truck","street food","catering","food","fast"],   style:"bold",      price:"$29", priceNum:29,  gradient:"linear-gradient(135deg,#c2410c,#fb923c)",  accent:"#fb923c", layout:"bold-hero",    description:"Fun, energetic design for food trucks and pop-ups.",      pages:3, isNew:true },
  // ── E-COMMERCE ──
  { id:11, name:"Modern Store",        category:"ecommerce",   tags:["ecommerce","shop","store","products","online","retail"],            style:"modern",    price:"$79", priceNum:79,  gradient:"linear-gradient(135deg,#4c1d95,#8b5cf6)",  accent:"#8b5cf6", layout:"product-grid", description:"Full-featured store with product showcases.",             pages:12, popular:true },
  { id:12, name:"Fashion Boutique",    category:"ecommerce",   tags:["ecommerce","fashion","clothing","boutique","store","shop"],         style:"elegant",   price:"$89", priceNum:89,  gradient:"linear-gradient(135deg,#1c1c1c,#6b7280)",  accent:"#d1d5db", layout:"product-grid", description:"Chic, editorial template for fashion brands.",            pages:10 },
  { id:13, name:"Tech Shop",           category:"ecommerce",   tags:["ecommerce","tech","electronics","gadgets","store","shop"],          style:"modern",    price:"$79", priceNum:79,  gradient:"linear-gradient(135deg,#0c4a6e,#0ea5e9)",  accent:"#0ea5e9", layout:"product-grid", description:"Clean layout for electronics and gadget stores.",         pages:11 },
  { id:14, name:"Vintage Market",      category:"ecommerce",   tags:["ecommerce","vintage","antique","store","shop","craft"],             style:"classic",   price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#713f12,#a16207)",  accent:"#a16207", layout:"feature-grid", description:"Earthy tones for vintage and handmade goods shops.",      pages:8  },
  { id:15, name:"Beauty Store",        category:"ecommerce",   tags:["ecommerce","beauty","cosmetics","skincare","store","shop"],         style:"elegant",   price:"$69", priceNum:69,  gradient:"linear-gradient(135deg,#9d174d,#db2777)",  accent:"#db2777", layout:"product-grid", description:"Glam-forward template for beauty and cosmetics brands.",  pages:9, isNew:true },
  // ── PORTFOLIO / CREATIVE ──
  { id:16, name:"Portfolio Clean",     category:"portfolio",   tags:["portfolio","creative","design","freelance","personal","showcase"],  style:"minimal",   price:"Free",priceNum:0,   gradient:"linear-gradient(135deg,#14532d,#10b981)",  accent:"#10b981", layout:"grid-masonry", description:"Minimalist portfolio for designers and creatives.",       pages:4,  popular:true },
  { id:17, name:"Photographer's Eye",  category:"portfolio",   tags:["portfolio","photography","photo","gallery","visual","creative"],    style:"minimal",   price:"Free",priceNum:0,   gradient:"linear-gradient(135deg,#171717,#404040)",  accent:"#e5e5e5", layout:"hero-overlay", description:"Full-bleed photography portfolio with gallery.",          pages:5  },
  { id:18, name:"Creative Agency",     category:"portfolio",   tags:["portfolio","agency","design","creative","branding","studio"],       style:"bold",      price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#701a75,#a855f7)",  accent:"#a855f7", layout:"bold-hero",    description:"Bold, expressive template for creative studios.",         pages:7  },
  { id:19, name:"Freelancer Pro",      category:"portfolio",   tags:["portfolio","freelance","developer","designer","personal","hire"],   style:"modern",    price:"$29", priceNum:29,  gradient:"linear-gradient(135deg,#0f766e,#14b8a6)",  accent:"#14b8a6", layout:"split-hero",   description:"Professional portfolio for freelancers seeking clients.",  pages:5  },
  { id:20, name:"Artist Canvas",       category:"portfolio",   tags:["portfolio","art","gallery","painting","artist","creative"],         style:"creative",  price:"Free",priceNum:0,   gradient:"linear-gradient(135deg,#831843,#f43f5e)",  accent:"#f43f5e", layout:"grid-masonry", description:"Vibrant gallery template for visual artists.",            pages:4  },
  // ── MEDICAL / HEALTH ──
  { id:21, name:"Medical Plus",        category:"medical",     tags:["medical","clinic","doctor","health","hospital","healthcare"],       style:"modern",    price:"$59", priceNum:59,  gradient:"linear-gradient(135deg,#064e3b,#34d399)",  accent:"#34d399", layout:"nav-hero",     description:"Clean, trustworthy template for clinics and hospitals.",  pages:8,  popular:true },
  { id:22, name:"Dental Care",         category:"medical",     tags:["medical","dental","dentist","teeth","clinic","health"],             style:"modern",    price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#0369a1,#7dd3fc)",  accent:"#7dd3fc", layout:"split-hero",   description:"Friendly, professional template for dental practices.",   pages:7  },
  { id:23, name:"Wellness Clinic",     category:"medical",     tags:["medical","wellness","spa","health","holistic","therapy"],           style:"minimal",   price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#365314,#84cc16)",  accent:"#84cc16", layout:"centered-hero",description:"Calm, natural design for wellness and holistic health.",  pages:6  },
  { id:24, name:"Mental Health Hub",   category:"medical",     tags:["medical","mental health","therapy","counseling","psychology"],      style:"minimal",   price:"$39", priceNum:39,  gradient:"linear-gradient(135deg,#4338ca,#818cf8)",  accent:"#818cf8", layout:"centered-hero",description:"Soft, approachable design for mental health services.",   pages:5, isNew:true },
  // ── EDUCATION ──
  { id:25, name:"Academy Pro",         category:"education",   tags:["education","school","academy","courses","learning","university"],   style:"modern",    price:"$59", priceNum:59,  gradient:"linear-gradient(135deg,#1e3a8a,#60a5fa)",  accent:"#60a5fa", layout:"feature-grid", description:"Comprehensive template for schools and academies.",       pages:9,  popular:true },
  { id:26, name:"Online Courses",      category:"education",   tags:["education","online","e-learning","courses","tutorial","digital"],  style:"modern",    price:"$69", priceNum:69,  gradient:"linear-gradient(135deg,#7c3aed,#c4b5fd)",  accent:"#c4b5fd", layout:"feature-grid", description:"Course-listing platform for instructors.",                pages:8  },
  { id:27, name:"Kids Learning",       category:"education",   tags:["education","kids","children","school","learning","fun"],            style:"playful",   price:"$39", priceNum:39,  gradient:"linear-gradient(135deg,#ca8a04,#fde047)",  accent:"#fde047", layout:"bold-hero",    description:"Colorful, fun template for children's education.",        pages:5  },
  { id:28, name:"University Site",     category:"education",   tags:["education","university","college","campus","research","academic"],  style:"corporate", price:"$79", priceNum:79,  gradient:"linear-gradient(135deg,#1e3a5f,#1d4ed8)",  accent:"#1d4ed8", layout:"nav-hero",     description:"Prestigious template for colleges and universities.",     pages:12 },
  // ── REAL ESTATE ──
  { id:29, name:"Real Estate Elite",   category:"real-estate", tags:["real estate","property","homes","realty","listings","housing"],    style:"elegant",   price:"$69", priceNum:69,  gradient:"linear-gradient(135deg,#451a03,#d97706)",  accent:"#d97706", layout:"hero-overlay", description:"Premium listings template for real estate agencies.",     pages:8,  popular:true },
  { id:30, name:"Property Hub",        category:"real-estate", tags:["real estate","property","homes","listings","buy","sell","rent"],   style:"modern",    price:"$59", priceNum:59,  gradient:"linear-gradient(135deg,#134e4a,#2dd4bf)",  accent:"#2dd4bf", layout:"feature-grid", description:"Searchable property listings with map integration.",      pages:7  },
  { id:31, name:"Luxury Homes",        category:"real-estate", tags:["real estate","luxury","mansion","property","high-end","realtor"],  style:"elegant",   price:"$89", priceNum:89,  gradient:"linear-gradient(135deg,#1c1917,#78716c)",  accent:"#d6d3d1", layout:"hero-overlay", description:"Ultra-premium design for luxury property brokers.",       pages:10 },
  { id:32, name:"Rental Listings",     category:"real-estate", tags:["real estate","rental","apartment","housing","listings","tenant"],  style:"modern",    price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#065f46,#34d399)",  accent:"#34d399", layout:"product-grid", description:"Clean listings template for rental property managers.",   pages:6  },
  // ── BLOG / MAGAZINE ──
  { id:33, name:"Minimal Blog",        category:"blog",        tags:["blog","magazine","writing","personal","journal","stories"],        style:"minimal",   price:"Free",priceNum:0,   gradient:"linear-gradient(135deg,#171717,#737373)",  accent:"#a3a3a3", layout:"grid-masonry", description:"Distraction-free reading experience for writers.",        pages:5,  popular:true },
  { id:34, name:"Travel Stories",      category:"blog",        tags:["blog","travel","adventure","lifestyle","stories","magazine"],      style:"bold",      price:"$29", priceNum:29,  gradient:"linear-gradient(135deg,#0369a1,#38bdf8)",  accent:"#38bdf8", layout:"hero-overlay", description:"Stunning visual template for travel bloggers.",           pages:6  },
  { id:35, name:"Lifestyle Magazine",  category:"blog",        tags:["blog","lifestyle","magazine","fashion","culture","editorial"],     style:"creative",  price:"$39", priceNum:39,  gradient:"linear-gradient(135deg,#9d174d,#f472b6)",  accent:"#f472b6", layout:"grid-masonry", description:"Editorial design for lifestyle and culture magazines.",   pages:7  },
  { id:36, name:"News Portal",         category:"blog",        tags:["blog","news","newspaper","media","journalism","portal"],           style:"corporate", price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#1e293b,#475569)",  accent:"#e2e8f0", layout:"feature-grid", description:"Multi-section news portal for media organizations.",      pages:8  },
  // ── TECHNOLOGY ──
  { id:37, name:"Tech Startup",        category:"technology",  tags:["technology","tech","startup","app","software","product"],          style:"modern",    price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#0c4a6e,#0ea5e9)",  accent:"#0ea5e9", layout:"centered-hero",description:"Feature-rich landing page for tech startups.",           pages:5,  popular:true },
  { id:38, name:"SaaS Platform",       category:"technology",  tags:["technology","saas","software","app","product","subscription"],     style:"modern",    price:"$69", priceNum:69,  gradient:"linear-gradient(135deg,#312e81,#6366f1)",  accent:"#6366f1", layout:"feature-grid", description:"Conversion-optimized template for SaaS products.",       pages:7  },
  { id:39, name:"App Landing",         category:"technology",  tags:["technology","app","mobile","ios","android","download","launch"],   style:"bold",      price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#1e3a8a,#6366f1)",  accent:"#818cf8", layout:"split-hero",   description:"Mobile app showcase with download CTAs.",                 pages:4, isNew:true },
  { id:40, name:"Developer Portfolio", category:"technology",  tags:["technology","developer","code","github","portfolio","software"],   style:"minimal",   price:"Free",priceNum:0,   gradient:"linear-gradient(135deg,#0f172a,#1e293b)",  accent:"#22d3ee", layout:"centered-hero",description:"Dark-mode developer portfolio with code aesthetic.",      pages:4  },
  // ── FITNESS ──
  { id:41, name:"Gym Pro",             category:"fitness",     tags:["fitness","gym","workout","training","bodybuilding","health"],      style:"bold",      price:"$39", priceNum:39,  gradient:"linear-gradient(135deg,#1c1917,#ef4444)",  accent:"#ef4444", layout:"bold-hero",    description:"High-energy dark template for gyms and training centers.",pages:6,  popular:true },
  { id:42, name:"Yoga & Wellness",     category:"fitness",     tags:["fitness","yoga","wellness","meditation","mindfulness","health"],   style:"minimal",   price:"$39", priceNum:39,  gradient:"linear-gradient(135deg,#365314,#86efac)",  accent:"#86efac", layout:"centered-hero",description:"Calm, serene design for yoga studios and wellness.",      pages:5  },
  { id:43, name:"Sports Academy",      category:"fitness",     tags:["fitness","sports","coaching","athlete","training","club"],         style:"bold",      price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#1e3a8a,#f97316)",  accent:"#f97316", layout:"bold-hero",    description:"Dynamic template for sports clubs and coaching.",         pages:7  },
  // ── FASHION ──
  { id:44, name:"Fashion Forward",     category:"fashion",     tags:["fashion","clothing","style","brand","apparel","boutique"],         style:"elegant",   price:"$59", priceNum:59,  gradient:"linear-gradient(135deg,#0f0f0f,#525252)",  accent:"#e5e5e5", layout:"hero-overlay", description:"Sleek, editorial template for fashion brands.",           pages:8  },
  { id:45, name:"Style Magazine",      category:"fashion",     tags:["fashion","magazine","editorial","style","lookbook"],               style:"creative",  price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#831843,#f43f5e)",  accent:"#fda4af", layout:"grid-masonry", description:"Lookbook-style magazine template for fashion labels.",    pages:6  },
  // ── NON-PROFIT ──
  { id:46, name:"Charity Foundation",  category:"nonprofit",   tags:["nonprofit","charity","foundation","donate","ngo","cause"],         style:"modern",    price:"Free",priceNum:0,   gradient:"linear-gradient(135deg,#065f46,#059669)",  accent:"#059669", layout:"split-hero",   description:"Impactful template for charities and non-profits.",       pages:6  },
  { id:47, name:"Community Hub",       category:"nonprofit",   tags:["nonprofit","community","organization","volunteer","local"],        style:"classic",   price:"Free",priceNum:0,   gradient:"linear-gradient(135deg,#1e3a8a,#3b82f6)",  accent:"#3b82f6", layout:"feature-grid", description:"Welcoming design for community organizations.",           pages:5  },
  // ── HOSPITALITY ──
  { id:48, name:"Hotel & Resort",      category:"hospitality", tags:["hospitality","hotel","resort","travel","luxury","booking"],        style:"elegant",   price:"$79", priceNum:79,  gradient:"linear-gradient(135deg,#1c1917,#b45309)",  accent:"#d4a855", layout:"hero-overlay", description:"Luxurious template for hotels and resorts.",              pages:9,  popular:true },
  { id:49, name:"Travel Agency",       category:"hospitality", tags:["hospitality","travel","tours","vacation","booking","destination"], style:"modern",    price:"$59", priceNum:59,  gradient:"linear-gradient(135deg,#0c4a6e,#06b6d4)",  accent:"#06b6d4", layout:"feature-grid", description:"Destination-focused template for travel agencies.",       pages:7  },
  // ── LEGAL ──
  { id:50, name:"Law Firm Pro",        category:"legal",       tags:["legal","law","attorney","lawyer","firm","court","counsel"],        style:"corporate", price:"$59", priceNum:59,  gradient:"linear-gradient(135deg,#1c3142,#2563eb)",  accent:"#2563eb", layout:"nav-hero",     description:"Authoritative template for law firms and attorneys.",     pages:7  },
  { id:51, name:"Attorney's Site",     category:"legal",       tags:["legal","attorney","lawyer","defense","criminal","litigation"],     style:"classic",   price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#292524,#78716c)",  accent:"#d6d3d1", layout:"split-hero",   description:"Professional, trustworthy design for solo attorneys.",    pages:5  },
  // ── PHOTOGRAPHY ──
  { id:52, name:"Studio Portfolio",    category:"photography", tags:["photography","studio","gallery","photos","visual","camera"],       style:"minimal",   price:"$39", priceNum:39,  gradient:"linear-gradient(135deg,#1c1c1c,#4b5563)",  accent:"#9ca3af", layout:"grid-masonry", description:"Fullscreen photo gallery template for photographers.",    pages:5  },
  { id:53, name:"Wedding Memories",    category:"photography", tags:["photography","wedding","portrait","events","gallery","photos"],    style:"elegant",   price:"$49", priceNum:49,  gradient:"linear-gradient(135deg,#4a1d96,#c4b5fd)",  accent:"#e9d5ff", layout:"hero-overlay", description:"Romantic, timeless template for wedding photographers.",  pages:6, isNew:true },
];

function TemplateMockup({ template }: { template: Template }) {
  const { gradient, accent, layout, name, category } = template;

  const NavBar = () => (
    <div className="flex items-center gap-1 px-2 py-1 bg-white/15 border-b border-white/10">
      <div className="w-1.5 h-1.5 rounded-full bg-red-400"/>
      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"/>
      <div className="w-1.5 h-1.5 rounded-full bg-green-400"/>
      <div className="flex-1 mx-2 h-2 rounded bg-white/20 text-[4px] flex items-center px-1 overflow-hidden text-white/50 font-mono">{name.toLowerCase().replace(/ /g,"-")}.com</div>
    </div>
  );

  const commonBg = { background: gradient };

  switch (layout) {
    case "split-hero":
      return (
        <div className="absolute inset-0 flex flex-col" style={commonBg}>
          <NavBar/>
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col justify-center px-3 py-2 gap-1">
              <div className="w-10 h-1 rounded" style={{background:accent}}/>
              <div className="w-16 h-2 bg-white/80 rounded"/>
              <div className="w-12 h-1.5 bg-white/40 rounded"/>
              <div className="w-14 h-1 bg-white/30 rounded"/>
              <div className="mt-1 w-10 h-3 rounded text-[4px] flex items-center justify-center font-bold text-white" style={{background:accent}}>Get Started</div>
            </div>
            <div className="w-2/5 flex items-center justify-center p-2">
              <div className="w-full h-full rounded opacity-40 bg-white/20"/>
            </div>
          </div>
          <div className="h-4 flex gap-2 px-3 items-center bg-black/20">
            {[28,20,24,18].map((w,i)=><div key={i} className="h-1 rounded bg-white/30" style={{width:w}}/>)}
          </div>
        </div>
      );
    case "nav-hero":
      return (
        <div className="absolute inset-0 flex flex-col" style={commonBg}>
          <NavBar/>
          <div className="flex items-center justify-between px-3 py-1 bg-white/10">
            <div className="w-8 h-1.5 bg-white/70 rounded"/>
            <div className="flex gap-2">{[14,18,12,16].map((w,i)=><div key={i} className="h-1 rounded bg-white/40" style={{width:w}}/>)}</div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-1 px-4">
            <div className="w-24 h-2.5 bg-white/80 rounded"/>
            <div className="w-20 h-1.5 bg-white/50 rounded"/>
            <div className="w-16 h-1 bg-white/30 rounded"/>
            <div className="mt-1 w-12 h-3 rounded flex items-center justify-center text-white text-[4px]" style={{background:accent}}>Learn More</div>
          </div>
          <div className="h-5 grid grid-cols-4 gap-1 px-2 pb-1">
            {[0,1,2,3].map(i=><div key={i} className="bg-white/15 rounded h-full"/>)}
          </div>
        </div>
      );
    case "bold-hero":
      return (
        <div className="absolute inset-0 flex flex-col" style={commonBg}>
          <NavBar/>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-3 gap-1" style={{background:"rgba(0,0,0,0.3)"}}>
            <div className="w-20 h-3 bg-white rounded font-bold"/>
            <div className="w-16 h-2 bg-white/60 rounded"/>
            <div className="flex gap-1 mt-1">
              <div className="w-10 h-3 rounded text-[4px] flex items-center justify-center text-white" style={{background:accent}}>Start Now</div>
              <div className="w-10 h-3 rounded border border-white/50 text-[4px] flex items-center justify-center text-white">Learn More</div>
            </div>
          </div>
        </div>
      );
    case "centered-hero":
      return (
        <div className="absolute inset-0 flex flex-col" style={commonBg}>
          <NavBar/>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-1">
            <div className="w-4 h-4 rounded-full mb-1" style={{background:accent, opacity:0.8}}/>
            <div className="w-20 h-2 bg-white/80 rounded"/>
            <div className="w-16 h-1.5 bg-white/50 rounded"/>
            <div className="w-12 h-1 bg-white/30 rounded"/>
            <div className="mt-2 w-14 h-3 rounded flex items-center justify-center text-white text-[4px]" style={{background:accent}}>Get Started Free</div>
          </div>
        </div>
      );
    case "hero-overlay":
      return (
        <div className="absolute inset-0 flex flex-col" style={commonBg}>
          <NavBar/>
          <div className="flex-1 relative">
            <div className="absolute inset-0 flex flex-col justify-end px-3 py-3 bg-gradient-to-t from-black/70 to-transparent">
              <div className="w-2 h-0.5 rounded mb-1" style={{background:accent}}/>
              <div className="w-20 h-2 bg-white rounded mb-1"/>
              <div className="w-14 h-1 bg-white/60 rounded mb-2"/>
              <div className="w-10 h-3 rounded text-[4px] flex items-center justify-center text-white" style={{background:accent}}>Explore</div>
            </div>
          </div>
        </div>
      );
    case "product-grid":
      return (
        <div className="absolute inset-0 flex flex-col bg-white">
          <div className="h-4" style={{background:gradient}}><NavBar/></div>
          <div className="flex items-center justify-between px-2 py-1 border-b">
            <div className="w-8 h-1.5 rounded" style={{background:"#e5e7eb"}}/>
            <div className="flex gap-1">{[1,2,3].map(i=><div key={i} className="w-4 h-1 rounded bg-gray-200"/>)}</div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-1 p-1.5">
            {[0,1,2,3,4,5].map(i=>(
              <div key={i} className="flex flex-col rounded overflow-hidden border border-gray-100">
                <div className="h-8 rounded-t" style={{background:gradient, opacity:0.3+i*0.1}}/>
                <div className="p-0.5"><div className="w-full h-1 bg-gray-200 rounded mb-0.5"/><div className="w-3/4 h-1 rounded" style={{background:accent, opacity:0.6}}/></div>
              </div>
            ))}
          </div>
        </div>
      );
    case "grid-masonry":
      return (
        <div className="absolute inset-0 flex flex-col" style={commonBg}>
          <NavBar/>
          <div className="flex-1 grid grid-cols-3 gap-0.5 p-1">
            {[60,40,52,44,56,38,48,42,50].map((h,i)=>(
              <div key={i} className="rounded overflow-hidden bg-white/20" style={{height:h/4}}/>
            ))}
          </div>
        </div>
      );
    case "feature-grid":
      return (
        <div className="absolute inset-0 flex flex-col" style={commonBg}>
          <NavBar/>
          <div className="flex flex-col items-center py-2 gap-1 px-3">
            <div className="w-16 h-2 bg-white/80 rounded"/>
            <div className="w-12 h-1 bg-white/40 rounded"/>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-1 px-2 pb-2">
            {[0,1,2,3].map(i=>(
              <div key={i} className="bg-white/15 rounded p-1.5 flex flex-col gap-0.5">
                <div className="w-3 h-3 rounded" style={{background:accent, opacity:0.7}}/>
                <div className="w-10 h-1 bg-white/70 rounded"/>
                <div className="w-8 h-0.5 bg-white/40 rounded"/>
              </div>
            ))}
          </div>
        </div>
      );
    case "menu-grid":
      return (
        <div className="absolute inset-0 flex flex-col" style={commonBg}>
          <NavBar/>
          <div className="h-8 flex flex-col items-center justify-center gap-0.5 border-b border-white/20">
            <div className="w-14 h-1.5 bg-white/80 rounded"/>
            <div className="flex gap-2">{[16,20,14,18].map((w,i)=><div key={i} className="h-0.5 bg-white/40 rounded" style={{width:w}}/>)}</div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-1 p-1.5">
            {[0,1,2,3].map(i=>(
              <div key={i} className="bg-white/15 rounded p-1 flex gap-1 items-center">
                <div className="w-6 h-6 rounded bg-white/20 flex-shrink-0"/>
                <div className="flex flex-col gap-0.5"><div className="w-8 h-1 bg-white/70 rounded"/><div className="w-6 h-0.5 bg-white/40 rounded"/></div>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0" style={commonBg}>
          <NavBar/>
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className="w-24 h-2 bg-white/70 rounded"/>
            <div className="w-16 h-1.5 bg-white/40 rounded"/>
          </div>
        </div>
      );
  }
}

const CATEGORIES = [
  { value:"business",    label:"Business"     },
  { value:"restaurant",  label:"Restaurant"   },
  { value:"ecommerce",   label:"E-commerce"   },
  { value:"portfolio",   label:"Portfolio"    },
  { value:"medical",     label:"Medical"      },
  { value:"education",   label:"Education"    },
  { value:"real-estate", label:"Real Estate"  },
  { value:"blog",        label:"Blog"         },
  { value:"technology",  label:"Technology"   },
  { value:"fitness",     label:"Fitness"      },
  { value:"fashion",     label:"Fashion"      },
  { value:"nonprofit",   label:"Non-profit"   },
  { value:"hospitality", label:"Hospitality"  },
  { value:"legal",       label:"Legal"        },
  { value:"photography", label:"Photography"  },
];

const STYLES = ["modern","elegant","minimal","bold","corporate","classic","playful","creative"];

export default function WebsiteTemplatesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const previewSlug = searchParams.get("preview");

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [category,   setCategory]   = useState(searchParams.get("category") || "");
  const [style,      setStyle]       = useState(searchParams.get("style") || "");
  const [priceFilter,setPriceFilter] = useState(searchParams.get("price") || "");
  const [sort,       setSort]        = useState(searchParams.get("sort") || "popular");

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    let list = ALL_TEMPLATES.filter(t => {
      if (category   && t.category !== category)   return false;
      if (style      && t.style !== style)          return false;
      if (priceFilter === "free" && t.priceNum !== 0) return false;
      if (priceFilter === "paid" && t.priceNum === 0) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.category.includes(q) ||
        t.tags.some(tag => tag.includes(q))
      );
    });

    if (sort === "popular")    list = [...list].sort((a,b) => (b.popular?1:0)-(a.popular?1:0));
    if (sort === "newest")     list = [...list].sort((a,b) => (b.isNew?1:0)-(a.isNew?1:0));
    if (sort === "price-asc")  list = [...list].sort((a,b) => a.priceNum - b.priceNum);
    if (sort === "price-desc") list = [...list].sort((a,b) => b.priceNum - a.priceNum);
    if (sort === "alpha")      list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [searchTerm, category, style, priceFilter, sort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (searchTerm)  p.set("q", searchTerm);
    if (category)    p.set("category", category);
    if (style)       p.set("style", style);
    if (priceFilter) p.set("price", priceFilter);
    if (sort)        p.set("sort", sort);
    setSearchParams(p);
  };

  const clearAll = () => {
    setSearchTerm(""); setCategory(""); setStyle(""); setPriceFilter(""); setSort("popular");
    setSearchParams(new URLSearchParams());
  };

  const hasFilters = searchTerm || category || style || priceFilter;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* ── Hero / Search ── */}
      <section className="bg-white border-b py-14 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#222] mb-3">
          AI-Powered Website Templates
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto mb-8 text-lg">
          {ALL_TEMPLATES.length}+ professional templates for every industry. Pick one, customize it, launch in minutes.
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            id="template-search"
            name="q"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            data-testid="template-search-input"
            placeholder="Search templates e.g. restaurant, hotel, yoga, law firm…"
            className="flex-1 border-2 border-gray-200 focus:border-[#c61e53] rounded-lg px-5 py-3 outline-none text-base shadow-sm transition-colors"
            autoComplete="off"
          />
          <button
            type="submit"
            data-testid="template-search-btn"
            className="bg-[#c61e53] hover:bg-[#a01843] text-white px-8 py-3 rounded-lg font-bold text-base shadow-sm whitespace-nowrap transition-colors"
          >
            Browse Templates
          </button>
        </form>

        {/* Quick pills */}
        {!searchTerm && (
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {["restaurant","hotel","fitness","ecommerce","portfolio","medical","law firm","real estate"].map(kw => (
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
          <div className="flex flex-wrap gap-3 items-center">
            <select
              id="template-industry"
              name="templateIndustry"
              data-testid="template-industry-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#c61e53] min-w-[140px]"
            >
              <option value="">All Industries</option>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>

            <select
              id="template-style"
              name="templateStyle"
              data-testid="template-style-select"
              value={style}
              onChange={e => setStyle(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#c61e53] min-w-[120px] hidden sm:block"
            >
              <option value="">All Styles</option>
              {STYLES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
            </select>

            <select
              id="template-price"
              name="templatePrice"
              data-testid="template-price-select"
              value={priceFilter}
              onChange={e => setPriceFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#c61e53] min-w-[110px] hidden sm:block"
            >
              <option value="">All Prices</option>
              <option value="free">Free Only</option>
              <option value="paid">Premium</option>
            </select>

            <select
              id="template-sort"
              name="templateSort"
              data-testid="template-sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#c61e53] min-w-[150px]"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="alpha">Alphabetical</option>
            </select>

            {hasFilters && (
              <button
                onClick={clearAll}
                data-testid="clear-filters-btn"
                className="text-sm text-gray-400 hover:text-[#c61e53] transition-colors px-2 py-2"
              >
                ✕ Clear
              </button>
            )}
          </div>

          <span className="text-sm text-gray-500 font-medium hidden lg:block" data-testid="template-count">
            Showing {filtered.length} template{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="container mx-auto px-4 py-8 max-w-7xl">

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">No templates found for "{searchTerm}"</h2>
            <p className="text-gray-500 mb-6">Try "restaurant", "hotel", "fitness" or browse all templates</p>
            <button
              onClick={clearAll}
              className="bg-[#c61e53] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#a01843] transition-colors"
            >
              Show All Templates
            </button>
          </div>
        ) : (
          <>
            {searchTerm && (
              <p className="text-sm text-gray-500 mb-6">
                <strong>{filtered.length}</strong> result{filtered.length !== 1 ? "s" : ""} for <strong>"{searchTerm}"</strong>
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(t => (
                <div
                  key={t.id}
                  data-testid={`template-card-${t.id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden flex flex-col group"
                >
                  {/* Mockup preview */}
                  <div
                    className="h-52 relative cursor-pointer overflow-hidden"
                    onClick={() => modalEvents.open("templatePreview", t)}
                  >
                    <TemplateMockup template={t} />

                    {/* Badges */}
                    <div className="absolute top-7 left-2 flex gap-1 z-10">
                      {t.isNew    && <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>}
                      {t.popular  && <span className="bg-[#c61e53] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">POPULAR</span>}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-20">
                      <button
                        data-testid={`template-preview-btn-${t.id}`}
                        onClick={e => { e.stopPropagation(); modalEvents.open("templatePreview", t); }}
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm shadow transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                      >
                        Preview
                      </button>
                      <button
                        data-testid={`template-use-btn-${t.id}`}
                        onClick={e => { e.stopPropagation(); modalEvents.open("templatePreview", t); }}
                        className="text-white px-4 py-2 rounded-lg font-bold text-sm shadow transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75"
                        style={{background: t.accent}}
                      >
                        Use This
                      </button>
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900 leading-tight">{t.name}</h3>
                      <span className={`font-bold text-sm ml-2 flex-shrink-0 ${t.priceNum === 0 ? "text-green-600" : "text-gray-800"}`}>
                        {t.price}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{t.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                        {CATEGORIES.find(c=>c.value===t.category)?.label || t.category}
                      </span>
                      <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{t.style}</span>
                      <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t.pages} pages</span>
                    </div>
                    <div className="mt-auto grid grid-cols-2 gap-2 pt-3 border-t border-gray-50">
                      <button
                        data-testid={`template-preview-${t.id}`}
                        onClick={() => modalEvents.open("templatePreview", t)}
                        className="border border-gray-200 hover:border-[#c61e53] hover:text-[#c61e53] transition-colors py-2 rounded-lg font-medium text-sm text-gray-600"
                      >
                        Preview
                      </button>
                      <button
                        data-testid={`template-use-${t.id}`}
                        onClick={() => modalEvents.open("templatePreview", t)}
                        className="bg-[#c61e53] hover:bg-[#a01843] transition-colors text-white py-2 rounded-lg font-medium text-sm shadow-sm"
                      >
                        Use Template
                      </button>
                    </div>
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
