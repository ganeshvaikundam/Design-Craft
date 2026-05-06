import { useState } from "react";
import { Link } from "react-router-dom";

const templates = [
  { id: 0, name: "Classic Professional", color: "linear-gradient(135deg,#1e3a8a,#3b82f6)", price: "$19" },
  { id: 1, name: "Modern Minimal", color: "linear-gradient(135deg,#111827,#374151)", price: "$19" },
  { id: 2, name: "Creative Bold", color: "linear-gradient(135deg,#c61e53,#f43f5e)", price: "$24" },
  { id: 3, name: "Elegant Gold", color: "linear-gradient(135deg,#78350f,#d97706)", price: "$24" },
  { id: 4, name: "Tech Startup", color: "linear-gradient(135deg,#065f46,#10b981)", price: "$19" },
  { id: 5, name: "Photography Studio", color: "linear-gradient(135deg,#4c1d95,#8b5cf6)", price: "$29" },
];

const features = [
  { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "100% Customizable", desc: "Change colors, fonts, layout and every element to match your brand." },
  { icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01", title: "Premium Print Quality", desc: "300 DPI print-ready files in PDF, PNG, and SVG formats." },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Instant Download", desc: "Download your finished design immediately after checkout." },
  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", title: "Phone & Email Support", desc: "Our design experts are available to help you at every step." },
];

const steps = [
  { num: "01", title: "Choose a Template", desc: "Browse our library of 500+ professionally designed business card templates." },
  { num: "02", title: "Add Your Details", desc: "Enter your name, job title, contact info, and upload your logo." },
  { num: "03", title: "Customize the Design", desc: "Adjust colors, fonts, and layout to perfectly match your brand." },
  { num: "04", title: "Download & Print", desc: "Download print-ready files or order premium prints delivered to your door." },
];

export default function BusinessCardPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a0510] via-[#2d0a1f] to-[#c61e53] text-white py-24">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <span className="inline-block bg-white/10 text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">Business Card Design</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Create Stunning Business Cards<br />That Leave a Lasting Impression
          </h1>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
            Choose from 500+ professional templates and customize every detail to match your brand identity perfectly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#templates" className="bg-[#c61e53] hover:bg-[#a01843] text-white px-8 py-4 rounded font-bold text-lg transition-colors inline-block">
              Browse Templates Free
            </a>
            <Link to="/services/custom" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded font-bold text-lg transition-colors inline-block">
              Custom Design
            </Link>
          </div>
          <p className="text-white/50 text-sm mt-6">No credit card required &mdash; free to design, pay only to download</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#222] text-white py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "500+", label: "Templates" },
              { num: "50K+", label: "Cards Created" },
              { num: "4.9/5", label: "Customer Rating" },
              { num: "24hr", label: "Support" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#c61e53]">{s.num}</div>
                <div className="text-gray-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section id="templates" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#222] mb-3">Choose Your Template</h2>
            <p className="text-gray-600 max-w-xl mx-auto">All templates are fully editable — change colors, fonts, and layout to make it yours.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {templates.map((t) => (
              <div
                key={t.id}
                data-testid={`biz-card-template-${t.id}`}
                className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border-2 cursor-pointer ${selectedTemplate === t.id ? "border-[#c61e53]" : "border-transparent"}`}
                onClick={() => setSelectedTemplate(t.id)}
              >
                {/* Card preview */}
                <div className="relative h-48" style={{ background: t.color }}>
                  {/* Simulated business card inside */}
                  <div className="absolute inset-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex flex-col justify-between p-4">
                    <div>
                      <div className="w-8 h-8 rounded bg-white/30 mb-2" />
                      <div className="h-2 w-24 bg-white/70 rounded mb-1" />
                      <div className="h-1.5 w-16 bg-white/40 rounded" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-1 w-20 bg-white/50 rounded" />
                      <div className="h-1 w-28 bg-white/50 rounded" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      data-testid={`biz-card-customize-${t.id}`}
                      className="bg-white text-gray-900 px-5 py-2 rounded-full font-bold text-sm shadow-lg"
                    >
                      Customize
                    </button>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">{t.name}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">Starting at {t.price}</p>
                  </div>
                  {selectedTemplate === t.id && (
                    <svg className="w-5 h-5 text-[#c61e53]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              data-testid="biz-card-start-btn"
              className="bg-[#c61e53] hover:bg-[#a01843] text-white px-10 py-4 rounded font-bold text-lg transition-colors shadow-lg"
            >
              Start Designing — It&apos;s Free
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#222] mb-3">Everything You Need</h2>
            <p className="text-gray-600">Professional tools built for business owners, designers, and entrepreneurs.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#c61e53]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#222] mb-3">How It Works</h2>
            <p className="text-gray-600">Create your business card in 4 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-200 -translate-x-1/2 z-0" />
                )}
                <div className="w-12 h-12 bg-[#c61e53] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 relative z-10">
                  {s.num}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#c61e53] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your Mark?</h2>
          <p className="text-white/80 text-lg mb-8">Join 50,000+ businesses who trust DesignMantic for their business cards.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button data-testid="biz-card-cta-btn" className="bg-white text-[#c61e53] px-8 py-4 rounded font-bold text-lg hover:bg-gray-100 transition-colors">
              Create Your Business Card
            </button>
            <Link to="/services/custom" className="border-2 border-white text-white px-8 py-4 rounded font-bold text-lg hover:bg-white/10 transition-colors inline-block">
              Talk to a Designer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
