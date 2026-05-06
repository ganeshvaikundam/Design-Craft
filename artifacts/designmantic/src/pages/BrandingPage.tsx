import { Link } from "react-router-dom";

const packages = [
  {
    name: "Starter Brand",
    price: "$149",
    desc: "Perfect for solo entrepreneurs and startups launching their first brand.",
    features: ["Logo Design (3 concepts)", "Business Card Design", "Color Palette", "Typography Guide", "PNG & PDF files"],
    color: "border-gray-200",
    btnStyle: "border border-[#c61e53] text-[#c61e53] hover:bg-red-50",
  },
  {
    name: "Business Brand",
    price: "$349",
    desc: "Complete identity package for growing businesses ready to stand out.",
    features: ["Logo Design (5 concepts)", "Business Card & Letterhead", "Brand Style Guide", "Social Media Headers", "Email Signature", "All file formats"],
    color: "border-[#c61e53] ring-2 ring-[#c61e53]",
    btnStyle: "bg-[#c61e53] text-white hover:bg-[#a01843]",
    badge: "Most Popular",
  },
  {
    name: "Pro Brand",
    price: "$699",
    desc: "Full-spectrum branding for established companies and agencies.",
    features: ["Logo Design (unlimited revisions)", "Complete Stationery Suite", "Brand Guidelines Book", "Website Style Guide", "Marketing Templates", "Dedicated Designer", "Priority Support"],
    color: "border-gray-200",
    btnStyle: "border border-[#c61e53] text-[#c61e53] hover:bg-red-50",
  },
];

const services = [
  { icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01", name: "Logo Design", desc: "A distinctive mark that represents your business visually." },
  { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", name: "Business Cards", desc: "First impressions that open doors and close deals." },
  { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", name: "Letterhead", desc: "Professional stationery that reinforces brand authority." },
  { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", name: "Email Signature", desc: "Every email becomes a branded touchpoint." },
  { icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", name: "Marketing Collateral", desc: "Flyers, banners, and ads with a consistent look." },
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", name: "Brand Strategy", desc: "Voice, positioning, and messaging to tell your story." },
];

const process = [
  { step: "1", title: "Discovery Call", desc: "We learn about your business, goals, audience, and what makes you unique." },
  { step: "2", title: "Concept Development", desc: "Our designers craft multiple unique brand concepts tailored to your vision." },
  { step: "3", title: "Refine & Revise", desc: "You provide feedback and we refine until every detail is perfect." },
  { step: "4", title: "Final Delivery", desc: "Receive all files, guidelines, and assets ready to use across every medium." },
];

export default function BrandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f0720] via-[#1e0d3a] to-[#4c1d95] text-white py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/10 text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">Complete Brand Identity</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Build a Brand That People<br />Remember &amp; Trust
            </h1>
            <p className="text-white/80 text-xl mb-10">
              More than a logo — a complete visual identity system that works across every touchpoint, from business cards to websites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#packages" className="bg-[#c61e53] hover:bg-[#a01843] text-white px-8 py-4 rounded font-bold text-lg transition-colors inline-block">
                View Packages
              </a>
              <Link to="/services/custom" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded font-bold text-lg transition-colors inline-block">
                Get a Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-[#222] text-white py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "10,000+", label: "Brands Created" },
              { num: "Award", label: "Winning Designers" },
              { num: "100%", label: "Satisfaction Guarantee" },
              { num: "5-Star", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-[#c61e53]">{s.num}</div>
                <div className="text-gray-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#222] mb-3">What&apos;s Included in Your Brand Package</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Every element your business needs to present a unified, professional identity to the world.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.name} className="flex gap-4 p-6 rounded-xl border border-gray-100 hover:border-[#c61e53] hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#c61e53] transition-colors">
                  <svg className="w-6 h-6 text-[#c61e53] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{s.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#222] mb-3">Choose Your Branding Package</h2>
            <p className="text-gray-600">Transparent pricing — everything included, no surprises.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {packages.map((p) => (
              <div key={p.name} className={`bg-white rounded-2xl border-2 p-8 relative ${p.color}`} data-testid={`brand-package-${p.name.toLowerCase().replace(/\s+/g, "-")}`}>
                {p.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c61e53] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    {p.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-800 mb-1">{p.name}</h3>
                <div className="text-4xl font-bold text-[#c61e53] mb-2">{p.price}</div>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{p.desc}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded font-bold transition-colors ${p.btnStyle}`} data-testid={`brand-package-btn-${p.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#222] text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Our Proven Design Process</h2>
            <p className="text-white/60">A collaborative approach that puts your vision first.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {process.map((p) => (
              <div key={p.step} className="text-center">
                <div className="w-14 h-14 bg-[#c61e53] text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                  {p.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#c61e53] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Brand?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of businesses who trust DesignMantic to create their brand identity. Start for free today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/logo-maker" className="bg-white text-[#c61e53] px-8 py-4 rounded font-bold text-lg hover:bg-gray-100 transition-colors inline-block" data-testid="branding-cta-logo">
              Start with a Logo
            </Link>
            <Link to="/services/custom" className="border-2 border-white text-white px-8 py-4 rounded font-bold text-lg hover:bg-white/10 transition-colors inline-block" data-testid="branding-cta-custom">
              Custom Branding Package
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
